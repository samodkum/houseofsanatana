import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Sparkles, 
  HeartHandshake, 
  Briefcase, 
  Hammer, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Compass, 
  Star, 
  Flame, 
  Calendar, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  ShoppingBag, 
  ExternalLink,
  HelpCircle,
  ChevronDown,
  Crown,
  Video,
  Camera,
  PenTool,
  Music,
  Building2,
  Handshake,
  TrendingUp,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Bell,
  Sun,
  Moon,
  Gift,
  FileText,
  ChevronLeft,
  ChevronRight,
  Award
} from 'lucide-react';
import { LotusLineArt, MandalaGeometry, TempleArchitectureLine, IndianJaaliPattern, DividerOrnamental } from './ui/SacredPatterns';
import { SunIcon } from './SunIcon';
import { Footer } from './Footer';
import { HeaderActionButtons } from './HeaderActionButtons';
import { openShopifyAccount } from '../lib/shopify';

export type MainJoinWay = 'join-hos' | 'partnership' | 'co-creator';

interface JoinHOSPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateMall: () => void;
  onNavigateTravel: () => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
  cartCount?: number;
  wishlistCount?: number;
  initialPathway?: MainJoinWay;
}

export interface JoinHeroSlide {
  id: MainJoinWay;
  leftWords: { accent: string; bold1: string; bold2: string };
  rightWords: { line1: string; line2: string };
  image: string;
  cardTitle: string;
  badgeName: string;
  badgeRole: string;
}

export const JOIN_PAGE_HERO_SLIDES: JoinHeroSlide[] = [
  {
    id: 'join-hos',
    leftWords: { accent: 'Daily', bold1: 'Home', bold2: 'Puja' },
    rightWords: { line1: 'Family', line2: 'Sanctum' },
    image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=1200&q=80',
    cardTitle: 'Family HOS Sanctum',
    badgeName: 'Aarav & Priya Sharma',
    badgeRole: 'Sanatana Family Sadhaka'
  },
  {
    id: 'partnership',
    leftWords: { accent: 'Temple', bold1: 'Trust', bold2: 'Alliance' },
    rightWords: { line1: 'Dharmic', line2: 'Peethams' },
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    cardTitle: 'Temple & Peetham Trust Alliances',
    badgeName: 'Swami Bodhatmananda',
    badgeRole: 'Kashi Peetham Trustee'
  },
  {
    id: 'co-creator',
    leftWords: { accent: 'Sacred', bold1: 'Guild', bold2: 'Artisans' },
    rightWords: { line1: 'Devotional', line2: 'Filmmakers' },
    image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=1200&q=80',
    cardTitle: 'Artisan & Devotional Guilds',
    badgeName: 'Madhusudan Acharya',
    badgeRole: '5th Gen Brass Artisan & Sculptor'
  }
];

// Sound synthesizer for Sacred Temple Bell using browser Web Audio API
const playTempleBellSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Fundamental + sacred harmonics (mimicking a bronze temple ghanta)
    const freqs = [528, 1056, 1584, 2112, 2640];
    const gains = [0.6, 0.35, 0.2, 0.1, 0.05];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gains[idx], ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 4.0);
    });
  } catch {
    // Audio context may require user interaction
  }
};

