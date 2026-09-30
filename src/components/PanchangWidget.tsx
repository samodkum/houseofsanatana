import React from 'react';
import { PANCHANG_DATA } from '../data/mockData';
import { Sun, Sparkles, ArrowRight } from 'lucide-react';

interface PanchangWidgetProps {
  onExploreFestivalKit: () => void;
}

export const PanchangWidget: React.FC<PanchangWidgetProps> = ({ onExploreFestivalKit }) => {
  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#F7F1E5] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Container Box */}
        <div className="relative rounded-3xl bg-white/80 border border-[#D9C6A8] p-6 sm:p-10 shadow-[0_15px_40px_rgba(51,44,37,0.08)] overflow-hidden">
          
          {/* Subtle Warm Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#C7833D]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Today's Panchang Details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#66705A]/10 border border-[#66705A]/25 text-[#66705A] text-xs font-dm font-bold tracking-widest uppercase mb-3 shadow-xs">
                <Sun className="w-3.5 h-3.5 text-[#66705A]" />
                <span>Vedic Panchang & Muhurat Guidance</span>
              </div>

              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#8F6E5B]">
                Today's Sacred Auspicious Timings
              </h3>
              <p className="mt-2 font-dm text-xs sm:text-sm text-[#8F6E5B]/80 leading-relaxed font-normal">
                Harmonize your rituals, travel departures, and spiritual undertakings with celestial alignments.
              </p>

              {/* Grid of Tithi & Muhurats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#D9C6A8]/20 border border-[#D9C6A8]">
                  <span className="text-[10px] font-dm uppercase tracking-wider text-[#8F6E5B]/60 font-semibold block mb-1">
                    Tithi
                  </span>
                  <span className="font-dm font-bold text-xs sm:text-sm text-[#8F6E5B]">
                    {PANCHANG_DATA.tithi}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#D9C6A8]/20 border border-[#D9C6A8]">
                  <span className="text-[10px] font-dm uppercase tracking-wider text-[#8F6E5B]/60 font-semibold block mb-1">
                    Nakshatra
                  </span>
                  <span className="font-dm font-bold text-xs sm:text-sm text-[#8F6E5B]">
                    {PANCHANG_DATA.nakshatra}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#66705A]/10 border border-[#66705A]/25">
                  <span className="text-[10px] font-dm uppercase tracking-wider text-[#66705A] font-semibold block mb-1">
                    Shubh Muhurat
                  </span>
                  <span className="font-dm font-bold text-xs sm:text-sm text-[#66705A]">
                    {PANCHANG_DATA.shubhMuhurat.split(':')[1]}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#8F6E5B]/5 border border-[#8F6E5B]/20">
                  <span className="text-[10px] font-dm uppercase tracking-wider text-[#8F6E5B]/70 font-semibold block mb-1">
                    Rahu Kaal (Avoid)
                  </span>
                  <span className="font-dm font-bold text-xs sm:text-sm text-[#8F6E5B]">
                    {PANCHANG_DATA.rahuKaal.split('(')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Festival Alert & Pre-order Banner - Luxury Charcoal Brown with Antique Gold & Muted Saffron */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#8F6E5B] via-[#26201B] to-[#1A1612] p-6 rounded-2xl border border-[#B08A4A]/40 flex flex-col justify-between shadow-xl shadow-[#8F6E5B]/20 text-white relative overflow-hidden">
              {/* Subtle gold glow behind festival badge */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#C7833D]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-dm font-bold text-[#C7833D] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#B08A4A]" />
                    Upcoming Sacred Mahaparva
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#B08A4A]/20 text-[#D9C6A8] border border-[#B08A4A]/30 text-[11px] font-dm font-bold">
                    In {PANCHANG_DATA.festiveAlert.daysLeft} Days
                  </span>
                </div>

                <h4 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#F7F1E5] tracking-wide">
                  {PANCHANG_DATA.festiveAlert.festival}
                </h4>
                <p className="mt-2 font-dm text-xs text-[#D9C6A8]/90 leading-relaxed font-normal">
                  {PANCHANG_DATA.festiveAlert.message}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#B08A4A]/25 flex items-center justify-between relative z-10">
                <span className="text-xs text-[#D9C6A8] font-dm font-medium">
                  Limited Consecrated Batches
                </span>

                <button
                  type="button"
                  onClick={onExploreFestivalKit}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C7833D] via-[#B08A4A] to-[#C7833D] hover:opacity-90 text-[#1A1612] font-dm font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-black/40 hover:scale-105 active:scale-95"
                >
                  <span>Pre-Order Kit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#1A1612]" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
