import React, { useState } from "react";
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
  ChevronRight 
} from "lucide-react";
import { FishSpecies, WaterType, Temperament, CareLevel } from "../types";
import { LIVESTOCK_DATA } from "../data/livestock";

interface LiveStockGalleryViewProps {
  onInquire: (species: FishSpecies) => void;
}

export default function LiveStockGalleryView({ onInquire }: LiveStockGalleryViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [zoomedFish, setZoomedFish] = useState<FishSpecies | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  
  const filteredFishes = LIVESTOCK_DATA.filter(fish => 
    fish.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Live Stock Gallery</h1>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl mx-auto">
          View our featured specimens with full images and details.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="flex items-center bg-zinc-900 border border-white/5 rounded-full px-4 py-3 w-full max-w-md">
            <Search className="w-5 h-5 text-zinc-500 mr-3" />
            <input
              type="text"
              placeholder="Search gallery..."
              className="bg-transparent border-none text-white w-full focus:outline-none font-mono text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFishes.map((fish) => (
            <div key={fish.id} className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden flex flex-col group hover:border-yellow-500/30 transition-colors">
              <div 
                className="relative h-64 overflow-hidden bg-black flex-shrink-0 cursor-zoom-in"
                onClick={() => {
                  setZoomedFish(fish);
                  setZoomScale(1);
                }}
              >
                <img 
                  src={fish.image} 
                  alt={fish.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedFish(fish);
                      setZoomScale(1);
                    }}
                    className="p-2 rounded-full bg-black/80 hover:bg-yellow-500 text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all cursor-pointer shadow-lg"
                    title="Zoom Image"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-xs font-mono font-bold text-yellow-500 border border-yellow-500/20">
                  {fish.status}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{fish.name}</h3>
                  <p className="text-xs font-mono text-zinc-500 italic">{fish.scientificName}</p>
                </div>
                
                <p className="text-zinc-400 text-sm mb-6 line-clamp-5 leading-relaxed">
                  {fish.description}
                </p>
                
                

                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                  <button 
                    onClick={() => {
                      setZoomedFish(fish);
                      setZoomScale(1);
                    }}
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider rounded transition-colors flex items-center gap-1.5"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    Zoom Image
                  </button>

                  <button 
                    onClick={() => onInquire(fish)}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs uppercase tracking-wider rounded transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
          
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
          {/* Top Panel: Title and general actions */}
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
    </div>
  );
}
