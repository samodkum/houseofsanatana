import { useRef, useEffect, useState, useCallback, type CSSProperties } from 'react';
import { Navbar } from './components/Navbar';
import { FullscreenMenu } from './components/FullscreenMenu';
import { SunIcon } from './components/SunIcon';
import { FourGatewaysSection } from './components/FourGatewaysSection';
import { TravelSection } from './components/TravelSection';
import { TravelProductBridge } from './components/TravelProductBridge';
import { StackScrollReveal } from './components/StackScrollReveal';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CommunityModal } from './components/CommunityModal';
import { CoCreateModal } from './components/CoCreateModal';
import { TheHouseSection } from './components/TheHouseSection';
import { WhyHOSSection } from './components/WhyHOSSection';
import { AboutModal } from './components/AboutModal';
import { PoojaKit, CartItem } from './types/homepage';
import { ShoppingBag } from 'lucide-react';
import { SanatanaLoader } from './components/SanatanaLoader';
import { ThreeWaysToJoinSection } from './components/ThreeWaysToJoinSection';
import { MediaSection } from './components/MediaSection';
import { FAQSection } from './components/FAQSection';
import { SanatanaMallPage } from './components/SanatanaMallPage';
import { TravelPackagePage } from './components/TravelPackagePage';
import { JoinHOSPage, MainJoinWay } from './components/JoinHOSPage';
import { KnowledgeMediaPage } from './components/KnowledgeMediaPage';
import { HeaderActionButtons } from './components/HeaderActionButtons';
import { WishlistDrawer } from './components/WishlistDrawer';
import { openShopifyAccount } from './lib/shopify';
import { MALL_PRODUCTS, MallProduct } from './data/mallData';
import { AccountPage } from './pages/AccountPage';

import heroVideo from '../c27f5537-6cf2-4ecb-b5eb-cef782b8a65d.mp4';

const VIDEO_URL = heroVideo;

// The 8 letters of SANATANA
const LETTERS = ['S', 'A', 'N', 'A', 'T', 'A', 'N', 'A'];

