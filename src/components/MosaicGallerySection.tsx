import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause,
  Sparkles, 
  Eye, 
  Share2, 
  Maximize2,
  X,
  Compass,
  Heart,
  Volume2,
  VolumeX,
  Check
} from 'lucide-react';

export interface PolaroidCard {
  id: string;
  chapterId: string;
  title: string;
  location: string;
  image: string;
  rotation: string; // e.g. '-rotate-3', 'rotate-4'
  widthClass?: string;
  heightClass?: string;
  note?: {
    text: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
    arrowType: 'curve-down-right' | 'curve-up-right' | 'curve-down-left' | 'curve-up-left' | 'loop-right' | 'arc-down';
    customOffset?: string;
  };
  subtitle?: string;
  views?: string;
  isVideo?: boolean;
  videoUrl?: string;
  creator?: string;
}

export interface GalleryChapter {
  id: string;
  title: string;
  tagline: string;
  storyHeading: string;
  storyBody: string;
  locationBadge: string;
  thumbnail: string;
  ctaText: string;
  ctaSubtext?: string;
  ctaService: 'travel' | 'mall';
  cards: PolaroidCard[];
}

export const GALLERY_CHAPTERS: GalleryChapter[] = [
  {
    id: 'kashi',
    title: 'Kashi Moksha Yatra',
    tagline: 'Varanasi Yatra Package',
    storyHeading: 'Creator reels from Kashi.',
    storyBody: 'Watch authentic creator reels documenting the 3-day Consecrated Kashi Moksha package—from private dawn bajra boats to priority Vishwanath Darshan and street walks.',
    locationBadge: 'Varanasi Yatra Package • 3D / 2N',
    thumbnail: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=300&q=80',
    ctaText: 'Film This Yatra with HOS',
    ctaSubtext: 'Sponsored Stay, Priority Darshan & Creator Honorarium',
    ctaService: 'travel',
    cards: [
      {
        id: 'kashi-1',
        chapterId: 'kashi',
        title: 'Dawn Ganga Aarti from Bajra',
        location: 'Assi to Dashashwamedh',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[3.5deg]',
        widthClass: 'w-[200px] sm:w-[240px] md:w-[260px]',
        heightClass: 'h-[270px] sm:h-[320px] md:h-[350px]',
        note: {
          text: 'Exclusive VIP Bajra at 5 AM',
          position: 'top-center',
          arrowType: 'arc-down',
          customOffset: '-top-10 sm:-top-12 left-2'
        },
        subtitle: 'Creator Ayush reviewing the package dawn private boat itinerary',
        views: '184K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        creator: '@ayush_travels'
      },
      {
        id: 'kashi-2',
        chapterId: 'kashi',
        title: 'Heritage Stay Room Tour',
        location: 'BrijRama Palace Stay',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[4.5deg]',
        widthClass: 'w-[190px] sm:w-[230px] md:w-[250px]',
        heightClass: 'h-[250px] sm:h-[300px] md:h-[330px]',
        subtitle: 'Unboxing room hospitality & sacred Welcome kit on our tour',
        views: '142K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        creator: '@ayush_travels'
      },
      {
        id: 'kashi-3',
        chapterId: 'kashi',
        title: 'VIP Vishwanath Sparsh Darshan',
        location: 'Kashi Vishwanath Corridor',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[2.5deg]',
        widthClass: 'w-[210px] sm:w-[250px] md:w-[275px]',
        heightClass: 'h-[280px] sm:h-[330px] md:h-[365px]',
        note: {
          text: 'Zero-queue sacred entry!',
          position: 'bottom-left',
          arrowType: 'curve-up-right',
          customOffset: '-bottom-12 sm:-bottom-14 -left-12 sm:-left-16'
        },
        subtitle: 'Experiencing the sacred Rudrabhishek included with the tour',
        views: '320K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        creator: '@kashi_creator_vlogs'
      },
      {
        id: 'kashi-4',
        chapterId: 'kashi',
        title: 'Banarasi Thali Food Walk',
        location: 'Old Vishwanath Gali',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[3deg]',
        widthClass: 'w-[220px] sm:w-[260px] md:w-[280px]',
        heightClass: 'h-[260px] sm:h-[310px] md:h-[340px]',
        note: {
          text: 'Curated culinaries & sweets',
          position: 'top-right',
          arrowType: 'curve-down-left',
          customOffset: '-top-11 sm:-top-13 right-0'
        },
        subtitle: 'Guided tasting reel through 400-year-old traditional sweet makers',
        views: '210K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        creator: '@ayush_travels'
      }
    ]
  },
  {
    id: 'kedarnath',
    title: 'Kedarnath Heli Yatra',
    tagline: 'Himalayan Luxury Pilgrimage',
    storyHeading: 'Creator reels from Kedar.',
    storyBody: 'Creator Priya shares real vlog reels of the Kedarnath Helicopter & Luxury Swiss Camp experience—from charter takeoff to fast-track sanctum darshan.',
    locationBadge: 'Kedarnath Package • 4D / 3N Charter',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
    ctaText: 'Apply to Vlog Kedarnath Heli Yatra',
    ctaSubtext: 'Sponsored Chopper Expedition, Alpine Camps & Production Support',
    ctaService: 'travel',
    cards: [
      {
        id: 'kedar-1',
        chapterId: 'kedarnath',
        title: 'Helicopter Flight Over Valley',
        location: 'Phata to Kedarnath Helipad',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[4deg]',
        widthClass: 'w-[200px] sm:w-[240px] md:w-[265px]',
        heightClass: 'h-[270px] sm:h-[320px] md:h-[355px]',
        note: {
          text: '7-minute scenic flight!',
          position: 'top-center',
          arrowType: 'arc-down',
          customOffset: '-top-10 sm:-top-12 left-1'
        },
        subtitle: 'Priya filming the aerial views of snow-capped Garhwal glaciers',
        views: '275K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        creator: '@priya_himalayan'
      },
      {
        id: 'kedar-2',
        chapterId: 'kedarnath',
        title: 'Heated Luxury Alpine Camps',
        location: 'Kedarnath Luxury Base',
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[3.5deg]',
        widthClass: 'w-[195px] sm:w-[235px] md:w-[255px]',
        heightClass: 'h-[255px] sm:h-[305px] md:h-[335px]',
        subtitle: 'Reviewing hot water, oxygen setup & luxury bedding at 11,000 ft',
        views: '190K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        creator: '@priya_himalayan'
      },
      {
        id: 'kedar-3',
        chapterId: 'kedarnath',
        title: 'VIP Gate Fast-Track Darshan',
        location: 'Sanctum Jyotirlinga Gate',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[3deg]',
        widthClass: 'w-[210px] sm:w-[250px] md:w-[275px]',
        heightClass: 'h-[280px] sm:h-[330px] md:h-[365px]',
        note: {
          text: 'Private Panditji escorted entry',
          position: 'bottom-left',
          arrowType: 'curve-up-right',
          customOffset: '-bottom-12 sm:-bottom-14 -left-10 sm:-left-14'
        },
        subtitle: 'Bypassing the 6-hour cold queue through our priority package pass',
        views: '410K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        creator: '@shiv_yatri'
      },
      {
        id: 'kedar-4',
        chapterId: 'kedarnath',
        title: 'Pony & Palki Elder Assistance Reel',
        location: 'Above Kedarnath Valley',
        image: 'https://images.unsplash.com/photo-1512290900672-1f55b99a099a?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[4deg]',
        widthClass: 'w-[215px] sm:w-[255px] md:w-[275px]',
        heightClass: 'h-[260px] sm:h-[310px] md:h-[340px]',
        note: {
          text: 'Pony/Doli service tested',
          position: 'top-right',
          arrowType: 'curve-down-left',
          customOffset: '-top-11 sm:-top-13 right-2'
        },
        subtitle: 'Reviewing our senior-friendly pony & palki arrangement for pilgrims',
        views: '230K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
        creator: '@priya_himalayan'
      }
    ]
  },
  {
    id: 'vrindavan',
    title: 'Braj 84 Kos Circuit',
    tagline: 'Mathura & Vrindavan Parikrama',
    storyHeading: 'Creator reels from Braj.',
    storyBody: 'Creator Mohit documents the 4-day Braj Chaurasi Kos Pilgrimage in reels—featuring private AC transport, VIP Bankey Bihari darshan slots, and ashram stays.',
    locationBadge: 'Braj Yatra Package • 4D / 3N Full Circuit',
    thumbnail: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=300&q=80',
    ctaText: 'Co-Create Braj Parikrama Reels',
    ctaSubtext: 'Dedicated Chauffeur, Ashram Living & Content Honorarium',
    ctaService: 'travel',
    cards: [
      {
        id: 'vrin-1',
        chapterId: 'vrindavan',
        title: 'VIP Bankey Bihari Chhappan Bhog',
        location: 'Vrindavan Dham',
        image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[3.5deg]',
        widthClass: 'w-[200px] sm:w-[240px] md:w-[260px]',
        heightClass: 'h-[270px] sm:h-[320px] md:h-[350px]',
        note: {
          text: 'No-rush deity darshan',
          position: 'top-center',
          arrowType: 'arc-down',
          customOffset: '-top-10 sm:-top-12 left-1'
        },
        subtitle: 'Creator Mohit reviewing the dedicated family escort darshan service',
        views: '350K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        creator: '@mohit_braj_yatri'
      },
      {
        id: 'vrin-2',
        chapterId: 'vrindavan',
        title: 'Yamuna Sunset Aarti on Private Boat',
        location: 'Kesi Ghat to Vishram Ghat',
        image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[4deg]',
        widthClass: 'w-[195px] sm:w-[235px] md:w-[255px]',
        heightClass: 'h-[250px] sm:h-[300px] md:h-[330px]',
        subtitle: 'Exclusive floral diyas & Vedic pandits onboard for private havan',
        views: '165K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        creator: '@mohit_braj_yatri'
      },
      {
        id: 'vrin-3',
        chapterId: 'vrindavan',
        title: 'E-Cart Govardhan Parikrama',
        location: 'Govardhan Hill Trail',
        image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[2.5deg]',
        widthClass: 'w-[210px] sm:w-[250px] md:w-[275px]',
        heightClass: 'h-[280px] sm:h-[330px] md:h-[365px]',
        note: {
          text: 'Comfortable E-cart 21km round',
          position: 'bottom-left',
          arrowType: 'curve-up-right',
          customOffset: '-bottom-12 sm:-bottom-14 -left-12 sm:-left-16'
        },
        subtitle: 'Testing our effortless 21km Parikrama vehicle designed for elders',
        views: '290K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        creator: '@vrindavan_reels'
      },
      {
        id: 'vrin-4',
        chapterId: 'vrindavan',
        title: 'Radha Kund & Sacred Ashram Stay',
        location: 'Govardhan Retreat',
        image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[3.5deg]',
        widthClass: 'w-[215px] sm:w-[255px] md:w-[275px]',
        heightClass: 'h-[260px] sm:h-[310px] md:h-[340px]',
        note: {
          text: 'Pure satvik prasad buffet',
          position: 'top-right',
          arrowType: 'curve-down-left',
          customOffset: '-top-11 sm:-top-13 right-1'
        },
        subtitle: 'A review of the organic cow ghee meals and peaceful garden cottages',
        views: '195K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        creator: '@mohit_braj_yatri'
      }
    ]
  },
  {
    id: 'chola',
    title: 'Dakshin Grand Temple Circuit',
    tagline: 'Madurai & Rameshwaram Package',
    storyHeading: 'Creator reels from Tamil Nadu.',
    storyBody: 'Creator Ananya captures the 6-day Divine South Package in immersive reels—including 22 holy wells bath, Madurai Meenakshi special entry, and beach transfers.',
    locationBadge: 'South Temple Package • 6D / 5N Tour',
    thumbnail: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=300&q=80',
    ctaText: 'Film South Temple Circuits',
    ctaSubtext: 'Dedicated Historian Guide, Coastal Stays & Creator Royalties',
    ctaService: 'travel',
    cards: [
      {
        id: 'chola-1',
        chapterId: 'chola',
        title: '22 Holy Theerthams Snan Review',
        location: 'Ramanathaswamy Temple',
        image: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[4deg]',
        widthClass: 'w-[205px] sm:w-[245px] md:w-[270px]',
        heightClass: 'h-[275px] sm:h-[325px] md:h-[360px]',
        note: {
          text: 'Guided ritual without rush',
          position: 'top-center',
          arrowType: 'arc-down',
          customOffset: '-top-10 sm:-top-12 left-2'
        },
        subtitle: 'Creator Ananya reviewing our private guide assisting the 22-well snan',
        views: '380K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        creator: '@ananya_temples'
      },
      {
        id: 'chola-2',
        chapterId: 'chola',
        title: 'Madurai Meenakshi Fast-Track Pass',
        location: 'Madurai Gopuram Corridor',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[3.5deg]',
        widthClass: 'w-[195px] sm:w-[235px] md:w-[255px]',
        heightClass: 'h-[250px] sm:h-[300px] md:h-[330px]',
        subtitle: 'Exclusive special ticket counters and heritage archaeologist narration',
        views: '240K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        creator: '@ananya_temples'
      },
      {
        id: 'chola-3',
        chapterId: 'chola',
        title: 'Dhanushkodi Ram Setu Point Safari',
        location: 'Land’s End, Rameshwaram',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[3deg]',
        widthClass: 'w-[210px] sm:w-[250px] md:w-[275px]',
        heightClass: 'h-[280px] sm:h-[330px] md:h-[365px]',
        note: {
          text: '4x4 Beach Cruiser ride',
          position: 'bottom-left',
          arrowType: 'curve-up-right',
          customOffset: '-bottom-12 sm:-bottom-14 -left-12 sm:-left-16'
        },
        subtitle: 'Our private offroad transfer along the pristine confluence of two seas',
        views: '315K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
        creator: '@south_yatra_logs'
      },
      {
        id: 'chola-4',
        chapterId: 'chola',
        title: 'Brihadeeswara Sunset Heritage Walk',
        location: 'Thanjavur Palace & Temple',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[4deg]',
        widthClass: 'w-[220px] sm:w-[260px] md:w-[280px]',
        heightClass: 'h-[260px] sm:h-[310px] md:h-[340px]',
        note: {
          text: 'Vedic history storytelling',
          position: 'top-right',
          arrowType: 'curve-down-left',
          customOffset: '-top-11 sm:-top-13 right-2'
        },
        subtitle: 'Tourists and creators enjoying golden hour acoustics in stone halls',
        views: '260K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        creator: '@ananya_temples'
      }
    ]
  }
];

