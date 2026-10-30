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
import { openShopifyAccount } from '../lib/shopify';
import { MosaicGallerySection } from './MosaicGallerySection';
import { MediaHeroLoopSection } from './MediaHeroLoopSection';
import { CreatorProductReelsSection } from './CreatorProductReelsSection';
import { Gift, Award, Video } from 'lucide-react';

interface KnowledgeMediaPageProps {
  onNavigateHome: (sectionId?: string) => void;
  onNavigateMall: () => void;
  onNavigateTravel: () => void;
  onNavigateJoin?: (pathway?: 'join-hos' | 'partnership' | 'co-creator') => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
  cartCount?: number;
  wishlistCount?: number;
  isMenuOpen?: boolean;
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
  wishlistCount = 0,
  isMenuOpen = false
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
    <div className="relative w-full min-h-screen bg-[#FEFBF2] text-[#221508] font-dm selection:bg-[#C59239]/20">
      
      {/* ======================================================== */}
      {/* 1. TOP NAVIGATION BAR                                   */}
      <nav className="relative z-40 w-full bg-transparent transition-all">
        <div className="w-full pl-20 sm:pl-24 pr-5 sm:pr-8 lg:pr-12 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Right: Action Controls (Wishlist, Cart, Account) shifted to corner */}
          <div className="flex items-center gap-3 sm:gap-5 ml-auto">
            <HeaderActionButtons
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              onOpenWishlist={onOpenWishlist || (() => showToast('Sacred Wishlist'))}
              onOpenCart={onOpenCart || (() => showToast('Sacred Basket'))}
              onOpenAccount={onOpenAccount || openShopifyAccount}
            />
          </div>

        </div>
      </nav>

      {/* ======================================================== */}
      {/* 2. HERO SECTION: CONTINUOUS LOOPING DEVOTEE MARQUEE      */}
      {/* ======================================================== */}
      <MediaHeroLoopSection
        isMenuOpen={isMenuOpen}
        onExploreClick={() => {
          const el = document.getElementById('creator-product-reels') || document.getElementById('mosaic-gallery');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onApplyClick={onNavigateJoin ? () => onNavigateJoin('co-creator') : undefined}
      />

      {/* ======================================================== */}
      {/* 2.25 CREATOR PRODUCT REELS (ARTFY PERSPECTIVE SLIDER)     */}
      {/* ======================================================== */}
      <div id="creator-product-reels">
        <CreatorProductReelsSection 
          onNavigateMall={onNavigateMall} 
          onNavigateJoin={onNavigateJoin ? () => onNavigateJoin('co-creator') : undefined}
        />
      </div>

      {/* ======================================================== */}
      {/* 2.5 MOSAIC GALLERY HORIZONTAL SCROLL SECTION             */}
      {/* ======================================================== */}
      <div id="mosaic-gallery">
        <MosaicGallerySection
          onNavigateTravel={onNavigateTravel}
          onNavigateMall={onNavigateMall}
          onNavigateJoin={onNavigateJoin ? () => onNavigateJoin('co-creator') : undefined}
        />
      </div>

      {/* ======================================================== */}
      {/* 3. FINAL FULL-WIDTH CREATOR PARTNERSHIP SHOWCASE CTA     */}
      {/*    (Shifted to the very end of the page before Footer)   */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto relative overflow-visible">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#073863] to-[#0A4C83] p-6 sm:p-8 md:p-12 text-white shadow-[0_25px_60px_rgba(7,56,99,0.35)] border border-[#C59239]/40">
          {/* Subtle Golden Warm Aura */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C59239]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Column: Creator Attraction Value Prop */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FE7613]/15 border border-[#FE7613]/30 text-[#E4B968] text-[11px] font-dm font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3 h-3 text-[#FE7613]" />
                <span>Sanatan Creator Program</span>
              </div>

              <h3 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.12] text-[#FEFBF2] mb-3">
                Create reels for our products & yatras. <br />
                <span className="text-[#FE7613] font-script text-3xl sm:text-4xl md:text-5xl font-normal">
                  Inspire millions of devotees.
                </span>
              </h3>

              <p className="font-dm text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                Are you a spiritual storyteller, Vedic practitioner, travel filmmaker, or sacred artisan? Receive complimentary consecrated sanctum artifacts, sponsored yatra expeditions, and creator royalties for authentic devotional reels & unboxings.
              </p>

              {/* 3 Quick Creator Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/15">
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <div className="w-6 h-6 rounded-full bg-[#FE7613]/20 flex items-center justify-center shrink-0">
                    <Gift className="w-3.5 h-3.5 text-[#FE7613]" />
                  </div>
                  <span>Free Sacred Kits</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <div className="w-6 h-6 rounded-full bg-[#FE7613]/20 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5 text-[#FE7613]" />
                  </div>
                  <span>Creator Royalties</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/90">
                  <div className="w-6 h-6 rounded-full bg-[#FE7613]/20 flex items-center justify-center shrink-0">
                    <Video className="w-3.5 h-3.5 text-[#FE7613]" />
                  </div>
                  <span>Featured on App</span>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent Action Button & Contact */}
            <div className="lg:text-right shrink-0 flex flex-col items-start lg:items-end justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (onNavigateJoin) {
                    onNavigateJoin('co-creator');
                  } else {
                    window.location.hash = 'join#co-creator';
                  }
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#FE7613] hover:bg-[#e0650d] text-white text-sm font-dm font-bold shadow-[0_10px_25px_rgba(254,118,19,0.35)] hover:shadow-[0_14px_32px_rgba(254,118,19,0.48)] hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer group"
              >
                <span>Apply as a Creator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <span className="text-[11.5px] font-dm text-white/60">
                Instant onboard for Instagram & YouTube creators ✦
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. EDITORIAL LUXURY FOOTER                               */}
      {/* ======================================================== */}
      <Footer onNavigateAccount={onOpenAccount} />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#221508] border border-[#C59239] text-[#FEFBF2] px-6 py-3 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.3)] backdrop-blur-md flex items-center gap-3 animate-bounce">
          <span className="text-[#E4B968]">✦</span>
          <span className="font-dm text-xs sm:text-sm font-semibold tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

    </div>
  );
};
