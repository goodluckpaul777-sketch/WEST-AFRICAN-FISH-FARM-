import React, { useState } from "react";
import { 
  Fish, 
  ShieldCheck, 
  Truck, 
  Droplet, 
  ArrowRight, 
  Star, 
  Box, 
  Wind, 
  FileCheck,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import { FishSpecies, TabType } from "../types";

interface HomeViewProps {
  featuredSpecies: FishSpecies[];
  setTab: (tab: TabType) => void;
  onZoomLogo: () => void;
  onSelectSpecies: (species: FishSpecies) => void;
}

export default function HomeView({ featuredSpecies, setTab, onZoomLogo, onSelectSpecies }: HomeViewProps) {
  const [zoomedSpecies, setZoomedSpecies] = useState<FishSpecies | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  return (
    <div className="space-y-20 pb-16">
      {/* Premium Hero Section */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 z-10" />
        <img
          src="/src/assets/images/aquarium_hero_1784280304257.jpg"
          alt="Premium Aquascape Gallery"
          className="w-full h-[550px] md:h-[650px] object-cover opacity-60 filter brightness-75 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 md:px-16 max-w-4xl mx-auto space-y-5">
          <div className="flex items-center justify-center">
            <div 
              className="relative p-1 rounded-full bg-gradient-to-tr from-yellow-500 via-amber-300 to-yellow-600 shadow-2xl shadow-yellow-500/20 group cursor-zoom-in" 
              onClick={onZoomLogo}
              title="Click logo to zoom"
            >
              <img 
                src="https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/service_images/aa23a8fb-94cb-437b-863a-85fef7990ed6/8b5812fd-ae01-4fe5-943b-eb716ad8ecd0/1785170932529-b7f3f163-1000492224-cropped-1785170904586.jpg" 
                alt="West Africa Fish Farm Logo Cover" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover bg-white shadow-inner group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <ZoomIn className="w-8 h-8 text-white drop-shadow-md" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full text-yellow-400 text-[10px] md:text-xs font-mono tracking-widest uppercase">
              WEST AFRICA FISH FARM
            </div>
            <span className="text-zinc-400 font-mono tracking-widest text-[11px] md:text-xs uppercase font-semibold text-yellow-500/80">
              — BEYOND FISHING —
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-none uppercase font-display">
            PREMIUM FISH STOCK
            <span className="block mt-2 text-2xl md:text-4xl font-light italic text-yellow-500 normal-case font-serif tracking-normal">
              Available for Global Export
            </span>
          </h1>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl font-sans font-light">
            Directly sourcing the finest freshwater specimens. Connect with our experts via WhatsApp for the latest stock arrivals, live pricing, and shipping logistics.
          </p>

          <div className="pt-6">
            <button
              onClick={() => setTab("gallery")}
              className="px-8 py-4 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-yellow-500/10 flex items-center gap-3 font-mono"
            >
              CLICK TO VIEW LIVE STOCK
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Core Excellence Pillars Grid (As requested) */}
      <div className="bg-black/80 border border-zinc-900 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {[
            {
              title: "ELITE STOCK",
              desc: "EXOTIC SPECIMENS SOURCED FROM PREMIUM WILD LOCATIONS.",
            },
            {
              title: "EXPERT CARE",
              desc: "PROFESSIONAL HUSBANDRY AND SPECIALIZED QUARANTINE PROTOCOLS.",
            },
            {
              title: "VERIFIED TRUST",
              desc: "CERTIFIED HEALTH DOCUMENTATION AND GUARANTEED AUTHENTICITY.",
            },
            {
              title: "PRIORITY DELIVERY",
              desc: "RAPID, CLIMATE-CONTROLLED TRANSIT FOR LIVE ANIMALS.",
            },
            {
              title: "GLOBAL SOCIAL",
              desc: "ENGAGED COMMUNITY OF PASSIONATE AQUARISTS WORLDWIDE.",
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-zinc-950/50 border border-zinc-900/80 hover:border-yellow-500/30 transition-all duration-300 ${
                idx === 4 ? "sm:col-span-2 md:col-span-1 md:col-start-2" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/40 flex items-center justify-center text-yellow-500 shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-white tracking-wider font-display uppercase">
                {pillar.title}
              </h3>
              <p className="text-zinc-400 font-mono text-xs uppercase leading-relaxed tracking-wider max-w-xs">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance & Reach Section */}
      <div className="space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase font-display">
            Performance & Reach
          </h2>
          <p className="text-zinc-400 font-sans text-sm md:text-base max-w-xl mx-auto font-light">
            A testament to our dedication and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { metric: "25+", label: "Years of Expertise in Aquatic Cultivation" },
            { metric: "92%", label: "Secure Global Arrival Rate" },
            { metric: "120+", label: "Premium Freshwater Species Available" },
            { metric: "100%", label: "Certified Ethical Export Standards" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-yellow-500/25 transition-all duration-300 flex flex-col justify-center text-center space-y-3 min-h-[160px] relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500/0 to-transparent group-hover:via-yellow-500/40 transition-all duration-500" />
              <span className="text-4xl md:text-5xl font-black text-yellow-500 font-display tracking-tight">
                {item.metric}
              </span>
              <span className="text-zinc-400 text-xs md:text-sm font-sans font-light leading-snug px-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* WORLDWIDE TRANSIT Section */}
      <div className="p-8 md:p-12 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-950/60 to-black space-y-12">
        <div className="space-y-3 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase font-display">
            WORLDWIDE <span className="text-yellow-500">TRANSIT</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light font-sans">
            Our company ensures the safe international transit of live aquarium fish through a rigorous three-step packaging process:
          </p>
        </div>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Preparation & Oxygenation",
              desc: "Fish are placed in durable, leak-proof plastic bags filled with 1/3 water and 2/3 pure compressed oxygen, then tightly sealed.",
              icon: <Wind className="w-5 h-5 text-black" />,
            },
            {
              step: "02",
              title: "Thermal Insulation",
              desc: "The bags are placed inside a high-density styrofoam box, which is wrapped tightly in heavy-duty shipping tape to lock in the temperature and seal out external air. It is then wrapped in layering paper to maintain maximum insulation.",
              icon: <Box className="w-5 h-5 text-black" />,
            },
            {
              step: "03",
              title: "Outer Protection",
              desc: "The insulated setup is placed into a heavy-duty cardboard box, reinforced with water-resistant tape, and labeled with international \"Live Fish\" and \"Handle With Care\" markers.",
              icon: <ShieldCheck className="w-5 h-5 text-black" />,
            },
          ].map((item, index) => (
            <div key={index} className="space-y-4 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-500 flex items-center justify-center shadow-lg shadow-yellow-500/10">
                  {item.icon}
                </div>
                <span className="text-3xl font-black text-zinc-700 group-hover:text-yellow-500/40 transition-colors duration-300 font-mono">
                  {item.step}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight uppercase font-display pt-2">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Comprehensive & Authorized Documentation */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex gap-4 items-start max-w-2xl">
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-xl mt-1">
              <FileCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm md:text-base uppercase tracking-tight">
                Comprehensive & Authorized Documentation
              </h4>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light">
                We provide comprehensive and verified export documentation to ensure seamless international transit and full legal compliance for every shipment.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              THE GOLD STANDARD
            </span>
          </div>
        </div>
      </div>

      {/* West African Operations Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 p-8 md:p-12 bg-gradient-to-r from-zinc-950 via-zinc-900/40 to-black">
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-yellow-500/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-mono text-[10px] uppercase tracking-wider font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />
            DIRECT EXPORTER HUB
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight uppercase font-display">
            WEST AFRICAN <span className="text-yellow-500">FISH FARM</span> OPERATIONS
          </h2>
          <p className="text-zinc-300 text-sm leading-relaxed font-sans font-light">
            Welcome to <strong>West Africa Fish Farm (WAGFF)</strong>. Based directly in Lagos, Nigeria, we operate a fully licensed, professional quarantine and global export terminal. This secures unparalleled direct-access to legendary, sustainable wild-harvested specimens like the <strong>African Tigerfish</strong>, <strong>Giant Mbu Pufferfish</strong>, <strong>Aba Aba Knifefish</strong>, and pristine <strong>Atya Gabonensis Shrimps</strong>.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 font-mono text-[11px] text-zinc-400">
            <span className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span> Certified Health Documentation
            </span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span> Lagos Export Terminal Clearances
            </span>
            <span className="flex items-center gap-2">
              <span className="text-yellow-500">✓</span> Professional Acclimation
            </span>
          </div>
        </div>
      </div>

      {/* Featured Livestock Slider/Teaser */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="text-yellow-500 text-xs font-mono tracking-widest uppercase mb-1">Exclusives</div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2 uppercase font-display">
              FEATURED SHOWPIECES
              <span className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.6)] animate-pulse"></span>
            </h2>
          </div>
          <button
            onClick={() => setTab("gallery")}
            className="text-yellow-500 hover:text-yellow-400 text-xs font-mono tracking-wider uppercase flex items-center gap-1.5 transition-all"
          >
            See all exotics
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredSpecies.slice(0, 4).map((species) => (
            <div
              key={species.id}
              onClick={() => onSelectSpecies(species)}
              className="group cursor-pointer rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-yellow-500/30 transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 overflow-hidden bg-black">
                <img
                  src={species.image}
                  alt={species.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                
                <div className="absolute top-3 left-3 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedSpecies(species);
                      setZoomScale(1);
                    }}
                    className="p-1.5 rounded-full bg-black/80 hover:bg-yellow-500 text-zinc-300 hover:text-black border border-white/10 hover:border-transparent transition-all cursor-pointer shadow-lg"
                    title="Zoom Image"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-1 items-end z-10">
                  <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-wide bg-yellow-500 text-black shadow-lg">
                    FOR SALE
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-zinc-800 px-2 py-0.5 rounded text-[10px] font-mono uppercase text-zinc-300">
                  {species.waterType}
                </div>
              </div>
              <div className="p-4 space-y-2 flex-grow flex flex-col justify-between bg-zinc-950/10">
                <div>
                  <h3 className="text-white font-bold text-sm group-hover:text-yellow-500 transition-colors line-clamp-1">
                    {species.name}
                  </h3>
                  <p className="text-zinc-500 text-xs italic line-clamp-1">
                    {species.scientificName}
                  </p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                  <span>Care: {species.careLevel}</span>
                  <span className="flex items-center gap-1 text-yellow-500 font-bold">
                    View Specs
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Sea Mood Banner */}
      <div className="rounded-3xl p-8 md:p-12 bg-gradient-to-br from-zinc-950 to-zinc-900/20 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-yellow-500 text-xs font-mono uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-yellow-500/20" /> Custom Special Requests
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight uppercase font-display">
            Seeking a rare custom specimen?
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans font-light">
            Our West African network of sustainable gatherers and professional fishermen can source unique native strains, ancient dinosaur fish, or trophy-sized display specimens. Let us know your requirements.
          </p>
        </div>
        <button
          onClick={() => setTab("contact")}
          className="w-full md:w-auto px-8 py-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap shadow-lg shadow-yellow-500/10"
        >
          Inquire Custom Specimen
        </button>
      </div>

      {/* Immersive Image Zoom Lightbox Modal */}
      {zoomedSpecies && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-lg select-none"
          onClick={() => setZoomedSpecies(null)}
        >
          {/* Top Panel: Title and general actions */}
          <div 
            className="absolute top-4 inset-x-4 flex justify-between items-center z-10 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-left font-sans">
              <p className="text-yellow-500 text-[10px] font-mono uppercase tracking-widest font-semibold">Exotic Specimen Zoom</p>
              <h4 className="text-sm font-bold text-white tracking-tight">{zoomedSpecies.name}</h4>
              <p className="text-xs text-zinc-400 font-mono italic">{zoomedSpecies.scientificName}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomScale(prev => Math.min(prev + 0.25, 3));
                }}
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer font-mono"
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
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer font-mono"
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
                className="p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white rounded-lg border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer font-mono"
                title="Reset Zoom"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedSpecies(null);
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
              const sliceFishes = featuredSpecies.slice(0, 4);
              const currentIndex = sliceFishes.findIndex(f => f.id === zoomedSpecies.id);
              if (currentIndex > 0) {
                setZoomedSpecies(sliceFishes[currentIndex - 1]);
                setZoomScale(1);
              } else {
                setZoomedSpecies(sliceFishes[sliceFishes.length - 1]);
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
              const sliceFishes = featuredSpecies.slice(0, 4);
              const currentIndex = sliceFishes.findIndex(f => f.id === zoomedSpecies.id);
              if (currentIndex < sliceFishes.length - 1) {
                setZoomedSpecies(sliceFishes[currentIndex + 1]);
                setZoomScale(1);
              } else {
                setZoomedSpecies(sliceFishes[0]);
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
              src={zoomedSpecies.image} 
              alt={zoomedSpecies.name} 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-transform duration-300"
              style={{ transform: `scale(${zoomScale})` }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Bottom Specimen Meta Bar */}
          <div 
            className="absolute bottom-4 inset-x-4 max-w-2xl mx-auto bg-zinc-950/90 border border-white/10 rounded-2xl p-4 text-center space-y-2 z-10 shadow-2xl font-sans"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-xs font-mono text-zinc-400">
              <span><strong className="text-zinc-500">ORIGIN:</strong> {zoomedSpecies.origin}</span>
              <span><strong className="text-zinc-500">WATER:</strong> {zoomedSpecies.waterType}</span>
              <span><strong className="text-zinc-500">CARE:</strong> {zoomedSpecies.careLevel}</span>
              <span><strong className="text-zinc-500">DIET:</strong> {zoomedSpecies.diet}</span>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed line-clamp-2 md:line-clamp-none font-sans">
              {zoomedSpecies.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
