import React, { useState, useEffect } from "react";
import { 
  Search, 
  DollarSign, 
  Info, 
  Mail, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  X, 
  ChevronLeft, 
  ChevronRight,
  MessageSquare,
  Heart
} from "lucide-react";
import { FishSpecies, WaterType, Temperament, CareLevel } from "../types";
import { LIVESTOCK_DATA } from "../data/livestock";
import FishLikeButton from "./FishLikeButton";
import FishCommentsModal from "./FishCommentsModal";
import { getAllFishCommentsCount, subscribeToCommunity } from "../lib/communityService";

interface LiveStockGalleryViewProps {
  onInquire: (species: FishSpecies) => void;
}

export default function LiveStockGalleryView({ onInquire }: LiveStockGalleryViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [zoomedFish, setZoomedFish] = useState<FishSpecies | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [commentingFish, setCommentingFish] = useState<FishSpecies | null>(null);
  const [, setCommunityVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToCommunity(() => {
      setCommunityVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);
  
  const filteredFishes = LIVESTOCK_DATA.filter(fish => 
    fish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Live Stock Gallery</h1>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl mx-auto">
          View our featured specimens with full images, real-time community likes, and public comments.
        </p>
      </div>

      <div className="w-full">
        <div className="flex justify-center mb-10">
          <div className="flex items-center bg-zinc-900/90 border border-white/10 rounded-full px-6 py-3.5 w-full max-w-xl shadow-lg focus-within:border-yellow-500/50 transition-all">
            <Search className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search gallery by common or scientific name..."
              className="bg-transparent border-none text-white w-full focus:outline-none font-mono text-sm placeholder:text-zinc-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="text-zinc-500 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 2xl:gap-12">
          {filteredFishes.map((fish) => {
            const commentsCount = getAllFishCommentsCount(fish.id);

            return (
              <div key={fish.id} className="bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden flex flex-col group hover:border-yellow-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-yellow-500/5">
                <div 
                  className="relative h-72 sm:h-80 md:h-88 overflow-hidden bg-black flex-shrink-0 cursor-zoom-in"
                  onClick={() => {
                    setZoomedFish(fish);
                    setZoomScale(1);
                  }}
                >
                  <img 
                    src={fish.image} 
                    alt={fish.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Top Left: Zoom and Heart Like Button */}
                  <div className="absolute top-5 left-5 flex items-center gap-2.5 z-10">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomedFish(fish);
                        setZoomScale(1);
                      }}
                      className="p-2.5 rounded-full bg-black/80 hover:bg-yellow-500 text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all cursor-pointer shadow-lg"
                      title="Zoom Image"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    
                    <FishLikeButton 
                      fishId={fish.id} 
                      size="sm" 
                      variant="card-corner" 
                    />
                  </div>

                  <div className="absolute top-5 right-5 px-3.5 py-1.5 bg-black/80 backdrop-blur-md rounded-full text-xs font-mono font-bold text-yellow-500 border border-yellow-500/30 shadow-lg">
                    {fish.status}
                  </div>
                </div>
                
                <div className="p-7 md:p-8 flex flex-col flex-grow space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-yellow-400 transition-colors">
                      {fish.name}
                    </h3>
                    <p className="text-xs font-mono text-zinc-400 italic tracking-wide">{fish.scientificName}</p>
                  </div>
                  
                  <p className="text-zinc-300 text-sm leading-relaxed font-sans font-light flex-grow">
                    {fish.description}
                  </p>
                  
                  {/* Community interaction strip on each card */}
                  <div className="flex items-center justify-between py-3 px-4 bg-zinc-950/80 rounded-2xl border border-white/5 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <FishLikeButton fishId={fish.id} size="sm" variant="pill" />
                    </div>

                    <button
                      onClick={() => setCommentingFish(fish)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-yellow-400 border border-white/5 transition-all cursor-pointer"
                      title="View or add comments"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-yellow-500" />
                      <span>{commentsCount} {commentsCount === 1 ? "Comment" : "Comments"}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto gap-3">
                    <button 
                      onClick={() => {
                        setZoomedFish(fish);
                        setZoomScale(1);
                      }}
                      className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4 text-yellow-400" />
                      Zoom
                    </button>

                    <div className="flex items-center gap-2.5">
                      <button 
                        onClick={() => setCommentingFish(fish)}
                        className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-yellow-400 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-yellow-500/10"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Discuss
                      </button>

                      <button 
                        onClick={() => onInquire(fish)}
                        className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-yellow-500/10 cursor-pointer"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
          {filteredFishes.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500">
              <Info className="w-8 h-8 mx-auto mb-4 opacity-20" />
              <p className="font-mono text-sm">No specimens found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Immersive Image Zoom Lightbox Modal */}
      {zoomedFish && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-lg select-none"
          onClick={() => setZoomedFish(null)}
        >
          {/* Top Panel: Title, Likes and general actions */}
          <div 
            className="absolute top-4 inset-x-4 flex justify-between items-center z-10 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-left">
              <p className="text-yellow-500 text-[10px] font-mono uppercase tracking-widest font-semibold">Exotic Specimen Zoom</p>
              <h4 className="text-sm font-bold text-white tracking-tight">{zoomedFish.name}</h4>
              <p className="text-xs text-zinc-400 font-mono italic">{zoomedFish.scientificName}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <FishLikeButton fishId={zoomedFish.id} size="sm" variant="pill" />

              <button
                onClick={() => {
                  setCommentingFish(zoomedFish);
                }}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-yellow-400 rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1.5 cursor-pointer font-mono"
                title="Open Comments"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Comments ({getAllFishCommentsCount(zoomedFish.id)})</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomScale(prev => Math.min(prev + 0.25, 3));
                }}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="hidden sm:inline">In</span>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomScale(prev => Math.max(prev - 0.25, 0.5));
                }}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
                <span className="hidden sm:inline">Out</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomScale(1);
                }}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedFish(null);
                }}
                className="p-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-lg border border-red-500/20 transition-all cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Left Navigation Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = filteredFishes.findIndex(f => f.id === zoomedFish.id);
              if (currentIndex > 0) {
                setZoomedFish(filteredFishes[currentIndex - 1]);
                setZoomScale(1);
              } else {
                setZoomedFish(filteredFishes[filteredFishes.length - 1]);
                setZoomScale(1);
              }
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white hover:text-yellow-400 transition-colors border border-white/5 cursor-pointer shadow-xl"
            title="Previous Specimen"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentIndex = filteredFishes.findIndex(f => f.id === zoomedFish.id);
              if (currentIndex < filteredFishes.length - 1) {
                setZoomedFish(filteredFishes[currentIndex + 1]);
                setZoomScale(1);
              } else {
                setZoomedFish(filteredFishes[0]);
                setZoomScale(1);
              }
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white hover:text-yellow-400 transition-colors border border-white/5 cursor-pointer shadow-xl"
            title="Next Specimen"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Canvas Container */}
          <div 
            className="w-full max-w-4xl h-[65vh] md:h-[70vh] flex items-center justify-center overflow-hidden relative cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={zoomedFish.image} 
              alt={zoomedFish.name} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoomScale})` }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bottom Specimen Meta Bar */}
          <div 
            className="absolute bottom-4 inset-x-4 max-w-2xl mx-auto bg-zinc-950/90 border border-white/10 rounded-2xl p-4 text-center space-y-2 z-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-xs font-mono text-zinc-400">
              <span><strong className="text-zinc-500">ORIGIN:</strong> {zoomedFish.origin}</span>
              <span><strong className="text-zinc-500">WATER:</strong> {zoomedFish.waterType}</span>
              <span><strong className="text-zinc-500">CARE:</strong> {zoomedFish.careLevel}</span>
              <span><strong className="text-zinc-500">DIET:</strong> {zoomedFish.diet}</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-2 md:line-clamp-none">
              {zoomedFish.description}
            </p>
          </div>
        </div>
      )}

      {/* Community Comments Modal */}
      {commentingFish && (
        <FishCommentsModal
          fish={commentingFish}
          isOpen={!!commentingFish}
          onClose={() => setCommentingFish(null)}
        />
      )}
    </div>
  );
}

