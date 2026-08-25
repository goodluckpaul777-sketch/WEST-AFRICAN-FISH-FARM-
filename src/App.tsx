import React, { useState } from "react";
import { Fish, Mail, Menu, X, Waves, BookOpen, Compass, ShieldCheck, ZoomIn, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TabType, FishSpecies } from "./types";
import { LIVESTOCK_DATA } from "./data/livestock";
import HomeView from "./components/HomeView";
import LiveStockView from "./components/LiveStockView";
import LiveStockGalleryView from "./components/LiveStockGalleryView";
import AboutView from "./components/AboutView";
import ContactView from "./components/ContactView";
import TermsView from "./components/TermsView";
const logoImg = "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/service_images/aa23a8fb-94cb-437b-863a-85fef7990ed6/8b5812fd-ae01-4fe5-943b-eb716ad8ecd0/1785170932529-b7f3f163-1000492224-cropped-1785170904586.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [selectedSpecies, setSelectedSpecies] = useState<FishSpecies | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoZoomed, setLogoZoomed] = useState(false);
  
  const featuredSpecies = LIVESTOCK_DATA.filter((s) => s.isFeatured);

  const renderActiveView = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeView
            featuredSpecies={featuredSpecies}
            setTab={setActiveTab}
            onZoomLogo={() => setLogoZoomed(true)}
            onSelectSpecies={(species) => {
              setSelectedSpecies(species);
              setActiveTab("contact");
            }}
          />
        );
      case "gallery":
        return <LiveStockGalleryView onInquire={(species) => { setSelectedSpecies(species); setActiveTab("contact"); }} />;
      case "livestock":
        return (
          <LiveStockView />
        );
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      case "terms":
        return <TermsView />;
      default:
    }
  };

  return (
    <div className="min-h-screen bg-[#020203] text-zinc-100 font-sans selection:bg-yellow-500/20 selection:text-yellow-300 flex flex-col justify-between">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 md:px-10 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setLogoZoomed(true)}
              className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden border border-yellow-500/20 bg-white shadow-md shadow-yellow-500/5 cursor-zoom-in group/logo"
              title="Click to zoom logo"
            >
              <img src={logoImg} alt="WAGFF Logo" className="w-full h-full object-cover group-hover/logo:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/logo:opacity-100 flex items-center justify-center transition-opacity duration-200">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </div>
            <div 
              onClick={() => { setActiveTab("home"); setSelectedSpecies(null); }}
              className="leading-none text-left cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="text-yellow-500 font-extrabold tracking-wider text-sm md:text-base font-display block uppercase">WEST AFRICA FISH FARM</span>
              <span className="text-zinc-400 font-semibold tracking-widest text-[9px] block font-mono mt-1">BEYOND FISHING</span>
            </div>
          </div>

          {/* Desktop Navigation Link Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {[
              { id: "home", label: "Home" },
              { id: "livestock", label: "Stock List" },
              { id: "gallery", label: "Live Stock" },
              { id: "about", label: "About Us" },
              { id: "terms", label: "Terms" },
              { id: "contact", label: "Contact" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as TabType);
                  setSelectedSpecies(null);
                }}
                className={`px-3 py-2 rounded-lg text-[11px] font-mono tracking-wide transition-all uppercase ${
                  activeTab === tab.id
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900/50 border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Right utility buttons: Inquiry sheet */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => setActiveTab("contact")}
              className="px-6 py-2.5 text-xs font-mono font-bold text-black bg-yellow-500 hover:bg-yellow-400 rounded-full transition-all flex items-center gap-2 uppercase tracking-wider"
            >
              INQUIRE NOW
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-900 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Nav Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur/Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-35"
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="lg:hidden fixed inset-y-0 right-0 w-64 bg-black/95 border-l border-zinc-900 z-40 pt-24 px-6 shadow-2xl flex flex-col justify-between pb-8"
            >
              <div className="space-y-3">
                {[
                  { id: "home", label: "Home" },
                  { id: "livestock", label: "Stock List" },
                  { id: "gallery", label: "Live Stock" },
                  { id: "about", label: "About Us" },
                  { id: "terms", label: "Terms" },
                  { id: "contact", label: "Contact" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as TabType);
                      setSelectedSpecies(null);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                      activeTab === tab.id
                        ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setActiveTab("contact");
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 text-xs font-mono font-bold text-black bg-yellow-500 hover:bg-yellow-400 rounded-full text-center uppercase tracking-wider cursor-pointer"
              >
                INQUIRE NOW
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Container Stage */}
      <main className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 md:px-10 py-10 flex-grow w-full">
        {renderActiveView()}
      </main>

      {/* Premium Dark Theme Footer */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8 mt-12 font-mono text-xs text-zinc-500">
        <div className="max-w-[1600px] 2xl:max-w-[1760px] mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setLogoZoomed(true)}
                className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border border-yellow-500/20 bg-white group/footerlogo cursor-zoom-in"
                title="Click to zoom logo"
              >
                <img src={logoImg} alt="WAGFF Logo" className="w-full h-full object-cover group-hover/footerlogo:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/footerlogo:opacity-100 flex items-center justify-center transition-opacity duration-200">
                  <ZoomIn className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div 
                onClick={() => { setActiveTab("home"); setSelectedSpecies(null); }}
                className="cursor-pointer group"
              >
                <span className="text-white font-bold tracking-wider font-display block group-hover:text-yellow-500 transition-colors uppercase">
                  WEST AFRICA FISH FARM
                </span>
                <span className="text-yellow-500/80 font-mono text-[9px] tracking-widest block uppercase font-semibold">
                  BEYOND FISHING
                </span>
              </div>
            </div>
            <p className="text-zinc-400 font-sans leading-relaxed">
              Global leaders in the export and distribution of exotic West African freshwater specimens, marine reef life, and unique riverine imports.
            </p>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-[10px] uppercase tracking-wider">Inventory Room</h4>
            <ul className="space-y-2 font-sans">
              <li>
                <button onClick={() => { setActiveTab("livestock"); setSelectedSpecies(null); }} className="hover:text-yellow-500 transition-colors text-left">
                  Freshwater Species
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab("livestock"); setSelectedSpecies(null); }} className="hover:text-yellow-500 transition-colors text-left">
                  Marine Reef Species
                </button>
              </li>
            </ul>
          </div>

          {/* Security Col */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-[10px] uppercase tracking-wider">Secure Operations</h4>
            <p className="text-zinc-400 font-sans leading-relaxed">
              We operate exclusively in a close and fish friendly environment.
            </p>
            <div className="flex gap-2 text-zinc-500">
              <span className="px-2 py-1 rounded bg-zinc-900/50 border border-white/5 text-[9px]">USDA CERTIFIED</span>
              <span className="px-2 py-1 rounded bg-zinc-900/50 border border-white/5 text-[9px]">REEF SAFE SOURCED</span>
            </div>
          </div>

        </div>

        {/* Copy Line */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 mt-12 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-zinc-500">
          <p>© {new Date().getFullYear()} West Africa Fish Farm. All rights reserved.</p>
          <div className="flex gap-4 font-mono text-[10px]">
            <button onClick={() => setActiveTab("terms")} className="hover:text-yellow-500 transition-colors">POLICIES</button>
            <button onClick={() => setActiveTab("terms")} className="hover:text-yellow-500 transition-colors">BIO-SECURITY</button>
            <button onClick={() => setActiveTab("contact")} className="hover:text-yellow-500 transition-colors">SUPPORT</button>
          </div>
        </div>
      </footer>

      {/* Logo Zoom Modal */}
      {logoZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setLogoZoomed(false)}
        >
          {/* Close button */}
          <button 
            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            onClick={() => setLogoZoomed(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Container */}
          <div 
            className="relative max-w-lg w-full aspect-square rounded-full overflow-hidden border-2 border-yellow-500/30 bg-white shadow-2xl p-4 flex items-center justify-center transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* The beautiful high-res logo */}
            <img 
              src={logoImg} 
              alt="WEST AFRICA FISH FARM - Zoomed Logo" 
              className="w-full h-full object-cover rounded-full" 
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* Floating Action Button for Stock List */}
      <button
        onClick={() => {
          setActiveTab("livestock");
          setSelectedSpecies(null);
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center gap-2 px-6 py-4 bg-yellow-500 hover:bg-yellow-400 text-black rounded-full shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all transform hover:scale-105 active:scale-95 group font-mono font-bold tracking-widest text-sm"
      >
        <ClipboardList className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
        STOCK LIST
      </button>

    </div>
  );
}
