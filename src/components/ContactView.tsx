import React, { useState } from "react";
import { MessageSquare, Mail, MapPin, Phone, Clock } from "lucide-react";

import { FishSpecies } from "../types";

interface ContactViewProps {
  selectedSpecies?: FishSpecies | null;
}

export default function ContactView({ selectedSpecies }: ContactViewProps) {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(selectedSpecies ? `Hello West Africa Fish Farm (WAGFF),\n\nI would like to place an export order inquiry for:\n\nSpecimen: ${selectedSpecies.name} (${selectedSpecies.scientificName})` : "");

  const handleWhatsApp = () => { if (!name || !message) { alert("Please enter your name and message."); return; } const fullMessage = `Name: ${name}\nCompany: ${companyName || "N/A"}\nPhone: ${phone || "N/A"}\nEmail: ${email || "N/A"}\n\n${message}`; const url = `https://wa.me/2348036708191?text=${encodeURIComponent(fullMessage)}`; window.open(url, "_blank"); };

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:westafricafishfarm@gmail.com?subject=Contact%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nCompany: ${companyName || "N/A"}\nPhone: ${phone || "N/A"}\n\n${message}`)}`;
    window.open(mailto, "_self");
  };

  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Contact Us</h1>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl mx-auto">
          Get in touch with our team for inquiries, support, or special requests.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl space-y-6">
          <h3 className="text-xl font-bold text-white mb-6">Contact Information</h3>
          
          <div className="space-y-4 font-sans text-zinc-300">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase">Sales & Freight Email</div>
                <a href="mailto:westafricafishfarm@gmail.com" className="text-white font-bold hover:text-yellow-400 transition-colors">
                  westafricafishfarm@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase">WhatsApp & Sales Call</div>
                <a href="https://wa.me/2348036708191" target="_blank" rel="noreferrer" className="text-white font-bold hover:text-yellow-400 transition-colors">
                  +234 803 670 8191
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase">Air Cargo & Freight Coordination</div>
                <span className="text-zinc-300">Fast Airport-to-Airport Air Freight Export Worldwide</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase">Export Facility Hub</div>
                <span className="text-zinc-300">WAGFF LOGISTICS HUB (Lagos, Nigeria)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>
          <form onSubmit={handleEmail} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-zinc-400">Your Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none focus:border-yellow-500/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-zinc-400">Company Name (Optional)</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none focus:border-yellow-500/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-zinc-400">Phone / WhatsApp</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none focus:border-yellow-500/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-zinc-400">Email Address (Optional)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none focus:border-yellow-500/40" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-zinc-400">Message</label>
              <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-3 py-2.5 rounded bg-zinc-950 border border-white/5 text-white text-xs focus:outline-none focus:border-yellow-500/40" />
            </div>
            <div className="space-y-3">
              <button type="button" onClick={handleWhatsApp} className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer">
                <MessageSquare className="w-4 h-4 fill-black text-emerald-500" />
                Send via WhatsApp
              </button>
              <button type="submit" className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5 cursor-pointer">

              <Mail className="w-4 h-4" />
              Send via Email
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
