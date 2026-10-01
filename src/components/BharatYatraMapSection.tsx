import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass } from 'lucide-react';
import { YatraPackage } from '../types/homepage';
import { EXPANDED_TRAVEL_PACKAGES, YatraCircuitType } from '../data/travelData';
import cleanBharatMapImg from '../../clean_bharat_map.png';

export interface BharatMapYatraPin {
  id: string;
  number: number;
  title: string;
  sanskrit: string;
  state: string;
  circuit: YatraCircuitType;
  xPercent: number; // percentage left on map (center of layout)
  yPercent: number; // percentage top on map (center of layout)
  duration: string;
  price: number;
  deity: string;
  image: string;
}

export const BHARAT_11_YATRAS: BharatMapYatraPin[] = [
  {
    id: 'puri-jagannath-dham',
    number: 1,
    title: 'PURI JAGANNATH DHAM TOUR',
    sanskrit: '॥ श्री जगन्नाथ पुरी धाम ॥',
    state: 'Odisha',
    circuit: 'chardham',
    xPercent: 60.5,
    yPercent: 56.5,
    duration: '4D / 3N',
    price: 18500,
    deity: 'Lord Jagannath, Balabhadra & Subhadra',
    image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'khatu-shyam-vrindavan',
    number: 2,
    title: 'KHATU SHYAM VRINDAVAN TOUR',
    sanskrit: '॥ खाटू नरेश व ब्रज धाम ॥',
    state: 'Rajasthan & UP',
    circuit: 'braj',
    xPercent: 25.5,
    yPercent: 33.0,
    duration: '5D / 4N',
    price: 22800,
    deity: 'Khatu Shyam Naresh & Bankey Bihari',
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'shirdi-jyotirlinga-tour',
    number: 3,
    title: 'SHIRDI JYOTIRLINGA TOUR',
    sanskrit: '॥ शिरडी साईं व त्र्यम्बकेश्वर ॥',
    state: 'Maharashtra',
    circuit: 'jyotirlinga',
    xPercent: 24.5,
    yPercent: 57.5,
    duration: '4D / 3N',
    price: 19500,
    deity: 'Sai Baba & Trimbakeshwar Shiva',
    image: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kashi-vishwanath-varanasi',
    number: 4,
    title: 'KASHI AYODHYA TOUR',
    sanskrit: '॥ काशी विश्वनाथ व श्री राम जन्मभूमि ॥',
    state: 'Uttar Pradesh',
    circuit: 'jyotirlinga',
    xPercent: 43.0,
    yPercent: 38.0,
    duration: '5D / 4N',
    price: 24500,
    deity: 'Ram Lalla & Kashi Vishwanath Shiva',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kailash-mansarovar-yatra',
    number: 5,
    title: 'KAILASH MANSAROVAR YATRA',
    sanskrit: '॥ कैलास मानसरोवर महापरिक्रमा ॥',
    state: 'Nepal & Mount Kailash',
    circuit: 'himalayas',
    xPercent: 35.0,
    yPercent: 13.5,
    duration: '13D / 12N',
    price: 185000,
    deity: 'Lord Shiva Mahadeva (Eternal Abode)',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kolkata-kali-darshan',
    number: 6,
    title: 'KOLKATA KALI DARSHAN TOUR',
    sanskrit: '॥ दक्षिणेश्वर व कालीघाट शक्तिपीठ ॥',
    state: 'West Bengal',
    circuit: 'shaktipeeth',
    xPercent: 67.5,
    yPercent: 42.5,
    duration: '3D / 2N',
    price: 14200,
    deity: 'Maa Bhavatarini & Kalighat Sati',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kamakhya-shakti-peeth',
    number: 7,
    title: 'KAMAKHYA SHAKTI PEETH TOUR',
    sanskrit: '॥ माँ कामाख्या तन्त्र पीठम् ॥',
    state: 'Assam',
    circuit: 'shaktipeeth',
    xPercent: 90.5,
    yPercent: 35.5,
    duration: '4D / 3N',
    price: 21500,
    deity: 'Maa Kamakhya Devi',
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'rameshwaram-madurai-south',
    number: 8,
    title: 'SOUTH INDIA TEMPLE TOUR',
    sanskrit: '॥ दक्षिण भारत दिव्य क्षेत्रम् ॥',
    state: 'Tamil Nadu, Karnataka, AP',
    circuit: 'chardham',
    xPercent: 35.5,
    yPercent: 75.0,
    duration: '6D / 5N',
    price: 28500,
    deity: 'Meenakshi Amman & Ramanathaswamy Shiva',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'kedarnath-badrinath-heli',
    number: 9,
    title: 'CHAR DHAM YATRA',
    sanskrit: '॥ श्री केदार-बद्री चतुर्धाम ॥',
    state: 'Uttarakhand',
    circuit: 'himalayas',
    xPercent: 39.0,
    yPercent: 22.5,
    duration: '6D / 5N',
    price: 68500,
    deity: 'Kedarnath Shiva & Badri Vishal',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '12-jyotirlinga-maha-tour',
    number: 10,
    title: '12 JYOTIRLINGA TOUR',
    sanskrit: '॥ द्वादश ज्योतिर्लिङ्ग महायात्रा ॥',
    state: 'All Over India',
    circuit: 'jyotirlinga',
    xPercent: 50.5,
    yPercent: 49.0,
    duration: '14D / 13N',
    price: 74900,
    deity: '12 Manifestations of Cosmic Light',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: '51-shakti-peeth-tour',
    number: 11,
    title: 'SHAKTI PEETH YATRA TOUR',
    sanskrit: '॥ एकपञ्चाशत् शक्तिपीठ साधना ॥',
    state: 'All Over India',
    circuit: 'shaktipeeth',
    xPercent: 37.0,
    yPercent: 88.5,
    duration: '11D / 10N',
    price: 58000,
    deity: 'Devi Adishakti Mahamaya',
    image: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d7ee?auto=format&fit=crop&w=400&q=80'
  }
];

