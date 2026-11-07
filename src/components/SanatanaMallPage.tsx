import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingBag, 
  Star, 
  ChevronDown, 
  Heart, 
  ShoppingCart, 
  ArrowLeft, 
  User, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal,
  Plus,
  Truck,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { 
  MALL_PRODUCTS, 
  MALL_CATEGORIES_CONFIG, 
  MALL_MATERIALS_CONFIG,
  MALL_OCCASIONS_CONFIG,
  MallProduct,
  MallCategoryType,
  MallMaterialType,
  MallOccasionType
} from '../data/mallData';
import { PoojaKit } from '../types/homepage';
import { SunIcon } from './SunIcon';
import { ProductDetailPage } from './ProductDetailPage';
import { WishlistDrawer } from './WishlistDrawer';
import { Footer } from './Footer';
import { HeaderActionButtons } from './HeaderActionButtons';
import { openShopifyAccount, getShopifyPotlis, ShopifyProduct } from '../lib/shopify';
import { DividerOrnamental } from './ui/SacredPatterns';

interface SanatanaMallPageProps {
  onNavigateHome: () => void;
  onNavigateTravel: () => void;
  onAddToCart: (kit: PoojaKit) => void;
  onOpenCart: () => void;
  cartCount: number;
  isMenuOpen?: boolean;
  onOpenAccount?: () => void;
}

