import React, { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Palette,
  Check
} from 'lucide-react';
import { TempleArchitectureLine, LotusLineArt } from './ui/SacredPatterns';

// =====================================================================
// OFFICIAL BRAND COLOR PALETTE (9 EXACT COLORS & TINT LADDERS)
// =====================================================================
export interface BrandColor {
  id: string;
  name: string;
  sanskrit: string;
  element: string;
  hex: string;
  rgb: [number, number, number];
  isLight: boolean;
  tints: string[];
}

export const BRAND_COLORS: BrandColor[] = [
  {
    id: 'ivory',
    name: 'Ivory',
    sanskrit: '॥ पवित्र श्वेत ॥',
    element: 'Sattva Shanti (Pristine Foundation Base)',
    hex: '#F7F1E5',
    rgb: [247, 241, 229],
    isLight: true,
    tints: ['#F7F1E5', '#F1E8D5', '#EADFC5', '#E2D5B4', '#DAC9A2'],
  },
  {
    id: 'sand',
    name: 'Sand Beige',
    sanskrit: '॥ सिकता वर्ण ॥',
    element: 'Dhara Kanti (Warm Earth & Riverbank Sands)',
    hex: '#D9C6A8',
    rgb: [217, 198, 168],
    isLight: true,
    tints: ['#D9C6A8', '#E2D3BC', '#EAE0D0', '#F2ECE3', '#F9F7F4'],
  },
  {
    id: 'sage',
    name: 'Soft Sage Olive',
    sanskrit: '॥ तुलसी अरण्य ॥',
    element: 'Prakriti Dhama (Sacred Groves & Himalayan Bilva)',
    hex: '#66705A',
    rgb: [102, 112, 90],
    isLight: false,
    tints: ['#3F4637', '#525B48', '#66705A', '#848F76', '#A3AC98'],
  },
  {
    id: 'saffron',
    name: 'Muted Saffron',
    sanskrit: '॥ कुङ्कुम अग्नि ॥',
    element: 'Yajna Jwala (Vedic Fire & Saffron Tilak)',
    hex: '#C7833D',
    rgb: [199, 131, 61],
    isLight: false,
    tints: ['#8A541F', '#A86B2B', '#C7833D', '#D79E62', '#E7B988'],
  },
  {
    id: 'gold',
    name: 'Antique Gold',
    sanskrit: '॥ पुरातन सुवर्ण ॥',
    element: 'Surya Tejas (Sacred Temple Finials & Pure Brass)',
    hex: '#B08A4A',
    rgb: [176, 138, 74],
    isLight: false,
    tints: ['#795B2A', '#947239', '#B08A4A', '#C4A56E', '#D7BE93'],
  },
  {
    id: 'taupe',
    name: 'Taupe Brown',
    sanskrit: '॥ भस्म अङ्गार ॥',
    element: 'Agni Bhasma (Grounding Temple Silence & Deep Wood)',
    hex: '#8F6E5B',
    rgb: [143, 110, 91],
    isLight: false,
    tints: ['#5E4537', '#765846', '#8F6E5B', '#A88A77', '#C2A795'],
  }
];

export interface PillarCard {
  id: string;
  number: string;
  sanskrit: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  // Authentic Brand Color System
  brandColor: BrandColor;
  cardStyle: {
    bg: string;
    text: string;
    taglineText: string;
    descText: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    glow: string;
    panelBg: string;
  };
  initialRotate: number;
}

