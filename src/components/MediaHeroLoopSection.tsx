import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface DevoteeCardItem {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  quote: string;
}

const DEVOTEE_ITEMS: DevoteeCardItem[] = [
  {
    id: 'creator-1',
    name: 'Aarav Joshi',
    role: 'Vedic Yatra Vlogger',
    location: 'Varanasi',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=80',
    quote: 'Filmed the Kashi Moksha package reels—reached 400K+ pilgrims.'
  },
  {
    id: 'creator-2',
    name: 'Priya Nambiar',
    role: 'Himalayan Travel Creator',
    location: 'Dehradun',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    quote: 'HOS sponsored my Kedarnath helicopter expedition & Swiss camp stay.'
  },
  {
    id: 'creator-3',
    name: 'Mohit Sharma',
    role: 'Braj Parikrama Storyteller',
    location: 'Mathura',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    quote: 'Creating devotional reels with full logistic and VIP darshan backing.'
  },
  {
    id: 'creator-4',
    name: 'Ananya Sundaram',
    role: 'Temple Heritage Filmmaker',
    location: 'Madurai',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    quote: 'Covered the Rameshwaram 22-wells circuit with dedicated archaeologist guides.'
  },
  {
    id: 'creator-5',
    name: 'Karan Dave',
    role: 'Sacred Artifact Reviewer',
    location: 'Haridwar',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',
    quote: 'Testing authentic lab-tested Rudrakshas and copper yantras on camera.'
  },
  {
    id: 'creator-6',
    name: 'Radha Raman Das',
    role: 'Vedic Lifestyle Creator',
    location: 'Vrindavan',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    quote: 'Co-creating genuine consecrated content with transparent creator royalties.'
  },
  {
    id: 'creator-7',
    name: 'Meenakshi Iyer',
    role: 'Classical Chants & Aarti Creator',
    location: 'Chennai',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
    quote: 'Direct fair-trade collaboration celebrating ancient Vedic traditions.'
  },
  {
    id: 'creator-8',
    name: 'Vikramaditya Sen',
    role: 'Sacred Geography Explorer',
    location: 'Rishikesh',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
    quote: 'Documenting the sacred shrines of Bharat with full hospitality sponsorship.'
  },
  {
    id: 'creator-9',
    name: 'Gaurav Kulkarni',
    role: 'Artisan Guild Co-Creator',
    location: 'Nashik',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    quote: 'Showcasing the traditional metallurgy of our temple sculptors.'
  },
  {
    id: 'creator-10',
    name: 'Pooja Chawla',
    role: 'Devotional Reels Influencer',
    location: 'Delhi',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    quote: 'Empowering creators to share the profound beauty of Sanatana Dharma.'
  }
];

interface MediaHeroLoopSectionProps {
  onExploreClick?: () => void;
  onApplyClick?: () => void;
  isMenuOpen?: boolean;
}

