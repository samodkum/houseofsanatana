import React, { useState, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react';

export interface InteractiveBookProps {
  width?: number;
  height?: number;
  frontCover: string;
  backCover: string;
  innerPages?: string[];
  shadow?: {
    color?: string;
    opacity?: number;
    blur?: number;
    offsetX?: number;
    offsetY?: number;
    spread?: number;
  };
  borderRadius?: number;
}

export const InteractiveBook: React.FC<InteractiveBookProps> = ({
  width = 380,
  height = 540,
  frontCover,
  backCover,
  innerPages = [],
  shadow = {
    color: '#000000',
    opacity: 0.35,
    blur: 25,
    offsetX: 10,
    offsetY: 15,
    spread: 0,
  },
  borderRadius = 14,
}) => {
  const rawImages = [frontCover, ...innerPages, backCover].filter(Boolean);
  const allImages = rawImages.length % 2 === 0 ? rawImages : [...rawImages, null];
  const leafPairs: [string | null, string | null][] = [];
  for (let i = 0; i < allImages.length; i += 2) {
    leafPairs.push([allImages[i], allImages[i + 1]]);
  }
  const totalLeaves = leafPairs.length;

  const [flippedCount, setFlippedCount] = useState(0);
  const [isBookClosed, setIsBookClosed] = useState(true);
  const flippedRef = useRef(0);

  // Animation controls for leaves and container
  // Using 16 fixed animation controls (well within hook safety limits)
  const ctrl0 = useAnimationControls();
  const ctrl1 = useAnimationControls();
  const ctrl2 = useAnimationControls();
  const ctrl3 = useAnimationControls();
  const ctrl4 = useAnimationControls();
  const ctrl5 = useAnimationControls();
  const ctrl6 = useAnimationControls();
  const ctrl7 = useAnimationControls();
  const controlsPool = [ctrl0, ctrl1, ctrl2, ctrl3, ctrl4, ctrl5, ctrl6, ctrl7];

  const bookContainerControls = useAnimationControls();

  const getRgba = (color?: string, alpha?: number) => {
    if (!color) return `rgba(0,0,0,${alpha ?? 0.35})`;
    const hex = color.replace('#', '');
    const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
    const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16);
    const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha ?? 0.35})`;
  };

  const shadowCol = getRgba(shadow.color, shadow.opacity);
  const closedBookShadow = `${shadow.offsetX ?? 10}px ${shadow.offsetY ?? 15}px ${shadow.blur ?? 25}px ${shadow.spread ?? 0}px ${shadowCol}`;

  const handleClick = async () => {
    if (flippedCount === 0) {
      setIsBookClosed(false);
      bookContainerControls.start({
        x: width / 2,
        transition: { duration: 0.6, ease: 'easeInOut' },
      });
    }

    if (flippedCount < totalLeaves) {
      const indexToFlip = flippedCount;
      setFlippedCount((prev) => prev + 1);
      flippedRef.current = flippedCount + 1;
      if (controlsPool[indexToFlip]) {
        await controlsPool[indexToFlip].start({
          rotateY: -180,
          transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
        });
      }
    } else {
      bookContainerControls.start({
        x: 0,
        transition: { duration: 0.8, ease: 'easeInOut' },
      });
      for (let i = totalLeaves - 1; i >= 0; i--) {
        if (controlsPool[i]) {
          controlsPool[i].start({
            rotateY: 0,
            transition: { duration: 0.5, ease: 'easeInOut' },
          });
        }
        await new Promise((r) => setTimeout(r, 80));
      }
      setFlippedCount(0);
      flippedRef.current = 0;
      setIsBookClosed(true);
    }
  };

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    backgroundColor: '#1E1915',
    overflow: 'hidden',
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  const spineGradient: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '14%',
    background: 'linear-gradient(to right, rgba(0,0,0,0.25), transparent)',
    pointerEvents: 'none',
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: height + 60,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        perspective: 2500,
        cursor: 'pointer',
        overflow: 'visible',
      }}
      onClick={handleClick}
      className="select-none py-6"
    >
      <motion.div
        animate={bookContainerControls}
        style={{
          width,
          height,
          position: 'relative',
          transformStyle: 'preserve-3d',
          boxShadow: isBookClosed ? closedBookShadow : '0px 0px 0px transparent',
          transition: 'box-shadow 0.4s ease',
        }}
        className="transition-transform duration-300 hover:scale-[1.02]"
      >
        {leafPairs.map(([frontSrc, backSrc], index) => {
          const isFlipped = index < flippedCount;
          const isFlipping = index === flippedCount - 1;
          const zOffset = isFlipped ? index * 0.4 : (totalLeaves - index) * 0.4;
          const zIndex = isFlipping ? 100 : isFlipped ? index : totalLeaves - index;

          return (
            <motion.div
              key={index}
              animate={controlsPool[index]}
              initial={{ rotateY: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                zIndex: zIndex,
                transform: `translateZ(${zOffset}px)`,
                willChange: 'transform',
              }}
            >
              {/* Front of leaf */}
              <div
                style={{
                  ...faceStyle,
                  borderRadius: `0px ${borderRadius}px ${borderRadius}px 0px`,
                  borderRight: '1px solid rgba(217, 198, 168, 0.3)',
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.2)',
                }}
              >
                {frontSrc && <img src={frontSrc} style={imgStyle} alt="" />}
                <div style={spineGradient} />
              </div>

              {/* Back of leaf */}
              <div
                style={{
                  ...faceStyle,
                  transform: 'rotateY(180deg) translateZ(0.01px)',
                  borderRadius: `${borderRadius}px 0px 0px ${borderRadius}px`,
                  borderLeft: '1px solid rgba(217, 198, 168, 0.3)',
                  boxShadow: 'inset 0 0 15px rgba(0,0,0,0.2)',
                }}
              >
                {backSrc && <img src={backSrc} style={imgStyle} alt="" />}
                <div
                  style={{
                    ...spineGradient,
                    left: 'auto',
                    right: 0,
                    transform: 'scaleX(-1)',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Helpful Interactive Hint Under Book */}
      <div className="mt-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#26201B]/80 border border-[#D9C6A8]/40 backdrop-blur-md shadow-sm pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-[#C7833D] animate-ping" />
        <span className="text-[11px] font-dm font-semibold text-[#D9C6A8] tracking-wider uppercase">
          {flippedCount === 0
            ? 'Click Book To Open Sacred Compendium'
            : flippedCount < totalLeaves
            ? `Page ${flippedCount * 2} of ${totalLeaves * 2} • Click To Turn Next Leaf`
            : 'Click Book To Close & Return To Front Cover'}
        </span>
      </div>
    </div>
  );
};

export default InteractiveBook;
