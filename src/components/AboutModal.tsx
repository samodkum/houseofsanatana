import React, { useEffect } from 'react';
import { X, Sparkles, Shield, Compass, HeartHandshake, Award, Sun, CheckCircle2, MapPin } from 'lucide-react';
import { MandalaGeometry, LotusLineArt } from './ui/SacredPatterns';

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
            <h2 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
              The House of Sanatan
            </h2>
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
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-[#221508] font-dm">
          
          {/* Hero Story Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-[#C59239]/30 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80"
              alt="Sacred Aarti on the ghats of Varanasi"
              className="w-full h-56 sm:h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#221508]/90 via-[#221508]/40 to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <span className="font-sanskrit text-[#3DB3E4] text-sm font-semibold block mb-1">
                ॥ धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः ॥
              </span>
              <p className="text-xs sm:text-sm text-[#FEFBF2] italic max-w-xl font-dm">
                "Dharma protects those who uphold it. In every sacred flame, every mantra, and every pilgrimage across Bharat, the divine heritage endures."
              </p>
            </div>
          </div>

          {/* Detailed Founding Story */}
          <div className="space-y-4 text-xs sm:text-sm text-[#221508] leading-relaxed font-dm font-medium">
            <h3 className="font-cormorant text-2xl font-semibold text-[#221508] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#3DB3E4]" />
              <span>Our Sacred Genesis</span>
            </h3>
            <p>
              <strong className="text-[#221508]">House of Sanatan</strong> was established with an unyielding vow: to bridge ancient Vedic sanctity with modern seekers. In an era where commercialization has diluted ritual purity—replacing natural forest resins with synthetic perfumes, and turning sacred pilgrimages into chaotic logistical struggles—we created an uncompromised sanctuary.
            </p>
            <p>
              We collaborate directly with venerable peethams in <strong>Varanasi, Kashi Vishwanath, Pashupatinath, and Haridwar</strong>, where Vedic scholars and Acharyas supervise the consecration of every brass vigraha, silver yantra, and 100% natural samagri batch.
            </p>
          </div>

          {/* Vision & Mission Core */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/80 border border-[#3DB3E4]/30 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#3DB3E4]/15 text-[#3DB3E4] flex items-center justify-center mb-3">
                <Sun className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-xl font-semibold text-[#221508] mb-2">Our Vision</h4>
              <p className="text-xs text-[#221508] leading-relaxed font-dm font-medium">
                To be the world’s pre-eminent spiritual sanctuary where authentic Vedic wisdom, Agamic sanctity, and temple-grade rituals are preserved in unadulterated purity for generations to come.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-[#C59239]/30 shadow-xs">
              <div className="w-9 h-9 rounded-xl bg-[#C59239]/15 text-[#C59239] flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-cormorant text-xl font-semibold text-[#221508] mb-2">Our Mission</h4>
              <p className="text-xs text-[#221508] leading-relaxed font-dm font-medium">
                To empower 10 Million households across the globe with consecrated daily pooja samagri, ethical fair-trade artisan crafts, and transformative, elder-first pilgrimage care across Bharat.
              </p>
            </div>
          </div>

          {/* 3 Pillars of Authenticity */}
          <div>
            <h3 className="font-cormorant text-2xl font-semibold text-[#221508] mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#98555E]" />
              <span>The Three Pillars of The House</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/80 border border-[#98555E]/30 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#98555E] mb-2" />
                <h5 className="font-cormorant text-base font-semibold text-[#221508] mb-1">100% Vedic Agamic</h5>
                <p className="text-[11px] text-[#221508] font-dm font-medium">
                  Zero paraffin, synthetic fragrances, or animal derivatives. Pure Bhimseni camphor, natural resins & cow ghee.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/80 border border-[#3DB3E4]/30 shadow-xs">
                <Compass className="w-5 h-5 text-[#3DB3E4] mb-2" />
                <h5 className="font-cormorant text-base font-semibold text-[#221508] mb-1">Dharmic Pilgrimage</h5>
                <p className="text-[11px] text-[#221508] font-dm font-medium">
                  Pre-cleared VIP garbhagriha darshans, luxury sanitized transit, dedicated medical support & elder care.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/80 border border-[#607427]/30 shadow-xs">
                <HeartHandshake className="w-5 h-5 text-[#607427] mb-2" />
                <h5 className="font-cormorant text-base font-semibold text-[#221508] mb-1">Temple Artisan Seva</h5>
                <p className="text-[11px] text-[#221508] font-dm font-medium">
                  Fair remuneration supporting 300+ hereditary sculptors, brass casters, and Vedic scholars across Bharat.
                </p>
              </div>
            </div>
          </div>

          {/* Sanctuary Footprint Stats */}
          <div className="pt-6 border-t border-[#C59239]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#FE7613] block">50,000+</span>
              <span className="text-[10px] text-[#221508]/70 font-semibold uppercase tracking-wider font-dm">Devotees Blessed</span>
            </div>
            <div>
              <span className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#3DB3E4] block">108</span>
              <span className="text-[10px] text-[#221508]/70 font-semibold uppercase tracking-wider font-dm">Temple Peethams</span>
            </div>
            <div>
              <span className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#607427] block">100%</span>
              <span className="text-[10px] text-[#221508]/70 font-semibold uppercase tracking-wider font-dm">Lab Tested Purity</span>
            </div>
            <div>
              <span className="font-cormorant text-3xl sm:text-4xl font-semibold text-[#C59239] block">24/7</span>
              <span className="text-[10px] text-[#221508]/70 font-semibold uppercase tracking-wider font-dm">Pilgrimage Care</span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-[#0A4C83] border-t border-[#C59239]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-[#E4B968] font-dm flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#3DB3E4]" />
            Sanctums in Varanasi &bull; Haridwar &bull; Bengaluru
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
