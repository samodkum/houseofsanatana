import { useEffect, useRef, useState } from 'react';
import { HOS_LOGO_URL } from '../lib/constants';

interface SanatanaLoaderProps {
  onStartReveal?: () => void;
  onComplete?: () => void;
}

const INTRO_IMAGE_URL = 'https://cdn.shopify.com/s/files/1/0794/4516/4163/files/e93027c4-56cc-4510-8d19-c2ae4b73e0a7.png?v=1794026747';

export function SanatanaLoader({ onStartReveal, onComplete }: SanatanaLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);

  // Desktop/Tablet refs (New Intro Screen)
  const pbRef = useRef<HTMLDivElement>(null);
  const pfRef = useRef<HTMLDivElement>(null);
  const pnRef = useRef<HTMLDivElement>(null);

  // Mobile refs (Previous Intro Screen)
  const pbMobileRef = useRef<HTMLDivElement>(null);
  const pfMobileRef = useRef<HTMLDivElement>(null);
  const pnMobileRef = useRef<HTMLDivElement>(null);
  const mtMobileRef = useRef<HTMLDivElement>(null);

  const onStartRevealRef = useRef(onStartReveal);
  const onCompleteRef = useRef(onComplete);
  onStartRevealRef.current = onStartReveal;
  onCompleteRef.current = onComplete;

  const [isFinished, setIsFinished] = useState(false);
  const [stageRect, setStageRect] = useState<{ x: number; y: number; w: number; h: number }>({
    x: 0,
    y: 0,
    w: typeof window !== 'undefined' ? window.innerWidth : 1024,
    h: typeof window !== 'undefined' ? window.innerHeight : 576,
  });

  useEffect(() => {
    // Lock scroll during loader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    const ui = uiRef.current;
    const pb = pbRef.current;
    const pf = pfRef.current;
    const pn = pnRef.current;
    const pbMobile = pbMobileRef.current;
    const pfMobile = pfMobileRef.current;
    const pnMobile = pnMobileRef.current;
    const mtMobile = mtMobileRef.current;

    if (!canvas) return;
    const cx = canvas.getContext('2d');
    if (!cx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let isMobile = W < 768;
    let pts: [number, number][] = [];
    let stars: { x: number; y: number; r: number; a: number; da: number }[] = [];
    let phase: 'loading' | 'revealing' | 'sliding' | 'done' = 'loading';
    let pval = 0;
    let lineAlpha = 0;
    let slideT = 0;
    let rafId: number;
    let ptimer: ReturnType<typeof setTimeout>;

    let dw = W;
    let dh = H;
    let dx = 0;
    let dy = 0;

    // Preload the full-screen intro artwork image for Laptop & Tablet
    const introImg = new Image();
    introImg.crossOrigin = 'anonymous';
    introImg.src = INTRO_IMAGE_URL;

    const buildStars = () => {
      stars = [];
      const count = Math.min(65, Math.floor((W * H) / 9500));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.3 + 0.4,
          a: Math.random(),
          da: (Math.random() * 0.012 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    const computeLayout = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      isMobile = W < 768;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      cx.setTransform(1, 0, 0, 1, 0, 0);
      cx.scale(dpr, dpr);

      if (isMobile) {
        buildStars();
      }

      // Laptop & Tablet: fit full screen edge-to-edge (cover) without empty bars
      const natW = introImg.naturalWidth || 1672;
      const natH = introImg.naturalHeight || 941;
      const scale = Math.max(W / natW, H / natH);

      dw = Math.ceil(natW * scale);
      dh = Math.ceil(natH * scale);
      dx = Math.round((W - dw) / 2);
      dy = Math.round((H - dh) / 2);

      setStageRect({ x: dx, y: dy, w: dw, h: dh });
      buildPts();
    };

    introImg.onload = () => {
      computeLayout();
    };

    const buildPts = () => {
      pts = [];
      const n = 14;
      const cx2 = W * 0.5;
      const amp = Math.min(32, W * 0.035);

      pts.push([cx2, 0]);

      for (let i = 1; i < n; i++) {
        const y = (i / n) * H;
        const x = cx2 + (i % 2 === 1 ? amp : -amp);
        pts.push([x, y]);
      }

      pts.push([cx2, H]);
    };

    const drawScene = (offX: number, offY: number, clipFn: (() => void) | null) => {
      cx.save();
      cx.translate(offX, offY);

      if (clipFn) {
        cx.beginPath();
        clipFn();
        cx.clip();
      }

      if (isMobile) {
        // ========================================================
        // 1. PREVIOUS INTRO SCREEN CANVAS FOR MOBILE:
        // Royal Wine Red radial gradient with twinkling golden stars
        // ========================================================
        const g = cx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, Math.max(H, W) * 0.85);
        g.addColorStop(0, '#5C131F');
        g.addColorStop(0.5, '#420A13');
        g.addColorStop(1, '#1E0307');
        cx.fillStyle = g;
        cx.fillRect(-W * 2, -H * 2, W * 5, H * 5);

        stars.forEach((s) => {
          s.a += s.da;
          if (s.a > 1) {
            s.a = 1;
            s.da *= -1;
          }
          if (s.a < 0) {
            s.a = 0;
            s.da *= -1;
          }
          cx.save();
          cx.globalAlpha = s.a * 0.85;
          cx.fillStyle = '#FFF5DB';
          cx.beginPath();
          cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          cx.fill();
          cx.restore();
        });
      } else {
        // ========================================================
        // 2. NEW INTRO SCREEN CANVAS FOR LAPTOP & TABLET:
        // Royal Wine Red Base + Full Intro Artwork & Edge Vignette
        // ========================================================
        cx.fillStyle = '#4A0108';
        cx.fillRect(-W * 2, -H * 2, W * 5, H * 5);

        if (introImg.complete && introImg.naturalWidth > 0) {
          cx.imageSmoothingEnabled = true;
          cx.imageSmoothingQuality = 'high';
          cx.drawImage(introImg, dx, dy, dw, dh);
        }

        const vg = cx.createRadialGradient(W * 0.5, H * 0.5, Math.min(W, H) * 0.45, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
        vg.addColorStop(0, 'rgba(0,0,0,0)');
        vg.addColorStop(1, 'rgba(18, 1, 4, 0.45)');
        cx.fillStyle = vg;
        cx.fillRect(-W * 2, -H * 2, W * 5, H * 5);
      }

      cx.restore();
    };

    const curvyPath = () => {
      if (pts.length === 0) return;
      cx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const midX = (p0[0] + p1[0]) / 2;
        const midY = (p0[1] + p1[1]) / 2;
        cx.quadraticCurveTo(p0[0], p0[1], midX, midY);
      }
      const last = pts[pts.length - 1];
      cx.lineTo(last[0], last[1]);
    };

    const leftClip = () => {
      if (pts.length === 0) return;
      cx.moveTo(0, 0);
      cx.lineTo(pts[0][0], pts[0][1]);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const midX = (p0[0] + p1[0]) / 2;
        const midY = (p0[1] + p1[1]) / 2;
        cx.quadraticCurveTo(p0[0], p0[1], midX, midY);
      }
      const last = pts[pts.length - 1];
      cx.lineTo(last[0], last[1]);
      cx.lineTo(0, H);
      cx.closePath();
    };

    const rightClip = () => {
      if (pts.length === 0) return;
      cx.moveTo(W, 0);
      cx.lineTo(pts[0][0], pts[0][1]);
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[i];
        const p1 = pts[i + 1];
        const midX = (p0[0] + p1[0]) / 2;
        const midY = (p0[1] + p1[1]) / 2;
        cx.quadraticCurveTo(p0[0], p0[1], midX, midY);
      }
      const last = pts[pts.length - 1];
      cx.lineTo(last[0], last[1]);
      cx.lineTo(W, H);
      cx.closePath();
    };

    const drawLine = (alpha: number) => {
      cx.save();
      cx.globalAlpha = alpha;
      cx.strokeStyle = '#E4B968';
      cx.lineWidth = 2.5;
      cx.shadowColor = '#FE7613';
      cx.shadowBlur = 18;
      cx.beginPath();
      curvyPath();
      cx.stroke();
      cx.restore();
    };

    const easeInCubic = (t: number) => t * t * t;

    const frame = () => {
      cx.clearRect(0, 0, W, H);

      if (phase === 'loading') {
        drawScene(0, 0, null);
      } else if (phase === 'revealing') {
        drawScene(0, 0, null);
        lineAlpha = Math.min(lineAlpha + 0.035, 1);
        drawLine(lineAlpha);
        if (lineAlpha >= 1) {
          phase = 'sliding';
          slideT = 0;
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = 'none';
            containerRef.current.style.background = 'transparent';
            containerRef.current.style.backgroundColor = 'transparent';
          }
          onStartRevealRef.current?.();
        }
      } else if (phase === 'sliding') {
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = 'none';
          containerRef.current.style.background = 'transparent';
          containerRef.current.style.backgroundColor = 'transparent';
        }
        slideT = Math.min(slideT + 0.016, 1);
        const e = easeInCubic(slideT);

        const leftOffX = -e * (W * 0.75 + 100);
        const rightOffX = e * (W * 0.75 + 100);

        drawScene(leftOffX, 0, leftClip);
        drawScene(rightOffX, 0, rightClip);

        const la = Math.max(0, 1 - slideT * 4);
        if (la > 0) {
          cx.save();
          cx.translate(leftOffX, 0);
          drawLine(la);
          cx.restore();

          cx.save();
          cx.translate(rightOffX, 0);
          drawLine(la);
          cx.restore();
        }

        const fa = Math.max(0, 1 - slideT * 3.5);
        if (ui) ui.style.opacity = String(fa);
        if (pb) pb.style.opacity = String(fa);
        if (pbMobile) pbMobile.style.opacity = String(fa);
        if (mtMobile) mtMobile.style.opacity = String(fa);

        if (slideT >= 1) {
          cx.clearRect(0, 0, W, H);
          phase = 'done';
          setIsFinished(true);
          document.body.style.overflow = originalOverflow;
          onCompleteRef.current?.();
          return;
        }
      } else if (phase === 'done') {
        return;
      }

      rafId = requestAnimationFrame(frame);
    };

    const tickProg = () => {
      if (phase !== 'loading') return;
      pval += 1.1 + Math.random() * 0.9;
      if (pval >= 100) {
        pval = 100;
        if (pf) pf.style.width = '100%';
        if (pn) pn.textContent = '100%';
        if (pfMobile) pfMobile.style.width = '100%';
        if (pnMobile) pnMobile.textContent = '100%';
        setTimeout(() => {
          phase = 'revealing';
          lineAlpha = 0;
        }, 300);
        return;
      }
      const pStr = Math.floor(pval) + '%';
      if (pf) pf.style.width = pStr;
      if (pn) pn.textContent = pStr;
      if (pfMobile) pfMobile.style.width = pStr;
      if (pnMobile) pnMobile.textContent = pStr;
      ptimer = setTimeout(tickProg, 28 + Math.random() * 16);
    };

    computeLayout();
    phase = 'loading';
    frame();
    ptimer = setTimeout(tickProg, 100);

    const handleWindowResize = () => {
      computeLayout();
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(ptimer);
      window.removeEventListener('resize', handleWindowResize);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] w-full h-full overflow-hidden bg-[#4A0108] pointer-events-auto select-none"
      style={{
        fontFamily: "'Cormorant Garamond', 'Cinzel', serif",
      }}
    >
      <style>{`
        @keyframes logoGlow {
          0%, 100% {
            box-shadow: 0 0 16px rgba(228, 185, 104, 0.45), 0 0 35px rgba(152, 85, 94, 0.45);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 26px rgba(228, 185, 104, 0.8), 0 0 45px rgba(197, 146, 57, 0.6);
            transform: scale(1.025);
          }
        }
      `}</style>

      {/* Full-Screen Canvas: Stars & Radial Gradient on Mobile; Artwork on Laptop/Tablet */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Sacred UI Overlay */}
      <div
        ref={uiRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none transition-opacity duration-300 z-10"
      >
        {/* ======================================================== */}
        {/* 1. LAPTOP & TABLET VIEW (md:block, hidden on mobile)     */}
        {/* Uses stageRect over the full artwork with corner flowers */}
        {/* ======================================================== */}
        <div
          style={{
            position: 'absolute',
            left: `${stageRect.x}px`,
            top: `${stageRect.y}px`,
            width: `${stageRect.w}px`,
            height: `${stageRect.h}px`,
          }}
          className="relative pointer-events-none hidden md:block"
        >
          {/* Logo of HOS positioned directly above the words 'HOUSE OF SANATANA' */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[15.5%] md:top-[16%] w-[12%] md:w-[11.5%] max-w-[82px] min-w-[42px] aspect-square rounded-full overflow-hidden border border-[#E4B968]/90 flex items-center justify-center bg-[#36050e] p-0 shadow-[0_0_24px_rgba(228,185,104,0.7)]"
            style={{
              animation: 'logoGlow 3s ease-in-out infinite',
            }}
          >
            <img
              src={HOS_LOGO_URL}
              alt="House Of Sanatana Logo"
              className="w-full h-full object-contain rounded-full select-none"
            />
          </div>

          {/* Bottom Live Dynamic Section: 'ENTERING A WORLD OF SANATANA' & Animated Progress Bar */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] sm:bottom-[10.5%] md:bottom-[11%] w-full flex flex-col items-center justify-center pointer-events-none px-4">
            <div className="text-[8px] sm:text-[9.5px] md:text-[10.5px] tracking-[0.24em] sm:tracking-[0.3em] text-[#FEFBF2]/90 uppercase font-dm font-semibold text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              ENTERING A WORLD OF SANATANA
            </div>

            {/* Horizontal Progress Bar with Glowing Slider Node */}
            <div
              ref={pbRef}
              className="mt-1.5 sm:mt-2.5 w-40 sm:w-52 md:w-64 pointer-events-none transition-opacity duration-300"
            >
              <div className="relative w-full h-[3px] sm:h-[3.5px] bg-black/60 rounded-full border border-[#E4B968]/35 shadow-inner">
                <div
                  ref={pfRef}
                  className="h-full bg-gradient-to-r from-[#FE7613] via-[#E4B968] to-[#FFF5DB] rounded-full relative transition-all duration-75"
                  style={{ width: '0%', boxShadow: '0 0 10px rgba(228, 185, 104, 0.85)' }}
                >
                  {/* Glowing pearl bead at the leading head */}
                  <div 
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-[0_0_8px_#ffffff,_0_0_16px_#E4B968]" 
                  />
                </div>
              </div>
              <div
                ref={pnRef}
                className="mt-1 text-[7.5px] sm:text-[8.5px] tracking-[2px] text-[#E4B968]/90 text-center font-mono font-medium"
              >
                0%
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. PREVIOUS INTRO SCREEN ON MOBILE (< 768px, md:hidden)   */}
        {/* Clean, 100% naturally responsive layout with Four Pillars*/}
        {/* ======================================================== */}
        <div className="flex md:hidden flex-col items-center justify-center w-full h-full px-3 select-none pointer-events-none">
          
          {/* Sacred Circular Brand Logo */}
          <div 
            className="relative mt-2 mb-3.5 w-20 h-20 min-[380px]:w-[88px] min-[380px]:h-[88px] rounded-full overflow-hidden border-2 border-[#E4B968]/90 flex items-center justify-center p-0 bg-[#36050e] shadow-[0_0_24px_rgba(228,185,104,0.65)]"
            style={{
              animation: 'logoGlow 3s ease-in-out infinite'
            }}
          >
            <img
              src={HOS_LOGO_URL}
              alt="House Of Sanatana"
              className="w-full h-full object-contain rounded-full select-none"
            />
          </div>

          {/* House Of Sanatana Brand Heading - Kept strictly on ONE line */}
          <div
            className="whitespace-nowrap text-[15px] min-[370px]:text-[17px] min-[420px]:text-xl sm:text-2xl text-[#FEFBF2] uppercase tracking-[2px] min-[370px]:tracking-[3px] sm:tracking-[4px] font-semibold text-center pl-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] max-w-full"
            style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
          >
            House Of Sanatana
          </div>

          {/* Welcomes You Subtitle */}
          <div className="text-[9px] min-[370px]:text-[10px] tracking-[3px] min-[370px]:tracking-[4px] text-[#FEFBF2]/90 uppercase mt-1.5 font-medium text-center font-dm">
            Welcomes You
          </div>

          {/* Golden Gradient Divider */}
          <div
            className="w-24 min-[370px]:w-28 h-[1px] my-3"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(228, 185, 104, 0.75), transparent)'
            }}
          />

          {/* Four Sacred Pillars: Dharma, Satya, Karma, Seva */}
          <div className="flex items-center gap-4 min-[370px]:gap-6 my-1">
            <div className="flex flex-col items-center">
              <span className="text-xs min-[370px]:text-sm text-[#FE7613] mb-0.5">☀</span>
              <span className="text-[7.5px] min-[370px]:text-[8px] tracking-[1.2px] text-[#FEFBF2] uppercase font-medium">Dharma</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs min-[370px]:text-sm text-[#E4B968] mb-0.5">✦</span>
              <span className="text-[7.5px] min-[370px]:text-[8px] tracking-[1.2px] text-[#FEFBF2] uppercase font-medium">Satya</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs min-[370px]:text-sm text-[#607427] mb-0.5">✿</span>
              <span className="text-[7.5px] min-[370px]:text-[8px] tracking-[1.2px] text-[#FEFBF2] uppercase font-medium">Karma</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs min-[370px]:text-sm text-[#3DB3E4] mb-0.5">☽</span>
              <span className="text-[7.5px] min-[370px]:text-[8px] tracking-[1.2px] text-[#FEFBF2] uppercase font-medium">Seva</span>
            </div>
          </div>

          {/* Mobile Bottom Progress Bar */}
          <div
            ref={pbMobileRef}
            className="absolute bottom-11 min-[380px]:bottom-12 left-1/2 -translate-x-1/2 w-44 min-[380px]:w-52 pointer-events-none transition-opacity duration-300"
          >
            <div className="w-full h-[2.5px] bg-black/60 overflow-hidden rounded-full border border-[#E4B968]/35 shadow-inner">
              <div
                ref={pfMobileRef}
                className="h-full bg-gradient-to-r from-[#FE7613] via-[#E4B968] to-[#FFF5DB] rounded-full transition-all duration-75"
                style={{ width: '0%', boxShadow: '0 0 10px rgba(228, 185, 104, 0.85)' }}
              />
            </div>
            <div
              ref={pnMobileRef}
              className="mt-1.5 text-[8.5px] min-[380px]:text-[9px] tracking-[2px] text-[#E4B968]/95 text-center font-mono font-medium"
            >
              0%
            </div>
          </div>

          {/* Mobile Bottom Mantra Strip */}
          <div
            ref={mtMobileRef}
            className="absolute bottom-3.5 min-[380px]:bottom-4 w-full text-center text-[7px] min-[380px]:text-[7.5px] tracking-[2px] text-[#FEFBF2]/80 uppercase pointer-events-none transition-opacity duration-300 px-4 font-dm"
          >
            Dharma · Satya · Karma · Seva · Sanskriti
          </div>

        </div>

      </div>
    </div>
  );
}
