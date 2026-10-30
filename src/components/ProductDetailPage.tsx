import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShoppingCart, 
  Star, 
  Heart, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  MapPin, 
  Minus, 
  Plus, 
  Check, 
  Award,
  CreditCard,
  Headphones,
  User,
  Search,
  X
} from 'lucide-react';
import { MallProduct, MALL_PRODUCTS } from '../data/mallData';
import { PoojaKit } from '../types/homepage';
import { SunIcon } from './SunIcon';
import { WishlistDrawer } from './WishlistDrawer';
import { Footer } from './Footer';
import { openShopifyAccount } from '../lib/shopify';

interface ProductDetailPageProps {
  product: MallProduct;
  onBackToCollection: () => void;
  onSelectRelatedProduct: (product: MallProduct) => void;
  onAddToCart: (kit: PoojaKit, quantity?: number) => void;
  onOpenCart: () => void;
  cartCount: number;
  onNavigateHome: () => void;
  onNavigateTravel: () => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (productId: string) => void;
  isMenuOpen?: boolean;
  onOpenAccount?: () => void;
  initialSearchQuery?: string;
  onSearch?: (query: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToCollection,
  onSelectRelatedProduct,
  onAddToCart,
  onOpenCart,
  cartCount,
  onNavigateHome,
  onNavigateTravel,
  wishlistIds,
  onToggleWishlist,
  isMenuOpen = false,
  onOpenAccount,
  initialSearchQuery = '',
  onSearch,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'significance' | 'items' | 'specs' | 'rituals'>('significance');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  // Scroll visibility for navbar: disappears past product image section
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const imageSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageSectionRef.current) {
        const rect = imageSectionRef.current.getBoundingClientRect();
        // Disappear as soon as the user scrolls past the image section
        setIsNavbarVisible(rect.bottom > 40);
      } else {
        setIsNavbarVisible(window.scrollY < 420);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isWishlisted = wishlistIds.has(product.id);

  // Real-time Search State for Product Detail Page
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSearchQuery(initialSearchQuery || '');
  }, [initialSearchQuery]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return MALL_PRODUCTS.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      onBackToCollection();
    }
  };

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImage(product.image);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const allImages = [
    product.image,
    ...(product.additionalImages || []),
    'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=80'
  ].slice(0, 4);

  const handleAddToCart = () => {
    const asPoojaKit: PoojaKit = {
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
      itemsIncluded: product.itemsIncluded,
    };
    for (let i = 0; i < quantity; i++) {
      onAddToCart(asPoojaKit);
    }
    showToast(`Added ${quantity}x "${product.title}" to sacred basket.`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => {
      onOpenCart();
    }, 200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.shortDesc,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Sacred offering link copied to clipboard!');
    }
  };

  // Wishlist products for drawer
  const wishlistedProducts = MALL_PRODUCTS.filter(p => wishlistIds.has(p.id));

  // 4 Related offerings
  const relatedProducts = MALL_PRODUCTS
    .filter(p => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  const discountPercent = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="relative w-full min-h-screen bg-[#FEFBF2] text-[#221508] font-dm selection:bg-[#98555E]/20">
      
      {/* ======================================================== */}
      {/* 1. TOP FREE SHIPPING BAR (MATCHES WIND BLUE #0A4C83)      */}
      {/* ======================================================== */}
      <div className="w-full bg-[#0A4C83] text-[#FEFBF2] py-2 px-4 text-center border-b border-[#073863] select-none text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-3 shadow-xs">
        <span className="text-[#E4B968] text-[10px]">❖</span>
        <span>FREE SHIPPING ON ORDERS ABOVE ₹1999 &nbsp;|&nbsp; SACRED OBJECTS FOR A MEANINGFUL TOMORROW</span>
        <span className="text-[#E4B968] text-[10px]">❖</span>
      </div>

      {/* ======================================================== */}
      {/* 2. TOP NAVBAR IN TRANSPARENT (NO COLOR) DESIGN           */}
      {/* ======================================================== */}
      <header className={`sticky top-0 z-30 w-full bg-[#FEFBF2]/80 backdrop-blur-md border-b border-[#C59239]/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isNavbarVisible && !isMenuOpen
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Left: House of Sanatan Branding */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0A4C83] flex items-center justify-center text-[#FEFBF2] shadow-xs group-hover:scale-105 transition-transform">
                <SunIcon className="w-5 h-5 text-[#FEFBF2]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-cormorant font-bold text-lg sm:text-xl md:text-2xl tracking-tight text-[#221508] group-hover:text-[#0A4C83] transition-colors">
                  House of Sanatan
                </span>
                <span className="font-dm text-[9px] uppercase tracking-[0.22em] text-[#C59239] font-semibold">
                  Estd. Vedic Sanctum
                </span>
              </div>
            </button>
          </div>

          {/* Center: Interactive Search Bar with Live Suggestions */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl mx-2 sm:mx-6 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <button
                type="submit"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C59239] hover:text-[#0A4C83] cursor-pointer transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Search Sanatan Mall for idols, puja kits, incense..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-dm bg-white/90 hover:bg-white focus:bg-white border border-[#C59239]/40 focus:border-[#0A4C83] text-[#221508] placeholder-[#3D2619]/60 shadow-2xs outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D2619]/60 hover:text-[#221508] cursor-pointer p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-[#FEFBF2] border-2 border-[#C59239]/40 rounded-2xl shadow-[0_15px_40px_rgba(34,21,8,0.2)] overflow-hidden z-50 animate-fadeIn">
                <div className="p-2 border-b border-[#C59239]/20 flex items-center justify-between text-[11px] text-[#3D2619]/70 px-3">
                  <span>Found {searchResults.length} matching sacred items</span>
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="font-bold text-[#0A4C83] hover:underline cursor-pointer"
                  >
                    View All in Mall ➔
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="divide-y divide-[#C59239]/15 max-h-72 overflow-y-auto">
                    {searchResults.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectRelatedProduct(p);
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="p-2.5 sm:p-3 flex items-center gap-3 hover:bg-white transition-colors cursor-pointer group"
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-11 h-11 rounded-xl object-cover border border-[#C59239]/30 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="block text-xs font-bold text-[#221508] group-hover:text-[#0A4C83] truncate transition-colors">
                            {p.title}
                          </span>
                          <span className="block text-[10px] text-[#3D2619]/70 truncate">
                            {p.categoryLabel} &bull; {p.material}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-[#98555E]">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-[#3D2619]/70">
                    No offerings found matching "{searchQuery}".
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="block mx-auto mt-2 text-xs font-bold text-[#0A4C83] hover:underline cursor-pointer"
                    >
                      Search All Collections ➔
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Controls: FAR CORNER, LARGER SIZES, ICON ONLY DEFAULT -> SPREADS WITH RICH COLOR (600ms SMOOTH) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            
            {/* Wishlist Button - Icon only default, spreads and fills with Ruby Red on hover */}
            <button
              type="button"
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="group relative flex items-center h-11 px-3 rounded-full bg-white/85 hover:bg-[#98555E] border border-[#C59239]/40 hover:border-[#98555E] text-[#98555E] hover:text-white shadow-xs hover:shadow-[0_8px_25px_rgba(152,85,94,0.35)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden"
              title="Sacred Wishlist"
            >
              <Heart className={`w-5 h-5 shrink-0 transition-all duration-600 group-hover:scale-110 ${wishlistIds.size > 0 ? 'fill-[#98555E] text-[#98555E] group-hover:fill-white group-hover:text-white' : 'text-[#98555E] group-hover:text-white'}`} />
              
              <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold text-[#98555E] group-hover:text-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Wishlist
              </span>

              {wishlistIds.size > 0 && (
                <span className="ml-1.5 w-4.5 h-4.5 rounded-full bg-[#98555E] group-hover:bg-white text-white group-hover:text-[#98555E] font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-colors duration-600">
                  {wishlistIds.size}
                </span>
              )}
            </button>

            {/* Sacred Basket Button - Icon only default, spreads and fills with Fire Orange on hover */}
            <button
              type="button"
              onClick={onOpenCart}
              className="group relative flex items-center h-11 px-3 rounded-full bg-white/85 hover:bg-[#FE7613] border border-[#C59239]/40 hover:border-[#FE7613] text-[#FE7613] hover:text-white shadow-xs hover:shadow-[0_8px_25px_rgba(254,118,19,0.35)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden active:scale-95"
              title="Sacred Basket"
            >
              <ShoppingBag className="w-5 h-5 shrink-0 text-[#FE7613] group-hover:text-white transition-all duration-600 group-hover:scale-110" />
              
              <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold text-[#FE7613] group-hover:text-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Basket
              </span>

              <span className="ml-1.5 w-4.5 h-4.5 rounded-full bg-[#FE7613] group-hover:bg-white text-white group-hover:text-[#FE7613] font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-colors duration-600">
                {cartCount}
              </span>
            </button>

            {/* User Account Button */}
            <button
              type="button"
              onClick={onOpenAccount || openShopifyAccount}
              className="group relative flex items-center h-11 px-3 rounded-full bg-white/85 hover:bg-[#0A4C83] border border-[#C59239]/40 hover:border-[#0A4C83] text-[#221508] hover:text-[#FEFBF2] shadow-xs hover:shadow-[0_8px_25px_rgba(10,76,131,0.3)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden active:scale-95"
              title="My Account"
            >
              <User className="w-5 h-5 shrink-0 text-[#221508] group-hover:text-[#FEFBF2] transition-all duration-600 group-hover:scale-110" />
              
              <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold text-[#221508] group-hover:text-[#FEFBF2] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Account
              </span>
            </button>



          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. BREADCRUMBS                                           */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between text-xs font-dm text-[#3D2619]">
          <nav className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#98555E] cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#C59239]" />
            <button
              type="button"
              onClick={onBackToCollection}
              className="hover:text-[#98555E] cursor-pointer"
            >
              Our Collections
            </button>
            <ChevronRight className="w-3 h-3 text-[#C59239]" />
            <span className="uppercase text-[11px] font-semibold text-[#C59239]">
              {product.categoryLabel}
            </span>
            <ChevronRight className="w-3 h-3 text-[#C59239]" />
            <span className="text-[#221508] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {product.title}
            </span>
          </nav>

          <button
            type="button"
            onClick={onBackToCollection}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#0A4C83] hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Collections</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MAIN DEDICATED PRODUCT VIEW                           */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ====================================================== */}
          {/* LEFT: GALLERY                                          */}
          {/* ====================================================== */}
          <div ref={imageSectionRef} className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Primary High-Resolution Stage */}
            <div className="relative aspect-[3/4] sm:aspect-square w-full rounded-2xl overflow-hidden bg-[#FEFBF2] border border-[#C59239]/30 shadow-xs">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0.85, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover select-none"
              />

              {/* Discount / New Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {discountPercent > 0 && (
                  <span className="px-3 py-1 rounded-full bg-[#98555E] text-white text-[11px] font-dm font-bold shadow-md">
                    {discountPercent}% off
                  </span>
                )}
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#221508] text-[#FEFBF2] text-[10px] font-dm font-bold uppercase tracking-wider shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Consecration Sanctum Stamp */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#C59239]/30 shadow-sm text-xs font-dm text-[#3D2619]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#98555E]/10 flex items-center justify-center text-[#98555E]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#98555E] block tracking-wider">
                      Consecrated Sanctum
                    </span>
                    <span className="font-semibold text-[#221508]">
                      {product.consecratedAt}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#607427] px-2.5 py-0.5 rounded-full bg-[#607427]/15">
                  Vedic Verified
                </span>
              </div>

              {/* Wishlist Button On Image */}
              <button
                type="button"
                onClick={() => {
                  onToggleWishlist(product.id);
                  showToast(!isWishlisted ? 'Saved to sacred wishlist ♡' : 'Removed from wishlist');
                }}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#3D2619] hover:text-[#98555E] shadow-md transition-all cursor-pointer"
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#98555E] text-[#98555E]' : 'stroke-[1.75]'}`} />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {allImages.map((imgUrl, idx) => {
                const isActive = selectedImage === imgUrl;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-[#FEFBF2] border-2 transition-all cursor-pointer ${
                      isActive ? 'border-[#C59239] shadow-md scale-[1.02]' : 'border-[#C59239]/20 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.title} angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Guarantees Box */}
            <div className="p-4 rounded-xl bg-white border border-[#C59239]/25 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-dm text-[#3D2619]">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#C59239] shrink-0" />
                <span>100% Hereditary Master Artisan Handcrafted</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#607427] shrink-0" />
                <span>NABL Lab Certified Purity & Virgin Alloys</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#98555E] shrink-0" />
                <span>Origin: {product.originLocation}</span>
              </div>
            </div>

          </div>

          {/* ====================================================== */}
          {/* RIGHT: BUY BOX & WISHLIST ON PRODUCT PAGE              */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 flex flex-col">
            
            {/* Category & Meta */}
            <div className="flex items-center gap-2 mb-2">
              <span className="font-dm font-bold text-[10px] tracking-[0.2em] uppercase text-[#98555E] px-2.5 py-0.5 rounded-full bg-[#98555E]/10">
                {product.categoryLabel}
              </span>
              <span className="text-[#C59239]">&bull;</span>
              <span className="text-xs text-[#3D2619] font-medium">
                {product.material}
              </span>
              <span className="text-[#C59239]">&bull;</span>
              <span className="text-xs text-[#3D2619] font-medium">
                {product.occasion}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-cormorant font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#221508] leading-[1.08] tracking-tight">
              {product.title}
            </h1>

            {/* Subtitle */}
            <p className="font-dm text-xs sm:text-sm text-[#3D2619] mt-2 leading-relaxed">
              {product.subtitle}
            </p>

            {/* Rating Row */}
            <div className="flex items-center gap-3 mt-3 pb-4 border-b border-[#C59239]/20">
              <div className="flex items-center gap-1 text-[#C59239]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C59239] text-[#C59239]" />
                ))}
              </div>
              <span className="font-dm font-bold text-sm text-[#221508]">
                {product.rating}
              </span>
              <span className="text-xs font-dm text-[#3D2619]/70">
                ({product.reviewsCount} verified devotee reviews)
              </span>
            </div>

            {/* Price Row */}
            <div className="py-4 border-b border-[#C59239]/20">
              <div className="flex items-baseline gap-3">
                <span className="font-dm font-bold text-3xl sm:text-4xl text-[#98555E]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="font-dm text-base sm:text-lg text-[#3D2619]/50 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#98555E]/15 text-[#98555E] font-dm font-bold text-xs">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
              <p className="font-dm text-[11px] text-[#3D2619]/80 mt-1.5 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#607427]" />
                <span>Inclusive of all Vedic consecration dakshina, gift packaging & GST.</span>
              </p>
            </div>

            {/* Short Desc */}
            <p className="font-dm text-xs sm:text-sm text-[#3D2619] leading-relaxed my-4">
              {product.shortDesc}
            </p>

            {/* Quantity Selector & Status */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-dm font-bold uppercase tracking-wider text-[#221508]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#C59239]/30 rounded-xl bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2.5 hover:bg-[#FEFBF2] text-[#3D2619] disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-dm font-bold text-sm text-[#221508]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 hover:bg-[#FEFBF2] text-[#3D2619] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              {product.inStock ? (
                <span className="text-xs font-dm text-[#607427] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Sanctum Stock
                </span>
              ) : (
                <span className="text-xs font-dm text-[#FE7613] font-semibold">
                  Pre-order (Crafted on Demand)
                </span>
              )}
            </div>

            {/* ACTION BUTTONS (INCLUDING DEDICATED WISHLIST BUTTON ON PRODUCT PAGE) */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-[#98555E] text-[#98555E] hover:text-white border border-[#98555E]/40 hover:border-[#98555E] text-xs font-dm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ADD TO BASKET</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#51000F] hover:bg-[#742A35] text-white text-xs font-dm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_14px_rgba(81,0,15,0.35)] active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-[#FEFBF2]" />
                  <span>BUY NOW</span>
                </button>
              </div>

              {/* DEDICATED WISHLIST BUTTON ON PRODUCT PAGE */}
              <button
                type="button"
                onClick={() => {
                  onToggleWishlist(product.id);
                  showToast(!isWishlisted ? 'Saved to sacred wishlist ♡' : 'Removed from wishlist');
                }}
                className={`w-full py-3 px-4 rounded-xl border text-xs font-dm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isWishlisted 
                    ? 'bg-[#98555E]/10 border-[#98555E] text-[#98555E]' 
                    : 'bg-white border-[#C59239]/40 hover:border-[#98555E] text-[#3D2619] hover:text-[#98555E]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#98555E] text-[#98555E]' : ''}`} />
                <span>{isWishlisted ? 'In Your Sacred Wishlist (Tap to remove)' : 'Add to Wishlist ♡'}</span>
              </button>

              {/* Share and Browse */}
              <div className="flex items-center justify-between pt-2 text-xs font-dm text-[#3D2619]">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-[#0A4C83] cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Sacred Offering</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsWishlistDrawerOpen(true)}
                  className="flex items-center gap-1 text-[#0A4C83] font-semibold hover:underline cursor-pointer"
                >
                  <span>View All Saved Items ({wishlistIds.size})</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Shipping strip */}
            <div className="mt-6 pt-5 border-t border-[#C59239]/20 space-y-2.5 text-xs font-dm text-[#3D2619]">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#0A4C83] shrink-0" />
                <span><strong>Free Express Insured Delivery</strong> on orders above ₹1999 (3-5 business days).</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-[#607427] shrink-0" />
                <span><strong>7-Day Authentic Return Guarantee:</strong> Sanctified items receive full exchange or refund.</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#C59239] shrink-0" />
                <span><strong>Tamper-Proof Consecration Certificate</strong> signed by presiding temple priests.</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ======================================================== */}
      {/* 5. TABS                                                  */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-t border-[#C59239]/20 mt-8">
        
        {/* Tab Headers */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 border-b border-[#C59239]/20 overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab('significance')}
            className={`pb-3 text-xs sm:text-sm font-dm uppercase tracking-wider font-semibold transition-colors cursor-pointer relative ${
              activeTab === 'significance' ? 'text-[#0A4C83]' : 'text-[#3D2619]/70 hover:text-[#0A4C83]'
            }`}
          >
            Sacred Significance
            {activeTab === 'significance' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0A4C83] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`pb-3 text-xs sm:text-sm font-dm uppercase tracking-wider font-semibold transition-colors cursor-pointer relative ${
              activeTab === 'items' ? 'text-[#0A4C83]' : 'text-[#3D2619]/70 hover:text-[#0A4C83]'
            }`}
          >
            Included Offerings ({product.itemsIncluded?.length || 1})
            {activeTab === 'items' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0A4C83] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs sm:text-sm font-dm uppercase tracking-wider font-semibold transition-colors cursor-pointer relative ${
              activeTab === 'specs' ? 'text-[#0A4C83]' : 'text-[#3D2619]/70 hover:text-[#0A4C83]'
            }`}
          >
            Specifications
            {activeTab === 'specs' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0A4C83] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rituals')}
            className={`pb-3 text-xs sm:text-sm font-dm uppercase tracking-wider font-semibold transition-colors cursor-pointer relative ${
              activeTab === 'rituals' ? 'text-[#0A4C83]' : 'text-[#3D2619]/70 hover:text-[#0A4C83]'
            }`}
          >
            Worship Guide
            {activeTab === 'rituals' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0A4C83] rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-8 max-w-4xl mx-auto">
          {activeTab === 'significance' && (
            <div className="space-y-4 text-sm font-dm text-[#3D2619] leading-relaxed">
              <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#221508]">
                Scriptural Foundations & Pranic Radiance
              </h3>
              <p>{product.fullDesc}</p>
            </div>
          )}

          {activeTab === 'items' && (
            <div>
              <h3 className="font-cormorant font-bold text-2xl text-[#221508] mb-4">
                What's in the Sacred Presentation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.itemsIncluded?.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-[#C59239]/20 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#0A4C83]/10 text-[#0A4C83] font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="font-dm font-bold text-xs text-[#221508]">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[#3D2619] mt-1 pl-7">
                      {item.significance}
                    </p>
                    <div className="mt-2 pt-2 border-t border-[#C59239]/20 pl-7 text-[10px] text-[#C59239]">
                      Origin: <strong>{item.origin}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div>
              <h3 className="font-cormorant font-bold text-2xl text-[#221508] mb-4">
                Technical Specifications & Consecration
              </h3>
              <div className="rounded-xl overflow-hidden border border-[#C59239]/30 bg-white divide-y divide-[#C59239]/15 shadow-2xs">
                <div className="flex justify-between p-3.5 text-xs font-dm">
                  <span className="text-[#3D2619]">Material</span>
                  <span className="font-semibold text-[#221508]">{product.material}</span>
                </div>
                <div className="flex justify-between p-3.5 text-xs font-dm">
                  <span className="text-[#3D2619]">Consecration Peetham</span>
                  <span className="font-semibold text-[#221508]">{product.consecratedAt}</span>
                </div>
                <div className="flex justify-between p-3.5 text-xs font-dm">
                  <span className="text-[#3D2619]">Artisan Origin</span>
                  <span className="font-semibold text-[#221508]">{product.originLocation}</span>
                </div>
                <div className="flex justify-between p-3.5 text-xs font-dm">
                  <span className="text-[#3D2619]">Weight</span>
                  <span className="font-semibold text-[#221508]">{product.weightGrams} Grams</span>
                </div>
                {product.specifications?.map((spec, i) => (
                  <div key={i} className="flex justify-between p-3.5 text-xs font-dm">
                    <span className="text-[#3D2619]">{spec.label}</span>
                    <span className="font-semibold text-[#221508]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rituals' && (
            <div className="space-y-4 text-sm font-dm text-[#3D2619] leading-relaxed">
              <h3 className="font-cormorant font-bold text-2xl text-[#221508]">
                How to Welcome & Cleanse this Sacred Object
              </h3>
              <p>
                Unbox with clean hands. Sprinkle three drops of Gangajal while chanting the Gayatri or Om mantra. Position in the Ishanya (Northeast) or East direction of your home altar.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. RELATED PRODUCTS (3-4 CARDS MATCHING DESIGN)          */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#C59239]/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="font-dm font-bold text-[11px] tracking-[0.2em] text-[#C59239] uppercase block">
              SACRED HARMONY
            </span>
            <h2 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#221508]">
              You May Also Revere
            </h2>
          </div>
          <button
            type="button"
            onClick={onBackToCollection}
            className="text-xs font-dm font-semibold text-[#0A4C83] hover:underline cursor-pointer"
          >
            View Full Collection ➔
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map((relProduct) => (
            <div
              key={relProduct.id}
              onClick={() => onSelectRelatedProduct(relProduct)}
              className="group bg-[#FEFBF2] border border-[#C59239]/25 hover:border-[#C59239] rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#241C15] to-[#16110D] mb-3">
                  <img
                    src={relProduct.image}
                    alt={relProduct.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {relProduct.badge && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#98555E] to-[#51000F] text-white text-[9px] font-dm font-bold uppercase tracking-wider">
                        {relProduct.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#3D2619] mb-1">
                  <span className="font-semibold uppercase text-[#C59239] tracking-wider text-[10px]">
                    {relProduct.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[#C59239]">
                    <Star className="w-3 h-3 fill-[#C59239]" />
                    <span className="font-bold text-[#221508]">{relProduct.rating}</span>
                  </div>
                </div>

                <h3 className="font-cormorant font-semibold text-base text-[#221508] group-hover:text-[#98555E] transition-colors line-clamp-1 leading-snug">
                  {relProduct.title}
                </h3>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-dm font-bold text-sm text-[#98555E]">
                    ₹{relProduct.price.toLocaleString('en-IN')}
                  </span>
                  {relProduct.originalPrice > relProduct.price && (
                    <span className="font-dm text-xs text-[#3D2619]/50 line-through">
                      ₹{relProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-1 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const kit: PoojaKit = {
                      id: relProduct.id,
                      title: relProduct.title,
                      subtitle: relProduct.subtitle,
                      category: 'festival',
                      price: relProduct.price,
                      originalPrice: relProduct.originalPrice,
                      rating: relProduct.rating,
                      reviewsCount: relProduct.reviewsCount,
                      image: relProduct.image,
                      shortDesc: relProduct.shortDesc,
                      idealFor: relProduct.idealFor,
                      itemsIncluded: relProduct.itemsIncluded,
                    };
                    onAddToCart(kit);
                    showToast(`Added "${relProduct.title}" to basket.`);
                  }}
                  className="w-full py-2 px-1.5 rounded-lg bg-white hover:bg-[#98555E] text-[#98555E] hover:text-white border border-[#98555E]/30 hover:border-[#98555E] text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  <ShoppingCart className="w-3 h-3" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const kit: PoojaKit = {
                      id: relProduct.id,
                      title: relProduct.title,
                      subtitle: relProduct.subtitle,
                      category: 'festival',
                      price: relProduct.price,
                      originalPrice: relProduct.originalPrice,
                      rating: relProduct.rating,
                      reviewsCount: relProduct.reviewsCount,
                      image: relProduct.image,
                      shortDesc: relProduct.shortDesc,
                      idealFor: relProduct.idealFor,
                      itemsIncluded: relProduct.itemsIncluded,
                    };
                    onAddToCart(kit);
                    setTimeout(() => onOpenCart(), 150);
                  }}
                  className="w-full py-2 px-1.5 rounded-lg bg-[#51000F] hover:bg-[#742A35] text-white text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-[0_4px_12px_rgba(81,0,15,0.3)]"
                >
                  <span>Buy Now</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. BOTTOM 3-FEATURE ASSURANCE BAR                        */}
      {/* ======================================================== */}
      <section className="border-t border-[#C59239]/20 bg-[#FEFBF2] py-10 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A4C83]/10 flex items-center justify-center text-[#0A4C83] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-dm font-bold text-sm text-[#221508]">Free Shipping</h4>
              <p className="text-xs text-[#3D2619]/80 mt-0.5">Free shipping for orders above ₹1999</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A4C83]/10 flex items-center justify-center text-[#0A4C83] shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-dm font-bold text-sm text-[#221508]">Flexible Payment</h4>
              <p className="text-xs text-[#3D2619]/80 mt-0.5">Multiple secure payment options & UPI</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0A4C83]/10 flex items-center justify-center text-[#0A4C83] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-dm font-bold text-sm text-[#221508]">24×7 Devotional Care</h4>
              <p className="text-xs text-[#3D2619]/80 mt-0.5">We support online all days for ritual guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. GLOBAL FOOTER (SAME ON EVERY PAGE)                    */}
      {/* ======================================================== */}
      <Footer onNavigateAccount={onOpenAccount} />

      {/* ======================================================== */}
      {/* 9. WISHLIST DRAWER                                       */}
      {/* ======================================================== */}
      <WishlistDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        wishlistItems={wishlistedProducts}
        onRemoveFromWishlist={onToggleWishlist}
        onMoveToCart={(prod) => {
          const kit: PoojaKit = {
            id: prod.id,
            title: prod.title,
            subtitle: prod.subtitle,
            category: 'festival',
            price: prod.price,
            originalPrice: prod.originalPrice,
            rating: prod.rating,
            reviewsCount: prod.reviewsCount,
            image: prod.image,
            shortDesc: prod.shortDesc,
            idealFor: prod.idealFor,
            itemsIncluded: prod.itemsIncluded,
          };
          onAddToCart(kit);
          showToast(`Moved "${prod.title}" to sacred basket.`);
        }}
        onSelectProduct={(prod) => onSelectRelatedProduct(prod)}
      />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#221508] border border-[#C59239] text-[#FEFBF2] px-5 py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <span className="text-[#E4B968]">✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
