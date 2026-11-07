import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
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
    sanskrit: '॥ सनातन कुलम् ॥',
    title: 'HOS Family',
    subtitle: 'Belong. Explore. Experience.',
    badge: 'Belong & Experience',
    description: 'Become part of a global family where Sanatana Dharma is not just followed, but understood, celebrated and lived. Unlock a world of sacred experiences, curated journeys, meaningful products, cultural knowledge, exclusive updates, events and community initiatives. Discover your traditions, deepen your connection and grow with a House that brings heritage into everyday life.',
    highlights: [
      'Sacred experiences, curated journeys & meaningful offerings',
      'Living cultural knowledge, exclusive events & community initiatives',
      'Deepen your connection with heritage in daily life'
    ],
    ctaText: 'Join the HOS Family',
    ctaAction: 'community',
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#C59239',
    accentBorder: '#E4B968',
    hoverGlow: 'rgba(197, 146, 57, 0.25)',
    icon: <HeartHandshake className="w-5 h-5" />
  },
  {
    id: 'roles',
    serialNumber: '02',
    sanskrit: '॥ सहभागिता सङ्कल्प ॥',
    title: 'Roles & Partnerships',
    subtitle: 'Collaborate. Build. Grow.',
    badge: 'Collaborate & Build',
    description: 'Be more than a participant — become part of what we are building. From careers and professional opportunities to corporate partnerships, business collaborations, bulk gifting, strategic investments and volunteering, House of Sanatana opens its doors to individuals and organisations ready to contribute. Bring your skills, ideas or resources and help shape a global ecosystem where purpose meets opportunity.',
    highlights: [
      'Careers, professional opportunities & leadership avenues',
      'Corporate partnerships, business collaborations & bulk gifting',
      'Strategic investments & volunteering where purpose meets opportunity'
    ],
    ctaText: 'Build With HOS',
    ctaAction: 'roles',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#0A4C83',
    accentBorder: '#3DB3E4',
    hoverGlow: 'rgba(10, 76, 131, 0.25)',
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    id: 'social-revolution',
    serialNumber: '03',
    sanskrit: '॥ नव निर्माण क्रान्ति ॥',
    title: 'Social Revolution / Co-Creator',
    subtitle: 'Create. Influence. Earn.',
    badge: 'Create & Earn',
    description: 'Your creativity has the power to carry a civilisation forward. Join a global network of creators, storytellers and changemakers bringing Sanatana Dharma to a new generation through digital campaigns, creative challenges and cultural storytelling. Get opportunities to showcase your talent, collaborate with House of Sanatana, earn through approved paid campaigns and grow towards long-term creative partnerships.',
    highlights: [
      'Digital campaigns, creative challenges & cultural storytelling',
      'Showcase your talent with direct House of Sanatana collaboration',
      'Earn through approved paid campaigns & long-term partnerships'
    ],
    ctaText: 'Become a Co-Creator',
    ctaAction: 'cocreate',
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=1200&q=80',
    accentColor: '#FE7613',
    accentBorder: '#FEAD71',
    hoverGlow: 'rgba(254, 118, 19, 0.25)',
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
      className="relative w-full py-20 sm:py-28 bg-[#FEFBF2] text-[#221508] overflow-hidden select-none"
    >
      {/* Sacred Temple Art Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://cdn.shopify.com/s/files/1/0794/4516/4163/files/ccf19b7b-af54-4b37-910d-63c955ed1375.png?v=1794025063"
          alt=""
          className="w-full h-full object-cover object-center scale-[1.01] brightness-[1.02] contrast-[1.03] saturate-[1.12]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(254,251,242,0.7) 0%, rgba(254,251,242,0.15) 20%, rgba(254,251,242,0.15) 80%, rgba(254,251,242,0.78) 100%)',
          }}
        />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,155,65,0.14) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Subtle Sacred Geometry Texture Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #C59239 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Background Sacred Pattern in Empty Left Margin */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-6 lg:left-2 xl:left-8 pointer-events-none opacity-45 hidden md:block">
        <DividerOrnamental size={460} color="#C59239" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* SECTION HEADER: BOLD EDITORIAL POSTER STYLE              */}
        {/* ======================================================== */}
        <div className="mb-14 sm:mb-18 text-center max-w-4xl mx-auto">
          {/* Main Giant Poster Typography */}
          <h2 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-semibold text-[#221508] tracking-tight leading-[0.92] uppercase">
            THREE WAYS TO JOIN
          </h2>
          <div className="mt-1 font-cormorant text-3xl sm:text-5xl md:text-6xl font-semibold text-[#221508] tracking-tight leading-[0.95] uppercase">
            HOUSE OF SANATANA
          </div>

          <p className="mt-4 sm:mt-5 font-cormorant text-xl sm:text-2xl md:text-3xl text-[#98555E] font-medium tracking-tight">
            Three Pathways. One House. Endless Possibilities.
          </p>

          <p className="mt-2 font-dm text-xs sm:text-sm text-[#3D2619] font-normal leading-relaxed max-w-2xl mx-auto">
            Belong to a living family, build through professional partnerships, or co-create the digital and cultural future of Sanatana Dharma.
          </p>
        </div>

        {/* ======================================================== */}
        {/* MOBILE ONLY: EXPANDING CYLINDRICAL / SQUARE ACCORDION    */}
        {/* 3 layouts in a line: 1 full square card + 2 thin         */}
        {/* cylindrical pills that expand to square on tap.          */}
        {/* ======================================================== */}
        <div className="lg:hidden w-full max-w-[500px] mx-auto flex flex-row gap-2 sm:gap-3 h-[320px] xs:h-[340px] sm:h-[360px] items-stretch">
          {JOIN_WAYS.map((way, idx) => {
            const isActive = idx === activeIdx;

            return (
              <motion.div
                key={way.id}
                layout
                onClick={() => setActiveIdx(idx)}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 26,
                  mass: 0.8
                }}
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 select-none ${
                  isActive 
                    ? 'flex-[3.5] xs:flex-[3.8] rounded-3xl shadow-[0_16px_36px_rgba(0,0,0,0.2)]' 
                    : 'flex-[0.75] xs:flex-[0.8] rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.1)] hover:opacity-95'
                }`}
                style={{
                  backgroundColor: way.accentColor,
                  border: `1.5px solid ${isActive ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.2)'}`,
                }}
              >
                {/* INACTIVE CYLINDRICAL STATE */}
                {!isActive && (
                  <div className="w-full h-full flex flex-col items-center justify-between py-5 px-1 text-white">
                    {/* Top Serial Number Pill */}
                    <div className="w-7 h-7 rounded-full bg-black/25 backdrop-blur-xs border border-white/20 flex items-center justify-center font-dm font-bold text-[11px] text-[#FEFBF2]">
                      {way.serialNumber}
                    </div>

                    {/* Middle Vertical Text Label */}
                    <div className="flex-1 flex items-center justify-center my-3 overflow-hidden">
                      <span className="font-cormorant font-bold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap -rotate-90 text-[#FEFBF2] drop-shadow-xs">
                        {way.title.split('/')[0].trim()}
                      </span>
                    </div>

                    {/* Bottom Icon */}
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                      {way.icon}
                    </div>
                  </div>
                )}

                {/* ACTIVE FULL SQUARE STATE (RICH CONTEXT SQUARE) */}
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full flex flex-col justify-between p-4 sm:p-5 relative text-white"
                  >
                    {/* Background Subtle Gradient & Glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/35 pointer-events-none" />

                    {/* Top Header Badge & Sanskrit */}
                    <div className="flex items-center justify-between gap-1.5 z-10">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/25 backdrop-blur-xs border border-white/20 text-[9.5px] font-dm font-bold text-[#FEFBF2] uppercase tracking-wider">
                        <span>[{way.serialNumber}]</span>
                        <span className="line-clamp-1">{way.badge}</span>
                      </div>
                      <span className="font-sanskrit text-[10.5px] font-bold text-[#E4B968] shrink-0">
                        {way.sanskrit}
                      </span>
                    </div>

                    {/* Middle Core Content: Title, Subtitle & Context Description */}
                    <div className="my-auto space-y-1.5 z-10">
                      <div>
                        <h3 className="font-cormorant text-xl xs:text-2xl font-semibold leading-tight text-[#FEFBF2] uppercase">
                          {way.title}
                        </h3>
                        <p className="font-cormorant text-xs text-[#E4B968] font-medium leading-tight">
                          {way.subtitle}
                        </p>
                      </div>

                      {/* Informative Context Description */}
                      <p className="font-dm text-[11px] text-white/95 leading-relaxed font-medium line-clamp-3">
                        {way.description}
                      </p>

                      {/* Primary highlight bullet */}
                      <div className="pt-0.5 flex items-start gap-1.5 text-[10px] font-dm text-[#FEFBF2]/95 leading-tight">
                        <CheckCircle2 className="w-3 h-3 text-[#E4B968] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{way.highlights[0]}</span>
                      </div>
                    </div>

                    {/* Bottom CTA Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(way.ctaAction);
                      }}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-[#FEFBF2] text-[#221508] font-dm font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform z-10 shrink-0 cursor-pointer"
                    >
                      <span>{way.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* DESKTOP ONLY: STEP-FLOW TWO-COLUMN UI                     */}
        {/* Inspired by Framer Step-Flow: interactive rows + visual */}
        {/* ======================================================== */}
        <div className="hidden lg:grid w-full max-w-[1100px] mx-auto grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ------------------------------------------------------ */}
          {/* LEFT COLUMN: STEP SELECTOR TEXTBOX LIST (6 Cols)       */}
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
                          isActive ? 'text-[#221508]' : 'text-stone-500'
                        }`}
                      >
                        [{way.serialNumber}] {way.badge}
                      </span>
                    </div>

                    <span 
                      className={`font-sanskrit text-xs sm:text-sm font-bold transition-all duration-300 px-2.5 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-amber-50 text-[#C59239]' 
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
                      isActive ? 'text-[#3D2619]' : 'text-stone-400'
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
                        <p className="mt-3 font-dm text-xs sm:text-[13px] text-[#221508] leading-relaxed font-medium">
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
                  <Sparkles className="w-3.5 h-3.5 text-[#E4B968]" />
                  <span>WAY {activeWay.serialNumber} &bull; {activeWay.badge}</span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white">
                  <div>
                    <div className="font-sanskrit text-xs text-[#E4B968] font-bold">
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
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#E4B968]" />
                      <span className="font-medium text-white/95 leading-tight">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Button */}
                <button
                  type="button"
                  onClick={() => handleAction(activeWay.ctaAction)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#FEFBF2] hover:bg-white text-[#221508] font-dm font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer border border-white/40 group"
                >
                  {activeWay.ctaAction === 'cocreate' ? (
                    <Hammer className="w-4 h-4 text-[#FE7613]" />
                  ) : activeWay.ctaAction === 'roles' ? (
                    <Briefcase className="w-4 h-4 text-[#0A4C83]" />
                  ) : (
                    <HeartHandshake className="w-4 h-4 text-[#C59239]" />
                  )}
                  <span>{activeWay.ctaText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Banner: One House. A World of Opportunity */}
        <div className="mt-14 sm:mt-16 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-6 py-2.5 rounded-full bg-[#FEFBF2] border border-[#C59239]/35 shadow-xs">
            <span className="font-sanskrit text-xs text-[#C59239] font-bold">॥ एकं कुलम् ॥</span>
            <span className="text-[11px] sm:text-xs font-dm font-bold uppercase tracking-[0.22em] text-[#221508]">
              ONE HOUSE. A WORLD OF OPPORTUNITY.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
