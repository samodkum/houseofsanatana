import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Sparkles, Sun, ArrowRight } from 'lucide-react';
import { LotusLineArt, DividerOrnamental, TempleArchitectureLine } from './ui/SacredPatterns';

interface TheHouseSectionProps {
  onOpenAbout?: () => void;
}

interface BlockLineProps {
  isTriggered: boolean;
  delay?: number;
  children: React.ReactNode;
  className?: string;
  blockColor?: string;
}

// Framer Block Text Reveal Component
// Executes a fast, crisp sweeping block reveal as soon as triggered
const BlockRevealLine: React.FC<BlockLineProps> = ({
  isTriggered,
  delay = 0,
  children,
  className = '',
  blockColor = 'linear-gradient(90deg, #B08A4A, #D9C6A8, #C7833D)',
}) => {
  return (
    <div className={`relative inline-block overflow-hidden py-1 px-2 my-0.5 sm:my-1 will-change-transform ${className}`}>
      {/* The Text behind the sweeping block */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isTriggered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: delay + 0.18, duration: 0.15, ease: 'easeOut' }}
        className="block"
        style={{ transform: 'translateZ(0)' }}
      >
        {children}
      </motion.span>

      {/* The Animated Sweeping Block (Framer Block Text Reveal) */}
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0, originX: 0 }}
        animate={
          isTriggered
            ? {
                scaleX: [0, 1, 1, 0],
                originX: [0, 0, 1, 1],
              }
            : { scaleX: 0, originX: 0 }
        }
        transition={
          isTriggered
            ? {
                times: [0, 0.45, 0.55, 1],
                duration: 0.45,
                delay: delay,
                ease: [0.77, 0, 0.175, 1],
              }
            : { duration: 0.12 }
        }
        style={{
          background: blockColor,
          transform: 'translateZ(0)',
        }}
        className="absolute inset-0 z-10 pointer-events-none rounded-[2px] will-change-transform"
      />
    </div>
  );
};

// =====================================================================
// FRAMER SCROLL REVEAL TEXT COMPONENT (Word-by-word opacity lighting)
// =====================================================================
interface ScrollWordProps {
  children: string;
  progress: any;
  range: [number, number];
  activeColor?: string;
  dimColor?: string;
}

const ScrollWord: React.FC<ScrollWordProps> = ({
  children,
  progress,
  range,
  activeColor = '#8F6E5B',
  dimColor = 'rgba(143, 110, 91, 0.10)',
}) => {
  // Ghosted state (0.10) to fully revealed state (1.0) with subtle y-lift
  const opacity = useTransform(progress, range, [0.10, 1]);
  const color = useTransform(progress, range, [dimColor, activeColor]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <motion.span
      style={{ opacity, color, y }}
      className="inline-block transition-all duration-150 mr-[0.26em] will-change-[opacity,color,transform]"
    >
      {children}
    </motion.span>
  );
};

interface ScrollRevealSentenceProps {
  text: string;
  progress: any;
  startRange: number;
  endRange: number;
  className?: string;
  activeColor?: string;
  dimColor?: string;
}

const ScrollRevealSentence: React.FC<ScrollRevealSentenceProps> = ({
  text,
  progress,
  startRange,
  endRange,
  className = '',
  activeColor = '#8F6E5B',
  dimColor = 'rgba(143, 110, 91, 0.10)',
}) => {
  const words = text.split(' ');
  const step = (endRange - startRange) / Math.max(words.length, 1);

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => {
        const start = startRange + i * step;
        const end = Math.min(start + step, 1);
        return (
          <ScrollWord
            key={i}
            progress={progress}
            range={[start, end]}
            activeColor={activeColor}
            dimColor={dimColor}
          >
            {word}
          </ScrollWord>
        );
      })}
    </span>
  );
};



// =====================================================================
// WAVY TEXT REVEAL COMPONENT FOR ENGLISH TRANSLATION (1-second wave)
// =====================================================================
interface WavyTextRevealProps {
  paragraphs: string[];
  isTriggered: boolean;
}

