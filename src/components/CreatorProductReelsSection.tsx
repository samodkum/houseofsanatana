import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  ShoppingBag, 
  ArrowRight,
  Eye,
  Heart,
  Volume2,
  VolumeX,
  Check,
  Video,
  Gift,
  Award
} from 'lucide-react';

export interface CreatorProductReel {
  id: string;
  title: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  videoUrl: string;
  thumbnail: string;
  productName: string;
  price: string;
  originalPrice?: string;
  badge: string;
  views: string;
  likes: string;
}

export const CREATOR_PRODUCT_REELS: CreatorProductReel[] = [
  {
    id: 'prod-rudraksha',
    title: 'Testing Real vs Fake 5-Mukhi Rudraksha with Lab Certificate',
    creatorName: 'Karan Joshi',
    creatorHandle: '@sanatanaseva',
    creatorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    productName: 'Certified Nepalese 108 Rudraksha Mala',
    price: '₹3,499',
    originalPrice: '₹4,999',
    badge: 'Lab Certified',
    views: '440K',
    likes: '39.8K'
  },
  {
    id: 'prod-shivling',
    title: 'Unboxing the Sacred Ashta Dhatu Narmadeshwar Shivling Kit',
    creatorName: 'Priya Nambiar',
    creatorHandle: '@vedicliving',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80',
    productName: 'Ashta Dhatu Consecrated Shivling Kit',
    price: '₹4,299',
    originalPrice: '₹5,999',
    badge: 'Prana Pratishtha',
    views: '195K',
    likes: '16.7K'
  },
  {
    id: 'prod-dhoop',
    title: 'Evening Temple Fragrance at Home: Pure Sambrani Dhoop Cups',
    creatorName: 'Sneha Kulkarni',
    creatorHandle: '@puja_pavitra',
    creatorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    productName: 'Pure Guggul & Sambrani Charcoal Cups',
    price: '₹799',
    originalPrice: '₹1,199',
    badge: 'Natural Resins',
    views: '215K',
    likes: '18.2K'
  },
  {
    id: 'prod-thali',
    title: 'Heirloom Pure Brass Hand-Engraved Royal Puja Thali Review',
    creatorName: 'Arjun Bhatt',
    creatorHandle: '@dharma_crafts',
    creatorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80',
    productName: 'Pure Heavy Brass Royal Puja Thali',
    price: '₹2,899',
    originalPrice: '₹3,999',
    badge: 'Heritage Brass',
    views: '310K',
    likes: '27.4K'
  },
  {
    id: 'prod-chandan',
    title: 'Consecrated Vrindavan Chandan & Sacred Sandalwood Paste Review',
    creatorName: 'Radha Raman Das',
    creatorHandle: '@braj_fragrance',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=600&q=80',
    productName: 'Sacred Sandalwood & Kasturi Attar',
    price: '₹1,299',
    originalPrice: '₹1,799',
    badge: 'Consecrated Ittar',
    views: '360K',
    likes: '31.5K'
  },
  {
    id: 'prod-nataraja',
    title: 'Swamimalai Chola Bronze Nataraja: 1000-Year Casting Tradition',
    creatorName: 'Meenakshi Sundaram',
    creatorHandle: '@dakshin_art',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=600&q=80',
    productName: 'Swamimalai Lost-Wax Bronze Nataraja',
    price: '₹12,499',
    originalPrice: '₹16,999',
    badge: '5-Metal Bronze',
    views: '520K',
    likes: '48.9K'
  }
];

interface CreatorProductReelsSectionProps {
  onNavigateMall?: () => void;
  onNavigateJoin?: () => void;
}

