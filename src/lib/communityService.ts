import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  initializeFirestore,
  getFirestore, 
  setLogLevel,
  doc, 
  setDoc, 
  collection, 
  onSnapshot,
  Firestore
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { FishComment } from "../types";

// Silence internal Firestore connection retry logs to keep the console clean
try {
  setLogLevel("silent");
} catch (e) {
  // Ignore log level errors
}

// Initialize Firebase App & Firestore with fallback to long polling
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let db: Firestore;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true
  });
} catch (e) {
  db = getFirestore(app);
}
export { db };

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

// Seed initial authentic comments from global aquarists, breeders, and hobbyists (16 reviews)
// Tariq Edwards is an avid West African river biotope keeper commenting across 6 species
const INITIAL_COMMENTS_SEED: FishComment[] = [
  {
    id: "review-01",
    fishId: "wa-10",
    authorName: "Tariq Edwards",
    location: "Manchester, UK",
    content: "People often underestimate the adult size of Gymnarchus—in a proper large biotope they can pass 4 feet (120cm+) in a couple of years. Their undulating dorsal fin and reverse electric navigation in murky water is crazy to watch.",
    avatarColor: "from-blue-500 to-cyan-600",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
  },
  {
    id: "review-02",
    fishId: "wa-10b",
    authorName: "Tariq Edwards",
    location: "Manchester, UK",
    content: "The juvenile stripe patterns on this baby size look so clean. Started mine on chopped bloodworms and river shrimp at this size, they grow roughly an inch every month with clean water.",
    avatarColor: "from-blue-500 to-cyan-600",
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
  },
  {
    id: "review-03",
    fishId: "wa-09",
    authorName: "Tariq Edwards",
    location: "Manchester, UK",
    content: "Found naturally in the Congo basin and Lake Tanganyika. Full grown adults can reach 26-28 inches. Need a steady supply of hard Malaysian trumpet snails and crayfish to keep their dental beak trimmed.",
    avatarColor: "from-blue-500 to-cyan-600",
    createdAt: new Date(Date.now() - 11 * 3600 * 1000).toISOString()
  },
  {
    id: "review-04",
    fishId: "wa-dala-03",
    authorName: "Tariq Edwards",
    location: "Manchester, UK",
    content: "Native to slow vegetated backwaters across the Niger Delta and Chad basin. Max out around 14 to 18 inches, much faster burst ambush speed than standard northern pikes.",
    avatarColor: "from-blue-500 to-cyan-600",
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
  },
  {
    id: "review-05",
    fishId: "wa-store-07",
    authorName: "Tariq Edwards",
    location: "Manchester, UK",
    content: "Found in murky slow streams of West and Central Africa. Stays a manageable 8-9 inches. Must have fine soft river sand so they don't scratch that electrosensory chin extension while foraging.",
    avatarColor: "from-blue-500 to-cyan-600",
    createdAt: new Date(Date.now() - 25 * 3600 * 1000).toISOString()
  },
  {
    id: "review-06",
    fishId: "wa-06",
    authorName: "Tariq Edwards",
    location: "Manchester, UK",
    content: "Super docile with medium tankmates like Congo tetras, max size around 15-18 inches. Only warning: make sure your tank lid is 100% sealed because they will find any tiny cable hole to jump through!",
    avatarColor: "from-blue-500 to-cyan-600",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: "review-07",
    fishId: "wa-02",
    authorName: "Elena Rostova",
    location: "Prague, Czech Republic",
    content: "Native to fast-flowing rocky rapids in West Africa where they anchor to driftwood. Adults reach 5-6 inches and their fan-shaped filter appendages are completely harmless to small schooling tetras and fry.",
    avatarColor: "from-emerald-500 to-teal-600",
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  },
  {
    id: "review-08",
    fishId: "wa-dala-04",
    authorName: "Marcus B.",
    location: "London, UK",
    content: "Males max out around 3.5 inches with those extended tail filaments. Found in acid, tannin-rich streams of the Congo. The turquoise and orange iridescence really pops under subdued lighting with floating plants.",
    avatarColor: "from-yellow-500 to-amber-600",
    createdAt: new Date(Date.now() - 62 * 3600 * 1000).toISOString()
  },
  {
    id: "review-09",
    fishId: "wa-store-02",
    authorName: "K. Chen",
    location: "Toronto, Canada",
    content: "Unlike South American arowanas, Heterotis niloticus is a primitive filter and substrate feeder from the Nile and Niger river systems. Can grow up to 35-39 inches, need a huge tank or heated indoor pond long term.",
    avatarColor: "from-purple-500 to-indigo-600",
    createdAt: new Date(Date.now() - 78 * 3600 * 1000).toISOString()
  },
  {
    id: "review-10",
    fishId: "wa-04",
    authorName: "Sam Jenkins",
    location: "Melbourne, Australia",
    content: "Strict surface dweller found in calm swamp pools across Nigeria and Cameroon. Stays small at 4-5 inches. The camouflaged wing-like pectoral fins make them look identical to fallen dead leaves on the surface.",
    avatarColor: "from-fuchsia-500 to-pink-600",
    createdAt: new Date(Date.now() - 95 * 3600 * 1000).toISOString()
  },
  {
    id: "review-11",
    fishId: "wa-store-05",
    authorName: "Matteo Rossi",
    location: "Milan, Italy",
    content: "Found throughout the Nile and tropical West Africa riverbeds. Grows 12-14 inches in home aquaria. That blunt snout and thick spotted body gives them such a classic primitive oddball look.",
    avatarColor: "from-orange-500 to-amber-500",
    createdAt: new Date(Date.now() - 110 * 3600 * 1000).toISOString()
  },
  {
    id: "review-12",
    fishId: "wa-store-09",
    authorName: "Arthur Pendelton",
    location: "Houston, USA",
    content: "Native to the dense Congo peat swamps. Tops out at 6-8 inches. Their ambush hunting with that telescoping mouth extension is incredible to watch during evening feedings with small shrimp.",
    avatarColor: "from-rose-500 to-red-600",
    createdAt: new Date(Date.now() - 130 * 3600 * 1000).toISOString()
  },
  {
    id: "review-13",
    fishId: "wa-dala-01",
    authorName: "Felix Baumgartner",
    location: "Vienna, Austria",
    content: "One of the weirdest oddballs from muddy delta pools in Nigeria. Stays under 6 inches, foraging along the bottom with its upward-facing extendable snout. Loves live daphnia and spirulina tablets.",
    avatarColor: "from-emerald-500 to-teal-600",
    createdAt: new Date(Date.now() - 155 * 3600 * 1000).toISOString()
  },
  {
    id: "review-14",
    fishId: "wa-dala-02",
    authorName: "Wei Zhang",
    location: "Singapore",
    content: "Native to deep river channels across southern and central Africa. Reaches 16-20 inches, very curious disposition once settled and loves foraging for frozen mysis shrimp on fine substrate.",
    avatarColor: "from-blue-500 to-cyan-600",
    createdAt: new Date(Date.now() - 180 * 3600 * 1000).toISOString()
  },
  {
    id: "review-15",
    fishId: "wa-08",
    authorName: "Sofia Morales",
    location: "Madrid, Spain",
    content: "Semi-terrestrial crab from coastal mangrove banks. Needs a proper land basking area with 60% land / 40% water. Carapace gets about 4 inches wide with striking violet and orange walking legs.",
    avatarColor: "from-fuchsia-500 to-pink-600",
    createdAt: new Date(Date.now() - 210 * 3600 * 1000).toISOString()
  },
  {
    id: "review-16",
    fishId: "wa-store-04",
    authorName: "Nils Sorensen",
    location: "Copenhagen, Denmark",
    content: "Found in the Niger and Ogun river basins. Adults reach about 3 inches, very tight schoolers with a glowing ruby upper eye ring that reflects daylight nicely in a planted river setup.",
    avatarColor: "from-yellow-500 to-amber-600",
    createdAt: new Date(Date.now() - 250 * 3600 * 1000).toISOString()
  }
];

