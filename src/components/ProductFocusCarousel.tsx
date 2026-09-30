import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Eye, 
  MapPin, 
  Star, 
  Sparkles,
  PackageOpen
} from 'lucide-react';
import { PoojaKit } from '../types/homepage';

export interface FocusCarouselProduct {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  consecratedAt: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  bgColor: string;
  shortDesc: string;
  itemsIncluded: {
    name: string;
    significance: string;
    origin: string;
  }[];
  weightGrams?: number;
  idealFor: string;
}

interface ProductFocusCarouselProps {
  products: FocusCarouselProduct[];
  onAddToCart: (kit: PoojaKit) => void;
  onInspect: (product: FocusCarouselProduct) => void;
  cardRadius?: number;
  gap?: number;
  activeScale?: number;
  inactiveScale?: number;
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export const ProductFocusCarousel: React.FC<ProductFocusCarouselProps> = ({
  products,
  onAddToCart,
  onInspect,
  cardRadius = 24,
  gap = 40,
  activeScale = 1,
  inactiveScale = 0.75,
  autoplay = false,
  autoplaySpeed = 4000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay
  useEffect(() => {
    if (!autoplay || isHovered || products.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % products.length);
    }, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, isHovered, products.length]);

  const navigateTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const navigateNext = useCallback(() => {
    if (products.length === 0) return;
    setActiveIndex(prev => (prev < products.length - 1 ? prev + 1 : 0));
  }, [products.length]);

  const navigatePrev = useCallback(() => {
    if (products.length === 0) return;
    setActiveIndex(prev => (prev > 0 ? prev - 1 : products.length - 1));
  }, [products.length]);

  const handleDragEnd = useCallback((_: any, info: { offset: { x: number } }) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      navigatePrev();
    } else if (info.offset.x < -threshold) {
      navigateNext();
    }
  }, [navigateNext, navigatePrev]);

  // Clean linear position calculation: prevents wrap-around fly-through
  const getCardPosition = (index: number) => {
    return index - activeIndex;
  };

  const getCardStyle = (position: number, isMobile: boolean) => {
    const baseWidth = isMobile ? 300 : 380;
    const baseHeight = isMobile ? 440 : 540;
    if (position === 0) {
      return {
        x: 0,
        scale: activeScale,
        zIndex: 10,
        opacity: 1,
        width: baseWidth,
        height: baseHeight,
        filter: "none"
      };
    }
    const absPosition = Math.abs(position);
    const cardDirection = position > 0 ? 1 : -1;
    const translateX = cardDirection * (baseWidth * 0.88 + gap);
    return {
      x: translateX,
      scale: inactiveScale,
      zIndex: 5,
      opacity: absPosition <= 1 ? 0.95 : 0,
      width: baseWidth,
      height: baseHeight,
      filter: "none"
    };
  };

  const activeProduct = products[activeIndex] || products[0];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[560px] sm:h-[640px] flex items-center justify-center overflow-hidden select-none bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        Dynamic Ambient Color Glow behind the Center Card:
        Smoothly blooms only when active, reflecting the active card's background color
      */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[400px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 ease-out opacity-30"
        style={{
          backgroundColor: activeProduct?.bgColor || '#C7833D',
        }}
      />

      {/* Main Drag & Card Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {products.map((product, index) => {
            const position = getCardPosition(index);
            // Render only immediate left (-1), center (0), and immediate right (1) to eliminate all background fly-throughs!
            const isVisible = Math.abs(position) <= 1;
            if (!isVisible) return null;

            return (
              <ProductCard
                key={product.id}
                product={product}
                position={position}
                isActive={position === 0}
                cardRadius={cardRadius}
                onClick={() => navigateTo(index)}
                getCardStyle={getCardStyle}
                onAddToCart={onAddToCart}
                onInspect={onInspect}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Floating Circular Prev & Next Buttons (Exact Framer styling) */}
      <ArrowButton
        direction="left"
        onClick={navigatePrev}
        ariaLabel="Previous kit"
      />
      <ArrowButton
        direction="right"
        onClick={navigateNext}
        ariaLabel="Next kit"
      />

      {/* Bottom Minimal Indicator Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {products.map((p, idx) => (
          <button
            key={p.id}
            type="button"
            onClick={() => navigateTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
              idx === activeIndex 
                ? 'w-8 bg-[#C7833D]' 
                : 'w-2 bg-[#D9C6A8]/70 hover:bg-[#B08A4A]'
            }`}
            aria-label={`Go to ${p.title}`}
          />
        ))}
      </div>
    </div>
  );
};

interface ProductCardProps {
  key?: React.Key;
  product: FocusCarouselProduct;
  position: number;
  isActive: boolean;
  cardRadius: number;
  onClick: () => void;
  getCardStyle: (position: number, isMobile: boolean) => any;
  onAddToCart: (kit: PoojaKit) => void;
  onInspect: (product: FocusCarouselProduct) => void;
}

function ProductCard({
  product,
  position,
  isActive,
  cardRadius,
  onClick,
  getCardStyle,
  onAddToCart,
  onInspect,
}: ProductCardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const style = getCardStyle(position, isMobile);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: style.width,
        height: style.height,
        borderRadius: cardRadius,
        overflow: 'hidden',
        cursor: isActive ? 'default' : 'pointer',
        zIndex: style.zIndex,
        filter: style.filter,
        willChange: 'transform, opacity',
      }}
      initial={false}
      animate={{
        x: style.x,
        scale: style.scale,
        opacity: style.opacity,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      onClick={onClick}
    >
      {/* 
        CARD SHELL:
        - Inactive: Deep slate base (#1E252B) with loading shimmer illusion & visible words
        - Active: Animated Color Fill expanding across the card from bottom to top!
      */}
      <div 
        className="w-full h-full relative flex flex-col justify-between overflow-hidden bg-[#1E252B] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          border: isActive ? `2px solid rgba(255, 255, 255, 0.45)` : '1px solid rgba(51, 65, 85, 0.65)',
          boxShadow: isActive
            ? `0 25px 60px -10px ${product.bgColor}99, 0 15px 35px rgba(0, 0, 0, 0.35)`
            : '0 12px 28px -10px rgba(15, 23, 42, 0.5)',
        }}
      >
        {/* ======================================================== */}
        {/* 1. ANIMATED COLOR FILL LAYER                             */}
        {/* As soon as card comes to center, color fills in smoothly */}
        {/* ======================================================== */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-0"
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0.9,
            clipPath: isActive 
              ? 'circle(150% at 50% 50%)' 
              : 'circle(0% at 50% 100%)',
          }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            backgroundColor: product.bgColor,
          }}
        />



        {/* ======================================================== */}
        {/* 3. INNER BOX (for the product image)                     */}
        {/* ======================================================== */}
        <div className="p-3.5 sm:p-4 pb-0 w-full relative z-10">
          <div 
            className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-sm transition-all duration-600"
            style={{
              backgroundColor: isActive ? '#FFFFFF' : '#141A21',
              border: isActive ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid rgba(51, 65, 85, 0.6)',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-700 ease-out"
              style={{
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                filter: isActive ? 'contrast(1.02) brightness(1)' : 'contrast(0.95) brightness(0.85)',
              }}
            />

            {/* Ambient image vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Badges inside inner image box */}
            <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 z-10">
              {/* Origin Dham Badge */}
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[10px] font-dm font-medium text-[#F7F1E5] border border-white/20">
                <MapPin className="w-2.5 h-2.5 text-[#D9C6A8]" />
                <span className="truncate max-w-[130px]">{product.consecratedAt}</span>
              </div>

              {/* Discount Tag */}
              <span className="px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[#26201B] font-dm text-[10px] font-bold shadow-xs">
                {discountPercent}% OFF
              </span>
            </div>

            {/* Quick Inspect Eye Button on Active */}
            {isActive && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInspect(product);
                }}
                className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 text-[#26201B] hover:bg-white flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95 z-20"
                aria-label="Inspect items"
              >
                <Eye className="w-3.5 h-3.5 text-[#26201B]" />
              </button>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. LOWER CONTENT AREA (Words are visible on ALL cards!)  */}
        {/* Active: Radiant white/gold text + CTA buttons            */}
        {/* Inactive: Sleek silver-slate text with loading illusion  */}
        {/* ======================================================== */}
        <div className="p-4 sm:p-5 pt-2 flex flex-col justify-between flex-1 relative z-10">
          
          {/* Top text block */}
          <div className="flex flex-col gap-1 transition-all duration-500">
            {/* Category Subtitle & Rating */}
            <div className="flex items-center justify-between">
              <span 
                className="text-[10px] sm:text-[11px] font-dm font-bold tracking-widest uppercase transition-colors duration-500"
                style={{
                  color: isActive ? 'rgba(255, 255, 255, 0.95)' : '#94A3B8',
                }}
              >
                {product.categoryLabel}
              </span>
              <span 
                className="inline-flex items-center gap-1 text-[11px] font-dm px-2 py-0.5 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: isActive ? 'rgba(0, 0, 0, 0.25)' : 'rgba(30, 41, 59, 0.8)',
                  color: isActive ? '#FFFFFF' : '#CBD5E1',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(51, 65, 85, 0.5)',
                }}
              >
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{product.rating}</span>
              </span>
            </div>

            {/* Main Title (Clearly visible on deep slate and active) */}
            <h3 
              className="font-cormorant font-bold text-xl sm:text-2xl leading-tight line-clamp-1 mt-0.5 transition-colors duration-500"
              style={{
                color: isActive ? '#FFFFFF' : '#E2E8F0',
                textShadow: isActive ? '0 2px 8px rgba(0,0,0,0.4)' : 'none',
              }}
            >
              {product.title}
            </h3>

            {/* Short Narrative (Clearly visible on deep slate and active) */}
            <p 
              className="font-dm text-xs line-clamp-2 leading-relaxed mt-0.5 font-normal transition-colors duration-500"
              style={{
                color: isActive ? 'rgba(255, 255, 255, 0.88)' : '#94A3B8',
              }}
            >
              {product.shortDesc}
            </p>
          </div>

          {/* Bottom Pricing & CTA / Standby State */}
          <div className="pt-2 flex flex-col gap-2.5 transition-all duration-500">
            {/* Pricing Row */}
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span 
                  className="font-cormorant text-2xl sm:text-3xl font-bold leading-none transition-colors duration-500"
                  style={{
                    color: isActive ? '#FFFFFF' : '#F1F5F9',
                  }}
                >
                  ₹{product.price.toLocaleString()}
                </span>
                <span 
                  className="font-dm text-xs line-through transition-colors duration-500"
                  style={{
                    color: isActive ? 'rgba(255, 255, 255, 0.5)' : '#64748B',
                  }}
                >
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
              <span 
                className="text-[10px] font-dm font-medium transition-colors duration-500"
                style={{
                  color: isActive ? 'rgba(255, 255, 255, 0.85)' : '#64748B',
                }}
              >
                Vedic Consecrated
              </span>
            </div>

            {/* CTA Buttons Row on Active vs Standby Pill on Inactive */}
            {isActive ? (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const asPoojaKit: PoojaKit = {
                      id: product.id,
                      title: product.title,
                      subtitle: product.subtitle,
                      category: 'daily',
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
                    onAddToCart(asPoojaKit);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl font-dm font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md bg-white text-[#26201B] hover:bg-[#F7F1E5] active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C7833D]" />
                  <span>Add to Basket</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspect(product);
                  }}
                  className="p-2.5 rounded-xl border border-white/40 bg-black/20 hover:bg-black/40 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
                  aria-label="Inspect kit details"
                >
                  <PackageOpen className="w-4 h-4 text-white" />
                </button>
              </motion.div>
            ) : (
              /* Static indicator for inactive deep slate cards */
              <div className="flex items-center justify-between pt-0.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 text-[10px] font-dm">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Tap to activate kit</span>
                </div>
                <span className="text-[10px] font-dm text-slate-500 uppercase tracking-wider">
                  Standby
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function ArrowButton({
  direction,
  onClick,
  ariaLabel,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`absolute ${direction === 'left' ? 'left-3 sm:left-8' : 'right-3 sm:right-8'} top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 hover:bg-white text-[#26201B] border border-[#D9C6A8] flex items-center justify-center cursor-pointer shadow-[0_6px_20px_rgba(51,44,37,0.18)] z-20 transition-all duration-200 hover:scale-110 active:scale-95`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: direction === 'left' ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
  );
}
