import React, { useState, useEffect } from 'react';
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
  Search
} from 'lucide-react';
import { MallProduct, MALL_PRODUCTS } from '../data/mallData';
import { PoojaKit } from '../types/homepage';
import { SunIcon } from './SunIcon';
import { WishlistDrawer } from './WishlistDrawer';
import { Footer } from './Footer';

interface ProductDetailPageProps {
  product: MallProduct;
  onBackToCollection: () => void;
  onSelectRelatedProduct: (product: MallProduct) => void;
  onAddToCart: (kit: PoojaKit, quantity?: number) => void;
  onOpenCart: () => void;
  onOpenAccount?: () => void;
  cartCount: number;
  onNavigateHome: () => void;
  onNavigateTravel: () => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (productId: string) => void;
  isMenuOpen?: boolean;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToCollection,
  onSelectRelatedProduct,
  onAddToCart,
  onOpenCart,
  onOpenAccount,
  cartCount,
  onNavigateHome,
  onNavigateTravel,
  wishlistIds,
  onToggleWishlist,
  isMenuOpen = false,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'significance' | 'items' | 'specs' | 'rituals'>('significance');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  const isWishlisted = wishlistIds.has(product.id);

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
    <div className="relative w-full min-h-screen bg-[#FBF9F5] text-[#26201B] font-dm selection:bg-[#58111A]/20">
      
      {/* ======================================================== */}
      {/* 1. TOP FREE SHIPPING BAR (MATCHES FOOTER COLOR #C7833D)  */}
      {/* ======================================================== */}
      <div className="w-full bg-[#C7833D] text-[#F7F1E5] py-2 px-4 text-center border-b border-[#B2702D] select-none text-[11px] sm:text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-3 shadow-xs">
        <span className="text-[#F7F1E5]/80 text-[10px]">❖</span>
        <span>FREE SHIPPING ON ORDERS ABOVE ₹1999 &nbsp;|&nbsp; SACRED OBJECTS FOR A MEANINGFUL TOMORROW</span>
        <span className="text-[#F7F1E5]/80 text-[10px]">❖</span>
      </div>