export const SanatanaMallPage: React.FC<SanatanaMallPageProps> = ({
  onNavigateHome,
  onNavigateTravel,
  onAddToCart,
  onOpenCart,
  cartCount,
  isMenuOpen = false,
  onOpenAccount,
}) => {
  // Selected Product for dedicated Product Detail Page
  const [selectedProduct, setSelectedProduct] = useState<MallProduct | null>(null);

  // Wishlist state (persists in session)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(new Set());
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);

  // Filter Drawer open state (triggered by top-right Filter button)
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(500);
  const [maxPrice, setMaxPrice] = useState<number>(50000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedPromotions, setSelectedPromotions] = useState<string[]>([]);
  const [availability, setAvailability] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination state (12 items per page = 4 columns x 3 rows)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Horizontal scroll refs for the sections
  const kitsScrollRef = useRef<HTMLDivElement>(null);
  const corporateScrollRef = useRef<HTMLDivElement>(null);
  const festivalScrollRef = useRef<HTMLDivElement>(null);
  const potlisScrollRef = useRef<HTMLDivElement>(null);

  // Shopify Potlis & Bags State
  const [shopifyPotlis, setShopifyPotlis] = useState<MallProduct[]>([]);
  const [isPotlisLoading, setIsPotlisLoading] = useState(true);

  // Fetch real Bags & Potlis directly from Shopify Storefront API
  useEffect(() => {
    let isMounted = true;
    async function loadPotlis() {
      try {
        setIsPotlisLoading(true);
        const shopifyItems = await getShopifyPotlis(50);
        if (!isMounted) return;

        const converted: MallProduct[] = shopifyItems.map((item, idx) => {
          const firstVariant = item.variants[0];
          const rawPrice = firstVariant?.price?.amount
            ? parseFloat(firstVariant.price.amount)
            : (item.priceRange?.minVariantPrice ? parseFloat(item.priceRange.minVariantPrice.amount) : 500);

          const comparePrice = firstVariant?.compareAtPrice?.amount
            ? parseFloat(firstVariant.compareAtPrice.amount)
            : (item.compareAtPriceRange?.minVariantPrice?.amount && parseFloat(item.compareAtPriceRange.minVariantPrice.amount) > rawPrice
                ? parseFloat(item.compareAtPriceRange.minVariantPrice.amount)
                : Math.round(rawPrice * 1.25));

          const primaryImage = item.images[0]?.url || firstVariant?.image?.url || 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_11.35.52_2.jpg?v=1793704004';
          const additional = item.images.slice(1).map(img => img.url);

          // Direct inventory and availability from Shopify
          const isAvailable = Boolean(item.availableForSale ?? firstVariant?.availableForSale ?? true);
          const quantityAvail = firstVariant?.quantityAvailable;
          const inventoryBadge = !isAvailable
            ? 'SOLD OUT'
            : (quantityAvail !== undefined && quantityAvail !== null && quantityAvail <= 5 && quantityAvail > 0
                ? `ONLY ${quantityAvail} LEFT`
                : (item.tags && item.tags.length > 0 ? item.tags[0].toUpperCase() : (idx % 2 === 0 ? 'CONSECRATED' : 'HANDLOOM')));

          return {
            id: item.id,
            variantId: firstVariant?.id,
            title: item.title,
            subtitle: item.productType || 'Consecrated Ritual Handloom Potli Bag',
            category: 'puja-essentials' as MallCategoryType,
            categoryLabel: (item.productType || 'SACRED POTLIS & BAGS').toUpperCase(),
            price: rawPrice,
            originalPrice: comparePrice,
            rating: 4.9,
            reviewsCount: 18 + (idx * 3),
            image: primaryImage,
            additionalImages: additional.length > 0 ? additional : undefined,
            badge: inventoryBadge,
            consecratedAt: 'Kashi Vishwanath & Haridwar Sanctums',
            originLocation: item.vendor || 'Varanasi Weavers Guild, Bharat',
            shortDesc: item.description || 'Pure handwoven consecrated potli bag lined with sacred raw silk, crafted specifically for safekeeping puja samagri, sacred malas, yantras, and prasad.',
            fullDesc: item.descriptionHtml || item.description || 'Each sacred potli is crafted using unadulterated handspun fabric and blessed in traditional sanctums. Ideal for holding japa malas, sacred vigrahas during yatra, consecrated coins, and sacred offerings with supreme spiritual sanctity.',
            idealFor: 'Safekeeping sacred malas, temple coins, rudrakshas, puja dravyas, and travel sadhana.',
            weightGrams: 85,
            inStock: isAvailable,
            material: 'Mixed Materials' as MallMaterialType,
            occasion: 'Daily Worship' as MallOccasionType,
            itemsIncluded: [
              { name: 'Pure Handwoven Potli Bag', significance: 'Protection of energized sacred items', origin: item.vendor || 'Kashi' },
              { name: 'Consecrated Raksha Thread & Bell Pulls', significance: 'Auspicious ritual tie', origin: 'Haridwar' }
            ],
            specifications: [
              { label: 'Craft Technique', value: 'Heritage Handloom Weaving' },
              { label: 'Closure', value: 'Traditional Drawstring with Tassels' },
              { label: 'Inventory Status', value: isAvailable ? (quantityAvail ? `${quantityAvail} In Stock` : 'Available') : 'Out of Stock' },
              { label: 'Vendor / Guild', value: item.vendor || 'House of Sanatana' },
              { label: 'Sanctum Blessed', value: 'Peetham Certified' }
            ]
          };
        });

        setShopifyPotlis(converted);
      } catch (err) {
        console.error('Failed to load Shopify potlis:', err);
      } finally {
        if (isMounted) setIsPotlisLoading(false);
      }
    }

    loadPotlis();
    return () => { isMounted = false; };
  }, []);

  const scrollHorizontally = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollDistance = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollDistance : scrollDistance,
        behavior: 'smooth'
      });
    }
  };

  // Scroll visibility for navbar: disappears when scrolling past the Sanatan Mall heading
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (headingRef.current) {
        const rect = headingRef.current.getBoundingClientRect();
        // Hide navbar once user scrolls past the heading
        setIsNavbarVisible(rect.bottom > 0);
      } else {
        setIsNavbarVisible(window.scrollY < 260);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Synchronize hash routing with product detail page
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const prodId = hash.replace('#product-', '');
        const found = MALL_PRODUCTS.find(p => p.id === prodId) || shopifyPotlis.find(p => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          return;
        }
      } else if (hash === '#santana-mall' || hash === '#mall' || hash === '#shop') {
        setSelectedProduct(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [shopifyPotlis]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectProduct = (product: MallProduct) => {
    setSelectedProduct(product);
    window.location.hash = `product-${product.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCollection = () => {
    setSelectedProduct(null);
    window.location.hash = 'santana-mall';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  const toggleCategory = (catId: string) => {
    setSelectedCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
    setCurrentPage(1);
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials(prev =>
      prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
    );
    setCurrentPage(1);
  };

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions(prev =>
      prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
    );
    setCurrentPage(1);
  };

  const togglePromotion = (promo: string) => {
    setSelectedPromotions(prev =>
      prev.includes(promo) ? prev.filter(p => p !== promo) : [...prev, promo]
    );
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
    setSelectedOccasions([]);
    setMinPrice(500);
    setMaxPrice(50000);
    setSelectedRating(null);
    setSelectedPromotions([]);
    setAvailability('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Count active filters for badge
  const activeFiltersCount = 
    selectedCategories.length + 
    selectedMaterials.length + 
    selectedOccasions.length + 
    selectedPromotions.length + 
    (maxPrice < 50000 ? 1 : 0) + 
    (selectedRating ? 1 : 0) + 
    (availability !== 'all' ? 1 : 0);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return MALL_PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Material filter
      if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
        return false;
      }

      // Occasion filter
      if (selectedOccasions.length > 0 && !selectedOccasions.includes(product.occasion)) {
        return false;
      }

      // Price filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (selectedRating !== null && product.rating < selectedRating) {
        return false;
      }

      // Promotions filter
      if (selectedPromotions.length > 0) {
        if (selectedPromotions.includes('new') && product.badge !== 'NEW') {
          return false;
        }
        if (selectedPromotions.includes('bestseller') && product.rating < 4.8) {
          return false;
        }
      }

      // Availability filter
      if (availability === 'in-stock' && !product.inStock) {
        return false;
      }
      if (availability === 'out-of-stock' && product.inStock) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches = 
          product.title.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.shortDesc.toLowerCase().includes(q) ||
          product.categoryLabel.toLowerCase().includes(q) ||
          product.material.toLowerCase().includes(q) ||
          product.occasion.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0);
      return 0; // default featured
    });
  }, [selectedCategories, selectedMaterials, selectedOccasions, minPrice, maxPrice, selectedRating, selectedPromotions, availability, searchQuery, sortBy]);

  // Paginated slice
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const catalogEl = document.getElementById('collection-top-anchor');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Convert to PoojaKit format
  const handleAddToCartClick = (prod: MallProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const asPoojaKit: PoojaKit = {
      id: prod.id,
      variantId: prod.variantId,
      title: prod.title,
      subtitle: prod.subtitle,
      category: prod.category === 'gift-sets' ? 'daily' : 'festival',
      price: prod.price,
      originalPrice: prod.originalPrice,
      rating: prod.rating,
      reviewsCount: prod.reviewsCount,
      image: prod.image,
      badge: prod.badge,
      consecratedAt: prod.consecratedAt,
      shortDesc: prod.shortDesc,
      idealFor: prod.idealFor,
      weightGrams: prod.weightGrams,
      itemsIncluded: prod.itemsIncluded,
    };
    onAddToCart(asPoojaKit);
    showToast(`Added "${prod.title}" to sacred basket.`);
  };

  const handleBuyNowClick = (prod: MallProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    handleAddToCartClick(prod);
    setTimeout(() => {
      onOpenCart();
    }, 150);
  };

  // IDs for the three primary curated sections (12 offerings each for 2 lines / rows)
  const KITS_IDS = [
    'nitya-daily-kit',
    'complete-puja-samagri-box',
    'vastu-griha-havan',
    'rudraksha-dhyana-kit',
    'brass-puja-thali-set',
    'sandalwood-sadhana-kit',
    'handcrafted-brass-diya',
    'pure-copper-kalash',
    'sandalwood-incense-sticks',
    'sandalwood-mala',
    'rudraksha-mala-108-beads',
    'shiv-lingam-stone'
  ];

  const CORPORATE_GIFTING_IDS = [
    'consecrated-silver-coin-chest',
    'royal-mysore-sandalwood-gift-hamper',
    'himalayan-kesar-shilajit-executive-box',
    'bhagavad-gita-deluxe-edition',
    'brass-deepalakshmi-holding-diya',
    'brass-kamdhenu-idol',
    'rosewood-mandir-jharokha-shelf',
    'handcrafted-temple-bell',
    'panchamrit-silver-plated-katoris',
    'handcrafted-brass-diya',
    'sandalwood-incense-sticks',
    'rudraksha-mala-108-beads'
  ];

  const FESTIVAL_KITS_IDS = [
    'lakshmi-ganesh-anushthan',
    'diwali-deepotsav-maha-box',
    'navaratri-durga-saptashati-set',
    'maha-shivratri-rudrabhishek-box',
    'siddhi-vinayak-ganesh-utsav-box',
    'pure-copper-kalash',
    'complete-puja-samagri-box',
    'brass-puja-thali-set',
    'handcrafted-brass-diya',
    'brass-deepalakshmi-holding-diya',
    'sandalwood-sadhana-kit',
    'consecrated-silver-coin-chest'
  ];

  // Helper to filter items per section respecting active search / filters
  const filterSectionProducts = (ids: string[]) => {
    return ids
      .map(id => MALL_PRODUCTS.find(p => p.id === id))
      .filter((p): p is MallProduct => Boolean(p))
      .filter(product => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matches =
            product.title.toLowerCase().includes(q) ||
            product.subtitle.toLowerCase().includes(q) ||
            product.shortDesc.toLowerCase().includes(q) ||
            product.categoryLabel.toLowerCase().includes(q) ||
            product.material.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Material filter if active
        if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) {
          return false;
        }

        // Price filter
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }

        // Rating filter
        if (selectedRating !== null && product.rating < selectedRating) {
          return false;
        }

        // Availability filter
        if (availability === 'in-stock' && !product.inStock) {
          return false;
        }

        return true;
      }).sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0);
        return 0;
      });
  };

  const kitsProducts = useMemo(
    () => filterSectionProducts(KITS_IDS),
    [searchQuery, selectedMaterials, minPrice, maxPrice, selectedRating, availability, sortBy]
  );

  const corporateProducts = useMemo(
    () => filterSectionProducts(CORPORATE_GIFTING_IDS),
    [searchQuery, selectedMaterials, minPrice, maxPrice, selectedRating, availability, sortBy]
  );

  const festivalProducts = useMemo(
    () => filterSectionProducts(FESTIVAL_KITS_IDS),
    [searchQuery, selectedMaterials, minPrice, maxPrice, selectedRating, availability, sortBy]
  );

  // Filter Shopify Potlis respecting active search & filter states
  const filteredPotlisProducts = useMemo(() => {
    return shopifyPotlis.filter(product => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          product.title.toLowerCase().includes(q) ||
          product.subtitle.toLowerCase().includes(q) ||
          product.shortDesc.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Price filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Rating filter
      if (selectedRating !== null && product.rating < selectedRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [shopifyPotlis, searchQuery, minPrice, maxPrice, selectedRating, sortBy]);

  // Render a single product card inside horizontal carousel with on-scroll entrance animation
  const renderProductCard = (product: MallProduct, index: number = 0) => {
    const isWishlisted = wishlistIds.has(product.id);
    const colIndex = Math.floor(index / 2);
    const rowIndex = index % 2;
    const entranceDelay = Math.min(colIndex * 0.07 + rowIndex * 0.03, 0.4);

    return (
      <motion.div
        key={product.id}
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{
          duration: 0.55,
          delay: entranceDelay,
          ease: [0.16, 1, 0.3, 1]
        }}
        onClick={() => handleSelectProduct(product)}
        className="w-[240px] sm:w-[265px] md:w-[285px] shrink-0 snap-start bg-[#FEFBF2] hover:bg-white border border-[#C59239]/25 hover:border-[#C59239] rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_14px_35px_rgba(197,146,57,0.18)] cursor-pointer group select-none"
      >
        <div>
          {/* Proportional Image Container (Balanced & Clean) */}
          <div className="relative h-32 sm:h-36 w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#241C15] to-[#16110D] mb-2.5 shadow-inner">
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
            />

            {/* Top-left maroon/ruby badge */}
            {product.badge && (
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#98555E] to-[#51000F] text-white text-[9px] font-dm font-bold uppercase tracking-wider shadow-xs">
                  {product.badge}
                </span>
              </div>
            )}

            {/* Top-right Wishlist Heart Button */}
            <button
              type="button"
              onClick={(e) => toggleWishlist(product.id, e)}
              className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-[#3D2619] hover:text-[#98555E] shadow-sm transition-all cursor-pointer hover:scale-110"
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-[#98555E] text-[#98555E]' : 'stroke-[1.75]'
                }`}
              />
            </button>
          </div>

          {/* Category Label */}
          <span className="font-dm font-semibold text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#C59239] block mb-1">
            {product.categoryLabel}
          </span>

          {/* Title */}
          <h3 className="font-cormorant font-bold text-sm sm:text-base text-[#221508] group-hover:text-[#98555E] transition-colors line-clamp-1 leading-snug">
            {product.title}
          </h3>

          {/* Subtitle / Short desc preview */}
          <p className="font-dm text-xs text-[#3D2619]/80 line-clamp-1 mt-0.5 mb-1.5 opacity-90">
            {product.subtitle}
          </p>

          {/* Price & Rating Row */}
          <div className="mt-1.5 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5 font-dm">
              <span className="font-bold text-sm text-[#98555E]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#3D2619]/50 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[#C59239] bg-[#FEFBF2] px-2 py-0.5 rounded-full border border-[#C59239]/40">
              <Star className="w-3 h-3 fill-[#C59239]" />
              <span className="font-bold text-[#221508]">{product.rating}</span>
            </div>
          </div>
        </div>

        {/* Action CTA Buttons (Curvy Capsule Buttons or Out of Stock) */}
        <div className="mt-2.5 pt-2.5 border-t border-[#C59239]/20">
          {!product.inStock ? (
            <div className="w-full py-2 px-3 rounded-full bg-[#3D2619]/10 border border-[#3D2619]/20 text-[#3D2619]/70 text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-not-allowed select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#98555E]/70" />
              <span>Out of Stock</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={(e) => handleAddToCartClick(product, e)}
                className="w-full py-2 px-2 rounded-full bg-white hover:bg-[#98555E] text-[#98555E] hover:text-[#FEFBF2] border border-[#98555E]/40 hover:border-[#98555E] text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-2xs"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleBuyNowClick(product, e)}
                className="w-full py-2 px-2 rounded-full bg-[#51000F] hover:bg-[#742A35] text-white text-[10px] sm:text-[11px] font-dm font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer active:scale-95 shadow-[0_3px_12px_rgba(81,0,15,0.3)]"
              >
                <span>Buy Now</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  // Render a full horizontal section with centered header (outside), 2 lines/rows of products in a curvy colored background, and arrows
  const renderSectionCarousel = (
    id: string,
    headerContent: React.ReactNode,
    sectionNameForAria: string,
    containerBgClass: string,
    products: MallProduct[],
    scrollRef: React.RefObject<HTMLDivElement | null>
  ) => (
    <section id={id} className="py-8 sm:py-10">
      
      {/* High-Fashion Editorial Typography Header (Excluded from the curvy background) */}
      <div className="mb-4 sm:mb-6">
        {headerContent}
      </div>

      {/* Curvy Colored Section Background containing the Product Carousel */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-[#FEFBF2] border border-[#C59239]/30 rounded-3xl p-6 max-w-md mx-auto shadow-sm">
          <p className="font-cormorant text-xl font-bold text-[#221508]">
            No matching offerings in this section
          </p>
          <p className="font-dm text-xs text-[#3D2619]/70 mt-1.5">
            Try adjusting your search query or reset active filters.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={`relative rounded-[32px] sm:rounded-[44px] p-3.5 sm:p-5 md:p-6 border-0 shadow-[0_20px_45px_rgba(0,0,0,0.06)] transition-all overflow-hidden ${containerBgClass}`}
        >
          {/* Floating Left Flanking Arrow on Carousel Edge */}
          <button
            type="button"
            onClick={() => scrollHorizontally(scrollRef, 'left')}
            className="flex absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/95 hover:bg-[#0A4C83] text-[#221508] hover:text-white border border-[#C59239]/40 hover:border-[#0A4C83] shadow-lg items-center justify-center cursor-pointer active:scale-90 transition-all backdrop-blur-xs"
            aria-label={`Scroll ${sectionNameForAria} left`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Floating Right Flanking Arrow on Carousel Edge */}
          <button
            type="button"
            onClick={() => scrollHorizontally(scrollRef, 'right')}
            className="flex absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-white/95 hover:bg-[#0A4C83] text-[#221508] hover:text-white border border-[#C59239]/40 hover:border-[#0A4C83] shadow-lg items-center justify-center cursor-pointer active:scale-90 transition-all backdrop-blur-xs"
            aria-label={`Scroll ${sectionNameForAria} right`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* 2-Row Horizontal Scroll Grid (Compact Product Cards) */}
          <div
            ref={scrollRef}
            className="grid grid-rows-2 grid-flow-col auto-cols-[240px] sm:auto-cols-[265px] md:auto-cols-[285px] gap-3 sm:gap-4 overflow-x-auto scroll-smooth py-1 px-0.5 sm:px-1.5 no-scrollbar [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, idx) => renderProductCard(product, idx))}
          </div>
        </motion.div>
      )}
    </section>
  );

  // Wishlist items for drawer
  const wishlistedProducts = useMemo(() => {
    return MALL_PRODUCTS.filter(p => wishlistIds.has(p.id));
  }, [wishlistIds]);

  // ========================================================
  // CONDITIONAL RENDER: DEDICATED FULL PRODUCT DETAIL PAGE
  // ========================================================
  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBackToCollection={handleBackToCollection}
        onSelectRelatedProduct={handleSelectProduct}
        onAddToCart={onAddToCart}
        onOpenCart={onOpenCart}
        cartCount={cartCount}
        onNavigateHome={onNavigateHome}
        onNavigateTravel={onNavigateTravel}
        wishlistIds={wishlistIds}
        onToggleWishlist={toggleWishlist}
        isMenuOpen={isMenuOpen}
        onOpenAccount={onOpenAccount}
        initialSearchQuery={searchQuery}
        onSearch={(q: string) => {
          setSearchQuery(q);
          setSelectedProduct(null);
          setCurrentPage(1);
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  // ========================================================
  // MAIN CATALOG VIEW: CENTERED PRODUCTS & TOP-RIGHT FILTER
  // ========================================================
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
      {/* 2. TOP NAVBAR IN TRANSPARENT DESIGN (HIDES PAST HEADING) */}
      {/* ======================================================== */}
      <header className={`sticky top-0 z-30 w-full bg-[#FEFBF2]/80 backdrop-blur-md border-b border-[#C59239]/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isNavbarVisible && !isMenuOpen
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-16 sm:pl-20 h-18 sm:h-20 flex items-center justify-between gap-3 sm:gap-6">
          

          {/* Center: Enhanced Prominent Search Bar */}
          <div className="flex-1 max-w-xl mx-2 sm:mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C59239] pointer-events-none" />
              <input
                type="text"
                placeholder="Search Sanatan Mall for idols, puja kits, incense, yantras..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-9 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-dm bg-white/90 hover:bg-white focus:bg-white border border-[#C59239]/40 focus:border-[#C59239] text-[#221508] placeholder-[#3D2619]/60 shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#C59239]/30 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D2619] hover:text-[#221508] transition-colors cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls: FAR CORNER, LARGER SIZES, ICON ONLY DEFAULT -> SPREADS WITH RICH COLOR (600ms SMOOTH) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
            
            {/* Sacred Yatras Page Navigation Button */}
            <button
              type="button"
              onClick={onNavigateTravel}
              className="hidden md:flex items-center gap-1.5 h-11 px-4 rounded-full bg-[#0A4C83]/10 hover:bg-[#0A4C83] border border-[#0A4C83]/30 hover:border-[#0A4C83] text-[#0A4C83] hover:text-[#FEFBF2] font-dm text-xs font-bold shadow-xs transition-all duration-300 cursor-pointer group"
              title="Sacred Yatras & Expeditions"
            >
              <span>Sacred Yatras</span>
              <span className="text-[#0A4C83] group-hover:text-white transition-colors">➔</span>
            </button>
            
            {/* Unified Expanding Action Controls: Wishlist, Basket, and Account */}
            <HeaderActionButtons
              wishlistCount={wishlistIds.size}
              cartCount={cartCount}
              onOpenWishlist={() => setIsWishlistDrawerOpen(true)}
              onOpenCart={onOpenCart}
              onOpenAccount={onOpenAccount || openShopifyAccount}
            />

          </div>

        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. CENTERED HERO BANNER: RADIANT SACRED VEDIC ATMOSPHERE */}
      {/* ======================================================== */}
      <section className="relative w-full py-12 sm:py-16 text-center border-b border-[#E8DFC9]/70 overflow-hidden">
        {/* Subtle Ambient Radial Gold Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_70%_70%_at_50%_10%,rgba(199,131,61,0.15),transparent_75%)] pointer-events-none -z-10" />

        <div className="max-w-5xl lg:max-w-6xl mx-auto px-4 relative z-10">
          
          {/* Sacred Mantra Subtitle with golden lotus ornaments */}
          <div className="flex items-center justify-center gap-3 text-[#C59239] mb-3">
            <span className="text-xs">✦</span>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#C59239] to-transparent" />
            <span className="font-cormorant tracking-[0.25em] text-xs sm:text-sm uppercase text-[#C59239] font-bold">
              HOUSE OF SANATAN • VEDIC SANCTUM
            </span>
            <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#C59239] to-transparent" />
            <span className="text-xs">✦</span>
          </div>

          {/* Heading Flanked by Sacred Ornamental Patterns on Left & Right */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16">
            {/* Left Sacred Ornamental Pattern */}
            <div className="flex items-center justify-center opacity-70 hover:opacity-95 transition-opacity duration-500 shrink-0 pointer-events-none select-none scale-75 sm:scale-90 md:scale-100 origin-right">
              <DividerOrnamental size={180} color="#C59239" />
            </div>

            {/* Central Title + Subheading lockup */}
            <div className="flex flex-col items-center justify-center text-center">
              <h1 
                ref={headingRef}
                className="font-cormorant font-bold text-4xl sm:text-6xl md:text-7xl text-[#221508] tracking-tight leading-none shrink-0"
              >
                SANATAN MALL
              </h1>

              <p className="mt-2 sm:mt-2.5 font-cormorant italic text-base sm:text-xl text-[#3D2619] max-w-xl mx-auto leading-relaxed">
                Consecrated divine vigrahas, rare herbal dravyas, and sanctified pooja kits handcrafted by hereditary master artisans.
              </p>
            </div>

            {/* Right Sacred Ornamental Pattern */}
            <div className="flex items-center justify-center opacity-70 hover:opacity-95 transition-opacity duration-500 shrink-0 pointer-events-none select-none scale-75 sm:scale-90 md:scale-100 origin-left">
              <DividerOrnamental size={180} color="#C59239" />
            </div>
          </div>



        </div>
      </section>

      {/* Anchor for scroll */}
      <div id="collection-top-anchor" />

      {/* ======================================================== */}
      {/* 4. TOOLBAR ROW: QUICK NAV TABS & FILTER CONTROLS         */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#C59239]/20">
          
          {/* Left: Quick Section Anchor Navigation Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto py-1 no-scrollbar">
            <span className="text-xs font-dm text-[#3D2619] font-medium whitespace-nowrap hidden sm:inline mr-1">
              Curated Collections:
            </span>

            <button
              type="button"
              onClick={() => {
                document.getElementById('section-kits')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full text-xs font-dm font-bold transition-all cursor-pointer bg-white/90 hover:bg-[#0A4C83] text-[#221508] hover:text-white border border-[#C59239]/40 hover:border-[#0A4C83] shadow-2xs whitespace-nowrap flex items-center gap-1.5 active:scale-95"
            >
              <span className="text-[#C59239]">✦</span>
              <span>Kits</span>
              <span className="text-[10px] opacity-75 font-normal">({kitsProducts.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                document.getElementById('section-corporate-gifting')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full text-xs font-dm font-bold transition-all cursor-pointer bg-white/90 hover:bg-[#0A4C83] text-[#221508] hover:text-white border border-[#C59239]/40 hover:border-[#0A4C83] shadow-2xs whitespace-nowrap flex items-center gap-1.5 active:scale-95"
            >
              <span className="text-[#C59239]">✦</span>
              <span>Corporate Gifting</span>
              <span className="text-[10px] opacity-75 font-normal">({corporateProducts.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                document.getElementById('section-bags-potlis')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-full text-xs font-dm font-bold transition-all cursor-pointer bg-white/90 hover:bg-[#0A4C83] text-[#221508] hover:text-white border border-[#C59239]/40 hover:border-[#0A4C83] shadow-2xs whitespace-nowrap flex items-center gap-1.5 active:scale-95"
            >
              <span className="text-[#C59239]">✦</span>
              <span>Bags & Potlis</span>
              <span className="text-[10px] opacity-75 font-normal">({filteredPotlisProducts.length})</span>
            </button>
          </div>

          {/* Right: Search Filter Trigger & TOP-RIGHT FILTER BUTTON */}
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            
            {/* Search Input inline preview */}
            <div className="relative hidden sm:block">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search consecrated offerings..."
                className="w-48 lg:w-56 bg-white/90 border border-[#C59239]/40 hover:border-[#C59239] text-xs font-dm text-[#221508] placeholder-[#3D2619]/60 py-2.5 pl-8 pr-3 rounded-full focus:outline-none focus:border-[#0A4C83] shadow-2xs transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#C59239] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D2619] hover:text-[#221508] cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white/90 border border-[#C59239]/40 hover:border-[#C59239] text-xs font-dm font-semibold text-[#221508] py-2.5 pl-4 pr-9 rounded-full focus:outline-none cursor-pointer shadow-2xs"
              >
                <option value="featured">Featured Sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C59239] pointer-events-none" />
            </div>

            {/* Filter Drawer Button - Icon only default, spreads smoothly on hover with exact same animation as Wishlist, Cart & Account */}
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="group relative flex items-center h-10 sm:h-11 px-3 rounded-full bg-white/85 hover:bg-[#0A4C83] border border-[#C59239]/40 hover:border-[#0A4C83] text-[#221508] hover:text-[#FEFBF2] shadow-xs hover:shadow-[0_8px_25px_rgba(10,76,131,0.25)] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden active:scale-95"
              title="Filter Offerings"
            >
              <SlidersHorizontal className="w-5 h-5 shrink-0 text-[#0A4C83] group-hover:text-[#FEFBF2] transition-all duration-600 group-hover:scale-110" />
              
              <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 overflow-hidden whitespace-nowrap font-dm text-xs font-bold text-[#221508] group-hover:text-[#FEFBF2] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Filter
              </span>

              {activeFiltersCount > 0 && (
                <span className="ml-1.5 w-4.5 h-4.5 rounded-full bg-[#FE7613] group-hover:bg-[#FE7613] text-white font-dm font-bold text-[10px] flex items-center justify-center shrink-0 transition-colors duration-600">
                  {activeFiltersCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Active Filter Tags Row (if any filter is selected) */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3 text-xs font-dm">
            <span className="text-[#3D2619] text-[11px] uppercase font-bold tracking-wider">
              Active:
            </span>
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#98555E] text-white text-[11px] font-medium"
              >
                {cat}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedMaterials.map((mat) => (
              <span
                key={mat}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#98555E] text-white text-[11px] font-medium"
              >
                {mat}
                <button
                  type="button"
                  onClick={() => toggleMaterial(mat)}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {maxPrice < 50000 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#98555E] text-white text-[11px] font-medium">
                Under ₹{maxPrice.toLocaleString('en-IN')}
                <button
                  type="button"
                  onClick={() => setMaxPrice(50000)}
                  className="hover:opacity-75 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs text-[#98555E] underline font-semibold ml-2 hover:opacity-80 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 5. THREE CURATED SECTIONS WITH HORIZONTAL SCROLL & ARROWS */}
      {/* ======================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        
        {/* SECTION 1: KITS */}
        {renderSectionCarousel(
          'section-kits',
          <div className="max-w-4xl mx-auto px-4 text-center">
            {/* Top Meta Row */}
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
              <svg className="w-4 h-4 text-[#C59239] animate-[spin_12s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeLinecap="round" />
              </svg>
              <span className="text-[10px] sm:text-xs font-dm font-bold uppercase tracking-[0.24em] text-[#C59239]">
                01 • SACRED SADHANA KITS
              </span>
            </div>

            {/* Exactly 2 Lines Typography at balanced scale */}
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#221508] uppercase tracking-[-0.02em] leading-tight">
              <span className="block">
                CONSECRATED VEDIC KITS FOR
              </span>
              <span className="block mt-1">
                SACRED SADHANA
                <span className="inline-flex items-center justify-center align-middle mx-2 sm:mx-2.5 h-6 sm:h-7.5 px-2.5 rounded-full bg-gradient-to-r from-[#98555E] to-[#51000F] text-white shadow-xs border border-[#C59239]/50 overflow-hidden transform -translate-y-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E4B968] mr-1.5 animate-pulse"></span>
                  <span className="text-[9px] sm:text-[10px] font-dm font-bold tracking-widest text-[#FEFBF2] uppercase">Sadhana</span>
                </span>
                <span className="text-[#3D2619]/70">IN SANCTIFIED HOMES</span>
              </span>
            </h2>

            {/* Subtext */}
            <p className="font-dm text-xs sm:text-sm text-[#3D2619] max-w-xl mx-auto mt-2.5 leading-relaxed">
              Complete consecrated samagri sets, havan boxes, and daily altar essentials handcrafted for authentic Vedic worship.
            </p>
          </div>,
          'Kits',
          'bg-gradient-to-br from-[#FDF1D7] via-[#F7DEAF] to-[#ECC378] shadow-[0_20px_45px_rgba(197,146,57,0.2)]',
          kitsProducts,
          kitsScrollRef
        )}

        {/* SECTION 2: CORPORATE GIFTING */}
        {renderSectionCarousel(
          'section-corporate-gifting',
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Top Meta Tag */}
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#607427]"></span>
              <span className="text-[10px] sm:text-xs font-dm font-bold uppercase tracking-[0.25em] text-[#607427]">
                02 • EXECUTIVE HERITAGE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#607427]"></span>
            </div>

            {/* Exactly 2 Lines Typography at balanced scale */}
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl uppercase tracking-[-0.02em] leading-tight">
              <span className="block">
                <span className="text-[#221508]">DISTINGUISHED HEIRLOOMS </span>
                <span className="text-[#607427]">FOR YOUR</span>
              </span>
              <span className="block mt-1">
                <span className="text-[#607427]">CORPORATE GIFTING </span>
                <span className="text-[#221508]">NEEDS TO INSPIRE</span>
              </span>
            </h2>

            {/* Subtext */}
            <p className="font-dm text-xs sm:text-sm text-[#3D2619] max-w-xl mx-auto mt-2.5 leading-relaxed">
              Heirloom brass artifacts, consecrated silver coins, and wellness hampers curated for executive milestones & auspicious moments.
            </p>
          </div>,
          'Corporate Gifting',
          'bg-gradient-to-br from-[#F1F6E6] via-[#DEEEC1] to-[#C7DFA0] shadow-[0_20px_45px_rgba(96,116,39,0.18)]',
          corporateProducts,
          corporateScrollRef
        )}

        {/* SECTION 3: BAGS & POTLIS (DIRECT FROM SHOPIFY) */}
        {renderSectionCarousel(
          'section-bags-potlis',
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Top Meta Tag */}
            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A4C83]"></span>
              <span className="text-[10px] sm:text-xs font-dm font-bold uppercase tracking-[0.25em] text-[#0A4C83]">
                03 • SACRED SANGRAHA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A4C83]"></span>
            </div>

            {/* Exactly 2 Lines Typography */}
            <h2 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#221508] uppercase tracking-[-0.02em] leading-tight">
              <span className="block">
                HANDCRAFTED VEDIC BAGS &
              </span>
              <span className="block mt-1">
                SACRED POTLIS
                <span className="inline-flex items-center justify-center align-middle mx-2 sm:mx-2.5 h-6 sm:h-7.5 px-2.5 rounded-full bg-gradient-to-r from-[#0A4C83] to-[#1E3A8A] text-white shadow-xs border border-[#C59239]/50 overflow-hidden transform -translate-y-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E4B968] mr-1.5 animate-pulse"></span>
                  <span className="text-[9px] sm:text-[10px] font-dm font-bold tracking-widest text-[#FEFBF2] uppercase">Live Store</span>
                </span>
                <span className="text-[#0A4C83]">— FOR JAPA & OFFERINGS</span>
              </span>
            </h2>

            {/* Subtext */}
            <p className="font-dm text-xs sm:text-sm text-[#3D2619] max-w-xl mx-auto mt-2.5 leading-relaxed">
              Consecrated handloom silk and raw cotton potlis fetched live from our sacred sanctum collection for keeping japa malas, puja samagri, and temple offerings untouched and pure.
            </p>
          </div>,
          'Bags & Potlis',
          'bg-gradient-to-br from-[#E6EEF8] via-[#CFE2F7] to-[#B8D5F4] shadow-[0_20px_45px_rgba(10,76,131,0.18)]',
          filteredPotlisProducts,
          potlisScrollRef
        )}

      </main>

      {/* ======================================================== */}
      {/* 7. GLOBAL FOOTER (SAME ON EVERY PAGE)                    */}
      {/* ======================================================== */}
      <Footer onNavigateAccount={onOpenAccount} />

      {/* ======================================================== */}
      {/* 8. SLIDE-OVER FILTER DRAWER                              */}
      {/* (OPENS WHEN USER CLICKS TOP-RIGHT FILTER BUTTON)         */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden font-dm">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="w-screen max-w-md bg-[#FEFBF2] shadow-2xl pointer-events-auto border-l border-[#C59239]/30 flex flex-col"
              >
                {/* Drawer Header */}
                <div className="p-5 border-b border-[#C59239]/20 flex items-center justify-between bg-white/80">
                  <div className="flex items-center gap-2.5">
                    <SlidersHorizontal className="w-5 h-5 text-[#0A4C83]" />
                    <h2 className="font-cormorant font-bold text-xl text-[#221508]">
                      Filter Options
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="text-xs text-[#98555E] underline font-semibold cursor-pointer"
                    >
                      Clear All
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFilterDrawerOpen(false)}
                      className="p-1 rounded-full text-[#3D2619] hover:text-[#221508] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Drawer Filter Controls */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  
                  {/* Categories */}
                  <div>
                    <h3 className="font-dm font-bold text-xs uppercase tracking-wider text-[#221508] mb-3">
                      By Categories
                    </h3>
                    <div className="space-y-2 text-xs font-dm text-[#3D2619]">
                      {MALL_CATEGORIES_CONFIG.map((cat) => {
                        if (cat.id === 'all') return null;
                        const isChecked = selectedCategories.includes(cat.id);
                        return (
                          <label key={cat.id} className="flex items-center justify-between cursor-pointer hover:text-[#0A4C83]">
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleCategory(cat.id)}
                                className="w-4 h-4 rounded-sm accent-[#0A4C83]"
                              />
                              <span className={isChecked ? 'font-semibold text-[#0A4C83]' : ''}>
                                {cat.label}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#3D2619]/60">({cat.count})</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="pt-4 border-t border-[#C59239]/20">
                    <h3 className="font-dm font-bold text-xs uppercase tracking-wider text-[#221508] mb-3">
                      By Material
                    </h3>
                    <div className="space-y-2 text-xs font-dm text-[#3D2619]">
                      {MALL_MATERIALS_CONFIG.map((mat) => {
                        const isChecked = selectedMaterials.includes(mat.id);
                        return (
                          <label key={mat.id} className="flex items-center justify-between cursor-pointer hover:text-[#0A4C83]">
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleMaterial(mat.id)}
                                className="w-4 h-4 rounded-sm accent-[#0A4C83]"
                              />
                              <span className={isChecked ? 'font-semibold text-[#0A4C83]' : ''}>
                                {mat.label}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#3D2619]/60">({mat.count})</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Occasion / Collection */}
                  <div className="pt-4 border-t border-[#C59239]/20">
                    <h3 className="font-dm font-bold text-xs uppercase tracking-wider text-[#221508] mb-3">
                      By Collection
                    </h3>
                    <div className="space-y-2 text-xs font-dm text-[#3D2619]">
                      {MALL_OCCASIONS_CONFIG.map((occ) => {
                        const isChecked = selectedOccasions.includes(occ.id);
                        return (
                          <label key={occ.id} className="flex items-center justify-between cursor-pointer hover:text-[#0A4C83]">
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => toggleOccasion(occ.id)}
                                className="w-4 h-4 rounded-sm accent-[#0A4C83]"
                              />
                              <span className={isChecked ? 'font-semibold text-[#0A4C83]' : ''}>
                                {occ.label}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#3D2619]/60">({occ.count})</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="pt-4 border-t border-[#C59239]/20">
                    <h3 className="font-dm font-bold text-xs uppercase tracking-wider text-[#221508] mb-2">
                      Price Range
                    </h3>
                    <p className="text-xs font-semibold text-[#98555E] mb-2">
                      ₹{minPrice} - ₹{maxPrice.toLocaleString('en-IN')}
                    </p>
                    <input
                      type="range"
                      min="500"
                      max="50000"
                      step="500"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                      className="w-full accent-[#0A4C83] h-1.5 bg-[#E8E2D5] rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Availability */}
                  <div className="pt-4 border-t border-[#C59239]/20">
                    <h3 className="font-dm font-bold text-xs uppercase tracking-wider text-[#221508] mb-3">
                      Availability
                    </h3>
                    <div className="space-y-2 text-xs font-dm text-[#3D2619]">
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="drawer-avail"
                          checked={availability === 'all'}
                          onChange={() => setAvailability('all')}
                          className="w-4 h-4 accent-[#0A4C83]"
                        />
                        <span>All Items</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="radio"
                          name="drawer-avail"
                          checked={availability === 'in-stock'}
                          onChange={() => setAvailability('in-stock')}
                          className="w-4 h-4 accent-[#0A4C83]"
                        />
                        <span>In Stock Only</span>
                      </label>
                    </div>
                  </div>

                </div>

                {/* Apply Button */}
                <div className="p-4 border-t border-[#C59239]/20 bg-white/80">
                  <button
                    type="button"
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="w-full py-3 bg-[#0A4C83] hover:bg-[#073863] text-white rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-98"
                  >
                    Apply Filters ({filteredProducts.length} Results)
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* 9. SLIDE-OVER WISHLIST DRAWER                            */}
      {/* ======================================================== */}
      <WishlistDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        wishlistItems={wishlistedProducts}
        onRemoveFromWishlist={toggleWishlist}
        onMoveToCart={(prod) => {
          handleAddToCartClick(prod);
          showToast(`Moved "${prod.title}" to sacred basket.`);
        }}
        onSelectProduct={(prod) => handleSelectProduct(prod)}
      />

      {/* ======================================================== */}
      {/* 10. FLOATING TOAST NOTIFICATION                          */}
      {/* ======================================================== */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto bg-[#221508] border border-[#C59239] text-[#FEFBF2] px-5 py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <span className="text-[#E4B968]">✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
};
