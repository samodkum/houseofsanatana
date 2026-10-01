import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { TRAVEL_PACKAGES } from '../data/mockData';
import { YatraPackage } from '../types/homepage';
import { YatraModal } from './YatraModal';
import { TiltCard } from './unlumen-ui/tilt-card';
import { Compass, Sparkles, ArrowRight, X, Clock, MapPin } from 'lucide-react';

/** Luxury Pilgrimage Yatra Airplane (3/4 Banking Perspective with Both Wings Visible & Pearl-Ivory Livery) */
function HorizontalYatraAirplane({ className = "w-28 sm:w-34 h-14 sm:h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Fuselage Pearl-Ivory Gradient */}
        <linearGradient id="fuselagePearl" x1="20" y1="18" x2="165" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F9F6F0" />
          <stop offset="85%" stopColor="#EDE6DB" />
          <stop offset="100%" stopColor="#D9D0C3" />
        </linearGradient>

        {/* Near/Foreground Wing Gradient */}
        <linearGradient id="wingNearGrad" x1="45" y1="36" x2="115" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F4EFE6" />
          <stop offset="100%" stopColor="#DDD5C8" />
        </linearGradient>

        {/* Far/Background Wing Gradient (Slightly Shaded for 3D Depth) */}
        <linearGradient id="wingFarGrad" x1="50" y1="8" x2="110" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EDE5D8" />
          <stop offset="100%" stopColor="#D5CCC0" />
        </linearGradient>

        {/* Engine Metal Gradient */}
        <linearGradient id="engineNacelle" x1="65" y1="48" x2="95" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4A4540" />
          <stop offset="50%" stopColor="#2E2C29" />
          <stop offset="100%" stopColor="#1E1D1B" />
        </linearGradient>

        {/* Jet Vapor Shimmer */}
        <linearGradient id="vaporTrail" x1="60" y1="52" x2="25" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#cbd5e1" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 1. Subtle Atmospheric Shadow Beneath */}
      <ellipse cx="90" cy="65" rx="55" ry="5" fill="#705B4C" opacity="0.12" />

      {/* 2. TOP / FAR WING (Visible in Banking Perspective) */}
      <g>
        <path
          d="M 80 26 L 50 6 C 48 5 51 4 54 4 L 68 5 C 75 6 82 10 88 16 L 112 25 Z"
          fill="url(#wingFarGrad)"
          stroke="#705B4C"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Far Wingtip Red Strobe */}
        <circle cx="50" cy="5.5" r="1.6" fill="#ef4444" />
        
        {/* Far Jet Engine */}
        <rect x="74" y="12" width="22" height="7" rx="3.5" fill="#3D3A37" stroke="#705B4C" strokeWidth="0.8" />
        <ellipse cx="96" cy="15.5" rx="2" ry="3.5" fill="#1E1D1B" />
      </g>

      {/* 3. TAIL UNIT (Vertical Stabilizer & Horizontal Elevators) */}
      <g>
        {/* Far Elevator */}
        <path
          d="M 16 27 L 4 19 C 3 18 4 17 6 17 L 16 17 L 28 26 Z"
          fill="#D5CCC0"
          stroke="#705B4C"
          strokeWidth="0.9"
        />

        {/* Vertical Tail Fin */}
        <path
          d="M 22 28 L 8 4 C 7 2 9 1 12 1 L 26 1 C 30 1 34 3 37 7 L 48 24 Z"
          fill="url(#wingFarGrad)"
          stroke="#705B4C"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        {/* Sacred Tail Emblem */}
        <circle cx="18" cy="9" r="3.6" fill="#8F6E5B" stroke="#705B4C" strokeWidth="0.8" />
        <circle cx="18" cy="9" r="1.6" fill="#F7F1E5" />

        {/* Near Elevator */}
        <path
          d="M 14 33 L 2 41 C 1 42 2 43 4 43 L 14 43 L 26 35 Z"
          fill="url(#wingNearGrad)"
          stroke="#705B4C"
          strokeWidth="0.9"
        />
      </g>

      {/* 4. MAIN STREAMLINED PEARL FUSELAGE */}
      <g>
        <path
          d="M 16 32 C 16 25 36 19 75 19 C 120 19 148 24 162 31 C 166 33 166 35 162 37 C 148 44 120 48 75 48 C 36 48 16 41 16 32 Z"
          fill="url(#fuselagePearl)"
          stroke="#705B4C"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Refined Taupe & Copper Cheatline (Livery Stripe) */}
        <path d="M 22 33 Q 85 35 156 33" stroke="#705B4C" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M 26 35 Q 85 37 150 35" stroke="#C7833D" strokeWidth="0.8" strokeLinecap="round" />

        {/* Sleek Wraparound Cockpit Glass */}
        <path
          d="M 138 26 C 143 25 152 28 157 32 L 146 33 C 141 31 138 28 138 26 Z"
          fill="#1E293B"
          stroke="#705B4C"
          strokeWidth="0.8"
        />
        <line x1="141" y1="27" x2="151" y2="31" stroke="rgba(255,255,255,0.75)" strokeWidth="1" strokeLinecap="round" />

        {/* Passenger Cabin Windows in Refined Charcoal */}
        {[44, 56, 68, 80, 92, 104, 116, 128].map((wx) => (
          <ellipse key={`win-${wx}`} cx={wx} cy="28" rx="2.2" ry="3.2" fill="#242220" stroke="#705B4C" strokeWidth="0.6" />
        ))}
      </g>

      {/* 5. BOTTOM / NEAR WING (Foreground Wing with Full Sweep) */}
      <g>
        {/* Jet Vapor Heat Stream */}
        <polygon points="68,52 32,50 32,56 68,54" fill="url(#vaporTrail)" />

        {/* Main Near Wing */}
        <path
          d="M 74 36 L 42 66 C 40 68 43 70 47 69 L 63 67 C 70 66 76 62 82 56 L 114 37 Z"
          fill="url(#wingNearGrad)"
          stroke="#705B4C"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Near Wingtip Green Strobe */}
        <circle cx="43" cy="67.5" r="1.8" fill="#22c55e" />
        <circle cx="43" cy="67.5" r="0.8" fill="#ffffff" />

        {/* Near Jet Turbine Engine */}
        <rect x="66" y="48" width="28" height="10" rx="5" fill="url(#engineNacelle)" stroke="#705B4C" strokeWidth="1" />
        <ellipse cx="94" cy="53" rx="3" ry="5" fill="#18181B" stroke="#8F6E5B" strokeWidth="0.8" />
        <line x1="70" y1="53" x2="88" y2="53" stroke="#8F6E5B" strokeWidth="0.75" />
      </g>
    </svg>
  );
}