export const JoinHOSPage: React.FC<JoinHOSPageProps> = ({
  onNavigateHome,
  onNavigateMall,
  onNavigateTravel,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  cartCount = 0,
  wishlistCount = 0,
  initialPathway = 'join-hos'
}) => {
  const [activeWay, setActiveWay] = useState<MainJoinWay>(initialPathway);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ==========================================
  // WAY 1: JOIN HOS STATE & UNLOCKED PORTAL
  // ==========================================
  const [hosForm, setHosForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    ishtaDevata: 'Lord Shiva (Mahadev)',
    sankalpa: 'Daily Home Sadhana & Family Purity'
  });
  const [isHosSubmitted, setIsHosSubmitted] = useState(false);
  const [memberPassId, setMemberPassId] = useState('HOS-SANATAN-2026-7842');
  const [isDiyaLit, setIsDiyaLit] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAudioTrack, setActiveAudioTrack] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  // ==========================================
  // WAY 2: PARTNERSHIP STATE
  // ==========================================
  const [partnerForm, setPartnerForm] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    partnerType: 'Temple & Peetham Trust',
    scale: 'National / Pan-India',
    message: ''
  });
  const [isPartnerSubmitted, setIsPartnerSubmitted] = useState(false);

  // ==========================================
  // WAY 3: CO-CREATOR (CONTENT) STATE
  // ==========================================
  const [creatorForm, setCreatorForm] = useState({
    creatorName: '',
    handleOrLink: '',
    email: '',
    phone: '',
    creativeMedium: 'Video & Short-Form Filmmaking',
    pitch: '',
    equipment: 'Sony A7IV / 4K Drone / Studio Mic'
  });
  const [isCreatorSubmitted, setIsCreatorSubmitted] = useState(false);

  // Sync hash routing if changed
  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#partnership' || hash === '#partner') {
      setActiveWay('partnership');
    } else if (hash === '#co-creator' || hash === '#cocreate' || hash === '#creator') {
      setActiveWay('co-creator');
    } else {
      setActiveWay('join-hos');
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleHosSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const newPass = `HOS-DIKSHA-2026-${rand}`;
    setMemberPassId(newPass);
    setIsHosSubmitted(true);
    playTempleBellSound();
    showToast(`Pranam ${hosForm.name || 'Seeker'}! Sacred Sanctum Access Unlocked.`);
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPartnerSubmitted(true);
    showToast('Partnership proposal received. Our trust directors will connect within 24 hours.');
  };

  const handleCreatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatorSubmitted(true);
    showToast(`Welcome to the Creator Guild, ${creatorForm.creatorName || 'Creator'}! Creator kit on the way.`);
  };

  const copyPromoCode = () => {
    navigator.clipboard.writeText('SANCTUM108');
    setCopiedCode(true);
    showToast('Promo code "SANCTUM108" copied! Enjoy 10% off at Santana Mall.');
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const audioTracks = [
    { title: 'Gayatri Mahamantra (108 Chants)', singer: 'Varanasi Vedic Pathashala', duration: '14:20' },
    { title: 'Mahamrityunjaya Stotram', singer: 'Ujjain Mahakal Mandir Chants', duration: '11:45' },
    { title: 'Brahma Muhurta Dhyana Svara', singer: 'Rudra Veena & Tanpura Ambient', duration: '21:08' },
    { title: 'Shiva Tandava Stotram', singer: 'Classical Dhrupad Chorus', duration: '08:35' },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#F7F1E5] text-[#8F6E5B] overflow-x-hidden font-dm selection:bg-[#C7833D]/20 selection:text-[#8F6E5B]">
      
      {/* ======================================================== */}
      {/* 1. TOP BREADCRUMB & CONTEXTUAL NAVIGATION BAR            */}
      {/* ======================================================== */}
      <div className="sticky top-0 z-40 w-full bg-[#F7F1E5]/95 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          
          {/* Header Action Buttons aligned to the right */}
          <div className="flex w-full items-center justify-end gap-3 sm:gap-5">
            {/* Unified Expanding Action Controls: Wishlist, Basket, and Account */}
            <HeaderActionButtons
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              onOpenWishlist={onOpenWishlist || (() => {})}
              onOpenCart={onOpenCart || (() => {})}
              onOpenAccount={onOpenAccount || openShopifyAccount}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. HERO SECTION: THE THREE WAYS TO JOIN HOUSE OF SANATAN */}
      {/* ======================================================== */}
      <section className="relative w-full pt-10 sm:pt-22 pb-10 sm:pb-24 overflow-hidden bg-gradient-to-b from-[#F7F1E5] via-[#EFE6D5] to-[#F7F1E5]">
        
        {/* Subtle Sacred Geometry Watermark Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #8F6E5B 1.4px, transparent 1.4px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient Warm Golden Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-radial from-[#C7833D]/15 via-transparent to-transparent blur-3xl pointer-events-none" />
        <div className="hidden sm:block absolute -left-16 top-1/4 w-80 h-80 opacity-20 pointer-events-none">
          <MandalaGeometry size={320} color="#B08A4A" />
        </div>
        <div className="hidden sm:block absolute -right-16 top-1/4 w-80 h-80 opacity-20 pointer-events-none">
          <TempleArchitectureLine size={320} color="#B08A4A" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Top Live Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#66705A]/10 border border-[#66705A]/25 text-[#3E4734] text-[10px] sm:text-xs font-dm font-semibold mb-3.5 sm:mb-6 shadow-xs"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#66705A] shadow-[0_0_8px_rgba(102,112,90,0.6)] animate-pulse" />
            <span className="tracking-widest uppercase">॥ सङ्घ प्रवेशम् ॥ JOIN HOUSE OF SANATAN</span>
          </motion.div>

          {/* UrbanGreen Style Editorial Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-dm text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-[#1A1612] tracking-tight leading-[1.16] max-w-5xl mx-auto"
          >
            <span className="block font-light text-[#1A1612]">Reimagining Sacred Living</span>
            <span className="inline-flex items-center gap-1.5 sm:gap-4 flex-wrap justify-center mt-1 sm:mt-3">
              <span className="inline-block px-3.5 sm:px-8 py-0.5 sm:py-2.5 rounded-full bg-[#E3EBDC] text-[#22351D] font-medium text-xl xs:text-2xl sm:text-5xl md:text-6xl lg:text-[68px] leading-none shadow-xs border border-[#C5D9BA]">
                Sanatana
              </span>
              <span className="text-[#1A1612] font-light">for the Modern World</span>
            </span>
          </motion.h1>

          {/* Subtitle connecting the 3 ways to join */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 sm:mt-7 font-dm text-xs sm:text-lg md:text-xl text-[#6B5A4E] font-normal leading-relaxed max-w-3xl mx-auto"
          >
            Enter our sacred ecosystem — whether you are a devotee seeking daily family sadhana, an accredited temple trust forging dharmic alliances, or a filmmaker creating consecrated media for millions.
          </motion.p>

          {/* Pill CTA Button (matching Book a Call button from reference image) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-4 sm:mt-8 flex justify-center"
          >
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('join-three-ways-matrix');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group inline-flex items-center gap-2 sm:gap-3 pl-4 sm:pl-6 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full bg-[#1A1612] hover:bg-[#2C241D] text-white font-dm font-bold text-[11px] sm:text-sm tracking-wide shadow-[0_12px_28px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.25)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer border border-[#D9C6A8]/40"
            >
              <span>Choose Your Pathway</span>
              <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 text-[#D9C6A8] flex items-center justify-center shadow-xs group-hover:translate-x-0.5 transition-transform">
                <SunIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D9C6A8]" />
              </span>
            </button>
          </motion.div>

          {/* SVG Clip Path Definition for the Stepped Tabbed Card */}
          <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
            <defs>
              <clipPath id="tabbedCardNotchClipJoin" clipPathUnits="objectBoundingBox">
                <path d="M 0,0.065 C 0,0.028 0.025,0 0.065,0 L 0.52,0 C 0.58,0 0.58,0.075 0.64,0.075 L 0.935,0.075 C 0.975,0.075 1,0.105 1,0.145 L 1,0.935 C 1,0.975 0.975,1 0.935,1 L 0.065,1 C 0.025,1 0,0.975 0,0.935 Z" />
              </clipPath>
            </defs>
          </svg>

          {/* EDITORIAL 3-WAY STAGE (MATCHING EXACT REFERENCE IMAGE) */}
          {(() => {
            const slideIdx = activeWay === 'join-hos' ? 0 : activeWay === 'partnership' ? 1 : 2;
            const activeSlide = JOIN_PAGE_HERO_SLIDES[slideIdx] || JOIN_PAGE_HERO_SLIDES[0];

            const handlePrevSlide = () => {
              const prev = activeWay === 'join-hos' ? 'co-creator' : activeWay === 'partnership' ? 'join-hos' : 'partnership';
              setActiveWay(prev);
            };

            const handleNextSlide = () => {
              const next = activeWay === 'join-hos' ? 'partnership' : activeWay === 'partnership' ? 'co-creator' : 'join-hos';
              setActiveWay(next);
            };

            return (
              <div className="mt-6 sm:mt-14 max-w-6xl mx-auto w-full text-left">
                
                {/* 2. CENTER STAGE: FLANKING MONUMENTAL TEXT + TILTED CARD */}
                <div className="relative w-full min-h-[300px] xs:min-h-[340px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center">

                  {/* LEFT FLANKING MONUMENTAL TYPOGRAPHY */}
                  <div className="absolute left-0 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex flex-col items-start leading-[0.95]">
                    <motion.span 
                      key={`left-accent-${activeSlide.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45 }}
                      className="font-dm text-xl xs:text-2xl sm:text-6xl md:text-7xl lg:text-[84px] font-light text-[#8F987D] tracking-tight block"
                    >
                      {activeSlide.leftWords.accent}
                    </motion.span>
                    
                    <motion.span 
                      key={`left-bold1-${activeSlide.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 }}
                      className="font-dm text-xl xs:text-2xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold text-[#1A1612] tracking-tight block"
                    >
                      {activeSlide.leftWords.bold1}
                    </motion.span>
                    
                    <motion.span 
                      key={`left-bold2-${activeSlide.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.55, delay: 0.1 }}
                      className="font-dm text-xl xs:text-2xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold text-[#1A1612] tracking-tight block"
                    >
                      {activeSlide.leftWords.bold2}
                    </motion.span>
                  </div>

                  {/* RIGHT FLANKING MONUMENTAL TYPOGRAPHY */}
                  <div className="absolute right-0 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-0 pointer-events-none flex flex-col items-end leading-[0.95] text-right">
                    <motion.span 
                      key={`right-line1-${activeSlide.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.45 }}
                      className="font-dm text-xl xs:text-2xl sm:text-6xl md:text-7xl lg:text-[84px] font-light text-[#8F987D] tracking-tight block"
                    >
                      {activeSlide.rightWords.line1}
                    </motion.span>

                    <motion.span 
                      key={`right-line2-${activeSlide.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.05 }}
                      className="font-dm text-xl xs:text-2xl sm:text-6xl md:text-7xl lg:text-[84px] font-light text-[#8F987D] tracking-tight block"
                    >
                      {activeSlide.rightWords.line2}
                    </motion.span>
                  </div>

                  {/* THE TILTED CARD WITH ORGANIC TAB NOTCH & FROSTED BADGE */}
                  <div className="relative z-10 flex flex-col items-center">
                    
                    {/* Anchor wrapper for card and flanking navigation buttons */}
                    <div className="relative">
                      <motion.div
                        key={`card-${activeSlide.id}`}
                        initial={{ opacity: 0, scale: 0.92, rotate: -12 }}
                        animate={{ opacity: 1, scale: 1, rotate: -8 }}
                        whileHover={{ rotate: -4, scale: 1.02 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => {
                          const el = document.getElementById('join-three-ways-matrix');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="relative w-[210px] xs:w-[230px] sm:w-[320px] md:w-[360px] h-[280px] xs:h-[310px] sm:h-[440px] md:h-[480px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] cursor-pointer group select-none transition-shadow"
                        style={{
                          clipPath: 'url(#tabbedCardNotchClipJoin)',
                          WebkitClipPath: 'url(#tabbedCardNotchClipJoin)'
                        }}
                      >
                        {/* Background Photo */}
                        <img
                          src={activeSlide.image}
                          alt={activeSlide.cardTitle}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        />

                        {/* Gradient Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                        {/* FLOATING FROSTED GLASS BADGE */}
                        <div className="absolute bottom-7 sm:bottom-9 left-3.5 sm:left-5 right-3.5 sm:right-5 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-black/45 backdrop-blur-md border border-white/20 text-white shadow-lg pointer-events-none text-left">
                          <h4 className="font-dm font-bold text-xs sm:text-base leading-tight text-white/95">
                            {activeSlide.badgeName}
                          </h4>
                          <p className="font-dm text-[10px] sm:text-xs text-[#D9C6A8] font-medium mt-0.5 leading-snug">
                            {activeSlide.badgeRole}
                          </p>
                        </div>

                        {/* Carousel Pagination Dots inside the card at bottom */}
                        <div className="absolute bottom-2 sm:bottom-3 left-0 right-0 flex items-center justify-center gap-1.5 pointer-events-auto">
                          {(['join-hos', 'partnership', 'co-creator'] as MainJoinWay[]).map((wayId, dotIdx) => (
                            <button
                              key={wayId}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveWay(wayId);
                              }}
                              aria-label={`Go to slide ${dotIdx + 1}`}
                              className={`transition-all duration-300 rounded-full cursor-pointer ${
                                wayId === activeWay 
                                  ? 'w-3.5 sm:w-4 h-1 sm:h-1.5 bg-white shadow-xs' 
                                  : 'w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white/40 hover:bg-white/70'
                              }`}
                            />
                          ))}
                        </div>

                      </motion.div>

                      {/* Prev Button (<) floating to the left of the tilted card */}
                      <button
                        type="button"
                        onClick={handlePrevSlide}
                        aria-label="Previous pathway"
                        className="absolute -left-3 sm:-left-12 bottom-4 sm:bottom-10 w-9 h-9 sm:w-13 sm:h-13 rounded-full border border-stone-300/80 bg-white/95 backdrop-blur-sm hover:bg-white text-stone-800 flex items-center justify-center shadow-[0_6px_20px_rgba(0,0,0,0.08)] active:scale-95 transition-all cursor-pointer z-20"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-stone-800" />
                      </button>

                      {/* Next Button (>) floating to the right of the tilted card */}
                      <button
                        type="button"
                        onClick={handleNextSlide}
                        aria-label="Next pathway"
                        className="absolute -right-3 sm:-right-12 bottom-4 sm:bottom-10 w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-[#1A1612] hover:bg-[#2C241D] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.22)] active:scale-95 transition-all cursor-pointer z-20"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </button>

                    </div>

                  </div>

                </div>

                {/* 3. BOTTOM ACTION CTA BUTTON */}
                <div className="mt-5 sm:mt-10 flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('join-three-ways-matrix');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="py-2.5 sm:py-3 px-5 sm:px-7 rounded-xl sm:rounded-2xl bg-[#1A1612] hover:bg-[#2C241D] text-white font-dm font-bold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer border border-[#D9C6A8]/40"
                  >
                    <span>Open {activeSlide.cardTitle} Form</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D9C6A8]" />
                  </button>
                </div>

              </div>
            );
          })()}

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. INTERACTIVE 3-WAY HUB & WORKFLOW SECTION               */}
      {/* ======================================================== */}
      <section id="join-three-ways-matrix" className="relative w-full py-10 sm:py-24 bg-[#F7F1E5] border-t border-[#D9C6A8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 3-Tab Header Switcher */}
          <div className="flex items-center justify-center mb-8 sm:mb-16">
            <div className="inline-flex p-1 sm:p-1.5 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#8F6E5B]/30 sm:border-[#D9C6A8] shadow-[0_8px_24px_rgba(51,44,37,0.1)] max-w-full overflow-x-auto">
              
              <button
                type="button"
                onClick={() => setActiveWay('join-hos')}
                className={`py-2 px-3 xs:px-3.5 sm:py-3 sm:px-7 rounded-xl sm:rounded-2xl font-dm text-[11px] sm:text-sm font-extrabold uppercase tracking-tight sm:tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeWay === 'join-hos'
                    ? 'bg-[#C7833D] text-white shadow-[0_4px_14px_rgba(199,131,61,0.4)] border border-white/30 scale-[1.02]'
                    : 'text-[#5C4535] hover:bg-[#F7F1E5] font-bold'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" />
                <span className="sm:hidden">1. Join HOS</span>
                <span className="hidden sm:inline">1. Join HOS (Family & Seekers)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveWay('partnership')}
                className={`py-2 px-3 xs:px-3.5 sm:py-3 sm:px-7 rounded-xl sm:rounded-2xl font-dm text-[11px] sm:text-sm font-extrabold uppercase tracking-tight sm:tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeWay === 'partnership'
                    ? 'bg-[#556346] text-white shadow-[0_4px_14px_rgba(85,99,70,0.4)] border border-white/30 scale-[1.02]'
                    : 'text-[#5C4535] hover:bg-[#F7F1E5] font-bold'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" />
                <span className="sm:hidden">2. Partnerships</span>
                <span className="hidden sm:inline">2. Sacred Partnerships</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveWay('co-creator')}
                className={`py-2 px-3 xs:px-3.5 sm:py-3 sm:px-7 rounded-xl sm:rounded-2xl font-dm text-[11px] sm:text-sm font-extrabold uppercase tracking-tight sm:tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeWay === 'co-creator'
                    ? 'bg-[#A67C38] text-white shadow-[0_4px_14px_rgba(166,124,56,0.4)] border border-white/30 scale-[1.02]'
                    : 'text-[#5C4535] hover:bg-[#F7F1E5] font-bold'
                }`}
              >
                <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.5]" />
                <span className="sm:hidden">3. Co-Creator</span>
                <span className="hidden sm:inline">3. Co-Creator (Content)</span>
              </button>

            </div>
          </div>

          {/* ======================================================== */}
          {/* TAB 1: JOIN HOS (FORM + INSTANT SANCTUM PORTAL UNLOCK)    */}
          {/* ======================================================== */}
          <AnimatePresence mode="wait">
            {activeWay === 'join-hos' && (
              <motion.div
                key="tab-join-hos"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-12"
              >
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-xs font-dm font-bold text-[#C7833D] uppercase tracking-widest block mb-1">
                  ॥ कुल धर्म प्रवेशम् ॥ INITIATION FORM
                </span>
                <h2 className="font-cormorant text-3xl sm:text-5xl font-semibold text-[#8F6E5B] uppercase">
                  Join House of Sanatan
                </h2>
                <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/80 mt-2">
                  Complete your details below. Once submitted, you will immediately unlock access to our exclusive <strong className="text-[#C7833D]">Sanctum Portal</strong> (Audio Player, Virtual Altar, Panchang Muhurats, and Member Vault).
                </p>
              </div>

              {!isHosSubmitted ? (
                /* INITIATION APPLICATION FORM */
                <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#FDF9F2] via-[#F9F1E2] to-[#EFE1C9] rounded-[32px] p-6 sm:p-10 border-2 border-[#C7833D]/35 relative overflow-hidden">
                  <form onSubmit={handleHosSubmit} className="space-y-4 sm:space-y-5">
                    
                    {/* Form Header Accent */}
                    <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#C7833D]/25">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C7833D] to-[#B08A4A] text-white flex items-center justify-center shadow-xs">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-cormorant text-xl font-bold text-[#6D421E] leading-none">Initiation Application</h3>
                          <span className="text-[10px] font-dm text-[#C7833D] font-semibold tracking-wider uppercase">Sanatan Sangha Membership</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-dm font-bold text-[#C7833D] bg-[#C7833D]/15 px-2.5 py-1 rounded-full border border-[#C7833D]/30">
                        ॥ कुल धर्म प्रवेशम् ॥
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6D421E] uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={hosForm.name}
                          onChange={(e) => setHosForm({ ...hosForm, name: e.target.value })}
                          placeholder="e.g. Meera Ramanathan"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#C7833D]/30 text-[#6D421E] placeholder-[#6D421E]/40 text-sm font-dm focus:outline-none focus:border-[#C7833D] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6D421E] uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={hosForm.email}
                          onChange={(e) => setHosForm({ ...hosForm, email: e.target.value })}
                          placeholder="meera@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#C7833D]/30 text-[#6D421E] placeholder-[#6D421E]/40 text-sm font-dm focus:outline-none focus:border-[#C7833D] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6D421E] uppercase tracking-wider mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={hosForm.phone}
                          onChange={(e) => setHosForm({ ...hosForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#C7833D]/30 text-[#6D421E] placeholder-[#6D421E]/40 text-sm font-dm focus:outline-none focus:border-[#C7833D] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6D421E] uppercase tracking-wider mb-1.5">
                          City / State *
                        </label>
                        <input
                          type="text"
                          required
                          value={hosForm.city}
                          onChange={(e) => setHosForm({ ...hosForm, city: e.target.value })}
                          placeholder="e.g. Varanasi / Mumbai / Bengaluru"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#C7833D]/30 text-[#6D421E] placeholder-[#6D421E]/40 text-sm font-dm focus:outline-none focus:border-[#C7833D] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6D421E] uppercase tracking-wider mb-1.5">
                          Ishta Devata / Primary Deity
                        </label>
                        <select
                          value={hosForm.ishtaDevata}
                          onChange={(e) => setHosForm({ ...hosForm, ishtaDevata: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#C7833D]/30 text-[#6D421E] text-sm font-dm focus:outline-none focus:border-[#C7833D] focus:bg-white shadow-2xs transition-all"
                        >
                          <option value="Lord Shiva (Mahadev)">Lord Shiva (Mahadev)</option>
                          <option value="Lord Sri Krishna / Vishnu">Lord Sri Krishna / Vishnu</option>
                          <option value="Maa Durga / Sri Lalita">Maa Durga / Sri Lalita</option>
                          <option value="Lord Rama / Hanuman Ji">Lord Rama / Hanuman Ji</option>
                          <option value="Lord Ganesha">Lord Ganesha</option>
                          <option value="All Devatas (Sanatan)">All Devatas (Sanatan)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6D421E] uppercase tracking-wider mb-1.5">
                          Primary Devotional Sankalpa
                        </label>
                        <select
                          value={hosForm.sankalpa}
                          onChange={(e) => setHosForm({ ...hosForm, sankalpa: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#C7833D]/30 text-[#6D421E] text-sm font-dm focus:outline-none focus:border-[#C7833D] focus:bg-white shadow-2xs transition-all"
                        >
                          <option value="Daily Home Sadhana & Family Purity">Daily Home Sadhana & Family Purity</option>
                          <option value="Sacred Pilgrimages & Dham Yatras">Sacred Pilgrimages & Dham Yatras</option>
                          <option value="Vedic Chanting & Stotra Learning">Vedic Chanting & Stotra Learning</option>
                          <option value="Temple Seva & Volunteer Works">Temple Seva & Volunteer Works</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#C7833D] via-[#B08A4A] to-[#C7833D] hover:brightness-105 text-[#F7F1E5] font-dm font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:scale-[1.01] active:scale-95 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Submit & Unlock Sanctum Access</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] font-dm text-[#6D421E]/80 pt-2">
                      <ShieldCheck className="w-4 h-4 text-[#66705A]" />
                      <span>Free sacred initiation &bull; Immediate portal access &bull; Consecrated privacy</span>
                    </div>

                  </form>
                </div>
              ) : (
                /* ======================================================== */
                /* SOMETHING NEW: THE UNLOCKED SACRED SANCTUM PORTAL!       */
                /* ======================================================== */
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-10"
                >
                  {/* Unlock Celebration Banner */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#26201B] via-[#332C25] to-[#1A1612] text-[#F7F1E5] border-2 border-[#D9C6A8] shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="relative z-10 max-w-xl">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7833D]/30 border border-[#C7833D] text-[11px] font-dm font-bold uppercase tracking-wider text-[#D9C6A8] mb-3">
                        <Sparkles className="w-3.5 h-3.5 text-[#C7833D]" />
                        <span>SANCTUM ACCESS UNLOCKED</span>
                      </span>
                      <h3 className="font-cormorant text-3xl sm:text-4xl font-semibold text-white">
                        Welcome to the Inner Sanctum, {hosForm.name || 'Seeker'}!
                      </h3>
                      <p className="font-dm text-xs sm:text-sm text-[#D9C6A8]/85 mt-2 leading-relaxed">
                        Your devotion is honored. You now have exclusive access to our daily sacred altar, audio chants, astrological panchang, and consecrated member gifts.
                      </p>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-2 shrink-0">
                      <div className="w-16 h-16 rounded-full bg-[#C7833D]/20 border border-[#D9C6A8] flex items-center justify-center text-[#D9C6A8]">
                        <Crown className="w-8 h-8" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#D9C6A8]">{memberPassId}</span>
                    </div>
                  </div>

                  {/* 4 INTERACTIVE UNLOCKED SANCTUM WIDGETS */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* WIDGET 1: SACRED DIGITAL ALTAR (LIGHT DIYA & RING BELL) */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C6A8] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-sanskrit text-xs font-bold text-[#8F6E5B]">॥ मन्दिर गर्भगृह ॥</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#C7833D]/10 text-[#C7833D] text-[10px] font-dm font-bold uppercase">
                            Interactive Altar
                          </span>
                        </div>
                        <h4 className="font-cormorant text-2xl font-bold text-[#8F6E5B]">Daily Altar & Ghanta</h4>
                        <p className="font-dm text-xs text-[#8F6E5B]/75 mt-1">
                          Begin your sadhana by lighting the consecrated brass diya and ringing the temple bell.
                        </p>

                        {/* Interactive Diya Flame Motif */}
                        <div className="my-8 flex flex-col items-center justify-center">
                          <div 
                            onClick={() => setIsDiyaLit(!isDiyaLit)}
                            className="relative cursor-pointer group flex flex-col items-center select-none"
                            title="Click to toggle Diya flame"
                          >
                            {/* Animated Flame */}
                            <div className={`relative transition-all duration-500 ${isDiyaLit ? 'scale-100 opacity-100' : 'scale-50 opacity-10'}`}>
                              <div className="w-10 h-14 bg-gradient-to-t from-[#C7833D] via-[#E2A03F] to-[#FFF5C2] rounded-full blur-[1px] animate-pulse" />
                              <div className="absolute inset-0 w-6 h-10 m-auto bg-white rounded-full blur-xs opacity-75" />
                              <div className="absolute -inset-4 bg-radial from-[#C7833D]/40 to-transparent blur-lg rounded-full" />
                            </div>

                            {/* Brass Diya Vessel */}
                            <div className="w-24 h-8 bg-gradient-to-r from-[#B08A4A] via-[#D9C6A8] to-[#997336] rounded-b-full border-t border-[#FFF2D6] shadow-md mt-1" />
                            <div className="w-12 h-2.5 bg-[#8C6B2F] rounded-b-full" />
                          </div>

                          <span className="text-[11px] font-dm text-[#8F6E5B]/70 mt-3">
                            {isDiyaLit ? '✦ Akhanda Diya is glowing with sacred prana' : 'Click diya to ignite sacred flame'}
                          </span>
                        </div>
                      </div>

                      {/* Ring Temple Bell Trigger */}
                      <div className="pt-4 border-t border-[#D9C6A8]/40 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={playTempleBellSound}
                          className="py-3 px-5 rounded-2xl bg-[#F7F1E5] hover:bg-[#EFE6D5] text-[#8F6E5B] font-dm font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer border border-[#D9C6A8]"
                        >
                          <Bell className="w-4 h-4 text-[#C7833D] animate-bounce" />
                          <span>Ring Temple Bell (Ghanta)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setIsDiyaLit(!isDiyaLit)}
                          className="text-xs font-dm text-[#C7833D] font-semibold hover:underline cursor-pointer"
                        >
                          {isDiyaLit ? 'Extinguish' : 'Light Flame'}
                        </button>
                      </div>
                    </div>

                    {/* WIDGET 2: CONSECRATED AUDIO CHANTS PLAYER */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C6A8] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-sanskrit text-xs font-bold text-[#8F6E5B]">॥ मन्त्र ध्वनि ॥</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#66705A]/10 text-[#66705A] text-[10px] font-dm font-bold uppercase">
                            Sacred Audio Chants
                          </span>
                        </div>
                        <h4 className="font-cormorant text-2xl font-bold text-[#8F6E5B]">Brahma Muhurta Chants</h4>
                        <p className="font-dm text-xs text-[#8F6E5B]/75 mt-1">
                          Consecrated recordings from ancient Vedic pathashalas in Kashi & Ujjain.
                        </p>

                        {/* Track list */}
                        <div className="mt-4 space-y-2">
                          {audioTracks.map((track, i) => {
                            const isCurrent = activeAudioTrack === i;
                            return (
                              <div
                                key={i}
                                onClick={() => {
                                  setActiveAudioTrack(i);
                                  setIsPlayingAudio(true);
                                }}
                                className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                                  isCurrent
                                    ? 'bg-[#F7F1E5] border border-[#B08A4A]'
                                    : 'bg-white hover:bg-stone-50 border border-stone-100'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-full bg-[#8F6E5B]/10 flex items-center justify-center text-[#8F6E5B]">
                                    {isCurrent && isPlayingAudio ? (
                                      <Volume2 className="w-3.5 h-3.5 text-[#C7833D]" />
                                    ) : (
                                      <Play className="w-3.5 h-3.5" />
                                    )}
                                  </div>
                                  <div>
                                    <h5 className="font-dm font-bold text-xs text-[#8F6E5B]">{track.title}</h5>
                                    <span className="text-[10px] text-[#8F6E5B]/60">{track.singer}</span>
                                  </div>
                                </div>
                                <span className="font-mono text-[11px] text-[#8F6E5B]/60">{track.duration}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Player controls */}
                      <div className="pt-4 border-t border-[#D9C6A8]/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="w-10 h-10 rounded-full bg-[#C7833D] hover:bg-[#B08A4A] text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                          >
                            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                          <div>
                            <span className="font-dm font-bold text-xs text-[#8F6E5B] block">
                              {audioTracks[activeAudioTrack].title}
                            </span>
                            <span className="text-[10px] text-[#8F6E5B]/60">
                              {isPlayingAudio ? 'Playing consecrated audio' : 'Paused'}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs font-dm font-bold text-[#66705A]">
                          100% Ad-Free
                        </span>
                      </div>
                    </div>

                    {/* WIDGET 3: LIVE PANCHANG & AUSPICIOUS TITHI */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C6A8] shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-sanskrit text-xs font-bold text-[#8F6E5B]">॥ पञ्चाङ्गम् ॥</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#B08A4A]/10 text-[#B08A4A] text-[10px] font-dm font-bold uppercase">
                          Today's Muhurat
                        </span>
                      </div>
                      <h4 className="font-cormorant text-2xl font-bold text-[#8F6E5B]">Consecrated Daily Panchang</h4>
                      <p className="font-dm text-xs text-[#8F6E5B]/75 mt-1 mb-5">
                        Astronomically verified Vedic muhurats for daily puja and spiritual initiation.
                      </p>

                      <div className="grid grid-cols-2 gap-3 text-xs font-dm">
                        <div className="p-3.5 rounded-2xl bg-[#F7F1E5]/70 border border-[#D9C6A8]/60">
                          <span className="text-[10px] text-[#8F6E5B]/60 uppercase block">TITHI</span>
                          <span className="font-bold text-[#8F6E5B] text-sm">Shukla Ekadashi</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#F7F1E5]/70 border border-[#D9C6A8]/60">
                          <span className="text-[10px] text-[#8F6E5B]/60 uppercase block">NAKSHATRA</span>
                          <span className="font-bold text-[#8F6E5B] text-sm">Rohini (Auspicious)</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#F7F1E5]/70 border border-[#D9C6A8]/60">
                          <span className="text-[10px] text-[#8F6E5B]/60 uppercase block">BRAHMA MUHURTA</span>
                          <span className="font-bold text-[#66705A] text-sm">04:32 AM - 05:20 AM</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-[#F7F1E5]/70 border border-[#D9C6A8]/60">
                          <span className="text-[10px] text-[#8F6E5B]/60 uppercase block">ABHIJIT MUHURAT</span>
                          <span className="font-bold text-[#C7833D] text-sm">11:48 AM - 12:36 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* WIDGET 4: MEMBER VAULT & EXCLUSIVE STORE BLESSING CODE */}
                    <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#D9C6A8] shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-sanskrit text-xs font-bold text-[#8F6E5B]">॥ प्रसाद एवं उपहार ॥</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#C7833D]/10 text-[#C7833D] text-[10px] font-dm font-bold uppercase">
                            Member Vault
                          </span>
                        </div>
                        <h4 className="font-cormorant text-2xl font-bold text-[#8F6E5B]">Member Vault & Gifts</h4>
                        <p className="font-dm text-xs text-[#8F6E5B]/75 mt-1 mb-4">
                          Exclusive member gifts, consecrated store blessings, and VIP downloads.
                        </p>

                        {/* Promo Code Box */}
                        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F7F1E5] to-[#EFE6D5] border border-[#B08A4A]/50 flex items-center justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-dm font-bold text-[#C7833D] uppercase tracking-wider block">
                              10% SANTANA MALL BLESSING CODE
                            </span>
                            <span className="font-mono text-base font-bold text-[#8F6E5B]">SANCTUM108</span>
                          </div>

                          <button
                            type="button"
                            onClick={copyPromoCode}
                            className="py-2 px-3.5 rounded-xl bg-white border border-[#D9C6A8] text-[#8F6E5B] hover:text-[#C7833D] text-xs font-dm font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                          >
                            {copiedCode ? <Check className="w-3.5 h-3.5 text-[#66705A]" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        {/* Direct Download Links */}
                        <div className="space-y-2">
                          <a
                            href="#download-guide"
                            onClick={(e) => {
                              e.preventDefault();
                              showToast('Downloading Vedic Griha Puja Guide PDF...');
                            }}
                            className="p-2.5 rounded-xl bg-[#F7F1E5]/60 hover:bg-[#F7F1E5] border border-[#D9C6A8]/50 flex items-center justify-between text-xs font-dm text-[#8F6E5B] transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-[#C7833D]" />
                              <span>Vedic Griha Puja Vidhi & Mantra Guide (PDF)</span>
                            </span>
                            <Download className="w-3.5 h-3.5 text-[#8F6E5B]/60" />
                          </a>

                          <a
                            href="https://wa.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-[#F7F1E5]/60 hover:bg-[#F7F1E5] border border-[#D9C6A8]/50 flex items-center justify-between text-xs font-dm text-[#8F6E5B] transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <MessageCircle className="w-4 h-4 text-[#66705A]" />
                              <span>Exclusive Sangha WhatsApp Community Channel</span>
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#8F6E5B]/60" />
                          </a>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#D9C6A8]/40 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => {
                            setIsHosSubmitted(false);
                          }}
                          className="text-xs font-dm text-[#8F6E5B]/70 hover:text-[#8F6E5B] underline cursor-pointer"
                        >
                          Fill Form Again
                        </button>

                        <button
                          type="button"
                          onClick={onNavigateMall}
                          className="py-2 px-4 rounded-xl bg-[#C7833D] hover:bg-[#B08A4A] text-white font-dm font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Shop With Discount</span>
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: SACRED PARTNERSHIPS (TEMPLE TRUSTS, BRANDS, YATRA)*/}
          {/* ======================================================== */}
          {activeWay === 'partnership' && (
            <motion.div
              key="tab-partnership"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-12 overflow-hidden"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-2xl mx-auto"
              >
                <span className="text-xs font-dm font-bold text-[#66705A] uppercase tracking-widest block mb-1">
                  ॥ संस्थागत सहयोग ॥ INSTITUTIONAL ALLIANCES
                </span>
                <h2 className="font-cormorant text-3xl sm:text-5xl font-semibold text-[#8F6E5B] uppercase">
                  Sacred Partnerships
                </h2>
                <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/80 mt-2">
                  Partner with House of Sanatana. We collaborate with accredited temple trusts, luxury pilgrimage operators, ethical organic producers, and corporate gifting houses.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start overflow-hidden py-2 px-1">
                {/* 4 Partnership Pillars - Left Side (Slide in from out of screen on the left) */}
                <motion.div 
                  initial={{ opacity: 0, x: -140 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                <div className="group p-5.5 sm:p-6 rounded-[28px] bg-[#F4F7F1]/85 hover:bg-gradient-to-br hover:from-[#66705A] hover:to-[#525b48] border border-[#66705A]/25 hover:border-[#66705A] shadow-2xs hover:shadow-[0_15px_30px_rgba(102,112,90,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-[#66705A]/15 text-[#66705A] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110">
                    <Building2 className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#8F6E5B] group-hover:text-white transition-colors duration-300">Temple Trusts</h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 group-hover:text-[#F7F1E5] mt-1 leading-relaxed transition-colors duration-300">
                    Accredited Peetham samagri supply, live virtual darshan logistics, and temple preservation funds.
                  </p>
                </div>

                <div className="group p-5.5 sm:p-6 rounded-[28px] bg-[#FDF7ED]/85 hover:bg-gradient-to-br hover:from-[#C7833D] hover:to-[#ad6e2c] border border-[#C7833D]/25 hover:border-[#C7833D] shadow-2xs hover:shadow-[0_15px_30px_rgba(199,131,61,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-[#C7833D]/15 text-[#C7833D] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110">
                    <Compass className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#8F6E5B] group-hover:text-white transition-colors duration-300">Yatra Fleets</h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 group-hover:text-[#F7F1E5] mt-1 leading-relaxed transition-colors duration-300">
                    Helicopter charters, luxury Himalayan resorts, and oxygen-assisted elderly pilgrim care networks.
                  </p>
                </div>

                <div className="group p-5.5 sm:p-6 rounded-[28px] bg-[#FAF5EA]/85 hover:bg-gradient-to-br hover:from-[#B08A4A] hover:to-[#997336] border border-[#B08A4A]/25 hover:border-[#B08A4A] shadow-2xs hover:shadow-[0_15px_30px_rgba(176,138,74,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-[#B08A4A]/15 text-[#B08A4A] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110">
                    <Hammer className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#8F6E5B] group-hover:text-white transition-colors duration-300">Ethical Brands</h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 group-hover:text-[#F7F1E5] mt-1 leading-relaxed transition-colors duration-300">
                    Zero-chemical dhoop makers, certified Bhimseni camphor, and Moradabad brass sculpture guilds.
                  </p>
                </div>

                <div className="group p-5.5 sm:p-6 rounded-[28px] bg-[#FAF2EB]/85 hover:bg-gradient-to-br hover:from-[#8C4E1D] hover:to-[#743e14] border border-[#8C4E1D]/25 hover:border-[#8C4E1D] shadow-2xs hover:shadow-[0_15px_30px_rgba(140,78,29,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-[#8C4E1D]/15 text-[#8C4E1D] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110">
                    <Gift className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#8F6E5B] group-hover:text-white transition-colors duration-300">Corporate Gifting</h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 group-hover:text-[#F7F1E5] mt-1 leading-relaxed transition-colors duration-300">
                    Bespoke consecrated executive Diwali hampers with customized corporate brass seal plaques.
                  </p>
                </div>
              </motion.div>

              {/* Partnership Form - Right Side (In Rich Sacred Moss Green Palette) */}
              <motion.div 
                initial={{ opacity: 0, x: 140 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-gradient-to-br from-[#FAFBF8] via-[#EFF4EB] to-[#E3ECE0] rounded-[32px] p-6 sm:p-10 border-2 border-[#66705A]/35 relative overflow-hidden"
              >
                {!isPartnerSubmitted ? (
                  <form onSubmit={handlePartnerSubmit} className="space-y-4">
                    {/* Form Header Accent */}
                    <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#66705A]/20">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#66705A] text-white flex items-center justify-center shadow-xs">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-cormorant text-xl font-bold text-[#424A37] leading-none">Partnership Dossier</h3>
                          <span className="text-[10px] font-dm text-[#66705A] font-semibold tracking-wider uppercase">Institutional & Enterprise Alliance</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-dm font-bold text-[#66705A] bg-[#66705A]/15 px-2.5 py-1 rounded-full border border-[#66705A]/25">
                        ॥ संस्थागत ॥
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#424A37] uppercase tracking-wider mb-1.5">
                          Organization / Entity Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={partnerForm.organizationName}
                          onChange={(e) => setPartnerForm({ ...partnerForm, organizationName: e.target.value })}
                          placeholder="e.g. Kashi Mandir Seva Trust"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#66705A]/30 text-[#424A37] placeholder-[#424A37]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#424A37] uppercase tracking-wider mb-1.5">
                          Lead Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          value={partnerForm.contactPerson}
                          onChange={(e) => setPartnerForm({ ...partnerForm, contactPerson: e.target.value })}
                          placeholder="e.g. Dr. Raghavendra Rao"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#66705A]/30 text-[#424A37] placeholder-[#424A37]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#424A37] uppercase tracking-wider mb-1.5">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                          placeholder="trust@kashiseva.org"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#66705A]/30 text-[#424A37] placeholder-[#424A37]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#424A37] uppercase tracking-wider mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={partnerForm.phone}
                          onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                          placeholder="+91 98111 22233"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#66705A]/30 text-[#424A37] placeholder-[#424A37]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#424A37] uppercase tracking-wider mb-1.5">
                          Partnership Domain
                        </label>
                        <select
                          value={partnerForm.partnerType}
                          onChange={(e) => setPartnerForm({ ...partnerForm, partnerType: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#66705A]/30 text-[#424A37] text-sm font-dm focus:outline-none focus:border-[#66705A] focus:bg-white shadow-2xs transition-all"
                        >
                          <option value="Temple & Peetham Trust">Temple & Peetham Trust</option>
                          <option value="Pilgrimage & Helicopter Fleet">Pilgrimage & Helicopter Fleet</option>
                          <option value="Ethical Consecrated Samagri Brand">Ethical Consecrated Samagri Brand</option>
                          <option value="Corporate Devotional Gifting">Corporate Devotional Gifting</option>
                          <option value="Academic & Vedic Research Institution">Academic & Vedic Institution</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#424A37] uppercase tracking-wider mb-1.5">
                          Operational Scale
                        </label>
                        <select
                          value={partnerForm.scale}
                          onChange={(e) => setPartnerForm({ ...partnerForm, scale: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#66705A]/30 text-[#424A37] text-sm font-dm focus:outline-none focus:border-[#66705A] focus:bg-white shadow-2xs transition-all"
                        >
                          <option value="Regional / State Level">Regional / State Level</option>
                          <option value="National / Pan-India">National / Pan-India</option>
                          <option value="Global / International Diaspora">Global / International</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-dm font-semibold text-[#424A37] uppercase tracking-wider mb-1.5">
                        Partnership Objective & Proposal Overview
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={partnerForm.message}
                        onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                        placeholder="Describe your synergy with House of Sanatan (e.g. yatra routes, temple festivals, samagri supply)..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-[#66705A]/30 text-[#424A37] placeholder-[#424A37]/40 text-sm font-dm focus:outline-none focus:border-[#66705A] focus:bg-white shadow-2xs transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#66705A] to-[#525b48] hover:brightness-105 text-white font-dm font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <Handshake className="w-4 h-4" />
                        <span>Submit Partnership Application</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] font-dm text-[#424A37]/80 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#66705A]" />
                      <span>Dedicated partnership lead assigned within 24 hours</span>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-14 h-14 text-[#66705A] mx-auto mb-3" />
                    <h3 className="font-cormorant text-2xl font-bold text-[#424A37]">Partnership Proposal Received</h3>
                    <p className="font-dm text-xs sm:text-sm text-[#424A37]/80 mt-1 max-w-md mx-auto">
                      Pranam! Our Trust Directors have received the partnership brief from {partnerForm.organizationName}. We will email your verified partnership dossier shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsPartnerSubmitted(false)}
                      className="mt-6 py-2.5 px-6 rounded-xl bg-white text-[#424A37] font-dm font-bold text-xs uppercase border border-[#66705A]/30 shadow-xs hover:bg-[#66705A] hover:text-white transition-all cursor-pointer"
                    >
                      Submit Another Query
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

          {/* ======================================================== */}
          {/* TAB 3: CO-CREATOR (CREATE CONTENT FOR US)                */}
          {/* ======================================================== */}
          {activeWay === 'co-creator' && (
            <motion.div
              key="tab-co-creator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-12 overflow-hidden"
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-2xl mx-auto"
              >
                <span className="text-xs font-dm font-bold text-[#B08A4A] uppercase tracking-widest block mb-1">
                  ॥ सह-सर्जनम् ॥ CREATE CONTENT FOR HOUSE OF SANATAN
                </span>
                <h2 className="font-cormorant text-3xl sm:text-5xl font-semibold text-[#8F6E5B] uppercase">
                  Co-Creator Media Guild
                </h2>
                <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/80 mt-2">
                  Are you a filmmaker, reels creator, spiritual writer, stotra vocalist, or devotional photographer? Create authentic content for House of Sanatan and get funded, sponsored travel, and distribution across our platforms.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start overflow-hidden py-2 px-1">
                {/* Creator Benefits Ticker - Left Side (Slide in from out of screen on the left) */}
                <motion.div 
                  initial={{ opacity: 0, x: -140 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                <div className="group p-5.5 sm:p-6 rounded-[28px] bg-[#FAF5EA]/85 hover:bg-gradient-to-br hover:from-[#B08A4A] hover:to-[#997336] border border-[#B08A4A]/25 hover:border-[#B08A4A] shadow-2xs hover:shadow-[0_15px_30px_rgba(176,138,74,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-[#B08A4A]/15 text-[#B08A4A] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110">
                    <Video className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#8F6E5B] group-hover:text-white transition-colors duration-300">HOS Creator Fund</h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 group-hover:text-[#F7F1E5] mt-1 leading-relaxed transition-colors duration-300">
                    Guaranteed stipends and production grants for reels, 4K documentaries, and stotra audio.
                  </p>
                </div>

                <div className="group p-5.5 sm:p-6 rounded-[28px] bg-[#FDF7ED]/85 hover:bg-gradient-to-br hover:from-[#C7833D] hover:to-[#ad6e2c] border border-[#C7833D]/25 hover:border-[#C7833D] shadow-2xs hover:shadow-[0_15px_30px_rgba(199,131,61,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-[#C7833D]/15 text-[#C7833D] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110">
                    <Compass className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#8F6E5B] group-hover:text-white transition-colors duration-300">Sponsored Yatras</h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 group-hover:text-[#F7F1E5] mt-1 leading-relaxed transition-colors duration-300">
                    All-expenses-paid travel to Kashi, Kedarnath, Char Dham, and Ujjain with our media team.
                  </p>
                </div>

                <div className="group p-5.5 sm:p-6 rounded-[28px] bg-[#F4F7F1]/85 hover:bg-gradient-to-br hover:from-[#66705A] hover:to-[#525b48] border border-[#66705A]/25 hover:border-[#66705A] shadow-2xs hover:shadow-[0_15px_30px_rgba(102,112,90,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-[#66705A]/15 text-[#66705A] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110">
                    <TrendingUp className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#8F6E5B] group-hover:text-white transition-colors duration-300">Reach Millions</h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 group-hover:text-[#F7F1E5] mt-1 leading-relaxed transition-colors duration-300">
                    Distributed directly across House of Sanatan YouTube, Instagram, and Spotify channels.
                  </p>
                </div>

                <div className="group p-5.5 sm:p-6 rounded-[28px] bg-[#FAF2EB]/85 hover:bg-gradient-to-br hover:from-[#8C4E1D] hover:to-[#743e14] border border-[#8C4E1D]/25 hover:border-[#8C4E1D] shadow-2xs hover:shadow-[0_15px_30px_rgba(140,78,29,0.3)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-[#8C4E1D]/15 text-[#8C4E1D] group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mb-3.5 transition-all duration-300 group-hover:scale-110">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <h4 className="font-cormorant text-xl font-bold text-[#8F6E5B] group-hover:text-white transition-colors duration-300">Verified Credits</h4>
                  <p className="font-dm text-xs text-[#8F6E5B]/75 group-hover:text-[#F7F1E5] mt-1 leading-relaxed transition-colors duration-300">
                    Full artist byline, verified creator badge, and intellectual property revenue sharing.
                  </p>
                </div>
              </motion.div>

              {/* Creator Application Form - Right Side (In Rich Sacred Amber Gold Palette) */}
              <motion.div 
                initial={{ opacity: 0, x: 140 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-gradient-to-br from-[#FDFBF7] via-[#F8F2E2] to-[#EFE2C7] rounded-[32px] p-6 sm:p-10 border-2 border-[#B08A4A]/40 relative overflow-hidden"
              >
                {!isCreatorSubmitted ? (
                  <form onSubmit={handleCreatorSubmit} className="space-y-4">
                    {/* Form Header Accent */}
                    <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#B08A4A]/25">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#B08A4A] text-white flex items-center justify-center shadow-xs">
                          <Video className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-cormorant text-xl font-bold text-[#6C4E22] leading-none">Creator Pitch Submission</h3>
                          <span className="text-[10px] font-dm text-[#B08A4A] font-semibold tracking-wider uppercase">Media Guild & Grant Funding</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-dm font-bold text-[#B08A4A] bg-[#B08A4A]/15 px-2.5 py-1 rounded-full border border-[#B08A4A]/25">
                        ॥ सह-सर्जनम् ॥
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6C4E22] uppercase tracking-wider mb-1.5">
                          Creator / Studio Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={creatorForm.creatorName}
                          onChange={(e) => setCreatorForm({ ...creatorForm, creatorName: e.target.value })}
                          placeholder="e.g. Ishaan Visuals / Aarohi Chants"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#B08A4A]/30 text-[#6C4E22] placeholder-[#6C4E22]/40 text-sm font-dm focus:outline-none focus:border-[#B08A4A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6C4E22] uppercase tracking-wider mb-1.5">
                          Portfolio / Social Link *
                        </label>
                        <input
                          type="text"
                          required
                          value={creatorForm.handleOrLink}
                          onChange={(e) => setCreatorForm({ ...creatorForm, handleOrLink: e.target.value })}
                          placeholder="Instagram @handle / YouTube URL / Drive"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#B08A4A]/30 text-[#6C4E22] placeholder-[#6C4E22]/40 text-sm font-dm focus:outline-none focus:border-[#B08A4A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6C4E22] uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={creatorForm.email}
                          onChange={(e) => setCreatorForm({ ...creatorForm, email: e.target.value })}
                          placeholder="creator@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#B08A4A]/30 text-[#6C4E22] placeholder-[#6C4E22]/40 text-sm font-dm focus:outline-none focus:border-[#B08A4A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6C4E22] uppercase tracking-wider mb-1.5">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={creatorForm.phone}
                          onChange={(e) => setCreatorForm({ ...creatorForm, phone: e.target.value })}
                          placeholder="+91 99887 76655"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#B08A4A]/30 text-[#6C4E22] placeholder-[#6C4E22]/40 text-sm font-dm focus:outline-none focus:border-[#B08A4A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6C4E22] uppercase tracking-wider mb-1.5">
                          Primary Creative Medium
                        </label>
                        <select
                          value={creatorForm.creativeMedium}
                          onChange={(e) => setCreatorForm({ ...creatorForm, creativeMedium: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#B08A4A]/30 text-[#6C4E22] text-sm font-dm focus:outline-none focus:border-[#B08A4A] focus:bg-white shadow-2xs transition-all"
                        >
                          <option value="Video & Short-Form Filmmaking">Video & Short-Form Reels / Shorts</option>
                          <option value="Long-Form Documentary & Temple Films">Long-Form 4K Documentary</option>
                          <option value="Spiritual Writing & Vedic Articles">Spiritual Writing & Articles</option>
                          <option value="Vedic Stotra Vocals & Sacred Music">Vedic Stotra Vocals & Music</option>
                          <option value="Drone & Temple Architecture Photography">Drone & Temple Photography</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-dm font-semibold text-[#6C4E22] uppercase tracking-wider mb-1.5">
                          Equipment / Tools You Use
                        </label>
                        <input
                          type="text"
                          value={creatorForm.equipment}
                          onChange={(e) => setCreatorForm({ ...creatorForm, equipment: e.target.value })}
                          placeholder="e.g. Sony A7IV, Premiere Pro, DJI Mini 4"
                          className="w-full px-4 py-3 rounded-xl bg-white/90 border border-[#B08A4A]/30 text-[#6C4E22] placeholder-[#6C4E22]/40 text-sm font-dm focus:outline-none focus:border-[#B08A4A] focus:bg-white shadow-2xs transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-dm font-semibold text-[#6C4E22] uppercase tracking-wider mb-1.5">
                        Your Content Pitch / Idea for House of Sanatan
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={creatorForm.pitch}
                        onChange={(e) => setCreatorForm({ ...creatorForm, pitch: e.target.value })}
                        placeholder="Tell us what video, documentary, or series you'd like to create for HOS (e.g. 'A 5-part cinematic series on Varanasi Aghoris' or 'Daily 60s Vedic philosophy reels')..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border border-[#B08A4A]/30 text-[#6C4E22] placeholder-[#6C4E22]/40 text-sm font-dm focus:outline-none focus:border-[#B08A4A] focus:bg-white shadow-2xs transition-all"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#B08A4A] to-[#997336] hover:brightness-105 text-white font-dm font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      >
                        <Video className="w-4 h-4" />
                        <span>Submit Content Pitch</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] font-dm text-[#6C4E22]/80 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#B08A4A]" />
                      <span>100% intellectual property respect &bull; Fast curatorial response within 48h</span>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle2 className="w-14 h-14 text-[#B08A4A] mx-auto mb-3" />
                    <h3 className="font-cormorant text-2xl font-bold text-[#6C4E22]">Creative Pitch Received!</h3>
                    <p className="font-dm text-xs sm:text-sm text-[#6C4E22]/80 mt-1 max-w-md mx-auto">
                      Pranam {creatorForm.creatorName || 'Creator'}! Our Media Director has received your portfolio. We will contact you on WhatsApp to discuss project commissions and grant funding.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCreatorSubmitted(false)}
                      className="mt-6 py-2.5 px-6 rounded-xl bg-white text-[#6C4E22] font-dm font-bold text-xs uppercase border border-[#B08A4A]/30 shadow-xs hover:bg-[#B08A4A] hover:text-white transition-all cursor-pointer"
                    >
                      Submit Another Concept
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. EDITORIAL LUXURY FOOTER                               */}
      {/* ======================================================== */}
      <Footer />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#F7F1E5] border border-[#D9C6A8] text-[#8F6E5B] px-6 py-3 rounded-2xl shadow-[0_15px_40px_rgba(51,44,37,0.2)] backdrop-blur-md flex items-center gap-3 animate-bounce">
          <span className="text-[#C7833D]">✦</span>
          <span className="font-dm text-xs sm:text-sm font-semibold tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

    </div>
  );
};
