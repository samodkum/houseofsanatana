import React, { useState } from 'react';
import { POOJA_KITS } from '../data/mockData';
import { PoojaKit } from '../types/homepage';
import { KitUnboxModal } from './KitUnboxModal';
import { Sparkles, Star, Eye, ShoppingBag, MapPin, CheckCircle2 } from 'lucide-react';

interface PoojaKitsSectionProps {
  onAddToCart: (kit: PoojaKit) => void;
}

export const PoojaKitsSection: React.FC<PoojaKitsSectionProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectKit, setInspectKit] = useState<PoojaKit | null>(null);

  const categories = [
    { id: 'all', label: 'All Sacred Kits' },
    { id: 'daily', label: 'Daily Nitya Puja' },
    { id: 'festival', label: 'Festival Anushthan' },
    { id: 'havan', label: 'Havan & Vastu' },
    { id: 'meditation', label: 'Dhyana & Japa' },
  ];

  const filteredKits = selectedCategory === 'all' 
    ? POOJA_KITS 
    : POOJA_KITS.filter(k => k.category === selectedCategory);

  return (
    <section id="pooja-kits" className="relative w-full py-20 sm:py-28 bg-[#FEFBF2] border-t border-[#C59239]/20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C59239]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-semibold text-[#221508]">
              Consecrated Pooja Kits & Ritual Samagri
            </h2>
            <p className="mt-3 font-dm text-sm sm:text-base text-[#3D2619]/80 leading-relaxed font-normal">
              Every element hand-selected, lab-tested, and assembled strictly according to Vedic Agamas. Unadulterated purity brought directly to your home sanctum.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-dm font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#98555E] to-[#733B42] text-white shadow-md font-bold'
                    : 'bg-white text-[#3D2619] border border-[#C59239]/30 hover:border-[#98555E] hover:text-[#221508]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredKits.map((kit) => {
            const discountPercent = Math.round(((kit.originalPrice - kit.price) / kit.originalPrice) * 100);

            return (
              <div
                key={kit.id}
                className="group relative rounded-3xl bg-white border-2 border-[#C59239]/25 hover:border-[#98555E] transition-all duration-500 shadow-[0_10px_30px_rgba(34,21,8,0.06)] hover:shadow-[0_16px_40px_rgba(152,85,94,0.15)] flex flex-col justify-between overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FEFBF2]">
                  <img
                    src={kit.image}
                    alt={kit.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    {kit.badge && (
                      <span className="px-2.5 py-1 rounded-md bg-[#98555E] text-white font-dm font-bold text-[10px] tracking-wider uppercase shadow-md">
                        {kit.badge}
                      </span>
                    )}
                    <span className="ml-auto px-2 py-0.5 rounded bg-white/95 backdrop-blur-md border border-[#C59239]/30 text-[#FE7613] font-dm text-[11px] font-bold shadow-xs">
                      {discountPercent}% OFF
                    </span>
                  </div>

                  {/* Temple Consecration Tag */}
                  {kit.consecratedAt && (
                    <div className="absolute bottom-2 left-3 right-3 flex items-center gap-1.5 text-[11px] font-dm text-[#221508] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#C59239]/30 shadow-xs">
                      <MapPin className="w-3 h-3 text-[#607427] shrink-0" />
                      <span className="truncate font-semibold">{kit.consecratedAt}</span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating & Review */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center text-[#FE7613] text-xs">
                        <Star className="w-3.5 h-3.5 fill-[#FE7613]" />
                        <span className="ml-1 font-bold font-dm text-[#221508]">
                          {kit.rating}
                        </span>
                      </div>
                      <span className="text-[11px] font-dm text-[#607427] font-semibold">
                        ({kit.reviewsCount} reviews)
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-cormorant text-xl font-bold text-[#221508] group-hover:text-[#98555E] transition-colors line-clamp-1">
                      {kit.title}
                    </h3>
                    <p className="mt-1 font-dm text-xs text-[#3D2619]/75 line-clamp-2 leading-relaxed">
                      {kit.subtitle}
                    </p>

                    {/* Key Included Items preview */}
                    <div className="mt-3 pt-3 border-t border-[#C59239]/20">
                      <span className="text-[10px] uppercase tracking-wider text-[#607427] font-dm font-bold block mb-1.5">
                        Contains {kit.itemsIncluded.length} Consecrated Elements:
                      </span>
                      <ul className="text-[11px] font-dm text-[#3D2619] space-y-1">
                        {kit.itemsIncluded.slice(0, 2).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 truncate">
                            <span className="text-[#FE7613] text-xs">✦</span>
                            <span className="truncate font-medium">{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing & Buttons */}
                  <div className="mt-5 pt-4 border-t border-[#C59239]/20">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="font-cormorant text-2xl font-bold text-[#FE7613]">
                          ₹{kit.price.toLocaleString()}
                        </span>
                        <span className="ml-2 font-dm text-xs line-through text-[#3D2619]/50">
                          ₹{kit.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-[10px] font-dm text-[#607427] flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> In Stock
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setInspectKit(kit)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#FEFBF2] border border-[#C59239]/40 hover:border-[#0A4C83] text-[#221508] hover:text-[#0A4C83] font-dm text-xs font-semibold transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#0A4C83]" />
                        <span>Inside Box</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onAddToCart(kit)}
                        className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-gradient-to-r from-[#98555E] to-[#733B42] hover:brightness-110 text-white font-dm text-xs font-bold transition-all cursor-pointer shadow-md shadow-[#98555E]/25 active:scale-95"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Unboxing Inspector Modal */}
      {inspectKit && (
        <KitUnboxModal
          kit={inspectKit}
          onClose={() => setInspectKit(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
};
