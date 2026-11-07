import React, { useState, useRef, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Palette,
  Check
} from 'lucide-react';
import { TempleArchitectureLine } from './ui/SacredPatterns';

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
    id: 'gold',
    name: 'Temple Gold',
    sanskrit: '॥ पुरातन सुवर्ण ॥',
    element: 'Surya Tejas (Sacred Temple Finials & Pure Brass)',
    hex: '#C59239',
    rgb: [197, 146, 57],
    isLight: false,
    tints: ['#C59239', '#D3A85B', '#E1BE7D', '#ECD5A4', '#F6EBCF'],
  },
  {
    id: 'ivory',
    name: 'Sacred Ivory',
    sanskrit: '॥ पवित्र श्वेत ॥',
    element: 'Sattva Shanti (Pristine Foundation Base)',
    hex: '#FEFBF2',
    rgb: [254, 251, 242],
    isLight: true,
    tints: ['#FEFBF2', '#FBF6E5', '#F8F1D8', '#F5ECCB', '#F2E7BE'],
  },
  {
    id: 'ruby',
    name: 'Ruby Red',
    sanskrit: '॥ दिव्य कुङ्कुम ॥',
    element: 'Shakti Sankalpa (Consecrated Temple Vermilion)',
    hex: '#98555E',
    rgb: [152, 85, 94],
    isLight: false,
    tints: ['#51000F', '#742A35', '#98555E', '#BE838A', '#E4B8BD'],
  },
  {
    id: 'water-blue',
    name: 'Water Blue',
    sanskrit: '॥ पावन गङ्गा जल ॥',
    element: 'Ganga Jal (Purifying Sacred River & Clarity)',
    hex: '#3DB3E4',
    rgb: [61, 179, 228],
    isLight: false,
    tints: ['#3DB3E4', '#64C2E9', '#8BCFF0', '#B2DCF5', '#D9ECF9'],
  },
  {
    id: 'wind-blue',
    name: 'Wind Blue',
    sanskrit: '॥ अनन्त व्योम ॥',
    element: 'Vayu & Akasha (Infinite Space & Cosmic Devotion)',
    hex: '#0A4C83',
    rgb: [10, 76, 131],
    isLight: false,
    tints: ['#073863', '#0A4C83', '#3B709C', '#6C94B5', '#CEDBE6'],
  },
  {
    id: 'lotus-pink',
    name: 'Lotus Pink',
    sanskrit: '॥ पद्म कमल ॥',
    element: 'Lakshmi Kamala (Devotion, Grace & Blossoming)',
    hex: '#C23053',
    rgb: [194, 48, 83],
    isLight: false,
    tints: ['#C23053', '#CE5975', '#DB8398', '#E7ACBA', '#F3D6DD'],
  },
  {
    id: 'leaf-green',
    name: 'Mountain/Leaf Green',
    sanskrit: '॥ तुलसी दल ॥',
    element: 'Prakriti Aradhana (Bilva, Tulsi & Himalayan Flora)',
    hex: '#607427',
    rgb: [96, 116, 39],
    isLight: false,
    tints: ['#607427', '#809052', '#A0AC7D', '#C0C7A9', '#DFE3D4'],
  },
  {
    id: 'fire-orange',
    name: 'Fire Orange',
    sanskrit: '॥ पावक अग्नि ॥',
    element: 'Yajna Agni (Blazing Marigold & Purification)',
    hex: '#FE7613',
    rgb: [254, 118, 19],
    isLight: true,
    tints: ['#FE7613', '#FE9142', '#FEAD71', '#FFC8A1', '#FFE4D0'],
  },
  {
    id: 'mountain-brown',
    name: 'Mountain Brown',
    sanskrit: '॥ शैल मृत्तिका ॥',
    element: 'Prithvi Dhara (Terracotta Clay & Holy Mountain Soil)',
    hex: '#AC5D2C',
    rgb: [172, 93, 44],
    isLight: false,
    tints: ['#AC5D2C', '#BD7D56', '#CD9E80', '#DEBEAB', '#EEDFD5'],
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
  actionLink?: string;
  actionLabel?: string;
}

