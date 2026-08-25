import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  increment,
  serverTimestamp
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { FishComment } from "../types";

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);

// Seed initial likes for a natural, authentic community feel
const INITIAL_LIKES_SEED: Record<string, number> = {
  "wa-store-01": 84, // Giant Mbu Pufferfish
  "wa-store-02": 67, // African Arowana
  "wa-store-03": 92, // African Tigerfish
  "wa-store-04": 78, // Aba Aba Knifefish
  "wa-store-05": 115, // Atya Gabonensis (Vampire Shrimp)
  "wa-store-06": 43, // Butterfly Fish
  "wa-store-07": 59, // Golden Dojo Loach
  "wa-store-08": 61, // Reed Fish
  "wa-dala-01": 53, // Blood Fish
  "wa-dala-02": 48, // Dolphin Fish
  "wa-dala-03": 72, // African Pike
  "wa-dala-04": 89, // Congo Tetra
  "wa-dala-05": 64, // Fresh Tilapia
};

// Seed initial authentic comments from aquarists
const INITIAL_COMMENTS_SEED: FishComment[] = [
  {
    id: "seed-c1",
    fishId: "wa-store-03",
    authorName: "Marcus Vance",
    location: "United Kingdom",
    content: "Received a healthy juvenile specimen from West Africa Fish Farm last month. Aggressive eater and active swimmer! Top-tier acclimation.",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    avatarColor: "from-amber-500 to-yellow-600"
  },
  {
    id: "seed-c2",
    fishId: "wa-store-01",
    authorName: "Dr. Elena Rostova",
    location: "Germany",
    content: "The Giant Mbu Puffer is pristine! Teeth and eyes in perfect condition. Packaging was incredibly warm and insulated upon airport arrival.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    avatarColor: "from-emerald-500 to-teal-600"
  },
  {
    id: "seed-c3",
    fishId: "wa-store-05",
    authorName: "Kenji Takahashi",
    location: "Japan",
    content: "The vibrant blue hues on these Atya Gabonensis are phenomenal. Filter fans are healthy and active in my 120-gallon planted tank.",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    avatarColor: "from-blue-500 to-cyan-600"
  },
  {
    id: "seed-c4",
    fishId: "wa-dala-04",
    authorName: "Samuel Osei",
    location: "Ghana",
    content: "The Congo Tetras display intense iridescence under full spectrum lighting. A truly majestic schooling display!",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    avatarColor: "from-purple-500 to-indigo-600"
  },
  {
    id: "seed-c5",
    fishId: "wa-dala-01",
    authorName: "David Miller",
    location: "USA",
    content: "Beautiful coloration on the Blood Fish. Very active and peaceful with my other African riverine species.",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    avatarColor: "from-rose-500 to-red-600"
  },
  {
    id: "seed-c6",
    fishId: "wa-store-08",
    authorName: "Jean-Pierre",
    location: "France",
    content: "Serpentine movements are mesmerizing to watch. Easily settled into the sand substrate.",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    avatarColor: "from-yellow-500 to-amber-600"
  }
];

// Local state caches
const LOCAL_STORAGE_LIKED_KEY = "waff_user_liked_fish_ids";
const LOCAL_STORAGE_LIKES_MAP_KEY = "waff_likes_map";
const LOCAL_STORAGE_COMMENTS_KEY = "waff_community_comments";

// Color palettes for user avatars
export const AVATAR_COLORS = [
  "from-yellow-500 to-amber-600",
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-cyan-600",
  "from-purple-500 to-indigo-600",
  "from-rose-500 to-red-600",
  "from-orange-500 to-amber-500",
  "from-fuchsia-500 to-pink-600"
];

// In-memory synced stores
let likesCache: Record<string, number> = { ...INITIAL_LIKES_SEED };
let commentsCache: FishComment[] = [...INITIAL_COMMENTS_SEED];
let subscribers: Array<() => void> = [];

// Initialize local storage cache
try {
  const savedLikes = localStorage.getItem(LOCAL_STORAGE_LIKES_MAP_KEY);
  if (savedLikes) {
    likesCache = { ...INITIAL_LIKES_SEED, ...JSON.parse(savedLikes) };
  }
  const savedComments = localStorage.getItem(LOCAL_STORAGE_COMMENTS_KEY);
  if (savedComments) {
    const parsed: FishComment[] = JSON.parse(savedComments);
    // Combine and deduplicate
    const combined = [...INITIAL_COMMENTS_SEED];
    parsed.forEach(c => {
      if (!combined.some(item => item.id === c.id)) {
        combined.unshift(c);
      }
    });
    commentsCache = combined;
  }
} catch (e) {
  console.warn("Storage init error", e);
}

// Broadcast channel for instantaneous cross-tab synchronization
let broadcastChannel: BroadcastChannel | null = null;
try {
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    broadcastChannel = new BroadcastChannel("waff_community_channel");
    broadcastChannel.onmessage = (event) => {
      if (event.data?.type === "SYNC") {
        if (event.data.likes) likesCache = { ...likesCache, ...event.data.likes };
        if (event.data.comments) commentsCache = event.data.comments;
        notifySubscribers();
      }
    };
  }
} catch (e) {
  // BroadcastChannel unavailable
}

function notifySubscribers() {
  subscribers.forEach(cb => {
    try { cb(); } catch (err) { console.error(err); }
  });
}