      {/* ======================================================== */}
      {/* 2. TOP NAVBAR IN TRANSPARENT (NO COLOR) DESIGN           */}
      {/* ======================================================== */}
      <header className={`sticky top-0 z-30 w-full bg-transparent backdrop-blur-md border-b border-[#E8DFC9]/70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        !isMenuOpen
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
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#58111A] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <SunIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-cormorant font-bold text-lg sm:text-xl md:text-2xl tracking-tight text-[#26201B] group-hover:text-[#58111A] transition-colors">
                  House of Sanatan
                </span>
                <span className="font-dm text-[9px] uppercase tracking-[0.22em] text-[#8F6E5B] font-semibold">
                  Estd. Vedic Sanctum
                </span>
              </div>
            </button>
          </div>

          {/* Center: Search / Back to Mall Quick Action */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F6E5B] pointer-events-none" />
              <input
                type="text"
                placeholder="Search Sanatan Mall for idols, puja kits, incense..."
                onClick={onBackToCollection}
                readOnly
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-dm bg-white/80 hover:bg-white border border-[#D9C6A8] text-[#26201B] placeholder-[#8F6E5B]/80 shadow-2xs cursor-pointer transition-all"
              />
            </div>
          </div>

          {/* Right Action Controls: FAR CORNER, LARGER SIZES, ICON ONLY DEFAULT -> SPREADS WITH RICH COLOR (600ms SMOOTH) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            
            {/* Wishlist Button - Icon only default, spreads and fills with Royal Maroon on hover */}
            <button
              type="button"
              onClick={() => setIsWishlistDrawerOpen(true)}
              className="group relative flex items-center h-11 px-3 rounded-full bg-white/85 hover:bg-[#58111A] border border-[#D9C6A8] hover:border-[#58111A] text-[#58111A] hover:text-white shadow-xs hover:shadow-[0_8px_25px_rgba(88,17,26,0.35)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden"
              title="Sacred Wishlist"
            >
              <Heart className={`w-5 h-5 shrink-0 transition-all duration-600 group-hover:scale-110 ${wishlistIds.size > 0 ? 'fill-[#58111A] text-[#58111A] group-hover:fill-white group-hover:text-white' : 'text-[#58111A] group-hover:text-white'}`} />
              
              <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold text-[#58111A] group-hover:text-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Wishlist
              </span>

              {wishlistIds.size > 0 && (
                <span className="ml-1.5 w-4.5 h-4.5 rounded-full bg-[#58111A] group-hover:bg-white text-white group-hover:text-[#58111A] font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-colors duration-600">
                  {wishlistIds.size}
                </span>
              )}
            </button>

            {/* Sacred Basket Button - Icon only default, spreads and fills with Saffron Gold on hover */}
            <button
              type="button"
              onClick={onOpenCart}
              className="group relative flex items-center h-11 px-3 rounded-full bg-white/85 hover:bg-gradient-to-r hover:from-[#C7833D] hover:to-[#B08A4A] border border-[#D9C6A8] hover:border-[#B08A4A] text-[#C7833D] hover:text-white shadow-xs hover:shadow-[0_8px_25px_rgba(199,131,61,0.4)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden active:scale-95"
              title="Sacred Basket"
            >
              <ShoppingBag className="w-5 h-5 shrink-0 text-[#C7833D] group-hover:text-white transition-all duration-600 group-hover:scale-110" />
              
              <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold text-[#C7833D] group-hover:text-white transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Basket
              </span>

              <span className="ml-1.5 w-4.5 h-4.5 rounded-full bg-[#C7833D] group-hover:bg-white text-white group-hover:text-[#C7833D] font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-colors duration-600">
                {cartCount}
              </span>
            </button>

            {/* User Account Button - Icon only default, spreads and fills with Sacred Charcoal on hover */}
            <button
              type="button"
              onClick={onOpenAccount || (() => showToast('Sacred Sadhaka Profile & Orders'))}
              className="group relative flex items-center h-11 px-3 rounded-full bg-white/85 hover:bg-[#26201B] border border-[#D9C6A8] hover:border-[#26201B] text-[#26201B] hover:text-[#F7F1E5] shadow-xs hover:shadow-[0_8px_25px_rgba(38,32,27,0.35)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden"
              title="My Account"
            >
              <User className="w-5 h-5 shrink-0 text-[#26201B] group-hover:text-[#D9C6A8] transition-all duration-600 group-hover:scale-110" />
              
              <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold text-[#26201B] group-hover:text-[#F7F1E5] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Account
              </span>
            </button>

            {/* Back to Mall Button */}
            <button
              type="button"
              onClick={onBackToCollection}
              className="hidden lg:flex items-center gap-1.5 px-3.5 h-11 rounded-full border border-[#D9C6A8] hover:border-[#B08A4A] bg-white/85 hover:bg-white text-xs font-semibold text-[#5E4B3E] hover:text-[#1A1612] transition-all cursor-pointer ml-1 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Mall</span>
            </button>

          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. BREADCRUMBS                                           */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between text-xs font-dm text-[#8F6E5B]">
          <nav className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#58111A] cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3 h-3 text-[#C4B29E]" />
            <button
              type="button"
              onClick={onBackToCollection}
              className="hover:text-[#58111A] cursor-pointer"
            >
              Our Collections
            </button>
            <ChevronRight className="w-3 h-3 text-[#C4B29E]" />
            <span className="uppercase text-[11px] font-semibold text-[#8F6E5B]">
              {product.categoryLabel}
            </span>
            <ChevronRight className="w-3 h-3 text-[#C4B29E]" />
            <span className="text-[#26201B] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {product.title}
            </span>
          </nav>

          <button
            type="button"
            onClick={onBackToCollection}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#58111A] hover:underline cursor-pointer"
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
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Primary High-Resolution Stage */}
            <div className="relative aspect-[3/4] sm:aspect-square w-full rounded-2xl overflow-hidden bg-[#F7F2EB] border border-[#E8E2D5] shadow-xs">
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
                  <span className="px-3 py-1 rounded-full bg-[#58111A] text-white text-[11px] font-dm font-bold shadow-md">
                    {discountPercent}% off
                  </span>
                )}
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#26201B] text-[#FAF7F2] text-[10px] font-dm font-bold uppercase tracking-wider shadow-md">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Consecration Sanctum Stamp */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-3 rounded-xl bg-white/95 backdrop-blur-md border border-[#E8E2D5] shadow-sm text-xs font-dm text-[#5E4B3E]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#58111A]/10 flex items-center justify-center text-[#58111A]">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#58111A] block tracking-wider">
                      Consecrated Sanctum
                    </span>
                    <span className="font-semibold text-[#26201B]">
                      {product.consecratedAt}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-[#58111A] px-2.5 py-0.5 rounded-full bg-[#58111A]/10">
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
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-[#5E4B3E] hover:text-[#58111A] shadow-md transition-all cursor-pointer"
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#58111A] text-[#58111A]' : 'stroke-[1.75]'}`} />
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
                    className={`relative aspect-square rounded-xl overflow-hidden bg-[#F6F4EE] border-2 transition-all cursor-pointer ${
                      isActive ? 'border-[#58111A] shadow-md scale-[1.02]' : 'border-[#DECDB8] opacity-75 hover:opacity-100'
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
            <div className="p-4 rounded-xl bg-white border border-[#E8E2D5] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-dm text-[#6E584B]">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#58111A] shrink-0" />
                <span>100% Hereditary Master Artisan Handcrafted</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#58111A] shrink-0" />
                <span>NABL Lab Certified Purity & Virgin Alloys</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#58111A] shrink-0" />
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
              <span className="font-dm font-bold text-[10px] tracking-[0.2em] uppercase text-[#58111A] px-2.5 py-0.5 rounded-full bg-[#58111A]/10">
                {product.categoryLabel}
              </span>
              <span className="text-[#8F6E5B]">&bull;</span>
              <span className="text-xs text-[#6E584B] font-medium">
                {product.material}
              </span>
              <span className="text-[#8F6E5B]">&bull;</span>
              <span className="text-xs text-[#6E584B] font-medium">
                {product.occasion}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-cormorant font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#241C15] leading-[1.08] tracking-tight">
              {product.title}
            </h1>

            {/* Subtitle */}
            <p className="font-dm text-xs sm:text-sm text-[#8F6E5B] mt-2 leading-relaxed">
              {product.subtitle}
            </p>

            {/* Rating Row */}
            <div className="flex items-center gap-3 mt-3 pb-4 border-b border-[#E8E2D5]">
              <div className="flex items-center gap-1 text-[#C5A059]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                ))}
              </div>
              <span className="font-dm font-bold text-sm text-[#26201B]">
                {product.rating}
              </span>
              <span className="text-xs font-dm text-[#8F6E5B]">
                ({product.reviewsCount} verified devotee reviews)
              </span>
            </div>

            {/* Price Row */}
            <div className="py-4 border-b border-[#E8E2D5]">
              <div className="flex items-baseline gap-3">
                <span className="font-dm font-bold text-3xl sm:text-4xl text-[#58111A]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="font-dm text-base sm:text-lg text-[#8F6E5B] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#58111A]/15 text-[#58111A] font-dm font-bold text-xs">
                    Save {discountPercent}%
                  </span>
                )}
              </div>
              <p className="font-dm text-[11px] text-[#8F6E5B] mt-1.5 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#58111A]" />
                <span>Inclusive of all Vedic consecration dakshina, gift packaging & GST.</span>
              </p>
            </div>

            {/* Short Desc */}
            <p className="font-dm text-xs sm:text-sm text-[#5E4B3E] leading-relaxed my-4">
              {product.shortDesc}
            </p>

            {/* Quantity Selector & Status */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-dm font-bold uppercase tracking-wider text-[#26201B]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#DECDB8] rounded-xl bg-white overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="p-2.5 hover:bg-[#FAF7F2] text-[#5E4B3E] disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-dm font-bold text-sm text-[#26201B]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 hover:bg-[#FAF7F2] text-[#5E4B3E] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              {product.inStock ? (
                <span className="text-xs font-dm text-[#58111A] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Sanctum Stock
                </span>
              ) : (
                <span className="text-xs font-dm text-[#C7833D] font-semibold">
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
                  className="w-full py-3.5 px-4 rounded-xl bg-[#FAF5EE] hover:bg-[#58111A] text-[#58111A] hover:text-white border border-[#58111A]/40 hover:border-[#58111A] text-xs font-dm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>ADD TO BASKET</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#58111A] hover:bg-[#6E1724] text-white text-xs font-dm font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-98"
                >
                  <Sparkles className="w-4 h-4 text-[#D9C6A8]" />
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
                    ? 'bg-[#58111A]/10 border-[#58111A] text-[#58111A]' 
                    : 'bg-white border-[#DECDB8] hover:border-[#58111A] text-[#5E4B3E] hover:text-[#58111A]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#58111A] text-[#58111A]' : ''}`} />
                <span>{isWishlisted ? 'In Your Sacred Wishlist (Tap to remove)' : 'Add to Wishlist ♡'}</span>
              </button>

