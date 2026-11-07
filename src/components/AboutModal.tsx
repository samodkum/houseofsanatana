import React, { useEffect } from 'react';
import { X, Sparkles, Shield, Compass, HeartHandshake, Award, Sun, CheckCircle2, MapPin } from 'lucide-react';
import { MandalaGeometry, LotusLineArt } from './ui/SacredPatterns';
import { HOS_LOGO_URL } from '../lib/constants';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#FEFBF2] text-[#221508] rounded-3xl border border-[#C59239]/40 shadow-[0_25px_80px_rgba(34,21,8,0.35),_0_0_40px_rgba(61,179,228,0.15)] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        
        {/* Subtle Decorative Aura */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3DB3E4]/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C59239]/12 rounded-full blur-3xl pointer-events-none" />

        {/* Background Sacred Patterns - Gold Outline */}
        <div className="absolute -top-10 -right-10 pointer-events-none opacity-25">
          <MandalaGeometry size={230} color="#C59239" />
        </div>
        <div className="absolute -bottom-10 -left-10 pointer-events-none opacity-25">
          <LotusLineArt size={230} color="#C59239" className="-rotate-12" />
        </div>

        {/* Modal Header */}
        <div className="relative px-6 sm:px-10 pt-8 pb-5 border-b border-[#C59239]/20 flex items-center justify-between z-10 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-dm font-semibold tracking-widest text-[#3DB3E4] uppercase mb-1">
              <Sun className="w-3.5 h-3.5 text-[#3DB3E4]" />
              <span>॥ सत्यं धर्म सनातन ॥ &bull; ABOUT THE SANCTUM</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#C59239]/60 flex items-center justify-center bg-[#36050e] shadow-xs shrink-0">
                <img
                  src={HOS_LOGO_URL}
                  alt="The House of Sanatana"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
                The House of Sanatana
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close About modal"
            className="w-10 h-10 rounded-full bg-[#221508]/5 hover:bg-[#221508]/10 border border-[#C59239]/30 text-[#221508] flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-10 text-[#221508] font-dm">
          
          {/* 1. ABOUT US: Hero Story Banner */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-dm font-bold tracking-widest text-[#98555E] uppercase">
              <Sparkles className="w-4 h-4 text-[#C59239]" />
              <span>ABOUT US &bull; A TIMELESS WAY FORWARD</span>
            </div>
            <h3 className="font-cormorant text-2xl sm:text-4xl font-semibold text-[#221508] leading-tight">
              A House Built on Heritage. Designed for the Future.
            </h3>
            <p className="text-sm sm:text-base text-[#3D2619] leading-relaxed font-normal">
              Sanatana Dharma has shaped civilisations with timeless wisdom. House of Sanatana was born from a clear conviction: this extraordinary heritage deserves more than preservation — it deserves a vital, powerful place in the future.
            </p>
            <p className="text-sm sm:text-base text-[#3D2619] leading-relaxed font-normal">
              We are building a global ecosystem where faith, culture, knowledge, commerce, and innovation unite under one House. Through Sanatana Mall, curated spiritual journeys, cultural storytelling, community programmes, and digital platforms, we connect the living dimensions of dharma — accessible, relevant, and deeply authentic.
            </p>
            <div className="p-4 rounded-2xl bg-[#FEFBF2] border border-[#C59239]/30 text-xs sm:text-sm text-[#221508] font-medium italic">
              "A House where traditions are not merely inherited, but understood, lived, and carried forward with conviction."
            </div>
          </div>

          {/* 2. OUR STORY: An Idea Became a Purpose */}
          <div className="pt-6 border-t border-[#C59239]/20 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-dm font-bold tracking-widest text-[#FE7613] uppercase">
              <Sun className="w-4 h-4 text-[#FE7613]" />
              <span>OUR STORY &bull; 2024 TO 2025 & BEYOND</span>
            </div>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
              An Idea Became a Purpose. A Purpose Became a House.
            </h3>
            <p className="text-xs sm:text-sm text-[#3D2619] leading-relaxed font-normal">
              The beginnings were personal. Following a transformative spiritual journey in late 2024, a pivotal question emerged: <em>In a world advancing at extraordinary speed, why should connecting with our own traditions still feel so fragmented?</em>
            </p>
            <p className="text-xs sm:text-sm text-[#3D2619] leading-relaxed font-normal">
              We saw the distance between devotion and accessibility — sacred customs repeated without their deeper meaning, rich traditions made distant by logistical friction. In 2025, that realization took shape: technology, thoughtful enterprise, and collective creativity could unite these worlds.
            </p>
            <p className="text-xs sm:text-sm text-[#3D2619] leading-relaxed font-normal">
              We envisioned far more than a marketplace or travel service. We set out to build a House that accompanies the entire spiritual journey — from curiosity to knowledge, faith to direct experience, and individual participation to collective progress.
            </p>
          </div>

          {/* 3. WHERE WE ARE GOING: 4 Pillars of the Ecosystem */}
          <div className="pt-6 border-t border-[#C59239]/20 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-dm font-bold tracking-widest text-[#0A4C83] uppercase">
              <Compass className="w-4 h-4 text-[#3DB3E4]" />
              <span>WHERE WE ARE GOING &bull; GLOBAL VISION</span>
            </div>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
              One House. A Global Vision. Generations of Possibility.
            </h3>
            <p className="text-xs sm:text-sm text-[#3D2619] leading-relaxed font-normal">
              Our vision is to establish House of Sanatana as a global institution where sacred living extends naturally into everyday life — uniting traditions with technology across borders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#98555E]/30 shadow-xs">
                <span className="font-dm font-bold text-[10.5px] uppercase tracking-wider text-[#98555E] block mb-1">
                  [ 01 ] Sanatana Mall
                </span>
                <h4 className="font-cormorant text-lg font-semibold text-[#221508] mb-1">
                  Everyday Sacred Living
                </h4>
                <p className="text-xs text-[#3D2619]/90 leading-relaxed font-normal">
                  Consecrated ritual essentials, handcrafted brassware, festival collections, and thoughtful gifting for contemporary homes worldwide.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#0A4C83]/30 shadow-xs">
                <span className="font-dm font-bold text-[10.5px] uppercase tracking-wider text-[#0A4C83] block mb-1">
                  [ 02 ] HOS Travel
                </span>
                <h4 className="font-cormorant text-lg font-semibold text-[#221508] mb-1">
                  Curated Sacred Yatras
                </h4>
                <p className="text-xs text-[#3D2619]/90 leading-relaxed font-normal">
                  Connecting Jyotirlingas, Shakti Peethas, and Himalayan shrines with story-led routes, verified stays, and stress-free pilgrim coordination.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#607427]/30 shadow-xs">
                <span className="font-dm font-bold text-[10.5px] uppercase tracking-wider text-[#607427] block mb-1">
                  [ 03 ] Knowledge & Digital Innovation
                </span>
                <h4 className="font-cormorant text-lg font-semibold text-[#221508] mb-1">
                  Living Dharmic Wisdom
                </h4>
                <p className="text-xs text-[#3D2619]/90 leading-relaxed font-normal">
                  Unlocking timeless wisdom for new generations through cultural storytelling, learning modules, and future intelligent platforms.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-[#FE7613]/30 shadow-xs">
                <span className="font-dm font-bold text-[10.5px] uppercase tracking-wider text-[#FE7613] block mb-1">
                  [ 04 ] HOS Community & Co-Create
                </span>
                <h4 className="font-cormorant text-lg font-semibold text-[#221508] mb-1">
                  Shared Growth & Culture
                </h4>
                <p className="text-xs text-[#3D2619]/90 leading-relaxed font-normal">
                  Bringing families, creators, scholars, and enterprises together through events, paid creative initiatives, and cultural collaborations.
                </p>
              </div>
            </div>
          </div>

          {/* 4. OUR GREATEST AMBITION: Growing with our family */}
          <div className="pt-6 border-t border-[#C59239]/20 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-dm font-bold tracking-widest text-[#C59239] uppercase">
              <HeartHandshake className="w-4 h-4 text-[#C59239]" />
              <span>OUR GREATEST AMBITION &bull; GROWING WITH OUR FAMILY</span>
            </div>
            <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
              Measured Not by Numbers, but by People.
            </h3>
            <p className="text-xs sm:text-sm text-[#3D2619] leading-relaxed font-normal">
              The true strength of House of Sanatana will never be measured solely by products sold or pilgrimages organized. It will be measured by the lives we touch and the people who grow with us.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/60 border border-[#C59239]/20">
                <CheckCircle2 className="w-4 h-4 text-[#C59239] shrink-0 mt-0.5" />
                <p className="text-xs text-[#3D2619] font-normal leading-relaxed">
                  <strong className="text-[#221508]">Active Participation:</strong> Helping seekers become engaged participants in their heritage.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/60 border border-[#C59239]/20">
                <CheckCircle2 className="w-4 h-4 text-[#C59239] shrink-0 mt-0.5" />
                <p className="text-xs text-[#3D2619] font-normal leading-relaxed">
                  <strong className="text-[#221508]">Creator Opportunities:</strong> Providing young creators a platform for their talent and livelihoods.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/60 border border-[#C59239]/20">
                <CheckCircle2 className="w-4 h-4 text-[#C59239] shrink-0 mt-0.5" />
                <p className="text-xs text-[#3D2619] font-normal leading-relaxed">
                  <strong className="text-[#221508]">Meaningful Careers:</strong> Offering professionals and entrepreneurs avenues to build lasting value.
                </p>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/60 border border-[#C59239]/20">
                <CheckCircle2 className="w-4 h-4 text-[#C59239] shrink-0 mt-0.5" />
                <p className="text-xs text-[#3D2619] font-normal leading-relaxed">
                  <strong className="text-[#221508]">Lasting Legacy:</strong> Where participation leads to contribution, and contribution opens doors to opportunity.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#0A4C83] border-t border-[#C59239]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#E4B968] font-dm tracking-wider uppercase font-semibold">
            House of Sanatana &bull; A Timeless Way Forward
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C59239] via-[#FE7613] to-[#C59239] hover:brightness-110 text-[#221508] font-dm font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
          >
            Close & Continue Exploration
          </button>
        </div>

      </div>
    </div>
  );
};