const WavyTextReveal: React.FC<WavyTextRevealProps> = ({ paragraphs, isTriggered }) => {
  let globalWordIndex = 0;

  return (
    <div className="space-y-4 font-dm text-base sm:text-lg md:text-[19px] leading-relaxed font-normal mb-12 text-center max-w-3xl">
      {paragraphs.map((para, pIdx) => {
        const words = para.split(' ');
        return (
          <p key={pIdx} className="text-[#8F6E5B]">
            {words.map((word, wIdx) => {
              const currentIdx = globalWordIndex++;
              return (
                <motion.span
                  key={wIdx}
                  initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
                  animate={
                    isTriggered 
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' } 
                      : { opacity: 0, y: 14, filter: 'blur(3px)' }
                  }
                  transition={{
                    delay: isTriggered ? currentIdx * 0.022 : 0,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.26em] will-change-[transform,opacity,filter]"
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};

// =====================================================================
// SACRED RIG VEDA SHLOKA SCROLL REVEAL SECTION (CENTERED & TIMED REVEAL)
// =====================================================================
const ShlokaScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isShlokaComplete, setIsShlokaComplete] = useState(false);
  
  // Natural scroll window centered in the user's viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 78%', 'end 35%'],
  });

  // Snappy spring for tactile, fluid word-by-word lighting as user scrolls
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 28,
    mass: 0.1,
  });

  // Detect when all Sanskrit Shloka words finish illuminating (at ~0.38 progress)
  useEffect(() => {
    let lastComplete = false;
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const complete = latest >= 0.38;
      if (complete !== lastComplete) {
        lastComplete = complete;
        setIsShlokaComplete(complete);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const englishParagraphs = [
    "Let us walk together. Let us speak together. Let our minds understand one another.",
    "May our purpose be shared, our thoughts aligned and our consciousness united.",
    "May our intentions be harmonious, our hearts be one, and our minds move together so that we may all live and flourish."
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F7F1E5] text-[#8F6E5B] overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center relative">
        {/* Sacred Temple Architecture Line Drawing Watermark Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-25 z-0 flex items-center justify-center">
          <TempleArchitectureLine size={520} color="#705B4C" />
        </div>


        {/* Top Brand Label Centered */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-[2px] bg-[#B08A4A]" />
          <span className="font-dm text-xs uppercase tracking-[0.24em] text-[#8F6E5B]/80 font-bold">
            HOUSE OF SANATANA
          </span>
          <div className="w-8 h-[2px] bg-[#B08A4A]" />
        </div>

        {/* Sacred Rig Vedic Shloka Centered with High-Contrast Word Reveal */}
        <div className="font-sanskrit text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] font-semibold leading-[1.7] tracking-wide mb-8 text-center max-w-3xl">
          <div className="mb-2.5">
            <ScrollRevealSentence 
              text="संगच्छध्वं संवदध्वं सं वो मनांसि जानताम् ।"
              progress={smoothProgress}
              startRange={0.0}
              endRange={0.14}
              activeColor="#8F6E5B"
              dimColor="rgba(143, 110, 91, 0.10)"
            />
          </div>
          <div className="mb-2.5">
            <ScrollRevealSentence 
              text="समानो मन्त्रः समितिः समानी समानं मनः सह चित्तमेषाम् ।"
              progress={smoothProgress}
              startRange={0.14}
              endRange={0.28}
              activeColor="#8F6E5B"
              dimColor="rgba(143, 110, 91, 0.10)"
            />
          </div>
          <div>
            <ScrollRevealSentence 
              text="समानी व आकूतिः समाना हृदयानि वः । समानमस्तु वो मनो यथा वः सुसहासति ॥"
              progress={smoothProgress}
              startRange={0.28}
              endRange={0.42}
              activeColor="#8F6E5B"
              dimColor="rgba(143, 110, 91, 0.10)"
            />
          </div>
        </div>

        {/* Attribution Tag Centered */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-[1.5px] bg-[#B08A4A]" />
          <span className="font-dm text-xs uppercase tracking-[0.22em] text-[#B08A4A] font-bold">
            RIG VEDA 10.191
          </span>
          <div className="w-8 h-[1.5px] bg-[#B08A4A]" />
        </div>

        {/* English Translation with 1-Second Smooth Wavy Animation */}
        <WavyTextReveal 
          paragraphs={englishParagraphs}
          isTriggered={isShlokaComplete}
        />

        {/* Bottom 4 Pillars Centered with Dividers */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={isShlokaComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.88, duration: 0.55, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 transition-opacity duration-300"
        >
          {/* Pillar 1 */}
          <div className="flex items-center gap-2 pr-4 sm:border-r border-[#D9C6A8]/50">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#B08A4A]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3c-2.5 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2.5-6-5-10z" />
              <path d="M7 13c-2.5 0-4 1.5-4 3.5a4 4 0 0 0 7 2.5" />
              <path d="M17 13c2.5 0 4 1.5 4 3.5a4 4 0 0 1-7 2.5" />
            </svg>
            <span className="font-dm text-xs font-bold uppercase tracking-wider text-[#8F6E5B]">
              Togetherness
            </span>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-center gap-2 pr-4 sm:border-r border-[#D9C6A8]/50">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#B08A4A]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <span className="font-dm text-xs font-bold uppercase tracking-wider text-[#8F6E5B]">
              Open Dialogue
            </span>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-center gap-2 pr-4 sm:border-r border-[#D9C6A8]/50">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#B08A4A]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M7 20h10" />
              <path d="M10 20c0-4 2-7 5-8 0-4-3-7-7-7-2 4-1 8 2 15z" />
              <path d="M15 12c-2.5 0-5 2-5 4" />
            </svg>
            <span className="font-dm text-xs font-bold uppercase tracking-wider text-[#8F6E5B]">
              Shared Growth
            </span>
          </div>

          {/* Pillar 4 */}
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#B08A4A]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="12" cy="12" r="1.5" />
            </svg>
            <span className="font-dm text-xs font-bold uppercase tracking-wider text-[#8F6E5B]">
              A Brighter Tomorrow
            </span>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export const TheHouseSection: React.FC<TheHouseSectionProps> = ({ onOpenAbout }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [screen, setScreen] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isFit, setIsFit] = useState(false);

  // Track responsive screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setScreen('mobile');
      } else if (width <= 1180) {
        setScreen('tablet');
      } else {
        setScreen('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll tracking across pinning section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Snappy, unified spring progress for symmetrical forward and reverse scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // Responsive start sizes matching Framer scroll-zoom-reveal
  const startWidth = screen === 'mobile' ? '70vw' : screen === 'tablet' ? '32vw' : '24vw';
  const startHeight = screen === 'mobile' ? '10vh' : screen === 'tablet' ? '12vh' : '12vh';
  const targetWidth = '100vw';
  const targetHeight = '100vh';

  // Smooth transforms: Phase 1 (0 -> 0.32) expands the window swiftly to 100% full screen
  const widthTransform = useTransform(smoothProgress, [0, 0.32], [startWidth, targetWidth]);
  const heightTransform = useTransform(smoothProgress, [0, 0.32], [startHeight, targetHeight]);
  const borderRadius = useTransform(smoothProgress, [0, 0.32], [40, 0]);

  // Dynamic responsive push distance for flanking text as layout grows
  const pushDistance = screen === 'tablet' ? 33 : 37;
  const leftFlankX = useTransform(smoothProgress, [0, 0.28], ['0vw', `-${pushDistance}vw`]);
  const rightFlankX = useTransform(smoothProgress, [0, 0.28], ['0vw', `${pushDistance}vw`]);

  // Flanking left & right text fades out smoothly as layout expands
  const flankingOpacity = useTransform(smoothProgress, [0, 0.18, 0.28], [1, 0.8, 0]);
  const flankingScale = useTransform(smoothProgress, [0, 0.28], [1, 0.88]);

  // Stage visibility once screen fits
  const stageOpacity = useTransform(smoothProgress, [0.30, 0.35], [0, 1]);
  const stagePointerEvents = useTransform(smoothProgress, (v) => (v >= 0.30 ? 'auto' : 'none'));

  // Detect when full-screen is achieved to trigger fast, sequential block reveals
  useEffect(() => {
    let lastFit = false;
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const fit = latest >= 0.30;
      if (fit !== lastFit) {
        lastFit = fit;
        setIsFit(fit);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <div id="the-house" className="relative w-full bg-[#F7F1E5]">
      
      {/* ======================================================== */}
      {/* 0. PROMINENT SECTION HEADING (RIGHT ABOVE THE HOUSE)     */}
      <div className="relative w-full pt-20 pb-10 sm:pt-24 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-[#F7F1E5] text-[#8F6E5B] overflow-visible">
        {/* Background Sacred Patterns in Empty Margins - 100% Fully Visible & Uncropped */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:left-2 lg:left-8 xl:left-14 pointer-events-none opacity-55 hidden md:block z-0">
          <LotusLineArt size={280} color="#705B4C" className="-rotate-6" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C7833D]/12 border border-[#C7833D]/30 text-[#C7833D] text-xs font-dm font-bold tracking-widest uppercase mb-4 shadow-xs">
            <Sun className="w-3.5 h-3.5 text-[#C7833D]" />
            <span>॥ सनातन कुलम् ॥ &bull; ABOUT THE HOUSE</span>
          </div>

          {/* Main Section Heading */}
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#8F6E5B] tracking-tight leading-tight">
            The House: Story, Vision &amp; Mission
          </h2>

          {/* Subtitle & Narrative */}
          <p className="mt-4 font-dm text-sm sm:text-base md:text-lg text-[#8F6E5B]/85 leading-relaxed max-w-3xl mx-auto font-normal">
            A sacred sanctum founded to preserve pristine Vedic Agamic sanctity, empower devotee households across the world, and restore reverence to every holy ritual.
          </p>

          {/* Quick Header Action Links */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenAbout}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B08A4A] via-[#C7833D] to-[#B08A4A] hover:brightness-110 text-white font-dm font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_4px_15px_rgba(176,138,74,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Discover Full About Story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-dm font-medium text-[#66705A] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B08A4A]" />
              <span>Scroll down to enter the living sanctum</span>
            </span>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 0.5 SACRED RIG VEDA SHLOKA WITH FRAMER SCROLL REVEAL TEXT */}
      {/* ======================================================== */}
      <ShlokaScrollSection />

      {/* ======================================================== */}
      {/* 1. PINNING SCROLL-ZOOM LIVING SANCTUM CONTAINER          */}
      {/* ======================================================== */}
      <section
        ref={containerRef}
        className="relative w-full h-[200vh] bg-[#C7833D] text-[#F7F1E5] overflow-clip select-none"
        style={{
          background: 'linear-gradient(180deg, #C7833D 0%, #B87532 50%, #A46424 100%)'
        }}
      >
        {/* TOP SACRED TEMPLE CREST / ORGANIC GOLDEN BORDER */}
        <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none overflow-hidden leading-none -translate-y-[1px]">
          <svg
            viewBox="0 0 1440 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-14 sm:h-20 md:h-24 block preserve-3d"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L1440,0 L1440,32 C1200,85 960,15 720,68 C480,15 240,85 0,32 Z"
              fill="#F7F1E5"
            />
            <path
              d="M0,32 C240,85 480,15 720,68 C960,15 1200,85 1440,32"
              stroke="#B08A4A"
              strokeWidth="6"
              strokeOpacity="0.35"
              fill="none"
              filter="blur(4px)"
            />
            <path
              d="M0,32 C240,85 480,15 720,68 C960,15 1200,85 1440,32"
              stroke="#D9C6A8"
              strokeWidth="2.4"
              fill="none"
            />
          </svg>

          {/* Center Sacred Medallion Seal at top crest */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8C521B] via-[#C7833D] to-[#8C521B] border border-[#D9C6A8]/70 shadow-[0_4px_20px_rgba(0,0,0,0.35),0_0_15px_rgba(199,131,61,0.5)] flex items-center gap-2 text-[#F7F1E5]">
              <span className="font-sanskrit text-sm font-bold leading-none select-none text-[#F7F1E5]">ॐ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9C6A8] animate-pulse" />
              <span className="font-dm text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-white">
                ॥ सनातन कुलम् ॥
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Divine Golden Glow on Saffron Canvas */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(247, 241, 229, 0.22) 0%, transparent 60%), radial-gradient(circle at 50% 80%, rgba(176, 138, 74, 0.28) 0%, transparent 70%)'
          }}
        />

        {/* Subtle sacred Sri Yantra watermark */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] opacity-[0.08] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(circle, #F7F1E5 0%, transparent 70%)'
          }}
        />

        {/* STICKY FULL-VIEWPORT STAGE (Pinned during scroll) */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          
          {/* LEFT FLANKING TYPOGRAPHY */}
          <motion.div
            style={{ 
              right: `calc(50% + ${screen === 'tablet' ? '17vw' : '13.5vw'})`,
              x: leftFlankX,
              opacity: flankingOpacity, 
              scale: flankingScale 
            }}
            className="hidden md:flex flex-col items-end justify-center w-[200px] lg:w-[280px] pr-3 sm:pr-4 text-right shrink-0 pointer-events-none absolute top-1/2 -translate-y-1/2 z-10 will-change-transform"
          >
            <span className="font-sanskrit text-[#F7F1E5] text-xs tracking-widest block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-bold">
              ॥ सनातन कुलम् ॥
            </span>
            <h3 className="font-cormorant text-3xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] leading-none whitespace-nowrap">
              THE HOUSE
            </h3>
            <span className="text-[11px] font-dm tracking-[0.2em] uppercase text-[#D9C6A8] font-semibold mt-1 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              EST. BHARAT 2026
            </span>
          </motion.div>

          {/* CENTER ZOOM-REVEAL EXPANDING WINDOW (Soft Sage Layout) */}
          <motion.div
            style={{
              width: widthTransform,
              height: heightTransform,
              borderRadius: borderRadius,
            }}
            className="relative bg-[#66705A] overflow-hidden flex items-center justify-center shrink-0 z-20 group will-change-[width,height,border-radius] transform-gpu border-2 border-[#D9C6A8]/80 group-hover:border-[#F7F1E5] shadow-[0_0_50px_rgba(102,112,90,0.45),0_25px_60px_rgba(0,0,0,0.45)]"
          >
            {/* Soft Sage Sanctuary Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#66705A] via-[#5A6350] to-[#4D5544] pointer-events-none" />

            {/* Warm Divine Sand & Gold Aura Center */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
              style={{
                background: 'radial-gradient(circle at 50% 35%, rgba(217, 198, 168, 0.3) 0%, rgba(102, 112, 90, 0) 65%)'
              }}
            />

            {/* Soft natural edge shading */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.25) 100%)'
              }}
            />

            {/* ==================================================== */}
            {/* EXPANDED FULL-SCREEN STATE:                          */}
            {/* Original Framer Block Text Reveal Manifesto          */}
            {/* ==================================================== */}
            <motion.div
              style={{
                opacity: stageOpacity,
                pointerEvents: stagePointerEvents,
              }}
              className="relative z-20 w-full h-full p-6 sm:p-10 lg:p-14 flex flex-col justify-between overflow-y-auto"
            >
              {/* Top Bar: Sacred Badge & Lineage */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D9C6A8]/30 pb-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F1E5]/15 border border-[#D9C6A8]/50 text-[#F7F1E5] text-xs font-dm font-bold tracking-widest uppercase">
                  <Sun className="w-3.5 h-3.5 text-[#D9C6A8]" />
                  <span>॥ सनातन कुलम् ॥ &bull; THE LIVING SANCTUM</span>
                </div>

                <span className="text-xs font-dm text-[#D9C6A8] tracking-widest uppercase hidden sm:inline-block font-medium">
                  Preserving Vedic Agamic Authenticity
                </span>
              </div>

              {/* ======================================================== */}
              {/* CENTER: Majestic Block Text Reveal Manifesto             */}
              {/* Fast, fluid reveal sequence triggered when screen fits   */}
              {/* ======================================================== */}
              <div className="relative my-auto max-w-5xl mx-auto w-full text-center px-2 sm:px-6 py-6 sm:py-8">
                
                {/* Sacred Ornamental Pattern Center Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-20 sm:opacity-25 flex items-center justify-center">
                  <DividerOrnamental size={580} color="#D9C6A8" />
                </div>
                
                {/* Sanskrit Agamic Invocation Badge */}
                <div className="mb-3 sm:mb-5">
                  <BlockRevealLine
                    isTriggered={isFit}
                    delay={0.10}
                    blockColor="linear-gradient(90deg, #C7833D, #D9C6A8, #B08A4A)"
                    className="rounded-full"
                  >
                    <span className="font-sanskrit text-[#D9C6A8] font-bold text-sm sm:text-base md:text-lg tracking-[0.25em] px-3 py-1 drop-shadow-sm">
                      ॥ सनातन धर्मस्य शाश्वत सत्यम् ॥
                    </span>
                  </BlockRevealLine>
                </div>

                {/* Main Headline */}
                <div className="mb-5 sm:mb-7">
                  <BlockRevealLine
                    isTriggered={isFit}
                    delay={0.28}
                    blockColor="linear-gradient(90deg, #66705A, #D9C6A8, #C7833D)"
                  >
                    <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                      The Eternal Rhythm of Dharma
                    </h2>
                  </BlockRevealLine>
                </div>

                {/* Sequential Block Text Reveal Manifesto Lines */}
                <div className="font-cormorant text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white font-medium space-y-2 sm:space-y-3.5 leading-relaxed">
                  
                  {/* Line 1: Sanatana Dharma definition */}
                  <div>
                    <BlockRevealLine
                      isTriggered={isFit}
                      delay={0.48}
                      blockColor="linear-gradient(90deg, #B08A4A, #D9C6A8, #66705A)"
                    >
                      <span>
                        <strong className="text-[#D9C6A8] font-semibold">Sanatana Dharma</strong> is the timeless cosmic order—uncreated, self-sustaining, and eternal.
                      </span>
                    </BlockRevealLine>
                  </div>

                  {/* Line 2: The living sacred flame */}
                  <div>
                    <BlockRevealLine
                      isTriggered={isFit}
                      delay={0.68}
                      blockColor="linear-gradient(90deg, #C7833D, #F7F1E5, #B08A4A)"
                    >
                      <span>
                        A sacred way of existence honoring the divine pulse of life across creation.
                      </span>
                    </BlockRevealLine>
                  </div>

                  {/* Line 3: The House of Sanatan genesis */}
                  <div>
                    <BlockRevealLine
                      isTriggered={isFit}
                      delay={0.88}
                      blockColor="linear-gradient(90deg, #B08A4A, #D9C6A8, #C7833D)"
                    >
                      <span>
                        <strong className="text-[#D9C6A8] font-semibold">The House of Sanatan</strong> was consecrated to restore this pristine Vedic sanctity.
                      </span>
                    </BlockRevealLine>
                  </div>

                  {/* Line 4: Pure samagri & consecrations */}
                  <div>
                    <BlockRevealLine
                      isTriggered={isFit}
                      delay={1.08}
                      blockColor="linear-gradient(90deg, #66705A, #D9C6A8, #B08A4A)"
                    >
                      <span>
                        Reviving peetham-energized offerings, unadulterated samagri, and serene pilgrimages.
                      </span>
                    </BlockRevealLine>
                  </div>

                  {/* Line 5: Uncompromised modern bridge */}
                  <div>
                    <BlockRevealLine
                      isTriggered={isFit}
                      delay={1.28}
                      blockColor="linear-gradient(90deg, #C7833D, #D9C6A8, #66705A)"
                    >
                      <span className="text-[#F7F1E5]">
                        Preserving sacred Agamic authenticity without dilution for modern generations.
                      </span>
                    </BlockRevealLine>
                  </div>

                </div>
              </div>

              {/* ======================================================== */}
              {/* Bottom Bar: Action Trigger & Link to About Story         */}
              {/* ======================================================== */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isFit ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ delay: 1.48, duration: 0.35 }}
                className="pt-5 border-t border-[#D9C6A8]/30 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full"
              >
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-dm text-[#F7F1E5]/90 font-normal">
                  <Sparkles className="w-4 h-4 text-[#D9C6A8] shrink-0" />
                  <span>॥ धर्मो रक्षति रक्षितः ॥ &bull; Eternal Sanctum Lineage &amp; Vedic Heritage</span>
                </div>

                {/* LINK TO ABOUT BUTTON */}
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-[#B08A4A] via-[#C7833D] to-[#B08A4A] hover:from-[#C7833D] hover:to-[#B08A4A] text-[#F7F1E5] font-dm font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#D9C6A8]"
                >
                  <span>Discover Full Story &amp; About Us</span>
                  <ArrowRight className="w-4 h-4 text-[#F7F1E5]" />
                </button>
              </motion.div>

            </motion.div>
          </motion.div>

          {/* RIGHT FLANKING TYPOGRAPHY */}
          <motion.div
            style={{ 
              left: `calc(50% + ${screen === 'tablet' ? '17vw' : '13.5vw'})`,
              x: rightFlankX,
              opacity: flankingOpacity, 
              scale: flankingScale 
            }}
            className="hidden md:flex flex-col items-start justify-center w-[200px] lg:w-[280px] pl-3 sm:pl-4 text-left shrink-0 pointer-events-none absolute top-1/2 -translate-y-1/2 z-10 will-change-transform"
          >
            <span className="font-sanskrit text-[#F7F1E5] text-xs tracking-widest block mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] font-bold">
              ॥ दृष्टिः सङ्कल्पश्च ॥
            </span>
            <h3 className="font-cormorant text-3xl lg:text-5xl font-semibold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)] leading-none whitespace-nowrap">
              OUR SANCTUM
            </h3>
            <span className="text-[11px] font-dm tracking-[0.2em] uppercase text-[#D9C6A8] font-semibold mt-1 whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              VISION &bull; MISSION
            </span>
          </motion.div>

        </div>

        {/* BOTTOM SACRED TEMPLE CREST / ORGANIC GOLDEN BORDER */}
        <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none overflow-hidden leading-none translate-y-[1px]">
          <svg
            viewBox="0 0 1440 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-14 sm:h-20 md:h-24 block preserve-3d"
            preserveAspectRatio="none"
          >
            <path
              d="M0,96 L1440,96 L1440,64 C1200,11 960,81 720,28 C480,81 240,11 0,64 Z"
              fill="#F7F1E5"
            />
            <path
              d="M0,64 C240,11 480,81 720,28 C960,81 1200,11 1440,64"
              stroke="#B08A4A"
              strokeWidth="6"
              strokeOpacity="0.35"
              fill="none"
              filter="blur(4px)"
            />
            <path
              d="M0,64 C240,11 480,81 720,28 C960,81 1200,11 1440,64"
              stroke="#D9C6A8"
              strokeWidth="2.4"
              fill="none"
            />
          </svg>

          {/* Center Sacred Seal at bottom crest */}
          <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center justify-center pointer-events-auto">
            <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8C521B] via-[#C7833D] to-[#8C521B] border border-[#D9C6A8]/70 shadow-[0_4px_20px_rgba(0,0,0,0.35),0_0_15px_rgba(199,131,61,0.5)] flex items-center gap-2 text-[#F7F1E5]">
              <span className="font-sanskrit text-sm font-bold leading-none select-none text-[#F7F1E5]">ॐ</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9C6A8] animate-pulse" />
              <span className="font-dm text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-white">
                ॥ दृष्टिः सङ्कल्पश्च ॥
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
