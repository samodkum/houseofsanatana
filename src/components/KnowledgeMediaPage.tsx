import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  Search, 
  Film, 
  Music, 
  BookOpen, 
  Radio, 
  Compass, 
  Sparkles, 
  Eye, 
  Clock, 
  Share2, 
  Download, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  Volume2, 
  VolumeX, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Heart
} from 'lucide-react';
import { 
  KNOWLEDGE_MEDIA_ITEMS, 
  MEDIA_CATEGORIES_CONFIG, 
  KnowledgeMediaItem, 
  MediaCategoryType 
} from '../data/mediaData';
import { HeaderActionButtons } from './HeaderActionButtons';
import { Footer } from './Footer';
import { MosaicGallerySection } from './MosaicGallerySection';
import { ScrapbookConnectSection } from './ScrapbookConnectSection';
import { InteractiveBook } from './InteractiveBook';

interface KnowledgeMediaPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateMall: () => void;
  onNavigateTravel: () => void;
  onNavigateJoin?: () => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
  cartCount?: number;
  wishlistCount?: number;
}

// Sound Synthesizer for Vedic Drone / Tanpura Chords using Web Audio API
const createVedicAudioTone = () => {
  try {
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContext) return null;
    const ctx = new AudioContext();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Harmonic Tanpura frequencies (C# base: 138.59Hz, Sa-Pa-Sa)
    const freqs = [138.59, 207.65, 277.18, 415.30];
    const oscs: OscillatorNode[] = [];

    freqs.forEach((f) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.2, ctx.currentTime);
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      oscs.push(osc);
    });

    return {
      stop: () => {
        try {
          masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
          setTimeout(() => {
            oscs.forEach(o => o.stop());
            ctx.close();
          }, 900);
        } catch {}
      }
    };
  } catch {
    return null;
  }
};

