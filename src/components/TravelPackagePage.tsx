import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  User, 
  Send, 
  Search, 
  Heart, 
  ShoppingBag,
  SlidersHorizontal, 
  Info, 
  ChevronDown, 
  Check, 
  ExternalLink,
  MessageCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { 
  YATRA_CIRCUITS_CONFIG, 
  SACRED_FACILITIES, 
  FEATURED_SHOWCASE_YATRAS, 
  EXPANDED_TRAVEL_PACKAGES, 
  YatraCircuitType,
  SacredFacility
} from '../data/travelData';
import { YatraPackage } from '../types/homepage';
import { YatraModal } from './YatraModal';
import { SunIcon } from './SunIcon';
import { Footer } from './Footer';
import { HeaderActionButtons } from './HeaderActionButtons';

interface TravelPackagePageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateMall: () => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
  cartCount?: number;
  wishlistCount?: number;
  isMenuOpen?: boolean;
}

// 100% Smooth Organic Fillet Tabbed Folder Contour Paths (Normalized [0, 1])
// G1 continuous cubic bezier S-curve fillet + rounded corners (28px equivalent)
export const FOLDER_TAB_LEFT_PATH = 
  "M 0,0.065 C 0,0.03 0.03,0 0.07,0 L 0.54,0 C 0.60,0 0.60,0.065 0.66,0.065 L 0.93,0.065 C 0.97,0.065 1,0.095 1,0.13 L 1,0.935 C 1,0.97 0.97,1 0.93,1 L 0.07,1 C 0.03,1 0,0.97 0,0.935 Z";

export const FOLDER_TAB_RIGHT_PATH = 
  "M 0,0.13 C 0,0.095 0.03,0.065 0.07,0.065 L 0.34,0.065 C 0.40,0.065 0.40,0 0.46,0 L 0.93,0 C 0.97,0 1,0.03 1,0.065 L 1,0.935 C 1,0.97 0.97,1 0.93,1 L 0.07,1 C 0.03,1 0,0.97 0,0.935 Z";

