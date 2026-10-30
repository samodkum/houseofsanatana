import React from 'react';
import { PoojaKit } from '../types/homepage';
import { X, Sparkles, Check, ShoppingBag, ShieldCheck, MapPin } from 'lucide-react';

interface KitUnboxModalProps {
  kit: PoojaKit | null;
  onClose: () => void;
  onAddToCart: (kit: PoojaKit) => void;
}

export const KitUnboxModal: React.FC<KitUnboxModalProps> = ({ kit, onClose, onAddToCart }) => {
  if (!kit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#221508]/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#FEFBF2] border-2 border-[#C59239]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(34,21,8,0.25)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FE7613]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#221508]/5 border border-[#C59239]/40 text-[#221508] hover:text-[#FE7613] hover:border-[#FE7613] flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#C59239]/15 border border-[#C59239]/40 text-[#C59239] text-xs font-dm font-semibold tracking-wide uppercase flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FE7613]" />
              <span>Sacred Unboxing Inspector</span>
            </span>
            {kit.consecratedAt && (
              <span className="px-3 py-1 rounded-full bg-[#607427]/15 border border-[#607427]/30 text-[#607427] text-xs font-dm flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#607427]" />
                <span>Sanctified at {kit.consecratedAt}</span>
              </span>
            )}
          </div>
          <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#221508]">
            {kit.title}
          </h3>
          <p className="font-dm text-xs sm:text-sm text-[#3D2619]/80 mt-1">
            {kit.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Visual box presentation */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden border border-[#C59239]/30 shadow-md aspect-square group bg-white">
              <img 
                src={kit.image} 
                alt={kit.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#221508]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-dm text-[#FEFBF2]">
                <span>Total Net Weight: ~{kit.weightGrams}g</span>
                <span className="text-[#E4B968] font-semibold">100% Tamper Proof</span>
              </div>
            </div>

            {/* Quality Seals */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-[#C59239]/30 space-y-2 text-xs font-dm text-[#3D2619]/90 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#607427] shrink-0" />
                <span>Zero petroleum wax, synthetic dyes, or chemical fillers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#607427] shrink-0" />
                <span>Individual airtight sanctified brass & glass containers</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FE7613] shrink-0" />
                <span>Accompanied by printed Sanskrit Vidhi Margdarshika booklet</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-6 pt-4 border-t border-[#C59239]/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#3D2619]/70 font-dm font-medium block">Sacred Offering Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#FE7613]">
                    ₹{kit.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-dm line-through text-[#3D2619]/50">
                    ₹{kit.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  onAddToCart(kit);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FE7613] via-[#FE8D3B] to-[#FE7613] hover:brightness-105 text-white font-dm font-semibold text-xs uppercase tracking-wider shadow-md shadow-[#FE7613]/25 transition-all cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Box to Cart</span>
              </button>
            </div>
          </div>

          {/* Right Column: Itemized Inside-The-Box Inventory */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="font-cormorant text-base font-semibold text-[#221508] uppercase tracking-wider">
                What's Inside The Sacred Box ({kit.itemsIncluded.length} Consecrated Items)
              </span>
              <span className="text-[11px] font-dm text-[#607427] font-semibold">
                Touch item for sacred provenance
              </span>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {kit.itemsIncluded.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#C59239]/30 hover:border-[#FE7613] transition-all flex flex-col gap-1 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-dm font-semibold text-sm text-[#221508] flex items-center gap-2">
                      <span className="text-[#FE7613] text-xs font-cormorant font-bold">0{idx + 1}.</span>
                      {item.name}
                    </span>
                    <span className="text-[10px] font-dm px-2 py-0.5 rounded bg-[#FEFBF2] border border-[#C59239]/30 text-[#0A4C83] font-semibold">
                      {item.origin}
                    </span>
                  </div>
                  <p className="font-dm text-xs text-[#3D2619]/75 pl-5">
                    {item.significance}
                  </p>
                </div>
              ))}
            </div>

            {/* Ideal for note */}
            <div className="mt-4 p-3 rounded-xl bg-white border border-[#C59239]/30 flex items-center justify-between text-xs font-dm">
              <span className="text-[#3D2619] font-medium">Prescribed Ritual:</span>
              <span className="font-semibold text-[#0A4C83]">{kit.idealFor}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
