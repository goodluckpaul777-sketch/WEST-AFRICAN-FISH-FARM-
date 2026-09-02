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
};

// Seed initial authentic comments from aquarists - clean start with no seeded comments
const INITIAL_COMMENTS_SEED: FishComment[] = [];

// Local state caches
const LOCAL_STORAGE_LIKED_KEY = "waff_user_liked_fish_ids";
const LOCAL_STORAGE_LIKES_MAP_KEY = "waff_likes_map";
const LOCAL_STORAGE_COMMENTS_KEY = "waff_community_comments_clean";

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
let commentsCache: FishComment[] = [];
let subscribers: Array<() => void> = [];

// Initialize local storage cache
try {
  // Clean up legacy seeded comments in local storage if present
  localStorage.removeItem("waff_community_comments");

  const savedLikes = localStorage.getItem(LOCAL_STORAGE_LIKES_MAP_KEY);
  if (savedLikes) {
    likesCache = { ...INITIAL_LIKES_SEED, ...JSON.parse(savedLikes) };
  }
  const savedComments = localStorage.getItem(LOCAL_STORAGE_COMMENTS_KEY);
  if (savedComments) {
    const parsed: FishComment[] = JSON.parse(savedComments);
    // Filter out any legacy seed-c comments
    commentsCache = parsed.filter(c => !c.id.startsWith("seed-c"));
  } else {
    commentsCache = [];
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
        if (data && data.fishId && data.authorName && data.content && !docSnap.id.startsWith("seed-c")) {
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

export function getAllRecentComments(limitCount = 20): FishComment[] {
  return [...commentsCache]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limitCount);
}

export function getTotalLikesCount(): number {
  return Object.values(likesCache).reduce((sum, count) => sum + count, 0);
}

export function getTotalCommentsCount(): number {
  return commentsCache.length;
}

export function getLikesMap(): Record<string, number> {
  return { ...likesCache };
}

export function getMostLikedFishIds(limitCount = 5): Array<{ fishId: string; likes: number }> {
  return Object.entries(likesCache)
    .map(([fishId, likes]) => ({ fishId, likes }))
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limitCount);
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
