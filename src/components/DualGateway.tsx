import React from 'react';
import { Package, Compass, ArrowRight, Sparkles } from 'lucide-react';

interface DualGatewayProps {
  onSelectStore: () => void;
  onSelectTravel: () => void;
}

export const DualGateway: React.FC<DualGatewayProps> = ({ onSelectStore, onSelectTravel }) => {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-[#F7F1E5] px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background warm subtle ambient accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-96 h-96 rounded-full bg-[#C7833D]/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-96 h-96 rounded-full bg-[#66705A]/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9C6A8]/30 border border-[#B08A4A]/40 text-[#C7833D] text-xs font-dm font-bold tracking-wider uppercase mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B08A4A]" />
            <span>Two Paths to the Divine</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#8F6E5B]">
            Sacred Offerings for Heart & Soul
          </h2>
          <p className="mt-4 font-dm text-sm sm:text-base text-[#8F6E5B]/80 leading-relaxed font-normal">
            Whether welcoming ancient sanctified rituals into your home altar or embarking on a once-in-a-lifetime pilgrimage across holy lands, begin your journey here.
          </p>
        </div>

        {/* Dual Gateway Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Card 1: Physical Offerings (Pooja Kits) */}
          <div 
            onClick={onSelectStore}
            className="group relative rounded-3xl overflow-hidden border border-[#D9C6A8] hover:border-[#B08A4A] bg-white/85 p-8 sm:p-10 cursor-pointer transition-all duration-500 shadow-[0_12px_40px_rgba(51,44,37,0.06)] hover:shadow-[0_20px_50px_rgba(51,44,37,0.12)] flex flex-col justify-between"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C7833D]/10 rounded-full blur-3xl group-hover:bg-[#C7833D]/20 transition-all duration-700 pointer-events-none" />

            <div>
              {/* Pill badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#D9C6A8]/25 border border-[#D9C6A8] text-[#C7833D] text-xs font-dm font-bold tracking-wide">
                  <Package className="w-4 h-4 text-[#B08A4A]" />
                  <span>Physical Creations</span>
                </div>
                <span className="text-xs font-dm text-[#66705A] tracking-widest uppercase font-semibold">
                  Sanatana Mall
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#8F6E5B] group-hover:text-[#C7833D] transition-colors">
                Consecrated Pooja Kits & Samagri
              </h3>
              <p className="mt-3 font-dm text-sm text-[#8F6E5B]/80 leading-relaxed font-normal">
                Authentic, lab-tested Vedic ingredients, hand-poured brass diyas, pure Bhimseni camphor, and pre-assembled ceremonial boxes for daily worship and sacred festivals.
              </p>

              {/* Feature Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['Temple Consecrated', 'Zero Residue Camphor', 'Kashi Gangajal Included', 'Express Delivery'].map((item, idx) => (
                  <span key={idx} className="text-[11px] font-dm px-3 py-1 rounded-full bg-[#D9C6A8]/20 text-[#8F6E5B]/85 border border-[#D9C6A8] font-medium">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Preview & Action */}
            <div className="mt-10 pt-6 border-t border-[#D9C6A8]/60 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-[#8F6E5B]/65 font-dm uppercase tracking-wider font-semibold">Explore Collection</span>
                <span className="text-xl font-cormorant font-semibold text-[#C7833D]">Starting from ₹1,499</span>
              </div>
              <button 
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C7833D] to-[#B08A4A] hover:from-[#B08A4A] hover:to-[#C7833D] text-[#F7F1E5] font-dm font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group-hover:scale-105 cursor-pointer"
              >
                <span>View Kits</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Non-Physical Offerings (Spiritual Yatras) */}
          <div 
            onClick={onSelectTravel}
            className="group relative rounded-3xl overflow-hidden border border-[#D9C6A8] hover:border-[#66705A] bg-white/85 p-8 sm:p-10 cursor-pointer transition-all duration-500 shadow-[0_12px_40px_rgba(51,44,37,0.06)] hover:shadow-[0_20px_50px_rgba(51,44,37,0.12)] flex flex-col justify-between"
          >
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#66705A]/10 rounded-full blur-3xl group-hover:bg-[#66705A]/20 transition-all duration-700 pointer-events-none" />

            <div>
              {/* Pill badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#D9C6A8]/25 border border-[#D9C6A8] text-[#66705A] text-xs font-dm font-bold tracking-wide">
                  <Compass className="w-4 h-4 text-[#66705A]" />
                  <span>Curated Experiences</span>
                </div>
                <span className="text-xs font-dm text-[#B08A4A] tracking-widest uppercase font-semibold">
                  HOS Travel
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#8F6E5B] group-hover:text-[#66705A] transition-colors">
                Sacred Yatras & Pilgrimages
              </h3>
              <p className="mt-3 font-dm text-sm text-[#8F6E5B]/80 leading-relaxed font-normal">
                Transformative journeys to Kedarnath, Badrinath, Kashi, and the 12 Jyotirlingas. Complete with VIP darshan tokens, helicopter shuttles, Sanskrit scholar guides, and luxury stays.
              </p>

              {/* Feature Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {['VIP Darshan Priority', 'Elderly-Friendly Logistics', 'Sanskrit Scholar Escort', 'Pure Satvik Meals'].map((item, idx) => (
                  <span key={idx} className="text-[11px] font-dm px-3 py-1 rounded-full bg-[#D9C6A8]/20 text-[#8F6E5B]/85 border border-[#D9C6A8] font-medium">
                    ✦ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Preview & Action */}
            <div className="mt-10 pt-6 border-t border-[#D9C6A8]/60 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-[#8F6E5B]/65 font-dm uppercase tracking-wider font-semibold">Curated Circuits</span>
                <span className="text-xl font-cormorant font-semibold text-[#66705A]">Char Dham, Kashi, Jyotirlingas</span>
              </div>
              <button 
                type="button"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#66705A] to-[#B08A4A] hover:from-[#B08A4A] hover:to-[#66705A] text-[#F7F1E5] font-dm font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md group-hover:scale-105 cursor-pointer"
              >
                <span>View Yatras</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