export const CreatorProductReelsSection: React.FC<CreatorProductReelsSectionProps> = ({ 
  onNavigateMall,
  onNavigateJoin
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const totalReels = CREATOR_PRODUCT_REELS.length;
  const activeReel = CREATOR_PRODUCT_REELS[activeIndex];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Autoplay the active center video whenever activeIndex changes
  useEffect(() => {
    setIsPlaying(true);
    if (activeVideoRef.current) {
      activeVideoRef.current.currentTime = 0;
      activeVideoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  // Click-to-pause handler for active center video
  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeVideoRef.current) return;

    if (activeVideoRef.current.paused) {
      activeVideoRef.current.play().catch(() => {});
      setIsPlaying(true);
      triggerToast('Playing video reel');
    } else {
      activeVideoRef.current.pause();
      setIsPlaying(false);
      triggerToast('Paused video reel');
    }
  };

  // Sound toggle
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeVideoRef.current) return;
    const nextMuted = !isMuted;
    activeVideoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    triggerToast(nextMuted ? 'Muted' : 'Sound On');
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalReels) % totalReels);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalReels);
  };

  // Compute responsive layout dimensions with clear spacing between cards
  const stepX = windowWidth < 640 ? 150 : windowWidth < 1024 ? 220 : 285;
  const cardWidth = windowWidth < 640 ? 170 : windowWidth < 1024 ? 210 : 250;
  const cardHeight = windowWidth < 640 ? 290 : windowWidth < 1024 ? 360 : 425;

  // 3D Perspective & Tent Arch Transform Calculator (Apex in center, sloping & bending on sides)
  const getSlotTransform = (offset: number) => {
    switch (offset) {
      case -2:
        return {
          x: -stepX * 1.9,
          y: 28, // Slopes down like a tent leg
          z: -170,
          rotateY: 28, // Inward 3D tilt
          rotateZ: -4.5, // Physical outward bend
          scale: 0.82,
          opacity: windowWidth < 640 ? 0 : 0.75,
          zIndex: 10,
          pointerEvents: (windowWidth < 640 ? 'none' : 'auto') as 'none' | 'auto'
        };
      case -1:
        return {
          x: -stepX,
          y: 8, // Slopes down from apex
          z: -70,
          rotateY: 15, // Subtle inward 3D tilt
          rotateZ: -2, // Subtle tent bend
          scale: 0.91,
          opacity: 0.92,
          zIndex: 20,
          pointerEvents: 'auto' as 'none' | 'auto'
        };
      case 0:
        return {
          x: 0,
          y: -14, // Elevated apex of the tent arch!
          z: 40,
          rotateY: 0, // Upright peak
          rotateZ: 0,
          scale: 1.05,
          opacity: 1,
          zIndex: 30,
          pointerEvents: 'auto' as 'none' | 'auto'
        };
      case 1:
        return {
          x: stepX,
          y: 8, // Slopes down from apex
          z: -70,
          rotateY: -15, // Subtle inward 3D tilt
          rotateZ: 2, // Subtle tent bend
          scale: 0.91,
          opacity: 0.92,
          zIndex: 20,
          pointerEvents: 'auto' as 'none' | 'auto'
        };
      case 2:
        return {
          x: stepX * 1.9,
          y: 28, // Slopes down like a tent leg
          z: -170,
          rotateY: -28, // Inward 3D tilt
          rotateZ: 4.5, // Physical outward bend
          scale: 0.82,
          opacity: windowWidth < 640 ? 0 : 0.75,
          zIndex: 10,
          pointerEvents: (windowWidth < 640 ? 'none' : 'auto') as 'none' | 'auto'
        };
      default:
        return {
          x: offset > 0 ? stepX * 2.8 : -stepX * 2.8,
          y: 50,
          z: -300,
          rotateY: offset > 0 ? -35 : 35,
          rotateZ: offset > 0 ? 6 : -6,
          scale: 0.6,
          opacity: 0,
          zIndex: 0,
          pointerEvents: 'none' as const
        };
    }
  };

  return (
    <section className="relative w-full py-14 sm:py-20 lg:py-24 bg-[#FEFBF2] overflow-hidden select-none border-b border-[#C59239]/20">
      
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#FE7613]/8 via-[#C59239]/4 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* ======================================================== */}
        {/* 1. TOP HEADER ROW (Exact Reference Design Match)         */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          
          {/* Left: Large Modern Headline with Golden Script Accent */}
          <div className="max-w-2xl">
            <h2 className="font-cormorant text-4xl sm:text-5xl md:text-[54px] lg:text-[60px] font-normal text-[#221508] leading-[1.08] tracking-tight">
              Drive into
              <br />
              <span className="font-semibold text-[#0A4C83]">creativity with our</span>
              <br />
              <span className="font-script text-4xl sm:text-5xl md:text-[58px] text-[#FE7613] font-medium tracking-normal block mt-1">
                gallery collection
              </span>
            </h2>
          </div>

          {/* Right: Explanatory Paragraph and Action Buttons */}
          <div className="max-w-lg flex flex-col items-start lg:items-end text-left lg:text-left gap-4 sm:gap-5">
            <p className="font-dm text-xs sm:text-sm md:text-[14.5px] text-[#3D2619] leading-relaxed">
              Explore our curated creator unboxing reels, featuring consecrated sanctum essentials, lab-certified Nepalese Rudrakshas, and pure heritage brassware reviewed by partnered devotees.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {/* Creator CTA in Header */}
              <button
                type="button"
                onClick={() => {
                  if (onNavigateJoin) {
                    onNavigateJoin();
                  } else {
                    const el = document.getElementById('join-ecosystem-section') || document.getElementById('three-ways-to-join');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.location.hash = 'join#co-creator';
                  }
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FEFBF2] text-[#0A4C83] border border-[#C59239]/40 hover:border-[#0A4C83] text-xs sm:text-sm font-dm font-semibold shadow-xs hover:shadow-sm hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer group"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FE7613] group-hover:rotate-12 transition-transform" />
                <span>Be a Product Creator</span>
              </button>

              {/* Mall Explore Collection Button */}
              <button
                type="button"
                onClick={onNavigateMall}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FE7613] hover:bg-[#e0650d] text-white text-xs sm:text-sm font-dm font-bold shadow-[0_8px_20px_rgba(254,118,19,0.3)] hover:shadow-[0_12px_26px_rgba(254,118,19,0.4)] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 2. CENTER ACTIVE REEL TITLE & CREATOR HEADER             */}
        {/* ======================================================== */}
        <div className="text-center mb-6 min-h-[58px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReel.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col items-center"
            >
              <h3 className="font-cormorant text-2xl sm:text-3xl md:text-[32px] font-bold text-[#221508] tracking-tight leading-snug max-w-xl">
                {activeReel.productName}
              </h3>
              <p className="font-dm text-xs sm:text-sm text-[#3D2619] mt-1 flex items-center gap-2">
                <span className="font-medium text-[#221508]">{activeReel.creatorName}</span>
                <span>&bull;</span>
                <span className="text-[#FE7613] font-semibold">{activeReel.creatorHandle}</span>
                <span>&bull;</span>
                <span className="text-xs text-[#3D2619]/80">{activeReel.views} views</span>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* 3. 3D PERSPECTIVE CAROUSEL STAGE                         */}
        {/* ======================================================== */}
        <div 
          className="relative w-full h-[380px] sm:h-[450px] md:h-[510px] flex items-center justify-center overflow-visible"
          style={{ perspective: 1200, perspectiveOrigin: '50% 50%' }}
        >
          {CREATOR_PRODUCT_REELS.map((reel, index) => {
            // Calculate relative offset from activeIndex
            let offset = index - activeIndex;
            if (offset < -Math.floor(totalReels / 2)) offset += totalReels;
            if (offset > Math.floor(totalReels / 2)) offset -= totalReels;

            const slot = getSlotTransform(offset);
            const isCenter = offset === 0;

            return (
              <motion.div
                key={reel.id}
                initial={false}
                animate={{
                  x: slot.x,
                  y: slot.y,
                  z: slot.z,
                  rotateY: slot.rotateY,
                  rotateZ: slot.rotateZ,
                  scale: slot.scale,
                  opacity: slot.opacity
                }}
                transition={{
                  type: 'spring',
                  stiffness: 210,
                  damping: 22,
                  mass: 0.85
                }}
                style={{
                  position: 'absolute',
                  zIndex: slot.zIndex,
                  pointerEvents: slot.pointerEvents,
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  borderRadius: windowWidth < 640 ? '26px' : '32px',
                  overflow: 'hidden',
                  WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  maskImage: 'radial-gradient(white, black)',
                  isolation: 'isolate',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden'
                }}
                onClick={(e) => {
                  if (isCenter) {
                    togglePlayPause(e);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className={`rounded-[26px] sm:rounded-[32px] overflow-hidden bg-[#1A1612] shadow-[0_16px_40px_rgba(0,0,0,0.18)] cursor-pointer group select-none transition-shadow duration-300 ${
                  isCenter ? 'ring-2 ring-white/90 shadow-[0_25px_60px_rgba(31,27,43,0.28)]' : 'hover:shadow-2xl'
                }`}
                title={isCenter ? (isPlaying ? 'Click to pause reel' : 'Click to play reel') : `Switch to ${reel.productName}`}
              >
                <div 
                  className="w-full h-full relative overflow-hidden bg-[#1A1612]"
                  style={{
                    borderRadius: 'inherit',
                    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                    maskImage: 'radial-gradient(white, black)',
                    overflow: 'hidden',
                    isolation: 'isolate'
                  }}
                >
                  {/* Base Poster Image - ALWAYS present and clipped */}
                  <img
                    src={reel.thumbnail}
                    alt={reel.productName}
                    className="absolute inset-0 w-full h-full object-cover select-none"
                    style={{ borderRadius: 'inherit' }}
                    loading="lazy"
                  />

                  {/* Center Card autoplays video directly over poster */}
                  {isCenter && (
                    <video
                      ref={activeVideoRef}
                      src={reel.videoUrl}
                      poster={reel.thumbnail}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover select-none"
                      style={{
                        borderRadius: 'inherit',
                        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                        maskImage: 'radial-gradient(white, black)'
                      }}
                    />
                  )}

                  {/* Overlays for Center Active Card */}
                  {isCenter ? (
                    <>
                      {/* Top Controls Overlay */}
                      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                        <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-dm font-bold text-white border border-white/20 shadow-xs">
                          <span className="text-[#F0802B]">✦</span>
                          <span>{reel.badge}</span>
                        </div>

                        <div className="flex items-center gap-1.5 pointer-events-auto">
                          <button
                            type="button"
                            onClick={toggleMute}
                            className="w-7 h-7 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border border-white/20 shadow-xs"
                            title={isMuted ? 'Unmute' : 'Mute'}
                          >
                            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#F0802B]" />}
                          </button>

                          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-dm text-amber-200 border border-white/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Autoplay</span>
                          </div>
                        </div>
                      </div>

                      {/* Paused Overlay */}
                      {!isPlaying && (
                        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1.5px] flex flex-col items-center justify-center transition-all duration-300 pointer-events-none z-20">
                          <div className="w-12 h-12 rounded-full bg-white text-[#1F1B2B] flex items-center justify-center shadow-2xl mb-1.5 transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-0.5 text-[#F0802B]" />
                          </div>
                          <span className="text-[10px] font-dm font-bold text-white px-3 py-0.5 rounded-full bg-black/70 border border-white/20 shadow-sm">
                            Paused &bull; Click to play
                          </span>
                        </div>
                      )}

                      {/* Bottom Card Bar: Title & Direct Shop Action */}
                      <div className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-white">
                          <div className="min-w-0 pr-2">
                            <span className="text-[10px] font-dm text-amber-300 font-bold block truncate">
                              Featured Consecrated Item
                            </span>
                            <h4 className="font-cormorant text-base sm:text-lg font-bold leading-tight truncate">
                              {reel.productName}
                            </h4>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-dm text-xs sm:text-sm font-bold text-white block">
                              {reel.price}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onNavigateMall) onNavigateMall();
                          }}
                          className="w-full py-2 rounded-full bg-[#FE7613] hover:bg-[#e0650d] text-white text-[11px] font-dm font-bold uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Shop Consecrated Item</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    /* Overlays for Side Perspective Cards */
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent group-hover:via-transparent transition-colors" />

                      <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                        <span className="text-[9.5px] font-dm text-amber-300 font-bold block truncate">
                          {reel.badge}
                        </span>
                        <h5 className="font-cormorant text-sm font-bold line-clamp-1 leading-snug">
                          {reel.productName}
                        </h5>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 4. CIRCULAR NAVIGATION BUTTONS (Matching Reference)      */}
        {/* ======================================================== */}
        <div className="flex items-center justify-center gap-3 mt-8 sm:mt-10">
          {/* Previous Arrow Button (Outline Circle) */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-stone-300 bg-white/90 hover:bg-white text-stone-700 hover:text-black flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-95"
            aria-label="Previous Reel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Arrow Button (Solid Orange Circle) */}
          <button
            type="button"
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-[#FE7613] hover:bg-[#e0650d] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
            aria-label="Next Reel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* 5. ABOUT THE GALLERY STRIP (Matching Lower Reference)    */}
        {/* ======================================================== */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8 mt-14 sm:mt-18 pt-10 border-t border-[#C59239]/20 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-10">
          <div className="shrink-0">
            <h4 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#221508]">
              About the <span className="font-script text-3xl sm:text-4xl text-[#FE7613]">gallery</span>
            </h4>
          </div>

          <p className="font-dm text-xs sm:text-sm text-[#3D2619] max-w-2xl leading-relaxed">
            <strong className="text-[#221508] font-semibold">Welcome to House of Sanatan Media Hub.</strong> We showcase diverse creator collections, from timeless temple classics to contemporary Vedic crafts, connecting devotees and authentic artisans through transparent unboxings and sanctum reels. Experience the beauty and stories that Vedic art brings to life!
          </p>
        </div>

      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#221508] text-white px-5 py-2.5 rounded-full text-xs font-dm shadow-xl border border-[#C59239]/40 flex items-center gap-2 animate-fadeIn pointer-events-none">
          <Check className="w-3.5 h-3.5 text-[#E4B968]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </section>
  );
};
