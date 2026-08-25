import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { 
  getFishLikesCount, 
  isFishLikedByUser, 
  toggleFishLike, 
  subscribeToCommunity 
} from "../lib/communityService";

interface FishLikeButtonProps {
  fishId: string;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  variant?: "pill" | "circle" | "ghost" | "card-corner";
  className?: string;
  onLikedChange?: (liked: boolean, count: number) => void;
}

export default function FishLikeButton({
  fishId,
  size = "md",
  showCount = true,
  variant = "pill",
  className = "",
  onLikedChange
}: FishLikeButtonProps) {
  const [liked, setLiked] = useState(() => isFishLikedByUser(fishId));
  const [likesCount, setLikesCount] = useState(() => getFishLikesCount(fishId));
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setLiked(isFishLikedByUser(fishId));
    setLikesCount(getFishLikesCount(fishId));

    const unsubscribe = subscribeToCommunity(() => {
      setLiked(isFishLikedByUser(fishId));
      setLikesCount(getFishLikesCount(fishId));
    });

    return unsubscribe;
  }, [fishId]);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);

    const result = await toggleFishLike(fishId);
    setLiked(result.liked);
    setLikesCount(result.newCount);

    if (onLikedChange) {
      onLikedChange(result.liked, result.newCount);
    }
  };

  // Icon sizing
  const iconSizeClass = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }[size];

  const textSizeClass = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm"
  }[size];

  if (variant === "card-corner") {
    return (
      <button
        onClick={handleToggleLike}
        title={liked ? "Unlike this fish" : "Like this fish"}
        className={`group/like relative flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer border ${
          liked
            ? "bg-rose-500/25 border-rose-500/60 text-rose-400 shadow-rose-500/20"
            : "bg-black/75 border-white/10 hover:border-rose-500/40 text-zinc-300 hover:text-rose-400"
        } ${className}`}
      >
        <Heart
          className={`${iconSizeClass} transition-transform duration-300 ${
            liked
              ? "fill-rose-500 text-rose-500 scale-110"
              : "group-hover/like:scale-110"
          } ${animating ? "scale-125 animate-ping" : ""}`}
        />
        {showCount && (
          <span className={`font-mono font-bold leading-none ${textSizeClass} ${liked ? "text-rose-300" : "text-zinc-300"}`}>
            {likesCount}
          </span>
        )}
      </button>
    );
  }

  if (variant === "circle") {
    return (
      <button
        onClick={handleToggleLike}
        title={liked ? "Unlike this fish" : "Like this fish"}
        className={`relative p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer border flex items-center justify-center ${
          liked
            ? "bg-rose-500/20 border-rose-500/60 text-rose-400 shadow-rose-500/20"
            : "bg-zinc-900/80 hover:bg-zinc-800 border-white/10 hover:border-rose-500/40 text-zinc-300 hover:text-rose-400"
        } ${className}`}
      >
        <Heart
          className={`${iconSizeClass} transition-transform duration-300 ${
            liked
              ? "fill-rose-500 text-rose-500 scale-110"
              : "hover:scale-110"
          } ${animating ? "scale-125" : ""}`}
        />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleLike}
      title={liked ? "You liked this fish" : "Like this fish"}
      className={`group/like inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer font-mono border ${
        liked
          ? "bg-rose-500/20 border-rose-500/50 text-rose-400 hover:bg-rose-500/30 shadow-sm shadow-rose-500/20"
          : "bg-zinc-900/80 hover:bg-zinc-800 border-white/10 hover:border-rose-500/40 text-zinc-300 hover:text-rose-400"
      } ${className}`}
    >
      <Heart
        className={`${iconSizeClass} transition-all duration-300 ${
          liked
            ? "fill-rose-500 text-rose-500 scale-110"
            : "group-hover/like:scale-110 group-hover/like:text-rose-400"
        } ${animating ? "scale-125" : ""}`}
      />
      {showCount && (
        <span className={`font-bold ${textSizeClass} ${liked ? "text-rose-300 font-extrabold" : "text-zinc-300"}`}>
          {likesCount}
        </span>
      )}
    </button>
  );
}