// 5 Dham stops: card is anchored DIRECTLY on each curve point (Zero separation)
const DHAM_STOPS = [
  { pkgIndex: 0, x: 300, isTop: true, stopNumber: 1 },
  { pkgIndex: 1, x: 740, isTop: false, stopNumber: 2 },
  { pkgIndex: 2, x: 1180, isTop: true, stopNumber: 3 },
  { pkgIndex: 3, x: 1620, isTop: false, stopNumber: 4 },
  { pkgIndex: 4, x: 2060, isTop: true, stopNumber: 5 },
];

// Brand Color Palette Mapping for each Yatra Stop
interface TravelStageConfig {
  stage: number;
  stopNumber: number;
  title: string;
  sanskrit: string;
  colorName: string;
  hex: string;
  isLight: boolean;
  accentBorder: string;
  tag: string;
}

const TRAVEL_STAGES: TravelStageConfig[] = [
  {
    stage: 0,
    stopNumber: 0,
    title: 'Starting Yatra',
    sanskrit: '॥ आरम्भ यात्रा ॥',
    colorName: 'Ivory Base',
    hex: '#F7F1E5',
    isLight: true,
    accentBorder: '#B08A4A',
    tag: 'Base Departure'
  },
  {
    stage: 1,
    stopNumber: 1,
    title: 'Puri Jagannath Dham',
    sanskrit: '॥ भागीरथी सलिल ॥',
    colorName: 'Sand Beige',
    hex: '#D9C6A8',
    isLight: true,
    accentBorder: '#B08A4A',
    tag: 'Stop 01 • Puri'
  },
  {
    stage: 2,
    stopNumber: 2,
    title: 'Kailash Mansarovar Yatra',
    sanskrit: '॥ अनन्त वायु ॥',
    colorName: 'Soft Sage Olive',
    hex: '#66705A',
    isLight: false,
    accentBorder: '#D9C6A8',
    tag: 'Stop 02 • Kailash'
  },
  {
    stage: 3,
    stopNumber: 3,
    title: 'Kolkata Kali Darshan',
    sanskrit: '॥ दिव्य कुङ्कुम ॥',
    colorName: 'Taupe Brown',
    hex: '#343C42',
    isLight: false,
    accentBorder: '#B08A4A',
    tag: 'Stop 03 • Kolkata'
  },
  {
    stage: 4,
    stopNumber: 4,
    title: 'Kamakhya Shakti Peeth',
    sanskrit: '॥ पावक अग्नि ॥',
    colorName: 'Muted Saffron',
    hex: '#C7833D',
    isLight: false,
    accentBorder: '#D9C6A8',
    tag: 'Stop 04 • Kamakhya'
  },
  {
    stage: 5,
    stopNumber: 5,
    title: 'Khatu Shyam - Vrindavan',
    sanskrit: '॥ तुलसी दल ॥',
    colorName: 'Soft Sage Olive',
    hex: '#66705A',
    isLight: false,
    accentBorder: '#B08A4A',
    tag: 'Stop 05 • Vrindavan'
  },
  {
    stage: 6,
    stopNumber: 6,
    title: 'All Sacred Yatras & Circuits',
    sanskrit: '॥ सुवर्ण तेजः ॥',
    colorName: 'Antique Gold',
    hex: '#B08A4A',
    isLight: false,
    accentBorder: '#F7F1E5',
    tag: 'Grand Consecration'
  }
];