export const MediaHeroLoopSection: React.FC<MediaHeroLoopSectionProps> = ({
  onExploreClick,
  onApplyClick,
  isMenuOpen = false
}) => {
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reqRef = useRef<number | null>(null);

  // Smooth 60fps continuous rotation in one direction along the semi-circle arc
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isMenuOpen) {
        if (!isHovered) {
          // Continuous smooth rotation in one direction (approx 360 deg in 28s)
          setRotation((prev) => (prev + (delta * 0.013)) % 360);
        } else {
          // Slow down slightly when user hovers to inspect
          setRotation((prev) => (prev + (delta * 0.003)) % 360);
        }
      }

      reqRef.current = requestAnimationFrame(animate);
    };

    reqRef.current = requestAnimationFrame(animate);

    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isHovered, isMenuOpen]);

  const total = DEVOTEE_ITEMS.length;

  return (
    <section className="relative w-full pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-14 overflow-hidden bg-[#FEFBF2] flex flex-col items-center justify-between min-h-[580px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[720px] max-h-[850px] select-none isolate">
      
      {/* ======================================================== */}
      {/* 1. TOP EDITORIAL HERO HEADER & CALL TO ACTION            */}
      {/*    (Positioned at top so both header & arc fit in frame) */}
      {/* ======================================================== */}
      <div className="relative z-20 max-w-3xl mx-auto text-center px-4 sm:px-6 mt-8 sm:mt-0">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/95 border border-[#C59239]/30 text-[#0A4C83] text-[11px] font-dm font-bold uppercase tracking-widest mb-3 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FE7613]" />
          <span>House of Sanatan &bull; Co-Creator Program</span>
        </div>

        {/* Main Headline: Two-tone typography (Deep Temple Ink + Wind Blue) */}
        <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-[#221508] leading-[1.14]">
          Created with devotion <br className="hidden sm:inline" />
          <span className="text-[#0A4C83] font-light">by our verified co-creators</span>
        </h1>

        {/* Subtitle */}
        <p className="font-dm text-xs sm:text-sm text-[#3D2619] max-w-lg mx-auto mt-2 sm:mt-2.5 font-normal leading-relaxed">
          Partner with House of Sanatan to document sacred yatra packages, unbox consecrated products, and inspire millions across Bharat with sponsored expeditions and creator royalties.
        </p>

        {/* Action Button: Dual Actions (Apply as Co-Creator & Watch Reels) */}
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onApplyClick || onExploreClick}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FE7613] to-[#FE7613] text-white hover:bg-[#e0650d] transition-all duration-300 shadow-[0_6px_20px_rgba(254,118,19,0.35)] hover:shadow-[0_10px_25px_rgba(254,118,19,0.45)] hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm font-dm font-bold"
          >
            <span>Apply to Co-Create</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onExploreClick}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#221508] hover:bg-[#FEFBF2] border border-[#C59239]/30 hover:border-[#C59239] shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer text-xs sm:text-sm font-dm font-semibold"
          >
            <span>Watch Creator Reels</span>
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* 2. SEMI-CIRCLE CONCAVE ARC LOOP ANIMATION (BELOW HEADER)  */}
      {/*    Images follow an elegant curved smile/arc in motion    */}
      {/* ======================================================== */}
      <div 
        className={`relative w-full max-w-[1240px] h-[270px] sm:h-[310px] md:h-[340px] lg:h-[360px] mx-auto mt-2 sm:mt-4 overflow-visible flex items-center justify-center transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft edge fade masks for seamless horizontal visual bleeding */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FEFBF2] via-[#FEFBF2]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FEFBF2] via-[#FEFBF2]/70 to-transparent z-10 pointer-events-none" />

        {/* Arc Track Elements */}
        {DEVOTEE_ITEMS.map((item, index) => {
          // Angle in radians
          const angleDeg = (rotation + (index * (360 / total))) % 360;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Compute 3D elliptical coordinates
          // sin(theta) determines X position (-1 to 1)
          // cos(theta) determines depth Z and Y curvature
          const xPercent = Math.sin(angleRad); // -1 (left) to +1 (right)
          const zDepth = Math.cos(angleRad);   // +1 (front) to -1 (back)

          // Only render the front arc (zDepth > -0.55) to form the clean semi-circle conveyor
          if (zDepth < -0.6) return null;

          // Semi-circle curved Y drop: center dips down gracefully, ends curve upwards
          // Parabolic curve: Y is highest in the middle (dips down) and lifts at sides
          const yDrop = Math.pow(xPercent, 2) * -45 + (1 - zDepth) * 20; // in pixels
          const scale = 0.82 + zDepth * 0.22; // 0.82 at sides/back to 1.04 at front center
          const opacity = Math.min(1, Math.max(0, (zDepth + 0.6) / 0.85));

          // Responsive X spread
          // Map xPercent (-1 to +1) to pixel offset
          const xOffset = xPercent * (typeof window !== 'undefined' && window.innerWidth < 640 ? 190 : window.innerWidth < 1024 ? 340 : 490);

          return (
            <motion.div
              key={item.id}
              className="absolute group"
              style={{
                transform: `translate3d(${xOffset}px, ${yDrop}px, 0) scale(${scale})`,
                zIndex: Math.round((zDepth + 1) * 5) + 1,
                opacity: opacity,
                transition: 'opacity 0.2s ease-out',
              }}
            >
              {/* Devotee Card */}
              <div className="relative w-28 sm:w-36 md:w-42 lg:w-46 aspect-[4/4.8] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-white/95 shadow-[0_12px_28px_rgba(34,21,8,0.08)] hover:shadow-[0_20px_45px_rgba(197,146,57,0.25)] hover:border-[#C59239] transition-all duration-400 hover:scale-108 cursor-pointer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Amber Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3.5 text-white">
                  <span className="font-dm text-[11px] sm:text-xs font-bold text-[#E4B968] leading-tight">
                    {item.name}
                  </span>
                  <span className="font-dm text-[9px] sm:text-[10px] text-white/80 line-clamp-1">
                    {item.role} &bull; {item.location}
                  </span>
                  <p className="font-dm text-[8px] sm:text-[9px] text-[#FEFBF2]/90 line-clamp-2 mt-0.5 italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