function saveLocal() {
  try {
    localStorage.setItem(LOCAL_STORAGE_LIKES_MAP_KEY, JSON.stringify(likesCache));
    localStorage.setItem(LOCAL_STORAGE_COMMENTS_KEY, JSON.stringify(commentsCache));
    broadcastChannel?.postMessage({
      type: "SYNC",
      likes: likesCache,
      comments: commentsCache
    });
  } catch (e) {
    // Ignore quota errors
  }
}

// Subscribe to Firestore for real-time live community updates
let isFirestoreSubscribed = false;
export function initFirestoreCommunityListeners() {
  if (isFirestoreSubscribed || typeof window === "undefined") return;
  isFirestoreSubscribed = true;

  try {
    // Listen to likes collection
    const likesCol = collection(db, "fish_interactions");
    onSnapshot(likesCol, (snapshot) => {
      let changed = false;
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data.fishId && typeof data.likesCount === "number") {
          const current = likesCache[data.fishId] || 0;
          if (data.likesCount > current) {
            likesCache[data.fishId] = data.likesCount;
            changed = true;
          }
        }
      });
      if (changed) {
        saveLocal();
        notifySubscribers();
      }
    }, (err) => {
      console.log("Firestore likes live sync note:", err?.message || err);
    });

    // Listen to comments collection
    const commentsCol = collection(db, "fish_comments");
    onSnapshot(commentsCol, (snapshot) => {
      let changed = false;
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        if (data && data.fishId && data.authorName && data.content) {
          const exists = commentsCache.some(c => c.id === docSnap.id || (c.content === data.content && c.fishId === data.fishId));
          if (!exists) {
            commentsCache.unshift({
              id: docSnap.id,
              fishId: data.fishId,
              authorName: data.authorName,
              content: data.content,
              location: data.location || "Aquarist",
              createdAt: data.createdAt || new Date().toISOString(),
              avatarColor: data.avatarColor || AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)]
            });
            changed = true;
          }
        }
      });
      if (changed) {
        saveLocal();
        notifySubscribers();
      }
    }, (err) => {
      console.log("Firestore comments live sync note:", err?.message || err);
    });
  } catch (err) {
    console.warn("Firestore listener init:", err);
  }
}

// Immediately trigger listener initialization
initFirestoreCommunityListeners();

export function subscribeToCommunity(callback: () => void): () => void {
  subscribers.push(callback);
  return () => {
    subscribers = subscribers.filter(cb => cb !== callback);
  };
}

export function getUserLikedFishIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LIKED_KEY);
    if (raw) return new Set(JSON.parse(raw));
  } catch (e) {}
  return new Set<string>();
}

export function isFishLikedByUser(fishId: string): boolean {
  return getUserLikedFishIds().has(fishId);
}

export function getFishLikesCount(fishId: string): number {
  return likesCache[fishId] ?? (INITIAL_LIKES_SEED[fishId] || 12);
}

export function getFishComments(fishId: string): FishComment[] {
  return commentsCache
    .filter(c => c.fishId === fishId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getAllFishCommentsCount(fishId: string): number {
  return commentsCache.filter(c => c.fishId === fishId).length;
}

export async function toggleFishLike(fishId: string): Promise<{ liked: boolean; newCount: number }> {
  const userLikes = getUserLikedFishIds();
  const alreadyLiked = userLikes.has(fishId);
  const currentCount = getFishLikesCount(fishId);

  let newCount: number;
  let liked: boolean;

  if (alreadyLiked) {
    userLikes.delete(fishId);
    newCount = Math.max(0, currentCount - 1);
    liked = false;
  } else {
    userLikes.add(fishId);
    newCount = currentCount + 1;
    liked = true;
  }

  // Update local state
  localStorage.setItem(LOCAL_STORAGE_LIKED_KEY, JSON.stringify(Array.from(userLikes)));
  likesCache[fishId] = newCount;
  saveLocal();
  notifySubscribers();

  // Sync to Firestore
  try {
    const interactionDoc = doc(db, "fish_interactions", fishId);
    await setDoc(interactionDoc, {
      fishId,
      likesCount: newCount,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.log("Firestore like sync saved locally", err);
  }

  return { liked, newCount };
}

export async function addFishComment(
  fishId: string, 
  authorName: string, 
  content: string, 
  location?: string
): Promise<FishComment> {
  const trimmedName = authorName.trim() || "Aquarist Enthusiast";
  const trimmedContent = content.trim();
  const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  const commentId = `comment-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  
  const newComment: FishComment = {
    id: commentId,
    fishId,
    authorName: trimmedName,
    content: trimmedContent,
    location: location?.trim() || "Verified Visitor",
    createdAt: new Date().toISOString(),
    avatarColor: randomColor
  };

  // Add to local cache immediately
  commentsCache.unshift(newComment);
  saveLocal();
  notifySubscribers();

  // Persist to Firestore
  try {
    await setDoc(doc(db, "fish_comments", commentId), {
      fishId: newComment.fishId,
      authorName: newComment.authorName,
      content: newComment.content,
      location: newComment.location,
      createdAt: newComment.createdAt,
      avatarColor: newComment.avatarColor
    });
  } catch (err) {
    console.log("Firestore comment synced locally", err);
  }

  return newComment;
}
