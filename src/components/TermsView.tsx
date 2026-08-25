import React from "react";
import { ShieldCheck, Truck, AlertCircle, FileText, CheckCircle2, DollarSign, Thermometer, HelpCircle, Mail } from "lucide-react";

export default function TermsView() {
  return (
    <div className="space-y-12 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full text-yellow-400 text-xs font-mono tracking-widest uppercase">
          WEST AFRICA FISH FARM — BEYOND FISHING
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight uppercase font-display">
          Terms & Conditions
        </h1>
        <p className="text-zinc-400 font-mono text-xs md:text-sm max-w-2xl mx-auto">
          Official policies governing livestock ordering, international air cargo transit, bio-security, and Live Arrival Guarantees (LAG).
        </p>
      </div>

      {/* Quick Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/60 border border-yellow-500/20 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display uppercase">92% Live Arrival</h3>
          <p className="text-zinc-400 text-xs leading-relaxed font-sans">
            Guaranteed 92% live arrival on all airport-to-airport direct cargo shipments when claimed within 24 hours of flight arrival.
          </p>
        </div>

        <div className="bg-zinc-900/60 border border-yellow-500/20 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display uppercase">3-Step Bio-Security</h3>
          <p className="text-zinc-400 text-xs leading-relaxed font-sans">
            Rigorous 14-day quarantine, pure oxygen purge, and medical grade double bags with temperature insulation.
          </p>
        </div>

        <div className="bg-zinc-900/60 border border-yellow-500/20 p-6 rounded-2xl space-y-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display uppercase">Global Air Cargo</h3>
          <p className="text-zinc-400 text-xs leading-relaxed font-sans">
            Direct airport-to-airport shipments with full export documentation, health certificates, and CITES compliance where required.
          </p>
        </div>
      </div>

      {/* Detailed Terms Document */}
      <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-6 md:p-10 space-y-10">
        
        {/* Section 1 */}
        <div className="space-y-4 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-black font-mono font-bold text-xs">
              01
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider font-display">
              Live Arrival Guarantee (LAG) Policy
            </h2>
          </div>
          <div className="text-zinc-300 font-sans text-sm leading-relaxed space-y-3 pl-11">
            <p>
              At <strong className="text-yellow-400">West Africa Fish Farm (WAGFF)</strong>, we take extreme pride in the health and vitality of our wild-caught and farm-conditioned specimens. We guarantee a <strong>92% Live Arrival rate</strong> for all direct air cargo shipments.
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400 text-xs font-mono">
              <li><strong className="text-white">DOA Notification Period:</strong> In the rare event of a Dead On Arrival (DOA), claims must be submitted within <strong>24 hours</strong> of flight arrival or cargo pickup.</li>
              <li><strong className="text-white">Required Evidence:</strong> Clear digital photographs showing the specimen inside the <em>unopened original sealed bag</em> next to the shipping label must be sent to us. No dark film, complex video resolution, or heavy file formats are required—simply clear photographic proof.</li>
              <li><strong className="text-white">Claim Resolution:</strong> Approved DOA claims within the 92% guarantee policy will be credited toward your next order or refunded (excluding freight charges, packing fees, and customs duties).</li>
              <li><strong className="text-white">Exceptions:</strong> Guarantee is void if delivery is delayed due to incorrect recipient address, buyer flight delays, or failure to collect the shipment at the cargo terminal within a reasonable timeframe.</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-4 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-black font-mono font-bold text-xs">
              02
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider font-display">
              Ordering, Minimum Quantities & Payments
            </h2>
          </div>
          <div className="text-zinc-300 font-sans text-sm leading-relaxed space-y-3 pl-11">
            <p>
              We cater to commercial importers, wholesale distributors, public aquariums, and dedicated private collectors globally.
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400 text-xs font-mono">
              <li><strong className="text-white">Stock Availability:</strong> All species listed on our Stock List are subject to seasonal availability, wild harvest conditions, and quarantine approval.</li>
              <li><strong className="text-white">Minimum Order Quantity (MOQ) & Freight Expectations:</strong> International cargo airports require a <strong>100 kg minimum</strong> shipment weight threshold for live fish export clearance.</li>
              <li><strong className="text-white">Authorized Payment Protocol:</strong> For security and fraud prevention, <strong>DO NOT send payments</strong> to any account details that are not directly authorized or confirmed by the official email address or official WhatsApp phone number listed on this website. The ONLY authorized place to receive payment transfer instructions is directly from our official website contact numbers or emails.</li>
              <li><strong className="text-white">Order Confirmation:</strong> Orders are finalized once flight booking and export health permits are confirmed.</li>
            </ul>
          </div>
        </div>

        {/* Section 3 */}
        <div className="space-y-4 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-black font-mono font-bold text-xs">
              03
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider font-display">
              International Cargo & Export Packaging
            </h2>
          </div>
          <div className="text-zinc-300 font-sans text-sm leading-relaxed space-y-3 pl-11">
            <p>
              Safe transit of live tropical fish across continents requires specialized engineering and strict adherence to IATA live animal regulations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-2">
                <div className="text-yellow-400 font-mono text-xs font-bold uppercase flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Packaging Standards
                </div>
                <p className="text-zinc-400 text-xs leading-normal">
                  Sometimes we utilize heavy-duty shipping boxes and sometimes insulated styrofoam containers depending on shipment requirements. All shipments are securely wrapped and custom-built according to the weather conditions of the transit route, infused with accurate oxygenation rates sufficient for the duration of the flight, and backed by a dependable transport system.
                </p>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-2">
                <div className="text-yellow-400 font-mono text-xs font-bold uppercase flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Export Documentation
                </div>
                <p className="text-zinc-400 text-xs leading-normal">
                  Every international shipment includes official Veterinary Health Certificates, Air Waybill (AWB), Packing List, and Commercial Invoice.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-4 border-b border-white/5 pb-8">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-black font-mono font-bold text-xs">
              04
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider font-display">
              Bio-Security & Quarantine Responsibilities
            </h2>
          </div>
          <div className="text-zinc-300 font-sans text-sm leading-relaxed space-y-3 pl-11">
            <p>
              While WAGFF subjects all specimens to a mandatory 14-day pre-export purging and health monitoring process:
            </p>
            <ul className="list-disc list-inside space-y-2 text-zinc-400 text-xs font-mono">
              <li><strong className="text-white">Importer Responsibility:</strong> Buyers are strongly advised to maintain dedicated quarantine tanks for incoming shipments before introducing specimens to existing display systems.</li>
              <li><strong className="text-white">Drip Acclimation:</strong> Slow drip acclimation (45-60 minutes) to equalize temperature, pH, and salinity is mandatory upon receiving new livestock.</li>
              <li><strong className="text-white">Post-Arrival Care:</strong> WAGFF is not liable for mortalities occurring after the <strong>24-hour post-arrival window</strong> due to improper tank chemistry or tankmate aggression.</li>
            </ul>
          </div>
        </div>

        {/* Section 5 */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 text-black font-mono font-bold text-xs">
              05
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white uppercase tracking-wider font-display">
              Legal Compliance & Import Permits
            </h2>
          </div>
          <div className="text-zinc-300 font-sans text-sm leading-relaxed space-y-3 pl-11">
            <p>
              The buyer is responsible for verifying that requested species are legal for import in their country, state, or municipality.
            </p>
            <p className="text-zinc-400 text-xs font-mono">
              WAGFF complies with all international wildlife protection laws and local fisheries authorities. Where applicable, CITES permits and regulatory clearance docs will be provided.
            </p>
          </div>
        </div>

      </div>

      {/* Support CTA */}
      <div className="bg-gradient-to-r from-yellow-500/10 via-zinc-900 to-zinc-950 border border-yellow-500/20 p-8 rounded-3xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-widest">
          <HelpCircle className="w-4 h-4" /> Have Questions About Our Terms?
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white font-display uppercase">
          Need Custom Freight Booking or Quarantine Clarifications?
        </h3>
        <p className="text-zinc-400 font-sans text-xs max-w-xl mx-auto leading-relaxed">
          Our logistics team is available 24/7 to coordinate air cargo, answer species compatibility questions, or customize wholesale orders. Contact sales & freight directly at <strong className="text-white font-mono">westafricafishfarm@gmail.com</strong> or via WhatsApp at <strong className="text-white font-mono">+234 803 670 8191</strong>.
        </p>
        <div className="pt-2">
          <a
            href="mailto:westafricafishfarm@gmail.com?subject=Sales%20%26%20Freight%20Inquiry"
            className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold text-xs rounded-full uppercase tracking-wider transition-all transform hover:scale-105"
          >
            <Mail className="w-4 h-4" />
            Contact Sales & Freight Team
          </a>
        </div>
      </div>

    </div>
  );
}