const PILLARS: PillarCard[] = [
  {
    id: 'planning',
    number: '01',
    sanskrit: '॥ सङ्कल्प योजना ॥',
    title: 'Thoughtful Planning',
    tagline: 'Astrological Muhurat Alignment & Flawless Pilgrimage Architecture',
    description: 'Every ritual and yatra is engineered with zero guesswork. We calculate authentic Vedic muhurats, coordinate guaranteed temple tokens, and build acclimatized, stress-free itineraries so your devotion remains undisturbed.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Jyotish & Tithi-aligned ritual scheduling',
      'VIP Garbhagriha coordination & zero-wait access',
      'Altitude-acclimatized yatra pacing with medic on call'
    ],
    metrics: [
      { label: 'Muhurat Accuracy', value: '100%' },
      { label: 'Pilgrim Care', value: '24/7' }
    ],
    brandColor: BRAND_COLORS[5], // Taupe Brown (#8F6E5B)
    cardStyle: {
      bg: 'bg-[#8F6E5B]',
      text: 'text-[#F7F1E5]',
      taglineText: 'text-[#D9C6A8]',
      descText: 'text-[#D9C6A8]/90',
      badgeBg: 'bg-[#765846]',
      badgeText: 'text-[#B08A4A]',
      border: 'border-[#B08A4A]/60 hover:border-[#D9C6A8]',
      glow: 'shadow-[0_20px_45px_rgba(143,110,91,0.5),0_0_25px_rgba(176,138,74,0.3)]',
      panelBg: 'bg-gradient-to-br from-[#8F6E5B] via-[#7D5E4C] to-[#694D3D]',
    },
    initialRotate: -7
  },
  {
    id: 'information',
    number: '02',
    sanskrit: '॥ विशुद्ध ज्ञान ॥',
    title: 'Clear Information',
    tagline: 'Transparent Lineage, Authentic Vedic Scripts & Zero Ambiguity',
    description: 'We believe sacred knowledge must be open and crystal clear. From 100% lab-verified ingredient disclosures to bilingual mantra manuals with pronunciation guides, you always know the exact meaning, source, and ritual purpose.',
    image: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '100% natural samagri sourcing certificate',
      'Sanskrit stotras with word-by-word English translations',
      'Transparent pricing & dakshina disclosures'
    ],
    metrics: [
      { label: 'Purity Tested', value: '100%' },
      { label: 'Scripture Citations', value: 'Rigveda / Agamas' }
    ],
    brandColor: BRAND_COLORS[2], // Soft Sage Olive (#66705A)
    cardStyle: {
      bg: 'bg-[#66705A]',
      text: 'text-[#F7F1E5]',
      taglineText: 'text-[#D9C6A8]',
      descText: 'text-[#F7F1E5]/90',
      badgeBg: 'bg-[#525B48]',
      badgeText: 'text-[#D9C6A8]',
      border: 'border-[#848F76] hover:border-[#D9C6A8]',
      glow: 'shadow-[0_20px_45px_rgba(102,112,90,0.5),0_0_25px_rgba(217,198,168,0.25)]',
      panelBg: 'bg-gradient-to-br from-[#66705A] via-[#5A634F] to-[#48503E]',
    },
    initialRotate: 4
  },
  {
    id: 'participation',
    number: '03',
    sanskrit: '॥ सार्थक सहभागिता ॥',
    title: 'Meaningful Participation',
    tagline: 'Direct Sacred Immersion & Hands-on Devotee Seva',
    description: 'Devotion should never be a spectator sport. Our experiences empower every family member to actively hold the samidha, chant the sankalpa, offer ahutis, and partake directly in sanctified dharma traditions.',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Hands-on Havan kits configured for step-by-step family execution',
      'Personalized live Sankalpa chanted in your Gotra and Nakshatra',
      'Devotee Co-Creator Guild for artisans and Vedic researchers'
    ],
    metrics: [
      { label: 'Active Devotees', value: '25,000+' },
      { label: 'Family Immersion', value: 'Multi-gen' }
    ],
    brandColor: BRAND_COLORS[3], // Muted Saffron (#C7833D)
    cardStyle: {
      bg: 'bg-[#C7833D]',
      text: 'text-[#F7F1E5]',
      taglineText: 'text-[#F7F1E5]',
      descText: 'text-[#F7F1E5]/95',
      badgeBg: 'bg-[#A86B2B]',
      badgeText: 'text-[#F7F1E5]',
      border: 'border-[#D79E62] hover:border-[#F7F1E5]',
      glow: 'shadow-[0_20px_45px_rgba(199,131,61,0.5),0_0_25px_rgba(215,158,98,0.35)]',
      panelBg: 'bg-gradient-to-br from-[#C7833D] via-[#B87532] to-[#A36425]',
    },
    initialRotate: -3
  },
  {
    id: 'presentation',
    number: '04',
    sanskrit: '॥ सात्विक प्रतिष्ठा ॥',
    title: 'Careful Presentation',
    tagline: 'Artisanal Consecration, Sacred Unboxing & Reverent Aesthetics',
    description: 'We treat every sacred article with the utmost veneration. Packed in hand-crafted brassware, organic silk wraps, and fragrant sandalwood caskets, every kit is consecrated before departure to honor the deities you invite home.',
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Consecrated at Kashi Vishwanath & Pashupatinath Peethams',
      'Solid virgin brass, cast by 5th-generation Kumbakonam artisans',
      'Sandalwood-infused eco-packaging with reusable sacred caskets'
    ],
    metrics: [
      { label: 'Artisan Lineage', value: '5 Generations' },
      { label: 'Consecrated', value: 'Vedic Peethams' }
    ],
    brandColor: BRAND_COLORS[4], // Antique Gold (#B08A4A)
    cardStyle: {
      bg: 'bg-[#B08A4A]',
      text: 'text-[#F7F1E5]',
      taglineText: 'text-[#F7F1E5]',
      descText: 'text-[#F7F1E5]/90',
      badgeBg: 'bg-[#947239]',
      badgeText: 'text-[#F7F1E5]',
      border: 'border-[#C4A56E]/60 hover:border-[#F7F1E5]',
      glow: 'shadow-[0_20px_45px_rgba(176,138,74,0.45),0_0_25px_rgba(215,190,147,0.3)]',
      panelBg: 'bg-gradient-to-br from-[#B08A4A] via-[#9F7A3C] to-[#86632B]',
    },
    initialRotate: 6
  }
];

