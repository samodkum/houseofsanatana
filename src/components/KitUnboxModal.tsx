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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#8F6E5B]/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#F7F1E5] border border-[#B08A4A]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(51,44,37,0.3)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7833D]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#8F6E5B]/5 border border-[#D9C6A8] text-[#8F6E5B] hover:text-[#8F6E5B] hover:border-[#B08A4A] flex items-center justify-center transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#D9C6A8]/30 border border-[#B08A4A]/40 text-[#C7833D] text-xs font-dm font-semibold tracking-wide uppercase flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B08A4A]" />
              <span>Sacred Unboxing Inspector</span>
            </span>
            {kit.consecratedAt && (
              <span className="px-3 py-1 rounded-full bg-[#D9C6A8]/20 text-[#66705A] text-xs font-dm flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#B08A4A]" />
                <span>Sanctified at {kit.consecratedAt}</span>
              </span>
            )}
          </div>
          <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#8F6E5B]">
            {kit.title}
          </h3>
          <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/80 mt-1">
            {kit.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Visual box presentation */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden border border-[#D9C6A8] shadow-md aspect-square group bg-white">
              <img 
                src={kit.image} 
                alt={kit.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#8F6E5B]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-dm text-[#F7F1E5]">
                <span>Total Net Weight: ~{kit.weightGrams}g</span>
                <span className="text-[#D9C6A8] font-semibold">100% Tamper Proof</span>
              </div>
            </div>

            {/* Quality Seals */}
            <div className="mt-4 p-4 rounded-xl bg-white/80 border border-[#D9C6A8] space-y-2 text-xs font-dm text-[#8F6E5B]/85 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#B08A4A] shrink-0" />
                <span>Zero petroleum wax, synthetic dyes, or chemical fillers</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#B08A4A] shrink-0" />
                <span>Individual airtight sanctified brass & glass containers</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B08A4A] shrink-0" />
                <span>Accompanied by printed Sanskrit Vidhi Margdarshika booklet</span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-6 pt-4 border-t border-[#D9C6A8] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8F6E5B]/70 font-dm font-medium block">Sacred Offering Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#C7833D]">
                    ₹{kit.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-dm line-through text-[#8F6E5B]/50">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C7833D] to-[#B08A4A] hover:from-[#B08A4A] hover:to-[#C7833D] text-[#F7F1E5] font-dm font-semibold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Box to Cart</span>
              </button>
            </div>
          </div>

          {/* Right Column: Itemized Inside-The-Box Inventory */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="font-cormorant text-base font-semibold text-[#8F6E5B] uppercase tracking-wider">
                What's Inside The Sacred Box ({kit.itemsIncluded.length} Consecrated Items)
              </span>
              <span className="text-[11px] font-dm text-[#66705A]">
                Touch item for sacred provenance
              </span>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
              {kit.itemsIncluded.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/80 border border-[#D9C6A8] hover:border-[#B08A4A] transition-all flex flex-col gap-1 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-dm font-semibold text-sm text-[#8F6E5B] flex items-center gap-2">
                      <span className="text-[#C7833D] text-xs font-cormorant font-semibold">0{idx + 1}.</span>
                      {item.name}
                    </span>
                    <span className="text-[10px] font-dm px-2 py-0.5 rounded bg-[#D9C6A8]/25 border border-[#D9C6A8] text-[#C7833D] font-semibold">
                      {item.origin}
                    </span>
                  </div>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 pl-5">
                    {item.significance}
                  </p>
                </div>
              ))}
            </div>

            {/* Ideal for note */}
            <div className="mt-4 p-3 rounded-xl bg-[#D9C6A8]/20 border border-[#D9C6A8] flex items-center justify-between text-xs font-dm">
              <span className="text-[#8F6E5B] font-medium">Prescribed Ritual:</span>
              <span className="font-semibold text-[#C7833D]">{kit.idealFor}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