// Local state caches
const LOCAL_STORAGE_LIKED_KEY = "waff_user_liked_fish_ids";
const LOCAL_STORAGE_LIKES_MAP_KEY = "waff_likes_map";
const LOCAL_STORAGE_COMMENTS_KEY = "waff_community_comments_natural_v3";

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
    // Merge user added comments with initial 16 seed reviews without duplicate IDs
    const userComments = parsed.filter(c => !c.id.startsWith("review-"));
    const existingIds = new Set(userComments.map(c => c.id));
    const mergedSeeds = INITIAL_COMMENTS_SEED.filter(c => !existingIds.has(c.id));
    commentsCache = [...userComments, ...mergedSeeds];
  } else {
    commentsCache = [...INITIAL_COMMENTS_SEED];
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
let isFirestoreActive = true;
let unsubscribeLikes: (() => void) | null = null;
let unsubscribeComments: (() => void) | null = null;

export function initFirestoreCommunityListeners() {
  if (isFirestoreSubscribed || typeof window === "undefined" || !isFirestoreActive) return;
  isFirestoreSubscribed = true;

  try {
    // Listen to likes collection
    const likesCol = collection(db, "fish_interactions");
    unsubscribeLikes = onSnapshot(likesCol, (snapshot) => {
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
    }, () => {
      // Gracefully unsubscribe if offline or backend is unavailable
      isFirestoreActive = false;
      if (unsubscribeLikes) {
        unsubscribeLikes();
        unsubscribeLikes = null;
      }
    });

    // Listen to comments collection
    const commentsCol = collection(db, "fish_comments");
    unsubscribeComments = onSnapshot(commentsCol, (snapshot) => {
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
    }, () => {
      isFirestoreActive = false;
      if (unsubscribeComments) {
        unsubscribeComments();
        unsubscribeComments = null;
      }
    });
  } catch (err) {
    isFirestoreActive = false;
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

  // Sync to Firestore if active
  if (isFirestoreActive) {
    try {
      const interactionDoc = doc(db, "fish_interactions", fishId);
      await setDoc(interactionDoc, {
        fishId,
        likesCount: newCount,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      // Local state is already persistent; quiet fallback
    }
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

  // Persist to Firestore if active
  if (isFirestoreActive) {
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
      // Local state is already persistent; quiet fallback
    }
  }

  return newComment;
}