const PILLARS: PillarCard[] = [
  {
    id: 'understand',
    number: '01',
    sanskrit: '॥ ज्ञान बोध ॥',
    title: 'Understand the Why',
    tagline: 'From inherited customs to conscious understanding',
    description: 'Why a diya? Why a mantra? Why a festival? Through cultural storytelling, learning experiences, practical guidance and digital tools in development, we seek to bring the meaning behind customs into focus. The aim is not simply to repeat a tradition, but to understand why it matters.',
    image: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Knowledge',
      'Guidance',
      'Learning'
    ],
    metrics: [
      { label: 'Tradition to Truth', value: 'Conscious' },
      { label: 'Medium', value: 'Story & Lore' }
    ],
    brandColor: BRAND_COLORS[2], // Ruby Red (#98555E)
    cardStyle: {
      bg: 'bg-[#98555E]',
      text: 'text-[#FEFBF2]',
      taglineText: 'text-[#E4B968]',
      descText: 'text-[#FEFBF2]/90',
      badgeBg: 'bg-[#51000F]',
      badgeText: 'text-[#E4B968]',
      border: 'border-[#E4B968]/50 hover:border-[#FEFBF2]',
      glow: 'shadow-[0_20px_45px_rgba(152,85,94,0.45),0_0_25px_rgba(197,146,57,0.3)]',
      panelBg: 'bg-gradient-to-br from-[#98555E] via-[#742A35] to-[#51000F]',
    },
    initialRotate: -7,
    actionLink: '#explore',
    actionLabel: 'Learn More'
  },
  {
    id: 'live',
    number: '02',
    sanskrit: '॥ नित्य जीवन ॥',
    title: 'Make the Sacred Part of Life',
    tagline: 'From occasional rituals to everyday living',
    description: 'Devotion belongs in ordinary days as much as grand celebrations. Sanatana Mall brings together puja kits, ritual essentials, festival collections, traditional craft and thoughtful gifting. With clearer information and convenient access, families - including those living abroad - can prepare with greater ease.',
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Sanatana Mall',
      'Festivals',
      'Gifting'
    ],
    metrics: [
      { label: 'Sanatana Mall', value: 'Everyday Rituals' },
      { label: 'Reach', value: 'Global Families' }
    ],
    brandColor: BRAND_COLORS[6], // Mountain/Leaf Green (#607427)
    cardStyle: {
      bg: 'bg-[#607427]',
      text: 'text-[#FEFBF2]',
      taglineText: 'text-[#C0C7A9]',
      descText: 'text-[#FEFBF2]/90',
      badgeBg: 'bg-[#4A5A1E]',
      badgeText: 'text-[#FEFBF2]',
      border: 'border-[#C0C7A9]/60 hover:border-[#FEFBF2]',
      glow: 'shadow-[0_20px_45px_rgba(96,116,39,0.45),0_0_25px_rgba(192,199,169,0.3)]',
      panelBg: 'bg-gradient-to-br from-[#607427] via-[#506120] to-[#3E4C19]',
    },
    initialRotate: 4,
    actionLink: '#products',
    actionLabel: 'Shop Mall'
  },
  {
    id: 'experience',
    number: '03',
    sanskrit: '॥ प्रत्यक्ष यात्रा ॥',
    title: 'Experience What You Believe',
    tagline: 'From knowing the sacred to standing before it',
    description: 'There is a difference between reading of a sacred place and walking its path. Our curated yatras connect Jyotirlingas, Shakti Peethas, temples and spiritual destinations with story-led routes, arranged stays and travel coordination. The logistics are considered so the meaning of the journey can take centre stage.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Sacred Yatras',
      'Itineraries',
      'Support'
    ],
    metrics: [
      { label: 'Curated Yatras', value: 'Jyotirlingas & Peethas' },
      { label: 'Pilgrim Care', value: 'End-to-End' }
    ],
    brandColor: BRAND_COLORS[4], // Wind Blue (#0A4C83)
    cardStyle: {
      bg: 'bg-[#0A4C83]',
      text: 'text-[#FEFBF2]',
      taglineText: 'text-[#3DB3E4]',
      descText: 'text-[#FEFBF2]/90',
      badgeBg: 'bg-[#073863]',
      badgeText: 'text-[#3DB3E4]',
      border: 'border-[#3DB3E4]/50 hover:border-[#FEFBF2]',
      glow: 'shadow-[0_20px_45px_rgba(10,76,131,0.45),0_0_25px_rgba(61,179,228,0.3)]',
      panelBg: 'bg-gradient-to-br from-[#0A4C83] via-[#083E6B] to-[#073863]',
    },
    initialRotate: -3,
    actionLink: '#travel',
    actionLabel: 'Explore Yatras'
  },
  {
    id: 'contribute',
    number: '04',
    sanskrit: '॥ सह सृजन ॥',
    title: "Find Your Place. Shape What's Next.",
    tagline: 'From visitor to contributor',
    description: "The House does not end at a purchase or pilgrimage. Join for community updates and events; collaborate through volunteering, business and cultural initiatives; or explore Co-Create. Eligible creator challenges, paid campaigns and potential long-term collaborations open pathways for people to help carry the culture forward.",
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Join',
      'Partnerships',
      'Co-Create'
    ],
    metrics: [
      { label: 'Community', value: 'Events & Seva' },
      { label: 'Collaborate', value: 'Creator & Co-Create' }
    ],
    brandColor: BRAND_COLORS[7], // Fire Orange (#FE7613)
    cardStyle: {
      bg: 'bg-[#FE7613]',
      text: 'text-[#FEFBF2]',
      taglineText: 'text-[#FEFBF2]',
      descText: 'text-[#FEFBF2]/95',
      badgeBg: 'bg-[#D65F08]',
      badgeText: 'text-[#FEFBF2]',
      border: 'border-[#FEAD71] hover:border-[#FEFBF2]',
      glow: 'shadow-[0_20px_45px_rgba(254,118,19,0.45),0_0_25px_rgba(254,173,113,0.35)]',
      panelBg: 'bg-gradient-to-br from-[#FE7613] via-[#E66207] to-[#CC5300]',
    },
    initialRotate: 6,
    actionLink: '#community',
    actionLabel: 'Join & Co-Create'
  }
];