export const TravelPackagePage: React.FC<TravelPackagePageProps> = ({
  onNavigateHome,
  onNavigateMall,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  cartCount = 0,
  wishlistCount = 0,
}) => {
  // Active modal yatra for full day-by-day itinerary & booking
  const [selectedYatra, setSelectedYatra] = useState<YatraPackage | null>(null);

  // Sacred Wishlist State
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());

  // Featured showcase carousel index (for the tilted card in hero motif)
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Active facility preview modal or highlighted card
  const [activeFacility, setActiveFacility] = useState<SacredFacility | null>(null);
  const [isCard1Hovered, setIsCard1Hovered] = useState(false); // When true, Card 1 spreads; when false, Card 0 stays big
  const [isCard2Hovered, setIsCard2Hovered] = useState(false); // When true, Card 2 spreads; when false, Card 3 stays big

  // Circuit and filters state
  const [selectedCircuit, setSelectedCircuit] = useState<YatraCircuitType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState<'all' | 'short' | 'medium' | 'long'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'duration'>('featured');

  // Horizontal scroll ref & helper for the 2-row travel packages carousel
  const packagesScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollPackagesHorizontally = (direction: 'left' | 'right') => {
    if (packagesScrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      packagesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Custom Bespoke Pilgrimage Planner State
  const [customForm, setCustomForm] = useState({
    circuit: 'Himalayan & Kailash',
    travelers: 'Elderly Parents (Senior Care)',
    travelMonth: 'Upcoming Shubh Muhurat (Next 30-60 Days)',
    specialNeeds: 'Helicopter transfer & oxygen concentrator escort',
    name: '',
    phone: '',
    email: '',
  });
  const [customSubmitted, setCustomSubmitted] = useState(false);


  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Synchronize hash routing with yatra modal
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#yatra-')) {
        const yatraId = hash.replace('#yatra-', '');
        const found = EXPANDED_TRAVEL_PACKAGES.find(p => p.id === yatraId);
        if (found) {
          setSelectedYatra(found);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Filtered Yatras
  const filteredYatras = useMemo(() => {
    let result = [...EXPANDED_TRAVEL_PACKAGES];

    // Filter by circuit
    if (selectedCircuit !== 'all') {
      result = result.filter(y => y.circuit === selectedCircuit);
    }

    // Filter by duration
    if (selectedDuration === 'short') {
      result = result.filter(y => y.durationDays <= 4);
    } else if (selectedDuration === 'medium') {
      result = result.filter(y => y.durationDays >= 5 && y.durationDays <= 8);
    } else if (selectedDuration === 'long') {
      result = result.filter(y => y.durationDays >= 9);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        y =>
          y.title.toLowerCase().includes(q) ||
          y.subtitle.toLowerCase().includes(q) ||
          y.startLocation.toLowerCase().includes(q) ||
          y.highlights.some(h => h.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'duration') {
      result.sort((a, b) => b.durationDays - a.durationDays);
    }

    return result;
  }, [selectedCircuit, selectedDuration, searchQuery, sortBy]);

  // Featured showcase helpers
  const currentFeatured = FEATURED_SHOWCASE_YATRAS[featuredIndex];

  const handleNextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % FEATURED_SHOWCASE_YATRAS.length);
  };

  const handlePrevFeatured = () => {
    setFeaturedIndex((prev) => (prev - 1 + FEATURED_SHOWCASE_YATRAS.length) % FEATURED_SHOWCASE_YATRAS.length);
  };

  const handleOpenFeaturedYatra = () => {
    const pkg = EXPANDED_TRAVEL_PACKAGES.find(p => p.id === currentFeatured.yatraId);
    if (pkg) {
      setSelectedYatra(pkg);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomSubmitted(true);
    showToast('Your Bespoke Yatra request has been sanctified. Our Acharya will call you shortly.');
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F7F1E5] text-[#8F6E5B] overflow-x-clip font-dm select-none">
      
      {/* ======================================================== */}
      {/* 100% SMOOTH FILLET TABBED FOLDER CONTOURS (SVG DEFS)    */}
      {/* ======================================================== */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Tab on LEFT Side: Rounded corners + continuous S-curve fillet */}
          <clipPath id="smoothFolderTabLeft" clipPathUnits="objectBoundingBox">
            <path d={FOLDER_TAB_LEFT_PATH} />
          </clipPath>

          {/* Tab on RIGHT Side: Mirrored for alternating both-sides layout */}
          <clipPath id="smoothFolderTabRight" clipPathUnits="objectBoundingBox">
            <path d={FOLDER_TAB_RIGHT_PATH} />
          </clipPath>
        </defs>
      </svg>

      {/* ======================================================== */}
      {/* FLOATING TOP-RIGHT ACTION CONTROLS:                      */}
      {/* Wishlist, Add to Cart (Basket), and User Account          */}
      {/* (Identical spreading animation on every page)            */}
      {/* ======================================================== */}
      <div className="fixed top-5 sm:top-7 right-5 sm:right-8 z-40">
        <HeaderActionButtons
          wishlistCount={wishlistCount || wishlistIds.size}
          cartCount={cartCount}
          onOpenWishlist={onOpenWishlist || (() => showToast(wishlistIds.size > 0 ? `Sacred Wishlist (${wishlistIds.size} saved)` : 'Your Sacred Wishlist is empty'))}
          onOpenCart={onOpenCart || (() => {})}
          onOpenAccount={onOpenAccount || (() => showToast('Sacred Sadhaka Profile & Orders'))}
        />
      </div>

      {/* ======================================================== */}
      {/* 2. HERO BANNER: BRAND STADIUM CAPSULES & FLOATING BUBBLES */}
      {/*    (Directly matching user reference: [We] [Seek] [→] [Sanctum]) */}
      {/* ======================================================== */}
      <section className="relative w-full overflow-hidden pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Ambient Warm Vedic Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#D9C6A8]/20 via-[#C7833D]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* --- FLOATING CIRCULAR VIGNETTES (Exact Match to User Reference) --- */}
        {/* Left Upper Bubble: Sacred Turquoise Lake & Himalayan Reflection */}
        <div className="absolute left-3 sm:left-8 md:left-12 lg:left-20 top-6 sm:top-10 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-[0_8px_25px_rgba(38,32,27,0.12)] ring-4 ring-[#D9C6A8]/25 transition-transform duration-500 hover:scale-110 z-10 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=300&auto=format&fit=crop"
            alt="Sacred Lake"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left Lower Bubble: Misty Sacred Cedar Valley */}
        <div className="absolute left-14 sm:left-20 md:left-28 lg:left-40 top-32 sm:top-36 md:top-40 w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-[0_8px_25px_rgba(38,32,27,0.12)] ring-4 ring-[#D9C6A8]/25 transition-transform duration-500 hover:scale-110 z-10 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=300&auto=format&fit=crop"
            alt="Misty Valleys"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Upper Bubble: Azure High-Altitude Glacier Peak */}
        <div className="absolute right-3 sm:right-8 md:right-12 lg:right-20 top-8 sm:top-12 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-[0_8px_25px_rgba(38,32,27,0.12)] ring-4 ring-[#D9C6A8]/25 transition-transform duration-500 hover:scale-110 z-10 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=300&auto=format&fit=crop"
            alt="Glacier Sanctum"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Lower Bubble: Consecrated Golden Canyon Shrine */}
        <div className="absolute right-14 sm:right-20 md:right-28 lg:right-40 top-32 sm:top-36 md:top-40 w-11 h-11 sm:w-13 sm:h-13 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white shadow-[0_8px_25px_rgba(38,32,27,0.12)] ring-4 ring-[#D9C6A8]/25 transition-transform duration-500 hover:scale-110 z-10 hidden sm:block">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop"
            alt="Desert Canyon Sanctum"
            className="w-full h-full object-cover"
          />
        </div>

        {/* --- MAIN HERO HEADLINE (Exact Cadence & Typography) --- */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-montserrat text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#26201B] tracking-tight leading-[1.12]">
            Let's Make Our Journey<br />
            Sacred & Divine!
          </h1>

          {/* Subtitle */}
          <p className="font-dm text-xs sm:text-sm md:text-base text-[#8F6E5B] max-w-xl mx-auto mt-4 sm:mt-5 font-normal leading-relaxed">
            We curate consecrated Himalayan kora, VIP temple sanctum access, and high-altitude luxury charters guided by authentic Vedic scholars.
          </p>

          {/* Dual Action CTAs (Pill with Arrow + Minimal Dot Link) */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-7">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-full bg-white border border-[#26201B] hover:bg-[#26201B] hover:text-[#F7F1E5] text-[#26201B] font-dm text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all duration-300 group cursor-pointer"
            >
              <span>View Expeditions</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('bespoke-planner');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-3 py-2 text-[#26201B] hover:text-[#C7833D] font-dm text-xs sm:text-sm font-medium transition-colors cursor-pointer group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8B84B] ring-2 ring-[#E8B84B]/30 group-hover:scale-125 transition-transform" />
              <span>Plan Custom Yatra</span>
            </button>
          </div>
        </div>

        {/* --- 4 STADIUM / CAPSULE HERO CARDS (Exact match to reference row) --- */}
        <div className="relative z-10 w-full max-w-5xl mx-auto mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
          
          {/* Capsule 1: "We" (Ivory / White Capsule) */}
          <div 
            onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group h-36 sm:h-44 md:h-52 rounded-[36px] sm:rounded-[48px] md:rounded-[56px] bg-white border border-[#D9C6A8]/70 shadow-[0_10px_30px_rgba(38,32,27,0.06)] hover:shadow-[0_18px_40px_rgba(38,32,27,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center cursor-pointer select-none"
          >
            <span className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#26201B] tracking-tight group-hover:scale-105 transition-transform duration-300">
              We
            </span>
          </div>

          {/* Capsule 2: "Protect" / "Seek" (Glacier / Himalayan Ice Peak Photo Capsule) */}
          <div 
            onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group h-36 sm:h-44 md:h-52 rounded-[36px] sm:rounded-[48px] md:rounded-[56px] overflow-hidden relative shadow-[0_10px_30px_rgba(38,32,27,0.08)] hover:shadow-[0_18px_40px_rgba(38,32,27,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center cursor-pointer select-none"
          >
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
              alt="Himalayan Glacier"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />
            <span className="relative z-10 font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300">
              Seek
            </span>
          </div>

          {/* Capsule 3: "→" (Brand Warm Saffron Accent Capsule) */}
          <div 
            onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group h-36 sm:h-44 md:h-52 rounded-[36px] sm:rounded-[48px] md:rounded-[56px] bg-[#E8B84B] hover:bg-[#D9A030] shadow-[0_12px_32px_rgba(232,184,75,0.35)] hover:shadow-[0_18px_45px_rgba(232,184,75,0.5)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center cursor-pointer select-none"
          >
            <svg 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#26201B] transition-transform duration-300 group-hover:translate-x-2.5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12" />
              <polyline points="13 5 20 12 13 19" />
            </svg>
          </div>

          {/* Capsule 4: "Sanctum" / "Nature" (Consecrated Temple & Rocky Valley Photo Capsule) */}
          <div 
            onClick={() => {
              const el = document.getElementById('catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group h-36 sm:h-44 md:h-52 rounded-[36px] sm:rounded-[48px] md:rounded-[56px] overflow-hidden relative shadow-[0_10px_30px_rgba(38,32,27,0.08)] hover:shadow-[0_18px_40px_rgba(38,32,27,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center cursor-pointer select-none"
          >
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
              alt="Sacred Valley Sanctum"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            <span className="relative z-10 font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300">
              Sanctum
            </span>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 4. "TAKE A TOUR OF OUR SACRED PRIVILEGES & ACCOMMODATIONS" */}
      {/*    (Interactive 2x2 Bento: 2 spreaded, 2 small, dynamic toggle) */}
      {/* ======================================================== */}
      <section className="py-12 sm:py-18 px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Section Header matching Image 2 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#D9C6A8]/70">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#D9C6A8] shadow-xs mb-3">
              <span className="font-dm text-[11px] font-bold text-[#8F6E5B] uppercase tracking-wider">
                ॥ दिव्य सौविध्यम् ॥ &bull; SACRED PRIVILEGES
              </span>
            </div>

            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#26201B] leading-tight">
              Take A Tour Of Our Sacred Facilities
            </h2>
          </div>

          <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/85 max-w-md font-normal leading-relaxed">
            Reserve an escort for focused sadhana, VIP temple access, private helicopter charters, luxury Himalayan ashram suites, and pure satvik gastronomy.
          </p>
        </div>

        {/* 2x2 Interactive Expanding Layout (Two spreaded, two small in dynamic balance) */}
        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          
          {/* Row 1: Facility 0 (Default Big) & Facility 1 (Default Small) */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 w-full"
          >
            {[SACRED_FACILITIES[0], SACRED_FACILITIES[1]].map((facility, localIdx) => {
              // Card 0 is big by default; Card 1 becomes big ONLY when cursor is on it
              const isSpread = localIdx === 0 ? !isCard1Hovered : isCard1Hovered;
              const isSmallCard = localIdx === 1; // Only the small card expands on hover

              return (
                <div
                  key={facility.id}
                  onMouseEnter={isSmallCard ? () => setIsCard1Hovered(true) : undefined}
                  onMouseLeave={isSmallCard ? () => setIsCard1Hovered(false) : undefined}
                  onClick={() => setActiveFacility(facility)}
                  className={`group relative overflow-hidden rounded-[26px] sm:rounded-[30px] cursor-pointer transition-all duration-500 ease-out shadow-lg hover:shadow-2xl border border-black/10 bg-[#26201B] h-[260px] sm:h-[290px] ${
                    isSpread ? 'flex-[1.8] sm:flex-[2.2]' : 'flex-[1]'
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />

                  {/* Top Bar: Tag on Left, White Circular Arrow Button on Right (Matching Image 2) */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10px] font-dm font-bold uppercase tracking-wider">
                      {facility.tag}
                    </span>

                    {/* White Circular Arrow Button (Signature element from reference) */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#26201B] flex items-center justify-center font-bold shadow-md group-hover:bg-[#C7833D] group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Content Area at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight drop-shadow-sm">
                      {facility.title}
                    </h3>

                    {/* Expanded details when spreaded (Matching Image 2 text box) */}
                    {isSpread ? (
                      <div className="mt-2">
                        <div className="p-3 sm:p-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 max-w-xl">
                          <p className="font-dm text-xs text-[#F7F1E5]/95 line-clamp-2 leading-relaxed">
                            {facility.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-dm">
                            {facility.subtitle}
                          </span>
                          <span className="text-[11px] font-dm font-bold text-[#D9C6A8] flex items-center gap-1 group-hover:text-white transition-colors">
                            Explore Privilege ➔
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1">
                        <span className="font-dm text-xs text-[#D9C6A8] line-clamp-1">
                          {facility.subtitle}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Row 2: Facility 2 (Default Small) & Facility 3 (Default Big) */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 w-full"
          >
            {[SACRED_FACILITIES[2], SACRED_FACILITIES[3]].map((facility, localIdx) => {
              // Card 2 is small by default, spreads on hover. Card 3 is big by default.
              const isSpread = localIdx === 0 ? isCard2Hovered : !isCard2Hovered;
              const isSmallCard = localIdx === 0; // Only the small card expands on hover

              return (
                <div
                  key={facility.id}
                  onMouseEnter={isSmallCard ? () => setIsCard2Hovered(true) : undefined}
                  onMouseLeave={isSmallCard ? () => setIsCard2Hovered(false) : undefined}
                  onClick={() => setActiveFacility(facility)}
                  className={`group relative overflow-hidden rounded-[26px] sm:rounded-[30px] cursor-pointer transition-all duration-500 ease-out shadow-lg hover:shadow-2xl border border-black/10 bg-[#26201B] h-[260px] sm:h-[290px] ${
                    isSpread ? 'flex-[1.8] sm:flex-[2.2]' : 'flex-[1]'
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />

                  {/* Top Bar: Tag on Left, White Circular Arrow Button on Right (Matching Image 2) */}
                  <div className="relative z-10 p-5 sm:p-6 flex items-start justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[10px] font-dm font-bold uppercase tracking-wider">
                      {facility.tag}
                    </span>

                    {/* White Circular Arrow Button */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#26201B] flex items-center justify-center font-bold shadow-md group-hover:bg-[#C7833D] group-hover:text-white transition-colors duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>

                  {/* Content Area at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                    <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight drop-shadow-sm">
                      {facility.title}
                    </h3>

                    {/* Expanded details when spreaded */}
                    {isSpread ? (
                      <div className="mt-2">
                        <div className="p-3 sm:p-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 max-w-xl">
                          <p className="font-dm text-xs text-[#F7F1E5]/95 line-clamp-2 leading-relaxed">
                            {facility.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-dm">
                            {facility.subtitle}
                          </span>
                          <span className="text-[11px] font-dm font-bold text-[#D9C6A8] flex items-center gap-1 group-hover:text-white transition-colors">
                            Explore Privilege ➔
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-1">
                        <span className="font-dm text-xs text-[#D9C6A8] line-clamp-1">
                          {facility.subtitle}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 5. ALL YATRAS CATALOG: CIRCUITS, SEARCH & FILTERS        */}
      {/* ======================================================== */}
      <section id="catalog" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-dm font-bold text-[#C7833D] uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>॥ सर्व तीर्थ सूची ॥ COMPLETE EXPEDITION DIRECTORY</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#26201B]">
            Choose Your Sacred Circuit
          </h2>
          <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/80 mt-1">
            Filter by geographic circuit, pilgrimage duration, and season departure.
          </p>
        </div>

        {/* Circuit Pill Switchers */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
          {YATRA_CIRCUITS_CONFIG.map((circuit) => {
            const isSelected = selectedCircuit === circuit.id;
            return (
              <button
                key={circuit.id}
                type="button"
                onClick={() => setSelectedCircuit(circuit.id)}
                className={`group relative px-4 py-2 rounded-full text-xs font-dm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#26201B] border-[#26201B] text-[#F7F1E5] shadow-md scale-105'
                    : 'bg-white/80 border-[#D9C6A8] text-[#8F6E5B] hover:border-[#B08A4A] hover:bg-white'
                }`}
              >
                <span>{circuit.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-[#C7833D] text-white' : 'bg-[#D9C6A8]/40 text-[#8F6E5B]'
                }`}>
                  {circuit.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search, Duration & Sort Bar */}
        <div className="bg-white/90 border border-[#D9C6A8] rounded-2xl p-4 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8F6E5B]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by deity, temple, or city..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F7F1E5]/70 border border-[#D9C6A8]/70 focus:border-[#C7833D] text-xs text-[#8F6E5B] outline-none font-dm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8F6E5B]/50 hover:text-[#8F6E5B]"
              >
                ×
              </button>
            )}
          </div>

          {/* Duration Filters */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-dm font-semibold text-[#8F6E5B]/70 mr-1 shrink-0">Duration:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'short', label: '3-4 Days' },
              { id: 'medium', label: '5-8 Days' },
              { id: 'long', label: '9+ Days (Kailash)' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDuration(d.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-dm font-medium shrink-0 transition-all cursor-pointer ${
                  selectedDuration === d.id
                    ? 'bg-[#C7833D] text-white font-bold'
                    : 'bg-[#F7F1E5] text-[#8F6E5B] hover:bg-[#D9C6A8]/30'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-dm font-semibold text-[#8F6E5B]/70 shrink-0">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1.5 rounded-xl bg-[#F7F1E5] border border-[#D9C6A8] text-xs font-dm text-[#8F6E5B] outline-none cursor-pointer"
            >
              <option value="featured">Most Sacred & Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Seeker Rating (5.0★)</option>
              <option value="duration">Duration (Days)</option>
            </select>
          </div>

        </div>

        {/* Curvy Colored Section Background containing 2-Row Horizontal Scroll Grid */}
        {filteredYatras.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/60 rounded-3xl border border-[#D9C6A8]">
            <Compass className="w-12 h-12 text-[#B08A4A] mx-auto mb-3 opacity-60" />
            <h3 className="font-cormorant text-2xl font-bold text-[#8F6E5B]">No Sacred Expeditions Found</h3>
            <p className="font-dm text-xs text-[#8F6E5B]/70 mt-1 max-w-md mx-auto">
              We couldn't find yatras matching your filter criteria. Try resetting the filters or inquire about a custom bespoke pilgrimage.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCircuit('all');
                setSelectedDuration('all');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2 rounded-full bg-[#C7833D] text-white font-dm text-xs font-bold"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 45, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[36px] sm:rounded-[48px] p-4 sm:p-6 md:p-8 border border-[#D4B086] bg-gradient-to-br from-[#F5E2C8] via-[#EED4B6] to-[#E3C29E] shadow-[0_16px_45px_rgba(38,32,27,0.08)] transition-all"
          >
            
            {/* Floating Left Flanking Arrow on Carousel Edge */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.2 }}
              type="button"
              onClick={() => scrollPackagesHorizontally('left')}
              className="flex absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white/95 hover:bg-[#26201B] text-[#5E4B3E] hover:text-white border border-[#D9C6A8] hover:border-[#26201B] shadow-xl items-center justify-center cursor-pointer active:scale-90 transition-all backdrop-blur-xs"
              aria-label="Scroll expeditions left"
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6" />
            </motion.button>

            {/* Floating Right Flanking Arrow on Carousel Edge */}
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: 0.2 }}
              type="button"
              onClick={() => scrollPackagesHorizontally('right')}
              className="flex absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-white/95 hover:bg-[#26201B] text-[#5E4B3E] hover:text-white border border-[#D9C6A8] hover:border-[#26201B] shadow-xl items-center justify-center cursor-pointer active:scale-90 transition-all backdrop-blur-xs"
              aria-label="Scroll expeditions right"
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6" />
            </motion.button>

            {/* 2-Row Horizontal Scroll Grid */}
            <div
              ref={packagesScrollRef}
              className="grid grid-rows-2 grid-flow-col auto-cols-[300px] sm:auto-cols-[340px] md:auto-cols-[380px] gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-2 px-1 sm:px-2 no-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredYatras.map((yatra, idx) => (
                <motion.div
                  key={yatra.id}
                  initial={{ opacity: 0, y: 35, scale: 0.93 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, amount: 0.05 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: Math.min((idx % 6) * 0.07 + 0.08, 0.45), 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative bg-white/95 border border-[#D9C6A8] hover:border-[#B08A4A] rounded-3xl overflow-hidden shadow-[0_8px_25px_rgba(51,44,37,0.06)] hover:shadow-[0_18px_40px_rgba(51,44,37,0.14)] transition-shadow duration-300 flex flex-col justify-between snap-start w-full"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-black/10">
                    <img
                      src={yatra.image}
                      alt={yatra.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badge */}
                    {yatra.badge && (
                      <div className="absolute top-2.5 left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-[#26201B]/85 border border-[#B08A4A]/50 text-[#D9C6A8] text-[9px] font-dm font-bold uppercase tracking-wider backdrop-blur-xs">
                        {yatra.badge}
                      </div>
                    )}

                    {/* Duration Tag */}
                    <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-white/95 text-[#332C25] text-[10px] font-dm font-bold flex items-center gap-1 shadow-xs">
                      <Clock className="w-3 h-3 text-[#C7833D]" />
                      <span>{yatra.durationDays}D / {yatra.durationNights}N</span>
                    </div>

                    {/* Rating Pill */}
                    <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/70 text-white text-[10px] font-dm font-semibold flex items-center gap-1 backdrop-blur-xs">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{yatra.rating.toFixed(2)}</span>
                      <span className="text-white/60">({yatra.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Location */}
                      <div className="flex items-center gap-1 text-[11px] font-dm text-[#C7833D] font-medium mb-1">
                        <MapPin className="w-3 h-3" />
                        <span>Starts from {yatra.startLocation}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#26201B] group-hover:text-[#C7833D] transition-colors leading-tight line-clamp-1">
                        {yatra.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="font-dm text-xs text-[#8F6E5B]/80 mt-1 line-clamp-2 leading-relaxed">
                        {yatra.subtitle}
                      </p>

                      {/* Key Highlights */}
                      <div className="mt-3 space-y-1 pt-2.5 border-t border-[#D9C6A8]/60">
                        {yatra.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-xs font-dm text-[#332C25]/85">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#66705A] shrink-0 mt-0.5" />
                            <span className="line-clamp-1 text-[11px] sm:text-xs">{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Next Batch Departure Dates */}
                      <div className="mt-3 p-2 rounded-xl bg-[#F7F1E5]/80 border border-[#D9C6A8]/70 flex items-center justify-between text-[10px] sm:text-[11px] font-dm">
                        <span className="text-[#8F6E5B]/70 flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3 text-[#B08A4A]" />
                          <span>Next Batch:</span>
                        </span>
                        <span className="font-semibold text-[#26201B]">
                          {yatra.nextBatches[0]}
                        </span>
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div className="mt-3.5 pt-3 border-t border-[#D9C6A8] flex items-center justify-between gap-2">
                      <div>
                        <span className="block text-[9px] font-dm text-[#8F6E5B]/70 uppercase tracking-wider">
                          All-Inclusive Pass
                        </span>
                        <span className="font-cormorant text-xl sm:text-2xl font-bold text-[#26201B]">
                          ₹{yatra.pricePerPerson.toLocaleString()}
                        </span>
                        <span className="text-[9px] font-dm text-[#8F6E5B]/60 block -mt-0.5">
                          per seeker
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedYatra(yatra)}
                          className="px-3 py-1.5 rounded-xl bg-[#D9C6A8]/30 hover:bg-[#D9C6A8]/60 border border-[#D9C6A8] text-xs font-dm font-semibold text-[#26201B] transition-all cursor-pointer"
                        >
                          Itinerary
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedYatra(yatra)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#C7833D] to-[#B08A4A] hover:from-[#B08A4A] hover:to-[#C7833D] text-[#F7F1E5] text-xs font-dm font-bold shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </section>

      {/* ======================================================== */}
      {/* 6. BESPOKE PRIVATE YATRA CUSTOMIZER (CUSTOM PILGRIMAGES) */}
      {/*    (Packed in Curvy Frame matching product page sections) */}
      {/* ======================================================== */}
      <section id="bespoke-planner" className="py-12 sm:py-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Editorial Typography Header (Outside the curvy frame) */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#D9C6A8] text-[#C7833D] text-xs font-dm font-bold tracking-widest uppercase mb-3 shadow-xs">
            <span>॥ सङ्कल्प सेवा ॥ &bull; BESPOKE PILGRIMAGE CONCIERGE</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#26201B] leading-tight">
            Design a Custom Private Family or Senior Yatra
          </h2>
          <p className="font-dm text-xs sm:text-sm md:text-base text-[#8F6E5B] max-w-2xl mx-auto mt-2.5 font-normal leading-relaxed">
            Tailored dates, dedicated helicopter charters, private wheelchair/palanquin escorts for elderly parents, and priest-conducted Vedic Hawan rituals.
          </p>
        </div>

        {/* Curvy Colored Section Background containing Bespoke Planner Form */}
        <motion.div 
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[36px] sm:rounded-[48px] p-6 sm:p-10 md:p-12 border border-[#B08A4A]/40 bg-gradient-to-br from-[#2E2620] via-[#26201B] to-[#1C1713] text-[#F7F1E5] shadow-[0_20px_55px_rgba(38,32,27,0.16)] overflow-hidden"
        >
          
          {/* Subtle Ambient Radial Gold Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C7833D]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B08A4A]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Subtle Watermark Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, #F7F1E5 1px, transparent 1px)`,
              backgroundSize: '28px 28px'
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            {customSubmitted ? (
              <div className="text-center py-10 px-4">
                <div className="w-16 h-16 rounded-full bg-[#66705A]/30 text-[#D9C6A8] flex items-center justify-center mx-auto mb-4 border border-[#66705A]">
                  <CheckCircle2 className="w-8 h-8 text-[#D9C6A8]" />
                </div>
                <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#F7F1E5]">
                  Sacred Custom Pilgrimage Inquiry Received
                </h3>
                <p className="mt-2 font-dm text-sm text-[#D9C6A8] max-w-md mx-auto">
                  Namaste, <strong className="text-white">{customForm.name || 'Devotee'}</strong>. Our Senior Yatra Acharya is preparing your customized pilgrimage proposal with all VIP conveniences and will call you within 4 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setCustomSubmitted(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#C7833D] text-white font-dm font-semibold text-xs tracking-wider uppercase cursor-pointer hover:bg-[#B08A4A] transition-colors"
                >
                  Plan Another Journey
                </button>
              </div>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-6">
                
                {/* Row 1: Circuit & Travelers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-dm font-bold text-[#D9C6A8] uppercase tracking-wider mb-2">
                      1. Desired Pilgrimage Circuit
                    </label>
                    <select
                      value={customForm.circuit}
                      onChange={(e) => setCustomForm({ ...customForm, circuit: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D9C6A8]/50 focus:border-[#C7833D] text-sm text-[#F7F1E5] outline-none font-dm cursor-pointer"
                    >
                      <option value="Himalayan & Kailash" className="bg-[#26201B]">Himalayan & Kailash (Kedarnath, Badrinath, Mansarovar)</option>
                      <option value="Char Dham & Puri" className="bg-[#26201B]">Char Dham & East (Puri Jagannath, Konark)</option>
                      <option value="51 Shakti Peethas" className="bg-[#26201B]">51 Shakti Peethas (Kamakhya, Kalighat, Tarapith)</option>
                      <option value="Braj & Rajasthan" className="bg-[#26201B]">Braj & Rajasthan (Khatu Shyam, Vrindavan, Salasar)</option>
                      <option value="12 Jyotirlingas" className="bg-[#26201B]">12 Jyotirlingas (Kashi Vishwanath, Somnath, Mahakal)</option>
                      <option value="South Dravidian Corridors" className="bg-[#26201B]">South Temples (Rameshwaram, Madurai, Tirupati)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-dm font-bold text-[#D9C6A8] uppercase tracking-wider mb-2">
                      2. Travel Party Composition
                    </label>
                    <select
                      value={customForm.travelers}
                      onChange={(e) => setCustomForm({ ...customForm, travelers: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D9C6A8]/50 focus:border-[#C7833D] text-sm text-[#F7F1E5] outline-none font-dm cursor-pointer"
                    >
                      <option value="Elderly Parents (Senior Care)" className="bg-[#26201B]">Elderly Parents (Requires Ground/Heli Assistance)</option>
                      <option value="Family with Children" className="bg-[#26201B]">Family with Children (Comfort & Leisure Focus)</option>
                      <option value="Couple Sadhana" className="bg-[#26201B]">Couple Sadhana (Private Rituals & Quiet Stays)</option>
                      <option value="Solo Spiritual Seeker" className="bg-[#26201B]">Solo Spiritual Seeker (Intensive Sadhana)</option>
                      <option value="Group Sangha (8+ Devotees)" className="bg-[#26201B]">Group Sangha (8+ Devotees)</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: Travel Timing & Privileges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-dm font-bold text-[#D9C6A8] uppercase tracking-wider mb-2">
                      3. Preferred Shubh Muhurat Month
                    </label>
                    <select
                      value={customForm.travelMonth}
                      onChange={(e) => setCustomForm({ ...customForm, travelMonth: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D9C6A8]/50 focus:border-[#C7833D] text-sm text-[#F7F1E5] outline-none font-dm cursor-pointer"
                    >
                      <option value="Upcoming Shubh Muhurat (Next 30-60 Days)" className="bg-[#26201B]">Upcoming Shubh Muhurat (Next 30-60 Days)</option>
                      <option value="Navratri / Diwali Festival Batch" className="bg-[#26201B]">Navratri / Diwali Festival Batch</option>
                      <option value="Summer 2026 Himalayan Window" className="bg-[#26201B]">Summer 2026 Himalayan Window (May - June)</option>
                      <option value="Autumn / Winter 2026" className="bg-[#26201B]">Autumn / Winter 2026 (Oct - Dec)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-dm font-bold text-[#D9C6A8] uppercase tracking-wider mb-2">
                      4. Essential Sacred Comforts
                    </label>
                    <input
                      type="text"
                      value={customForm.specialNeeds}
                      onChange={(e) => setCustomForm({ ...customForm, specialNeeds: e.target.value })}
                      placeholder="e.g. Helicopter shuttle, Oxygen support, Personal priest"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-[#D9C6A8]/50 focus:border-[#C7833D] text-sm text-[#F7F1E5] outline-none font-dm"
                    />
                  </div>
                </div>

                {/* Row 3: Devotee Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
                  <div>
                    <label className="block text-xs font-dm text-[#D9C6A8] mb-1">Devotee Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customForm.name}
                      onChange={(e) => setCustomForm({ ...customForm, name: e.target.value })}
                      placeholder="e.g. Dr. Anand Mohan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-[#D9C6A8]/50 focus:border-[#C7833D] text-sm text-[#F7F1E5] outline-none font-dm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-dm text-[#D9C6A8] mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={customForm.phone}
                      onChange={(e) => setCustomForm({ ...customForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-[#D9C6A8]/50 focus:border-[#C7833D] text-sm text-[#F7F1E5] outline-none font-dm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-dm text-[#D9C6A8] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={customForm.email}
                      onChange={(e) => setCustomForm({ ...customForm, email: e.target.value })}
                      placeholder="anand@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-[#D9C6A8]/50 focus:border-[#C7833D] text-sm text-[#F7F1E5] outline-none font-dm"
                    />
                  </div>
                </div>

                {/* Submit Row */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-[#D9C6A8]">
                    <ShieldCheck className="w-4 h-4 text-[#C7833D]" />
                    <span>Free personalized consultation &bull; Zero spam guarantee</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#C7833D] to-[#B08A4A] hover:from-[#B08A4A] hover:to-[#C7833D] text-[#F7F1E5] font-dm font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Bespoke Yatra Proposal</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </section>

      {/* ======================================================== */}
      {/* 10. LUXURY FOOTER                                        */}
      {/* ======================================================== */}
      <Footer />

      {/* ======================================================== */}
      {/* 11. DAY-BY-DAY ITINERARY & BOOKING MODAL (YatraModal)    */}
      {/* ======================================================== */}
      {selectedYatra && (
        <YatraModal
          yatra={selectedYatra}
          onClose={() => setSelectedYatra(null)}
        />
      )}

      {/* Facility Detail Modal */}
      {activeFacility && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn"
          onClick={() => setActiveFacility(null)}
        >
          <div 
            className="relative w-full max-w-xl bg-[#F7F1E5] border border-[#B08A4A] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveFacility(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 border border-[#D9C6A8] flex items-center justify-center text-[#8F6E5B] hover:text-black cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full h-48 rounded-2xl overflow-hidden mb-4">
              <img src={activeFacility.image} alt={activeFacility.title} className="w-full h-full object-cover" />
            </div>

            <span className="text-[11px] font-dm font-bold text-[#C7833D] uppercase tracking-wider">
              {activeFacility.subtitle}
            </span>
            <h3 className="font-cormorant text-2xl font-bold text-[#26201B] mt-0.5">
              {activeFacility.title}
            </h3>
            <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/85 mt-2 leading-relaxed">
              {activeFacility.description}
            </p>

            <div className="mt-4 pt-3 border-t border-[#D9C6A8]">
              <span className="block text-xs font-dm font-bold text-[#26201B] uppercase mb-2">
                Sanctuary Inclusions:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {activeFacility.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs font-dm text-[#332C25]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#66705A]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveFacility(null)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#26201B] text-[#F7F1E5] font-dm text-xs font-bold uppercase tracking-wider"
            >
              Close Privileges
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
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
