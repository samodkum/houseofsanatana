import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { cn } from "../../lib/utils";
import { ArrowUpRight, Sparkles } from "lucide-react";

export interface ScrollSplitCardItem {
  id: string;
  title: string;
  badge?: string;
  subtitle?: string;
  description: string;
  bgColor: string;
  textColor?: string;
  accentColor?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

interface ScrollSplitCardProps {
  className?: string;
  imageSrc: string;
  imageAlt?: string;
  cards: ScrollSplitCardItem[];
  containerRef?: React.RefObject<HTMLElement | null>;
  sectionEyebrow?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function ScrollSplitCard({
  className,
  imageSrc,
  imageAlt,
  cards,
  containerRef: externalContainerRef,
  sectionEyebrow = "॥ चतुर्द्वारम् ॥ FOUR SACRED GATEWAYS",
  sectionTitle = "The Living House of Sanatan",
  sectionSubtitle = "Step through the consecrated threshold into the four dimensions of timeless Dharma.",
}: ScrollSplitCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the extended pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: externalContainerRef,
    offset: ["start start", "end end"],
  });

  // Snappy spring physics for bidirectional silky-smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // =========================================================================
  // CHOREOGRAPHY BREAKDOWN:
  // 1. [0.00 -> 0.30] ZOOM IN: The image starts small (0.54 scale), totally clean
  //    and seamless as ONE whole image (0 gap, 0 inner border).
  // 2. [0.30 -> 0.54] CUT INTO 4: As soon as it fits the viewport, it cleanly cuts
  //    into 4 distinct cards that glide outward on X.
  // 3. [0.54 -> 0.78] 3D FLIP: The 4 cards flip 180° in 3D to reveal the gateways.
  //    Front image hides completely. No background layer stays behind!
  // 4. [0.78 -> 1.00] PINNED & EXPLORE: Fully revealed cards stay pinned and interactive.
  // =========================================================================

  // Scale: starts small (0.54), zooms in smoothly to 1.0 at 0.30, holds steady
  const portalScale = useTransform(
    smoothProgress,
    [0, 0.28, 0.54, 0.78, 1],
    [0.54, 1.0, 1.0, 0.96, 0.96]
  );

  // Separation (X-Offsets for the 4 split cards):
  const leftXFar = useTransform(smoothProgress, [0, 0.3, 0.52, 0.76, 1], [0, 0, -64, -36, -36]);
  const leftXMid = useTransform(smoothProgress, [0, 0.3, 0.52, 0.76, 1], [0, 0, -22, -12, -12]);
  const rightXMid = useTransform(smoothProgress, [0, 0.3, 0.52, 0.76, 1], [0, 0, 22, 12, 12]);
  const rightXFar = useTransform(smoothProgress, [0, 0.3, 0.52, 0.76, 1], [0, 0, 64, 36, 36]);

  // 3D Flip (rotateY):
  const rotateY = useTransform(smoothProgress, [0, 0.54, 0.78, 1], [0, 0, 180, 180]);

  // Fan rotation on Z-axis during flip
  const rotateZFarLeft = useTransform(smoothProgress, [0, 0.54, 0.78, 1], [0, 0, 5.5, 5.5]);
  const rotateZMidLeft = useTransform(smoothProgress, [0, 0.54, 0.78, 1], [0, 0, 2, 2]);
  const rotateZMidRight = useTransform(smoothProgress, [0, 0.54, 0.78, 1], [0, 0, -2, -2]);
  const rotateZFarRight = useTransform(smoothProgress, [0, 0.54, 0.78, 1], [0, 0, -5.5, -5.5]);

  // Dynamic border radius on the 4 panels:
  const borderRadiusLeft = useTransform(
    smoothProgress,
    [0, 0.3, 0.5],
    ["20px 0px 0px 20px", "20px 0px 0px 20px", "20px 20px 20px 20px"]
  );
  const borderRadiusMiddle = useTransform(
    smoothProgress,
    [0, 0.3, 0.5],
    ["0px 0px 0px 0px", "0px 0px 0px 0px", "20px 20px 20px 20px"]
  );
  const borderRadiusRight = useTransform(
    smoothProgress,
    [0, 0.3, 0.5],
    ["0px 20px 20px 0px", "0px 20px 20px 0px", "20px 20px 20px 20px"]
  );

  // Dynamic border & shadow on individual cards:
  const borderOpacity = useTransform(smoothProgress, [0, 0.3, 0.48], [0, 0, 0.45]);
  const shadowOpacity = useTransform(smoothProgress, [0, 0.3, 0.48], [0, 0, 0.65]);
  const cardBorderColor = useMotionTemplate`rgba(212, 154, 63, ${borderOpacity})`;
  const cardBoxShadow = useMotionTemplate`0 25px 60px -10px rgba(0, 0, 0, ${shadowOpacity})`;

