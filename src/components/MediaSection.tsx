import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface MediaItem {
  id: string;
  url: string;
  type: 'image' | 'video';
  title: string;
  subtitle: string;
  category: string;
}

const MEDIA_ROW_1: MediaItem[] = [
  {
    id: 'hos-media-1',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.59.46_1.jpg?v=1793704004',
    type: 'image',
    title: 'Kashi Manikarnika & Ganga Aarti',
    subtitle: 'Eternal twilight prayers on sacred ghats',
    category: 'Sacred Yatra'
  },
  {
    id: 'hos-media-2',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.59.45_3.jpg?v=1793704004',
    type: 'image',
    title: 'Vedic Chanting & Gurukulam Lineage',
    subtitle: 'Preserving the oral shruti shastra tradition',
    category: 'Vedic Wisdom'
  },
  {
    id: 'hos-media-3',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.59.45.jpg?v=1793704004',
    type: 'image',
    title: 'Temple Architecture & Sacred Sanctums',
    subtitle: 'Ancient stone carvings, mandapas & spires',
    category: 'Sacred Heritage'
  },
  {
    id: 'hos-media-4',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.59.43.jpg?v=1793704004',
    type: 'image',
    title: 'Himalayan Tapasya & High Pilgrimage',
    subtitle: 'Meditative stillness amidst the cosmic peaks',
    category: 'Divine Circuit'
  },
  {
    id: 'hos-media-5',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.55.30_2.jpg?v=1793704004',
    type: 'image',
    title: 'Nitya Akhand Jyoti & Daily Pooja',
    subtitle: 'Handcrafted bell metal diya illuminating dawn',
    category: 'Home Sanctum'
  },
  {
    id: 'hos-media-6',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.55.30_1.jpg?v=1793704004',
    type: 'image',
    title: 'Consecrated Samagri & Vedic Dravyas',
    subtitle: 'Purity tested Bhimseni camphor & Chandan',
    category: 'Consecrated Samagri'
  }
];

const MEDIA_ROW_2: MediaItem[] = [
  {
    id: 'hos-media-7',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.59.45_1.jpg?v=1793704004',
    type: 'image',
    title: 'Puri Jagannath Maha Prasadam',
    subtitle: 'Divine communion & Anand Bazar traditions',
    category: 'Eastern Dham'
  },
  {
    id: 'hos-media-8',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.55.32_4.jpg?v=1793704004',
    type: 'image',
    title: 'Kedarnath & Badrinath Divine Path',
    subtitle: 'High altitude pilgrimage across sacred snows',
    category: 'Char Dham'
  },
  {
    id: 'hos-media-9',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_11.47.24.jpg?v=1793704004',
    type: 'image',
    title: 'Panchaloha Metallurgical Artisans',
    subtitle: 'Generational bronze & brass sculpting guilds',
    category: 'Artisan Heritage'
  },
  {
    id: 'hos-media-10',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.59.43_1.jpg?v=1793704004',
    type: 'image',
    title: 'Ayodhya Saryu Maha Sandhya',
    subtitle: 'Devotional immersion & sacred lamp offerings',
    category: 'Ram Janmabhoomi'
  },
  {
    id: 'hos-media-11',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.59.43_2.jpg?v=1793704004',
    type: 'image',
    title: 'Rameshwaram Agni Theertham',
    subtitle: 'Sacred cleansing waters of the southern sea',
    category: 'Southern Jyotirlinga'
  }
];

