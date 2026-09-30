import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { AbstractLotusPetals, TempleArchitectureLine } from './ui/SacredPatterns';

export const TravelProductBridge: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    mass: 0.3,
  });

  // Smooth parallax motion for typography & right-side enlarged lotus
  const textY = useTransform(smoothProgress, [0.1, 0.6], [30, -15]);
  const lotusY = useTransform(smoothProgress, [0.1, 0.7], [-10, -50]);

  return (
    <section
      ref={containerRef}
      id="travel-to-product-bridge"
      className="relative w-full bg-[#F7F1E5] overflow-hidden select-none flex items-center justify-center pt-14 pb-6 sm:pt-18 sm:pb-8 lg:pt-20 lg:pb-10 px-4 sm:px-8 lg:px-16"
    >
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#8F6E5B 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* ======================================================== */}
        {/* LEFT 7 COLS: PLAYFUL EDITORIAL HEADING TYPOGRAPHY        */}
        {/* Matching exact reference text layout & mixed style glyphs */}
        {/* ======================================================== */}
        <motion.div 
          style={{ y: textY }}
          className="lg:col-span-7 flex flex-col justify-center relative z-20"
        >
          {/* Subtle Temple Architecture Line Drawing Watermark behind heading */}
          <div className="absolute -top-12 sm:-top-20 left-1/2 -translate-x-1/2 sm:left-12 sm:translate-x-0 pointer-events-none opacity-15 sm:opacity-20 z-0 select-none">
            <TempleArchitectureLine size={520} color="#705B4C" />
          </div>

          {/* Eyebrow Label */}
          <div className="relative z-10 inline-flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#8F6E5B]/10 border border-[#8F6E5B]/20 text-[#8F6E5B] text-[10px] sm:text-xs font-dm font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8F6E5B]" />
              <span>॥ तीर्थात मन्दिरम् ॥ &bull; FROM YATRA TO SANCTUM</span>
            </span>
          </div>

          {/* Main Giant Stacked Typography */}
          <div className="relative z-10 space-y-0 tracking-tight select-none">
            {/* LINE 1: A SANCTUM */}
            <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
              <h2 className="font-cormorant font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[104px] text-[#8F6E5B] leading-[0.88] uppercase tracking-[-0.02em]">
                A SANCTUM
              </h2>
            </div>

            {/* LINE 2: OF SACRED */}
            <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
              <h2 className="font-cormorant font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[104px] text-[#8F6E5B] leading-[0.88] uppercase tracking-[-0.02em]">
                OF SACRED
              </h2>
            </div>

            {/* LINE 3: OFFERINGS. */}
            <div className="flex items-baseline gap-3 sm:gap-4 flex-wrap">
              <h2 className="font-cormorant font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[104px] text-[#8F6E5B] leading-[0.88] uppercase tracking-[-0.02em]">
                OFFERINGS.
              </h2>
            </div>
          </div>

          {/* Subtitle / Tagline in matching lowercase editorial font */}
          <div className="relative z-10 mt-4 sm:mt-5 flex items-center gap-3">
            <p className="font-dm text-sm sm:text-base md:text-lg font-medium text-[#8F6E5B]/85 tracking-tight">
              ॥ पवित्र पूजा सामग्री ॥ Handcrafted ritual essentials & temple-consecrated pooja chests.
            </p>
          </div>

          {/* Prompt to scroll to products */}
          <div className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs font-dm font-bold uppercase tracking-widest text-[#C7833D]">
            <span>Explore The Collection Below</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* RIGHT 5 COLS: ENLARGED ABSTRACT LOTUS PETALS MOTIF        */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 relative flex items-center justify-end">
          <motion.div
            style={{ y: lotusY }}
            className="w-full flex items-center justify-end p-2 sm:p-4 translate-x-2 sm:translate-x-6 drop-shadow-[0_20px_45px_rgba(102,112,90,0.18)]"
          >
            <AbstractLotusPetals size={500} className="w-full max-w-[440px] sm:max-w-[500px] h-auto" />
          </motion.div>
        </div>

      </div>

    </section>
  );
};