// Hand-drawn SVG Arrow Components
const HandDrawnArrow: React.FC<{ type: string; className?: string }> = ({ type, className = '' }) => {
  switch (type) {
    case 'arc-down':
      return (
        <svg viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-8 sm:w-10 h-6 sm:h-8 ${className}`}>
          <path 
            d="M 6 4 C 18 2, 34 8, 38 28 M 38 28 L 29 23 M 38 28 L 44 20" 
            stroke="#4A3B32" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      );
    case 'curve-up-right':
      return (
        <svg viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-10 sm:w-12 h-7 sm:h-9 ${className}`}>
          <path 
            d="M 6 38 C 14 36, 32 30, 48 10 M 48 10 L 36 12 M 48 10 L 46 22" 
            stroke="#4A3B32" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      );
    case 'curve-down-left':
      return (
        <svg viewBox="0 0 55 45" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-9 sm:w-11 h-7 sm:h-9 ${className}`}>
          <path 
            d="M 48 6 C 36 12, 22 24, 12 36 M 12 36 L 24 35 M 12 36 L 15 24" 
            stroke="#4A3B32" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg" className={`w-8 sm:w-10 h-6 sm:h-7 ${className}`}>
          <path 
            d="M 6 6 C 20 10, 32 18, 40 28 M 40 28 L 30 26 M 40 28 L 38 18" 
            stroke="#4A3B32" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      );
  }
};

export interface MosaicGallerySectionProps {
  onSelectItem?: (item: PolaroidCard) => void;
  onNavigateTravel?: () => void;
  onNavigateMall?: () => void;
  onNavigateJoin?: () => void;
}

export const MosaicGallerySection: React.FC<MosaicGallerySectionProps> = ({ 
  onSelectItem,
  onNavigateTravel,
  onNavigateMall,
  onNavigateJoin
}) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<PolaroidCard | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);
  const [pausedCardIds, setPausedCardIds] = useState<Set<string>>(new Set());
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const activeChapter = GALLERY_CHAPTERS[activeChapterIndex] || GALLERY_CHAPTERS[0];

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 2500);
  };

  // Keep videos autoplaying smoothly unless paused by the user
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, vid]) => {
      const videoEl = vid as HTMLVideoElement | null;
      if (videoEl && !pausedCardIds.has(id)) {
        videoEl.play().catch(() => {});
      }
    });
  }, [pausedCardIds]);

  // Click handler: videos pause on click, non-videos open lightbox
  const handleCardClick = (card: PolaroidCard, e: React.MouseEvent) => {
    if (card.isVideo && card.videoUrl) {
      e.stopPropagation();
      const vid = videoRefs.current[card.id];
      if (!vid) return;

      if (vid.paused) {
        vid.play().catch(() => {});
        setPausedCardIds((prev) => {
          const next = new Set(prev);
          next.delete(card.id);
          return next;
        });
        triggerToast(`Playing • ${card.title}`);
      } else {
        vid.pause();
        setPausedCardIds((prev) => new Set(prev).add(card.id));
        triggerToast(`Paused • ${card.title}`);
      }
    } else {
      setSelectedCard(card);
    }
  };

  // Check scroll position to update active chapter in scrubber
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    
    let foundIndex = 0;
    GALLERY_CHAPTERS.forEach((chapter, idx) => {
      const el = chapterRefs.current[chapter.id];
      if (el) {
        const offset = el.offsetLeft - 150;
        if (scrollLeft >= offset) {
          foundIndex = idx;
        }
      }
    });
    setActiveChapterIndex(foundIndex);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to a chapter when clicked from pill scrubber
  const scrollToChapter = (chapterId: string) => {
    const target = chapterRefs.current[chapterId];
    if (target && scrollContainerRef.current) {
      const containerLeft = scrollContainerRef.current.getBoundingClientRect().left;
      const targetLeft = target.getBoundingClientRect().left;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = currentScroll + (targetLeft - containerLeft) - 60;
      scrollContainerRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    }
  };

  // Drag-to-scroll interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  // Wheel horizontal scroll support
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollContainerRef.current && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      scrollContainerRef.current.scrollLeft += e.deltaY * 0.9;
    }
  };

  const scrollByOffset = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Reusable Polaroid Card with Video Autoplay and Click-to-Pause
  // Reusable Vertical Video Reel Card with Autoplay and Click-to-Pause
  const renderPolaroidCard = (
    card: PolaroidCard,
    zIndexClass: string,
    extraWrapperClass = ''
  ) => {
    const isPaused = pausedCardIds.has(card.id);

    return (
      <div
        key={card.id}
        onClick={(e) => handleCardClick(card, e)}
        className={`relative ${zIndexClass} group cursor-pointer transition-transform duration-400 hover:z-40 hover:scale-105 ${card.rotation} ${extraWrapperClass}`}
        title={isPaused ? 'Click to play reel' : 'Click to pause reel'}
      >
        {/* Floating Handwritten Note with Doodle Arrow */}
        {card.note && (
          <div className={`absolute ${card.note.customOffset || '-top-10 left-2'} z-30 pointer-events-none flex flex-col items-center whitespace-nowrap`}>
            {card.note.position.startsWith('bottom') ? (
              <>
                <HandDrawnArrow type={card.note.arrowType} className="mb-0.5 opacity-85 text-[#221508]" />
                <span className="font-script text-lg sm:text-xl md:text-2xl text-[#221508] tracking-wide font-medium drop-shadow-xs">
                  {card.note.text}
                </span>
              </>
            ) : (
              <>
                <span className="font-script text-lg sm:text-xl md:text-2xl text-[#221508] tracking-wide font-medium drop-shadow-xs">
                  {card.note.text}
                </span>
                <HandDrawnArrow type={card.note.arrowType} className="mt-0.5 opacity-85 text-[#221508]" />
              </>
            )}
          </div>
        )}

        {/* 9:16 Vertical Video Reel Phone Card */}
        <div className="w-[195px] sm:w-[225px] md:w-[245px] h-[345px] sm:h-[400px] md:h-[435px] rounded-[24px] sm:rounded-[28px] p-2 sm:p-2.5 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:shadow-[0_22px_50px_rgba(0,0,0,0.22)] border border-stone-200/70 transition-all duration-300 group-hover:shadow-[0_30px_65px_rgba(0,0,0,0.28)]">
          <div 
            className="w-full h-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#1A1612] relative select-none"
            style={{
              borderRadius: 'inherit',
              WebkitMaskImage: '-webkit-radial-gradient(white, black)',
              maskImage: 'radial-gradient(white, black)',
              overflow: 'hidden',
              isolation: 'isolate'
            }}
          >
            {/* Always mounted base poster so no white/black gap exists */}
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover select-none"
              style={{ borderRadius: 'inherit' }}
              loading="lazy"
            />

            {/* Autoplaying Loop Video */}
            <video
              ref={(el) => {
                if (el) {
                  videoRefs.current[card.id] = el;
                  if (!pausedCardIds.has(card.id)) {
                    el.play().catch(() => {});
                  }
                }
              }}
              src={card.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
              poster={card.image}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{
                borderRadius: 'inherit',
                WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                maskImage: 'radial-gradient(white, black)'
              }}
            />

            {/* Video Paused State Indicator */}
            {isPaused && (
              <div className="absolute inset-0 bg-black/45 backdrop-blur-[1.5px] flex flex-col items-center justify-center transition-all duration-300 pointer-events-none z-20">
                <div className="w-12 h-12 rounded-full bg-white text-[#221508] flex items-center justify-center shadow-xl mb-1.5 transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5 text-[#FE7613]" />
                </div>
                <span className="text-[10px] font-dm font-bold text-white px-2.5 py-0.5 rounded-full bg-black/70 border border-white/20 shadow-xs">
                  Paused &bull; Click to play
                </span>
              </div>
            )}

            {/* Top Reel Badges (Always Visible like Instagram/TikTok Reels) */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-20 pointer-events-none flex items-center justify-between">
              {/* Creator Pill */}
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md text-[9.5px] font-dm font-bold text-white border border-white/20 shadow-xs">
                <span className="text-amber-400">✦</span>
                <span className="truncate max-w-[100px]">{card.creator || '@sanatana_creator'}</span>
              </div>

              {/* Reel Live Pulse Badge */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-dm text-amber-200 border border-amber-300/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Reel</span>
              </div>
            </div>

            {/* Bottom Gradient & Reel Info Bar (Always visible with clear Reel branding) */}
            <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10 flex items-end justify-between text-white pointer-events-none">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[9.5px] font-dm uppercase tracking-wider font-bold text-amber-300 truncate">
                    {card.location}
                  </span>
                  {card.views && (
                    <span className="text-[9px] font-dm text-white/70 flex items-center gap-0.5">
                      &bull; {card.views}
                    </span>
                  )}
                </div>
                <h4 className="font-cormorant text-sm sm:text-base font-bold line-clamp-1 leading-snug text-white">
                  {card.title}
                </h4>
                <span className="text-[8.5px] font-dm text-white/70 block mt-0.5 truncate">
                  {isPaused ? '▶ Click to resume' : '❚❚ Click to pause'}
                </span>
              </div>

              {/* Expand / Lightbox Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCard(card);
                }}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer shadow-md shrink-0 backdrop-blur-xs pointer-events-auto active:scale-90"
                title="Watch Fullscreen Reel"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full py-12 sm:py-16 bg-[#FEFBF2] overflow-hidden select-none">
      
      {/* 1. TOP MINIMAL HEADER BAR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between mb-4 sm:mb-6">
        
        {/* Left: Playful Organic Icon / Script Mark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#C59239]/20 flex items-center justify-center text-[#C59239]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-script text-2xl sm:text-3xl text-[#221508] tracking-tight">
            Creator Travel Reels
          </span>
        </div>

        {/* Right: Minimal Pill Buttons ("Share", Avatar Pill) */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              triggerToast('Link copied to clipboard');
            }}
            className="px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#3D2619] hover:text-[#221508] text-xs font-dm font-medium border border-[#C59239]/30 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span>Share</span>
          </button>

          {/* User / House Avatar Pill */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FE7613] to-[#C59239] border-2 border-white shadow-2xs flex items-center justify-center text-white text-[10px] font-bold">
            ॐ
          </div>
        </div>

      </div>

      {/* 2. HORIZONTAL SCRAPBOOK STAGE */}
      <div className="relative w-full">
        
        {/* Left Floating Chevron Nav */}
        <button
          type="button"
          onClick={() => scrollByOffset(-480)}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 text-[#221508] shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-[#C59239]/30 hover:bg-[#221508] hover:text-white items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-95"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Floating Chevron Nav */}
        <button
          type="button"
          onClick={() => scrollByOffset(480)}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 text-[#221508] shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-[#C59239]/30 hover:bg-[#221508] hover:text-white items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-95"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Horizontal Scroll Canvas */}
        <div
          ref={scrollContainerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className="w-full overflow-x-auto no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing px-6 sm:px-14 md:px-24 py-12 sm:py-16"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="inline-flex items-center gap-12 sm:gap-20 md:gap-28 min-w-max">

            {GALLERY_CHAPTERS.map((chapter) => (
              <div
                key={chapter.id}
                ref={(el) => (chapterRefs.current[chapter.id] = el)}
                className="inline-flex items-center gap-8 sm:gap-14 md:gap-18 shrink-0"
              >
                
                {/* --- PHOTO CARDS GROUP (Left Cluster of 2-3 overlapping polaroids) --- */}
                <div className="relative flex items-center -space-x-8 sm:-space-x-12 md:-space-x-16 py-8">
                  {chapter.cards[0] && renderPolaroidCard(chapter.cards[0], 'z-10')}
                  {chapter.cards[1] && renderPolaroidCard(chapter.cards[1], 'z-20')}
                  {chapter.cards[2] && renderPolaroidCard(chapter.cards[2], 'z-30')}
                </div>

                {/* --- EDITORIAL STORY BLOCK WITH DEDICATED SERVICE CTA --- */}
                <div className="w-[280px] sm:w-[340px] md:w-[400px] shrink-0 text-left px-2 sm:px-4">
                  <span className="text-[11px] sm:text-xs font-dm font-bold uppercase tracking-widest text-[#C59239] block mb-2">
                    ✦ {chapter.locationBadge}
                  </span>
                  
                  <h3 className="font-cormorant text-3xl sm:text-4xl md:text-[42px] font-medium text-[#221508] leading-[1.15] mb-3 tracking-tight">
                    {chapter.storyHeading}
                  </h3>

                  <p className="font-cormorant text-lg sm:text-xl md:text-[22px] text-[#3D2619] leading-[1.4] font-normal">
                    {chapter.storyBody}
                  </p>

                  {/* Dedicated CTA Button Related to This Service */}
                  <div className="mt-5 sm:mt-6 flex flex-col items-start gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigateJoin) {
                          onNavigateJoin();
                        } else if (chapter.ctaService === 'mall') {
                          onNavigateMall?.();
                        } else {
                          onNavigateTravel?.();
                        }
                      }}
                      className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#221508] hover:bg-[#FE7613] text-[#FEFBF2] text-xs font-dm font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 group cursor-pointer"
                    >
                      <span>{chapter.ctaText}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#E4B968]" />
                    </button>
                    {chapter.ctaSubtext && (
                      <span className="text-[11px] font-dm text-[#3D2619] tracking-wide ml-1">
                        ✦ {chapter.ctaSubtext}
                      </span>
                    )}
                  </div>
                </div>

                {/* --- RIGHT PHOTO CARD --- */}
                {chapter.cards[3] && (
                  <div className="relative py-8">
                    {renderPolaroidCard(chapter.cards[3], 'z-20')}
                  </div>
                )}

              </div>
            ))}

          </div>
        </div>

      </div>


      {/* 4. LIGHTBOX PREVIEW MODAL */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#221508] text-[#FEFBF2] rounded-3xl overflow-hidden border border-[#C59239]/40 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                {selectedCard.isVideo ? (
                  <video
                    src={selectedCard.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#98555E]/20 text-[#FE7613] text-xs font-dm font-bold uppercase tracking-wider">
                    {selectedCard.location}
                  </span>
                  {selectedCard.views && (
                    <div className="flex items-center gap-1.5 text-xs text-white/60">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{selectedCard.views} views</span>
                    </div>
                  )}
                </div>

                <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white">
                  {selectedCard.title}
                </h3>
                <p className="font-dm text-xs sm:text-sm text-stone-300 mt-1">
                  {selectedCard.subtitle}
                </p>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/60 font-dm">
                    House of Sanatan • Sacred Yatra Package Creator Archives
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      triggerToast('Link copied to clipboard');
                      setSelectedCard(null);
                    }}
                    className="px-4 py-2 rounded-full bg-[#FE7613] hover:bg-[#e0650d] text-white text-xs font-dm font-bold transition-all cursor-pointer"
                  >
                    Share Archive
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      {toastText && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#221508] text-white px-5 py-2.5 rounded-full text-xs font-dm shadow-xl border border-[#C59239]/40 flex items-center gap-2 animate-fadeIn pointer-events-none">
          <Check className="w-3.5 h-3.5 text-[#FE7613]" />
          <span>{toastText}</span>
        </div>
      )}

    </section>
  );
};
