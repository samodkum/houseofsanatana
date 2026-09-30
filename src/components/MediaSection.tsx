import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, X, ChevronLeft, ChevronRight, Film } from 'lucide-react';

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
    id: 'm1-1',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Himalayan Kedarnath Yatra',
    subtitle: 'High altitude pilgrimage & sacred snows',
    category: 'Sacred Yatra'
  },
  {
    id: 'm1-2',
    url: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Nitya Akhand Diya & Aarti',
    subtitle: 'Vedic rituals consecrated at dawn',
    category: 'Home Sanctum'
  },
  {
    id: 'm1-3',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Kailash Mansarovar Parikrama',
    subtitle: 'The cosmic axis of Lord Shiva',
    category: 'Divine Circuit'
  },
  {
    id: 'm1-4',
    url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Panchaloha Brass Sculptors',
    subtitle: '5th-generation Vedic metallurgical guild',
    category: 'Artisan Heritage'
  },
  {
    id: 'm1-5',
    url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Varanasi Ganga Maha Aarti',
    subtitle: 'Evening twilight invocation of Maa Ganga',
    category: 'Maha Aarti'
  },
  {
    id: 'm1-6',
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Badrinath Garbhagriha Path',
    subtitle: 'The eternal abode of Lord Badri Vishal',
    category: 'Char Dham'
  }
];

const MEDIA_ROW_2: MediaItem[] = [
  {
    id: 'm2-1',
    url: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Sacred Agamic Puja Samagri',
    subtitle: 'Lab-tested Kasturi, Chandan & Roli',
    category: 'Consecrated Samagri'
  },
  {
    id: 'm2-2',
    url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Puri Jagannath Grand Corridor',
    subtitle: 'Maha Prasadam & sacred sea breeze',
    category: 'Eastern Dham'
  },
  {
    id: 'm2-3',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Rameshwaram Agni Theertham',
    subtitle: 'Consecrated dip in 22 sacred wells',
    category: 'Southern Jyotirlinga'
  },
  {
    id: 'm2-4',
    url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Ayodhya Saryu Ghat Sunrise',
    subtitle: 'Bhakti immersion & morning chants',
    category: 'Ram Janmabhoomi'
  },
  {
    id: 'm2-5',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Gomukh Glacier Yatra Path',
    subtitle: 'Origin of Bhagirathi River',
    category: 'Himalayan Tapasya'
  },
  {
    id: 'm2-6',
    url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Somnath Sunset Jyotirlinga',
    subtitle: 'The eternal shrine on the western shore',
    category: 'First Jyotirlinga'
  }
];