              {/* Share and Browse */}
              <div className="flex items-center justify-between pt-2 text-xs font-dm text-[#8F6E5B]">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 hover:text-[#58111A] cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Sacred Offering</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsWishlistDrawerOpen(true)}
                  className="flex items-center gap-1 text-[#58111A] font-semibold hover:underline cursor-pointer"
                >
                  <span>View All Saved Items ({wishlistIds.size})</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Shipping strip */}
            <div className="mt-6 pt-5 border-t border-[#E8E2D5] space-y-2.5 text-xs font-dm text-[#6E584B]">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#58111A] shrink-0" />
                <span><strong>Free Express Insured Delivery</strong> on orders above ₹1999 (3-5 business days).</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-4 h-4 text-[#58111A] shrink-0" />
                <span><strong>7-Day Authentic Return Guarantee:</strong> Sanctified items receive full exchange or refund.</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#58111A] shrink-0" />
                <span><strong>Tamper-Proof Consecration Certificate</strong> signed by presiding temple priests.</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* ======================================================== */}
      {/* 5. TABS                                                  */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 border-t border-[#E8E2D5] mt-8">
        
        {/* Tab Headers */}
        <div className="flex items-center justify-center gap-4 sm:gap-8 border-b border-[#DECDB8] overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab('significance')}
            className={`pb-3 text-xs sm:text-sm font-dm uppercase tracking-wider font-semibold transition-colors cursor-pointer relative ${
              activeTab === 'significance' ? 'text-[#58111A]' : 'text-[#8F6E5B] hover:text-[#58111A]'
            }`}
          >
            Sacred Significance
            {activeTab === 'significance' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#58111A] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('items')}
            className={`pb-3 text-xs sm:text-sm font-dm uppercase tracking-wider font-semibold transition-colors cursor-pointer relative ${
              activeTab === 'items' ? 'text-[#58111A]' : 'text-[#8F6E5B] hover:text-[#58111A]'
            }`}
          >
            Included Offerings ({product.itemsIncluded?.length || 1})
            {activeTab === 'items' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#58111A] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-xs sm:text-sm font-dm uppercase tracking-wider font-semibold transition-colors cursor-pointer relative ${
              activeTab === 'specs' ? 'text-[#58111A]' : 'text-[#8F6E5B] hover:text-[#58111A]'
            }`}
          >
            Specifications
            {activeTab === 'specs' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#58111A] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rituals')}
            className={`pb-3 text-xs sm:text-sm font-dm uppercase tracking-wider font-semibold transition-colors cursor-pointer relative ${
              activeTab === 'rituals' ? 'text-[#58111A]' : 'text-[#8F6E5B] hover:text-[#58111A]'
            }`}
          >
            Worship Guide
            {activeTab === 'rituals' && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#58111A] rounded-full" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-8 max-w-4xl mx-auto">
          {activeTab === 'significance' && (
            <div className="space-y-4 text-sm font-dm text-[#5E4B3E] leading-relaxed">
              <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#241C15]">
                Scriptural Foundations & Pranic Radiance
              </h3>
              <p>{product.fullDesc}</p>
            </div>
          )}

          {activeTab === 'items' && (
            <div>
              <h3 className="font-cormorant font-bold text-2xl text-[#241C15] mb-4">
                What's in the Sacred Presentation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.itemsIncluded?.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-[#E8E2D5]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-5 h-5 rounded-full bg-[#58111A]/10 text-[#58111A] font-bold text-[10px] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="font-dm font-bold text-xs text-[#26201B]">
                        {item.name}
                      </h4>
                    </div>
                    <p className="text-xs text-[#6E584B] mt-1 pl-7">
                      {item.significance}
                    </p>
                    <div className="mt-2 pt-2 border-t border-[#E8E2D5]/60 pl-7 text-[10px] text-[#8F6E5B]">
                      Origin: <strong>{item.origin}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div>
              <h3 className="font-cormorant font-bold text-2xl text-[#241C15] mb-4">
                Technical Specifications & Consecration
              </h3>
              <div className="rounded-xl overflow-hidden border border-[#E8E2D5] bg-white divide-y divide-[#E8E2D5]">
                <div className="flex justify-between p-3.5 text-xs font-dm">
                  <span className="text-[#8F6E5B]">Material</span>
                  <span className="font-semibold text-[#26201B]">{product.material}</span>
                </div>
                <div className="flex justify-between p-3.5 text-xs font-dm">
                  <span className="text-[#8F6E5B]">Consecration Peetham</span>
                  <span className="font-semibold text-[#26201B]">{product.consecratedAt}</span>
                </div>
                <div className="flex justify-between p-3.5 text-xs font-dm">
                  <span className="text-[#8F6E5B]">Artisan Origin</span>
                  <span className="font-semibold text-[#26201B]">{product.originLocation}</span>
                </div>
                <div className="flex justify-between p-3.5 text-xs font-dm">
                  <span className="text-[#8F6E5B]">Weight</span>
                  <span className="font-semibold text-[#26201B]">{product.weightGrams} Grams</span>
                </div>
                {product.specifications?.map((spec, i) => (
                  <div key={i} className="flex justify-between p-3.5 text-xs font-dm">
                    <span className="text-[#8F6E5B]">{spec.label}</span>
                    <span className="font-semibold text-[#26201B]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rituals' && (
            <div className="space-y-4 text-sm font-dm text-[#5E4B3E] leading-relaxed">
              <h3 className="font-cormorant font-bold text-2xl text-[#241C15]">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#E8E2D5]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="font-dm font-bold text-[11px] tracking-[0.2em] text-[#58111A] uppercase block">
              SACRED HARMONY
            </span>
            <h2 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#241C15]">
              You May Also Revere
            </h2>
          </div>
          <button
            type="button"
            onClick={onBackToCollection}
            className="text-xs font-dm font-semibold text-[#58111A] hover:underline cursor-pointer"
          >
            View Full Collection ➔
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map((relProduct) => (
            <div
              key={relProduct.id}
              onClick={() => onSelectRelatedProduct(relProduct)}
              className="group bg-white border border-[#EBE6DD] rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              <div>
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F6F4EE] mb-3">
                  <img
                    src={relProduct.image}
                    alt={relProduct.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {relProduct.badge && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="px-2 py-0.5 rounded-full bg-[#58111A] text-white text-[9px] font-dm font-bold uppercase tracking-wider">
                        {relProduct.badge}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#8F6E5B] mb-1">
                  <span className="font-semibold uppercase text-[#58111A] tracking-wider text-[10px]">
                    {relProduct.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    <Star className="w-3 h-3 fill-[#C5A059]" />
                    <span className="font-bold text-[#26201B]">{relProduct.rating}</span>
                  </div>
                </div>

                <h3 className="font-cormorant font-semibold text-base text-[#241C15] group-hover:text-[#58111A] transition-colors line-clamp-1 leading-snug">
                  {relProduct.title}
                </h3>

                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-dm font-bold text-sm text-[#58111A]">
                    ₹{relProduct.price.toLocaleString('en-IN')}
                  </span>
                  {relProduct.originalPrice > relProduct.price && (
                    <span className="font-dm text-xs text-[#8F6E5B] line-through">
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
                  className="w-full py-2 px-1.5 rounded-lg bg-[#FAF5EE] hover:bg-[#58111A] text-[#58111A] hover:text-white border border-[#58111A]/30 hover:border-[#58111A] text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs"
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
                  className="w-full py-2 px-1.5 rounded-lg bg-[#58111A] hover:bg-[#6E1724] text-white text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-xs"
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
      <section className="border-t border-[#E8E2D5] bg-white py-10 px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#58111A]/10 flex items-center justify-center text-[#58111A] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-dm font-bold text-sm text-[#26201B]">Free Shipping</h4>
              <p className="text-xs text-[#8F6E5B] mt-0.5">Free shipping for orders above ₹1999</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#58111A]/10 flex items-center justify-center text-[#58111A] shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-dm font-bold text-sm text-[#26201B]">Flexible Payment</h4>
              <p className="text-xs text-[#8F6E5B] mt-0.5">Multiple secure payment options & UPI</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#58111A]/10 flex items-center justify-center text-[#58111A] shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-dm font-bold text-sm text-[#26201B]">24×7 Devotional Care</h4>
              <p className="text-xs text-[#8F6E5B] mt-0.5">We support online all days for ritual guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. GLOBAL FOOTER (SAME ON EVERY PAGE)                    */}
      {/* ======================================================== */}
      <Footer />

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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#58111A] text-white px-5 py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <span className="text-[#D9C6A8]">✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
