import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Compass, Package, Users, Hammer, ArrowRight, Sparkles } from 'lucide-react';

interface FourGatewaysSectionProps {
  onSelectStore: () => void;
  onSelectTravel: () => void;
  onSelectJoin: () => void;
  onSelectCoCreate: () => void;
}

interface GatewayCardData {
  id: string;
  step: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  accentColor: string;
  icon: React.ReactNode;
  image: string;
  actionLabel: string;
  action: () => void;
  restingRotate: number;
  restingY: number;
}

export const FourGatewaysSection: React.FC<FourGatewaysSectionProps> = ({
  onSelectStore,
  onSelectTravel,
  onSelectJoin,
  onSelectCoCreate,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [poppedCardId, setPoppedCardId] = useState<string | null>(null);

  const gateways: GatewayCardData[] = [
    {
      id: 'travel',
      step: 'Gateway #01',
      category: 'HOLY PILGRIMAGES',
      title: 'Travel',
      subtitle: 'Sacred Yatras & Expeditions',
      description:
        'Bespoke spiritual odysseys to Kashi, Kedarnath, Char Dham & Kailash. Includes VIP sanctum darshans, private helicopter shuttles, and guided Vedic scholars.',
      bgColor: '#66705A',
      accentColor: '#D9C6A8',
      icon: <Compass className="w-4 h-4 text-emerald-300" />,
      image:
        'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
      actionLabel: 'Explore Yatras',
      action: onSelectTravel,
      restingRotate: -3.8,
      restingY: 8,
    },
    {
      id: 'mall',
      step: 'Gateway #02',
      category: 'VEDIC TREASURES',
      title: 'Santana Mall',
      subtitle: 'Consecrated Temple Emporium',
      description:
        'Pure, lab-certified Vedic samagri, hand-cast Moradabad brass murtis, zero-residue Bhimseni camphor, and temple-consecrated ceremonial boxes.',
      bgColor: '#C7833D',
      accentColor: '#F7F1E5',
      icon: <Package className="w-4 h-4 text-amber-200" />,
      image:
        'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
      actionLabel: 'Enter Santana Mall',
      action: onSelectStore,
      restingRotate: 1.8,
      restingY: -6,
    },
    {
      id: 'join',
      step: 'Gateway #03',
      category: 'GLOBAL FRATERNITY',
      title: 'Join',
      subtitle: 'Vedic Sangha & Satsang',
      description:
        'Unite with a global fraternity of seekers. Attend daily sunrise Brahma Muhurta meditations, exclusive live temple darshans, and youth dharmic forums.',
      bgColor: '#B08A4A',
      accentColor: '#F7F1E5',
      icon: <Users className="w-4 h-4 text-amber-200" />,
      image:
        'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
      actionLabel: 'Join Sacred Sangha',
      action: onSelectJoin,
      restingRotate: -1.8,
      restingY: 6,
    },
    {
      id: 'co-create',
      step: 'Gateway #04',
      category: 'SACRED SYNERGY',
      title: 'Co-Create',
      subtitle: 'Artisans & Scholars Guild',
      description:
        'Empowering traditional shilpis, Sanskrit grammarians, sacred musicians, and temple architects to revive eternal crafts and build consecrated spaces together.',
      bgColor: '#8F6E5B',
      accentColor: '#D9C6A8',
      icon: <Hammer className="w-4 h-4 text-amber-200" />,
      image:
        'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      actionLabel: 'Partner & Create',
      action: onSelectCoCreate,
      restingRotate: 3.8,
      restingY: -3,
    },
  ];

  return (
    <section id="gateways" className="relative w-full bg-[#F7F1E5] py-20 lg:py-28 overflow-hidden select-none">
      {/* Ambient background sanctuary glows with GPU transform isolation */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[#D9C6A8]/20 rounded-full blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[400px] bg-[#C7833D]/12 rounded-full blur-[120px] pointer-events-none transform-gpu" />
      <div className="absolute top-10 right-10 w-[450px] h-[400px] bg-[#66705A]/12 rounded-full blur-[120px] pointer-events-none transform-gpu" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ======================================================== */}
        {/* SECTION HEADER: Swiss Editorial Headline & Subtitle     */}
        {/* ======================================================== */}
        <div className="w-full max-w-5xl mx-auto mb-10 sm:mb-14 select-none text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 border border-[#8F6E5B]/25 text-[#8F6E5B] text-xs font-dm font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C7833D]" />
              <span>॥ चतुर्द्वारम् ॥ FOUR SACRED GATEWAYS</span>
            </span>
          </div>

          {/* 2-Line Headline with Snappy Word Reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.02 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.04, delayChildren: 0 },
              },
            }}
            className="font-cormorant font-semibold text-[#8F6E5B] text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.05] tracking-tight whitespace-nowrap mb-4"
          >
            {/* Line 1: The breadth of [the house] */}
            <div className="flex items-center flex-nowrap gap-x-2 sm:gap-x-3.5">
              {['The', 'breadth', 'of'].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="inline-block text-[#8F6E5B] cursor-default"
                >
                  {word}
                </motion.span>
              ))}

              {/* Pill 1: Saffron Filled Capsule */}
              <motion.span
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 14 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="relative inline-flex items-center px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#C7833D] via-[#B08A4A] to-[#C7833D] text-[#F7F1E5] shadow-[0_4px_16px_rgba(199,131,61,0.32)] overflow-hidden select-none text-[0.82em] font-dm font-bold tracking-tight shrink-0"
              >
                <span className="relative z-10 drop-shadow-xs">the house</span>
                <motion.span
                  className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-22deg] pointer-events-none"
                  animate={{ x: ['-160%', '320%'] }}
                  transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', repeatDelay: 1.6 }}
                />
              </motion.span>
            </div>

            {/* Line 2: four gateways [into dharma.] */}
            <div className="mt-1 sm:mt-2 flex items-center flex-nowrap gap-x-2 sm:gap-x-3.5">
              {['four', 'gateways'].map((word, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="inline-block text-[#8F6E5B] cursor-default"
                >
                  {word}
                </motion.span>
              ))}

              {/* Pill 2: Soft Sage Olive Capsule */}
              <motion.span
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 14 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="inline-flex items-center px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-full border-2 sm:border-[2.5px] border-[#66705A] text-[#66705A] hover:bg-[#66705A] hover:text-[#F7F1E5] transition-all duration-300 select-none text-[0.82em] font-dm font-bold tracking-tight shrink-0"
              >
                into dharma.
              </motion.span>
            </div>
          </motion.div>

          <p className="font-dm text-sm sm:text-base text-[#8F6E5B]/85 max-w-2xl leading-relaxed">
            Hover over each consecrated card to reveal the living dimensions of timeless Sanatana Dharma.
          </p>
        </div>

        {/* ======================================================== */}
        {/* DESKTOP EXPERIENCE (lg+): Instantaneous 60fps Card Deck  */}
        {/* Hardware-accelerated transforms, zero layout lag         */}
        {/* ======================================================== */}
        <div
          className="hidden lg:flex items-center justify-center -space-x-4 xl:-space-x-6 py-10 px-2 min-h-[600px]"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {gateways.map((card, idx) => {
            const isHovered = hoveredIdx === idx;
            const isAnyHovered = hoveredIdx !== null;

            // Elevated z-index on hovered card
            let zIndex = idx + 1;
            if (isHovered) {
              zIndex = 50;
            } else if (isAnyHovered) {
              zIndex = idx;
            }

            return (
              <motion.div
                key={card.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onClick={card.action}
                animate={{
                  y: isHovered ? -32 : isAnyHovered ? card.restingY + 3 : card.restingY,
                  rotate: isHovered ? 0 : isAnyHovered ? card.restingRotate * 1.15 : card.restingRotate,
                  scale: isHovered ? 1.06 : isAnyHovered ? 0.97 : 1,
                  opacity: isAnyHovered && !isHovered ? 0.88 : 1,
                }}
                transition={{
                  duration: 0.22,
                  ease: [0.2, 0.9, 0.3, 1],
                }}
                style={{
                  zIndex,
                  backgroundColor: card.bgColor,
                  transformOrigin: 'bottom center',
                  transform: 'translateZ(0)',
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                }}
                className={`relative w-[285px] xl:w-[315px] h-[520px] rounded-[30px] p-6 flex flex-col justify-between text-white cursor-pointer select-none border-2 border-black/25 overflow-hidden transition-shadow duration-200 group ${
                  isHovered
                    ? 'shadow-[0_35px_75px_-12px_rgba(0,0,0,0.55),0_16px_32px_-10px_rgba(0,0,0,0.3)]'
                    : 'shadow-[0_16px_36px_-8px_rgba(0,0,0,0.25)]'
                }`}
              >
                {/* Subtle inner parchment texture / ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25 pointer-events-none" />

                {/* 1. TOP BAR: Gateway Step Tag & Category Badge */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="font-dm text-xs font-extrabold tracking-wider text-amber-200 bg-black/35 px-3 py-1 rounded-full border border-white/20 backdrop-blur-md">
                    {card.step}
                  </span>

                  <span className="inline-flex items-center gap-1.5 text-[10px] font-dm font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-white/95 backdrop-blur-md">
                    {card.icon}
                    <span className="truncate max-w-[110px]">{card.category}</span>
                  </span>
                </div>

                {/* 2. CENTER IMAGE SHOWCASE BOX */}
                <div className="relative z-10 my-auto w-full h-[200px] rounded-2xl overflow-hidden border border-white/20 shadow-md bg-black/30">
                  <img
                    src={card.image}
                    alt={card.title}
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Atmospheric vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />
                </div>

                {/* 3. CARD CONTENT: Title, Subtitle, Description */}
                <div className="relative z-10 space-y-1.5 mb-2">
                  <h3 className="font-cormorant text-3xl xl:text-4xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">
                    {card.title}
                  </h3>

                  <p className="font-dm text-[11px] font-semibold text-amber-200/90 uppercase tracking-wider">
                    {card.subtitle}
                  </p>

                  <p className="font-dm text-xs text-white/85 leading-relaxed line-clamp-3">
                    {card.description}
                  </p>
                </div>

                {/* 4. BOTTOM ACTION CTA BUTTON */}
                <div className="relative z-10 pt-2 border-t border-white/15">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      card.action();
                    }}
                    className="w-full group/btn inline-flex items-center justify-between px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-dm font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-4 h-4 text-stone-950 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* MOBILE & TABLET EXPERIENCE (< lg): 2x2 Flip Card Grid    */}
        {/* No images, 2 rows of 2 cards with 3D scroll flip         */}
        {/* ======================================================== */}
        <div 
          className="grid grid-cols-2 gap-3 sm:gap-4.5 pt-2 pb-6 lg:hidden"
          style={{ perspective: '1200px' }}
        >
          {gateways.map((card, idx) => {
            // Flip direction: Left column opens from left, right column opens from right
            const initialRotate = idx % 2 === 0 ? -60 : 60;
            const isPopped = poppedCardId === card.id;
            const rowIndex = Math.floor(idx / 2);
            const colIndex = idx % 2;

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, rotateY: initialRotate, scale: 0.94 }}
                whileInView={{ opacity: 1, rotateY: 0, scale: isPopped ? 1.05 : 1 }}
                viewport={{ once: false, amount: 0, margin: '140px 0px 140px 0px' }}
                animate={{
                  scale: isPopped ? 1.05 : 1,
                  zIndex: isPopped ? 25 : 1,
                }}
                transition={{
                  duration: 0.32,
                  delay: rowIndex * 0.05 + colIndex * 0.02,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setPoppedCardId((prev) => (prev === card.id ? null : card.id));
                }}
                style={{ 
                  backgroundColor: card.bgColor,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  willChange: 'transform, opacity',
                  transformOrigin: colIndex === 0 ? 'right center' : 'left center',
                }}
                className={`relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between text-white cursor-pointer select-none transition-all duration-200 overflow-hidden min-h-[185px] sm:min-h-[210px] transform-gpu ${
                  isPopped
                    ? 'border-2 border-amber-300 shadow-[0_16px_36px_rgba(0,0,0,0.45),_0_0_20px_rgba(199,131,61,0.35)]'
                    : 'border border-white/20 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.25)]'
                }`}
              >
                {/* Ambient inner subtle light glow & depth gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/35 pointer-events-none" />

                {/* 1. TOP ROW: Step Badge & Icon */}
                <div className="relative z-10 flex items-center justify-between gap-1.5 pointer-events-none">
                  <span className="font-dm text-[10px] sm:text-[11px] font-extrabold tracking-wider text-amber-200 bg-black/40 px-2.5 py-0.5 rounded-full border border-white/15 backdrop-blur-md">
                    {card.step}
                  </span>

                  <div className="p-1.5 rounded-full bg-white/15 border border-white/20 text-amber-200 backdrop-blur-md">
                    {card.icon}
                  </div>
                </div>

                {/* 2. CENTER CONTENT: Category & Grand Title */}
                <div className="relative z-10 my-auto py-1.5 pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] font-dm font-bold uppercase tracking-wider text-white/75 block truncate mb-1">
                    {card.subtitle}
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight drop-shadow-sm">
                    {card.title}
                  </h3>
                </div>

                {/* 3. BOTTOM ROW: Dedicated Navigation Arrow Button */}
                <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between">
                  <span className="text-[10.5px] sm:text-[11px] font-dm font-bold tracking-wider text-amber-200 uppercase truncate pr-1 pointer-events-none">
                    {card.actionLabel.replace('Enter ', '').replace('Explore ', '').replace('Join ', '').replace('Partner & ', '')}
                  </span>

                  {/* Dedicated Arrow Button: Only clicking this navigates to the page */}
                  <button
                    type="button"
                    title={`Open ${card.title}`}
                    aria-label={`Open ${card.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      card.action();
                    }}
                    className="w-7 h-7 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 flex items-center justify-center border border-amber-300 shadow-md shrink-0 active:scale-90 transition-transform cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-stone-950 stroke-[2.5]" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
