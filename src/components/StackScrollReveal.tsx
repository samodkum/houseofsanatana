import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Sparkles, Check, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PoojaKit } from '../types/homepage';

export interface ProductShowcaseCardItem {
  id: string;
  category: string;
  consecrationLocation: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  bgColor: string;
  images: string[];
  badge?: string;
  poojaKitData: PoojaKit;
}

export const SHOWCASE_PRODUCTS: ProductShowcaseCardItem[] = [
  {
    id: 'nitya-daily-kit',
    category: 'DAILY DEVALAYA',
    consecrationLocation: 'Kashi Vishwanath Corridor',
    title: 'Nitya Sampoorna Pooja Box',
    subtitle: 'Complete set for daily morning & evening puja rituals',
    description:
      'Handcrafted bell metal diya, 100% pure Bhimseni camphor, organic sandalwood paste, and Gomukhi Gangajal in a brass-embossed chest.',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 428,
    bgColor: '#98555E', // Ruby Red
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=900&q=80',
    ],
    poojaKitData: {
      id: 'nitya-daily-kit',
      title: 'Nitya Sampoorna Pooja Box',
      subtitle: 'Complete set for daily morning & evening puja rituals',
      category: 'daily',
      price: 1499,
      originalPrice: 1999,
      rating: 4.9,
      reviewsCount: 428,
      image: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
      badge: 'Bestseller',
      consecratedAt: 'Kashi Vishwanath Corridor',
      shortDesc: 'Handcrafted bell metal diya, pure Bhimseni camphor, sandalwood, and Gomukhi Gangajal.',
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
    category: 'FESTIVAL & WEALTH',
    consecrationLocation: 'Kanchi Kamakoti Peetham',
    title: 'Maha Lakshmi Anushthan Chest',
    subtitle: 'Ceremonial set for Diwali, Dhanteras & Friday Srividya rituals',
    description:
      'Assembled with temple priests. Includes consecrated silver coin, 3D Meru Sri Yantra, and 21 rare Vedic dravyas.',
    price: 3999,
    originalPrice: 4999,
    rating: 5.0,
    reviewsCount: 312,
    bgColor: '#C59239', // Temple Gold
    badge: 'Priest Approved',
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
    category: 'HAVAN & PURIFICATION',
    consecrationLocation: 'Haridwar Saptarishi Ashram',
    title: 'Vastu Shanti & Griha Havan Box',
    subtitle: 'Vedic fire ritual samagri with solid copper pyramid Havan Kund',
    description:
      'Eliminates directional doshas and purifies living spaces with 108 authentic Vedic medicinal herbs, solid copper kund, and Gir Cow A2 Ghee.',
    price: 2799,
    originalPrice: 3499,
    rating: 4.8,
    reviewsCount: 184,
    bgColor: '#0A4C83', // Wind Blue
    badge: 'Agamic Certified',
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
      shortDesc: 'Eliminates directional doshas with authentic 108 Vedic medicinal herbs.',
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
    category: 'MEDITATION & DHYANA',
    consecrationLocation: 'Pashupatinath Temple, Nepal',
    title: 'Kailash Siddha Rudraksha Set',
    subtitle: 'Certified 5-Mukhi Nepali Japa Mala, Gomukhi Bag & Copper Patra',
    description:
      'Authentic 108+1 bead Nepali Rudraksha mala with lab X-ray authenticity certificate. Energized through Shiva Sahasranama chanting.',
    price: 2199,
    originalPrice: 2899,
    rating: 4.9,
    reviewsCount: 560,
    bgColor: '#607427', // Mountain Green
    badge: 'Lab Certified',
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
  {
    id: 'shiva-abhishek-set',
    category: 'DAILY DEVALAYA',
    consecrationLocation: 'Trimbakeshwar Jyotirlinga',
    title: 'Maha Rudra Abhishekam Box',
    subtitle: 'Hand-cast Brass Shivalinga, Nandi, Vibhuti & Copper Argha Patra',
    description:
      'Complete sacred set for Shiva Sadhana and daily abhishekam with pure bilva leaf powder, sacred bhasma, and brass snana patra.',
    price: 3299,
    originalPrice: 4299,
    rating: 4.9,
    reviewsCount: 245,
    bgColor: '#FE7613', // Fire Orange
    badge: 'Pure Panchaloha',
    images: [
      'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1610737242371-5527fefca3ea?auto=format&fit=crop&w=900&q=80',
    ],
    poojaKitData: {
      id: 'shiva-abhishek-set',
      title: 'Maha Rudra Abhishekam Box',
      subtitle: 'Complete sacred set for Shiva Sadhana and daily abhishekam',
      category: 'daily',
      price: 3299,
      originalPrice: 4299,
      rating: 4.9,
      reviewsCount: 245,
      image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=800&q=80',
      badge: 'Pure Panchaloha',
      consecratedAt: 'Trimbakeshwar Jyotirlinga',
      shortDesc: 'Hand-cast brass Shivalinga with copper Gomukhi snana patra and sacred vibhuti.',
      idealFor: 'Maha Shivratri, Pradosham & Daily Shiva Puja',
      weightGrams: 2100,
      itemsIncluded: [
        { name: 'Hand-cast Brass Shivalinga & Nandi', significance: 'Sacred energy anchor for daily dhyana', origin: 'Swamimalai Guild' },
        { name: 'Pure Bhasma / Vibhuti (100g)', significance: 'Traditional cow dung ash sanctified with mantras', origin: 'Kashi' },
        { name: 'Copper Gomukhi Argha Patra', significance: 'Even stream of holy water during abhishekam', origin: 'Thanjavur' },
      ],
    },
  },
  {
    id: 'maha-mrityunjaya-box',
    category: 'PROTECTION & HEALING',
    consecrationLocation: 'Mahakaleshwar Ujjain',
    title: 'Maha Mrityunjaya Raksha Box',
    subtitle: 'Energized Kavach Yantra, Silver Bilva Patra & Black Tourmaline',
    description:
      'Consecrated in Ujjain for health, protection, and long life. Includes authentic Bhojpatra Yantra, silver bilva leaf, and Rudraksha bracelet.',
    price: 2499,
    originalPrice: 3199,
    rating: 4.9,
    reviewsCount: 198,
    bgColor: '#742A35', // Red Wine
    badge: 'Ujjain Sanctified',
    images: [
      'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=900&q=80',
    ],
    poojaKitData: {
      id: 'maha-mrityunjaya-box',
      title: 'Maha Mrityunjaya Raksha Box',
      subtitle: 'Consecrated protection box for health, peace, and spiritual shielding',
      category: 'protection',
      price: 2499,
      originalPrice: 3199,
      rating: 4.9,
      reviewsCount: 198,
      image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
      badge: 'Ujjain Sanctified',
      consecratedAt: 'Mahakaleshwar Ujjain',
      shortDesc: 'Consecrated protection box with Bhojpatra Yantra and Rudraksha.',
      idealFor: 'Health Recovery, Protection & Planetary Relief',
      weightGrams: 1100,
      itemsIncluded: [
        { name: 'Copper-Embossed Mrityunjaya Yantra', significance: 'Sacred protective geometry', origin: 'Ujjain Temple Guild' },
        { name: 'Pure Silver Bilva Leaf (5g)', significance: 'Auspicious eternal offering to Mahadeva', origin: 'Assayed Mint' },
        { name: 'Consecrated Rudraksha Raksha Sutra', significance: 'Continuous bio-energetic shielding', origin: 'Kedarnath' },
      ],
    },
  },
];

interface ProductCardItemProps {
  product: ProductShowcaseCardItem;
  onAddToCart?: (kit: PoojaKit) => void;
  onBuyNow?: (kit: PoojaKit) => void;
}

const ProductCardItem: React.FC<ProductCardItemProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const images = product.images && product.images.length >= 3 
    ? product.images.slice(0, 3) 
    : [
        product.poojaKitData.image,
        'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=900&q=80',
      ];

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.poojaKitData);
      setAdded(true);
      setTimeout(() => setAdded(false), 1600);
    }
  };

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product.poojaKitData);
    } else if (onAddToCart) {
      onAddToCart(product.poojaKitData);
    }
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? product.bgColor : 'rgba(231, 229, 228, 0.9)',
        boxShadow: isHovered
          ? `0 20px 42px ${product.bgColor}45`
          : '0 4px 16px rgba(0, 0, 0, 0.05)',
      }}
      className="group relative rounded-[22px] p-3 sm:p-3.5 border transition-all duration-300 ease-out flex flex-col justify-between select-none h-full overflow-hidden bg-white"
    >
      {/* ======================================================== */}
      {/* ANIMATED BRAND COLOR LIQUID CURTAIN / HOVER FILL EFFECT */}
      {/* ======================================================== */}
      <motion.div
        initial={false}
        animate={{
          y: isHovered ? '0%' : '100%',
        }}
        transition={{
          duration: 0.38,
          ease: [0.16, 1, 0.3, 1], // fluid cubic-bezier spring surge
        }}
        style={{ backgroundColor: product.bgColor }}
        className="absolute inset-0 rounded-[22px] pointer-events-none z-0"
      />

      {/* Diagonal Shimmer Gleam on Hover */}
      <motion.div
        initial={false}
        animate={{
          x: isHovered ? '250%' : '-120%',
          opacity: isHovered ? 0.35 : 0,
        }}
        transition={{
          duration: 0.65,
          ease: 'easeOut',
        }}
        className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-22deg] pointer-events-none z-[1]"
      />

      {/* ======================================================== */}
      {/* CARD CONTENT LAYER (Z-10 ON TOP OF ANIMATED FILL)       */}
      {/* ======================================================== */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* ======================================================== */}
          {/* 1. TOP HERO IMAGE (COMPACT SCALED)                       */}
          {/* ======================================================== */}
          <div className="relative w-full h-40 sm:h-44 md:h-48 rounded-[16px] overflow-hidden bg-stone-100 shadow-inner">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImgIndex}
                src={images[selectedImgIndex]}
                alt={product.title}
                initial={{ opacity: 0.85, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.85 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            </AnimatePresence>

            {/* Top Left Badge */}
            {product.badge && (
              <div className="absolute top-2.5 left-2.5 z-10">
                <span
                  style={{
                    backgroundColor: isHovered ? '#FFFFFF' : product.bgColor,
                    color: isHovered ? product.bgColor : '#FFFFFF',
                  }}
                  className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-dm font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 transition-all duration-300"
                >
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>{product.badge}</span>
                </span>
              </div>
            )}

            {/* Top Right Rating Badge */}
            <div
              className={`absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full backdrop-blur-md shadow-sm border text-[10px] sm:text-[11px] font-dm font-bold flex items-center gap-1 transition-all duration-300 ${
                isHovered
                  ? 'bg-black/40 text-white border-white/20'
                  : 'bg-white/95 text-stone-800 border-stone-200/50'
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className={`font-normal text-[9px] ${isHovered ? 'text-white/70' : 'text-stone-400'}`}>
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. ROW OF 3 THUMBNAILS                                   */}
          {/* ======================================================== */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((imgSrc, idx) => {
              const isSelected = selectedImgIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImgIndex(idx);
                  }}
                  onMouseEnter={() => setSelectedImgIndex(idx)}
                  style={{
                    borderColor: isSelected 
                      ? (isHovered ? '#FFFFFF' : product.bgColor) 
                      : 'transparent',
                  }}
                  className={`relative h-11 sm:h-12 md:h-13 rounded-[10px] overflow-hidden bg-stone-100 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-offset-1 scale-[1.02] shadow-xs'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgSrc}
                    alt={`${product.title} thumb ${idx + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              );
            })}
          </div>

          {/* ======================================================== */}
          {/* 3. PRODUCT INFORMATION                                   */}
          {/* ======================================================== */}
          <div className="mt-2.5">
            {/* Category & Sanctum */}
            <div className="flex items-center justify-between gap-2">
              <span
                style={{ color: isHovered ? '#FDE68A' : product.bgColor }}
                className="font-dm font-bold text-[9px] sm:text-[10px] tracking-[0.14em] uppercase transition-colors duration-300"
              >
                {product.category}
              </span>
              <span
                className={`font-dm text-[9px] font-medium truncate max-w-[130px] transition-colors duration-300 ${
                  isHovered ? 'text-white/80' : 'text-stone-500'
                }`}
              >
                {product.consecrationLocation}
              </span>
            </div>

            {/* Title */}
            <h3
              className={`font-cormorant font-bold text-lg sm:text-xl transition-colors duration-300 leading-snug line-clamp-1 mt-1 ${
                isHovered ? 'text-white' : 'text-[#221508]'
              }`}
            >
              {product.title}
            </h3>

            {/* Subtitle / Short Description */}
            <p
              className={`font-dm text-[11px] sm:text-xs line-clamp-1 mt-0.5 leading-relaxed transition-colors duration-300 ${
                isHovered ? 'text-white/85' : 'text-stone-600'
              }`}
            >
              {product.subtitle}
            </p>

            {/* Pricing Row */}
            <div
              className={`flex items-baseline justify-between mt-2 pt-2 border-t transition-colors duration-300 ${
                isHovered ? 'border-white/20' : 'border-stone-100'
              }`}
            >
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`font-cormorant text-xl sm:text-2xl font-bold transition-colors duration-300 ${
                    isHovered ? 'text-white' : 'text-[#221508]'
                  }`}
                >
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span
                  className={`font-dm text-[11px] line-through transition-colors duration-300 ${
                    isHovered ? 'text-white/50' : 'text-stone-400'
                  }`}
                >
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              <span
                style={{
                  backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.2)' : `${product.bgColor}18`,
                  color: isHovered ? '#FFFFFF' : product.bgColor,
                }}
                className="px-1.5 py-0.5 rounded font-dm text-[10px] font-bold transition-colors duration-300"
              >
                {discountPercent}% OFF
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. ACTION BUTTONS: ADD TO CART & BUY NOW                 */}
        {/* ======================================================== */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-1">
          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCartClick}
            style={{
              borderColor: isHovered ? 'rgba(255, 255, 255, 0.4)' : `${product.bgColor}40`,
              color: isHovered ? '#FFFFFF' : product.bgColor,
              backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.15)' : '#FFFFFF',
            }}
            className="w-full py-1.5 sm:py-2 px-2 rounded-full border text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer active:scale-95 shadow-2xs hover:scale-[1.02]"
          >
            {added ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3 h-3" />
                <span>Add</span>
              </>
            )}
          </button>

          {/* Buy Now Button */}
          <button
            type="button"
            onClick={handleBuyNowClick}
            style={{
              backgroundColor: isHovered ? '#FFFFFF' : '#51000F',
              color: isHovered ? product.bgColor : '#FFFFFF',
            }}
            className="w-full py-1.5 sm:py-2 px-2 rounded-full text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all duration-300 cursor-pointer active:scale-95 shadow-[0_3px_10px_rgba(81,0,15,0.25)] hover:scale-[1.02]"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export interface StackScrollRevealProps {
  cards?: any[];
  title?: string;
  subtitle?: string;
  onAddToCart?: (kit: PoojaKit) => void;
  onBuyNow?: (kit: PoojaKit) => void;
  onViewAll?: () => void;
}

export const StackScrollReveal: React.FC<StackScrollRevealProps> = ({
  onAddToCart,
  onBuyNow,
  onViewAll,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, []);

  const handlePrev = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / 3;
      scrollRef.current.scrollBy({ left: -cardWidth - 20, behavior: 'smooth' });
      setTimeout(checkScrollState, 350);
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / 3;
      scrollRef.current.scrollBy({ left: cardWidth + 20, behavior: 'smooth' });
      setTimeout(checkScrollState, 350);
    }
  };

  return (
    <section
      id="sanatana-mall-showcase"
      className="relative w-full bg-transparent text-[#221508] -mt-4 sm:-mt-8 pt-0 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12 select-none overflow-hidden"
    >
      {/* Background Decorative Auras */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0A4C83]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#C59239]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ======================================================== */}
        {/* CAROUSEL TRACK: 3 IN LINE ON DESKTOP, REST IN SWIPE       */}
        {/* ======================================================== */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={checkScrollState}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 px-1 scrollbar-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {SHOWCASE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="w-[85vw] sm:w-[48vw] lg:w-[calc((100%-2.5rem)/3)] flex-shrink-0 snap-start"
              >
                <ProductCardItem
                  product={prod}
                  onAddToCart={onAddToCart}
                  onBuyNow={onBuyNow}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SWIPING BUTTONS & EXPLORE ALL BELOW THE LAYOUTS          */}
        {/* ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 sm:mt-7">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous offering"
              className={`w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                canScrollLeft
                  ? 'hover:bg-[#51000F] hover:text-white hover:border-[#51000F] text-stone-700 hover:scale-105 active:scale-95'
                  : 'opacity-35 cursor-not-allowed text-stone-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Carousel indicator dots */}
            <div className="flex items-center gap-1.5 px-2">
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  !canScrollLeft ? 'bg-[#51000F] w-5' : 'bg-stone-300 w-2'
                }`}
              />
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  !canScrollRight ? 'bg-[#51000F] w-5' : 'bg-stone-300 w-2'
                }`}
              />
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next offering"
              className={`w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
                canScrollRight
                  ? 'hover:bg-[#51000F] hover:text-white hover:border-[#51000F] text-stone-700 hover:scale-105 active:scale-95'
                  : 'opacity-35 cursor-not-allowed text-stone-300'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#51000F] hover:bg-[#742A35] text-white font-dm font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-xs sm:ml-4"
            >
              <span>Explore All in Mall</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
