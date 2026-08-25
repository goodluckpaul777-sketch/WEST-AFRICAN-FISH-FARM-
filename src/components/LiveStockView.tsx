import React, { useState, useMemo } from "react";
import { MessageSquare, Mail, Copy, Check, Search, Fish, Sparkles, ArrowDown } from "lucide-react";
import { NEW_LIVESTOCK_DATA, StockFish } from "../data/newLivestock";

export default function LiveStockView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stock Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center bg-zinc-900 border border-white/5 rounded-full px-4 py-3">
            <Search className="w-5 h-5 text-zinc-500 mr-3" />
            <input
              type="text"
              placeholder="Search by Common Name or Scientific Name..."
              className="bg-transparent border-none text-white w-full focus:outline-none font-mono text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-950/80 border-b border-white/5">
                    <th className="p-4 font-mono text-xs uppercase tracking-wider text-zinc-500">Select</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-wider text-zinc-500">S/N</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-wider text-zinc-500">Common Name</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-wider text-zinc-500">Scientific Name</th>
                    <th className="p-4 font-mono text-xs uppercase tracking-wider text-zinc-500">Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredFishes.map((fish, idx) => {
                    const isSelected = !!selectedItems[fish.sn];
                    return (
                      <tr key={`${fish.sn}-${fish.commonName}-${idx}`} className={`hover:bg-white/5 transition-colors ${isSelected ? 'bg-yellow-500/5' : ''}`}>
                        <td className="p-4">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={(e) => handleCheckboxChange(fish.sn, e.target.checked)}
                            className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-yellow-500 focus:ring-yellow-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-4 text-xs font-mono text-zinc-400">{fish.sn}</td>
                        <td className="p-4 text-sm font-medium text-white">{fish.commonName}</td>
                        <td className="p-4 text-xs font-mono text-zinc-400 italic">{fish.scientificName}</td>
                        <td className="p-4">
                          {isSelected && (
                            <input
                              type="number"
                              min="1"
                              className="w-16 bg-zinc-950 border border-white/10 rounded px-2 py-1 text-white text-xs font-mono focus:outline-none focus:border-yellow-500"
                              value={selectedItems[fish.sn] || 1}
                              onChange={(e) => handleQuantityChange(fish.sn, parseInt(e.target.value) || 0)}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {filteredFishes.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-zinc-500 font-mono text-sm">
                        <Fish className="w-8 h-8 mx-auto mb-2 opacity-20" />
                        No species found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Order Form */}
        <div className="space-y-6" id="order-form">
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
    </div>
  );
}