  // Pointer events management: front face disabled once flipped, back face enabled
  const frontPointerEvents = useTransform(smoothProgress, [0, 0.66], ["auto", "none"]);
  const backPointerEvents = useTransform(smoothProgress, [0, 0.66], ["none", "auto"]);

  // Dynamic Phase Status Indicators in Header
  const activeCards = cards.slice(0, 4);

  return (
    <>
      {/* ======================================================== */}
      {/* MOBILE EXPERIENCE (< md): Swiss Editorial Pill Headline */}
      {/* ======================================================== */}
      <div className="block md:hidden w-full bg-[#F7F1E5] px-5 py-12 text-left select-none">
        
        {/* 2-Line Headline with Staggered Word Show-Up Animation & HOS Palette */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.07, delayChildren: 0.05 },
            },
          }}
          className="font-cormorant font-semibold text-[#8F6E5B] text-3xl min-[380px]:text-4xl min-[440px]:text-5xl leading-[1.1] tracking-tight whitespace-nowrap mb-6"
        >
          {/* Line 1: The breadth of [the house] */}
          <div className="flex items-center flex-nowrap gap-1.5 min-[380px]:gap-2">
            {["The", "breadth", "of"].map((word, i) => (
              <motion.span 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.94 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                whileHover={{ y: -2 }}
                style={{ color: "#8F6E5B" }}
                className="inline-block text-[#8F6E5B] transition-colors duration-300 cursor-default"
              >
                {word}
              </motion.span>
            ))}
            
            <motion.span 
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 24 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0, 
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                }
              }}
              whileTap={{ scale: 0.96 }}
              className="relative inline-flex items-center px-2.5 min-[380px]:px-3 py-0.5 rounded-full bg-gradient-to-r from-[#C7833D] to-[#B08A4A] text-[#F7F1E5] shadow-[0_3px_12px_rgba(199,131,61,0.3)] overflow-hidden text-[0.85em] font-dm font-bold shrink-0"
            >
              <span className="relative z-10">the house</span>
              <motion.span 
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] pointer-events-none"
                animate={{ x: ["-150%", "300%"] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", repeatDelay: 1.5 }}
              />
            </motion.span>
          </div>

          {/* Line 2: four gateways [into dharma.] */}
          <div className="mt-1 flex items-center flex-nowrap gap-1.5 min-[380px]:gap-2">
            {["four", "gateways"].map((word, i) => (
              <motion.span 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.94 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                whileHover={{ y: -2 }}
                style={{ color: "#8F6E5B" }}
                className="inline-block text-[#8F6E5B] transition-colors duration-300 cursor-default"
              >
                {word}
              </motion.span>
            ))}
            <motion.span 
              variants={{
                hidden: { opacity: 0, scale: 0.85, y: 24 },
                visible: { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0, 
                  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                }
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center px-2.5 min-[380px]:px-3 py-0.5 rounded-full border-1.5 min-[380px]:border-2 border-[#66705A] text-[#66705A] active:bg-[#66705A] active:text-[#F7F1E5] transition-colors duration-200 text-[0.85em] font-dm font-bold shrink-0"
            >
              into dharma.
            </motion.span>
          </div>

        </motion.div>

        {/* Mobile Divine Image Banner */}
        <div className="w-full max-w-sm mx-auto h-48 rounded-2xl overflow-hidden border border-[#B08A4A]/50 mb-8 shadow-xl">
          <img
            src={imageSrc}
            alt={imageAlt || "Lord Krishna Sacred Ascension"}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
          {activeCards.map((card, i) => (
            <div
              key={card.id || i}
              className="relative rounded-2xl overflow-hidden border border-[#B08A4A]/40 p-6 flex flex-col justify-between shadow-[0_12px_28px_rgba(70,45,30,0.25)]"
              style={{ backgroundColor: card.bgColor }}
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#B08A4A]/25 to-black/60 border border-[#B08A4A]/50 text-[#D9C6A8]">
                  {card.icon || <Sparkles className="w-5 h-5 text-[#D9C6A8]" />}
                </div>
                {card.badge && (
                  <span className="text-[10px] font-dm font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/60 border border-[#B08A4A]/30 text-[#F7F1E5]">
                    {card.badge}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-dm tracking-[0.2em] uppercase text-[#D9C6A8] font-semibold block mb-1">
                  {card.subtitle || `Gateway 0${i + 1}`}
                </span>
                <h3 className="font-cormorant text-2xl font-semibold text-white mb-2">
                  {card.title}
                </h3>
                <p className="font-dm text-xs text-[#e2d5c3] leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (card.onAction) card.onAction();
                }}
                className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-[#B08A4A] to-[#C7833D] hover:from-[#C7833D] hover:to-[#B08A4A] text-[#F7F1E5] hover:text-white font-dm font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer border border-[#B08A4A]/40"
              >
                <span>{card.actionLabel || "Explore"}</span>
                <ArrowUpRight className="w-4 h-4 text-[#F7F1E5]" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP EXPERIENCE (md+): Pinned 4-Stage Choreography   */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        className={cn(
          "hidden md:block relative min-h-[440vh] w-full bg-[#F7F1E5]",
          className
        )}
      >
        {/* Ambient background sanctuary glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#D9C6A8]/30 rounded-full blur-[170px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/4 w-[600px] h-[450px] bg-[#C7833D]/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[400px] bg-[#B08A4A]/20 rounded-full blur-[160px] pointer-events-none" />

        {/* Pinned Sticky Viewport: Remains fixed throughout the entire sequence */}
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4 py-6">
          
          {/* Section Header - Swiss Editorial Layout (Aligned with HOS Palette & Animated) */}
          <div className="relative z-20 w-full max-w-5xl mx-auto mb-3 sm:mb-5 px-4 sm:px-6 select-none text-left">
            
            {/* 2-Line Headline with Staggered Word Show-Up Animation */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.05 },
                },
              }}
              className="font-cormorant font-semibold text-[#8F6E5B] text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] leading-[1.05] tracking-tight whitespace-nowrap"
            >
              {/* Line 1: The breadth of [the house] */}
              <div className="flex items-center flex-nowrap gap-x-2.5 sm:gap-x-3.5">
                {["The", "breadth", "of"].map((word, i) => (
                  <motion.span 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    whileHover={{ y: -3, scale: 1.03 }}
                    style={{ color: "#8F6E5B" }}
                    className="inline-block text-[#8F6E5B] transition-colors duration-300 cursor-default"
                  >
                    {word}
                  </motion.span>
                ))}
                
                {/* Pill 1: Saffron Filled Capsule with Fluid Light Gleam Reflection */}
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 30 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0, 
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  whileHover={{ scale: 1.05, y: -2, rotate: -0.5 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#C7833D] via-[#B08A4A] to-[#C7833D] text-[#F7F1E5] shadow-[0_4px_16px_rgba(199,131,61,0.32)] overflow-hidden cursor-pointer select-none transition-shadow duration-300 hover:shadow-[0_6px_22px_rgba(199,131,61,0.45)] text-[0.82em] font-dm font-bold tracking-tight shrink-0"
                >
                  <span className="relative z-10 drop-shadow-xs">
                    the house
                  </span>
                  
                  {/* Subtle Shimmer Gleam Reflection */}
                  <motion.span 
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-22deg] pointer-events-none"
                    animate={{ x: ["-160%", "320%"] }}
                    transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut", repeatDelay: 1.6 }}
                  />
                </motion.span>
              </div>

              {/* Line 2: four gateways [into dharma.] */}
              <div className="mt-1 sm:mt-2 flex items-center flex-nowrap gap-x-2.5 sm:gap-x-3.5">
                {["four", "gateways"].map((word, i) => (
                  <motion.span 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    whileHover={{ y: -3, scale: 1.03 }}
                    style={{ color: "#8F6E5B" }}
                    className="inline-block text-[#8F6E5B] transition-colors duration-300 cursor-default"
                  >
                    {word}
                  </motion.span>
                ))}

                {/* Pill 2: Soft Sage Olive Capsule with Smooth Hover Fill */}
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, scale: 0.85, y: 30 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0, 
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  whileHover={{ scale: 1.05, y: -2, rotate: 0.5 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full border-2 sm:border-[2.5px] border-[#66705A] text-[#66705A] hover:bg-[#66705A] hover:text-[#F7F1E5] shadow-xs hover:shadow-[0_6px_20px_rgba(102,112,90,0.25)] transition-all duration-300 cursor-pointer select-none text-[0.82em] font-dm font-bold tracking-tight shrink-0"
                >
                  into dharma.
                </motion.span>
              </div>

            </motion.div>

          </div>

          {/* 3D Stage: Scales up as ONE unified image, cuts into 4, then flips in 3D */}
          <motion.div
            style={{
              scale: portalScale,
              transformStyle: "preserve-3d",
            }}
            className="relative flex h-[480px] w-full max-w-6xl px-2 sm:px-4 [perspective:1400px]"
          >


            {/* The 4 Cards: Seamless during zoom, separate on cut, and flip in 3D */}
            {activeCards.map((card, i) => {
              // Determine X offset based on index (0, 1, 2, 3)
              let cardX = leftXFar;
              let cardRotateZ = rotateZFarLeft;
              let cardRadius = borderRadiusLeft;

              if (i === 1) {
                cardX = leftXMid;
                cardRotateZ = rotateZMidLeft;
                cardRadius = borderRadiusMiddle;
              } else if (i === 2) {
                cardX = rightXMid;
                cardRotateZ = rotateZMidRight;
                cardRadius = borderRadiusMiddle;
              } else if (i === 3) {
                cardX = rightXFar;
                cardRotateZ = rotateZFarRight;
                cardRadius = borderRadiusRight;
              }

              return (
                <motion.div
                  key={card.id || i}
                  className="group relative h-full flex-1 cursor-pointer"
                  style={{
                    x: cardX,
                    rotateY,
                    rotateZ: cardRotateZ,
                    zIndex: i <= 1 ? i + 1 : 4 - i,
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    scale: 1.045,
                    y: -10,
                    transition: { type: "spring", stiffness: 360, damping: 22 },
                  }}
                >
                  {/* ================================================= */}
                  {/* FRONT FACE: Sliced 1/4 of Krishna Image           */}
                  {/* Zero inner border during zoom; dynamic border on cut */}
                  {/* ================================================= */}
                  <motion.div
                    className="absolute inset-0 overflow-hidden [backface-visibility:hidden] border will-change-transform transform-gpu"
                    style={{
                      zIndex: 2,
                      borderRadius: cardRadius,
                      borderColor: cardBorderColor,
                      boxShadow: cardBoxShadow,
                      pointerEvents: frontPointerEvents as any,
                    }}
                  >
                    {/* Inner slice has 400% width, shifted by -100% * i */}
                    <div
                      className="absolute inset-0 h-full w-[400%]"
                      style={{
                        left: `${-100 * i}%`,
                        backgroundImage: `url(${imageSrc})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Dark gradient & atmospheric vignette on front */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />
                  </motion.div>

                  {/* ================================================= */}
                  {/* BACK FACE: High-End Revealed Gateway Card         */}
                  {/* Revealed ONLY when flipped. No background image behind! */}
                  {/* ================================================= */}
                  <motion.div
                    className={cn(
                      "absolute inset-0 overflow-hidden flex flex-col justify-between p-5 sm:p-6 [backface-visibility:hidden] will-change-transform transform-gpu",
                      "border border-[#B08A4A]/40 transition-all duration-300",
                      "shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
                      "group-hover:border-[#D9C6A8] group-hover:shadow-[0_25px_60px_rgba(176,138,74,0.35)]"
                    )}
                    style={{
                      backgroundColor: card.bgColor,
                      color: card.textColor || "#F7F1E5",
                      transform: "rotateY(180deg)",
                      zIndex: 1,
                      borderRadius: cardRadius,
                      pointerEvents: backPointerEvents as any,
                    }}
                  >
                    {/* Subtle Sacred Texture Overlay */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-15 mix-blend-overlay"
                      style={{
                        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(176,138,74,0.3) 0%, transparent 80%)`,
                      }}
                    />

                    {/* Card Header: Icon & Badge */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#B08A4A]/25 to-black/60 border border-[#B08A4A]/50 text-[#D9C6A8] shadow-[0_4px_16px_rgba(176,138,74,0.25)] group-hover:scale-110 group-hover:border-[#D9C6A8] transition-all duration-300">
                          {card.icon || <Sparkles className="w-5 h-5 text-[#D9C6A8]" />}
                        </div>

                        {card.badge && (
                          <span className="text-[10px] font-dm font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/50 border border-[#B08A4A]/30 text-[#F7F1E5]">
                            {card.badge}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] sm:text-[11px] font-dm tracking-[0.2em] uppercase text-[#D9C6A8] font-semibold block mb-0.5">
                        {card.subtitle || `Gateway 0${i + 1}`}
                      </span>
                      <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold leading-tight text-white mb-2">
                        {card.title}
                      </h3>
                    </div>

                    {/* Card Body: Description */}
                    <div className="relative z-10 my-auto">
                      <p className="font-dm text-xs sm:text-[13px] text-[#e2d5c3] leading-relaxed line-clamp-4">
                        {card.description}
                      </p>
                    </div>

                    {/* Card Footer: Interactive CTA Button */}
                    <div className="relative z-10 pt-3 border-t border-[#B08A4A]/20">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (card.onAction) card.onAction();
                        }}
                        className="w-full group/btn inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#B08A4A] to-[#C7833D] hover:from-[#C7833D] hover:to-[#B08A4A] text-[#F7F1E5] hover:text-white font-dm font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer border border-[#B08A4A]/40"
                      >
                        <span>{card.actionLabel || "Explore"}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#F7F1E5] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
}