export const KnowledgeMediaPage: React.FC<KnowledgeMediaPageProps> = ({
  onNavigateHome,
  onNavigateMall,
  onNavigateTravel,
  onNavigateJoin,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  cartCount = 0,
  wishlistCount = 0
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'video' | 'audio' | 'article'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'popular' | 'newest'>('featured');
  
  // Interactive Modals
  const [activeVideoModal, setActiveVideoModal] = useState<KnowledgeMediaItem | null>(null);
  const [activeArticleModal, setActiveArticleModal] = useState<KnowledgeMediaItem | null>(null);
  
  // Live Audio Playback state
  const [playingItemId, setPlayingItemId] = useState<string | null>(null);
  const audioInstanceRef = useRef<{ stop: () => void } | null>(null);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleAudio = (item: KnowledgeMediaItem) => {
    if (playingItemId === item.id) {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.stop();
        audioInstanceRef.current = null;
      }
      setPlayingItemId(null);
      showToast('Paused sacred chant');
    } else {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.stop();
      }
      const instance = createVedicAudioTone();
      audioInstanceRef.current = instance;
      setPlayingItemId(item.id);
      showToast(`Now chanting: ${item.title}`);
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioInstanceRef.current) {
        audioInstanceRef.current.stop();
      }
    };
  }, []);

  // Filtered and sorted items
  const filteredItems = useMemo(() => {
    let list = [...KNOWLEDGE_MEDIA_ITEMS];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter(item => item.category === selectedCategory);
    }

    // Media type filter
    if (typeFilter !== 'all') {
      list = list.filter(item => item.type === typeFilter);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.templeOrSource.toLowerCase().includes(q) ||
        item.authorOrSinger.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'popular') {
      list.sort((a, b) => (parseInt(b.viewsOrReads) || 0) - (parseInt(a.viewsOrReads) || 0));
    }

    return list;
  }, [selectedCategory, typeFilter, searchQuery, sortBy]);

  const scrollToCatalog = () => {
    const el = document.getElementById('media-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const shareItem = (item: KnowledgeMediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.href);
    showToast(`Link to "${item.title}" copied to clipboard!`);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#FFF8E7] text-[#1A1612] font-dm selection:bg-[#B08A4A]/20">
      
      {/* ======================================================== */}
      {/* 1. TOP STICKY NAVIGATION BAR                            */}
      <nav className="sticky top-0 z-40 w-full bg-[#FFF8E7]/90 backdrop-blur-md transition-all">
        <div className="w-full pl-20 sm:pl-24 pr-5 sm:pr-8 lg:pr-12 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Left: Brand Back to Home Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => onNavigateHome('home')}
              className="group flex items-center gap-2 py-2 px-3.5 sm:px-4 rounded-full bg-white border border-[#D9C6A8] hover:border-[#1A1612] shadow-2xs transition-all text-xs font-dm font-semibold text-[#8F6E5B] hover:text-[#1A1612] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Right: Action Controls (Wishlist, Cart, Account) shifted to corner */}
          <div className="flex items-center gap-3 sm:gap-5">
            <HeaderActionButtons
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              onOpenWishlist={onOpenWishlist || (() => showToast('Sacred Wishlist'))}
              onOpenCart={onOpenCart || (() => showToast('Sacred Basket'))}
              onOpenAccount={onOpenAccount || (() => showToast('Sadhaka Account'))}
            />
          </div>

        </div>
      </nav>

      {/* ======================================================== */}
      {/* 2. HERO SECTION: EXACT FIDELITY TO USER'S REFERENCE      */}
      {/*    Ample breathing space below heading, true coordinates  */}
      {/*    for center oval and 4 satellite circles                */}
      {/* ======================================================== */}
      <section className="relative w-full pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-12 overflow-hidden px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Soft Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-gradient-to-b from-[#C7833D]/8 via-[#B08A4A]/4 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* --- MAIN HERO HEADLINE: Clean, elegant, light/regular weight --- */}
        <div className="relative z-10 max-w-3xl mx-auto mb-1 sm:mb-2">
          <h1 className="font-cormorant text-3xl sm:text-5xl md:text-[54px] lg:text-[58px] font-normal tracking-tight text-[#1A1612] leading-[1.18]">
            Take a glance at <br />
            <span className="inline-flex items-center gap-2 sm:gap-2.5 align-middle my-1 font-normal">
              {/* Avatar 1: Vedic Acharya */}
              <span className="inline-block w-8 sm:w-10 md:w-11 h-8 sm:h-10 md:h-11 rounded-full overflow-hidden border-2 border-white shadow-xs">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=150&q=80" 
                  alt="Vedic Scholar" 
                  className="w-full h-full object-cover" 
                />
              </span>
              {/* Avatar 2: Devotional Artist */}
              <span className="inline-block w-8 sm:w-10 md:w-11 h-8 sm:h-10 md:h-11 rounded-full overflow-hidden border-2 border-white shadow-xs -ml-3 sm:-ml-3.5">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80" 
                  alt="Vedic Artist" 
                  className="w-full h-full object-cover" 
                />
              </span>
              {/* Icon 3: Sleek Solid Black Circle with Play Button */}
              <span className="inline-flex items-center justify-center w-8 sm:w-10 md:w-11 h-8 sm:h-10 md:h-11 rounded-full bg-[#1A1612] text-white shadow-xs -ml-3 sm:-ml-3.5">
                <Play className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-white ml-0.5" />
              </span>
            </span>{' '}
            <span className="font-normal text-[#1A1612]">our sacred work.</span>
          </h1>
        </div>

        {/* --- FLOATING VIGNETTES COMPOSITION CONTAINER (Wider Stage with Generous Satellite Spacing) --- */}
        <div className="relative w-full max-w-[1180px] mx-auto h-[340px] sm:h-[410px] md:h-[450px] lg:h-[480px] -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8 px-2 sm:px-4 select-none">
          
          {/* 1. UPPER-LEFT SATELLITE: Green Harvest Bowl (Pushed further away to the left) */}
          <div className="absolute left-[0%] sm:left-[1%] md:left-[1%] lg:left-[1%] top-[18%] sm:top-[20%] md:top-[21%] w-20 sm:w-28 md:w-34 lg:w-38 aspect-square rounded-full overflow-hidden border-3 sm:border-4 border-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-108 z-10">
            <img
              src="https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=400&q=80"
              alt="Sacred Samagri Bowl"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 2. LOWER-LEFT SATELLITE: Golden Sunset Field (Pushed further away and downward) */}
          <div className="absolute left-[6%] sm:left-[8%] md:left-[9%] lg:left-[10%] bottom-[1%] sm:bottom-[2%] md:bottom-[3%] w-14 sm:w-18 md:w-22 lg:w-24 aspect-square rounded-full overflow-hidden border-3 sm:border-4 border-white shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-108 z-10">
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=300&q=80"
              alt="Golden Dawn Yatra"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 3. CENTRAL LARGE STADIUM/OVAL WINDOW: Living Sacred Agriculture & Ashram Seva */}
          <div 
            onClick={() => setActiveVideoModal(KNOWLEDGE_MEDIA_ITEMS[0])}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[370px] md:w-[445px] lg:w-[500px] h-[188px] sm:h-[265px] md:h-[318px] lg:h-[352px] rounded-[95px] sm:rounded-[135px] md:rounded-[160px] lg:rounded-[175px] overflow-hidden border-4 sm:border-6 border-white shadow-[0_25px_60px_rgba(26,22,18,0.16)] group cursor-pointer transition-transform duration-500 hover:scale-[1.02] z-0"
          >
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
              alt="House of Sanatan Documentary"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Soft Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 group-hover:from-black/35 transition-colors" />

            {/* Central Translucent Frosted Glass Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 sm:w-18 md:w-20 h-14 sm:h-18 md:h-20 rounded-full bg-white/75 hover:bg-white text-[#1A1612] shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-112 active:scale-95">
                <Play className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 fill-[#1A1612] ml-1" />
              </div>
            </div>
          </div>

          {/* 4. UPPER-RIGHT SATELLITE: Lush Sacred Green Tulsi / Bilva Foliage (Pushed higher and further right) */}
          <div className="absolute right-[4%] sm:right-[5%] md:right-[6%] lg:right-[7%] top-[0%] sm:top-[1%] md:top-[2%] w-16 sm:w-22 md:w-26 lg:w-28 aspect-square rounded-full overflow-hidden border-3 sm:border-4 border-white shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-108 z-10">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80"
              alt="Sacred Bilva Leaves"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 5. LOWER-RIGHT SATELLITE: Devotional Hands Offering Consecrated Sprouts (Pushed further outward to the right) */}
          <div className="absolute right-[0%] sm:right-[0%] md:right-[0%] lg:right-[0%] top-[44%] sm:top-[46%] md:top-[48%] w-22 sm:w-30 md:w-36 lg:w-40 aspect-square rounded-full overflow-hidden border-3 sm:border-4 border-white/95 shadow-[0_14px_35px_rgba(0,0,0,0.12)] transition-transform duration-500 hover:scale-108 z-10">
            <img
              src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=400&q=80"
              alt="Hands Holding Consecrated Offering"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 6. BOTTOM-RIGHT CAPSULE BUTTON: "learn more »" (Exact Reproduction of Reference Image) */}
          <div className="absolute right-[14%] sm:right-[18%] md:right-[20%] lg:right-[22%] bottom-[0%] sm:bottom-[1%] md:bottom-[2%] z-20">
            <button
              type="button"
              onClick={scrollToCatalog}
              className="rounded-full border border-stone-300/80 bg-white/95 hover:bg-[#1A1612] text-stone-700 hover:text-white pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 flex items-center gap-2.5 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300 group cursor-pointer active:scale-95"
            >
              <span className="font-dm text-xs sm:text-[13px] font-normal tracking-normal text-stone-600 group-hover:text-white">
                learn more
              </span>
              <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-[#1A1612] group-hover:bg-white text-white group-hover:text-[#1A1612] flex items-center justify-center transition-colors">
                <span className="text-[11px] sm:text-xs font-bold leading-none select-none">»</span>
              </div>
            </button>
          </div>

        </div>

      </section>

      {/* ======================================================== */}
      {/* 2.5 MOSAIC GALLERY HORIZONTAL SCROLL SECTION             */}
      {/* ======================================================== */}
      <MosaicGallerySection />

      {/* ======================================================== */}
      {/* 2.7 INTERACTIVE SACRED KNOWLEDGE COMPENDIUM (3D BOOK)    */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto text-center relative overflow-visible">
        
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#D9C6A8] text-[#C7833D] text-xs font-dm font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B08A4A]" />
            <span>॥ पावन ग्रन्थ ॥ &bull; SACRED YATRA COMPENDIUM</span>
          </div>
          
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#26201B] leading-tight">
            Flip Through The Sacred Yatra Granth
          </h2>

          <p className="font-dm text-xs sm:text-sm text-[#8F6E5B] max-w-xl mx-auto mt-2.5 font-normal leading-relaxed">
            Click anywhere on the book to turn pages through consecrated Himalayan trails, sanctum darshan protocols, and divine Vedic journeys.
          </p>
        </div>

        {/* 3D Interactive Flipping Book Canvas */}
        <div className="flex justify-center items-center overflow-visible">
          <InteractiveBook
            width={340}
            height={490}
            frontCover="https://images.unsplash.com/photo-1609137144813-7d9921338f24?q=80&w=800&auto=format&fit=crop"
            innerPages={[
              "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop"
            ]}
            backCover="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop"
            borderRadius={12}
            shadow={{
              color: "#26201B",
              opacity: 0.28,
              blur: 35,
              offsetX: 12,
              offsetY: 18,
              spread: 0,
            }}
          />
        </div>

      </section>

      {/* ======================================================== */}
      {/* 3. KNOWLEDGE & MEDIA EXPLORER CATALOG SECTION            */}
      {false && (
        <>
      <section id="media-catalog" className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Heading & Stats Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-end gap-6 mb-8 sm:mb-10">
          {/* Search Input Bar */}
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Kashi, Stotras, Upanishads..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#D9C6A8] text-xs font-dm text-[#1A1612] placeholder-[#8F6E5B]/50 focus:outline-none focus:border-[#C7833D] shadow-2xs transition-all"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills & Format Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EBE7DF]">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {MEDIA_CATEGORIES_CONFIG.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as MediaCategoryType)}
                  className={`py-2 px-4 rounded-full text-xs font-dm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1A1612] text-white shadow-sm'
                      : 'bg-white text-[#8F6E5B] border border-[#D9C6A8] hover:border-[#1A1612]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Format Type Dropdown & Sorter */}
          <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="py-2 px-3 rounded-xl bg-white border border-[#D9C6A8] text-xs font-dm text-[#8F6E5B] focus:outline-none focus:border-[#C7833D] cursor-pointer"
            >
              <option value="all">All Formats</option>
              <option value="video">4K Videos Only</option>
              <option value="audio">Audio Chants Only</option>
              <option value="article">Scriptures & Reads</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-xl bg-white border border-[#D9C6A8] text-xs font-dm text-[#8F6E5B] focus:outline-none focus:border-[#C7833D] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="popular">Most Viewed</option>
            </select>
          </div>

        </div>

        {/* Media Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#D9C6A8] mt-8">
            <BookOpen className="w-12 h-12 text-[#B08A4A] mx-auto mb-3 opacity-60" />
            <h3 className="font-cormorant text-2xl font-bold text-[#8F6E5B]">No Sacred Archives Found</h3>
            <p className="font-dm text-xs sm:text-sm text-[#8F6E5B]/70 mt-1 max-w-sm mx-auto">
              We couldn't find media matching "{searchQuery}". Try selecting another category or resetting filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setTypeFilter('all');
                setSearchQuery('');
              }}
              className="mt-5 py-2 px-5 rounded-full bg-[#1A1612] text-white text-xs font-dm font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8">
            {filteredItems.map((item) => {
              const isCurrentlyPlaying = playingItemId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (item.type === 'video') setActiveVideoModal(item);
                    else if (item.type === 'article') setActiveArticleModal(item);
                    else handleToggleAudio(item);
                  }}
                  className="group bg-white rounded-[28px] overflow-hidden border border-[#D9C6A8] hover:border-[#B08A4A] shadow-2xs hover:shadow-[0_20px_40px_rgba(38,32,27,0.1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Thumbnail Image / Video Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                    {/* Format Badge (Top Left) */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="py-1 px-3 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-dm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        {item.type === 'video' ? (
                          <Film className="w-3 h-3 text-[#C7833D]" />
                        ) : item.type === 'audio' ? (
                          <Music className="w-3 h-3 text-[#B08A4A]" />
                        ) : (
                          <BookOpen className="w-3 h-3 text-[#66705A]" />
                        )}
                        <span>{item.categoryLabel}</span>
                      </span>
                    </div>

                    {/* Duration / Read Time Badge (Top Right) */}
                    <div className="absolute top-3.5 right-3.5">
                      <span className="py-1 px-2.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-dm font-semibold text-white/90 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-white/70" />
                        <span>{item.duration || item.readTime}</span>
                      </span>
                    </div>

                    {/* Center Action Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {item.type === 'video' ? (
                        <div className="w-12 h-12 rounded-full bg-white/85 text-[#1A1612] flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-[#C7833D] group-hover:text-white transition-all duration-300">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      ) : item.type === 'audio' ? (
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg group-hover:scale-115 transition-all duration-300 ${
                          isCurrentlyPlaying 
                            ? 'bg-[#B08A4A] text-white animate-pulse' 
                            : 'bg-white/85 text-[#1A1612] group-hover:bg-[#B08A4A] group-hover:text-white'
                        }`}>
                          {isCurrentlyPlaying ? (
                            <Pause className="w-5 h-5 fill-current" />
                          ) : (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          )}
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/85 text-[#1A1612] flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-[#66705A] group-hover:text-white transition-all duration-300">
                          <BookOpen className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    {/* Sanskrit Verse snippet if available */}
                    {item.sanskritVerse && (
                      <div className="absolute bottom-2.5 inset-x-3 pointer-events-none">
                        <span className="text-[11px] font-sanskrit text-white/90 drop-shadow truncate block">
                          {item.sanskritVerse}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Information */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Temple or Academic Source */}
                      <span className="text-[11px] font-dm font-semibold text-[#8F6E5B]/80 uppercase tracking-wider block mb-1">
                        {item.templeOrSource}
                      </span>

                      {/* Title */}
                      <h3 className="font-cormorant font-bold text-xl sm:text-2xl text-[#1A1612] group-hover:text-[#B08A4A] transition-colors line-clamp-1 leading-snug">
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="font-dm text-xs text-[#8F6E5B]/85 line-clamp-2 mt-1.5 leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Bottom Metadata & Trigger Action */}
                    <div className="mt-5 pt-3.5 border-t border-[#EBE7DF] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-dm text-[#8F6E5B]/70">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{item.viewsOrReads}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => shareItem(item, e)}
                          title="Share"
                          className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-xs font-dm font-bold text-[#1A1612] group-hover:text-[#B08A4A] flex items-center gap-1 transition-colors">
                          {item.type === 'video' ? 'Watch' : item.type === 'audio' ? (isCurrentlyPlaying ? 'Listening' : 'Listen') : 'Read'}
                          <span className="text-sm">→</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* ======================================================== */}
      {/* 4. CINEMA VIDEO LIGHTBOX MODAL                           */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#1A1612] rounded-3xl overflow-hidden shadow-2xl border border-[#B08A4A]/40 text-[#F7F1E5]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Video Player Frame */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  src={activeVideoModal.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Video Meta Information */}
              <div className="p-6 sm:p-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#C7833D]/20 text-[#D9C6A8] text-xs font-dm font-bold uppercase tracking-wider">
                    {activeVideoModal.categoryLabel}
                  </span>
                  <span className="text-xs font-dm text-white/60">
                    {activeVideoModal.duration} &bull; {activeVideoModal.viewsOrReads}
                  </span>
                </div>

                <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-white">
                  {activeVideoModal.title}
                </h2>

                <p className="font-dm text-xs sm:text-sm text-[#F7F1E5]/80 leading-relaxed max-w-2xl">
                  {activeVideoModal.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-dm text-[#D9C6A8]/70 border-t border-white/10">
                  <span>{activeVideoModal.authorOrSinger}</span>
                  <span>{activeVideoModal.templeOrSource}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 5. EDITORIAL SCRIPTURE / ARTICLE READER MODAL             */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#FBF9F4] rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#D9C6A8] text-[#1A1612]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveArticleModal(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-200 hover:bg-[#1A1612] text-stone-700 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-dm font-bold text-[#66705A] uppercase tracking-widest block mb-1">
                    {activeArticleModal.templeOrSource}
                  </span>
                  <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#8F6E5B] leading-tight">
                    {activeArticleModal.title}
                  </h2>
                  <p className="font-dm text-xs text-[#8F6E5B]/70 mt-1">
                    By {activeArticleModal.authorOrSinger} &bull; {activeArticleModal.readTime}
                  </p>
                </div>

                {activeArticleModal.sanskritVerse && (
                  <div className="p-5 rounded-2xl bg-[#F4F7F1] border border-[#66705A]/30 text-center">
                    <span className="font-sanskrit text-base sm:text-lg text-[#404B35] font-semibold leading-relaxed block">
                      {activeArticleModal.sanskritVerse}
                    </span>
                  </div>
                )}

                <div className="font-dm text-sm sm:text-base text-[#1A1612]/90 leading-relaxed space-y-4">
                  <p className="font-semibold text-[#8F6E5B]">
                    {activeArticleModal.subtitle}
                  </p>
                  <p>
                    {activeArticleModal.fullContent || activeArticleModal.description}
                  </p>
                  <p className="text-xs text-[#8F6E5B]/80 italic">
                    Concurred by Peetham Vidwans for authentic study, meditation, and dharma transmission.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9C6A8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => showToast('Consecrated PDF transcript download initiated')}
                    className="py-2.5 px-5 rounded-xl bg-[#1A1612] text-white font-dm font-bold text-xs uppercase flex items-center gap-2 cursor-pointer hover:bg-[#332C25]"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D9C6A8]" />
                    <span>Download PDF Treatise</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveArticleModal(null)}
                    className="py-2.5 px-5 rounded-xl bg-stone-100 text-stone-700 font-dm font-semibold text-xs uppercase cursor-pointer hover:bg-stone-200"
                  >
                    Done Reading
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
        </>
      )}

      {/* ======================================================== */}
      {/* 5.5 SCRAPBOOK CONNECT CORNER SECTION                     */}
      {/* ======================================================== */}
      <ScrapbookConnectSection onNavigateHome={() => onNavigateHome('home')} />

      {/* ======================================================== */}
      {/* 6. EDITORIAL LUXURY FOOTER                               */}
      {/* ======================================================== */}
      <Footer />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#1A1612] border border-[#B08A4A] text-[#F7F1E5] px-6 py-3 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] backdrop-blur-md flex items-center gap-3 animate-bounce">
          <span className="text-[#C7833D]">✦</span>
          <span className="font-dm text-xs sm:text-sm font-semibold tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

    </div>
  );
};