{/* Reusable Rotating Circular Vedic Sanctum Lotus Seal */}
const VedicSanctumSeal = ({ className = "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32" }: { className?: string }) => (
  <motion.div 
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: false, amount: 0.15 }}
    transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.2 }}
    className="relative inline-block cursor-pointer group z-20 shrink-0"
  >
    <div className={`relative ${className} drop-shadow-xl transition-transform duration-300 group-hover:scale-108`}>
      {/* 1. Rotating Outer Text Ring ONLY */}
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full select-none overflow-visible pointer-events-none"
      >
        <defs>
          <path
            id="vedicSanctumCirclePath"
            d="M 100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
          />
        </defs>
        <text
          fill="#C59239"
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
        <circle cx="100" cy="100" r="69" fill="#C59239" />
        <g fill="#FEFBF2" transform="translate(100, 100) scale(0.68) translate(-100, -100)">
          <path d="M 100,42 C 116,68 120,96 100,122 C 80,96 84,68 100,42 Z" />
          <path d="M 100,58 C 109,75 111,94 100,108 C 89,94 91,75 100,58 Z" fill="#C59239" />
          <path d="M 100,122 C 82,108 72,82 81,58 C 92,72 98,96 100,122 Z" />
          <path d="M 100,122 C 118,108 128,82 119,58 C 108,72 102,96 100,122 Z" />
          <path d="M 100,122 C 72,116 54,92 60,68 C 76,82 88,104 100,122 Z" />
          <path d="M 100,122 C 128,116 146,92 140,68 C 124,82 112,104 100,122 Z" />
          <path d="M 100,122 C 64,124 40,102 44,84 C 64,96 82,112 100,122 Z" />
          <path d="M 100,122 C 136,124 160,102 156,84 C 136,96 118,112 100,122 Z" />
          <path d="M 100,146 C 90,132 93,122 100,122 C 107,122 110,132 100,146 Z" />
          <path d="M 100,122 C 86,132 72,138 64,136 C 72,126 86,122 100,122 Z" />
          <path d="M 100,122 C 114,132 128,138 136,136 C 128,126 114,122 100,122 Z" />
        </g>
      </svg>
    </div>
  </motion.div>
);

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
      className="relative w-full py-20 sm:py-28 bg-[#FEFBF2] text-[#221508] overflow-hidden select-none transition-colors duration-500"
    >
      {/* Sacred Temple Art Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-01_at_12.00.36.jpg?v=1793704003"
          alt=""
          className="w-full h-full object-cover object-center scale-[1.01] brightness-[1.02] contrast-[1.03] saturate-[1.12]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(254,251,242,0.72) 0%, rgba(254,251,242,0.18) 20%, rgba(254,251,242,0.18) 80%, rgba(254,251,242,0.8) 100%)',
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
          backgroundImage: `radial-gradient(circle at 50% 50%, #C59239 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Background Sacred Patterns in Empty Margins - 100% Fully Visible & Uncropped */}
      <div className="absolute top-16 -left-10 lg:left-4 xl:left-8 pointer-events-none opacity-40 hidden lg:block">
        <TempleArchitectureLine size={300} color="#C59239" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* EDITORIAL POSTER SECTION HEADER                          */}
        {/* Inspired by bold chunky poster design with script flourish*/}
        {/* ======================================================== */}
        <div className="mb-14 sm:mb-18 pb-6">

          {/* Main Giant Chunky Typography Hero Block */}
          <div className="relative inline-block w-full">
            {/* Giant Chunky Stacked Heading */}
            <div className="relative z-10 select-none pb-2">

              {/* MOBILE 3-LINE HEADING (sm:hidden) */}
              <div className="sm:hidden flex flex-col space-y-1">
                {/* Line 1: WHY CHOOSE */}
                <motion.h2 
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cormorant text-[11.5vw] font-semibold text-[#221508] tracking-[-0.02em] leading-[0.92] uppercase"
                >
                  WHY CHOOSE
                </motion.h2>

                {/* Line 2: HOUSE OF */}
                <motion.h2 
                  initial={{ y: 24, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="font-cormorant text-[11.5vw] font-semibold text-[#221508] tracking-[-0.02em] leading-[0.92] uppercase"
                >
                  HOUSE OF
                </motion.h2>

                {/* Line 3: SANATANA? + Circular Seal */}
                <div className="flex items-center gap-3">
                  <motion.h2 
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-cormorant text-[11.5vw] font-semibold text-[#221508] tracking-[-0.02em] leading-[0.92] uppercase shrink-0"
                  >
                    SANATANA?
                  </motion.h2>
                  <VedicSanctumSeal className="w-14 h-14" />
                </div>
              </div>

              {/* DESKTOP / TABLET 2-LINE HEADING (hidden sm:block) */}
              <div className="hidden sm:block">
                {/* Line 1: WHY CHOOSE */}
                <div className="overflow-visible py-0.5">
                  <motion.h2 
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-cormorant sm:text-[7vw] md:text-[6vw] lg:text-[76px] xl:text-[90px] font-semibold text-[#221508] tracking-[-0.02em] leading-[0.95] uppercase"
                  >
                    WHY CHOOSE
                  </motion.h2>
                </div>

                {/* Line 2: HOUSE OF SANATANA? + Circular Vedic Seal */}
                <div className="overflow-visible flex items-center flex-wrap lg:flex-nowrap gap-3 sm:gap-5 py-0.5">
                  <motion.h2 
                    initial={{ y: 24, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: false, amount: 0.15 }}
                    transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="font-cormorant sm:text-[7vw] md:text-[6vw] lg:text-[76px] xl:text-[90px] font-semibold text-[#221508] tracking-[-0.02em] leading-[0.95] uppercase shrink-0"
                  >
                    HOUSE OF SANATANA?
                  </motion.h2>

                  <VedicSanctumSeal />
                </div>
              </div>

            </div>

            {/* Subtitle & Narrative introduction from user */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 pt-6 border-t border-[#C59239]/25 flex flex-col gap-4"
            >
              <h3 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-semibold text-[#98555E] tracking-tight leading-snug">
                One House. A Journey That Grows With You.
              </h3>

              <p className="max-w-3xl font-dm text-sm sm:text-base text-[#3D2619]/90 leading-relaxed font-normal">
                A tradition this profound deserves more than scattered information, complicated rituals, uncertain travel arrangements and disconnected experiences. House of Sanatana connects knowledge, sacred living, spiritual journeys and community in one growing ecosystem — from the first question to the opportunity to contribute.
              </p>

              {/* 4 Pillars Flow / Breadcrumb track */}
              <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 font-dm text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#FE7613] uppercase">
                <span className="px-3 py-1 rounded-full bg-[#FE7613]/10 border border-[#FE7613]/25 text-[#FE7613]">UNDERSTAND</span>
                <span className="text-[#C59239]/50 font-normal">/</span>
                <span className="px-3 py-1 rounded-full bg-[#FE7613]/10 border border-[#FE7613]/25 text-[#FE7613]">LIVE</span>
                <span className="text-[#C59239]/50 font-normal">/</span>
                <span className="px-3 py-1 rounded-full bg-[#FE7613]/10 border border-[#FE7613]/25 text-[#FE7613]">EXPERIENCE</span>
                <span className="text-[#C59239]/50 font-normal">/</span>
                <span className="px-3 py-1 rounded-full bg-[#FE7613]/10 border border-[#FE7613]/25 text-[#FE7613]">CONTRIBUTE</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SERVICE CARDS LAYOUT WITH CURSOR SPOTLIGHT               */}
        {/* Left: Giant Typography Watermark + Tilted Cards Cluster  */}
        {/* Right: Featured Pillar Details & Scripture Overview       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center min-h-[440px] lg:min-h-[580px]">
          
          {/* ====================================================== */}
          {/* LEFT 7 COLS: GIANT WATERMARK TEXT & TILTED CARDS       */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[440px] sm:min-h-[520px]">
            
            {/* GIANT BACKGROUND TYPOGRAPHY WATERMARK */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none select-none overflow-hidden">
              <span className="font-dm font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] tracking-tight text-[#221508]/[0.05] leading-none uppercase text-center block">
                WHY CHOOSE
              </span>
              <span className="font-dm font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[68px] tracking-tight text-[#221508]/[0.05] leading-none uppercase text-center block mt-1">
                HOUSE OF SANATANA
              </span>
              <span className="font-sanskrit text-[#C59239]/[0.15] text-2xl sm:text-4xl font-bold tracking-widest mt-2">
                ॥ सत्यं धर्म सनातन ॥
              </span>
            </div>

            {/* CLUSTER OF TILTED SERVICE CARDS IN AUTHENTIC BRAND HUES */}
            <div className="relative w-full max-w-[580px] h-[430px] sm:h-[480px] flex items-center justify-center">
              {PILLARS.map((pillar, index) => {
                const isHovered = hoveredCardId === pillar.id;
                const isSelected = activePillar.id === pillar.id;
                const style = pillar.cardStyle;

                // Responsive positioning: tighter cluster on mobile so all cards stay in-screen, standard layout on desktop
                const positionClasses = [
                  'left-[0%] sm:left-[4%] top-[4%] sm:top-[6%]',
                  'left-[10%] sm:left-[26%] top-[38%] sm:top-[38%]',
                  'left-[28%] sm:left-[48%] top-[6%] sm:top-[10%]',
                  'left-[38%] sm:left-[62%] top-[44%] sm:top-[44%]',
                ][index];

                const baseZIndex = [10, 12, 14, 16][index];

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
                      zIndex: isHovered ? 30 : isSelected ? 22 : baseZIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 24,
                      mass: 0.6
                    }}
                    className={`absolute ${positionClasses} w-[180px] sm:w-[240px] p-4 sm:p-6 rounded-2xl cursor-pointer select-none transition-shadow duration-300 border ${style.bg} ${style.border} ${
                      isSelected || isHovered
                        ? `${style.glow} ring-2 ring-[#C59239]`
                        : 'shadow-[0_12px_28px_rgba(34,21,8,0.18)]'
                    }`}
                  >
                    {/* Top Description */}
                    <p className={`font-dm text-[10.5px] sm:text-xs ${style.descText} leading-relaxed mb-4 sm:mb-6 line-clamp-3 font-normal`}>
                      {pillar.description}
                    </p>

                    {/* Bottom Title & Serial Bracket (e.g. [ 01 ] Thoughtful Planning) */}
                    <div className="pt-2.5 sm:pt-3 border-t border-white/20 flex flex-col gap-0.5 sm:gap-1">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="font-dm font-bold text-[11px] sm:text-xs text-[#FEFBF2]">
                          [{pillar.number}]
                        </span>
                        <h4 className={`font-cormorant text-xs sm:text-base font-semibold ${style.text} tracking-wide leading-tight`}>
                          {pillar.title}
                        </h4>
                      </div>
                      <span className="font-sanskrit text-[9px] sm:text-[10px] text-[#E4B968] font-semibold">
                        {pillar.sanskrit}
                      </span>
                    </div>

                    {/* Active Corner Color Beacon */}
                    {(isSelected || isHovered) && (
                      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#C59239] animate-pulse shadow-md" />
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
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between h-full space-y-6">
            
            {/* Top Section Descriptive Note */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-dm font-bold text-[#FE7613] uppercase tracking-widest">
                <span>[ ॥ चतुर्विध स्तम्भाः ॥ THE 4 PILLARS ]</span>
              </div>
              <p className="font-dm text-xs sm:text-sm text-[#221508] leading-relaxed font-medium">
                One unified ecosystem connecting knowledge, everyday rituals, sacred yatras, and active community co-creation.
              </p>
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
                {/* Pillar Header Badge & Sanskrit */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/20">
                  <span className="px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs border border-white/20 text-[11px] font-dm font-bold text-[#FEFBF2] uppercase tracking-wider">
                    Pillar [{activePillar.number}]
                  </span>
                  <span className="font-sanskrit text-sm text-[#E4B968] font-bold tracking-wide">
                    {activePillar.sanskrit}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold mb-1">
                  [{activePillar.number}] {activePillar.title}
                </h3>
                <p className={`font-cormorant text-sm sm:text-base font-medium mb-3 ${activePillar.cardStyle.taglineText}`}>
                  {activePillar.tagline}
                </p>

                {/* Description */}
                <p className={`font-dm text-xs leading-relaxed mb-5 ${activePillar.cardStyle.descText} font-medium`}>
                  {activePillar.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {activePillar.highlights.map((h, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-xs border border-white/20 text-[10.5px] font-dm font-bold text-[#FEFBF2] tracking-wider uppercase"
                    >
                      <Sparkles className="w-3 h-3 text-[#E4B968]" />
                      {h}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                  {activePillar.metrics.map((m, mi) => (
                    <div key={mi} className="text-left">
                      <div className="font-dm font-bold text-sm sm:text-base text-[#FEFBF2]">
                        {m.value}
                      </div>
                      <div className="font-dm text-[10px] uppercase tracking-wider text-[#E4B968]">
                        {m.label}
                      </div>
                    </div>
                  ))}
                  
                  <a
                    href={activePillar.actionLink || "#travel"}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C59239] hover:bg-[#FE7613] text-[#FEFBF2] font-dm font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                  >
                    <span>{activePillar.actionLabel || "Explore"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Descriptive Caption */}
            <p className="font-dm text-xs text-[#3D2619] leading-relaxed font-normal">
              The House does not end at a purchase or pilgrimage — join, collaborate, and help carry the culture forward. <span className="text-[#FE7613] font-bold">[ 01-04 ]</span>
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