interface BharatYatraMapSectionProps {
  onSelectPlace?: (yatraId: string, circuit: YatraCircuitType) => void;
  onFilterCircuit?: (circuit: YatraCircuitType) => void;
  onSelectYatra?: (yatra: YatraPackage) => void;
}

/**
 * Removes faux checkerboard pattern background from the clean image via BFS flood-fill,
 * outputting a genuine transparent PNG in milliseconds.
 */
function useTransparentCleanMap(sourceUrl: string) {
  const [cleanSrc, setCleanSrc] = useState<string>('');
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = sourceUrl;

    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        if (!ctx) {
          if (!isCancelled) {
            setCleanSrc(sourceUrl);
            setIsReady(true);
          }
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // BFS Flood-fill to remove checkerboard background from all borders
        const totalPixels = width * height;
        const visited = new Uint8Array(totalPixels);
        const queue = new Int32Array(totalPixels);
        let head = 0;
        let tail = 0;

        const isCheckerboard = (r: number, g: number, b: number, a: number) => {
          if (a < 20) return true;
          const brightness = (r + g + b) / 3;
          const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
          return brightness >= 140 && maxDiff <= 25;
        };

        for (let x = 0; x < width; x++) {
          const topIdx = x;
          if (isCheckerboard(data[topIdx * 4], data[topIdx * 4 + 1], data[topIdx * 4 + 2], data[topIdx * 4 + 3])) {
            visited[topIdx] = 1;
            queue[tail++] = topIdx;
          }
          const botIdx = (height - 1) * width + x;
          if (isCheckerboard(data[botIdx * 4], data[botIdx * 4 + 1], data[botIdx * 4 + 2], data[botIdx * 4 + 3])) {
            visited[botIdx] = 1;
            queue[tail++] = botIdx;
          }
        }

        for (let y = 0; y < height; y++) {
          const leftIdx = y * width;
          if (!visited[leftIdx]) {
            if (isCheckerboard(data[leftIdx * 4], data[leftIdx * 4 + 1], data[leftIdx * 4 + 2], data[leftIdx * 4 + 3])) {
              visited[leftIdx] = 1;
              queue[tail++] = leftIdx;
            }
          }
          const rightIdx = y * width + (width - 1);
          if (!visited[rightIdx]) {
            if (isCheckerboard(data[rightIdx * 4], data[rightIdx * 4 + 1], data[rightIdx * 4 + 2], data[rightIdx * 4 + 3])) {
              visited[rightIdx] = 1;
              queue[tail++] = rightIdx;
            }
          }
        }

        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % width;
          const cy = (curr / width) | 0;

          data[curr * 4 + 3] = 0;

          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = cx + dx;
              const ny = cy + dy;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const nIdx = ny * width + nx;
                if (!visited[nIdx]) {
                  visited[nIdx] = 1;
                  const nr = data[nIdx * 4];
                  const ng = data[nIdx * 4 + 1];
                  const nb = data[nIdx * 4 + 2];
                  const na = data[nIdx * 4 + 3];
                  if (isCheckerboard(nr, ng, nb, na)) {
                    queue[tail++] = nIdx;
                  }
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const resultUrl = canvas.toDataURL('image/png');
        if (!isCancelled) {
          setCleanSrc(resultUrl);
          setIsReady(true);
        }
      } catch (e) {
        if (!isCancelled) {
          setCleanSrc(sourceUrl);
          setIsReady(true);
        }
      }
    };

    img.onerror = () => {
      if (!isCancelled) {
        setCleanSrc(sourceUrl);
        setIsReady(true);
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [sourceUrl]);

  return { cleanSrc, isReady };
}

export function BharatYatraMapSection({
  onSelectPlace,
  onFilterCircuit,
  onSelectYatra
}: BharatYatraMapSectionProps) {
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [isLaptop, setIsLaptop] = useState<boolean>(false);
  const { cleanSrc, isReady } = useTransparentCleanMap(cleanBharatMapImg);

  useEffect(() => {
    const checkLaptop = () => {
      setIsLaptop(window.innerWidth >= 1024);
    };
    checkLaptop();
    window.addEventListener('resize', checkLaptop);
    return () => window.removeEventListener('resize', checkLaptop);
  }, []);

  const handlePlaceClick = (pin: BharatMapYatraPin) => {
    if (onSelectPlace) {
      onSelectPlace(pin.id, pin.circuit);
    } else {
      if (onFilterCircuit) {
        onFilterCircuit(pin.circuit);
      }
      const el = document.getElementById(`package-${pin.id}`) || document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section id="bharat-map-section" className="w-full py-8 sm:py-14 px-4 sm:px-6 flex flex-col items-center justify-center select-none">
      
      {/* Centered Minimalist Title */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/85 border border-[#D9C6A8] text-[#C7833D] text-[11px] font-dm font-bold tracking-widest uppercase mb-2 shadow-2xs">
          <Compass className="w-3.5 h-3.5 text-[#B08A4A]" />
          <span>॥ भारत दिव्य यात्रा मञ्च ॥ &bull; SACRED PILGRIMAGE MAP</span>
        </div>
        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#26201B] leading-tight">
          11 Divine Journeys Across Bharat
        </h2>
        <p className="font-dm text-xs sm:text-sm text-[#8F6E5B] mt-1.5">
          Tap any sacred destination to view its dedicated travel package below
        </p>
      </div>

      {/* Centered Transparent Indian Map Container */}
      <div className="relative w-full max-w-xl sm:max-w-2xl lg:max-w-3xl aspect-square mx-auto flex items-center justify-center">
        
        {/* Clean Vintage Indian Map Artwork */}
        {cleanSrc ? (
          <img
            src={cleanSrc}
            alt="Clean Antique Map of Bharat"
            className={`w-full h-full object-contain select-none transition-all duration-500 ${
              isReady ? 'opacity-100 drop-shadow-[0_15px_32px_rgba(38,32,27,0.15)]' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#C7833D] border-t-transparent animate-spin" />
          </div>
        )}

        {/* 11 Interactive Destination Layouts (No Numberings, Animated on Laptop Only) */}
        {BHARAT_11_YATRAS.map((pin) => {
          const isHovered = isLaptop && hoveredPinId === pin.id;

          return (
            <div
              key={pin.id}
              style={{
                left: `${pin.xPercent}%`,
                top: `${pin.yPercent}%`,
              }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-zIndex ${
                isHovered ? 'z-40' : 'z-20'
              }`}
            >
              <motion.div
                whileHover={isLaptop ? {
                  scale: 1.18,
                  transition: { type: 'spring', stiffness: 420, damping: 22 }
                } : undefined}
                whileTap={isLaptop ? { scale: 0.96 } : undefined}
                onClick={() => handlePlaceClick(pin)}
                onMouseEnter={isLaptop ? () => setHoveredPinId(pin.id) : undefined}
                onMouseLeave={isLaptop ? () => setHoveredPinId(null) : undefined}
                className="cursor-pointer flex flex-col items-center outline-none select-none group origin-center"
                aria-label={`View travel package for ${pin.title}`}
              >
                {/* Circular Temple/Deity Frame with Golden Double Rim (No Numbers) */}
                <div className="relative flex items-center justify-center">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-[#D4B086] ring-2 ring-[#38271A] shadow-[0_5px_14px_rgba(0,0,0,0.38)] transition-all duration-300 bg-[#26201B] ${
                    isHovered ? 'ring-[#E8B84B] border-[#F5D061] shadow-[0_0_22px_rgba(232,184,75,0.85)]' : ''
                  }`}>
                    <img
                      src={pin.image}
                      alt={pin.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Elegant Rounded Yatra Pill Card directly under circle */}
                <div className={`-mt-1 sm:-mt-1.5 min-w-[82px] sm:min-w-[105px] md:min-w-[120px] max-w-[115px] sm:max-w-[138px] md:max-w-[155px] px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl bg-gradient-to-b from-[#2A1D13] via-[#1E140C] to-[#140D07] border border-[#B08A4A]/80 shadow-[0_5px_16px_rgba(0,0,0,0.48)] text-center transition-all duration-300 ${
                  isHovered ? 'border-[#E8B84B] shadow-[0_0_20px_rgba(232,184,75,0.6)] bg-gradient-to-b from-[#3A281A] via-[#2A1D13] to-[#1C130B]' : ''
                }`}>
                  {/* Temple / Yatra Title */}
                  <span className="block text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-dm font-black text-white tracking-wide leading-tight line-clamp-1 uppercase">
                    {pin.title}
                  </span>

                  {/* State / Region */}
                  <span className="block text-[7px] sm:text-[8px] md:text-[8.5px] font-dm font-medium text-[#EED4B6] mt-0.5 leading-none">
                    {pin.state}
                  </span>

                  {/* Triangular Pin Pointer Tip */}
                  <div className="w-0 h-0 border-l-[3.5px] sm:border-l-[4px] border-l-transparent border-r-[3.5px] sm:border-r-[4px] border-r-transparent border-t-[4px] sm:border-t-[4.5px] border-t-[#B08A4A] mx-auto mt-0.5" />
                </div>

                {/* Floating Rich Tooltip on Hover (Laptop Only) */}
                {isLaptop && (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3.5 py-2 rounded-xl bg-[#26201B]/95 text-white border border-[#E8B84B] text-center shadow-2xl pointer-events-none whitespace-nowrap z-50 backdrop-blur-md"
                      >
                        <div className="font-dm font-bold text-xs text-[#F5D061] flex items-center justify-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E8B84B]" />
                          <span>{pin.title}</span>
                        </div>
                        <div className="text-[10px] text-white/80 font-dm flex items-center justify-center gap-1.5 mt-0.5">
                          <span>{pin.state}</span>
                          <span>&bull;</span>
                          <span>{pin.duration}</span>
                          <span>&bull;</span>
                          <span className="text-[#EED4B6] font-semibold">₹{pin.price.toLocaleString()}</span>
                        </div>
                        <div className="text-[9.5px] text-[#E8B84B] font-dm font-bold mt-1">
                          Click to view travel package ➔
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            </div>
          );
        })}

      </div>

    </section>
  );
}
