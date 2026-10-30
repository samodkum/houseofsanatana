import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Heart, 
  Share2, 
  Compass, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  Check, 
  Award, 
  Info, 
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Sun,
  ShoppingBag,
  Loader2,
  X
} from 'lucide-react';
import { YatraPackage } from '../types/homepage';
import { EXPANDED_TRAVEL_PACKAGES } from '../data/travelData';
import { HeaderActionButtons } from './HeaderActionButtons';
import { Footer } from './Footer';
import { openShopifyAccount, createTravelShopifyCheckout } from '../lib/shopify';


interface YatraDetailPageProps {
  yatra: YatraPackage;
  onBackToYatras: () => void;
  onSelectRelatedYatra: (yatra: YatraPackage) => void;
  onNavigateHome: (sectionId?: string) => void;
  onNavigateMall: () => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenAccount?: () => void;
  cartCount?: number;
  wishlistCount?: number;
  isWishlisted?: boolean;
  onToggleWishlist?: (yatraId: string) => void;
}

export const YatraDetailPage: React.FC<YatraDetailPageProps> = ({
  yatra,
  onBackToYatras,
  onSelectRelatedYatra,
  onNavigateHome,
  onNavigateMall,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  cartCount = 0,
  wishlistCount = 0,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(yatra.image);
  const [activeTab, setActiveTab] = useState<'itinerary' | 'privileges' | 'significance' | 'guidelines'>('itinerary');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [pilgrimCount, setPilgrimCount] = useState<number>(2);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Direct Shopify Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    specialRequests: '',
  });

  const handleOpenBookingModal = () => {
    if (!selectedBatch) {
      setIsCalendarOpen(true);
      showToast('Please select your departure date first 📅');
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleConfirmShopifyBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name.trim() || !bookingForm.phone.trim() || !bookingForm.email.trim()) {
      showToast('Please fill in your name, contact phone and email.');
      return;
    }

    setIsSubmittingBooking(true);
    try {
      const checkoutUrl = await createTravelShopifyCheckout({
        packageTitle: yatra.title,
        packageId: yatra.id,
        departureDate: selectedBatch || 'Upcoming Sacred Muhurat',
        pilgrimCount,
        contactName: bookingForm.name.trim(),
        contactPhone: bookingForm.phone.trim(),
        contactEmail: bookingForm.email.trim(),
        specialRequests: bookingForm.specialRequests.trim(),
        pricePerPerson: numericPrice,
        circuit: yatra.circuit,
      });

      if (checkoutUrl) {
        showToast('Redirecting to Sacred Shopify Checkout...');
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.error('Shopify booking checkout error:', err);
      showToast('Could not initiate checkout. Please try WhatsApp assistance.');
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  // Interactive In-Place Calendar State anchored right beside the pricing layout
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date());


  const calendarData = useMemo(() => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days: { dayNumber: number; dateString: string; isPast: boolean }[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      days.push({
        dayNumber: i,
        dateString: d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        isPast: d < today,
      });
    }

    const monthLabel = calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    return { firstDay, days, monthLabel };
  }, [calendarMonth]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleSelectCalendarDay = (dateStr: string) => {
    setSelectedBatch(dateStr);
    setIsCalendarOpen(false);
    showToast(`Selected Departure Date: ${dateStr}`);
  };

  // Scroll visibility for navbar: disappears past image section
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

  // Reset view to top when yatra changes
  useEffect(() => {
    setSelectedImage(yatra.image);
    setSelectedBatch(null);
    setExpandedDay(1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [yatra]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: yatra.title,
        text: yatra.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Sacred Yatra link copied to clipboard!');
    }
  };

  // Image gallery with fallback authentic sanctum visuals
  const galleryImages = [
    yatra.image,
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
  ].slice(0, 4);

  // 3 Related Yatras (excluding current)
  const relatedYatras = EXPANDED_TRAVEL_PACKAGES
    .filter(p => p.id !== yatra.id)
    .sort((a, b) => (a.circuit === yatra.circuit ? -1 : 1))
    .slice(0, 3);

  const numericPrice = typeof yatra.price === 'number' 
    ? yatra.price 
    : yatra.pricePerPerson || 24500;

  const totalCalculated = numericPrice * pilgrimCount;

  // Day badge colors for timeline chronicle
  const dayBadgeStyles = [
    { bg: 'bg-[#0A4C83]', border: 'border-[#3DB3E4]', text: 'text-white' }, // Wind Blue
    { bg: 'bg-[#607427]', border: 'border-[#C0C7A9]', text: 'text-white' }, // Mountain Green
    { bg: 'bg-[#98555E]', border: 'border-[#C59239]', text: 'text-white' }, // Ruby Red
    { bg: 'bg-[#C59239]', border: 'border-[#E4B968]', text: 'text-white' }, // Temple Gold
    { bg: 'bg-[#FE7613]', border: 'border-[#FE8D3B]', text: 'text-white' }, // Fire Orange
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#FEFBF2] text-[#221508] font-dm selection:bg-[#FE7613]/25 flex flex-col justify-between">
      
      {/* Sacred Ambient Radial Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#C59239]/15 via-[#FE7613]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />



      {/* ======================================================== */}
      {/* 1. TOP SACRED NAVIGATION HEADER (HIDES PAST IMAGE)       */}
      {/* ======================================================== */}
      <header className={`sticky top-0 z-40 w-full bg-[#FEFBF2]/95 backdrop-blur-md border-b border-[#C59239]/25 px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isNavbarVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Identity */}
          <div 
            onClick={() => onNavigateHome('home')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group"
            title="House of Sanatana Home"
          >
            <img 
              src="https://res.cloudinary.com/dzc1dckta/image/upload/v1790697704/HOS_logo_bpd1v5.jpg" 
              alt="House of Sanatana"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#C59239]/30 shadow-xs group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col text-left">
              <span className="font-cormorant font-bold text-base sm:text-lg text-[#221508] tracking-wide leading-none group-hover:text-[#0A4C83] transition-colors">
                ॥ तीर्थाटन महायात्रा ॥
              </span>
              <span className="font-dm text-[9px] sm:text-[10px] text-[#0A4C83] font-bold uppercase tracking-widest mt-0.5">
                Sacred Sanctuary Pilgrimage
              </span>
            </div>
          </div>

          {/* Right Action Controls: Identical Spreading Animation Everywhere */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <HeaderActionButtons
              wishlistCount={wishlistCount}
              cartCount={cartCount}
              onOpenWishlist={onOpenWishlist || (() => {})}
              onOpenCart={onOpenCart || (() => {})}
              onOpenAccount={onOpenAccount || openShopifyAccount}
            />
          </div>

        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. SACRED BREADCRUMB & GOLDEN VEDIC RIBBON               */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="border-b border-[#C59239]/20 pb-3">
          
          {/* Breadcrumb Path */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#3D2619]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateHome('home')}
                  className="hover:text-[#221508] transition-colors cursor-pointer font-medium"
                >
                  Sanctum
                </button>
              </li>
              <li className="text-[#C59239] font-bold">/</li>
              <li>
                <button
                  type="button"
                  onClick={onBackToYatras}
                  className="hover:text-[#221508] transition-colors cursor-pointer font-medium"
                >
                  Sacred Yatras
                </button>
              </li>
              <li className="text-[#C59239] font-bold">/</li>
              <li className="capitalize font-bold text-[#0A4C83] bg-[#0A4C83]/10 px-2.5 py-0.5 rounded-md border border-[#0A4C83]/25">
                {yatra.circuit} Circuit
              </li>
              <li className="text-[#C59239] font-bold">/</li>
              <li className="text-[#221508] font-bold truncate max-w-[200px] sm:max-w-xs">
                {yatra.title}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. HERO SHOWCASE: SPLIT GALLERY & BOOKING PASSPORT       */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: VISUAL PILGRIMAGE GALLERY (7 COLS) */}
          <div ref={imageSectionRef} className="lg:col-span-7 space-y-4">
            
            {/* Main Stage Frame with Sacred Golden Double Rim */}
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden bg-[#1E1610] border-2 border-[#C59239]/40 shadow-[0_20px_50px_rgba(10,76,131,0.15)] group">
              <img 
                src={selectedImage} 
                alt={yatra.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/35 pointer-events-none" />

              {/* Top Left Badges: Ruby Red & Mountain Green */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2 z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#98555E]/95 border border-[#C59239] text-[#FEFBF2] text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E4B968]" />
                  <span>{yatra.badge || 'Consecrated Yatra'}</span>
                </span>

                <span className="px-3.5 py-1 rounded-full bg-[#607427]/95 border border-[#C0C7A9]/60 text-[#FEFBF2] text-xs font-bold backdrop-blur-md shadow-md flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C0C7A9]" />
                  <span>{yatra.durationDays}D / {yatra.durationNights}N</span>
                </span>
              </div>

              {/* Top Right Wishlist & Share Floating Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                {onToggleWishlist && (
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(yatra.id)}
                    className="w-10 h-10 rounded-full bg-white/95 hover:bg-[#98555E] text-[#98555E] hover:text-white flex items-center justify-center border border-[#C59239]/30 shadow-md transition-all active:scale-90 cursor-pointer group/wish"
                    title={isWishlisted ? "Remove from Sacred Wishlist" : "Save to Sacred Wishlist"}
                  >
                    <Heart className={`w-4.5 h-4.5 transition-transform group-hover/wish:scale-110 ${isWishlisted ? 'fill-[#98555E] group-hover/wish:fill-white' : 'fill-none'}`} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/95 hover:bg-[#0A4C83] text-[#221508] hover:text-white flex items-center justify-center border border-[#C59239]/30 shadow-md transition-all active:scale-90 cursor-pointer group/share"
                  title="Share Sacred Journey"
                >
                  <Share2 className="w-4.5 h-4.5 transition-transform group-hover/share:scale-110" />
                </button>
              </div>

              {/* Bottom Visual Overlay Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4 text-white">
                <div>
                  <span className="text-[11px] font-dm font-bold text-[#E4B968] tracking-widest uppercase flex items-center gap-1">
                    <span>Starts & Concludes At:</span>
                  </span>
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-white mt-0.5">
                    <MapPin className="w-4 h-4 text-[#FE7613]" />
                    <span>{yatra.startLocation}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-[#221508]/85 px-3 py-1.5 rounded-full border border-[#C59239]/60 backdrop-blur-md shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#E4B968] text-[#E4B968]" />
                  <span className="text-xs font-bold text-white">{yatra.rating || 4.97}</span>
                  <span className="text-[11px] text-[#FEFBF2]/80">({yatra.reviewsCount || 432} Devotees)</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === img
                      ? 'border-[#0A4C83] ring-2 ring-[#0A4C83]/40 shadow-md scale-[1.03]'
                      : 'border-[#C59239]/25 opacity-80 hover:opacity-100 hover:border-[#C59239]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* RIGHT COLUMN: YATRA PASSPORT, CALENDAR & RESERVATION (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Divine Inscription Card */}
            <div className="bg-[#FEFBF2] rounded-3xl border-2 border-[#C59239]/30 hover:border-[#0A4C83] p-6 sm:p-7 shadow-[0_15px_45px_rgba(34,21,8,0.08)] transition-all">
              
              {/* Eyebrow Pill */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A4C83] text-white text-[11px] font-bold uppercase tracking-wider shadow-xs border border-[#3DB3E4]/30">
                  <Compass className="w-3.5 h-3.5 text-[#E4B968]" />
                  <span className="capitalize">{yatra.circuit} Circuit</span>
                  <span>&bull;</span>
                  <span>{yatra.durationDays}D / {yatra.durationNights}N</span>
                </div>

                <span className="text-[11px] font-bold text-[#C59239] font-cormorant text-sm">
                  ॥ ॐ नमः शिवाय ॥
                </span>
              </div>

              {/* Title */}
              <h1 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#221508] leading-tight mb-2">
                {yatra.title}
              </h1>

              {/* Subtitle */}
              <p className="font-dm text-xs sm:text-sm text-[#3D2619]/80 leading-relaxed mb-6">
                {yatra.subtitle}
              </p>

              {/* Price Dakshina Card: Clean, Elegant & Modern */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C59239]/25 shadow-xs mb-6 flex items-baseline justify-between">
                <div>
                  <span className="block text-[11px] font-dm text-[#3D2619]/70 uppercase tracking-wider font-semibold">
                    Sacred Dakshina / Seeker
                  </span>
                  <div className="flex items-baseline gap-2.5 mt-1">
                    <span className="text-3xl sm:text-4xl font-bold font-dm text-[#98555E]">
                      ₹{numericPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#3D2619]/60 font-medium">All inclusive</span>
                  </div>
                </div>
              </div>

              {/* Departure Batch Dates Pill Selector WITH CALENDAR ANCHORED DIRECTLY BESIDE PRICING */}
              <div className="relative mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold font-dm text-[#221508] uppercase tracking-wider flex items-center gap-1.5">
                    <span>Select Sacred Departure Batch:</span>
                  </label>

                  {/* Interactive Calendar Button Anchored Immediately Beside Pricing / Batch Selector */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCalendarOpen(prev => !prev)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0A4C83] to-[#3DB3E4] hover:brightness-110 text-white font-dm font-bold text-[11px] uppercase tracking-wider shadow-sm transition-all cursor-pointer active:scale-95 group"
                      title="Open calendar to pick departure date"
                    >
                      <Calendar className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                      <span>{isCalendarOpen ? 'Close ✕' : selectedBatch ? 'Change Date 📅' : 'Calendar 📅'}</span>
                    </button>

                    {/* IN-PLACE FLOATING CALENDAR POPOVER: Opens directly beside the pricing / batch section */}
                    {isCalendarOpen && (
                      <div className="absolute right-0 top-full mt-2 z-50 w-72 sm:w-80 p-4 rounded-3xl bg-[#FEFBF2] border-2 border-[#C59239] shadow-[0_25px_60px_rgba(34,21,8,0.3)] animate-fadeIn select-none">
                        {/* Month Header Navigation */}
                        <div className="flex items-center justify-between mb-3 border-b border-[#C59239]/20 pb-2">
                          <button
                            type="button"
                            onClick={handlePrevMonth}
                            className="w-7 h-7 rounded-full bg-white hover:bg-[#0A4C83] hover:text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer text-[#221508] border border-[#C59239]/30"
                            title="Previous Month"
                          >
                            ‹
                          </button>
                          <span className="font-cormorant font-bold text-base text-[#221508] tracking-wide">
                            {calendarData.monthLabel}
                          </span>
                          <button
                            type="button"
                            onClick={handleNextMonth}
                            className="w-7 h-7 rounded-full bg-white hover:bg-[#0A4C83] hover:text-white flex items-center justify-center font-bold text-xs transition-colors cursor-pointer text-[#221508] border border-[#C59239]/30"
                            title="Next Month"
                          >
                            ›
                          </button>
                        </div>

                        {/* Weekday Labels */}
                        <div className="grid grid-cols-7 gap-1 text-center mb-1 text-[10px] font-bold text-[#3D2619]/70 uppercase">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d, i) => (
                            <div key={i} className="py-1">{d}</div>
                          ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center">
                          {Array.from({ length: calendarData.firstDay }).map((_, i) => (
                            <div key={`blank-${i}`} />
                          ))}

                          {calendarData.days.map((item) => {
                            const isSelected = selectedBatch === item.dateString;
                            return (
                              <button
                                key={item.dayNumber}
                                type="button"
                                disabled={item.isPast}
                                onClick={() => handleSelectCalendarDay(item.dateString)}
                                className={`py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                  item.isPast
                                    ? 'text-[#C59239]/30 cursor-not-allowed opacity-35'
                                    : isSelected
                                    ? 'bg-[#0A4C83] text-white font-bold shadow-xs scale-105'
                                    : 'text-[#221508] hover:bg-[#0A4C83] hover:text-white hover:scale-105 active:scale-95'
                                }`}
                              >
                                {item.dayNumber}
                              </button>
                            );
                          })}
                        </div>

                        {/* Auspicious Muhurat Footer Note */}
                        <div className="mt-3 pt-2.5 border-t border-[#C59239]/20 flex items-center justify-between text-[10px] text-[#3D2619]/80">
                          <span className="flex items-center gap-1 text-[#0A4C83] font-bold">
                            <span>✦</span>
                            <span>Shubh Muhurat Calendar</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsCalendarOpen(false)}
                            className="text-xs font-bold text-[#98555E] hover:underline cursor-pointer"
                          >
                            Close ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Single layout displaying the chosen date when selected */}
                {selectedBatch ? (
                  <div className="p-3.5 rounded-2xl bg-[#FEFBF2] border-2 border-[#C59239]/60 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A4C83] to-[#123E67] text-white flex items-center justify-center shadow-xs">
                        <Calendar className="w-5 h-5 text-[#E4B968]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#0A4C83] uppercase tracking-wider block">
                          Sacred Departure Date
                        </span>
                        <span className="font-dm font-bold text-sm text-[#221508]">
                          {selectedBatch}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-[#1B3828]/15 text-[#1B3828] text-[10px] font-bold uppercase tracking-wider">
                        ✓ Selected
                      </span>
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(true)}
                        className="text-xs font-bold text-[#0A4C83] hover:text-[#FE7613] hover:underline cursor-pointer ml-1"
                      >
                        Change Date 📅
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(true)}
                    className="w-full p-4 rounded-2xl bg-white hover:bg-[#FEFBF2] border-2 border-dashed border-[#C59239]/40 hover:border-[#0A4C83] text-[#0A4C83] flex items-center justify-between transition-all cursor-pointer shadow-xs group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0A4C83]/10 group-hover:bg-[#0A4C83] group-hover:text-white text-[#0A4C83] flex items-center justify-center transition-colors">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="font-dm font-bold text-xs uppercase tracking-wider text-[#221508] block">
                          Select Departure Muhurat
                        </span>
                        <span className="text-[11px] text-[#3D2619]/70">
                          Click to select your sacred journey date
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-[#0A4C83] text-white shadow-xs group-hover:brightness-110">
                      Open Calendar 📅
                    </span>
                  </button>
                )}
              </div>

              {/* Pilgrim Count Counter */}
              <div className="mb-6 flex items-center justify-between p-3.5 rounded-2xl bg-white border border-[#C59239]/25 shadow-xs">
                <div>
                  <span className="block text-xs font-bold text-[#221508]">Number of Sadhakas / Pilgrims</span>
                  <span className="text-[11px] text-[#3D2619]/70">Includes AC stay, prasadam & VIP passes</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPilgrimCount(Math.max(1, pilgrimCount - 1))}
                    className="w-8 h-8 rounded-lg bg-[#FEFBF2] border border-[#C59239]/30 flex items-center justify-center font-bold text-base hover:bg-stone-50 active:scale-95 cursor-pointer shadow-2xs text-[#221508]"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm w-4 text-center text-[#221508]">{pilgrimCount}</span>
                  <button
                    type="button"
                    onClick={() => setPilgrimCount(pilgrimCount + 1)}
                    className="w-8 h-8 rounded-lg bg-[#FEFBF2] border border-[#C59239]/30 flex items-center justify-center font-bold text-base hover:bg-stone-50 active:scale-95 cursor-pointer shadow-2xs text-[#221508]"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Calculation & Action Buttons */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center justify-between text-xs text-[#3D2619]/80 pb-1">
                  <span className="font-medium">Estimated Total Dakshina ({pilgrimCount} Devotees):</span>
                  <span className="font-bold text-base text-[#98555E]">₹{totalCalculated.toLocaleString()}</span>
                </div>

                {/* Primary Radiant Fire Orange Shopify Direct Booking CTA */}
                <button
                  type="button"
                  onClick={handleOpenBookingModal}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FE7613] via-[#FE8D3B] to-[#FE7613] hover:brightness-105 text-white font-dm text-xs font-bold uppercase tracking-wider transition-all shadow-[0_10px_25px_rgba(254,118,19,0.35)] hover:shadow-[0_14px_35px_rgba(254,118,19,0.5)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Book Sacred Yatra Passage (Shopify)</span>
                </button>

                {/* Secondary WhatsApp Enquiry Button: Mountain Green */}
                <a
                  href={`https://wa.me/?text=Namaste,%20I%20would%20like%20to%20enquire%20about%20the%20${encodeURIComponent(yatra.title)}%20(${yatra.durationDays}D/${yatra.durationNights}N)%20departing%20on%20${encodeURIComponent(selectedBatch || 'Upcoming Sacred Muhurat')}%20for%20${pilgrimCount}%20seekers.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-[#1B3828] to-[#254F38] hover:brightness-110 text-[#C0C7A9] hover:text-white border border-[#607427] font-dm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C0C7A9]" />
                  <span>Speak with Yatra Acharya (WhatsApp)</span>
                </a>
              </div>
            </div>



          </div>

        </div>

        {/* ======================================================== */}
        {/* 4. DEEP DIVE TABS: ITINERARY, PRIVILEGES, SIGNIFICANCE   */}
        {/* ======================================================== */}
        <section className="mt-14 bg-[#FEFBF2] rounded-3xl border-2 border-[#C59239]/30 p-6 sm:p-10 shadow-md">
          
          {/* Tab Navigation Pill Bar */}
          <div className="flex flex-wrap items-center gap-2.5 border-b border-[#C59239]/20 pb-4 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('itinerary')}
              className={`px-5 py-2.5 rounded-full text-xs font-dm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'bg-[#0A4C83] text-white border border-[#3DB3E4] shadow-md scale-102'
                  : 'bg-white hover:bg-[#FEFBF2] text-[#3D2619] border border-[#C59239]/30'
              }`}
            >
              Day-By-Day Sacred Itinerary ({yatra.itinerary?.length || yatra.durationDays} Days)
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('privileges')}
              className={`px-5 py-2.5 rounded-full text-xs font-dm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'privileges'
                  ? 'bg-[#0A4C83] text-white border border-[#3DB3E4] shadow-md scale-102'
                  : 'bg-white hover:bg-[#FEFBF2] text-[#3D2619] border border-[#C59239]/30'
              }`}
            >
              Inclusions & Privileges
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('significance')}
              className={`px-5 py-2.5 rounded-full text-xs font-dm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'significance'
                  ? 'bg-[#0A4C83] text-white border border-[#3DB3E4] shadow-md scale-102'
                  : 'bg-white hover:bg-[#FEFBF2] text-[#3D2619] border border-[#C59239]/30'
              }`}
            >
              Vedic Significance & Sanctum Lore
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('guidelines')}
              className={`px-5 py-2.5 rounded-full text-xs font-dm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'guidelines'
                  ? 'bg-[#0A4C83] text-white border border-[#3DB3E4] shadow-md scale-102'
                  : 'bg-white hover:bg-[#FEFBF2] text-[#3D2619] border border-[#C59239]/30'
              }`}
            >
              Seeker Guidelines & Packing
            </button>
          </div>

          {/* TAB 1: FULL DAY-BY-DAY ITINERARY TIMELINE */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4 max-w-4xl">
              <div className="mb-6">
                <span className="text-[11px] font-dm font-bold uppercase tracking-widest text-[#0A4C83] block mb-1">
                  ॥ क्रमबद्ध साधना यात्रा ॥
                </span>
                <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#221508]">
                  Chronicle of Sacred Transformation
                </h3>
                <p className="text-xs sm:text-sm text-[#3D2619]/80 mt-1">
                  Step-by-step sacred muhurat schedule designed with zero fatigue, reserved VIP sanctum intervals, and restful heritage stays.
                </p>
              </div>

              {yatra.itinerary && yatra.itinerary.length > 0 ? (
                yatra.itinerary.map((plan, planIdx) => {
                  const isExpanded = expandedDay === plan.day;
                  const colorScheme = dayBadgeStyles[planIdx % dayBadgeStyles.length];

                  return (
                    <div
                      key={plan.day}
                      className={`rounded-2xl border-2 transition-all overflow-hidden ${
                        isExpanded ? 'border-[#0A4C83] bg-white shadow-md' : 'border-[#C59239]/25 bg-white/70 hover:bg-white'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedDay(isExpanded ? null : plan.day)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <span className={`w-11 h-11 rounded-xl ${colorScheme.bg} ${colorScheme.text} border ${colorScheme.border} font-cormorant font-bold text-xl flex items-center justify-center shrink-0 shadow-xs`}>
                            0{plan.day}
                          </span>
                          <div>
                            <span className="text-[10px] font-dm uppercase tracking-wider font-bold text-[#0A4C83] block">
                              Day {plan.day} Sacred Protocol
                            </span>
                            <h4 className="font-cormorant font-bold text-lg sm:text-xl text-[#221508] leading-tight">
                              {plan.title}
                            </h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {plan.stay && (
                            <span className="hidden sm:inline-block text-xs font-medium text-[#3D2619] bg-[#FEFBF2] px-3 py-1 rounded-full border border-[#C59239]/30">
                              Stay: {plan.stay}
                            </span>
                          )}
                          <ChevronDown className={`w-4 h-4 text-[#0A4C83] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-5 pb-5 pt-1 border-t border-[#C59239]/20 bg-[#FEFBF2]">
                          <p className="text-xs sm:text-sm text-[#3D2619] leading-relaxed mt-2 whitespace-pre-line">
                            {plan.description}
                          </p>

                          {plan.stay && (
                            <div className="mt-4 pt-3 border-t border-[#C59239]/20 flex items-center gap-2 text-xs text-[#3D2619]/80">
                              <MapPin className="w-3.5 h-3.5 text-[#0A4C83]" />
                              <span>Overnight Accommodation: <strong className="text-[#221508]">{plan.stay}</strong></span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="p-6 rounded-2xl bg-white border border-[#C59239]/20 text-xs text-[#3D2619]/70">
                  Full day-by-day customized schedule available upon sacred registration.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INCLUSIONS & PRIVILEGES */}
          {activeTab === 'privileges' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <span className="text-[11px] font-dm font-bold uppercase tracking-widest text-[#0A4C83] block mb-1">
                  ॥ दिव्य सौविध्यम् ॥
                </span>
                <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#221508]">
                  Included Sanctuary Inclusions
                </h3>
                <p className="text-xs sm:text-sm text-[#3D2619]/80 mt-1">
                  Everything you need for an unhindered spiritual immersion from arrival to departure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {yatra.inclusions && yatra.inclusions.length > 0 ? (
                  yatra.inclusions.map((inc, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-[#C59239]/25 hover:border-[#0A4C83] transition-all flex items-start gap-3 shadow-2xs">
                      <div className="w-7 h-7 rounded-full bg-[#1b341d] text-[#C0C7A9] flex items-center justify-center shrink-0 mt-0.5 border border-[#607427]">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#221508] font-semibold leading-relaxed">
                        {inc}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-xs text-[#3D2619]/60">
                    VIP Darshan, all meals, deluxe transfers and priest guide included.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SIGNIFICANCE & TEMPLE LORE */}
          {activeTab === 'significance' && (
            <div className="space-y-4 max-w-3xl leading-relaxed text-xs sm:text-sm text-[#3D2619]/85">
              <span className="text-[11px] font-dm font-bold uppercase tracking-widest text-[#0A4C83] block mb-1">
                ॥ पौराणिक महत्त्वम् ॥
              </span>
              <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#221508]">
                Vedic Sanctum Legacy & Deity Abode
              </h3>
              <p>
                Every sacred geographic point on this pilgrimage has been venerated since the Treta and Dvapara yugas. According to the Skanda Purana and Shiva Maha Purana, performing circumambulation (Pradakshina) and taking holy snan in these consecrated thirthas incinerates accumulated karmic burdens and elevates seeker consciousness.
              </p>
              <p>
                Our guides elucidate the deeper metaphysical meaning behind every temple mandapa, the architectural Vastu alignment of the Garbhagriha, and the exact Sanskrit mantras chanted during archana.
              </p>

              {yatra.highlights && yatra.highlights.length > 0 && (
                <div className="mt-6 p-5 rounded-2xl bg-white/80 border-2 border-[#C59239]/30">
                  <span className="block font-bold text-xs uppercase tracking-wider text-[#98555E] mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FE7613]" />
                    <span>Featured Spiritual Milestones:</span>
                  </span>
                  <div className="space-y-2">
                    {yatra.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#0A4C83] shrink-0" />
                        <span className="text-xs text-[#221508] font-semibold">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: GUIDELINES & PROTOCOL */}
          {activeTab === 'guidelines' && (
            <div className="space-y-4 max-w-3xl text-xs sm:text-sm text-[#3D2619]/85">
              <span className="text-[11px] font-dm font-bold uppercase tracking-widest text-[#0A4C83] block mb-1">
                ॥ मर्यादा एवं सङ्कल्प ॥
              </span>
              <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#221508]">
                Devotional Etiquette & Packing Essentials
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white border border-[#C59239]/25">
                  <strong className="block text-xs font-bold text-[#98555E] mb-1">Traditional Devotional Attire:</strong>
                  <span>Men: Traditional Dhoti-Kurta or clean Kurta-Pajama. Women: Saree or traditional Salwar Kameez. Avoid western casuals inside sanctum sanctorums.</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#C59239]/25">
                  <strong className="block text-xs font-bold text-[#98555E] mb-1">Sanctum Photography & Electronic Devices:</strong>
                  <span>Mobile phones and cameras are strictly deposited in secure temple lockers before entering the Garbhagriha to maintain undisturbed devotional contemplation.</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#C59239]/25">
                  <strong className="block text-xs font-bold text-[#98555E] mb-1">Health & Mountain Readiness:</strong>
                  <span>For high Himalayan stops, warm thermal innerwear and comfortable walking footwear are provided. Dedicated medical officers travel alongside our batches.</span>
                </div>
              </div>
            </div>
          )}

        </section>



        {/* ======================================================== */}
        {/* 6. RELATED SACRED EXPEDITIONS                            */}
        {/* ======================================================== */}
        {relatedYatras.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-dm font-bold text-[#0A4C83] uppercase tracking-wider block">
                  ॥ अन्य तीर्थानि ॥ RELATED PILGRIMAGE EXPEDITIONS
                </span>
                <h3 className="font-cormorant font-bold text-2xl sm:text-3xl text-[#221508]">
                  Explore Other Sacred Sanctums
                </h3>
              </div>

              <button
                type="button"
                onClick={onBackToYatras}
                className="text-xs font-bold text-[#0A4C83] hover:text-[#FE7613] flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>View All Expeditions</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedYatras.map((rel) => {
                const relPrice = typeof rel.price === 'number' ? rel.price : rel.pricePerPerson || 22500;
                return (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedYatra(rel)}
                    className="group bg-white rounded-2xl border-2 border-[#C59239]/25 hover:border-[#0A4C83] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone-900">
                      <img 
                        src={rel.image} 
                        alt={rel.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#0A4C83]/90 text-white text-[10px] font-bold uppercase backdrop-blur-md border border-[#3DB3E4]/30 shadow-xs">
                        {rel.durationDays}D / {rel.durationNights}N
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FEFBF2]">
                      <div>
                        <span className="text-[10px] font-bold text-[#0A4C83] uppercase tracking-wider block mb-1 capitalize">
                          {rel.circuit} Circuit
                        </span>
                        <h4 className="font-cormorant font-bold text-xl text-[#221508] group-hover:text-[#0A4C83] transition-colors line-clamp-1">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-[#3D2619]/80 mt-1 line-clamp-2">
                          {rel.subtitle}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#C59239]/20 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-[#3D2619]/70 block font-medium">Dakshina</span>
                          <span className="font-bold text-sm text-[#98555E]">₹{relPrice.toLocaleString()}</span>
                        </div>

                        <span className="text-xs font-bold text-[#0A4C83] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          <span>View Detail</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </main>

      {/* ======================================================== */}
      {/* 7. SHOPIFY BOOKING DETAILS MODAL                         */}
      {/* ======================================================== */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#221508]/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div 
            className="relative w-full max-w-xl bg-[#FEFBF2] border-2 border-[#C59239]/50 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(34,21,8,0.35)] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#221508]/5 border border-[#C59239]/40 text-[#221508] hover:text-[#FE7613] hover:border-[#FE7613] flex items-center justify-center transition-all cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-5 pr-8">
              <span className="px-3 py-1 rounded-full bg-[#FE7613]/15 border border-[#FE7613]/30 text-[#FE7613] text-[11px] font-dm font-bold tracking-wide uppercase inline-flex items-center gap-1.5 mb-2 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Shopify Sacred Checkout</span>
              </span>
              <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#221508]">
                {yatra.title}
              </h3>
              <p className="font-dm text-xs text-[#3D2619]/75 mt-1">
                Please provide primary traveler details. Your selected departure date and contact info will be securely passed directly into your Shopify order.
              </p>
            </div>

            {/* Selected Booking Summary Pill */}
            <div className="p-3.5 rounded-2xl bg-[#0A4C83]/5 border border-[#0A4C83]/20 mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#0A4C83]" />
                <span className="font-semibold text-[#0A4C83]">Departure:</span>
                <span className="font-bold text-[#221508]">{selectedBatch}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#0A4C83]" />
                <span className="font-semibold text-[#0A4C83]">Pilgrims:</span>
                <span className="font-bold text-[#221508]">{pilgrimCount} Devotee(s)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#0A4C83]">Total:</span>
                <span className="font-bold text-sm text-[#98555E]">₹{totalCalculated.toLocaleString()}</span>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleConfirmShopifyBooking} className="space-y-4">
              <div>
                <label className="block text-xs font-dm text-[#3D2619] font-bold mb-1">
                  Full Name of Lead Pilgrim *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#3D2619]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    placeholder="e.g. Ramesh Chandra Sharma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-sm text-[#221508] outline-none font-dm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-dm text-[#3D2619] font-bold mb-1">
                    WhatsApp / Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#3D2619]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-sm text-[#221508] outline-none font-dm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-dm text-[#3D2619] font-bold mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#3D2619]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-sm text-[#221508] outline-none font-dm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-dm text-[#3D2619] font-medium mb-1">
                  Special Inquiries / Senior Care / Helicopter Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={bookingForm.specialRequests}
                  onChange={(e) => setBookingForm({ ...bookingForm, specialRequests: e.target.value })}
                  placeholder="e.g. Vegetarian food preference, ground floor room request, senior citizen wheelchair token."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#C59239]/30 focus:border-[#0A4C83] text-xs text-[#221508] outline-none font-dm resize-none"
                />
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#C59239]/25">
                <div className="text-left">
                  <span className="text-[10px] text-[#3D2619]/70 font-dm block">Final Sacred Checkout</span>
                  <span className="font-cormorant text-2xl font-bold text-[#FE7613]">
                    ₹{totalCalculated.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingBooking}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FE7613] via-[#FE8D3B] to-[#FE7613] hover:brightness-105 text-white font-dm font-bold text-xs uppercase tracking-wider shadow-md shadow-[#FE7613]/25 cursor-pointer transition-all active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmittingBooking ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Shopify Order...</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Proceed to Shopify Checkout</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 8. GLOBAL LUXURY FOOTER                                  */}
      {/* ======================================================== */}
      <Footer onNavigateAccount={onOpenAccount} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#221508] border border-[#C59239] text-[#E4B968] px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-bounce">
          <span className="text-[#FE7613]">✦</span>
          <span className="font-dm text-xs sm:text-sm font-bold tracking-wide">
            {toastMessage}
          </span>
        </div>
      )}

    </div>
  );
};
