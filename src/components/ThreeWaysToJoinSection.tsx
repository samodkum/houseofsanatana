import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass,
  Hammer,
  HeartHandshake
} from 'lucide-react';
import { DividerOrnamental } from './ui/SacredPatterns';

export interface JoinWay {
  id: string;
  serialNumber: string;
  sanskrit: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  highlights: string[];
  ctaText: string;
  ctaAction: 'community' | 'cocreate' | 'roles';
  image: string;
  accentColor: string;
  accentBorder: string;
  hoverGlow: string;
  icon: React.ReactNode;
}

export const JOIN_WAYS: JoinWay[] = [
  {
    id: 'family-hos',
    serialNumber: '01',
    sanskrit: '॥ कुल धर्म रक्षा ॥',
    title: 'Family HOS',
    subtitle: 'Nitya Devotion & Sacred Home Sanctum',
    badge: 'Daily Griha Dharma',
    description: 'Transform your daily home puja into an authentic spiritual sanctuary. Receive lab-pure consecrated samagri kits, astrological tithi muhurats, and step-by-step Vedic ritual guides tailored for your entire family.',
    highlights: [
      'Consecrated Nitya & Festival puja kits delivered to your doorstep',
      'Personalized monthly Griha Muhurat & Vrat Panchang calendar',
      'Direct WhatsApp access to temple acharyas for ritual guidance'
    ],
    ctaText: 'Join Family Circle',
    ctaAction: 'community',
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#B08A4A',
    accentBorder: '#D9C6A8',
    hoverGlow: 'rgba(176, 138, 74, 0.25)',
    icon: <HeartHandshake className="w-5 h-5" />
  },
  {
    id: 'roles',
    serialNumber: '02',
    sanskrit: '॥ सेवा अधिकार ॥',
    title: 'Roles',
    subtitle: 'Temple Ambassadors & Vedic Pilgrimage Scholars',
    badge: 'Dharma Leadership',
    description: 'Step forward to lead Bharat’s devotional renaissance. We are welcoming certified Vedic priests, Sanskrit scholars, luxury yatra coordinators, pilgrimage medics, and regional cultural ambassadors.',
    highlights: [
      'Lead VIP Himalayan & Dham yatras with full logistical support',
      'Honorarium & dakshina according with highest dharmic dignity',
      'Peetham-accredited training in Agamic rituals & pilgrim hospitality'
    ],
    ctaText: 'Explore Open Roles',
    ctaAction: 'roles',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#66705A',
    accentBorder: '#D9C6A8',
    hoverGlow: 'rgba(102, 112, 90, 0.25)',
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    id: 'social-revolution',
    serialNumber: '03',
    sanskrit: '॥ नव निर्माण क्रांति ॥',
    title: 'Social Revolution / Co-Creator',
    subtitle: 'Artisan Guilds, Research & Devotional Innovation',
    badge: 'Sacred Guild Co-Creation',
    description: 'Dharma is an eternal creative force. We partner directly with 5th-generation brass sculptors, organic samagri farmers, botanical perfumers, and Vedic researchers to revive authentic sacred heritage without middlemen.',
    highlights: [
      'Direct fair-trade guild contracts with guaranteed advance patronage',
      'Authenticity verification certificates bearing your artisan mark',
      'R&D co-grants for indigenous herbal incense & temple metallurgy'
    ],
    ctaText: 'Become a Co-Creator',
    ctaAction: 'cocreate',
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#C7833D',
    accentBorder: '#B08A4A',
    hoverGlow: 'rgba(199, 131, 61, 0.25)',
    icon: <Hammer className="w-5 h-5" />
  }
];

export const JOIN_SLIDES = JOIN_WAYS;
export type JoinSlide = JoinWay;

interface ThreeWaysToJoinSectionProps {
  onOpenCommunityModal: () => void;
  onOpenCoCreateModal: () => void;
  onNavigateJoin?: (way?: 'join-hos' | 'partnership' | 'co-creator') => void;
}

