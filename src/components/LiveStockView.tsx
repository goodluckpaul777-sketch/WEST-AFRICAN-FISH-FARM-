import React, { useState, useMemo } from "react";
import { 
  MessageSquare, 
  Mail, 
  Copy, 
  Check, 
  Search, 
  Fish, 
  Sparkles, 
  ArrowDown, 
  Heart,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List
} from "lucide-react";
import { NEW_LIVESTOCK_DATA, StockFish } from "../data/newLivestock";
import { LIVESTOCK_DATA } from "../data/livestock";
import FishLikeButton from "./FishLikeButton";
import FishCommentsModal from "./FishCommentsModal";
import { getAllFishCommentsCount } from "../lib/communityService";

// Helper to find associated photo for any stock item
export const getSpeciesImage = (commonName: string, scientificName: string): string | undefined => {
  const cName = commonName.toLowerCase().trim();
  const sName = scientificName.toLowerCase().trim();

  // 1. Direct match in LIVESTOCK_DATA
  for (const item of LIVESTOCK_DATA) {
    const itemC = item.name.toLowerCase().trim();
    const itemS = item.scientificName.toLowerCase().trim();

    if (itemC === cName || itemS === sName) return item.image;
    if (cName.includes(itemC) || itemC.includes(cName)) return item.image;
    if (sName.includes(itemS) || itemS.includes(sName)) return item.image;
  }

  // 2. Specific taxonomy & alias matches
  if (cName.includes("aba") || sName.includes("gymnarchus") || sName.includes("gynachus")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1783473933773_IMG-20260706-WA0025.jpg";
  }
  if (cName.includes("tiger") || sName.includes("hydrocynus")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1782518253432_1778424284824.png";
  }
  if (cName.includes("pike") || sName.includes("hepsetus")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/64a74a2f-9c00-4b07-a951-f52adc5adda8/1787639475375_IMG_20260823_132911.jpg";
  }
  if (cName.includes("arowana") || sName.includes("heterotis")) {
    return "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785168652642-p5yhgxv0ii.png";
  }
  if (cName.includes("atya") || (cName.includes("shrimp") && !cName.includes("big")) || sName.includes("atya")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1784193162298_IMG_20260716_100812.jpg";
  }
  if (cName.includes("blood") || sName.includes("phractol") || sName.includes("phractolemus")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/64a74a2f-9c00-4b07-a951-f52adc5adda8/1787640470341_1000502536__1_.jpg";
  }
  if (cName.includes("butter fly") || cName.includes("butterfly") || sName.includes("pantodon")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1779838226008_1779838206913.png";
  }
  if (cName.includes("congo tetra") || sName.includes("phenacogram")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/64a74a2f-9c00-4b07-a951-f52adc5adda8/1787639475377_IMG_20260823_124815.jpg";
  }
  if (cName.includes("costae") || sName.includes("moenkhausia")) {
    return "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785169027197-xc4yqfpiuc.png";
  }
  if (cName.includes("dolphin") || sName.includes("mormyrus") || sName.includes("mommyyrus")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/64a74a2f-9c00-4b07-a951-f52adc5adda8/1787640470344_1000502573.jpg";
  }
  if (cName.includes("electric") || sName.includes("malapterurus")) {
    return "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785169069848-3stqpnq3xem.png";
  }
  if (cName.includes("elephant") || sName.includes("gnathonemus")) {
    return "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785168752178-hziwkg38h8a.png";
  }
  if (cName.includes("glass cat") || cName.includes("debauwie") || sName.includes("paraila") || sName.includes("eutropielus") || sName.includes("pareutropius")) {
    return "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785168862944-dnintsh1mt5.png";
  }
  if (cName.includes("snake") || sName.includes("channa")) {
    return "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785168629604-cw6k7ckebw.png";
  }
  if (cName.includes("spiny eel") || sName.includes("afromastacembelus")) {
    return "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785169076883-hh36491ia6j.png";
  }
  if (cName.includes("reed") || cName.includes("rope") || sName.includes("calabaricus") || sName.includes("erpetoichthys") || sName.includes("calabericus")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1779843879999_1779841066099.png";
  }
  if (cName.includes("eel cat") || sName.includes("gymnallabes")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1779838878836_1779838608486.png";
  }
  if (cName.includes("marble knife") || sName.includes("papyrocramus") || sName.includes("chitala")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1779836297198_IMG_20260526_160358.jpg";
  }
  if (cName.includes("crab") || sName.includes("cardisoma") || sName.includes("cardiosoma")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1783470991659_1783470958603.png";
  }
  if (cName.includes("puffer") || sName.includes("tetraodon") || sName.includes("tetradon")) {
    return "https://storage.googleapis.com/dala-prod-public-storage/attachments/66618de1-fc9f-45e0-b4d3-1b575900a875/1783472096434_1778420191965.png";
  }
  if (cName.includes("red eye") || sName.includes("arnoldichthys") || sName.includes("arnoldichytis")) {
    return "https://kpsqyyxkuvxlafrfyweo.supabase.co/storage/v1/object/public/shop_product_images/products/4ffd2e1c-59f6-4985-9243-82801337fa37/1785169061095-drw9mthgst.png";
  }

  return undefined;
};

