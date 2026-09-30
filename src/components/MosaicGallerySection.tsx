import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
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
}

export interface GalleryChapter {
  id: string;
  title: string;
  tagline: string;
  storyHeading: string;
  storyBody: string;
  locationBadge: string;
  thumbnail: string;
  cards: PolaroidCard[];
}

export const GALLERY_CHAPTERS: GalleryChapter[] = [
  {
    id: 'kashi',
    title: 'Sacred Kashi',
    tagline: 'Varanasi',
    storyHeading: 'A day in Kashi.',
    storyBody: 'Varanasi offers profound stillness of timeless ghats, turquoise morning waters, sacred temple bells, and eternal reverberations of Shiva.',
    locationBadge: 'Uttar Pradesh',
    thumbnail: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=300&q=80',
    cards: [
      {
        id: 'kashi-1',
        chapterId: 'kashi',
        title: 'Dawn on the Ganges',
        location: 'Assi Ghat, Varanasi',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[3.5deg]',
        widthClass: 'w-[200px] sm:w-[240px] md:w-[260px]',
        heightClass: 'h-[270px] sm:h-[320px] md:h-[350px]',
        note: {
          text: 'Lakes at 5 in the morning',
          position: 'top-center',
          arrowType: 'arc-down',
          customOffset: '-top-10 sm:-top-12 left-2'
        },
        subtitle: 'Subah-e-Banaras morning boat ride on holy waters',
        views: '184K'
      },
      {
        id: 'kashi-2',
        chapterId: 'kashi',
        title: 'Turquoise River Waters',
        location: 'Chet Singh Ghat',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[4.5deg]',
        widthClass: 'w-[190px] sm:w-[230px] md:w-[250px]',
        heightClass: 'h-[250px] sm:h-[300px] md:h-[330px]',
        subtitle: 'Sacred riverbanks reflecting ancient stone bastions',
        views: '142K'
      },
      {
        id: 'kashi-3',
        chapterId: 'kashi',
        title: 'Evening Akhand Jyot',
        location: 'Dashashwamedh Ghat',
        image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[2.5deg]',
        widthClass: 'w-[210px] sm:w-[250px] md:w-[275px]',
        heightClass: 'h-[280px] sm:h-[330px] md:h-[365px]',
        note: {
          text: 'Roadtrip to the Ghats',
          position: 'bottom-left',
          arrowType: 'curve-up-right',
          customOffset: '-bottom-12 sm:-bottom-14 -left-12 sm:-left-16'
        },
        subtitle: 'Golden brass aarti lamps offered to Mother Ganga',
        views: '320K',
        isVideo: true,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        id: 'kashi-4',
        chapterId: 'kashi',
        title: 'Twilight Boat Crossing',
        location: 'Panchganga Ghat',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[3deg]',
        widthClass: 'w-[220px] sm:w-[260px] md:w-[280px]',
        heightClass: 'h-[260px] sm:h-[310px] md:h-[340px]',
        note: {
          text: 'walking into the old city',
          position: 'top-right',
          arrowType: 'curve-down-left',
          customOffset: '-top-11 sm:-top-13 right-0'
        },
        subtitle: 'Narrow galis scented with sandalwood and fresh jasmine',
        views: '210K'
      }
    ]
  },
  {
    id: 'kedarnath',
    title: 'Kedarnath Sanctum',
    tagline: 'Garhwal Himalayas',
    storyHeading: 'Echoes of Kedarnath.',
    storyBody: 'The high Himalayas unveil the sacred abode of Mahadev—crystalline glacial winds, stone sanctums carved in granite, and uninterrupted dhyana.',
    locationBadge: 'Uttarakhand',
    thumbnail: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=300&q=80',
    cards: [
      {
        id: 'kedar-1',
        chapterId: 'kedarnath',
        title: 'Snow Peaks at First Light',
        location: 'Kedar Dome, 6831m',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[4deg]',
        widthClass: 'w-[200px] sm:w-[240px] md:w-[265px]',
        heightClass: 'h-[270px] sm:h-[320px] md:h-[355px]',
        note: {
          text: 'Glacial peak at 6 in the morning',
          position: 'top-center',
          arrowType: 'arc-down',
          customOffset: '-top-10 sm:-top-12 left-1'
        },
        subtitle: 'Golden sunrise piercing through Himalayan mist',
        views: '275K'
      },
      {
        id: 'kedar-2',
        chapterId: 'kedarnath',
        title: 'Mandakini River Trail',
        location: 'Gaurikund to Kedar',
        image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[3.5deg]',
        widthClass: 'w-[195px] sm:w-[235px] md:w-[255px]',
        heightClass: 'h-[255px] sm:h-[305px] md:h-[335px]',
        subtitle: 'Roaring alpine streams flowing along the pilgrim path',
        views: '190K'
      },
      {
        id: 'kedar-3',
        chapterId: 'kedarnath',
        title: 'Granite Temple Spire',
        location: 'Jyotirlinga Sanctum',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[3deg]',
        widthClass: 'w-[210px] sm:w-[250px] md:w-[275px]',
        heightClass: 'h-[280px] sm:h-[330px] md:h-[365px]',
        note: {
          text: 'Trek through pine & snow',
          position: 'bottom-left',
          arrowType: 'curve-up-right',
          customOffset: '-bottom-12 sm:-bottom-14 -left-10 sm:-left-14'
        },
        subtitle: '8th-century stone masonry standing resilient against time',
        views: '410K'
      },
      {
        id: 'kedar-4',
        chapterId: 'kedarnath',
        title: 'Evening Dhyana in Snow',
        location: 'Bhairavnath Peak',
        image: 'https://images.unsplash.com/photo-1512290900672-1f55b99a099a?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[4deg]',
        widthClass: 'w-[215px] sm:w-[255px] md:w-[275px]',
        heightClass: 'h-[260px] sm:h-[310px] md:h-[340px]',
        note: {
          text: 'silence under the stars',
          position: 'top-right',
          arrowType: 'curve-down-left',
          customOffset: '-top-11 sm:-top-13 right-2'
        },
        subtitle: 'Pristine Himalayan night sky filled with cosmic constellations',
        views: '230K'
      }
    ]
  },
  {
    id: 'vrindavan',
    title: 'Braj Bhumi',
    tagline: 'Vrindavan',
    storyHeading: 'A morning in Vrindavan.',
    storyBody: 'Braj Bhumi vibrates with pure divine love, fragrant Kadamba groves, melodious flute chants, and consecrated seva across ancient temple courtyards.',
    locationBadge: 'Braj Region',
    thumbnail: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=300&q=80',
    cards: [
      {
        id: 'vrin-1',
        chapterId: 'vrindavan',
        title: 'Sacred Gau Seva',
        location: 'Vedic Goshala, Braj',
        image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[3.5deg]',
        widthClass: 'w-[200px] sm:w-[240px] md:w-[260px]',
        heightClass: 'h-[270px] sm:h-[320px] md:h-[350px]',
        note: {
          text: 'Gomata seva at sunrise',
          position: 'top-center',
          arrowType: 'arc-down',
          customOffset: '-top-10 sm:-top-12 left-1'
        },
        subtitle: 'Feeding consecrated grass to gentle indigenous cows',
        views: '350K'
      },
      {
        id: 'vrin-2',
        chapterId: 'vrindavan',
        title: 'Yamuna Kalindi Ghat',
        location: 'Kesi Ghat',
        image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[4deg]',
        widthClass: 'w-[195px] sm:w-[235px] md:w-[255px]',
        heightClass: 'h-[250px] sm:h-[300px] md:h-[330px]',
        subtitle: 'Golden morning light reflecting over quiet Yamuna ripples',
        views: '165K'
      },
      {
        id: 'vrin-3',
        chapterId: 'vrindavan',
        title: 'Braj Parikrama Trail',
        location: 'Govardhan Hill',
        image: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[2.5deg]',
        widthClass: 'w-[210px] sm:w-[250px] md:w-[275px]',
        heightClass: 'h-[280px] sm:h-[330px] md:h-[365px]',
        note: {
          text: 'Parikrama with sandalwood tilak',
          position: 'bottom-left',
          arrowType: 'curve-up-right',
          customOffset: '-bottom-12 sm:-bottom-14 -left-12 sm:-left-16'
        },
        subtitle: 'Barefoot pilgrimage along the sacred dust of Radha Kund',
        views: '290K'
      },
      {
        id: 'vrin-4',
        chapterId: 'vrindavan',
        title: 'Nidhivan Sanctum Lights',
        location: 'Seva Kunj',
        image: 'https://images.unsplash.com/photo-1608755728617-aefab37d2edd?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[3.5deg]',
        widthClass: 'w-[215px] sm:w-[255px] md:w-[275px]',
        heightClass: 'h-[260px] sm:h-[310px] md:h-[340px]',
        note: {
          text: 'evening temple bells',
          position: 'top-right',
          arrowType: 'curve-down-left',
          customOffset: '-top-11 sm:-top-13 right-1'
        },
        subtitle: 'Sacred tulsi groves resonating with joyful kirtan',
        views: '195K'
      }
    ]
  },
  {
    id: 'chola',
    title: 'Chola Heritage',
    tagline: 'Thanjavur & Madurai',
    storyHeading: 'The Chola Renaissance.',
    storyBody: 'Centuries of sacred geometry, astronomical alignments, and master sculptors immortalized in granite spires that pierce the southern skies.',
    locationBadge: 'Tamil Nadu',
    thumbnail: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=300&q=80',
    cards: [
      {
        id: 'chola-1',
        chapterId: 'chola',
        title: 'Brihadeeswara Granite Spire',
        location: 'Thanjavur Big Temple',
        image: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[4deg]',
        widthClass: 'w-[205px] sm:w-[245px] md:w-[270px]',
        heightClass: 'h-[275px] sm:h-[325px] md:h-[360px]',
        note: {
          text: 'Vimana shadowless at noon',
          position: 'top-center',
          arrowType: 'arc-down',
          customOffset: '-top-10 sm:-top-12 left-2'
        },
        subtitle: '80-tonne monolithic granite cupola installed in 1010 CE',
        views: '380K'
      },
      {
        id: 'chola-2',
        chapterId: 'chola',
        title: 'Madurai Meenakshi Gopuram',
        location: 'Madurai Sanctum',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[3.5deg]',
        widthClass: 'w-[195px] sm:w-[235px] md:w-[255px]',
        heightClass: 'h-[250px] sm:h-[300px] md:h-[330px]',
        subtitle: 'Thousands of stucco deities ascending into azure sky',
        views: '240K'
      },
      {
        id: 'chola-3',
        chapterId: 'chola',
        title: 'Lost-Wax Panchaloha Bronze',
        location: 'Swamimalai Guild',
        image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
        rotation: '-rotate-[3deg]',
        widthClass: 'w-[210px] sm:w-[250px] md:w-[275px]',
        heightClass: 'h-[280px] sm:h-[330px] md:h-[365px]',
        note: {
          text: 'Panchaloha masterwork',
          position: 'bottom-left',
          arrowType: 'curve-up-right',
          customOffset: '-bottom-12 sm:-bottom-14 -left-12 sm:-left-16'
        },
        subtitle: 'Five-metal cosmic Nataraja sculpture consecrated in fire',
        views: '315K'
      },
      {
        id: 'chola-4',
        chapterId: 'chola',
        title: 'Stone Chariot at Sunset',
        location: 'Hampi Vijayanagara',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        rotation: 'rotate-[4deg]',
        widthClass: 'w-[220px] sm:w-[260px] md:w-[280px]',
        heightClass: 'h-[260px] sm:h-[310px] md:h-[340px]',
        note: {
          text: 'carvings of the sun',
          position: 'top-right',
          arrowType: 'curve-down-left',
          customOffset: '-top-11 sm:-top-13 right-2'
        },
        subtitle: 'Wheels aligned to equinox sunrises across centuries',
        views: '260K'
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

interface MosaicGallerySectionProps {
  onSelectItem?: (item: PolaroidCard) => void;
}

export const MosaicGallerySection: React.FC<MosaicGallerySectionProps> = ({ onSelectItem }) => {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState<PolaroidCard | null>(null);
  const [toastText, setToastText] = useState<string | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const activeChapter = GALLERY_CHAPTERS[activeChapterIndex] || GALLERY_CHAPTERS[0];

  const triggerToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 2500);
  };

  // Check scroll position to update active chapter in the scrubber
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    
    // Determine which chapter is in view
    let foundIndex = 0;
    GALLERY_CHAPTERS.forEach((chapter, idx) => {
      const el = chapterRefs.current[chapter.id];
      if (el) {
        const offset = el.offsetLeft - scrollContainerRef.current!.offsetLeft - 300;
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

  // Mouse wheel horizontal scroll
  const handleWheel = (e: React.WheelEvent) => {
    if (!scrollContainerRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      scrollContainerRef.current.scrollLeft += e.deltaY * 0.9;
    }
  };

  // Drag-to-scroll handlers
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

  const scrollToChapter = (chapterId: string, idx: number) => {
    setActiveChapterIndex(idx);
    const targetEl = chapterRefs.current[chapterId];
    if (targetEl && scrollContainerRef.current) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const scrollByOffset = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full py-12 sm:py-16 bg-[#FFF8E7] overflow-hidden select-none">
      
      {/* 1. TOP MINIMAL HEADER BAR (Matching reference header layout) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between mb-4 sm:mb-6">
        
        {/* Left: Playful Organic Icon / Script Mark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#EADCC8]/50 flex items-center justify-center text-[#A66E38]">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-script text-2xl sm:text-3xl text-[#2C241E] tracking-tight">
            Mosaic Gallery
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
            className="px-4 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#4A3B32] hover:text-[#1A1612] text-xs font-dm font-medium border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span>Share</span>
          </button>

          {/* User / House Avatar Pill */}
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#D9A05B] to-[#E8C58D] border-2 border-white shadow-2xs flex items-center justify-center text-white text-[10px] font-bold">
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
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 text-[#2C241E] shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-stone-200/80 hover:bg-[#2C241E] hover:text-white items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-95"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Floating Chevron Nav */}
        <button
          type="button"
          onClick={() => scrollByOffset(480)}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/95 text-[#2C241E] shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-stone-200/80 hover:bg-[#2C241E] hover:text-white items-center justify-center transition-all cursor-pointer backdrop-blur-md active:scale-95"
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
                  
                  {/* Card 1 */}
                  {chapter.cards[0] && (
                    <div 
                      onClick={() => setSelectedCard(chapter.cards[0])}
                      className={`relative z-10 group cursor-pointer transition-transform duration-400 hover:z-40 hover:scale-105 ${chapter.cards[0].rotation}`}
                    >
                      {/* Floating Handwritten Note with Doodle Arrow */}
                      {chapter.cards[0].note && (
                        <div className={`absolute ${chapter.cards[0].note.customOffset || '-top-10 left-2'} z-30 pointer-events-none flex flex-col items-center whitespace-nowrap`}>
                          <span className="font-script text-lg sm:text-xl md:text-2xl text-[#3D312A] tracking-wide font-medium drop-shadow-xs">
                            {chapter.cards[0].note.text}
                          </span>
                          <HandDrawnArrow type={chapter.cards[0].note.arrowType} className="mt-0.5 opacity-85 text-[#3D312A]" />
                        </div>
                      )}

                      {/* Polaroid Photo Frame */}
                      <div className={`${chapter.cards[0].widthClass || 'w-[230px]'} ${chapter.cards[0].heightClass || 'h-[310px]'} rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.14)] sm:shadow-[0_22px_50px_rgba(0,0,0,0.18)] border border-stone-200/60 transition-all duration-300 group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.25)]`}>
                        <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 relative">
                          <img
                            src={chapter.cards[0].image}
                            alt={chapter.cards[0].title}
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[10px] font-dm uppercase tracking-wider block font-bold text-amber-200">
                              {chapter.cards[0].location}
                            </span>
                            <span className="font-cormorant text-sm font-semibold line-clamp-1">
                              {chapter.cards[0].title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 2 (Overlapped slightly behind/adjacent) */}
                  {chapter.cards[1] && (
                    <div 
                      onClick={() => setSelectedCard(chapter.cards[1])}
                      className={`relative z-20 group cursor-pointer transition-transform duration-400 hover:z-40 hover:scale-105 ${chapter.cards[1].rotation}`}
                    >
                      <div className={`${chapter.cards[1].widthClass || 'w-[220px]'} ${chapter.cards[1].heightClass || 'h-[290px]'} rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.14)] sm:shadow-[0_22px_50px_rgba(0,0,0,0.18)] border border-stone-200/60 transition-all duration-300 group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.25)]`}>
                        <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 relative">
                          <img
                            src={chapter.cards[1].image}
                            alt={chapter.cards[1].title}
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[10px] font-dm uppercase tracking-wider block font-bold text-amber-200">
                              {chapter.cards[1].location}
                            </span>
                            <span className="font-cormorant text-sm font-semibold line-clamp-1">
                              {chapter.cards[1].title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card 3 (Foreground tilted card with bottom note) */}
                  {chapter.cards[2] && (
                    <div 
                      onClick={() => setSelectedCard(chapter.cards[2])}
                      className={`relative z-30 group cursor-pointer transition-transform duration-400 hover:z-40 hover:scale-105 ${chapter.cards[2].rotation}`}
                    >
                      {/* Floating Handwritten Note at bottom */}
                      {chapter.cards[2].note && (
                        <div className={`absolute ${chapter.cards[2].note.customOffset || '-bottom-12 -left-12'} z-30 pointer-events-none flex flex-col items-center whitespace-nowrap`}>
                          <HandDrawnArrow type={chapter.cards[2].note.arrowType} className="mb-0.5 opacity-85 text-[#3D312A]" />
                          <span className="font-script text-lg sm:text-xl md:text-2xl text-[#3D312A] tracking-wide font-medium drop-shadow-xs">
                            {chapter.cards[2].note.text}
                          </span>
                        </div>
                      )}

                      <div className={`${chapter.cards[2].widthClass || 'w-[240px]'} ${chapter.cards[2].heightClass || 'h-[330px]'} rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-white shadow-[0_20px_45px_rgba(0,0,0,0.16)] sm:shadow-[0_26px_55px_rgba(0,0,0,0.2)] border border-stone-200/60 transition-all duration-300 group-hover:shadow-[0_30px_65px_rgba(0,0,0,0.28)]`}>
                        <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 relative">
                          <img
                            src={chapter.cards[2].image}
                            alt={chapter.cards[2].title}
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                            loading="lazy"
                          />
                          
                          {chapter.cards[2].isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-11 h-11 rounded-full bg-white/90 text-[#2C241E] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Play className="w-4 h-4 fill-current ml-0.5" />
                              </div>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[10px] font-dm uppercase tracking-wider block font-bold text-amber-200">
                              {chapter.cards[2].location}
                            </span>
                            <span className="font-cormorant text-sm font-semibold line-clamp-1">
                              {chapter.cards[2].title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* --- EDITORIAL STORY BLOCK (Exact style of "A day in Whistler" in reference) --- */}
                <div className="w-[280px] sm:w-[340px] md:w-[400px] shrink-0 text-left px-2 sm:px-4">
                  <span className="text-[11px] sm:text-xs font-dm font-bold uppercase tracking-widest text-[#9E6E45] block mb-2">
                    ✦ {chapter.locationBadge}
                  </span>
                  
                  <h3 className="font-cormorant text-3xl sm:text-4xl md:text-[42px] font-medium text-[#241E1A] leading-[1.15] mb-3 tracking-tight">
                    {chapter.storyHeading}
                  </h3>

                  <p className="font-cormorant text-lg sm:text-xl md:text-[22px] text-[#63574E] leading-[1.4] font-normal">
                    {chapter.storyBody}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCard(chapter.cards[0])}
                      className="inline-flex items-center gap-1.5 text-xs font-dm font-semibold text-[#241E1A] hover:text-[#A66E38] transition-colors cursor-pointer group"
                    >
                      <span>Explore {chapter.title}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>

                {/* --- RIGHT PHOTO CARD (e.g. "walking into town" polaroid) --- */}
                {chapter.cards[3] && (
                  <div className="relative py-8">
                    <div 
                      onClick={() => setSelectedCard(chapter.cards[3])}
                      className={`relative z-20 group cursor-pointer transition-transform duration-400 hover:z-40 hover:scale-105 ${chapter.cards[3].rotation}`}
                    >
                      {/* Floating Handwritten Note on top right */}
                      {chapter.cards[3].note && (
                        <div className={`absolute ${chapter.cards[3].note.customOffset || '-top-11 right-2'} z-30 pointer-events-none flex flex-col items-center whitespace-nowrap`}>
                          <span className="font-script text-lg sm:text-xl md:text-2xl text-[#3D312A] tracking-wide font-medium drop-shadow-xs">
                            {chapter.cards[3].note.text}
                          </span>
                          <HandDrawnArrow type={chapter.cards[3].note.arrowType} className="mt-0.5 opacity-85 text-[#3D312A]" />
                        </div>
                      )}

                      <div className={`${chapter.cards[3].widthClass || 'w-[240px]'} ${chapter.cards[3].heightClass || 'h-[320px]'} rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.14)] sm:shadow-[0_22px_50px_rgba(0,0,0,0.18)] border border-stone-200/60 transition-all duration-300 group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.25)]`}>
                        <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 relative">
                          <img
                            src={chapter.cards[3].image}
                            alt={chapter.cards[3].title}
                            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[10px] font-dm uppercase tracking-wider block font-bold text-amber-200">
                              {chapter.cards[3].location}
                            </span>
                            <span className="font-cormorant text-sm font-semibold line-clamp-1">
                              {chapter.cards[3].title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
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
              className="relative w-full max-w-3xl bg-[#1A1612] text-[#F7F1E5] rounded-3xl overflow-hidden border border-[#D9C6A8]/40 shadow-2xl"
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
                  <span className="px-3 py-1 rounded-full bg-[#E03A2F]/20 text-[#E05244] text-xs font-dm font-bold uppercase tracking-wider">
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
                    House of Sanatan Consecrated Visual Archives
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      triggerToast('Link copied to clipboard');
                      setSelectedCard(null);
                    }}
                    className="px-4 py-2 rounded-full bg-white text-[#1A1612] text-xs font-dm font-bold hover:bg-[#E03A2F] hover:text-white transition-all cursor-pointer"
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1612] text-white px-5 py-2.5 rounded-full text-xs font-dm shadow-xl border border-[#D9C6A8]/40 flex items-center gap-2 animate-fadeIn">
          <Check className="w-3.5 h-3.5 text-[#C7833D]" />
          <span>{toastText}</span>
        </div>
      )}

    </section>
  );
};