export const ThreeWaysToJoinSection: React.FC<ThreeWaysToJoinSectionProps> = ({
  onOpenCommunityModal,
  onOpenCoCreateModal,
  onNavigateJoin
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeWay = JOIN_WAYS[activeIdx];

  const handleAction = (action: JoinWay['ctaAction']) => {
    if (onNavigateJoin) {
      if (action === 'roles') {
        onNavigateJoin('partnership');
      } else if (action === 'cocreate') {
        onNavigateJoin('co-creator');
      } else {
        onNavigateJoin('join-hos');
      }
      return;
    }
    if (action === 'cocreate') {
      onOpenCoCreateModal();
    } else {
      onOpenCommunityModal();
    }
  };

  return (
    <section 
      id="three-ways-to-join"
      className="relative w-full py-20 sm:py-28 bg-[#F7F1E5] text-[#8F6E5B] overflow-hidden select-none"
    >
      {/* Subtle Sacred Geometry Texture Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8F6E5B 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Background Sacred Pattern in Empty Left Margin */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-6 lg:left-2 xl:left-8 pointer-events-none opacity-55 hidden md:block">
        <DividerOrnamental size={460} color="#705B4C" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER: BOLD EDITORIAL POSTER STYLE              */}
        {/* ======================================================== */}
        <div className="mb-14 sm:mb-18 text-center max-w-4xl mx-auto">
          {/* Eyebrow Inscription */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F6E5B]/10 border border-[#8F6E5B]/20 text-[#8F6E5B] text-xs font-dm font-bold tracking-widest uppercase mb-5 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#8F6E5B]" />
            <span>॥ सङ्घ शक्तिः कलौ युगे ॥ &bull; THE SANATANA SANCTUM</span>
          </div>

          {/* Main Giant Poster Typography */}
          <h2 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-semibold text-[#8F6E5B] tracking-tight leading-[0.92] uppercase">
            THREE WAYS TO JOIN
          </h2>
          <div className="mt-1 font-cormorant text-3xl sm:text-5xl md:text-6xl font-semibold text-[#8F6E5B] tracking-tight leading-[0.95] uppercase">
            HOUSE OF SANATAN
          </div>

          <p className="mt-5 font-dm text-sm sm:text-base text-[#8F6E5B]/80 font-normal leading-relaxed max-w-2xl mx-auto">
            Choose how you walk this sacred path—as a devoted family, a dharmic leader, or an artisanal co-creator restoring timeless Vedic heritage.
          </p>
        </div>

        {/* ======================================================== */}
        {/* STEP-FLOW COMPONENT (Interactive Two-Column UI)           */}
        {/* Inspired by Framer Step-Flow: interactive rows + visual */}
        {/* ======================================================== */}
        <div className="w-full max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ------------------------------------------------------ */}
          {/* LEFT COLUMN: STEP SELECTOR TEXTBOX LIST (5 Cols)       */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-6 flex flex-col justify-center gap-4 relative">
            {JOIN_WAYS.map((way, idx) => {
              const isActive = idx === activeIdx;

              return (
                <div
                  key={way.id}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`relative p-5 sm:p-7 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 z-10 bg-white border ${
                    isActive 
                      ? 'shadow-[0_12px_30px_rgba(34,21,8,0.08)] scale-[1.01]' 
                      : 'border-stone-200/80 hover:border-stone-400 hover:shadow-xs'
                  }`}
                  style={{
                    borderColor: isActive ? way.accentBorder : undefined
                  }}
                >
                  {/* Clean Side Accent Bar */}
                  {isActive && (
                    <motion.div 
                      layoutId="step-active-accent-bar"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-full"
                      style={{ backgroundColor: way.accentColor }}
                    />
                  )}

                  {/* Step Header: Serial Number & Sanskrit tag */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      {/* Icon Avatar Box */}
                      <div 
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: isActive ? way.accentColor : '#f5ede2',
                          color: isActive ? '#ffffff' : '#785b3a'
                        }}
                      >
                        {way.icon}
                      </div>

                      <span 
                        className={`font-dm font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors duration-300 ${
                          isActive ? 'text-[#8F6E5B]' : 'text-stone-500'
                        }`}
                      >
                        [{way.serialNumber}] {way.badge}
                      </span>
                    </div>

                    <span 
                      className={`font-sanskrit text-xs sm:text-sm font-bold transition-all duration-300 px-2.5 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-stone-100 text-[#C7833D]' 
                          : 'text-stone-400'
                      }`}
                    >
                      {way.sanskrit}
                    </span>
                  </div>

                  {/* Step Title (Giant typography with smooth color & scale shift) */}
                  <h3 
                    className={`font-cormorant text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight uppercase transition-all duration-300 ${
                      isActive ? 'translate-x-1' : 'text-stone-400 hover:text-stone-600'
                    }`}
                    style={{
                      color: isActive ? way.accentColor : undefined
                    }}
                  >
                    {way.title}
                  </h3>

                  {/* Subtitle */}
                  <p 
                    className={`font-cormorant text-sm sm:text-base font-medium mt-1 transition-colors duration-300 ${
                      isActive ? 'text-[#66705A]' : 'text-stone-400'
                    }`}
                  >
                    {way.subtitle}
                  </p>

                  {/* Collapsible Details on Hover/Active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 font-dm text-xs sm:text-[13px] text-[#8F6E5B]/85 leading-relaxed font-normal">
                          {way.description}
                        </p>

                        <div 
                          className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-dm font-bold uppercase tracking-wider transition-all duration-300 shadow-xs group/cta"
                          style={{
                            backgroundColor: way.accentColor,
                            color: '#ffffff'
                          }}
                        >
                          <span>{way.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ------------------------------------------------------ */}
          {/* RIGHT COLUMN: INTERACTIVE VISUAL SHOWCASE (6 Cols)     */}
          {/* Matching Framer's Rectangle 26 Showcase with Crossfade */}
          {/* ------------------------------------------------------ */}
          <div className="lg:col-span-6 flex justify-center">
            <div 
              className="relative w-full max-w-[500px] h-[520px] sm:h-[580px] rounded-3xl p-3 sm:p-4 border shadow-[0_25px_60px_rgba(0,0,0,0.18)] flex flex-col justify-between overflow-hidden transition-all duration-500 text-white"
              style={{
                backgroundColor: activeWay.accentColor,
                borderColor: 'rgba(255, 255, 255, 0.25)',
                boxShadow: `0 25px 60px ${activeWay.hoverGlow}`
              }}
            >
              
              {/* Subtle Sacred Overlay Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/20 pointer-events-none rounded-3xl" />

              {/* Main Showcase Image Frame */}
              <div className="relative w-full h-[60%] rounded-2xl overflow-hidden shadow-md border border-white/20 group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeWay.id}
                    src={activeWay.image}
                    alt={activeWay.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-center"
                  />
                </AnimatePresence>

                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                {/* Top Corner Pill Badge */}
                <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-dm font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md text-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#D9C6A8]" />
                  <span>WAY {activeWay.serialNumber} &bull; {activeWay.badge}</span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white">
                  <div>
                    <div className="font-sanskrit text-xs text-[#D9C6A8] font-bold">
                      {activeWay.sanskrit}
                    </div>
                    <div className="font-cormorant text-xl sm:text-2xl font-semibold leading-tight drop-shadow-md">
                      {activeWay.title}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Details & Action Button */}
              <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 relative z-10">
                {/* Highlights tags with frosted glass cards */}
                <div className="space-y-1.5 mb-3">
                  {activeWay.highlights.map((h, i) => (
                    <div 
                      key={i} 
                      className="flex items-start gap-2.5 text-[11px] sm:text-xs font-dm p-2 rounded-xl bg-black/20 backdrop-blur-xs border border-white/15"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#D9C6A8]" />
                      <span className="font-medium text-white/95 leading-tight">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Button */}
                <button
                  type="button"
                  onClick={() => handleAction(activeWay.ctaAction)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#F7F1E5] hover:bg-white text-[#8F6E5B] font-dm font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer border border-white/40 group"
                >
                  {activeWay.ctaAction === 'cocreate' ? (
                    <Hammer className="w-4 h-4 text-[#C7833D]" />
                  ) : activeWay.ctaAction === 'roles' ? (
                    <Briefcase className="w-4 h-4 text-[#66705A]" />
                  ) : (
                    <HeartHandshake className="w-4 h-4 text-[#B08A4A]" />
                  )}
                  <span>{activeWay.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
