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
    id: 'dev-1',
    name: 'Aarav Shastri',
    role: 'Vedic Scholar & Researcher',
    location: 'Varanasi',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=500&q=80',
    quote: 'The authenticity of their consecrated rituals is unmatched.'
  },
  {
    id: 'dev-2',
    name: 'Meera Deshmukh',
    role: 'Sadhika & Yoga Acharya',
    location: 'Pune',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    quote: 'Brought sacred peace and divine presence into our home.'
  },
  {
    id: 'dev-3',
    name: 'Dr. Rajeshwar Iyer',
    role: 'Ayurvedic Healer',
    location: 'Bengaluru',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
    quote: 'Pure herbs and authentic Vedic preparations that align prana.'
  },
  {
    id: 'dev-4',
    name: 'Vikramaditya Sen',
    role: 'Himalayan Yatri',
    location: 'Kolkata',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
    quote: 'Kedarnath yatra with HOS was a transcendent milestone.'
  },
  {
    id: 'dev-5',
    name: 'Ananya Sharma',
    role: 'Classical Temple Artist',
    location: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
    quote: 'Sacred craftsmanship preserved with timeless dignity.'
  },
  {
    id: 'dev-6',
    name: 'Devavrat Joshi',
    role: 'Temple Architect',
    location: 'Ahmedabad',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80',
    quote: 'Revitalizing sacred temple geometries for our future.'
  },
  {
    id: 'dev-7',
    name: 'Kavita Sundaram',
    role: 'Devotional Singer',
    location: 'Chennai',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
    quote: 'The chants resonate with pure divine frequencies.'
  },
  {
    id: 'dev-8',
    name: 'Siddharth Varma',
    role: 'Sadhaka & Tech Founder',
    location: 'Hyderabad',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
    quote: 'A bridge connecting ancient spiritual wisdom with modern life.'
  },
  {
    id: 'dev-9',
    name: 'Gaurav Kulkarni',
    role: 'Pooja Kit Co-Creator',
    location: 'Nashik',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80',
    quote: 'Working with traditional artisans to consecrate pure brass & herbs.'
  },
  {
    id: 'dev-10',
    name: 'Pooja Chawla',
    role: 'Pilgrim & Sadhika',
    location: 'Rishikesh',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80',
    quote: 'Every interaction carries the grace of Sanatana Dharma.'
  }
];

interface MediaHeroLoopSectionProps {
  onExploreClick?: () => void;
  isMenuOpen?: boolean;
}

export const MediaHeroLoopSection: React.FC<MediaHeroLoopSectionProps> = ({
  onExploreClick,
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
    <section className="relative w-full pt-4 sm:pt-6 md:pt-8 pb-10 sm:pb-14 overflow-hidden bg-[#FFF8E7] flex flex-col items-center justify-between min-h-[580px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[720px] max-h-[850px] select-none isolate">
      
      {/* ======================================================== */}
      {/* 1. TOP EDITORIAL HERO HEADER & CALL TO ACTION            */}
      {/*    (Positioned at top so both header & arc fit in frame) */}
      {/* ======================================================== */}
      <div className="relative z-20 max-w-3xl mx-auto text-center px-4 sm:px-6 mt-8 sm:mt-0">
        
        {/* Main Headline: Two-tone typography (Bold Black + Warm Taupe) */}
        <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-[#1A1612] leading-[1.14]">
          Trusted by seekers <br className="hidden sm:inline" />
          <span className="text-[#8F6E5B] font-light">from across sacred traditions</span>
        </h1>

        {/* Subtitle */}
        <p className="font-dm text-xs sm:text-sm text-[#8F6E5B] max-w-lg mx-auto mt-2 sm:mt-2.5 font-normal leading-relaxed">
          Discover why sadhakas, pilgrims, and families across the globe trust House of Sanatan for authentic Vedic rituals, consecrated archives, and divine journeys.
        </p>

        {/* Action Button: Sleek Black Pill with Arrow */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center">
          <button
            type="button"
            onClick={onExploreClick}
            className="group inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-full bg-[#1A1612] text-white hover:bg-[#C7833D] transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer text-xs sm:text-sm font-dm font-semibold"
          >
            <span>Read Sacred Stories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FFF8E7] via-[#FFF8E7]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FFF8E7] via-[#FFF8E7]/70 to-transparent z-10 pointer-events-none" />

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
              <div className="relative w-28 sm:w-36 md:w-42 lg:w-46 aspect-[4/4.8] rounded-2xl sm:rounded-3xl overflow-hidden bg-white border-2 border-white/95 shadow-[0_12px_28px_rgba(26,22,18,0.1)] hover:shadow-[0_20px_45px_rgba(199,131,61,0.22)] hover:border-[#B08A4A] transition-all duration-400 hover:scale-108 cursor-pointer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Amber Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5 sm:p-3.5 text-white">
                  <span className="font-dm text-[11px] sm:text-xs font-bold text-[#D9C6A8] leading-tight">
                    {item.name}
                  </span>
                  <span className="font-dm text-[9px] sm:text-[10px] text-white/80 line-clamp-1">
                    {item.role} &bull; {item.location}
                  </span>
                  <p className="font-dm text-[8px] sm:text-[9px] text-[#F7F1E5]/90 line-clamp-2 mt-0.5 italic">
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