const MEDIA_ROW_3: MediaItem[] = [
  {
    id: 'hos-media-12',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.59.45_2.jpg?v=1793704004',
    type: 'image',
    title: 'Gomukhi Gangajal & Snana Patra',
    subtitle: 'Pure glacial stream sanctifying Vedic rituals',
    category: 'Agamic Purity'
  },
  {
    id: 'hos-media-13',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.55.32_3.jpg?v=1793704004',
    type: 'image',
    title: 'Vrindavan Devotional Sangeet',
    subtitle: 'Soulful kirtan and joyful community sangha',
    category: 'Braj Darshan'
  },
  {
    id: 'hos-media-14',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.55.30_4.jpg?v=1793704004',
    type: 'image',
    title: 'Kamakhya & 51 Shakti Peethams',
    subtitle: 'Awakened epicenters of the Divine Mother',
    category: 'Maha Peetham'
  },
  {
    id: 'hos-media-15',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_11.05.41_1.jpg?v=1793704004',
    type: 'image',
    title: 'Vedic Hawan & Fire Invocation',
    subtitle: 'Purifying living spaces through Agni Deva',
    category: 'Living Sanatan'
  },
  {
    id: 'hos-media-16',
    url: 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/WhatsApp_Image_2026-11-03_at_08.55.32_2.jpg?v=1793704004',
    type: 'image',
    title: 'Bespoke Spiritual Sangha & Heritage',
    subtitle: 'Connecting generations under one sacred House',
    category: 'HOS Community'
  }
];

interface SyncScrollSliderRowProps {
  key?: React.Key;
  mediaList: MediaItem[];
  direction?: 'left' | 'right';
  duration?: number;
  gap?: number;
  imgWidth?: number;
  imgHeight?: number;
  borderRadius?: number;
  rowIndex: number;
  onItemClick: (item: MediaItem, index: number, rowIndex: number) => void;
}

