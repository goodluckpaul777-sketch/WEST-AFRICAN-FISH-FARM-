import React from "react";
import { Info, ShieldCheck, Globe, Fish, HeartHandshake, Award, Truck, Thermometer, CheckCircle2, Mail } from "lucide-react";

export default function AboutView() {
  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full text-yellow-400 text-xs font-mono tracking-widest uppercase">
          WEST AFRICA FISH FARM — BEYOND FISHING
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-display">
          About Our Farm & Operations
        </h1>
        <p className="text-zinc-400 font-mono text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
          Premier exporter and conditioner of indigenous West African freshwater fish, specialized aquatic fauna, and rare wild-caught specimens.
        </p>
      </div>

      {/* Key Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl text-center space-y-1">
          <div className="text-2xl md:text-3xl font-extrabold text-yellow-400 font-display">100+</div>
          <div className="text-[11px] font-mono uppercase text-zinc-400">Native Species</div>
        </div>
        <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl text-center space-y-1">
          <div className="text-2xl md:text-3xl font-extrabold text-yellow-400 font-display">14 Days</div>
          <div className="text-[11px] font-mono uppercase text-zinc-400">Bio-Quarantine</div>
        </div>
        <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl text-center space-y-1">
          <div className="text-2xl md:text-3xl font-extrabold text-yellow-400 font-display">92%+</div>
          <div className="text-[11px] font-mono uppercase text-zinc-400">Live Arrival Guarantee</div>
        </div>
        <div className="bg-zinc-900/60 border border-white/5 p-5 rounded-2xl text-center space-y-1">
          <div className="text-2xl md:text-3xl font-extrabold text-yellow-400 font-display">Global</div>
          <div className="text-[11px] font-mono uppercase text-zinc-400">Air Freight Export</div>
        </div>
      </div>

      {/* Company Story & Overview */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-10 space-y-8">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 flex-shrink-0">
            <Fish className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider font-display">
              Who We Are
            </h2>
            <p className="text-zinc-400 font-mono text-xs">
              Pioneers in West African Ichthyology & Commercial Aquaculture
            </p>
          </div>
        </div>

        <div className="text-zinc-300 font-sans text-sm md:text-base leading-relaxed space-y-4">
          <p>
            <strong className="text-yellow-400">West Africa Fish Farm (WAGFF)</strong> was founded with a clear, singular vision: to connect international aquarists, commercial importers, public aquariums, and research institutions with the extraordinary biodiversity of West African freshwater aquatic life. Operating under the motto <em>"Beyond Fishing,"</em> we go far beyond traditional fish harvesting.
          </p>
          <p>
            Our specialized facilities in Nigeria serve as a central hub for conditioning, health monitoring, and export prep for rare riverine species originating from the Niger River Basin, Lake Chad basin, Cross River, and Congo river networks. From ancient oddballs like <em>Polypterus</em> (Bichirs), <em>Gnathonemus petersii</em> (Elephant Nose), and <em>Erpetoichthys calabaricus</em> (Rope Fish) to vibrant <em>Aphyosemion</em> killifish, African tetras, and electric catfish, we ensure every specimen meets world-class export standards.
          </p>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1 */}
        <div className="bg-zinc-900/60 border border-yellow-500/20 p-6 md:p-8 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
              14-Day Bio-Security Protocol
            </h3>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
            Wild-caught specimens undergo a strict 14-day purging and quarantine routine. We utilize medical-grade water filtration, UV sterilization, therapeutic salt baths, and specialized diets to eliminate parasites, stabilize stress levels, and ensure specimens are actively eating before air freight booking.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-zinc-900/60 border border-yellow-500/20 p-6 md:p-8 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
              Sustainable & Ethical Harvesting
            </h3>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
            We partner directly with artisanal indigenous fishing communities along West African waterways. By providing fair wages, non-destructive netting equipment, and environmental education, we promote sustainable harvest practices that protect river ecosystems for generations.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-zinc-900/60 border border-yellow-500/20 p-6 md:p-8 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
              Custom Air Cargo Packaging
            </h3>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
            International flights require robust packaging engineering. Depending on climate and species, we pack using double-walled heavy-duty bags, insulated styrofoam containers or custom boxes, pure medical oxygen, and weather-tailored temperature packs to guarantee transit stability.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-zinc-900/60 border border-yellow-500/20 p-6 md:p-8 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">
              Full Regulatory Compliance
            </h3>
          </div>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
            Every shipment is cleared with official Veterinary Health Certificates, Ministry of Agriculture permits, Air Waybill documentation, and full CITES certification where mandated. We manage seamless customs clearance for importers globally.
          </p>
        </div>
      </div>

      {/* Species Specialties Section */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-10 space-y-6">
        <h3 className="text-xl font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          Our West African Species Expertise
        </h3>
        <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
          We specialize in supplying authentic, correctly identified African aquatic species. Our core catalog includes:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 font-mono text-xs">
          {[
            "Polypterus (Bichir) Species",
            "Gnathonemus petersii (Elephant Nose)",
            "Erpetoichthys calabaricus (Rope Fish)",
            "Malapterurus electricus (Electric Catfish)",
            "Channa striata / asiatica (Snakehead)",
            "Aphyosemion & Epiplatys Killifish",
            "African Tetras (Red Eye, Arnoldichthys)",
            "Protopterus (African Lungfish)",
            "Crustaceans & Freshwater Crabs",
          ].map((item, idx) => (
            <div key={idx} className="bg-zinc-950 p-3 rounded-xl border border-white/5 flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-yellow-500/10 via-zinc-900 to-zinc-950 border border-yellow-500/30 p-8 rounded-3xl text-center space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-white font-display uppercase">
          Ready to Partner with West Africa Fish Farm?
        </h3>
        <p className="text-zinc-400 font-sans text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Explore our live Stock List or get in touch with our sales & freight team directly at <strong className="text-white font-mono">westafricafishfarm@gmail.com</strong> for custom wholesale orders, airport air-cargo bookings, or holding facility advice.
        </p>
        <div className="pt-2 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:westafricafishfarm@gmail.com?subject=Sales%20%26%20Freight%20Inquiry"
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs rounded-full uppercase tracking-wider transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact Sales & Freight
          </a>
        </div>
      </div>
    </div>
  );
}

