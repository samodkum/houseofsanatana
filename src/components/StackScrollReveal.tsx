import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Sparkles, CheckCircle2, ArrowRight, Grid3X3, PackageOpen } from 'lucide-react';
import { PoojaKit } from '../types/homepage';
import { DividerOrnamental, LotusLineArt } from './ui/SacredPatterns';

export interface ProductStackCardItem {
  id: string;
  number: string;
  category: string;
  consecrationLocation: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  bgColor: string;
  images: string[];
  poojaKitData: PoojaKit;
}

export const DEFAULT_PRODUCT_CARDS: ProductStackCardItem[] = [
  {
    id: 'nitya-daily-kit',
    number: '01',
    category: 'DAILY DEVALAYA',
    consecrationLocation: 'Kashi Vishwanath Corridor',
    title: 'Nitya Sampoorna Pooja Box',
    subtitle: 'Complete set for daily morning & evening puja rituals',
    description:
      'Handcrafted bell metal diya, 100% pure Bhimseni camphor, organic sandalwood paste, and Gomukhi Gangajal in a brass-embossed presentation chest.',
    highlights: ['Pure Brass Akhand Diya', '100% Bhimseni Camphor', 'Gomukhi Gangajal (200ml)'],
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 428,
    bgColor: '#C7833D',
    images: [
      'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=900&q=80',
    ],
    poojaKitData: {
      id: 'nitya-daily-kit',
      title: 'Nitya Sampoorna Pooja Box',
      subtitle: 'Everything needed for your daily morning & evening puja rituals',
      category: 'daily',
      price: 1499,
      originalPrice: 1999,
      rating: 4.9,
      reviewsCount: 428,
      image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
      badge: 'Bestseller',
      consecratedAt: 'Kashi Vishwanath Corridor',
      shortDesc: 'Handcrafted bell metal diya, 100% pure Bhimseni camphor, organic sandalwood paste, and Gomukhi Gangajal.',
      idealFor: 'Daily Home Devalaya & Daily Nitya Archana',
      weightGrams: 1450,
      itemsIncluded: [
        { name: 'Pure Brass Akhand Diya', significance: 'Dispels ignorance and invites Sri Mahalakshmi', origin: 'Moradabad Master Foundry' },
        { name: 'Bhimseni Pure Camphor', significance: 'Leaves zero residue; purifies prana and home aura', origin: 'Himalayan Pine Resins' },
        { name: 'Gomukh Gangajal Flask', significance: 'Pavitra snan sanctification', origin: 'Gomukh Glacier' },
      ],
    },
  },
  {
    id: 'lakshmi-ganesh-anushthan',
    number: '02',
    category: 'FESTIVAL & WEALTH',
    consecrationLocation: 'Kanchi Kamakoti Peetham',
    title: 'Maha Lakshmi Anushthan Chest',
    subtitle: 'Ceremonial set for Diwali, Dhanteras & Friday Srividya rituals',
    description:
      'Assembled in consultation with traditional temple priests. Includes consecrated silver coin, 3D Meru Sri Yantra, and 21 rare Vedic dravyas.',
    highlights: ['999 Pure Silver Coin (10g)', 'Gold-Plated Sri Yantra (3D Meru)', '21 Gomti Chakras & Cowries'],
    price: 3999,
    originalPrice: 4999,
    rating: 5.0,
    reviewsCount: 312,
    bgColor: '#B08A4A',
    images: [
      'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610737242371-5527fefca3ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583088580009-2d947c3e90a6?auto=format&fit=crop&w=900&q=80',
    ],
    poojaKitData: {
      id: 'lakshmi-ganesh-anushthan',
      title: 'Maha Lakshmi Anushthan Chest',
      subtitle: 'Opulent ceremonial set for Diwali, Dhanteras & Friday Srividya rituals',
      category: 'festival',
      price: 3999,
      originalPrice: 4999,
      rating: 5.0,
      reviewsCount: 312,
      image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=800&q=80',
      badge: 'Limited Edition',
      consecratedAt: 'Kanchi Kamakoti Peetham',
      shortDesc: 'Includes consecrated silver coin, brass Sri Yantra, and 21 rare Vedic dravyas.',
      idealFor: 'Diwali, Dhanteras, Varalakshmi Vratam & Griha Laxmi Invocation',
      weightGrams: 2800,
      itemsIncluded: [
        { name: 'Gold-Plated Brass Sri Yantra', significance: 'Radiates cosmic frequencies', origin: 'Consecrated at Kanchi' },
        { name: '999 Pure Silver Coin', significance: 'Permanent Lakshmi Sannidhi token', origin: 'Assayed Mint' },
        { name: '21 Natural Gomti Chakras', significance: 'Attracts prosperity and abundance', origin: 'Dwarka Sea Shore' },
      ],
    },
  },
  {
    id: 'vastu-griha-havan',
    number: '03',
    category: 'HAVAN & PURIFICATION',
    consecrationLocation: 'Haridwar Saptarishi Ashram',
    title: 'Vastu Shanti & Griha Havan Box',
    subtitle: 'Vedic fire ritual samagri with solid copper pyramid Havan Kund',
    description:
      'Eliminates directional doshas and purifies living spaces with 108 authentic Vedic medicinal herbs, solid copper kund, and pure Gir Cow A2 Ghee.',
    highlights: ['Solid Copper Kund (8x8 inch)', '108 Medicinal Herb Samagri', 'A2 Vedic Gir Cow Ghee (500ml)'],
    price: 2799,
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 184,
    bgColor: '#66705A',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
    ],
    poojaKitData: {
      id: 'vastu-griha-havan',
      title: 'Vastu Shanti & Griha Pravesh Havan Box',
      subtitle: 'Complete Vedic fire ritual samagri with solid copper Havan Kund',
      category: 'havan',
      price: 2799,
      originalPrice: 3499,
      rating: 4.8,
      reviewsCount: 184,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      badge: 'Priest Approved',
      consecratedAt: 'Haridwar Saptarishi Ashram',
      shortDesc: 'Eliminates directional doshas and cleanses new residential or commercial spaces with authentic 108 Vedic medicinal herbs.',
      idealFor: 'Housewarming, Office Inaugurations & Vastu Dosha Shanti',
      weightGrams: 3600,
      itemsIncluded: [
        { name: 'Solid Copper Havan Kund', significance: 'Optimized pyramid geometry for agni retention', origin: 'Traditional Copper Guild' },
        { name: '108 Medicinal Herb Samagri', significance: 'Air-purifying aromatic botanicals', origin: 'Himalayan Foothills' },
        { name: 'A2 Gir Cow Ghee', significance: 'Pure ahuti offering pleasing to Agni Deva', origin: 'Vrindavan Gaushala' },
      ],
    },
  },
  {
    id: 'rudraksha-dhyana-kit',
    number: '04',
    category: 'MEDITATION & DHYANA',
    consecrationLocation: 'Pashupatinath Temple, Nepal',
    title: 'Kailash Siddha Rudraksha Set',
    subtitle: 'Certified 5-Mukhi Nepali Japa Mala, Gomukhi Bag & Copper Patra',
    description:
      'Authentic 108+1 bead Nepali Rudraksha mala with laboratory X-ray authenticity certificate. Energized through traditional Shiva Sahasranama chanting.',
    highlights: ['108+1 Nepali 5-Mukhi Mala', 'Lab X-Ray Authenticity Card', 'Silk Gomukhi Japa Bag & Patra'],
    price: 2199,
    originalPrice: 2899,
    rating: 4.9,
    reviewsCount: 560,
    bgColor: '#8F6E5B',
    images: [
      'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    ],
    poojaKitData: {
      id: 'rudraksha-dhyana-kit',
      title: 'Kailash Siddha Rudraksha & Dhyana Set',
      subtitle: 'Certified 5-Mukhi Nepali Japa Mala, Gomukhi Bag & Copper Jalpatra',
      category: 'meditation',
      price: 2199,
      originalPrice: 2899,
      rating: 4.9,
      reviewsCount: 560,
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
      badge: 'Lab Certified',
      consecratedAt: 'Pashupatinath Temple, Nepal',
      shortDesc: 'Authentic 108+1 bead Nepali Rudraksha mala with laboratory X-ray certificate.',
      idealFor: 'Daily Mantra Japa, Meditation & Spiritual Grounding',
      weightGrams: 850,
      itemsIncluded: [
        { name: '108+1 Nepali Rudraksha Mala', significance: 'Shields negative energy and calms blood pressure', origin: 'Sankhuwasabha, Nepal' },
        { name: 'Silk Gomukhi Japa Bag', significance: 'Protects the mala during japa', origin: 'Varanasi' },
        { name: 'Hand-hammered Copper Tumbler', significance: 'Stores ionized water overnight', origin: 'Pune Silversmiths' },
      ],
    },
  },
];

