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
import { AccountModal } from './components/AccountModal';
import { AccountLayout } from './components/AccountLayout';
import { MALL_PRODUCTS, MallProduct } from './data/mallData';
import { handleShopifyOAuthCallback, getStoredCustomerData } from './lib/shopify';
import { useCustomer } from './hooks/useCustomer';

import heroVideo from '../c27f5537-6cf2-4ecb-b5eb-cef782b8a65d.mp4';

const VIDEO_URL = heroVideo;

// The 8 letters of SANATANA
const LETTERS = ['S', 'A', 'N', 'A', 'T', 'A', 'N', 'A'];

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDirectAccount = typeof window !== 'undefined' && (window.location.pathname.startsWith('/account') || window.location.hash.startsWith('#account'));
  const { customer: liveCustomer } = useCustomer();
  const [currentPage, setCurrentPage] = useState<'home' | 'mall' | 'travel' | 'join' | 'media' | 'account'>(() => {
    return isDirectAccount ? 'account' : 'home';
  });
  const [joinPathway, setJoinPathway] = useState<MainJoinWay>('join-hos');
  const [isLoading, setIsLoading] = useState(() => !isDirectAccount);
  const [isRevealed, setIsRevealed] = useState(false);
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
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const navigateToAccount = () => {
    setCurrentPage('account');
    setIsLoading(false);
    setIsAccountOpen(false);
    window.history.pushState(null, '', '/account');
    window.location.hash = 'account';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenAccount = () => {
    navigateToAccount();
  };

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

  // Handle Shopify OAuth callback on mount (?code=...)
  useEffect(() => {
    handleShopifyOAuthCallback().then((success) => {
      if (success) {
        showToast('॥ स्वागतम् ॥ Authenticated with Shopify! Welcome to your Sacred Sanctum.');
        setCurrentPage('account');
        setIsLoading(false);
        setIsAccountOpen(false);
        window.history.pushState(null, '', '/account');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }, []);

  // Sync URL routing on mount and hashchange
  useEffect(() => {
    const syncRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.startsWith('/account') || hash.startsWith('#account')) {
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
  const navigateToMall = () => {
    setCurrentPage('mall');
    window.location.hash = 'santana-mall';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToTravel = () => {
    setCurrentPage('travel');
    window.location.hash = 'travel';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToJoin = (pathway?: MainJoinWay) => {
    if (pathway) setJoinPathway(pathway);
    setCurrentPage('join');
    window.location.hash = pathway ? `#${pathway}` : '#join';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToMedia = () => {
    setCurrentPage('media');
    window.location.hash = 'media';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToHome = (sectionId?: string) => {
    setCurrentPage('home');
    window.history.pushState(null, '', '/');
    window.location.hash = sectionId && sectionId !== 'home' ? `#${sectionId}` : '';
    if (sectionId && sectionId !== 'home') {
      setTimeout(() => scrollToSection(sectionId), 250);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

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
    <div className="relative w-full min-h-screen bg-[#F7F1E5] text-[#8F6E5B] overflow-x-clip font-dm">
      
      {/* Sanatana Sacred Loader Screen */}
      {isLoading && (
        <SanatanaLoader 
          onStartReveal={handleStartReveal}
          onComplete={handleLoaderComplete} 
        />
      )}

      {/* Single Persistent Top Navigation Bar */}
      <div className={`transition-opacity duration-700 ease-out ${(isRevealed && isNavbarVisible) || isMenuOpen || currentPage !== 'home' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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
        onOpenAccount={() => {
          setIsMenuOpen(false);
          handleOpenAccount();
        }}
        onNavigatePage={(page, sectionId) => {
          if (page === 'mall') {
            navigateToMall();
          } else if (page === 'travel') {
            navigateToTravel();
          } else if (page === 'join') {
            navigateToJoin();
          } else if (page === 'media') {
            navigateToMedia();
          } else {
            navigateToHome(sectionId);
          }
        }}
      />

      {currentPage === 'account' ? (
        <AccountLayout
          customer={liveCustomer}
          onBackToStore={() => {
            window.history.pushState(null, '', '/');
            setCurrentPage('home');
          }}
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
          onOpenAccount={handleOpenAccount}
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
          onOpenAccount={handleOpenAccount}
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
          onOpenAccount={handleOpenAccount}
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
          onOpenAccount={handleOpenAccount}
          cartCount={totalCartCount}
          wishlistCount={wishlistIds.size}
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
              onOpenAccount={handleOpenAccount}
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

            {/* Top Sacred Shloka & Om Symbol */}
            <div 
              className={`absolute top-[2%] sm:top-[2.5%] md:top-[3%] inset-x-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
            >
              {/* Om Symbol */}
              <div 
                className="font-sanskrit text-2xl sm:text-3xl md:text-[38px] text-[#B08A4A] font-bold select-none leading-none"
                style={isRevealed ? {
                  filter: 'drop-shadow(0 0 12px rgba(176, 138, 74, 0.45)) drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
                  animation: 'letterWaveIn 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                } : { opacity: 0 }}
              >
                ॐ
              </div>

              {/* Sanskrit Inscription: ॥ सत्यं धर्म सनातन ॥ */}
              <div 
                className="font-sanskrit text-[10px] sm:text-xs md:text-[13px] text-[#D9C6A8] tracking-[0.08em] font-semibold select-none mt-1 md:mt-1.5 text-center"
                style={isRevealed ? {
                  filter: 'drop-shadow(0 0 10px rgba(176, 138, 74, 0.35)) drop-shadow(0 1px 3px rgba(0,0,0,0.7))',
                  animation: 'letterWaveIn 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards'
                } : { opacity: 0 }}
              >
                ॥ सत्यं धर्म सनातन ॥
              </div>
            </div>

            {/* Celestial "SANATANA" Typography in the Sky */}
            <div 
              id="sanatana-sky-container"
              className={`absolute inset-x-0 top-[36%] -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
            >
              <div 
                className="w-full flex items-center justify-between px-3 sm:px-5 md:px-8 lg:px-11 xl:px-14 overflow-visible -translate-x-[1.2vw] sm:-translate-x-[1.5vw]"
              >
                {/* Left Wing: S - A - N - A */}
                <div className="flex-1 flex items-center justify-between overflow-visible">
                  {LETTERS.slice(0, 4).map((char, idx) => {
                    const entryDelay = idx * 0.12;
                    const isPartiallyHiddenA = idx === 3;
                    const maskStyle: CSSProperties = isPartiallyHiddenA
                      ? {
                          maskImage: 'linear-gradient(to right, #000 0%, #000 34%, rgba(0,0,0,0.3) 44%, transparent 56%)',
                          WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 34%, rgba(0,0,0,0.3) 44%, transparent 56%)'
                        }
                      : {};

                    return (
                      <div
                        key={`left-${char}-${idx}`}
                        className="flex-1 flex items-center justify-center overflow-visible"
                        style={isRevealed ? {
                          ...maskStyle,
                          animation: `letterWaveIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${entryDelay}s both`
                        } : { ...maskStyle, opacity: 0 }}
                      >
                        <span
                          className="font-montserrat font-black text-[12.8vw] md:text-[13.4vw] lg:text-[13.8vw] leading-[1.05] select-none uppercase inline-block origin-center px-1 sm:px-1.5 py-1"
                          style={{
                            transform: 'scaleY(1.18)',
                            boxSizing: 'content-box',
                            background: 'linear-gradient(180deg, #1A1612 0%, #26201B 45%, #332C25 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: '#332C25',
                            filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px rgba(176, 138, 74, 0.35))'
                          }}
                        >
                          {char}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Center spacing corridor where Krishna walks towards the horizon */}
                <div className="w-[4.5vw] sm:w-[5vw] md:w-[5.5vw] lg:w-[6vw] shrink-0" />

                {/* Right Wing: T - A - N - A */}
                <div className="flex-1 flex items-center justify-between overflow-visible -translate-x-[1.2vw] sm:-translate-x-[1.5vw]">
                  {LETTERS.slice(4, 8).map((char, idx) => {
                    const globalIndex = idx + 4;
                    const entryDelay = globalIndex * 0.12;

                    return (
                      <div
                        key={`right-${char}-${idx}`}
                        className="flex-1 flex items-center justify-center overflow-visible"
                        style={isRevealed ? {
                          animation: `letterWaveIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${entryDelay}s both`
                        } : { opacity: 0 }}
                      >
                        <span
                          className="font-montserrat font-black text-[12.8vw] md:text-[13.4vw] lg:text-[13.8vw] leading-[1.05] select-none uppercase inline-block origin-center px-1 sm:px-1.5 py-1"
                          style={{
                            transform: 'scaleY(1.18)',
                            boxSizing: 'content-box',
                            background: 'linear-gradient(180deg, #1A1612 0%, #26201B 45%, #332C25 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: '#332C25',
                            filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 16px rgba(176, 138, 74, 0.35))'
                          }}
                        >
                          {char}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right-side CTA section */}
            <div 
              id="hero-cta-section"
              className={`absolute right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20 top-[49%] sm:top-[51%] md:top-[53%] z-20 flex flex-col items-end text-right max-w-[320px] sm:max-w-[380px] md:max-w-[440px] transition-all duration-700 ${isRevealed ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              style={isRevealed ? {
                animation: 'fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both'
              } : { opacity: 0 }}
            >
              {/* Eyebrow with pulsing amber beacon */}
              <div className="flex items-center justify-end gap-2 mb-2 sm:mb-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C7833D] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B08A4A]" />
                </span>
                <span className="text-[10px] sm:text-[11px] font-montserrat font-bold tracking-[0.25em] text-[#B08A4A] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  ॥ अनन्त यात्रा ॥ &bull; ETERNAL ODYSSEY
                </span>
              </div>

              {/* Clean Sub-heading */}
              <div className="mb-2 sm:mb-2.5">
                <span className="font-montserrat font-medium text-xs sm:text-sm md:text-base tracking-[0.18em] uppercase text-[#D9C6A8] block mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Where the Sacred
                </span>
                <h2 className="font-montserrat font-black text-xl sm:text-2xl md:text-[32px] tracking-[0.05em] uppercase leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F7F1E5] via-[#D9C6A8] to-[#B08A4A] drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
                  Awakens Eternity
                </h2>
              </div>

              <p className="font-montserrat font-normal text-xs sm:text-[13px] text-[#D9C6A8]/90 mb-5 tracking-wide leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] max-w-[340px]">
                Step beyond the veil of time into the living sanctuary of timeless Dharma.
              </p>

              {/* Bespoke Sacred Capsule CTA Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  className="group relative inline-flex items-center gap-3.5 pl-3 pr-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#332C25]/95 via-[#26201B]/95 to-[#332C25]/95 border border-[#B08A4A]/70 hover:border-[#D9C6A8] shadow-[0_10px_30px_rgba(0,0,0,0.85),_0_0_20px_rgba(176,138,74,0.3)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.9),_0_0_40px_rgba(176,138,74,0.55)] backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden active:scale-95"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#B08A4A]/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                  <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#C7833D] via-[#B08A4A] to-[#66705A] text-[#120a04] shadow-md group-hover:rotate-180 transition-transform duration-700">
                    <SunIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black" />
                  </div>

                  <div className="flex flex-col text-left justify-center">
                    <span className="font-montserrat font-bold text-xs sm:text-sm tracking-[0.05em] text-[#F7F1E5] group-hover:text-white transition-colors leading-none">
                      Explore HOS
                    </span>
                  </div>

                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#26201B]/90 border border-[#B08A4A]/50 group-hover:border-[#F7F1E5] group-hover:translate-x-1 transition-all text-[#D9C6A8]">
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
            <Footer />
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
          className="fixed bottom-20 right-6 z-40 w-11 h-11 rounded-full bg-[#C7833D] hover:bg-[#B08A4A] text-white shadow-[0_10px_25px_rgba(199,131,61,0.35)] border border-[#D9C6A8] flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#8F6E5B] text-[#F7F1E5] font-dm font-bold text-[10px] flex items-center justify-center border border-[#D9C6A8]">
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

      {/* Sacred Sadhaka User Account Profile Modal (Connected to Shopify) */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigatePage={(page) => {
          if (page === 'mall') navigateToMall();
          else if (page === 'travel') navigateToTravel();
          else if (page === 'join') navigateToJoin();
          else if (page === 'account') navigateToAccount();
          else navigateToHome();
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.size}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#F7F1E5] border border-[#D9C6A8] text-[#8F6E5B] px-6 py-3 rounded-2xl shadow-[0_15px_40px_rgba(51,44,37,0.15)] backdrop-blur-md flex items-center gap-3 animate-bounce">
          <span className="text-[#C7833D]">✦</span>
          <span className="font-dm text-xs sm:text-sm font-semibold tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

    </div>
  );
}
