import React from 'react';
import { PANCHANG_DATA } from '../data/mockData';
import { Sun, Sparkles, ArrowRight } from 'lucide-react';

interface PanchangWidgetProps {
  onExploreFestivalKit: () => void;
}

export const PanchangWidget: React.FC<PanchangWidgetProps> = ({ onExploreFestivalKit }) => {
  return (
    <section className="relative w-full py-16 sm:py-20 bg-[#FEFBF2] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Container Box */}
        <div className="relative rounded-3xl bg-white border border-[#C59239]/30 p-6 sm:p-10 shadow-[0_15px_40px_rgba(34,21,8,0.06)] overflow-hidden">
          
          {/* Subtle Warm Glow */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#FE7613]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Today's Panchang Details */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#607427]/10 border border-[#607427]/25 text-[#607427] text-xs font-dm font-bold tracking-widest uppercase mb-3 shadow-xs">
                <Sun className="w-3.5 h-3.5 text-[#607427]" />
                <span>Vedic Panchang & Muhurat Guidance</span>
              </div>

              <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
                Today's Sacred Auspicious Timings
              </h3>
              <p className="mt-2 font-dm text-xs sm:text-sm text-[#3D2619] leading-relaxed font-normal">
                Harmonize your rituals, travel departures, and spiritual undertakings with celestial alignments.
              </p>

              {/* Grid of Tithi & Muhurats */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30">
                  <span className="text-[10px] font-dm uppercase tracking-wider text-[#3D2619]/70 font-semibold block mb-1">
                    Tithi
                  </span>
                  <span className="font-dm font-bold text-xs sm:text-sm text-[#221508]">
                    {PANCHANG_DATA.tithi}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30">
                  <span className="text-[10px] font-dm uppercase tracking-wider text-[#3D2619]/70 font-semibold block mb-1">
                    Nakshatra
                  </span>
                  <span className="font-dm font-bold text-xs sm:text-sm text-[#221508]">
                    {PANCHANG_DATA.nakshatra}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#607427]/10 border border-[#607427]/30">
                  <span className="text-[10px] font-dm uppercase tracking-wider text-[#607427] font-semibold block mb-1">
                    Shubh Muhurat
                  </span>
                  <span className="font-dm font-bold text-xs sm:text-sm text-[#607427]">
                    {PANCHANG_DATA.shubhMuhurat.split(':')[1]}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#98555E]/10 border border-[#98555E]/25">
                  <span className="text-[10px] font-dm uppercase tracking-wider text-[#98555E] font-semibold block mb-1">
                    Rahu Kaal (Avoid)
                  </span>
                  <span className="font-dm font-bold text-xs sm:text-sm text-[#98555E]">
                    {PANCHANG_DATA.rahuKaal.split('(')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Festival Alert & Pre-order Banner - Cosmic Sanctum Wind Blue with Temple Gold and Fire Orange */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#073863] via-[#0A4C83] to-[#073863] p-6 rounded-2xl border border-[#C59239]/40 flex flex-col justify-between shadow-xl shadow-[#0A4C83]/25 text-white relative overflow-hidden">
              {/* Subtle gold glow behind festival badge */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FE7613]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex items-center gap-1.5 text-xs font-dm font-bold text-[#E4B968] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#FE7613]" />
                    Upcoming Sacred Mahaparva
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FE7613]/20 text-[#E4B968] border border-[#FE7613]/30 text-[11px] font-dm font-bold">
                    In {PANCHANG_DATA.festiveAlert.daysLeft} Days
                  </span>
                </div>

                <h4 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#FEFBF2] tracking-wide">
                  {PANCHANG_DATA.festiveAlert.festival}
                </h4>
                <p className="mt-2 font-dm text-xs text-white/80 leading-relaxed font-normal">
                  {PANCHANG_DATA.festiveAlert.message}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C59239]/30 flex items-center justify-between relative z-10">
                <span className="text-xs text-[#E4B968] font-dm font-medium">
                  Limited Consecrated Batches
                </span>

                <button
                  type="button"
                  onClick={onExploreFestivalKit}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FE7613] hover:bg-[#e0650d] text-white font-dm font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg shadow-black/30 hover:scale-105 active:scale-95"
                >
                  <span>Pre-Order Kit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