const shouldShowInitialLoader = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();

  // NEVER show intro on customer account or when returning from logout
  if (
    path === '/account' || 
    hash === '#account' || 
    search.includes('logged_out') || 
    search.includes('logout')
  ) {
    return false;
  }

  // Intro plays when landing on the website or reloading the website
  return true;
};

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'mall' | 'travel' | 'join' | 'media' | 'account'>(() => {
    if (typeof window !== 'undefined' && (window.location.pathname === '/account' || window.location.hash === '#account')) {
      return 'account';
    }
    return 'home';
  });
  const [joinPathway, setJoinPathway] = useState<MainJoinWay>('join-hos');
  const [isLoading, setIsLoading] = useState(() => shouldShowInitialLoader());
  const [isRevealed, setIsRevealed] = useState(() => !shouldShowInitialLoader());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isCoCreateModalOpen, setIsCoCreateModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isHeroSection, setIsHeroSection] = useState(true);

  // Persistent Shared Wishlist State across all pages
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('hos_wishlist_ids');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hos_wishlist_ids', JSON.stringify(Array.from(wishlistIds)));
    } catch {}
  }, [wishlistIds]);

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast('Removed from sacred wishlist');
      } else {
        next.add(productId);
        showToast('Saved to your sacred wishlist ♡');
      }
      return next;
    });
  };

  const wishlistedProducts = MALL_PRODUCTS.filter(p => wishlistIds.has(p.id));

  const handleMoveWishlistToCart = (product: MallProduct) => {
    handleAddToCart({
      id: product.id,
      title: product.title,
      subtitle: product.subtitle,
      category: product.category === 'gift-sets' ? 'daily' : 'festival',
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      reviewsCount: product.reviewsCount,
      image: product.image,
      badge: product.badge,
      consecratedAt: product.consecratedAt,
      shortDesc: product.shortDesc,
      idealFor: product.idealFor,
      weightGrams: product.weightGrams,
      itemsIncluded: product.itemsIncluded
    });
    showToast(`Added ${product.title} to sacred basket`);
  };

  // Sync hash and pathname routing on mount, hashchange, and popstate
  useEffect(() => {
    const syncRoute = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (pathname === '/account' || hash === '#account') {
        setCurrentPage('account');
      } else if (hash === '#mall' || hash === '#santana-mall' || hash === '#sanatana-mall' || hash === '#shop' || hash.startsWith('#product-')) {
        setCurrentPage('mall');
      } else if (hash === '#travel' || hash === '#yatras' || hash === '#travel-packages' || hash === '#travel-page' || hash.startsWith('#yatra-')) {
        setCurrentPage('travel');
      } else if (hash === '#join' || hash === '#join-sanatana' || hash === '#join-hos' || hash === '#sangha' || hash === '#partnership' || hash === '#partner' || hash === '#co-creator' || hash === '#cocreate' || hash === '#creator') {
        setCurrentPage('join');
        if (hash === '#partnership' || hash === '#partner') setJoinPathway('partnership');
        else if (hash === '#co-creator' || hash === '#cocreate' || hash === '#creator') setJoinPathway('co-creator');
        else setJoinPathway('join-hos');
      } else if (hash === '#media' || hash === '#knowledge' || hash === '#sanatana-media' || hash === '#media-listing' || hash === '#media-sanctum') {
        setCurrentPage('media');
      } else {
        setCurrentPage('home');
      }
    };
    syncRoute();
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  // Page navigation helpers
  const navigateToAccount = () => {
    if (window.location.pathname !== '/account') {
      window.history.pushState({}, '', '/account');
    }
    setCurrentPage('account');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToMall = () => {
    if (window.location.pathname === '/account') {
      window.history.pushState({}, '', '/#santana-mall');
    } else {
      window.location.hash = 'santana-mall';
    }
    setCurrentPage('mall');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToTravel = () => {
    if (window.location.pathname === '/account') {
      window.history.pushState({}, '', '/#travel');
    } else {
      window.location.hash = 'travel';
    }
    setCurrentPage('travel');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToJoin = (pathway?: MainJoinWay) => {
    if (pathway) setJoinPathway(pathway);
    if (window.location.pathname === '/account') {
      window.history.pushState({}, '', pathway ? `/#${pathway}` : '/#join');
    } else {
      window.location.hash = pathway ? `#${pathway}` : '#join';
    }
    setCurrentPage('join');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToMedia = () => {
    if (window.location.pathname === '/account') {
      window.history.pushState({}, '', '/#media');
    } else {
      window.location.hash = 'media';
    }
    setCurrentPage('media');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = (sectionId?: string) => {
    if (window.location.pathname === '/account') {
      window.history.pushState({}, '', sectionId ? `/#${sectionId}` : '/');
    } else {
      window.location.hash = sectionId ? `#${sectionId}` : '#home';
    }
    setCurrentPage('home');
    if (sectionId) {
      setTimeout(() => scrollToSection(sectionId), 250);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Handle post-logout redirect without triggering intro screen
  useEffect(() => {
    try {
      sessionStorage.removeItem('hos_intro_loader_completed');
    } catch {}

    if (typeof window !== 'undefined' && (window.location.search.includes('logged_out') || window.location.search.includes('logout'))) {
      window.history.replaceState({}, '', '/');
      showToast('You have been signed out safely.');
    }
  }, []);

  // Show toast notification helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGetStarted = () => {
    scrollToSection('gateways');
    showToast("Welcome to House of Sanatan. Choose your sacred path below.");
  };

  // Cart operations
  const handleAddToCart = (kit: PoojaKit) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.kit.id === kit.id);
      if (existing) {
        return prev.map(item =>
          item.kit.id === kit.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { kit, quantity: 1 }];
    });
    setIsCartOpen(true);
    showToast(`Added "${kit.title}" to your sacred basket.`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.kit.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.kit.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Autoplay video on infinite loop without controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const handleInteraction = () => {
          video.play().catch(() => {});
          window.removeEventListener('click', handleInteraction);
          window.removeEventListener('touchstart', handleInteraction);
        };
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
      });
    }
  }, []);

  // Scroll listener with RAF throttling to prevent re-renders on every scroll pixel
  useEffect(() => {
    let rafId: number | null = null;
    let lastHide = false;
    let lastIsHero = true;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const travelEl = document.getElementById('travel-packages');
        const houseEl = document.getElementById('the-house');
        const navbarTriggerHeight = 100;

        let hide = false;

        const heroEl = document.getElementById('home');
        if (heroEl) {
          const heroRect = heroEl.getBoundingClientRect();
          const isHero = heroRect.bottom > 80;
          if (isHero !== lastIsHero) {
            lastIsHero = isHero;
            setIsHeroSection(isHero);
          }
        } else {
          if (lastIsHero !== false) {
            lastIsHero = false;
            setIsHeroSection(false);
          }
        }

        if (travelEl) {
          const rect = travelEl.getBoundingClientRect();
          if (rect.top <= navbarTriggerHeight && rect.bottom >= navbarTriggerHeight) {
            hide = true;
          }
        }

        if (houseEl) {
          const rect = houseEl.getBoundingClientRect();
          if (rect.top <= 0 && rect.bottom >= navbarTriggerHeight) {
            hide = true;
          }
        }

        if (hide !== lastHide) {
          lastHide = hide;
          setIsNavbarVisible(!hide);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleStartReveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#FEFBF2] text-[#221508] overflow-x-clip font-montserrat">
      
      {/* Sanatana Sacred Loader Screen: ONLY on initial site open and NEVER on /account */}
      {isLoading && currentPage !== 'account' && (
        <SanatanaLoader 
          onStartReveal={handleStartReveal}
          onComplete={handleLoaderComplete} 
        />
      )}

      {/* Single Persistent Top Navigation Bar */}
      <div className={`relative z-[10000] transition-opacity duration-700 ease-out ${(isRevealed && isNavbarVisible) || isMenuOpen || currentPage !== 'home' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <Navbar 
          isOpen={isMenuOpen} 
          onToggleMenu={() => setIsMenuOpen(!isMenuOpen)} 
          onGetStarted={handleGetStarted}
          currentPage={currentPage}
          onNavigatePage={(page) => {
            if (page === 'mall') navigateToMall();
            else if (page === 'travel') navigateToTravel();
            else if (page === 'join') navigateToJoin();
            else if (page === 'media') navigateToMedia();
            else navigateToHome();
          }}
        />
      </div>

      {/* Fullscreen Animated Cross-Page Menu */}
      <FullscreenMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        currentPage={currentPage}
        onNavigatePage={(page, sectionId) => {
          if (page === 'mall') {
            navigateToMall();
          } else if (page === 'travel') {
            navigateToTravel();
          } else if (page === 'join') {
            navigateToJoin();
          } else if (page === 'media') {
            navigateToMedia();
          } else if (page === 'account') {
            navigateToAccount();
          } else {
            navigateToHome(sectionId);
          }
        }}
      />

      {currentPage === 'account' ? (
        /* ======================================================== */
        /* CUSTOM SACRED SADHAKA ACCOUNT & ORDERS PAGE               */
        /* ======================================================== */
        <AccountPage
          onNavigateHome={() => navigateToHome('home')}
          onNavigateMall={navigateToMall}
          onNavigateTravel={navigateToTravel}
          onNavigateJoin={() => navigateToJoin('join-hos')}
          onNavigateMedia={navigateToMedia}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.size}
        />
      ) : currentPage === 'mall' ? (
        /* ======================================================== */
        /* SANTANA MALL: CONSECRATED TEMPLE STORE PAGE (IVORY BASE) */
        /* ======================================================== */
        <SanatanaMallPage
          onNavigateHome={() => navigateToHome('home')}
          onNavigateTravel={navigateToTravel}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalCartCount}
          isMenuOpen={isMenuOpen}
          onOpenAccount={navigateToAccount}
        />
      ) : currentPage === 'travel' ? (
        /* ======================================================== */
        /* SACRED YATRAS & EXPEDITIONS: TRAVEL PACKAGE PAGE         */
        /* ======================================================== */
        <TravelPackagePage
          onNavigateHome={(secId) => navigateToHome(secId || 'home')}
          onNavigateMall={navigateToMall}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAccount={navigateToAccount}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.size}
          isMenuOpen={isMenuOpen}
        />
      ) : currentPage === 'join' ? (
        /* ======================================================== */
        /* SACRED SANGHA: JOIN HOUSE OF SANATAN PAGE                */
        /* ======================================================== */
        <JoinHOSPage
          onNavigateHome={(secId) => navigateToHome(secId || 'home')}
          onNavigateMall={navigateToMall}
          onNavigateTravel={navigateToTravel}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAccount={navigateToAccount}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.size}
          initialPathway={joinPathway}
        />
      ) : currentPage === 'media' ? (
        /* ======================================================== */
        /* KNOWLEDGE & MEDIA SANCTUM LISTING PAGE                   */
        /* ======================================================== */
        <KnowledgeMediaPage
          onNavigateHome={(secId) => navigateToHome(secId || 'home')}
          onNavigateMall={navigateToMall}
          onNavigateTravel={navigateToTravel}
          onNavigateJoin={navigateToJoin}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAccount={navigateToAccount}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.size}
          isMenuOpen={isMenuOpen}
        />
      ) : (
        <>
          {/* Floating Top-Right Action Controls on Home (Identical spreading animation on every page) */}
          <div className="fixed top-5 sm:top-7 right-5 sm:right-8 z-40">
            <HeaderActionButtons
              wishlistCount={wishlistIds.size}
              cartCount={totalCartCount}
              onOpenWishlist={() => setIsWishlistOpen(true)}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenAccount={navigateToAccount}
              isHero={isHeroSection}
            />
          </div>

          {/* ======================================================== */}
          {/* SECTION 1: CINEMATIC HERO VIEWPORT                       */}
          {/* ======================================================== */}
          <section 
            id="home"
            className="relative w-full h-screen h-[100dvh] overflow-hidden bg-black select-none pointer-events-auto font-montserrat"
          >
            {/* Background Video looping continuously */}
            <video
              ref={videoRef}
              id="hero-background-video"
              src={VIDEO_URL}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-bottom"
              style={{ objectPosition: 'center bottom' }}
            />

            {/* Targeted darkening specifically over the central character silhouette */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-multiply"
              style={{
                background: 'radial-gradient(ellipse 24% 60% at 50% 70%, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 85%)'
              }}
            />

            {/* Ambient edge vignette (leaving center and character untouched) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, transparent 55%, rgba(0, 0, 0, 0.45) 100%)'
              }}
            />

            {/* Top Sacred Shloka & Om Symbol (Desktop / Laptop only) */}
            <div 
              className={`hidden md:flex absolute top-[2.5%] md:top-[3%] inset-x-0 z-25 flex-col items-center justify-center pointer-events-none transition-opacity duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Om Symbol */}
              <div 
                className="font-sanskrit text-2xl sm:text-3xl md:text-[38px] text-[#C59239] font-bold select-none leading-none"
                style={isRevealed ? {
                  filter: 'drop-shadow(0 0 16px rgba(197, 146, 57, 0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                  animation: 'letterWaveIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                } : { opacity: 0 }}
              >
                ॐ
              </div>

              {/* Sanskrit Inscription: ॥ सत्यं धर्म सनातन ॥ */}
              <div 
                className="font-sanskrit text-[10px] sm:text-xs md:text-[13px] text-[#FEFBF2] tracking-[0.08em] font-semibold select-none mt-1 md:mt-1.5 text-center"
                style={isRevealed ? {
                  filter: 'drop-shadow(0 0 12px rgba(197, 146, 57, 0.45)) drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
                  animation: 'letterWaveIn 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards'
                } : { opacity: 0 }}
              >
                ॥ सत्यं धर्म सनातन ॥
              </div>
            </div>

            {/* ======================================================== */}
            {/* CELESTIAL "SANATANA" TYPOGRAPHY                          */}
            {/* ======================================================== */}

            {/* 1. Mobile & Tablet Layout (< md): Centered in the Sky with "HOUSE OF" Eyebrow */}
            <div 
              className={`md:hidden absolute inset-x-0 top-[19%] sm:top-[22%] -translate-y-1/2 z-10 flex flex-col items-center justify-center pointer-events-none px-4 transition-opacity duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Subtle Celestial Aura */}
              <div 
                className="absolute inset-0 -top-10 bottom-0 pointer-events-none -z-10"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(176, 138, 74, 0.18) 0%, rgba(199, 131, 61, 0.08) 40%, transparent 75%)'
                }}
              />

              {/* Glowing "HOUSE OF" Sacred Eyebrow */}
              <div 
                className="flex items-center justify-center gap-2.5 mb-1.5"
                style={isRevealed ? {
                  animation: 'letterWaveIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both'
                } : { opacity: 0 }}
              >
                <span className="w-7 h-[1px] bg-gradient-to-r from-transparent via-[#C59239] to-[#E4B968]" />
                <span className="font-montserrat text-[10px] sm:text-[11px] font-extrabold tracking-[0.38em] text-[#E4B968] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  HOUSE OF
                </span>
                <span className="w-7 h-[1px] bg-gradient-to-l from-transparent via-[#C59239] to-[#E4B968]" />
              </div>

              {/* Grand SANATANA Wordmark Asset */}
              <div className="w-full flex items-center justify-center px-2">
                <img 
                  src="/sanatana-hero-typography.png"
                  alt="SANATANA"
                  className="w-full max-w-[92vw] h-auto object-contain select-none pointer-events-none"
                  style={isRevealed ? {
                    animation: 'letterWaveIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
                    filter: 'drop-shadow(0 3px 12px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(197, 146, 57, 0.45))'
                  } : { opacity: 0 }}
                />
              </div>
            </div>

            {/* 2. Desktop Layout (>= md): Grand Celestial SANATAN Typography Asset */}
            <div 
              id="sanatana-sky-container"
              className={`hidden md:flex absolute inset-x-0 top-[39.5%] -translate-y-1/2 z-10 w-full items-center justify-center pointer-events-none transition-opacity duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
            >
              <h1 
                id="hero-sanatan-heading"
                className="w-full py-12 flex items-center justify-center pointer-events-none m-0 p-0 border-none outline-none ring-0 select-none overflow-visible"
                style={{
                  '--cut-start': '41%',
                  '--cut-end': '53%',
                  WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 var(--cut-start, 41%), transparent calc(var(--cut-start, 41%) + 1.5%), transparent calc(var(--cut-end, 53%) - 1.5%), #000 var(--cut-end, 53%), #000 100%)',
                  maskImage: 'linear-gradient(to right, #000 0%, #000 var(--cut-start, 41%), transparent calc(var(--cut-start, 41%) + 1.5%), transparent calc(var(--cut-end, 53%) - 1.5%), #000 var(--cut-end, 53%), #000 100%)',
                } as CSSProperties}
              >
                <div 
                  className="w-[76vw] max-w-[1500px] flex items-center justify-center overflow-visible"
                  style={isRevealed ? {
                    animation: 'letterWaveIn 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                  } : { opacity: 0 }}
                >
                  <img 
                    src="/sanatan-hero-typography.png" 
                    alt="SANATAN"
                    className="w-full h-auto object-contain select-none pointer-events-none"
                    style={{
                      filter: 'drop-shadow(0 4px 18px rgba(0, 0, 0, 0.85)) drop-shadow(0 0 35px rgba(220, 155, 65, 0.35))',
                    }}
                  />
                </div>
              </h1>
            </div>


            {/* Mobile Bottom Scrim for crisp text contrast */}
            <div 
              className="md:hidden absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-black/95 via-black/55 to-transparent pointer-events-none z-15"
            />

            {/* ======================================================== */}
            {/* HERO CTA: MOBILE BOTTOM-RIGHT FLOATING BUTTON            */}
            {/* ======================================================== */}
            <div 
              className={`md:hidden absolute bottom-20 sm:bottom-24 right-5 sm:right-8 z-20 flex flex-col items-end transition-all duration-700 ${isRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              style={isRevealed ? {
                animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both'
              } : { opacity: 0 }}
            >
              {/* 2-line Sacred Micro-phrase (4 words) */}
              <div className="mb-2 text-right pointer-events-none">
                <span className="block font-montserrat font-medium text-[9.5px] tracking-[0.2em] uppercase text-[#E4B968] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Where Sacred
                </span>
                <span className="block font-montserrat font-extrabold text-xs tracking-[0.08em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FEFBF2] via-[#E4B968] to-[#C59239] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] leading-tight">
                  Awakens Eternity
                </span>
              </div>

              {/* Bespoke Sacred Capsule CTA Button (Compact on Mobile) */}
              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="group relative inline-flex items-center gap-2.5 pl-2.5 pr-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#1A1612]/95 via-[#26201B]/95 to-[#1A1612]/95 border border-[#C59239]/70 hover:border-[#E4B968] shadow-[0_8px_25px_rgba(0,0,0,0.85),_0_0_15px_rgba(197,146,57,0.3)] backdrop-blur-md transition-all duration-300 cursor-pointer overflow-hidden active:scale-95"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C59239]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-[#FE7613] via-[#C59239] to-[#0A4C83] text-[#120a04] shadow-md group-hover:rotate-180 transition-transform duration-700">
                  <SunIcon className="w-3.5 h-3.5 text-black" />
                </div>

                <div className="flex flex-col text-left justify-center">
                  <span className="font-montserrat font-bold text-xs tracking-[0.04em] text-[#FEFBF2] group-hover:text-white transition-colors leading-none">
                    Explore HOS
                  </span>
                </div>

                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#26201B]/90 border border-[#C59239]/50 group-hover:border-[#FEFBF2] group-hover:translate-x-0.5 transition-all text-[#C59239]">
                  <span className="text-[10px] leading-none">➔</span>
                </div>
              </button>
            </div>

            {/* ======================================================== */}
            {/* HERO CTA: DESKTOP RIGHT-SIDE FLOATING CONTROLS          */}
            {/* ======================================================== */}
            <div 
              id="hero-cta-section"
              className={`hidden md:flex absolute right-8 md:right-12 lg:right-16 xl:right-20 top-[49%] sm:top-[51%] md:top-[53%] z-25 flex-col items-end text-right max-w-[380px] md:max-w-[440px] transition-all duration-700 ${isRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              style={isRevealed ? {
                animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both'
              } : { opacity: 0 }}
            >
              {/* Clean Sub-heading */}
              <div className="mb-2 sm:mb-2.5">
                <span className="font-montserrat font-medium text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase text-[#FEFBF2] block mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Where the Sacred
                </span>
                <h2 className="font-montserrat font-black text-xl sm:text-2xl md:text-[32px] tracking-[0.05em] uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FEFBF2] via-[#E4B968] to-[#C59239] drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
                  Awakens Eternity
                </h2>
              </div>

              <p className="font-montserrat font-normal text-xs sm:text-[13px] text-[#FEFBF2]/90 mb-5 tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-[340px]">
                Step beyond the veil of time into the living sanctuary of timeless Dharma.
              </p>

              {/* Bespoke Sacred Capsule CTA Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  className="group relative inline-flex items-center gap-3.5 pl-3 pr-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#1A1612]/95 via-[#26201B]/95 to-[#1A1612]/95 border border-[#C59239]/70 hover:border-[#E4B968] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(197,146,57,0.35)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.9),_0_0_40px_rgba(197,146,57,0.6)] backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden active:scale-95"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#C59239]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#FE7613] via-[#C59239] to-[#0A4C83] text-[#120a04] shadow-md group-hover:rotate-180 transition-transform duration-700">
                    <SunIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black" />
                  </div>

                  <div className="flex flex-col text-left justify-center">
                    <span className="font-montserrat font-bold text-xs sm:text-sm tracking-[0.05em] text-[#FEFBF2] group-hover:text-white transition-colors leading-none">
                      Explore HOS
                    </span>
                  </div>

                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#26201B]/90 border border-[#C59239]/50 group-hover:border-[#FEFBF2] group-hover:translate-x-1 transition-all text-[#C59239]">
                    <span className="text-xs leading-none">➔</span>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* ======================================================== */}
          {/* SECTION 2: FOUR GATEWAYS (TRAVEL, MALL, JOIN, CO-CREATE) */}
          {/* ======================================================== */}
          <FourGatewaysSection 
            onSelectStore={navigateToMall}
            onSelectTravel={navigateToTravel}
            onSelectJoin={() => navigateToJoin('join-hos')}
            onSelectCoCreate={() => navigateToJoin('co-creator')}
          />

          {/* ======================================================== */}
          {/* SECTION 3: NON-PHYSICAL (CURATED YATRAS & PILGRIMAGES)   */}
          {/* ======================================================== */}
          <TravelSection onViewAllYatras={navigateToTravel} />

          {/* ======================================================== */}
          {/* SECTION 3.5: TRAVEL TO PRODUCTS WAVY BRIDGE BANNER       */}
          {/* ======================================================== */}
          <TravelProductBridge />

          {/* ======================================================== */}
          {/* SECTION 4: STACK SCROLL REVEAL (PRODUCT SHOWCASE)        */}
          {/* ======================================================== */}
          <StackScrollReveal 
            onAddToCart={handleAddToCart} 
            onViewAll={navigateToMall}
          />

          {/* ======================================================== */}
          {/* SECTION 4.5: THE HOUSE (STORY, VISION & MISSION)         */}
          {/* ======================================================== */}
          <TheHouseSection onOpenAbout={() => setIsAboutModalOpen(true)} />

          {/* ======================================================== */}
          {/* SECTION 4.8: WHY HOS (FOUR PILLARS OF DEVOTIONAL CARE)   */}
          {/* ======================================================== */}
          <WhyHOSSection />

          {/* ======================================================== */}
          {/* THREE WAYS TO JOIN (FRAMER STEP-FLOW UI)                 */}
          {/* ======================================================== */}
          <ThreeWaysToJoinSection
            onOpenCommunityModal={() => setIsCommunityModalOpen(true)}
            onOpenCoCreateModal={() => setIsCoCreateModalOpen(true)}
            onNavigateJoin={(pathway) => navigateToJoin(pathway)}
          />

          {/* ======================================================== */}
          {/* SECTION 9: SANATANA MEDIA (SYNC-SCROLL SLIDER & GALLERY) */}
          {/* ======================================================== */}
          <MediaSection />

          {/* ======================================================== */}
          {/* SECTION 9.5: FREQUENTLY ASKED SACRED QUESTIONS (FAQS)    */}
          {/* ======================================================== */}
          <FAQSection />

          {/* ======================================================== */}
          {/* SECTION 10: LUXURY SACRED FOOTER                         */}
          {/* ======================================================== */}
          <div id="footer">
            <Footer 
              onNavigateAccount={navigateToAccount}
              onNavigatePage={(page, sectionId) => {
                if (page === 'mall') navigateToMall();
                else if (page === 'travel') navigateToTravel();
                else if (page === 'join') navigateToJoin();
                else if (page === 'media') navigateToMedia();
                else if (page === 'account') navigateToAccount();
                else navigateToHome(sectionId);
              }}
            />
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* SLIDE-OVER BASKET / CART DRAWER                          */}
      {/* ======================================================== */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating Cart Button (only if items in cart) */}
      {totalCartCount > 0 && (
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open sacred basket"
          className="fixed bottom-20 right-6 z-40 w-11 h-11 rounded-full bg-[#FE7613] hover:bg-[#E66207] text-white shadow-[0_10px_25px_rgba(254,118,19,0.35)] border border-[#C59239] flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#98555E] text-[#FEFBF2] font-dm font-bold text-[10px] flex items-center justify-center border border-[#E4B968]">
            {totalCartCount}
          </span>
        </button>
      )}


      {/* Sacred Community (Join) Modal */}
      <CommunityModal
        isOpen={isCommunityModalOpen}
        onClose={() => setIsCommunityModalOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Sacred Co-Creation Modal */}
      <CoCreateModal
        isOpen={isCoCreateModalOpen}
        onClose={() => setIsCoCreateModalOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* House of Sanatan - About Sanctum Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Slide-Over Wishlist Drawer (Unified across all pages) */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
        onSelectProduct={() => {
          setIsWishlistOpen(false);
          navigateToMall();
        }}
      />


      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#FEFBF2] border border-[#C59239] text-[#221508] px-6 py-3 rounded-2xl shadow-[0_15px_40px_rgba(34,21,8,0.15)] backdrop-blur-md flex items-center gap-3 animate-bounce">
          <span className="text-[#FE7613]">✦</span>
          <span className="font-dm text-xs sm:text-sm font-semibold tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

    </div>
  );
}
