import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Heart, 
  Sparkles, 
  Globe, 
  ArrowRight, 
  Clock, 
  PlusCircle, 
  ShieldCheck,
  Flame,
  CheckCircle2,
  Share2
} from "lucide-react";
import { FishSpecies, FishComment, TabType } from "../types";
import { LIVESTOCK_DATA } from "../data/livestock";
import { 
  getAllRecentComments, 
  getTotalLikesCount, 
  getTotalCommentsCount, 
  getMostLikedFishIds,
  getFishLikesCount,
  getAllFishCommentsCount,
  subscribeToCommunity 
} from "../lib/communityService";
import FishLikeButton from "./FishLikeButton";
import FishCommentsModal from "./FishCommentsModal";

interface CommunityFeedSectionProps {
  onSelectFish?: (fish: FishSpecies) => void;
  onOpenStockList?: () => void;
}

export default function CommunityFeedSection({ onSelectFish, onOpenStockList }: CommunityFeedSectionProps) {
  const [recentComments, setRecentComments] = useState<FishComment[]>(() => getAllRecentComments(10));
  const [totalLikes, setTotalLikes] = useState(() => getTotalLikesCount());
  const [totalComments, setTotalComments] = useState(() => getTotalCommentsCount());
  const [mostLiked, setMostLiked] = useState(() => getMostLikedFishIds(4));
  const [activeModalFish, setActiveModalFish] = useState<FishSpecies | null>(null);

  useEffect(() => {
    const refreshData = () => {
      setRecentComments(getAllRecentComments(10));
      setTotalLikes(getTotalLikesCount());
      setTotalComments(getTotalCommentsCount());
      setMostLiked(getMostLikedFishIds(4));
    };

    refreshData();
    const unsubscribe = subscribeToCommunity(refreshData);
    return unsubscribe;
  }, []);

  const getFishById = (fishId: string): FishSpecies | undefined => {
    return LIVESTOCK_DATA.find(f => f.id === fishId);
  };

  const formatRelativeTime = (isoString: string) => {
    try {
      const now = new Date();
      const past = new Date(isoString);
      const diffInSec = Math.floor((now.getTime() - past.getTime()) / 1000);

      if (diffInSec < 60) return "Just now";
      const diffInMin = Math.floor(diffInSec / 60);
      if (diffInMin < 60) return `${diffInMin}m ago`;
      const diffInHours = Math.floor(diffInMin / 60);
      if (diffInHours < 24) return `${diffInHours}h ago`;
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) return `${diffInDays}d ago`;
      return past.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    } catch (e) {
      return "Recently";
    }
  };

  return (
    <section className="space-y-8 pt-4">
      {/* Header & Stats Banner */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-yellow-500" />
              Live Aquarist Interactions
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Real-time Sync
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight uppercase font-display flex items-center gap-3">
            COMMUNITY VOICES & SPECIMEN FEEDBACK
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-sans mt-1 max-w-2xl leading-relaxed">
            Live public reviews, comments, and specimen likes from global importers, breeders, and hobbyists across the world.
          </p>
        </div>

        {/* Global Live Counters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-rose-500/20 shadow-lg">
            <div className="p-1.5 rounded-full bg-rose-500/10 text-rose-400">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white font-mono leading-none">
                {totalLikes}
              </div>
              <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                Total Likes
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-yellow-500/20 shadow-lg">
            <div className="p-1.5 rounded-full bg-yellow-500/10 text-yellow-400">
              <MessageSquare className="w-4 h-4 text-yellow-500" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white font-mono leading-none">
                {totalComments}
              </div>
              <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                Public Reviews
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Feed: Recent Visitor Comments */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Latest Visitor Reviews & Comments ({recentComments.length})
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">Updates live</span>
          </div>

          {recentComments.length === 0 ? (
            <div className="p-8 sm:p-10 rounded-3xl bg-zinc-950/60 border border-zinc-900 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6 opacity-80" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-display uppercase tracking-wide">
                  Be the First to Leave a Public Comment!
                </h4>
                <p className="text-xs text-zinc-400 font-sans max-w-md mx-auto mt-1 leading-relaxed">
                  Share your experience, ask a question, or leave feedback on your favorite West African species. Every comment appears here for all visitors to see.
                </p>
              </div>
              {/* Quick comment suggestion buttons */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {LIVESTOCK_DATA.slice(0, 4).map(fish => (
                  <button
                    key={fish.id}
                    onClick={() => setActiveModalFish(fish)}
                    className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/5 hover:border-yellow-500/30 text-xs font-mono text-zinc-300 hover:text-yellow-400 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3 h-3 text-yellow-500" />
                    Review {fish.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              {recentComments.map((comment) => {
                const fish = getFishById(comment.fishId);
                const fishName = fish ? fish.name : "West African Specimen";
                const fishScientific = fish ? fish.scientificName : "";
                const fishImage = fish ? fish.image : undefined;

                return (
                  <div 
                    key={comment.id}
                    className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-zinc-950/60 border border-zinc-900 hover:border-yellow-500/30 transition-all duration-300 space-y-3.5 group shadow-lg"
                  >
                    {/* Top Row: User + Fish Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${comment.avatarColor || "from-yellow-500 to-amber-600"} flex items-center justify-center text-white font-bold text-xs shadow-md uppercase`}>
                          {comment.authorName ? comment.authorName.charAt(0) : "A"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">
                              {comment.authorName}
                            </span>
                            {comment.location && (
                              <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1 bg-zinc-900/80 px-2 py-0.5 rounded-md border border-white/5">
                                <Globe className="w-2.5 h-2.5 text-zinc-500" />
                                {comment.location}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1 mt-0.5">
                            <Clock className="w-2.5 h-2.5" />
                            {formatRelativeTime(comment.createdAt)}
                          </div>
                        </div>
                      </div>

                      {/* Associated Fish Badge with Quick Modal Link */}
                      {fish && (
                        <button
                          onClick={() => setActiveModalFish(fish)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800/90 border border-white/5 hover:border-yellow-500/30 text-xs font-mono text-zinc-300 hover:text-white transition-all cursor-pointer group/fish"
                          title="View all comments on this fish"
                        >
                          {fishImage && (
                            <img 
                              src={fishImage} 
                              alt={fishName} 
                              className="w-5 h-5 rounded-md object-cover"
                              referrerPolicy="no-referrer"
                            />
                          )}
                          <span className="font-bold text-yellow-400 group-hover/fish:underline">
                            {fishName}
                          </span>
                          <span className="text-[10px] text-zinc-400 italic hidden sm:inline">
                            ({fishScientific})
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Content Box */}
                    <div className="bg-zinc-900/40 p-3.5 sm:p-4 rounded-xl border border-white/5 text-zinc-200 text-xs sm:text-sm font-sans leading-relaxed">
                      {comment.content}
                    </div>

                    {/* Footer Actions: Like Button & View Specimen */}
                    <div className="flex items-center justify-between pt-1 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <FishLikeButton fishId={comment.fishId} size="sm" variant="pill" />
                        <span className="text-[11px] text-zinc-500 hidden sm:inline">
                          Like this specimen
                        </span>
                      </div>

                      {fish && (
                        <button
                          onClick={() => setActiveModalFish(fish)}
                          className="text-yellow-500 hover:text-yellow-400 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>All {getAllFishCommentsCount(comment.fishId)} Comments</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar: Most Liked Species Spotlight */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono font-bold text-rose-400 uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-rose-500" />
              Most Liked Species
            </h3>
            <span className="text-[11px] font-mono text-zinc-500">Live rankings</span>
          </div>

          <div className="space-y-3">
            {mostLiked.map((item, idx) => {
              const fish = getFishById(item.fishId);
              if (!fish) return null;

              const commentsCount = getAllFishCommentsCount(fish.id);

              return (
                <div 
                  key={fish.id}
                  className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900 hover:border-yellow-500/30 transition-all duration-300 flex items-center gap-3.5 group"
                >
                  <div className="text-xs font-mono font-bold text-zinc-500 w-4 text-center">
                    #{idx + 1}
                  </div>

                  <div 
                    className="w-14 h-14 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/5 cursor-pointer group-hover:border-yellow-500/40 transition-colors"
                    onClick={() => setActiveModalFish(fish)}
                  >
                    <img 
                      src={fish.image} 
                      alt={fish.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => setActiveModalFish(fish)}
                      className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      {fish.name}
                    </h4>
                    <p className="text-[10px] font-mono text-zinc-400 italic truncate">
                      {fish.scientificName}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <FishLikeButton fishId={fish.id} size="sm" variant="ghost" />
                      <button
                        onClick={() => setActiveModalFish(fish)}
                        className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-yellow-400 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3 h-3 text-yellow-500" />
                        <span>{commentsCount}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Comment Call to Action */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 text-center space-y-3">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              Have Feedback or an Inquiry?
            </h4>
            <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
              Click on any fish to leave a public comment, share your tank parameters, or ask our export specialists directly.
            </p>
            {LIVESTOCK_DATA[0] && (
              <button
                onClick={() => setActiveModalFish(LIVESTOCK_DATA[0])}
                className="w-full py-2.5 px-4 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Write a Specimen Review
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reusable Comment Modal */}
      {activeModalFish && (
        <FishCommentsModal
          fish={activeModalFish}
          isOpen={!!activeModalFish}
          onClose={() => setActiveModalFish(null)}
        />
      )}
    </section>
  );
}