interface TravelSectionProps {
  onViewAllYatras?: () => void;
}

export const TravelSection: React.FC<TravelSectionProps> = ({ onViewAllYatras }) => {
  const [inspectYatra, setInspectYatra] = useState<YatraPackage | null>(null);
  const [showAllPackagesModal, setShowAllPackagesModal] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Track vertical scroll across the generous section height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll progress using spring physics for relaxed, controlled pacing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
    restDelta: 0.0001,
  });

  // Responsive camera-tracking translation: ensures the airplane is always visible and framed on mobile & desktop
  const isMobileOrTablet = windowWidth < 1024;

  const trackX = useTransform(smoothProgress, (p) => {
    if (!isMobileOrTablet) {
      // Standard desktop glide
      return `${20 - p * 1700}px`;
    }

    // On mobile / tablet: Camera automatically follows the airplane's progress along the 2850px highway
    // Piecewise interpolation matching busX keyframes: [60, 300, 740, 1180, 1620, 2060, 2500, 2740]
    let curBusX = 60;
    if (p <= 0.06) {
      curBusX = 60 + (p / 0.06) * (300 - 60);
    } else if (p <= 0.22) {
      curBusX = 300 + ((p - 0.06) / (0.22 - 0.06)) * (740 - 300);
    } else if (p <= 0.40) {
      curBusX = 740 + ((p - 0.22) / (0.40 - 0.22)) * (1180 - 740);
    } else if (p <= 0.58) {
      curBusX = 1180 + ((p - 0.40) / (0.58 - 0.40)) * (1620 - 1180);
    } else if (p <= 0.76) {
      curBusX = 1620 + ((p - 0.58) / (0.76 - 0.58)) * (2060 - 1620);
    } else if (p <= 0.94) {
      curBusX = 2060 + ((p - 0.76) / (0.94 - 0.76)) * (2500 - 2060);
    } else {
      curBusX = 2500 + ((p - 0.94) / (1.0 - 0.94)) * (2740 - 2500);
    }

    // Desired anchor on screen for the airplane (centered around 36% - 40% of screen width)
    const targetScreenX = Math.max(75, windowWidth * 0.38);
    let desiredTrackX = targetScreenX - curBusX;

    // Bounds limit so we don't over-shift before beginning or beyond the end
    const minTrackX = windowWidth - 2850;
    if (desiredTrackX > 20) desiredTrackX = 20;
    if (desiredTrackX < minTrackX) desiredTrackX = minTrackX;

    return `${desiredTrackX}px`;
  });

  // Bus X translation along the curvy highway track directly visiting each card's point & final CTA
  const busX = useTransform(
    smoothProgress,
    [0, 0.06, 0.22, 0.40, 0.58, 0.76, 0.94, 1],
    ["60px", "300px", "740px", "1180px", "1620px", "2060px", "2500px", "2740px"]
  );

  // Bus Y translation following the CURVY wave (Directly visiting Point 1 -> 5 -> Final CTA)
  const busY = useTransform(
    smoothProgress,
    [0, 0.06, 0.22, 0.40, 0.58, 0.76, 0.94, 1],
    ["0px", "-75px", "75px", "-75px", "75px", "-75px", "75px", "0px"]
  );

  // Map busY to CSS top position centered on road
  const busTop = useTransform(busY, (val) => `calc(50% + ${val})`);

  // Bus tilt rotation angle: smooth banking into curves (-18° climbing, +18° descending)
  const busRotate = useTransform(
    smoothProgress,
    [0, 0.03, 0.06, 0.12, 0.18, 0.22, 0.28, 0.36, 0.40, 0.46, 0.54, 0.58, 0.64, 0.72, 0.76, 0.82, 0.90, 0.94, 1],
    [-18, -18, 0, 18, 18, 0, -18, -18, 0, 18, 18, 0, -18, -18, 0, 18, 18, 0, 0]
  );

  // Update current active stop stage based on scroll progress (guarded to avoid 60fps re-renders)
  useEffect(() => {
    let lastStage = 0;
    const unsubscribe = smoothProgress.on("change", (latest) => {
      let stage = 0;
      if (latest < 0.045) {
        stage = 0; // Starting point before scrolling: Base Ivory (#F7F1E5)
      } else if (latest < 0.16) {
        stage = 1; // Stop 1 (Puri Jagannath): Sand Beige (#D9C6A8)
      } else if (latest < 0.33) {
        stage = 2; // Stop 2 (Kailash Mansarovar): Soft Sage Olive (#66705A)
      } else if (latest < 0.51) {
        stage = 3; // Stop 3 (Kolkata Kali Darshan): Taupe Brown (#343C42)
      } else if (latest < 0.69) {
        stage = 4; // Stop 4 (Kamakhya Shakti Peeth): Muted Saffron (#C7833D)
      } else if (latest < 0.88) {
        stage = 5; // Stop 5 (Khatu Shyam - Vrindavan): Soft Sage Olive (#66705A)
      } else {
        stage = 6; // Final Station (All Packages): Antique Gold (#B08A4A)
      }
      if (stage !== lastStage) {
        lastStage = stage;
        setActiveStage(stage);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const currentStageConfig = TRAVEL_STAGES[activeStage] || TRAVEL_STAGES[0];



  return (
    <section
      id="travel-packages"
      className="relative w-full bg-[#F7F1E5] select-none"
    >
      {/* Anchor alias for #travel */}
      <div id="travel" className="absolute top-0 left-0 pointer-events-none" />

      {/* ======================================================== */}
      {/* 1. SECTION HEADING: BOLD POSTER WITH SANATANA MOTIFS     */}
      {/* Inspired by bold typography intertwined with sacred icons*/}
      {/* ======================================================== */}
      <div className="relative w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#F7F1E5] text-center overflow-hidden select-none">
        {/* Sacred Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#B08A4A]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
          
          {/* Eyebrow Inscription */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F6E5B]/10 border border-[#8F6E5B]/20 text-[#8F6E5B] text-xs font-dm font-semibold tracking-widest uppercase mb-6 shadow-xs"
          >
            <Compass className="w-3.5 h-3.5 text-[#8F6E5B]" />
            <span>॥ अनन्त तीर्थ यात्रा ॥ &bull; REIMAGINING PILGRIMAGE</span>
          </motion.div>

          {/* ==================================================== */}
          {/* BOLD 3-LINE POSTER HERO                              */}
          {/* ==================================================== */}
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
            className="relative w-full max-w-5xl my-2 sm:my-4 flex flex-col items-center select-none"
          >
            {/* ----------------- LINE 1: WHO SAYS + CIRCULAR SEAL ----------------- */}
            <div className="relative flex items-center justify-center gap-3 sm:gap-6 flex-wrap z-10">
              <div className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-semibold text-[#8F6E5B] tracking-[-0.02em] leading-[0.88] uppercase flex items-center gap-3 sm:gap-5">
                {["WHO", "SAYS"].map((word, i) => (
                  <motion.span 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 32, scale: 0.94 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -6, color: "#8F6E5B" }}
                    className="inline-block cursor-pointer transition-colors"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Celestial Yatra Compass & Himalayan Mandir Seal - In Open Space Right After WHO SAYS */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.3 }}
                className="relative inline-block shrink-0 cursor-pointer group z-20 ml-2 sm:ml-4 -mt-2 sm:-mt-4 md:-mt-6"
              >
                <div className="relative w-22 h-22 sm:w-28 sm:h-28 md:w-34 md:h-34 lg:w-38 lg:h-38 drop-shadow-[0_16px_35px_rgba(143,110,91,0.38)] transition-transform duration-300 group-hover:scale-108">
                  
                  {/* 1. Rotating Outer Celestial Starburst & Compass Text Ring */}
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    viewBox="0 0 200 200"
                    className="absolute inset-0 w-full h-full select-none overflow-visible pointer-events-none"
                  >
                    <defs>
                      {/* Circular text path centered at 100,100 with radius 84 */}
                      <path
                        id="travelYatraCirclePath"
                        d="M 100,100 m -84,0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
                      />
                    </defs>

                    {/* 8-Pointed Subtle Orbiting Star Ticks */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                      <g key={`star-tick-${angle}`} transform={`rotate(${angle} 100 100)`}>
                        <polygon points="100,6 102.5,12 100,10 97.5,12" fill="#C7833D" />
                      </g>
                    ))}

                    {/* Circular Rotating Pilgrimage Text: Sanatana Dham Yatras */}
                    <text
                      fill="#8F6E5B"
                      className="font-dm font-bold text-[9.5px] uppercase tracking-[0.22em]"
                    >
                      <textPath
                        href="#travelYatraCirclePath"
                        startOffset="0%"
                      >
                        ✦ SANATANA DHAM YATRAS ✦ SANATANA DHAM YATRAS ✦ SANATANA DHAM YATRAS ✦
                      </textPath>
                    </text>
                  </motion.svg>

                  {/* 2. Static Inner Sacred Himalayan Mandir & Compass Rose Medallion */}
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full select-none">
                    {/* Outer 8-Pointed Celestial Compass Star Points */}
                    <g fill="#B08A4A" opacity="0.9">
                      <polygon points="100,22 108,54 100,50 92,54" />
                      <polygon points="100,178 108,146 100,150 92,146" />
                      <polygon points="22,100 54,92 50,100 54,108" />
                      <polygon points="178,100 146,92 150,100 146,108" />
                      <polygon points="45,45 68,62 66,70 58,68" />
                      <polygon points="155,155 132,138 134,130 142,132" />
                      <polygon points="155,45 138,68 130,66 132,58" />
                      <polygon points="45,155 68,138 66,130 58,132" />
                    </g>

                    {/* Inner Circular Solid Medallion */}
                    <circle cx="100" cy="100" r="64" fill="#8F6E5B" stroke="#B08A4A" strokeWidth="2.5" />
                    <circle cx="100" cy="100" r="59" fill="none" stroke="#D9C6A8" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />

                    {/* Rising Surya Teertha Sun Rays Background */}
                    <g stroke="#C7833D" strokeWidth="1" opacity="0.5" strokeLinecap="round">
                      <line x1="100" y1="100" x2="68" y2="60" />
                      <line x1="100" y1="100" x2="84" y2="52" />
                      <line x1="100" y1="100" x2="100" y2="48" />
                      <line x1="100" y1="100" x2="116" y2="52" />
                      <line x1="100" y1="100" x2="132" y2="60" />
                    </g>

                    {/* Sacred Himalayan Mountain Peak Silhouette */}
                    <path
                      d="M 52,132 L 80,95 L 98,112 L 122,86 L 148,132 Z"
                      fill="#765846"
                      opacity="0.8"
                    />

                    {/* Sacred Himalayan Temple Shikhara & Spire */}
                    <g fill="#F7F1E5" stroke="#B08A4A" strokeWidth="0.8">
                      {/* Kalasha Finial & Fluttering Saffron Flag (Dhwaja) */}
                      <path d="M 100,56 L 100,66" stroke="#D9C6A8" strokeWidth="1.5" />
                      <polygon points="100,57 113,62 100,67" fill="#C7833D" stroke="none" />
                      <circle cx="100" cy="67" r="2.5" fill="#D9C6A8" />
                      
                      {/* Stepped Curvilinear Shikhara Spire */}
                      <path d="M 100,68 C 94,76 90,88 88,104 L 112,104 C 110,88 106,76 100,68 Z" fill="#F7F1E5" />
                      
                      {/* Shikhara Horizontal Ribs */}
                      <line x1="94" y1="78" x2="106" y2="78" stroke="#8F6E5B" strokeWidth="0.8" />
                      <line x1="91" y1="88" x2="109" y2="88" stroke="#8F6E5B" strokeWidth="0.8" />
                      <line x1="89" y1="96" x2="111" y2="96" stroke="#8F6E5B" strokeWidth="0.8" />

                      {/* Garbhagriha / Mandapa Base */}
                      <rect x="82" y="104" width="36" height="26" rx="1.5" fill="#F7F1E5" />
                      
                      {/* Temple Arched Sanctum Doorway */}
                      <path d="M 94,130 L 94,115 C 94,110 106,110 106,115 L 106,130 Z" fill="#332C25" stroke="none" />
                      <circle cx="100" cy="116" r="2" fill="#C7833D" />

                      {/* Temple Plinth Foundation Steps */}
                      <rect x="76" y="130" width="48" height="4" rx="1" fill="#D9C6A8" />
                      <rect x="72" y="134" width="56" height="4" rx="1" fill="#B08A4A" />
                    </g>

                    {/* Small Sparkling Celestial Star Accents */}
                    <circle cx="68" cy="74" r="1.5" fill="#D9C6A8" opacity="0.9" />
                    <circle cx="132" cy="72" r="1.8" fill="#D9C6A8" opacity="0.9" />
                  </svg>

                </div>
              </motion.div>
            </div>

            {/* ----------------- LINE 2: PILGRIMAGE IS JUST ----------------- */}
            <div className="relative flex items-center justify-center gap-2 sm:gap-4 flex-wrap z-20 my-1 sm:my-2">
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 32, scale: 0.94 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
                  }
                }}
                whileHover={{ scale: 1.06, y: -6 }}
                className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-semibold tracking-[-0.02em] leading-[0.88] uppercase inline-block cursor-pointer text-[#8F6E5B]"
              >
                PILGRIMAGE
              </motion.span>

              <div className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-semibold text-[#8F6E5B] tracking-[-0.02em] leading-[0.88] uppercase flex items-center gap-2 sm:gap-4">
                {["IS", "JUST"].map((word, i) => (
                  <motion.span 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 32, scale: 0.94 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -6, color: "#8F6E5B" }}
                    className="inline-block cursor-pointer transition-colors"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* ----------------- LINE 3: FOR THE ELDERS? ----------------- */}
            <div className="relative flex items-center justify-center gap-3 sm:gap-6 flex-wrap z-10">
              <div className="font-cormorant text-5xl sm:text-7xl md:text-8xl lg:text-[104px] font-semibold text-[#8F6E5B] tracking-[-0.02em] leading-[0.88] uppercase inline-flex items-baseline select-none gap-2 sm:gap-4">
                {["FOR", "THE"].map((word, i) => (
                  <motion.span 
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 32, scale: 0.94 },
                      visible: { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1, 
                        transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -6, color: "#8F6E5B" }}
                    className="inline-block cursor-pointer transition-colors"
                  >
                    {word}
                  </motion.span>
                ))}
                
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, y: 32, scale: 0.94 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1, 
                      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  whileHover={{ scale: 1.08, y: -6, color: "#8F6E5B" }}
                  className="inline-block text-[#8F6E5B] cursor-pointer transition-colors"
                >
                  ELDERS
                </motion.span>
                
                {/* Bouncing Animated Question Mark */}
                <motion.span 
                  variants={{
                    hidden: { opacity: 0, scale: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      y: 0, 
                      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
                    }
                  }}
                  animate={{ 
                    rotate: [0, 8, -6, 0],
                    scale: [1, 1.15, 0.95, 1],
                    y: [0, -6, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ scale: 1.35, rotate: 22, color: "#8F6E5B" }}
                  className="text-[#8F6E5B] inline-block ml-0.5 origin-bottom cursor-pointer transition-colors"
                >
                  ?
                </motion.span>
              </div>
            </div>

          </motion.div>

          {/* Subtitle / Devotional Mission Statement */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 sm:mt-8 font-dm text-sm sm:text-base md:text-lg text-[#8F6E5B]/85 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            ॥ तीर्थात सुखम् ॥ Reimagining Bharat&apos;s sacred Dham yatras with luxury multi-gen transport, reserved VIP Garbhagriha darshans &amp; certified Vedic scholars.
          </motion.p>

        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. PINNED HORIZONTAL LAYOUT: CARDS ON EACH POINT ON CURVE */}
      {/* Base background animates dynamically with brand palette   */}
      {/* ======================================================== */}
      <div
        ref={containerRef}
        className="relative w-full h-[540vh] sm:h-[460vh] md:h-[400vh] lg:h-[380vh] transition-colors duration-1000 ease-out"
        style={{ backgroundColor: currentStageConfig.hex }}
      >
        {/* Sticky Viewport locks on screen for horizontal travel */}
        <div 
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-4 px-4 sm:px-8 transition-colors duration-1000 ease-out"
          style={{ backgroundColor: currentStageConfig.hex }}
        >

          
          {/* Subtle Ambient Glows dynamically tinted to current stage */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full blur-[170px] pointer-events-none transition-colors duration-1000 opacity-35"
            style={{ backgroundColor: currentStageConfig.hex }}
          />

          {/* Geometric Background Texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #d49a3f 1px, transparent 0)`,
              backgroundSize: '36px 36px',
            }}
          />

          {/* ---------------------------------------------------- */}
          {/* THE CURVY HIGHWAY: CARDS ATTACHED DIRECTLY ON POINTS */}
          {/* ---------------------------------------------------- */}
          <div className="relative z-10 w-full flex-1 flex items-center overflow-visible my-auto">
            
            <motion.div
              style={{ x: trackX }}
              className="relative w-[2850px] h-[540px] flex items-center overflow-visible select-none will-change-transform transform-gpu"
            >
              {/* CURVY S-WAVE PILGRIMAGE HIGHWAY ROAD CONNECTING ALL 5 POINTS + FINAL CTA */}
              <svg
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[2850px] h-[540px] pointer-events-none z-10 overflow-visible"
                viewBox="0 0 2850 540"
                fill="none"
              >
                {/* Wide Ambient Amber Road Glow Behind Curve */}
                <path
                  d="M 60,270 C 160,270 200,195 300,195 C 420,195 620,345 740,345 C 860,345 1060,195 1180,195 C 1300,195 1500,345 1620,345 C 1740,345 1940,195 2060,195 C 2180,195 2380,345 2500,345 C 2580,345 2660,270 2760,270"
                  stroke="#f59e0b"
                  strokeWidth="20"
                  strokeOpacity="0.22"
                  strokeLinecap="round"
                  filter="blur(12px)"
                />

                {/* Outer Golden Highway Ribbon (Curvy Roadway Bed) */}
                <path
                  d="M 60,270 C 160,270 200,195 300,195 C 420,195 620,345 740,345 C 860,345 1060,195 1180,195 C 1300,195 1500,345 1620,345 C 1740,345 1940,195 2060,195 C 2180,195 2380,345 2500,345 C 2580,345 2660,270 2760,270"
                  stroke="#78350f"
                  strokeWidth="10"
                  strokeOpacity="0.8"
                  strokeLinecap="round"
                />

                {/* Inactive Dashed Golden Centerline */}
                <path
                  d="M 60,270 C 160,270 200,195 300,195 C 420,195 620,345 740,345 C 860,345 1060,195 1180,195 C 1300,195 1500,345 1620,345 C 1740,345 1940,195 2060,195 C 2180,195 2380,345 2500,345 C 2580,345 2660,270 2760,270"
                  stroke="#d49a3f"
                  strokeWidth="2.5"
                  strokeDasharray="9 9"
                  strokeOpacity="0.65"
                  strokeLinecap="round"
                />

                {/* Active Glowing Filled Laser Curve that fills with scroll */}
                <motion.path
                  d="M 60,270 C 160,270 200,195 300,195 C 420,195 620,345 740,345 C 860,345 1060,195 1180,195 C 1300,195 1500,345 1620,345 C 1740,345 1940,195 2060,195 C 2180,195 2380,345 2500,345 C 2580,345 2660,270 2760,270"
                  stroke="url(#activeCurvyGrad)"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  style={{
                    pathLength: smoothProgress,
                  }}
                />

                <defs>
                  <linearGradient id="activeCurvyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
              </svg>

              {/* THE TRAVELING AIRPLANE POINTER (GLIDING DIRECTLY ON THE CURVY PILGRIMAGE PATH) */}
              <motion.div
                style={{
                  left: busX,
                  top: busTop,
                  rotate: busRotate,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto filter drop-shadow-[0_14px_28px_rgba(112,91,76,0.35)] will-change-transform transform-gpu"
              >
                {/* Floating Flight Tag Badge */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-md bg-[#241306] border border-[#f59e0b]/80 text-[10px] font-dm font-semibold text-[#fde68a] uppercase tracking-wider shadow-2xl flex items-center gap-1.5 pointer-events-none">
                  <span 
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: currentStageConfig.hex }}
                  />
                  <span>
                    {activeStage === 0 
                      ? 'Yatra Flight' 
                      : activeStage <= 5 
                        ? `Stop 0${activeStage}` 
                        : 'Destination'}
                  </span>
                </div>

                {/* Horizontal Airplane Logo */}
                <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                  <HorizontalYatraAirplane className="w-28 sm:w-34 h-14 sm:h-16" />
                </div>
              </motion.div>

              {/* 5 DHAM CARDS ANCHORED DIRECTLY ON EACH POINT OF THE CURVE */}
              {DHAM_STOPS.map((stop, idx) => {
                const pkg = TRAVEL_PACKAGES[stop.pkgIndex];
                const isCurrent = (idx + 1) === activeStage;

                return (
                  <div
                    key={pkg.id}
                    style={{
                      left: `${stop.x}px`,
                      top: stop.isTop ? 'calc(50% - 75px)' : 'calc(50% + 75px)',
                      transform: stop.isTop ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
                    }}
                    className="absolute z-20 flex flex-col items-center"
                  >
                    {/* The Milestone Beacon Station mounted DIRECTLY at the point of contact with the road */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 z-30 flex items-center justify-center ${
                        stop.isTop
                          ? 'bottom-0 translate-y-1/2'
                          : 'top-0 -translate-y-1/2'
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-xl ${
                          isCurrent
                            ? 'bg-[#b45309] border-[#fde047] scale-125 shadow-[0_0_20px_rgba(245,158,11,0.95)]'
                            : 'bg-[#1b1007] border-[#d49a3f]/80'
                        }`}
                      >
                        <span className="font-cormorant text-[13px] font-semibold text-[#fde047]">
                          0{stop.stopNumber}
                        </span>
                      </div>
                    </div>

                    {/* Small Square Tilt Card placed directly ON this point */}
                    <div className="relative">
                      <TiltCard
                        compact={true}
                        stopNumber={stop.stopNumber}
                        circuit={pkg.circuit.toUpperCase()}
                        title={pkg.title}
                        imageSrc={pkg.image}
                        imageAlt={pkg.title}
                        ctaLabel="View More Details"
                        onSelect={() => setInspectYatra(pkg)}
                        className={
                          isCurrent
                            ? 'ring-2 ring-[#f59e0b] shadow-[0_25px_50px_rgba(245,158,11,0.35)] scale-[1.03]'
                            : ''
                        }
                      />
                    </div>
                  </div>
                );
              })}

              {/* ======================================================== */}
              {/* FINAL CTA CARD: "VIEW ALL PACKAGES" (RECTANGULAR SHAPE)  */}
              {/* ======================================================== */}
              <div
                style={{
                  left: '2500px',
                  top: 'calc(50% + 75px)',
                  transform: 'translate(-50%, 0)',
                }}
                className="absolute z-20 flex flex-col items-center"
              >
                {/* Milestone Station Beacon */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 z-30 flex items-center justify-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-xl ${
                    activeStage >= 6
                      ? 'bg-[#b45309] border-[#fde047] scale-125 shadow-[0_0_20px_rgba(245,158,11,0.95)]'
                      : 'bg-[#1b1007] border-[#d49a3f]/80'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                  </div>
                </div>

                {/* Non-Square Rectangular Luxury CTA Card */}
                <div
                  onClick={() => {
                    if (onViewAllYatras) {
                      onViewAllYatras();
                    } else {
                      setShowAllPackagesModal(true);
                    }
                  }}
                  className={`relative w-[290px] sm:w-[320px] p-5 rounded-2xl bg-gradient-to-br from-[#343C42] via-[#7D5E4C] to-[#694D3D] border-2 border-[#B08A4A]/50 hover:border-[#D9C6A8] shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_25px_60px_rgba(51,44,37,0.5)] transition-all duration-300 group cursor-pointer flex flex-col justify-between select-none ${
                    activeStage >= 6
                      ? 'ring-2 ring-[#B08A4A] shadow-[0_25px_50px_rgba(176,138,74,0.35)] scale-[1.03]'
                      : ''
                  }`}
                >
                  {/* Glowing background ambient gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C7833D]/15 via-[#B08A4A]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />

                  {/* Top Tag & Sacred Counter */}
                  <div className="relative z-10 flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#66705A]/30 border border-[#66705A]/60 text-[#D9C6A8] text-[10px] font-dm font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#D9C6A8]" />
                      <span>Full Catalog</span>
                    </span>
                    <span className="text-[10px] font-dm font-bold text-[#D9C6A8] uppercase tracking-widest">
                      20+ Yatras
                    </span>
                  </div>

                  {/* Main Title & Teaser */}
                  <div className="relative z-10 mb-4">
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-semibold text-[#F7F1E5] group-hover:text-[#D9C6A8] transition-colors leading-tight mb-2">
                      View All Packages
                    </h3>
                    <p className="font-dm text-xs text-[#D9C6A8]/80 leading-relaxed">
                      Explore all 4 Dhams, 12 Jyotirlingas & 51 Shaktipeeth circuits across Bharat with VIP Darshan.
                    </p>
                  </div>

                  {/* CTA Button in Muted Saffron & Antique Gold */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onViewAllYatras) {
                        onViewAllYatras();
                      } else {
                        setShowAllPackagesModal(true);
                      }
                    }}
                    className="relative z-10 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#C7833D] via-[#B08A4A] to-[#C7833D] hover:brightness-110 text-[#F7F1E5] font-dm font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-black/40 group-hover:scale-[1.02] active:scale-95 border border-[#D9C6A8]/40 cursor-pointer"
                  >
                    <span>View All Packages</span>
                    <ArrowRight className="w-4 h-4 text-[#F7F1E5] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Detail & Booking Modal for Selected Yatra */}
      {inspectYatra && (
        <YatraModal
          yatra={inspectYatra}
          onClose={() => setInspectYatra(null)}
        />
      )}

      {/* Full Packages Catalog Overview Modal */}
      {showAllPackagesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div
            className="relative w-full max-w-4xl bg-gradient-to-b from-[#190e06] via-[#120a04] to-[#0a0502] border border-[#d49a3f]/50 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(245,158,11,0.25)] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Top Glow */}
            <div className="absolute top-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowAllPackagesModal(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#2a170a] border border-[#d49a3f]/40 text-[#fde047] hover:bg-[#3d200e] hover:border-[#f59e0b] flex items-center justify-center transition-all cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#361e0b] border border-[#d49a3f]/40 text-[#fde047] text-xs font-dm font-bold tracking-wide uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Complete Sacred Yatra Directory</span>
              </div>
              <h3 className="font-cormorant text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#fae8c6] via-[#fde047] to-[#d49a3f]">
                All Divine Pilgrimage Packages
              </h3>
              <p className="font-dm text-xs sm:text-sm text-[#cfc0ae] mt-1">
                Select any sacred destination to explore the full day-by-day itinerary and reserve confirmed VIP Darshan slots.
              </p>
            </div>

            {/* Grid of all Packages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {TRAVEL_PACKAGES.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  onClick={() => {
                    setShowAllPackagesModal(false);
                    setInspectYatra(pkg);
                  }}
                  className="group relative rounded-2xl bg-[#221307]/90 border border-[#d49a3f]/30 hover:border-[#fde047] p-4 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg hover:shadow-[0_10px_30px_rgba(245,158,11,0.25)]"
                >
                  <div>
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-[#d49a3f]/30">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-[#fde047] text-[10px] font-dm font-bold uppercase">
                        Stop 0{idx + 1}
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#241306]/90 border border-[#f59e0b]/50 text-[#fae8c6] text-[10px] font-dm font-bold">
                        ₹{pkg.pricePerPerson.toLocaleString()}
                      </div>
                    </div>

                    <span className="text-[10px] font-dm font-bold uppercase text-[#d49a3f] tracking-wider">
                      {pkg.circuit}
                    </span>
                    <h4 className="font-cormorant text-base sm:text-lg font-semibold text-white group-hover:text-[#fde68a] transition-colors leading-snug line-clamp-1 mb-1">
                      {pkg.title}
                    </h4>
                    <p className="font-dm text-[11px] text-[#bda893] line-clamp-2 leading-relaxed mb-3">
                      {pkg.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#d49a3f]/20 flex items-center justify-between">
                    <span className="text-[10px] font-dm text-[#e6d8c3] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#f59e0b]" />
                      <span>{pkg.durationDays}D/{pkg.durationNights}N</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-dm font-bold text-[#fde047] group-hover:translate-x-0.5 transition-transform">
                      <span>Itinerary</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
