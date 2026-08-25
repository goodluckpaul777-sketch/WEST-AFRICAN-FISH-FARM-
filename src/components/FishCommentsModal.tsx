import React, { useState, useEffect, useRef } from "react";
import { 
  MessageSquare, 
  Send, 
  X, 
  Heart, 
  Sparkles, 
  Globe, 
  User, 
  Clock, 
  CheckCircle2,
  Droplets,
  ShieldCheck
} from "lucide-react";
import { FishSpecies, FishComment } from "../types";
import { 
  getFishComments, 
  addFishComment, 
  subscribeToCommunity,
  getFishLikesCount,
  isFishLikedByUser,
  toggleFishLike
} from "../lib/communityService";
import FishLikeButton from "./FishLikeButton";

interface FishCommentsModalProps {
  fish: FishSpecies | {
    id: string;
    name: string;
    scientificName: string;
    image?: string;
    waterType?: string;
    status?: string;
    origin?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function FishCommentsModal({ fish, isOpen, onClose }: FishCommentsModalProps) {
  const [comments, setComments] = useState<FishComment[]>([]);
  const [authorName, setAuthorName] = useState(() => {
    return localStorage.getItem("waff_user_comment_name") || "";
  });
  const [location, setLocation] = useState(() => {
    return localStorage.getItem("waff_user_comment_location") || "";
  });
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const commentsEndRef = useRef<HTMLDivElement>(null);

  // Load comments and subscribe to live changes
  useEffect(() => {
    if (!isOpen || !fish) return;

    setComments(getFishComments(fish.id));

    const unsubscribe = subscribeToCommunity(() => {
      setComments(getFishComments(fish.id));
    });

    return unsubscribe;
  }, [isOpen, fish]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;

    const trimmedName = authorName.trim() || "Aquarist Guest";
    const trimmedLocation = location.trim() || "Aquarium Enthusiast";

    // Save preferences
    localStorage.setItem("waff_user_comment_name", trimmedName);
    localStorage.setItem("waff_user_comment_location", trimmedLocation);

    setSubmitting(true);
    try {
      await addFishComment(fish.id, trimmedName, content, trimmedLocation);
      setContent("");
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
      
      // Update local state immediately
      setComments(getFishComments(fish.id));
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setSubmitting(false);
    }
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Fish Info and Like Button */}
        <div className="relative p-5 sm:p-6 border-b border-zinc-800/80 bg-gradient-to-r from-zinc-900/90 via-zinc-950 to-zinc-900/90">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4 pr-10">
            {fish.image && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-yellow-500/20 bg-black flex-shrink-0 shadow-lg">
                <img 
                  src={fish.image} 
                  alt={fish.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                  Community Wall
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate font-display">
                {fish.name}
              </h3>
              <p className="text-xs text-zinc-400 italic font-mono truncate">
                {fish.scientificName}
              </p>
            </div>
          </div>

          {/* Subheader action bar: Like Button & Comments Count */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
            <div className="flex items-center gap-2">
              <FishLikeButton fishId={fish.id} size="md" variant="pill" />
              <span className="text-xs font-mono text-zinc-400">
                Click heart to like
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-white/5">
              <MessageSquare className="w-3.5 h-3.5 text-yellow-500" />
              <span><strong>{comments.length}</strong> {comments.length === 1 ? "Comment" : "Comments"}</span>
            </div>
          </div>
        </div>

        {/* Comments Feed List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-zinc-900/60">
          {comments.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6 opacity-60" />
              </div>
              <h4 className="text-sm font-bold text-white font-display uppercase tracking-wide">
                No comments yet on this specimen
              </h4>
              <p className="text-xs text-zinc-400 font-sans max-w-sm mx-auto leading-relaxed">
                Be the first passionate aquarist to share your thoughts, husbandry experience, or appreciation for {fish.name}!
              </p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="pt-4 first:pt-0 space-y-2 group">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${comment.avatarColor || "from-yellow-500 to-amber-600"} flex items-center justify-center text-white font-bold text-xs shadow-md uppercase`}>
                      {comment.authorName ? comment.authorName.charAt(0) : "A"}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {comment.authorName}
                        </span>
                        {comment.location && (
                          <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                            • {comment.location}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">
                        {formatRelativeTime(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comment Content Body */}
                <div className="pl-10">
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans bg-zinc-900/40 p-3 rounded-2xl border border-white/5 group-hover:border-yellow-500/20 transition-colors">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={commentsEndRef} />
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="mx-4 sm:mx-6 my-2 p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-mono">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Your comment has been posted live for everyone to see!</span>
          </div>
        )}

        {/* Add Comment Form Footer */}
        <form 
          onSubmit={handleSubmit}
          className="p-4 sm:p-5 border-t border-zinc-800/80 bg-zinc-900/60 space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="relative">
              <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Your Name (e.g., Alex Johnson)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500/50 font-sans"
                maxLength={60}
              />
            </div>
            <div className="relative">
              <Globe className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Location (e.g., California, USA)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500/50 font-sans"
                maxLength={60}
              />
            </div>
          </div>

          <div className="relative">
            <textarea
              rows={2}
              placeholder={`Write a public comment about ${fish.name}...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-500/50 resize-none font-sans"
              maxLength={800}
              required
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] font-mono text-zinc-400">
              Visible to all visitors in real-time
            </span>

            <button
              type="submit"
              disabled={!content.trim() || submitting}
              className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 disabled:opacity-40 disabled:hover:bg-yellow-500 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-yellow-500/10"
            >
              {submitting ? (
                <>Posting...</>
              ) : (
                <>
                  Post Comment
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