export default function LiveStockView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [commentingFish, setCommentingFish] = useState<{
    id: string;
    name: string;
    scientificName: string;
    image?: string;
  } | null>(null);

  // High-res photo zoom state
  const [zoomedFishModal, setZoomedFishModal] = useState<{
    name: string;
    scientificName: string;
    image: string;
  } | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  
  // Client Info
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredFishes = useMemo(() => {
    let list = NEW_LIVESTOCK_DATA;
    if (searchTerm) {
      list = NEW_LIVESTOCK_DATA.filter((fish) => 
        fish.commonName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        fish.scientificName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [...list].sort((a, b) => a.commonName.localeCompare(b.commonName));
  }, [searchTerm]);

  const handleCheckboxChange = (sn: string, checked: boolean) => {
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (checked) {
        updated[sn] = 1; // Default to 1 piece when checked
      } else {
        delete updated[sn];
      }
      return updated;
    });
  };

  const handleQuantityChange = (sn: string, quantity: number) => {
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[sn];
      } else {
        updated[sn] = quantity;
      }
      return updated;
    });
  };

  const generateMessage = () => {
    const itemsList = Object.entries(selectedItems).map(([sn, qty]) => {
      const fish = NEW_LIVESTOCK_DATA.find(f => f.sn === sn);
      return `- ${fish?.commonName} (${fish?.scientificName}): ${qty} pc(s)`;
    }).join("\n");

    return `Hello West Africa Fish Farm (WAGFF),

I would like to place an export order inquiry for the following stock:

${itemsList || "No items selected."}

Client Info:
Name: ${clientName || "[Your Name]"}
Email: ${email || "[Your Email]"}
Phone: ${phone || "[Your Phone]"}

Additional Notes:
${notes || "None"}
`;
  };

  const validateForm = () => {
    if (Object.keys(selectedItems).length === 0) {
      alert("Please select at least one item from the stock list below.");
      return false;
    }
    if (!clientName || !phone) {
      alert("Please fill in your Name and Phone Number in the Order Details form.");
      return false;
    }
    return true;
  };

  const orderWhatsApp = () => {
    if (!validateForm()) return;
    const url = `https://wa.me/2348036708191?text=${encodeURIComponent(generateMessage())}`;
    window.open(url, "_blank");
  };

  const orderEmail = () => {
    if (!validateForm()) return;
    const mailto = `mailto:westafricafishfarm@gmail.com?subject=${encodeURIComponent(`Stock Purchase Inquiry - ${clientName}`)}&body=${encodeURIComponent(generateMessage())}`;
    window.open(mailto, "_self");
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Title & Description */}
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-display uppercase">Available Stock List</h1>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl">
          Browse our complete inventory below. Select the species and quantities you wish to acquire, fill in your details, and send us your inquiry directly.
        </p>
      </div>

      {/* Prominent Order & Messaging Sign Banner */}
      <div className="bg-gradient-to-r from-yellow-500/15 via-zinc-900 to-zinc-900 border-2 border-yellow-500/40 p-5 md:p-6 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-xl text-yellow-400 flex-shrink-0 animate-pulse">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Easy Ordering & Messaging Sign
              </div>
              <h2 className="text-lg md:text-xl font-bold text-white font-display uppercase tracking-wide">
                How to Send Messages & Place Stock Orders
              </h2>
              <p className="text-zinc-300 text-xs font-sans max-w-xl leading-relaxed">
                Check species boxes in the table below, then click <strong>"Order via WhatsApp"</strong> or <strong>"Order via Email"</strong> to message us instantly (+234 803 670 8191).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                const el = document.getElementById("order-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-yellow-500/20 cursor-pointer"
            >
              <ArrowDown className="w-4 h-4" /> Go to Order Form
            </button>
            <a
              href="https://wa.me/2348036708191"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-black" /> Direct WhatsApp Chat
            </a>
          </div>
        </div>

        {/* 3 Step Visual Guide */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 font-mono text-xs">
          <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 flex items-center justify-center font-bold text-xs flex-shrink-0">1</span>
            <span className="text-zinc-300 text-[11px]">Select species & qty below</span>
          </div>
          <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 flex items-center justify-center font-bold text-xs flex-shrink-0">2</span>
            <span className="text-zinc-300 text-[11px]">Fill Name & Phone in Form</span>
          </div>
          <div className="bg-zinc-950/60 p-2.5 rounded-lg border border-white/5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 flex items-center justify-center font-bold text-xs flex-shrink-0">3</span>
            <span className="text-zinc-300 text-[11px]">Click "Order via WhatsApp"</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 md:gap-10">
        
        {/* Left Column: Stock Table / Grid */}
        <div className="xl:col-span-8 space-y-6">
          {/* Controls Bar: Search & View Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center bg-zinc-900/90 border border-white/10 rounded-full px-5 py-3.5 flex-1 shadow-md focus-within:border-yellow-500/50 transition-all">
              <Search className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search species by Common or Scientific Name..."
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

            {/* View Mode Toggle & Counter */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs font-mono text-zinc-400 bg-zinc-900/80 px-3.5 py-2.5 rounded-xl border border-white/5">
                <strong className="text-yellow-400">{filteredFishes.length}</strong> Species
              </span>

              <div className="flex items-center bg-zinc-900 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === "table"
                      ? "bg-yellow-500 text-black font-bold shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="Wide Table View"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-yellow-500 text-black font-bold shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                  title="Spacious Cards View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
              </div>
            </div>
          </div>

          {/* Table View Mode */}
          {viewMode === "table" && (
            <div className="bg-zinc-900/40 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-zinc-950/90 border-b border-white/10">
                      <th className="py-4 px-5 font-mono text-xs uppercase tracking-wider text-zinc-400 w-12 text-center">Select</th>
                      <th className="py-4 px-4 font-mono text-xs uppercase tracking-wider text-zinc-400 w-16">S/N</th>
                      <th className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-zinc-400 min-w-[280px]">Specimen / Common Name</th>
                      <th className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-zinc-400 min-w-[200px]">Scientific Name</th>
                      <th className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-zinc-400 min-w-[140px]">Community</th>
                      <th className="py-4 px-6 font-mono text-xs uppercase tracking-wider text-zinc-400 min-w-[120px]">Order Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredFishes.map((fish, idx) => {
                      const isSelected = !!selectedItems[fish.sn];
                      
                      // Match with gallery fish or custom image lookup
                      const matchedGalleryFish = LIVESTOCK_DATA.find(
                        (f) => f.name.toLowerCase() === fish.commonName.toLowerCase() ||
                               f.scientificName.toLowerCase() === fish.scientificName.toLowerCase()
                      );
                      const fishImage = matchedGalleryFish?.image || getSpeciesImage(fish.commonName, fish.scientificName);
                      const communityId = matchedGalleryFish ? matchedGalleryFish.id : `stock_${fish.sn.toLowerCase()}`;
                      const fishCommentsCount = getAllFishCommentsCount(communityId);

                      return (
                        <tr 
                          key={`${fish.sn}-${fish.commonName}-${idx}`} 
                          className={`hover:bg-yellow-500/[0.04] transition-colors group ${isSelected ? 'bg-yellow-500/10' : ''}`}
                        >
                          <td className="py-5 px-5 align-middle text-center">
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              onChange={(e) => handleCheckboxChange(fish.sn, e.target.checked)}
                              className="w-5 h-5 rounded-md border-zinc-700 bg-zinc-950 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                            />
                          </td>
                          <td className="py-5 px-4 text-xs font-mono text-zinc-400 align-middle font-bold">#{fish.sn}</td>
                          <td className="py-5 px-6 align-middle">
                            <div className="flex items-center gap-4">
                              {/* Fish Photo Thumbnail */}
                              {fishImage ? (
                                <div
                                  onClick={() => {
                                    setZoomedFishModal({
                                      name: fish.commonName,
                                      scientificName: fish.scientificName,
                                      image: fishImage
                                    });
                                    setZoomScale(1);
                                  }}
                                  className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-black border border-white/10 group-hover:border-yellow-500/50 flex-shrink-0 cursor-zoom-in group/thumb shadow-lg"
                                  title={`Click to zoom photo of ${fish.commonName}`}
                                >
                                  <img
                                    src={fishImage}
                                    alt={fish.commonName}
                                    className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-500"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity duration-200">
                                    <ZoomIn className="w-5 h-5 text-yellow-400 drop-shadow" />
                                  </div>
                                </div>
                              ) : (
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-800/40 border border-white/5 flex items-center justify-center flex-shrink-0 text-zinc-500">
                                  <Fish className="w-7 h-7 opacity-30 text-yellow-500/60" />
                                </div>
                              )}

                              <div className="space-y-1">
                                <div className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors">
                                  {fish.commonName}
                                </div>
                                {fishImage ? (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setZoomedFishModal({
                                        name: fish.commonName,
                                        scientificName: fish.scientificName,
                                        image: fishImage
                                      });
                                      setZoomScale(1);
                                    }}
                                    className="inline-flex items-center gap-1.5 text-xs font-mono text-yellow-500 hover:text-yellow-400 transition-colors cursor-pointer"
                                  >
                                    <ZoomIn className="w-3.5 h-3.5" />
                                    <span>Zoom Photo</span>
                                  </button>
                                ) : (
                                  <span className="text-[11px] font-mono text-zinc-500">Specimen Available</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-5 px-6 text-sm font-mono text-zinc-300 italic align-middle tracking-wide">{fish.scientificName}</td>
                          <td className="py-5 px-6 align-middle">
                            <div className="flex items-center gap-2">
                              <FishLikeButton 
                                fishId={communityId} 
                                size="sm" 
                                variant="ghost" 
                              />
                              <button
                                onClick={() => {
                                  setCommentingFish({
                                    id: communityId,
                                    name: fish.commonName,
                                    scientificName: fish.scientificName,
                                    image: fishImage
                                  });
                                }}
                                className="px-2.5 py-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-yellow-400 border border-white/5 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                                title="View & Add Public Comments"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-yellow-500" />
                                <span>{fishCommentsCount}</span>
                              </button>
                            </div>
                          </td>
                          <td className="py-5 px-6 align-middle">
                            {isSelected ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="1"
                                  className="w-20 bg-zinc-950 border border-yellow-500/40 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-yellow-400 font-bold shadow-inner"
                                  value={selectedItems[fish.sn] || 1}
                                  onChange={(e) => handleQuantityChange(fish.sn, parseInt(e.target.value) || 0)}
                                />
                                <span className="text-xs font-mono text-zinc-400">pcs</span>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleCheckboxChange(fish.sn, true)}
                                className="text-xs font-mono text-zinc-500 hover:text-yellow-400 transition-colors cursor-pointer px-2.5 py-1 rounded-lg border border-dashed border-zinc-800 hover:border-yellow-500/30"
                              >
                                + Add Qty
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                    {filteredFishes.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-16 text-center text-zinc-500 font-mono text-sm">
                          <Fish className="w-10 h-10 mx-auto mb-3 opacity-20 text-yellow-500" />
                          No species found matching "{searchTerm}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Spacious Card Grid View Mode */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {filteredFishes.map((fish, idx) => {
                const isSelected = !!selectedItems[fish.sn];
                const matchedGalleryFish = LIVESTOCK_DATA.find(
                  (f) => f.name.toLowerCase() === fish.commonName.toLowerCase() ||
                         f.scientificName.toLowerCase() === fish.scientificName.toLowerCase()
                );
                const fishImage = matchedGalleryFish?.image || getSpeciesImage(fish.commonName, fish.scientificName);
                const communityId = matchedGalleryFish ? matchedGalleryFish.id : `stock_${fish.sn.toLowerCase()}`;
                const fishCommentsCount = getAllFishCommentsCount(communityId);

                return (
                  <div 
                    key={`${fish.sn}-${fish.commonName}-${idx}`}
                    className={`bg-zinc-900/40 border rounded-3xl overflow-hidden flex flex-col transition-all duration-300 shadow-xl ${
                      isSelected ? "border-yellow-500 bg-yellow-500/5 shadow-yellow-500/5" : "border-white/10 hover:border-yellow-500/30"
                    }`}
                  >
                    <div 
                      className="relative h-60 overflow-hidden bg-black flex-shrink-0 cursor-zoom-in"
                      onClick={() => {
                        if (fishImage) {
                          setZoomedFishModal({
                            name: fish.commonName,
                            scientificName: fish.scientificName,
                            image: fishImage
                          });
                          setZoomScale(1);
                        }
                      }}
                    >
                      {fishImage ? (
                        <img 
                          src={fishImage} 
                          alt={fish.commonName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-950 text-zinc-600">
                          <Fish className="w-12 h-12 opacity-30 text-yellow-500" />
                        </div>
                      )}

                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-black/80 backdrop-blur-md rounded-full font-mono text-xs text-yellow-400 font-bold border border-white/10">
                          #{fish.sn}
                        </span>
                      </div>

                      {fishImage && (
                        <div className="absolute top-4 right-4 z-10">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setZoomedFishModal({
                                name: fish.commonName,
                                scientificName: fish.scientificName,
                                image: fishImage
                              });
                              setZoomScale(1);
                            }}
                            className="p-2 rounded-full bg-black/80 text-white hover:text-yellow-400 border border-white/10 transition-colors shadow-lg"
                            title="Zoom Photo"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{fish.commonName}</h3>
                        <p className="text-xs font-mono text-zinc-400 italic">{fish.scientificName}</p>
                      </div>

                      {/* Community Likes & Comments */}
                      <div className="flex items-center justify-between py-2.5 px-3.5 bg-zinc-950/70 rounded-xl border border-white/5 text-xs font-mono">
                        <FishLikeButton fishId={communityId} size="sm" variant="pill" />
                        <button
                          type="button"
                          onClick={() => {
                            setCommentingFish({
                              id: communityId,
                              name: fish.commonName,
                              scientificName: fish.scientificName,
                              image: fishImage
                            });
                          }}
                          className="flex items-center gap-1.5 text-zinc-300 hover:text-yellow-400 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-yellow-500" />
                          <span>{fishCommentsCount} {fishCommentsCount === 1 ? "Comment" : "Comments"}</span>
                        </button>
                      </div>

                      {/* Select & Quantity Bar */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between mt-auto">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-zinc-300">
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleCheckboxChange(fish.sn, e.target.checked)}
                            className="w-4 h-4 rounded border-zinc-700 bg-zinc-950 text-yellow-500 focus:ring-yellow-500"
                          />
                          <span>Select to Order</span>
                        </label>

                        {isSelected && (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="1"
                              value={selectedItems[fish.sn] || 1}
                              onChange={(e) => handleQuantityChange(fish.sn, parseInt(e.target.value) || 0)}
                              className="w-16 bg-zinc-950 border border-yellow-500/40 rounded-lg px-2 py-1 text-white text-xs font-mono focus:outline-none"
                            />
                            <span className="text-[10px] font-mono text-zinc-400">pcs</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredFishes.length === 0 && (
                <div className="col-span-full py-16 text-center text-zinc-500 font-mono text-sm">
                  <Fish className="w-10 h-10 mx-auto mb-3 opacity-20 text-yellow-500" />
                  No species found matching "{searchTerm}".
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Order Form */}
        <div className="xl:col-span-4 space-y-6" id="order-form">
          <div className="bg-zinc-900/50 border border-yellow-500/30 p-6 rounded-2xl sticky top-24 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 font-display uppercase">
              <MessageSquare className="w-5 h-5 text-yellow-500" />
              Order & Message Form
            </h3>
            <p className="text-zinc-400 text-xs font-sans mb-6">
              Selected items are auto-drafted below. Fill in your details and click to send directly to WhatsApp or Email.
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-400 block">Full Name <span className="text-yellow-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white font-sans text-xs focus:outline-none focus:border-yellow-500/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-400 block">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white font-sans text-xs focus:outline-none focus:border-yellow-500/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-400 block">Phone / WhatsApp <span className="text-yellow-500">*</span></label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white font-mono text-xs focus:outline-none focus:border-yellow-500/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-mono text-zinc-400 block">Additional Notes</label>
                <textarea
                  placeholder="Any specific instructions, sizes, or parameters..."
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-zinc-100 placeholder-zinc-600 font-sans text-xs focus:outline-none focus:border-yellow-500/40 transition-colors"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 space-y-2 mb-6">
              <span className="text-[9px] font-mono uppercase text-zinc-500 block tracking-wider flex justify-between items-center">
                Draft Message Preview
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateMessage());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1 hover:text-yellow-500 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </span>
              <div className="font-mono text-[10px] text-zinc-400 leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                {generateMessage()}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={orderWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-black text-emerald-500" />
                Order via WhatsApp
              </button>
              
              <button
                onClick={orderEmail}
                className="w-full py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Order via Email
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Bottom Quick Bar so users never miss how to send message */}
      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto bg-zinc-900/95 border-2 border-yellow-500/60 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 flex-shrink-0">
            <Fish className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-white font-mono font-bold text-xs truncate">
              {Object.keys(selectedItems).length > 0 
                ? `${Object.keys(selectedItems).length} Species Selected` 
                : "Need to Send a Message?"}
            </div>
            <div className="text-zinc-400 text-[10px] font-sans truncate">
              {Object.keys(selectedItems).length > 0 
                ? "Tap button to fill details & send" 
                : "Select items or tap to jump to Order Form"}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById("order-form");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-lg shadow-yellow-500/20"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Send Message
        </button>
      </div>

      {/* Community Comments Modal */}
      {commentingFish && (
        <FishCommentsModal
          fish={commentingFish}
          isOpen={!!commentingFish}
          onClose={() => setCommentingFish(null)}
        />
      )}

      {/* Stock Image Zoom Modal */}
      {zoomedFishModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setZoomedFishModal(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-zinc-900 border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/80">
              <div>
                <h3 className="text-lg md:text-xl font-black text-white uppercase font-display">
                  {zoomedFishModal.name}
                </h3>
                <p className="text-xs font-mono text-yellow-500 italic">
                  {zoomedFishModal.scientificName}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoomScale(prev => Math.min(prev + 0.25, 3))}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(prev => Math.max(prev - 0.25, 0.75))}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomScale(1)}
                  className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomedFishModal(null)}
                  className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/30 transition-colors ml-2 cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Image Stage */}
            <div className="relative w-full h-[380px] md:h-[500px] overflow-hidden bg-black flex items-center justify-center p-4 select-none">
              <img
                src={zoomedFishModal.image}
                alt={zoomedFishModal.name}
                style={{ transform: `scale(${zoomScale})` }}
                className="max-w-full max-h-full object-contain transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Zoom: {Math.round(zoomScale * 100)}%</span>
              <span className="text-yellow-500/80">West Africa Fish Farm • Specimen Archive</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