function SyncScrollSliderRow({
  mediaList,
  direction = 'left',
  duration = 32,
  gap = 22,
  imgWidth = 320,
  imgHeight = 200,
  borderRadius = 22,
  rowIndex,
  onItemClick
}: SyncScrollSliderRowProps) {
  // Duplicate for seamless 100% infinite marquee cycle
  const duplicatedList = [...mediaList, ...mediaList, ...mediaList, ...mediaList];

  return (
    <div className="relative w-full overflow-hidden flex select-none py-0.5 sm:py-1">
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: duration
        }}
        className="flex shrink-0 will-change-transform gap-3 sm:gap-[22px] pr-3 sm:pr-[22px]"
      >
        {duplicatedList.map((item, index) => {
          return (
            <motion.div
              key={`${item.id}-${index}`}
              whileHover={{
                scale: 1.05,
                y: -6,
                filter: 'brightness(1.05)'
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
                mass: 0.8
              }}
              onClick={() => onItemClick(item, index, rowIndex)}
              className="group relative cursor-pointer overflow-hidden shadow-[0_8px_20px_rgba(34,21,8,0.1)] sm:shadow-[0_12px_28px_rgba(34,21,8,0.12)] hover:shadow-[0_20px_40px_rgba(197,146,57,0.25)] border border-[#C59239]/40 select-none shrink-0 w-[190px] xs:w-[215px] sm:w-[320px] h-[120px] xs:h-[135px] sm:h-[200px] rounded-2xl sm:rounded-[22px]"
            >
              {/* Pure Clean Image without any words or titles */}
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export const MediaSection: React.FC = () => {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setPortalTarget(document.body);
    }
  }, []);

  const rows = [
    { key: 'row-1', direction: 'left' as const, duration: 34, media: MEDIA_ROW_1 },
    { key: 'row-2', direction: 'right' as const, duration: 38, media: MEDIA_ROW_2 },
    { key: 'row-3', direction: 'left' as const, duration: 30, media: MEDIA_ROW_3 }
  ];

  // Flatten playlist for lightbox gallery navigation
  const flatPlaylist = rows.reduce<MediaItem[]>((acc, r) => acc.concat(r.media), []);

  const handleItemClick = (_item: MediaItem, indexInRow: number, rowIndex: number) => {
    const originalMediaArray = rows[rowIndex].media;
    const originalIndex = indexInRow % originalMediaArray.length;
    let flatIndex = 0;
    for (let i = 0; i < rowIndex; i++) {
      flatIndex += rows[i].media.length;
    }
    flatIndex += originalIndex;
    setCurrentIdx(flatIndex);
  };

  const nextSlide = () => {
    if (currentIdx !== null) {
      setCurrentIdx((currentIdx + 1) % flatPlaylist.length);
    }
  };

  const prevSlide = () => {
    if (currentIdx !== null) {
      setCurrentIdx((currentIdx - 1 + flatPlaylist.length) % flatPlaylist.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (currentIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') setCurrentIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx]);

  const activeMedia = currentIdx !== null ? flatPlaylist[currentIdx] : null;

  return (
    <section
      id="media"
      className="relative w-full py-12 sm:py-28 bg-[#FEFBF2] text-[#221508] overflow-hidden select-none"
    >
      {/* Sacred Panorama Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="https://cdn.shopify.com/s/files/1/0794/4516/4163/files/09688899-1a80-4059-8d51-694783941621.png?v=1794025059"
          alt=""
          className="w-full h-full object-cover object-center scale-[1.01] brightness-[1.02] contrast-[1.04] saturate-[1.12]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(254,251,242,0.7) 0%, rgba(254,251,242,0.14) 20%, rgba(254,251,242,0.14) 80%, rgba(254,251,242,0.78) 100%)',
          }}
        />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(220,155,65,0.14) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Subtle Sacred Geometry Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #C59239 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Sacred Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[#C59239]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[400px] bg-[#FE7613]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-16">

        {/* Main Title */}
        <h2 className="font-cormorant text-3xl sm:text-6xl md:text-7xl font-semibold text-[#221508] tracking-tight leading-[0.92] uppercase">
          SANATANA MEDIA
        </h2>
        <div className="mt-0.5 sm:mt-1 font-cormorant text-2xl sm:text-5xl md:text-6xl font-semibold text-[#221508] tracking-tight leading-[0.95] uppercase">
          LIVING DEVOTION &amp; YATRA
        </div>

        <p className="mt-3 sm:mt-5 font-dm text-xs sm:text-base text-[#221508] font-medium leading-relaxed max-w-2xl mx-auto">
          Immerse yourself in authentic darshans, Himalayan high-altitude expeditions, Vedic artisans at work, and sacred temple rituals across Bharat.
        </p>
      </div>

      {/* -------------------------------------------------------- */}
      {/* CONTINUOUS AUTOPLAY MARQUEE SLIDER ROWS (NO SCROLL REQ)  */}
      {/* -------------------------------------------------------- */}
      <div className="relative w-full flex flex-col gap-2.5 sm:gap-6 overflow-hidden py-1 sm:py-4">
        {rows.map((row, rIdx) => (
          <SyncScrollSliderRow
            key={row.key}
            mediaList={row.media}
            direction={row.direction}
            duration={row.duration}
            gap={22}
            imgWidth={320}
            imgHeight={200}
            borderRadius={22}
            rowIndex={rIdx}
            onItemClick={handleItemClick}
          />
        ))}
      </div>

      {/* ======================================================== */}
      {/* LIGHTBOX MODAL GALLERY (Portal with Framer Animation)    */}
      {/* ======================================================== */}
      {portalTarget &&
        createPortal(
          <AnimatePresence mode="wait">
            {currentIdx !== null && activeMedia && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setCurrentIdx(null)}
                className="fixed inset-0 z-[99999] bg-[#0A0A0B]/92 backdrop-blur-2xl flex items-center justify-center select-none cursor-zoom-out"
              >
                {/* Top Left Counter */}
                <div className="absolute top-6 left-6 text-white/70 font-dm text-xs sm:text-sm font-semibold tracking-wider">
                  {currentIdx + 1} / {flatPlaylist.length}
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setCurrentIdx(null)}
                  className="absolute top-6 right-6 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Prev Slide Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-2xl backdrop-blur-md"
                  aria-label="Previous media"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Main Image Presentation */}
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, scale: 0.94, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -12 }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-[92%] max-h-[88vh] rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/20 flex flex-col bg-[#140b05]"
                >
                  <img
                    src={activeMedia.url}
                    alt=""
                    className="max-w-full max-h-[86vh] object-contain rounded-3xl"
                  />
                </motion.div>

                {/* Next Slide Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer shadow-2xl backdrop-blur-md"
                  aria-label="Next media"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          portalTarget
        )}
    </section>
  );
};