export const WhyHOSSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePillar, setActivePillar] = useState<PillarCard>(PILLARS[0]);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
  // Interactive Brand Palette State
  const [selectedBrandColor, setSelectedBrandColor] = useState<BrandColor>(BRAND_COLORS[0]); // Gold default
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Mouse tracking with smooth spring for cursor spotlight
  const mouseX = useMotionValue(600);
  const mouseY = useMotionValue(350);

  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Determine active dynamic spotlight RGB based on hover or selected palette color
  const activeSpotlightColor = hoveredCardId 
    ? (PILLARS.find(p => p.id === hoveredCardId)?.brandColor || selectedBrandColor)
    : selectedBrandColor;

  const [sR, sG, sB] = activeSpotlightColor.rgb;

  const copyToClipboard = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section 
      id="why-hos" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-20 sm:py-28 bg-[#F7F1E5] text-[#8F6E5B] overflow-hidden select-none transition-colors duration-500"
    >
      {/* ======================================================== */}
      {/* 1. INTERACTIVE CURSOR SPOTLIGHT ON IVORY BASE            */}
      {/* Dynamically radiates the selected / hovered brand color! */}
      {/* ======================================================== */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: useTransform(
            [smoothMouseX, smoothMouseY],
            ([x, y]) => `radial-gradient(650px circle at ${x}px ${y}px, rgba(${sR}, ${sG}, ${sB}, 0.18) 0%, rgba(${sR}, ${sG}, ${sB}, 0.08) 35%, transparent 75%)`
          )
        }}
      />

      {/* Ambient Glow Orbs reflecting active color on Ivory */}
      <div 
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-40"
        style={{ backgroundColor: activeSpotlightColor.hex }}
      />
      <div 
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none transition-colors duration-700 opacity-30"
        style={{ backgroundColor: selectedBrandColor.hex }}
      />

      {/* Subtle Sacred Geometry Watermark Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8F6E5B 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Background Sacred Patterns in Empty Margins - 100% Fully Visible & Uncropped */}
      <div className="absolute top-16 -left-10 lg:left-4 xl:left-8 pointer-events-none opacity-55 hidden lg:block">
        <TempleArchitectureLine size={300} color="#705B4C" />
      </div>
      <div className="absolute bottom-8 sm:bottom-12 -left-6 sm:left-2 lg:left-6 xl:left-10 pointer-events-none opacity-55 hidden lg:block z-0">
        <LotusLineArt size={300} color="#705B4C" className="-rotate-6" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* EDITORIAL POSTER SECTION HEADER                          */}
        {/* Inspired by bold chunky poster design with script flourish*/}
        {/* ======================================================== */}
        <div className="mb-14 sm:mb-18 pb-6">

          {/* Main Giant Chunky Typography Hero Block */}
          <div className="relative inline-block w-full">
            {/* Elegant Loopy Cursive Line-Art Script (Animated SVG Flourish) */}
            <div className="absolute -top-10 sm:-top-16 left-1/3 sm:left-2/5 w-44 sm:w-72 md:w-96 h-28 sm:h-44 md:h-52 pointer-events-none z-20">
              <svg viewBox="0 0 320 160" fill="none" className="w-full h-full text-[#66705A]/40 sm:text-[#66705A]/50">
                <motion.path
                  d="M 30,120 C 70,10 130,-10 180,45 C 225,95 110,150 75,100 C 40,50 145,10 235,30 C 285,42 305,90 270,135"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
            </div>

            {/* Giant Chunky Stacked Heading */}
            <div className="relative z-10 select-none pb-2">
              {/* Line 1: WHY CHOOSE */}
              <div className="overflow-visible py-0.5">
                <motion.h2 
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cormorant text-[11vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[108px] xl:text-[124px] font-semibold text-[#8F6E5B] tracking-[-0.02em] leading-[0.92] uppercase"
                >
                  WHY CHOOSE
                </motion.h2>
              </div>

              {/* Line 2: HOUSE OF SANATANA? + Starburst Badge */}
              <div className="overflow-visible flex items-baseline flex-wrap relative py-0.5">
                <motion.h2 
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cormorant text-[11vw] sm:text-[9.5vw] md:text-[8vw] lg:text-[108px] xl:text-[124px] font-semibold text-[#8F6E5B] tracking-[-0.02em] leading-[0.92] uppercase inline-flex items-baseline"
                >
                  <span>HOUSE OF SANATANA</span>
                  <span className="text-[#8F6E5B]">?</span>
                </motion.h2>

                {/* Circular Vedic Sanctum Lotus Seal - Rotating Text Only */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.2 }}
                  className="relative ml-2 sm:ml-4 md:ml-6 -mt-3 sm:-mt-6 md:-mt-10 inline-block cursor-pointer group z-20 shrink-0"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-38 md:h-38 drop-shadow-xl transition-transform duration-300 group-hover:scale-108">
                    
                    {/* 1. Rotating Outer Text Ring ONLY */}
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                      viewBox="0 0 200 200"
                      className="absolute inset-0 w-full h-full select-none overflow-visible pointer-events-none"
                    >
                      <defs>
                        {/* Circular text path centered at 100,100 with radius 84 */}
                        <path
                          id="vedicSanctumCirclePath"
                          d="M 100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
                        />
                      </defs>

                      {/* Circular Rotating Text (5 instances of • VEDIC SANCTUM) */}
                      <text
                        fill="#A87C3A"
                        className="font-dm font-bold text-[10.5px] uppercase tracking-[0.22em]"
                      >
                        <textPath
                          href="#vedicSanctumCirclePath"
                          startOffset="0%"
                        >
                          • VEDIC SANCTUM • VEDIC SANCTUM • VEDIC SANCTUM • VEDIC SANCTUM • VEDIC SANCTUM
                        </textPath>
                      </text>
                    </motion.svg>

                    {/* 2. Static Inner Medallion & Lotus (Completely Stable) */}
                    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full select-none">
                      {/* Inner Solid Gold/Bronze Medallion */}
                      <circle cx="100" cy="100" r="69" fill="#B08A4A" />

                      {/* Sacred Lotus Flower Icon (Centered Cream/Ivory Lotus) */}
                      <g fill="#F7F1E5" transform="translate(100, 100) scale(0.68) translate(-100, -100)">
                        {/* Central Lotus Main Body */}
                        <path d="M 100,42 C 116,68 120,96 100,122 C 80,96 84,68 100,42 Z" />
                        {/* Inner Cutout on Center Petal */}
                        <path d="M 100,58 C 109,75 111,94 100,108 C 89,94 91,75 100,58 Z" fill="#B08A4A" />

                        {/* Inner Flanking Petals (Left & Right) */}
                        <path d="M 100,122 C 82,108 72,82 81,58 C 92,72 98,96 100,122 Z" />
                        <path d="M 100,122 C 118,108 128,82 119,58 C 108,72 102,96 100,122 Z" />

                        {/* Outer Flanking Petals */}
                        <path d="M 100,122 C 72,116 54,92 60,68 C 76,82 88,104 100,122 Z" />
                        <path d="M 100,122 C 128,116 146,92 140,68 C 124,82 112,104 100,122 Z" />

                        {/* Side Horizontal Spread Petals */}
                        <path d="M 100,122 C 64,124 40,102 44,84 C 64,96 82,112 100,122 Z" />
                        <path d="M 100,122 C 136,124 160,102 156,84 C 136,96 118,112 100,122 Z" />

                        {/* Base Lower Calyx Leaf (Downward Pointing) */}
                        <path d="M 100,146 C 90,132 93,122 100,122 C 107,122 110,132 100,146 Z" />

                        {/* Base Side Leaves */}
                        <path d="M 100,122 C 86,132 72,138 64,136 C 72,126 86,122 100,122 Z" />
                        <path d="M 100,122 C 114,132 128,138 136,136 C 128,126 114,122 100,122 Z" />
                      </g>
                    </svg>

                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SERVICE CARDS LAYOUT WITH CURSOR SPOTLIGHT               */}
        {/* Left: Giant Typography Watermark + Tilted Cards Cluster  */}
        {/* Right: Featured Pillar Details & Scripture Overview       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center min-h-[580px]">
          
          {/* ====================================================== */}
          {/* LEFT 7 COLS: GIANT WATERMARK TEXT & TILTED CARDS       */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px]">
            
            {/* GIANT BACKGROUND TYPOGRAPHY WATERMARK */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden">
              <span className="font-dm font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight text-[#8F6E5B]/[0.05] leading-none uppercase text-center block">
                WHY CHOOSE
              </span>
              <span className="font-dm font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight text-[#8F6E5B]/[0.05] leading-none uppercase text-center block mt-1">
                HOUSE OF SANATANA
              </span>
              <span className="font-sanskrit text-[#8F6E5B]/[0.06] text-2xl sm:text-4xl font-bold tracking-widest mt-2">
                ॥ सत्यं धर्म सनातन ॥
              </span>
            </div>

            {/* CLUSTER OF TILTED SERVICE CARDS IN AUTHENTIC BRAND HUES */}
            <div className="relative w-full max-w-[580px] h-[440px] sm:h-[480px] flex items-center justify-center">
              {PILLARS.map((pillar, index) => {
                const isHovered = hoveredCardId === pillar.id;
                const isSelected = activePillar.id === pillar.id;
                const style = pillar.cardStyle;
                const isWaterBlue = pillar.brandColor.id === 'water-blue';

                // Staggered positioning matching Framer video
                const offsets = [
                  { left: '4%', top: '6%', zIndex: 10 },
                  { left: '26%', top: '38%', zIndex: 12 },
                  { left: '48%', top: '10%', zIndex: 14 },
                  { left: '62%', top: '44%', zIndex: 16 },
                ][index];

                return (
                  <motion.div
                    key={pillar.id}
                    onMouseEnter={() => {
                      setHoveredCardId(pillar.id);
                      setActivePillar(pillar);
                      setSelectedBrandColor(pillar.brandColor);
                    }}
                    onMouseLeave={() => setHoveredCardId(null)}
                    onClick={() => {
                      setActivePillar(pillar);
                      setSelectedBrandColor(pillar.brandColor);
                    }}
                    animate={{
                      rotate: isHovered ? 0 : pillar.initialRotate,
                      scale: isHovered ? 1.08 : isSelected ? 1.03 : 1,
                      zIndex: isHovered ? 30 : isSelected ? 22 : offsets.zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 24,
                      mass: 0.6
                    }}
                    style={{
                      position: 'absolute',
                      left: offsets.left,
                      top: offsets.top,
                    }}
                    className={`w-[210px] sm:w-[240px] p-5 sm:p-6 rounded-2xl cursor-pointer select-none transition-shadow duration-300 border ${style.bg} ${style.border} ${
                      isSelected || isHovered
                        ? `${style.glow} ring-2 ring-[#B08A4A]`
                        : 'shadow-[0_12px_28px_rgba(34,21,8,0.18)]'
                    }`}
                  >
                    {/* Top Description */}
                    <p className={`font-dm text-[11px] sm:text-xs ${style.descText} leading-relaxed mb-6 line-clamp-3 font-normal`}>
                      {pillar.description}
                    </p>

                    {/* Bottom Title & Serial Bracket (e.g. [ 01 ] Thoughtful Planning) */}
                    <div className="pt-3 border-t border-white/20 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-dm font-bold text-xs text-[#F7F1E5]">
                          [{pillar.number}]
                        </span>
                        <h4 className={`font-cormorant text-sm sm:text-base font-semibold ${style.text} tracking-wide leading-tight`}>
                          {pillar.title}
                        </h4>
                      </div>
                      <span className="font-sanskrit text-[10px] text-[#D9C6A8] font-semibold">
                        {pillar.sanskrit}
                      </span>
                    </div>

                    {/* Active Corner Color Beacon */}
                    {(isSelected || isHovered) && (
                      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#B08A4A] animate-pulse shadow-md" />
                    )}
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* ====================================================== */}
          {/* RIGHT 5 COLS: FEATURED SHOWCASE PANEL                   */}
          {/* Dynamically reflects active pillar's exact brand color  */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            
            {/* Top Section Descriptive Note */}
            <div className="space-y-3">
              <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/80 leading-relaxed font-normal">
                We unite eternal Vedic Agamic wisdom with meticulous planning to create sacred offerings and pilgrimages that elevate your spiritual life.
              </p>
              
              <div className="inline-flex items-center gap-2 text-xs font-dm font-bold text-[#C7833D] uppercase tracking-widest">
                <span>[ ॥ चतुर्विध स्तम्भाः ॥ THE 4 PILLARS ]</span>
              </div>
            </div>

            {/* Active Featured Card Spotlight Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className={`p-6 sm:p-7 rounded-3xl ${activePillar.cardStyle.panelBg} ${activePillar.cardStyle.text} border ${activePillar.cardStyle.border} ${activePillar.cardStyle.glow} relative overflow-hidden`}
              >
                {/* Decorative image preview header */}
                <div className="relative w-full h-32 sm:h-36 rounded-2xl overflow-hidden mb-5 border border-white/20 shadow-md">
                  <img 
                    src={activePillar.image} 
                    alt={activePillar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-white/20 text-[10px] font-dm font-bold text-[#F7F1E5] uppercase">
                    Pillar [{activePillar.number}]
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                    <span className="font-sanskrit text-xs text-[#D9C6A8] font-bold">
                      {activePillar.sanskrit}
                    </span>
                    <span className="text-[10px] font-dm text-stone-300 font-medium">
                      Peetham Verified
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold mb-1">
                  [{activePillar.number}] {activePillar.title}
                </h3>
                <p className={`font-cormorant text-sm sm:text-base font-medium mb-3 ${activePillar.cardStyle.taglineText}`}>
                  {activePillar.tagline}
                </p>

                {/* Description */}
                <p className={`font-dm text-xs leading-relaxed mb-5 ${activePillar.cardStyle.descText} font-normal`}>
                  {activePillar.description}
                </p>

                {/* Highlights tags */}
                <div className="space-y-2 mb-5">
                  {activePillar.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] font-dm">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#B08A4A]" />
                      <span className="font-medium">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                  {activePillar.metrics.map((m, mi) => (
                    <div key={mi} className="text-left">
                      <div className="font-dm font-bold text-sm sm:text-base text-[#F7F1E5]">
                        {m.value}
                      </div>
                      <div className="font-dm text-[10px] uppercase tracking-wider text-[#D9C6A8]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                  
                  <a
                    href="#travel"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B08A4A] hover:bg-[#C7833D] text-[#F7F1E5] font-dm font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Descriptive Caption */}
            <p className="font-dm text-xs text-[#8F6E5B]/80 leading-relaxed font-normal">
              Every ritual samagri kit, brass vigraha, and Himalayan yatra is consecrated to uphold the uncompromising sanctity of Sanatana Dharma. <span className="text-[#C7833D] font-bold">[ 01-04 ]</span>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