interface StackScrollRevealProps {
  cards?: ProductStackCardItem[];
  title?: string;
  subtitle?: string;
  onAddToCart?: (kit: PoojaKit) => void;
  onViewAll?: () => void;
}

interface ProductCardProps {
  card: ProductStackCardItem;
  idx: number;
  transform: {
    y: any;
    scale: any;
    opacity: any;
    zIndex: number;
    pointerEvents?: any;
  };
  onAddToCart?: (kit: PoojaKit) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ card, transform, onAddToCart }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const images = card.images && card.images.length > 0 ? card.images : [card.poojaKitData.image];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const discountPercent = Math.round(((card.originalPrice - card.price) / card.originalPrice) * 100);

  return (
    <motion.div
      style={{
        y: transform.y,
        scale: transform.scale,
        opacity: transform.opacity,
        zIndex: transform.zIndex,
        pointerEvents: transform.pointerEvents,
        transformOrigin: 'top center',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
      className="absolute inset-x-0 bottom-0 top-[38px] select-none transform-gpu"
    >
      {/* 1. TOP FOLDER TAB (Matching reference image tab shape) */}
      <div className="absolute -top-[36px] sm:-top-[40px] left-0 flex items-end pointer-events-auto z-20">
        <div
          style={{ backgroundColor: card.bgColor }}
          className="h-[37px] sm:h-[41px] px-5 sm:px-8 rounded-t-[16px] sm:rounded-t-[20px] flex items-center gap-2 border-t border-l border-white/20 shadow-[-3px_-4px_10px_rgba(0,0,0,0.12)]"
        >
          <span className="font-dm text-xs sm:text-[13px] font-bold text-amber-200 tracking-wider">
            Project {card.number}
          </span>
          <span className="text-white/40 text-xs hidden sm:inline">&bull;</span>
          <span className="font-dm text-[10px] sm:text-[11px] font-semibold text-white/70 uppercase tracking-widest hidden sm:inline">
            {card.category}
          </span>
        </div>

        {/* Smooth Concave Fillet connecting Tab Right Edge to Card Top Line */}
        <div className="relative w-[20px] h-[20px] -ml-[0.5px] pointer-events-none">
          <svg className="w-[20px] h-[20px]" viewBox="0 0 20 20" fill="none">
            <path
              d="M 0 0 C 0 11.0457 8.9543 20 20 20 L 0 20 Z"
              fill={card.bgColor}
            />
            <path
              d="M 0 0 C 0 11.0457 8.9543 20 20 20"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* 2. MAIN CARD BODY */}
      <div
        style={{ backgroundColor: card.bgColor }}
        className="relative w-full h-full rounded-b-[24px] sm:rounded-b-[32px] rounded-tr-[24px] sm:rounded-tr-[32px] rounded-tl-none overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/20 flex flex-col md:flex-row justify-between items-stretch"
      >
        {/* Soft contrast scrim for lighter pastel card shades */}
        {(card.bgColor === '#D9C6A8' || card.bgColor === '#F7F1E5') && (
          <div className="absolute inset-0 bg-black/25 pointer-events-none z-0" />
        )}

        {/* Left Side: Product Details, Consecration & Pricing */}
        <div className="w-full md:w-[56%] p-5 sm:p-7 md:p-8 flex flex-col justify-between text-white z-10 overflow-y-auto custom-scrollbar">
          <div>
            {/* Product Title First (editorial layout as in reference) */}
            <h3 className="font-cormorant text-xl sm:text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-white mb-2.5 drop-shadow-sm">
              {card.title}
            </h3>

            {/* Pill Tags (Hidden on mobile < sm, visible on desktop) */}
            <div className="hidden sm:flex items-center gap-2 mb-3 flex-wrap">
              <span className="font-dm text-[10px] sm:text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-amber-200">
                {card.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-black/30 border border-white/15 text-stone-200">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>{card.consecrationLocation}</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{card.rating}</span>
                <span className="text-white/60 text-[9px]">({card.reviewsCount})</span>
              </span>
            </div>

            {/* Description */}
            <p className="font-dm text-xs sm:text-[13px] text-white/85 leading-relaxed font-normal mb-3 line-clamp-2 sm:line-clamp-3">
              {card.description}
            </p>

          {/* Key Included Highlights */}
          <div className="space-y-1.5 mb-3 sm:mb-4">
            {card.highlights.map((item, hIdx) => (
              <div key={hIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-white/90 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pricing & Add to Cart Bar */}
        <div className="pt-3 sm:pt-4 border-t border-white/15 flex items-center justify-between gap-3 mt-auto flex-wrap">
          {/* Price Block */}
          <div className="flex items-baseline gap-2">
            <span className="font-dm text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              ₹{card.price.toLocaleString('en-IN')}
            </span>
            <span className="font-dm text-xs sm:text-sm text-white/50 line-through">
              ₹{card.originalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-emerald-500/25 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-400/30">
              {discountPercent}% OFF
            </span>
          </div>

          {/* Action CTA */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) {
                onAddToCart(card.poojaKitData);
              }
            }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-dm font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/40 hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Basket</span>
          </button>
        </div>
      </div>

      {/* Right Side: Interactive Multi-Image Showcase Carousel */}
      <div className="w-full md:w-[44%] p-3 sm:p-5 md:p-6 flex items-center justify-center z-10">
        <div className="relative w-full h-[190px] sm:h-[240px] md:h-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black/30 group">
          
          {/* Animated Image with Crossfade */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIdx}
              src={images[currentImageIdx]}
              alt={`${card.title} - View ${currentImageIdx + 1}`}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Soft inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Top Image Counter Pill */}
          <div className="absolute top-2.5 right-2.5 z-20 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold text-white tracking-wider">
            {currentImageIdx + 1} / {images.length}
          </div>

          {/* Arrow Left Button */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="Previous Image"
              onClick={handlePrevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-90 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Arrow Right Button */}
          {images.length > 1 && (
            <button
              type="button"
              aria-label="Next Image"
              onClick={handleNextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/55 hover:bg-black/85 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-90 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {/* Bottom Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  aria-label={`Jump to image ${dotIdx + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIdx(dotIdx);
                  }}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    dotIdx === currentImageIdx
                      ? 'w-4 h-1.5 bg-amber-400'
                      : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/90'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
  );
};

interface ViewAllCardProps {
  transform: {
    y: any;
    scale: any;
    opacity: any;
    zIndex: number;
    pointerEvents?: any;
  };
  onViewAll?: () => void;
}

const ViewAllCard: React.FC<ViewAllCardProps> = ({ transform, onViewAll }) => {
  const handleExplore = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      const el = document.getElementById('gateways');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      style={{
        y: transform.y,
        scale: transform.scale,
        opacity: transform.opacity,
        zIndex: transform.zIndex,
        pointerEvents: transform.pointerEvents,
        transformOrigin: 'top center',
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
      }}
      className="absolute inset-x-0 bottom-0 top-[38px] select-none transform-gpu"
    >
      {/* 1. TOP FOLDER TAB */}
      <div className="absolute -top-[36px] sm:-top-[40px] left-0 flex items-end pointer-events-auto z-20">
        <div
          style={{ backgroundColor: '#C7833D' }}
          className="h-[37px] sm:h-[41px] px-5 sm:px-8 rounded-t-[16px] sm:rounded-t-[20px] flex items-center gap-2 border-t border-l border-white/20 shadow-[-3px_-4px_10px_rgba(0,0,0,0.15)]"
        >
          <span className="font-dm text-xs sm:text-[13px] font-bold text-amber-200 tracking-wider">
            Project 05 &bull; Sanctum
          </span>
          <span className="text-white/40 text-xs hidden sm:inline">&bull;</span>
          <span className="font-dm text-[10px] sm:text-[11px] font-semibold text-white/70 uppercase tracking-widest hidden sm:inline">
            Santana Mall
          </span>
        </div>

        {/* Concave fillet curve */}
        <div className="relative w-[20px] h-[20px] -ml-[0.5px] pointer-events-none">
          <svg className="w-[20px] h-[20px]" viewBox="0 0 20 20" fill="none">
            <path
              d="M 0 0 C 0 11.0457 8.9543 20 20 20 L 0 20 Z"
              fill="#C7833D"
            />
            <path
              d="M 0 0 C 0 11.0457 8.9543 20 20 20"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* 2. MAIN CARD BODY - BRAND COMPILE EDITORIAL CTA */}
      <div
        className="relative w-full h-full rounded-b-[24px] sm:rounded-b-[32px] rounded-tr-[24px] sm:rounded-tr-[32px] rounded-tl-none overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.45)] border border-white/20 flex flex-col justify-between items-center text-center p-6 sm:p-10 md:p-12 select-none"
        style={{
          backgroundColor: '#C7833D'
        }}
      >
        {/* Sacred Ornamental Watermark Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10 flex items-center justify-center">
          <DividerOrnamental size={520} color="#FFFFFF" />
        </div>

        {/* Top: Serial & Sanctum Category Badges */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="font-dm text-xs sm:text-sm font-bold tracking-widest text-amber-200 uppercase px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md">
            ॥ पूर्ण संग्रह ॥ &bull; ALL 45+ CONSECRATED OFFERINGS
          </span>
        </div>

        {/* Center: Main Editorial CTA Headline & Narrative */}
        <div className="relative z-10 max-w-2xl mx-auto my-auto flex flex-col items-center">
          <h3 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold text-white tracking-tight leading-[1.1] mb-3 sm:mb-4 drop-shadow-md">
            Enter the Living Sanctum of{' '}
            <span className="text-amber-200">
              Santana Mall
            </span>
          </h3>

          <p className="font-dm text-xs sm:text-sm md:text-[15px] text-white/90 leading-relaxed max-w-xl mx-auto mb-6 sm:mb-8 font-normal">
            Explore our complete treasury of lab-certified puja samagri, sacred brass murtis, pure camphor, energized yantras, and festival ceremonial boxes.
          </p>

          {/* Prominent High-Impact CTA Button */}
          <button
            type="button"
            onClick={handleExplore}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-dm font-bold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-amber-950/40 border border-amber-400/30 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer overflow-hidden"
          >
            {/* Shimmer light sweep */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
            
            <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950" />
            <span>Enter Santana Mall</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="relative z-10 pt-4 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs font-dm text-white/90">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>100% Temple Consecrated</span>
          </span>
          <span className="hidden sm:inline text-white/30">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Lab-Tested Agamic Purity</span>
          </span>
          <span className="hidden sm:inline text-white/30">&bull;</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Direct Artisan Guild Patronage</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const StackScrollReveal: React.FC<StackScrollRevealProps> = ({
  cards = DEFAULT_PRODUCT_CARDS,
  title = 'Consecrated Pooja Kits & Sacred Offerings',
  subtitle = 'Authentic ritual samagri, energized instruments, and complete puja boxes curated by traditional temple priests.',
  onAddToCart,
  onViewAll,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generous 500vh scroll track for the 5-card deck sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring physics for buttery-smooth Framer-grade inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 30,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // -------------------------------------------------------------
  // Card 0 (1st Card):
  // Rests on top (y: 0, scale: 1), then slides UP & away during [0.04, 0.20]
  // -------------------------------------------------------------
  const card0Y = useTransform(smoothProgress, [0, 0.04, 0.20], ['0px', '0px', '-135%']);
  const card0Scale = useTransform(smoothProgress, [0, 0.04, 0.20], [1, 1, 0.95]);
  const card0Opacity = useTransform(smoothProgress, [0, 0.04, 0.17, 0.20], [1, 1, 1, 0]);

  // -------------------------------------------------------------
  // Card 1 (2nd Card):
  // Rests underneath at y: 20px, scale: 0.95
  // When Card 0 exits ([0.04, 0.20]), Card 1 rises to y: 0px, scale: 1.0
  // Rests as active top ([0.20, 0.24])
  // Slides UP & away during [0.24, 0.40]
  // -------------------------------------------------------------
  const card1Y = useTransform(
    smoothProgress,
    [0, 0.04, 0.20, 0.24, 0.40],
    ['20px', '20px', '0px', '0px', '-135%']
  );
  const card1Scale = useTransform(
    smoothProgress,
    [0, 0.04, 0.20, 0.24, 0.40],
    [0.95, 0.95, 1, 1, 0.95]
  );
  const card1Opacity = useTransform(smoothProgress, [0, 0.24, 0.37, 0.40], [1, 1, 1, 0]);

  // -------------------------------------------------------------
  // Card 2 (3rd Card):
  // Rests at y: 40px, scale: 0.90
  // Rises to position 1 (y: 20px, scale: 0.95) during [0.04, 0.20]
  // Rises to position 0 (y: 0px, scale: 1.0) during [0.24, 0.40]
  // Rests as active top ([0.40, 0.44])
  // Slides UP & away during [0.44, 0.60]
  // -------------------------------------------------------------
  const card2Y = useTransform(
    smoothProgress,
    [0, 0.04, 0.20, 0.24, 0.40, 0.44, 0.60],
    ['40px', '40px', '20px', '20px', '0px', '0px', '-135%']
  );
  const card2Scale = useTransform(
    smoothProgress,
    [0, 0.04, 0.20, 0.24, 0.40, 0.44, 0.60],
    [0.90, 0.90, 0.95, 0.95, 1, 1, 0.95]
  );
  const card2Opacity = useTransform(smoothProgress, [0, 0.44, 0.57, 0.60], [1, 1, 1, 0]);

  // -------------------------------------------------------------
  // Card 3 (4th Card):
  // Rests at y: 60px, scale: 0.85
  // Rises to position 2 (y: 40px, scale: 0.90) during [0.04, 0.20]
  // Rises to position 1 (y: 20px, scale: 0.95) during [0.24, 0.40]
  // Rises to position 0 (y: 0px, scale: 1.0) during [0.44, 0.60]
  // Rests as active top ([0.60, 0.64])
  // Slides UP & away during [0.64, 0.80]
  // -------------------------------------------------------------
  const card3Y = useTransform(
    smoothProgress,
    [0, 0.04, 0.20, 0.24, 0.40, 0.44, 0.60, 0.64, 0.80],
    ['60px', '60px', '40px', '40px', '20px', '20px', '0px', '0px', '-135%']
  );
  const card3Scale = useTransform(
    smoothProgress,
    [0, 0.04, 0.20, 0.24, 0.40, 0.44, 0.60, 0.64, 0.80],
    [0.85, 0.85, 0.90, 0.90, 0.95, 0.95, 1, 1, 0.95]
  );
  const card3Opacity = useTransform(smoothProgress, [0, 0.64, 0.77, 0.80], [1, 1, 1, 0]);

  // -------------------------------------------------------------
  // Card 4 (5th Card - "View All Kits/Products" Layout):
  // Rests at bottom (y: 80px, scale: 0.80)
  // Rises progressively as cards 0-3 depart, and securely reaches
  // position 0 (y: 0px, scale: 1.0) at 0.80, remaining pinned and
  // fully interactive until scrolling to the next section!
  // -------------------------------------------------------------
  const card4Y = useTransform(
    smoothProgress,
    [0, 0.04, 0.20, 0.24, 0.40, 0.44, 0.60, 0.64, 0.80, 1.0],
    ['80px', '80px', '60px', '60px', '40px', '40px', '20px', '20px', '0px', '0px']
  );
  const card4Scale = useTransform(
    smoothProgress,
    [0, 0.04, 0.20, 0.24, 0.40, 0.44, 0.60, 0.64, 0.80, 1.0],
    [0.80, 0.80, 0.85, 0.85, 0.90, 0.90, 0.95, 0.95, 1, 1]
  );
  const card4Opacity = useTransform(smoothProgress, [0, 0.04, 0.80, 1.0], [1, 1, 1, 1]);

  // Pointer events mapping for seamless interactive responsiveness during forward and reverse scrolling
  const card0PointerEvents = useTransform(smoothProgress, v => (v < 0.18 ? 'auto' : 'none'));
  const card1PointerEvents = useTransform(smoothProgress, v => (v >= 0.16 && v < 0.38 ? 'auto' : 'none'));
  const card2PointerEvents = useTransform(smoothProgress, v => (v >= 0.36 && v < 0.58 ? 'auto' : 'none'));
  const card3PointerEvents = useTransform(smoothProgress, v => (v >= 0.56 && v < 0.78 ? 'auto' : 'none'));
  const card4PointerEvents = useTransform(smoothProgress, v => (v >= 0.75 ? 'auto' : 'none'));

  // Array of transform states
  const cardTransforms = [
    { y: card0Y, scale: card0Scale, opacity: card0Opacity, zIndex: 50, pointerEvents: card0PointerEvents },
    { y: card1Y, scale: card1Scale, opacity: card1Opacity, zIndex: 40, pointerEvents: card1PointerEvents },
    { y: card2Y, scale: card2Scale, opacity: card2Opacity, zIndex: 30, pointerEvents: card2PointerEvents },
    { y: card3Y, scale: card3Scale, opacity: card3Opacity, zIndex: 20, pointerEvents: card3PointerEvents },
    { y: card4Y, scale: card4Scale, opacity: card4Opacity, zIndex: 10, pointerEvents: card4PointerEvents },
  ];

  return (
    <section
      ref={containerRef}
      id="stack-scroll-reveal"
      className="relative w-full h-[500vh] bg-[#F7F1E5] select-none text-[#8F6E5B]"
    >
      {/* Sticky Viewport pinned firmly in place */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
        {/* Subtle Decorative Background Auras */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C7833D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#B08A4A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* SACRED ORNAMENTAL SECTION DIVIDER ON ONE SIDE ONLY (Left side left empty) */}
        <div className="absolute right-0 top-0 bottom-0 w-[calc((100%-896px)/2)] pointer-events-none z-0 hidden lg:flex items-center justify-center px-4 xl:px-8 overflow-hidden">
          <div className="opacity-70 hover:opacity-90 transition-opacity duration-500">
            <DividerOrnamental size={460} color="#705B4C" />
          </div>
        </div>
        


        {/* ======================================================== */}
        {/* CARD STACK STAGE: 4 PRODUCT CARDS + 1 VIEW ALL CARD      */}
        {/* ======================================================== */}
        <div className="relative z-10 w-full max-w-4xl h-[510px] sm:h-[530px] md:h-[550px] flex items-center justify-center mt-2 sm:mt-4">
          {/* Product Cards 01 - 04 */}
          {cards.slice(0, 4).map((card, idx) => {
            const t = cardTransforms[idx];

            return (
              <ProductCard
                key={card.id}
                card={card}
                idx={idx}
                transform={t}
                onAddToCart={onAddToCart}
              />
            );
          })}

          {/* 5th Card: View All Kits & Products Layout */}
          <ViewAllCard
            transform={cardTransforms[4]}
            onViewAll={onViewAll}
          />
        </div>
      </div>
    </section>
  );
};