const MEDIA_ROW_3: MediaItem[] = [
  {
    id: 'm3-1',
    url: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Vedic Acharya Gurukulam',
    subtitle: 'Oral lineage of Rigvedic chanting',
    category: 'Shastra Parampara'
  },
  {
    id: 'm3-2',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Kamakhya Shakti Peeth Nilachal',
    subtitle: 'Tantric empowerment & sacred red cloth',
    category: 'Maha Peetham'
  },
  {
    id: 'm3-3',
    url: 'https://images.unsplash.com/photo-1609358905581-e5382c473956?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Vrindavan Nidhivan Sandhya',
    subtitle: 'Radha Krishna devotional melodies',
    category: 'Braj Darshan'
  },
  {
    id: 'm3-4',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Kashi Vishwanath Corridor',
    subtitle: 'Consecrated golden temple spires',
    category: 'Moksha Puri'
  },
  {
    id: 'm3-5',
    url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Hampi Virupaksha Temple',
    subtitle: 'Vijayanagara sacred architectural majesty',
    category: 'Sacred Architecture'
  },
  {
    id: 'm3-6',
    url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    title: 'Tirupati Venkateswara Hill',
    subtitle: 'Seven sacred hills of Lord Govinda',
    category: 'Kaliyuga Vaikuntha'
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
    <div className="relative w-full overflow-hidden flex select-none py-1">
      <motion.div
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: duration
        }}
        className="flex shrink-0 will-change-transform"
        style={{
          gap: `${gap}px`,
          paddingRight: `${gap}px`
        }}
      >
        {duplicatedList.map((item, index) => {
          return (
            <motion.div
              key={`${item.id}-${index}`}
              whileHover={{ 
                scale: 1.05, 
                y: -6, 
                filter: 'brightness(1.08)' 
              }}
              transition={{ 
                type: 'spring', 
                stiffness: 260, 
                damping: 20, 
                mass: 0.8 
              }}
              onClick={() => onItemClick(item, index, rowIndex)}
              className="group relative cursor-pointer overflow-hidden shadow-[0_12px_28px_rgba(34,21,8,0.12)] hover:shadow-[0_20px_40px_rgba(176,138,74,0.22)] border border-[#B08A4A]/40 select-none shrink-0"
              style={{
                width: `${imgWidth}px`,
                height: `${imgHeight}px`,
                borderRadius: `${borderRadius}px`,
              }}
            >
              {/* Image */}
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Dark gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />

              {/* Top Category Badge */}
              <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-dm font-bold text-[#D9C6A8] uppercase tracking-wider shadow-xs">
                {item.category}
              </div>

              {/* Hover Action Pill */}
              <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md text-[#8F6E5B] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-md">
                <Eye className="w-3.5 h-3.5" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                <h4 className="font-cormorant text-base sm:text-lg font-semibold leading-tight line-clamp-1 group-hover:text-[#D9C6A8] transition-colors">
                  {item.title}
                </h4>
                <p className="font-dm text-[11px] text-stone-300 line-clamp-1 mt-0.5">
                  {item.subtitle}
                </p>
              </div>
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
      className="relative w-full py-20 sm:py-28 bg-[#F7F1E5] text-[#8F6E5B] overflow-hidden select-none"
    >
      {/* Subtle Sacred Geometry Texture Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #8F6E5B 1.2px, transparent 1.2px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Sacred Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[#B08A4A]/12 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[400px] bg-[#C7833D]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12 sm:mb-16">
        
        {/* Eyebrow Inscription */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8F6E5B]/10 border border-[#8F6E5B]/20 text-[#8F6E5B] text-xs font-dm font-bold tracking-widest uppercase mb-5 shadow-xs">
          <Film className="w-3.5 h-3.5 text-[#8F6E5B]" />
          <span>॥ दृश्य दर्शनम् ॥ &bull; SACRED VISUAL CHRONICLES</span>
        </div>

        {/* Main Title */}
        <h2 className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-semibold text-[#8F6E5B] tracking-tight leading-[0.92] uppercase">
          SANATANA MEDIA
        </h2>
        <div className="mt-1 font-cormorant text-3xl sm:text-5xl md:text-6xl font-semibold text-[#8F6E5B] tracking-tight leading-[0.95] uppercase">
          LIVING DEVOTION &amp; YATRA
        </div>

        <p className="mt-5 font-dm text-sm sm:text-base text-[#8F6E5B]/80 font-normal leading-relaxed max-w-2xl mx-auto">
          Immerse yourself in authentic darshans, Himalayan high-altitude expeditions, Vedic artisans at work, and sacred temple rituals across Bharat.
        </p>
      </div>

      {/* -------------------------------------------------------- */}
      {/* CONTINUOUS AUTOPLAY MARQUEE SLIDER ROWS (NO SCROLL REQ)  */}
      {/* -------------------------------------------------------- */}
      <div className="relative w-full flex flex-col gap-5 sm:gap-6 overflow-hidden py-4">
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
                  className="relative max-w-[90%] max-h-[82vh] rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/20 flex flex-col bg-[#140b05]"
                >
                  <img
                    src={activeMedia.url}
                    alt={activeMedia.title}
                    className="max-w-full max-h-[72vh] object-contain"
                  />

                  {/* Modal Bottom Inscription Bar */}
                  <div className="p-4 sm:p-5 bg-gradient-to-t from-black via-black/90 to-black/40 border-t border-white/10 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-dm font-bold uppercase tracking-widest text-[#D9C6A8] px-2.5 py-0.5 rounded-full bg-[#B08A4A]/30 border border-[#B08A4A]/50 inline-block mb-1">
                        {activeMedia.category}
                      </span>
                      <h3 className="font-cormorant text-xl sm:text-2xl font-semibold text-white">
                        {activeMedia.title}
                      </h3>
                      <p className="font-dm text-xs text-stone-300">
                        {activeMedia.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-stone-400 text-xs font-dm">
                      <Sparkles className="w-3.5 h-3.5 text-[#B08A4A]" />
                      <span>House of Sanatan Archive</span>
                    </div>
                  </div>
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
