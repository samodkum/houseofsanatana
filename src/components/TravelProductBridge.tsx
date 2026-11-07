import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown } from 'lucide-react';
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
      className="relative w-full bg-transparent overflow-hidden select-none flex items-center justify-center pt-12 pb-3 sm:pt-16 sm:pb-4 lg:pt-18 lg:pb-5 px-4 sm:px-8 lg:px-16"
    >
      {/* Background Subtle Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#C59239 1.5px, transparent 1.5px)',
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
          <div className="absolute -top-10 sm:-top-16 left-1/2 -translate-x-1/2 sm:left-8 sm:translate-x-0 pointer-events-none opacity-20 z-0 select-none overflow-visible">
            <TempleArchitectureLine size={320} color="#C59239" className="w-[280px] sm:w-[380px] md:w-[460px] h-auto" />
          </div>

          {/* Main Giant Stacked Typography with Staggered Entrance Animation */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.05 }
              }
            }}
            className="relative z-10 space-y-0 tracking-tight select-none"
          >
            {['A SANCTUM', 'OF SACRED', 'OFFERINGS.'].map((lineText, idx) => (
              <motion.div 
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 26, scale: 0.96 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                className="flex items-baseline gap-3 sm:gap-4 flex-wrap"
              >
                <h2 className="font-cormorant font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[104px] text-[#221508] leading-[0.88] uppercase tracking-[-0.02em]">
                  {lineText}
                </h2>
              </motion.div>
            ))}
          </motion.div>

          {/* Subtitle / Tagline in matching lowercase editorial font */}
          <motion.div 
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-4 sm:mt-5 flex items-center gap-3"
          >
            <p className="font-montserrat text-sm sm:text-base md:text-lg font-medium text-[#3D2619] tracking-tight">
              ॥ पवित्र पूजा सामग्री ॥ Handcrafted ritual essentials &amp; temple-consecrated pooja chests.
            </p>
          </motion.div>

          {/* Prompt to scroll to products */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 mt-5 inline-flex items-center gap-2 text-xs font-montserrat font-bold uppercase tracking-widest text-[#FE7613]"
          >
            <span>Explore The Collection Below</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </motion.div>
        </motion.div>

        {/* ======================================================== */}
        {/* RIGHT 5 COLS: ENLARGED ABSTRACT LOTUS PETALS MOTIF        */}
        {/* ======================================================== */}
        <div className="hidden lg:flex lg:col-span-5 relative items-center justify-end">
          <motion.div
            style={{ y: lotusY }}
            className="w-full flex items-center justify-end p-2 sm:p-4 translate-x-2 sm:translate-x-6 drop-shadow-[0_20px_45px_rgba(194,48,83,0.22)]"
          >
            <AbstractLotusPetals size={500} className="w-full max-w-[440px] sm:max-w-[500px] h-auto" />
          </motion.div>
        </div>

      </div>

    </section>
  );
};
