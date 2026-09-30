import React, { useState } from 'react';

interface ThreeCategoryShowcaseProps {
  onSelectCategory: (categoryId: 'kits' | 'murtis' | 'dravyas') => void;
}

export const ThreeCategoryShowcase: React.FC<ThreeCategoryShowcaseProps> = ({
  onSelectCategory,
}) => {
  const [digitMode, setDigitMode] = useState<'123' | '369'>('123');

  const handleCategoryClick = (catId: 'kits' | 'murtis' | 'dravyas', targetId: string) => {
    onSelectCategory(catId);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categories = [
    {
      id: 'kits' as const,
      num: digitMode === '123' ? '1' : '3',
      color: '#7EAEC4', // Soft powder sky blue
      title: 'Sacred Pooja Kits', // Concise 3 words
      image: '/@fs/C:/Users/Anjal/.gemini/antigravity-ide/brain/c650d01c-2fcb-423d-a351-1d218e575db7/category_pooja_kit_1790488501548.jpg',
      fallback: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=85',
      targetId: 'section-category-grid',
      tiltClass: '-rotate-6 group-hover:-rotate-2',
    },
    {
      id: 'murtis' as const,
      num: digitMode === '123' ? '2' : '6',
      color: '#F1BD70', // Warm golden yellow
      title: 'Devalaya Vigrahas', // Concise 2 words
      image: '/@fs/C:/Users/Anjal/.gemini/antigravity-ide/brain/c650d01c-2fcb-423d-a351-1d218e575db7/category_murti_vigraha_1790488518838.jpg',
      fallback: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=85',
      targetId: 'section-category-grid',
      tiltClass: 'rotate-0 group-hover:scale-105',
    },
    {
      id: 'dravyas' as const,
      num: digitMode === '123' ? '3' : '9',
      color: '#D79880', // Terracotta clay pink
      title: 'Vedic Dravyas', // Concise 2 words
      image: '/@fs/C:/Users/Anjal/.gemini/antigravity-ide/brain/c650d01c-2fcb-423d-a351-1d218e575db7/category_vedic_dravyas_1790488547761.jpg',
      fallback: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=85',
      targetId: 'section-category-grid',
      tiltClass: 'rotate-6 group-hover:rotate-2',
    },
  ];

  return (
    <section className="relative w-full pt-16 sm:pt-24 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF6EE] select-none">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#EADECA]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Overhead Label */}
        <div className="flex flex-col items-center justify-center mb-14 sm:mb-18">
          <span className="font-dm text-xs sm:text-sm font-bold uppercase tracking-[0.35em] text-[#8C9A75]">
            SHOP
          </span>

          {/* Subtle switcher for number preference */}
          <div className="mt-2.5 inline-flex items-center gap-1 p-0.5 rounded-full bg-[#EFE7D5]/70 border border-[#D9C6A8]/50 text-[10px] font-dm text-[#8F6E5B]">
            <button
              type="button"
              onClick={() => setDigitMode('123')}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-bold ${
                digitMode === '123'
                  ? 'bg-white text-[#26201B] shadow-2xs'
                  : 'text-[#8F6E5B]/70 hover:text-[#26201B]'
              }`}
            >
              1 • 2 • 3 Order
            </button>
            <button
              type="button"
              onClick={() => setDigitMode('369')}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-bold ${
                digitMode === '369'
                  ? 'bg-white text-[#26201B] shadow-2xs'
                  : 'text-[#8F6E5B]/70 hover:text-[#26201B]'
              }`}
            >
              3 • 6 • 9 Cosmic
            </button>
          </div>
        </div>

        {/* Three Category Items: Number hidden by default, POPs out from behind on hover */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 sm:gap-10 lg:gap-12 items-end">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id, cat.targetId)}
              className="group flex flex-col items-center cursor-pointer transition-all duration-300 relative"
            >
              {/* Product Visual Stage */}
              <div className="relative w-full h-[280px] sm:h-[300px] flex items-center justify-center">

                {/* 
                  POP-ANIMATED DIGIT BEHIND:
                  - Hidden by default (scale-50 opacity-0 translate-y-6)
                  - On hover: pops up with an elastic spring animation (scale-100 opacity-100 translate-y-0)
                */}
                <span
                  className="absolute top-0 right-4 sm:right-6 lg:right-8 font-sans font-black text-[180px] sm:text-[200px] lg:text-[220px] leading-none select-none pointer-events-none opacity-0 scale-50 translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
                  style={{ color: cat.color }}
                >
                  {cat.num}
                </span>

                {/* Foreground Isolated Product: Lifts and scales gracefully on hover */}
                <div className={`relative z-10 w-[220px] sm:w-[240px] aspect-square flex items-center justify-center transition-all duration-500 ease-out group-hover:-translate-y-3 ${cat.tiltClass}`}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = cat.fallback;
                    }}
                    className="w-full h-full object-contain mix-blend-multiply filter drop-shadow-[0_18px_20px_rgba(40,30,20,0.18)] transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Ground Contact Shadow: softly spreads on hover */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[180px] h-[20px] bg-[#2E2419]/15 rounded-[100%] blur-[8px] pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-60" />

              </div>

              {/* 2-3 Word Detail Just Below the Layout */}
              <div className="mt-5 text-center flex flex-col items-center">
                <h4 className="font-dm text-sm sm:text-base font-bold text-[#26201B] group-hover:text-[#C7833D] transition-colors tracking-tight">
                  {cat.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
