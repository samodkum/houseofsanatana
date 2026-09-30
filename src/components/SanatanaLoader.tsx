import { useEffect, useRef, useState } from 'react';

interface SanatanaLoaderProps {
  onStartReveal?: () => void;
  onComplete?: () => void;
}

export function SanatanaLoader({ onStartReveal, onComplete }: SanatanaLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const pbRef = useRef<HTMLDivElement>(null);
  const pfRef = useRef<HTMLDivElement>(null);
  const pnRef = useRef<HTMLDivElement>(null);
  const mtRef = useRef<HTMLDivElement>(null);

  const onStartRevealRef = useRef(onStartReveal);
  const onCompleteRef = useRef(onComplete);
  onStartRevealRef.current = onStartReveal;
  onCompleteRef.current = onComplete;

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Lock scroll during loader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const canvas = canvasRef.current;
    const ui = uiRef.current;
    const pb = pbRef.current;
    const pf = pfRef.current;
    const pn = pnRef.current;
    const mt = mtRef.current;

    if (!canvas) return;
    const cx = canvas.getContext('2d');
    if (!cx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let pts: [number, number][] = [];
    let stars: { x: number; y: number; r: number; a: number; da: number }[] = [];
    let phase: 'loading' | 'revealing' | 'sliding' | 'done' = 'loading';
    let pval = 0;
    let lineAlpha = 0;
    let slideT = 0;
    let rafId: number;
    let ptimer: ReturnType<typeof setTimeout>;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      buildPts();
    };

    const buildPts = () => {
      pts = [];
      const n = 14;
      const cx2 = W * 0.5;
      const amp = Math.min(32, W * 0.035);

      // Start at top center
      pts.push([cx2, 0]);

      for (let i = 1; i < n; i++) {
        const y = (i / n) * H;
        const x = cx2 + (i % 2 === 1 ? amp : -amp);
        pts.push([x, y]);
      }

      // End at bottom center
      pts.push([cx2, H]);
    };

    const buildStars = () => {
      stars = [];
      const count = Math.min(80, Math.floor((W * H) / 10000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.4 + 0.4,
          a: Math.random(),
          da: (Math.random() * 0.012 + 0.004) * (Math.random() > 0.5 ? 1 : -1)
        });
      }
    };

    const drawScene = (offX: number, offY: number, clipFn: (() => void) | null) => {
      cx.save();
      cx.translate(offX, offY);
      if (clipFn) {
        cx.beginPath();
        clipFn();
        cx.clip();
      }
      const g = cx.createRadialGradient(W * 0.5, H * 0.55, 0, W * 0.5, H * 0.55, Math.max(H, W) * 0.75);
      g.addColorStop(0, '#D48E44');
      g.addColorStop(0.5, '#C7833D');
      g.addColorStop(1, '#8C521B');
      cx.fillStyle = g;
      cx.fillRect(-W * 2, -H * 2, W * 5, H * 5);

      stars.forEach(s => {
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
        cx.fillStyle = '#F7F1E5';
        cx.beginPath();
        cx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cx.fill();
        cx.restore();
      });
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
      cx.strokeStyle = '#F7F1E5';
      cx.lineWidth = 2.4;
      cx.shadowColor = '#D9C6A8';
      cx.shadowBlur = 16;
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
        
        // Slide left and right horizontally away from center
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
        if (mt) mt.style.opacity = String(fa);

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
        setTimeout(() => {
          phase = 'revealing';
          lineAlpha = 0;
        }, 300);
        return;
      }
      if (pf) pf.style.width = Math.floor(pval) + '%';
      if (pn) pn.textContent = Math.floor(pval) + '%';
      ptimer = setTimeout(tickProg, 28 + Math.random() * 16);
    };

    resize();
    buildStars();
    phase = 'loading';
    frame();
    ptimer = setTimeout(tickProg, 100);

    const handleWindowResize = () => {
      resize();
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
      className="fixed inset-0 z-[99999] w-full h-full overflow-hidden bg-[#8C521B] pointer-events-auto select-none"
      style={{
        background: 'radial-gradient(circle at 50% 55%, #D48E44 0%, #C7833D 50%, #8C521B 100%)',
        fontFamily: "'Cinzel', 'Georgia', serif"
      }}
    >
      <style>{`
        @keyframes logoGlow {
          0%, 100% {
            box-shadow: 0 0 16px rgba(247, 241, 229, 0.4), 0 0 32px rgba(217, 198, 168, 0.3);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 32px rgba(247, 241, 229, 0.85), 0 0 60px rgba(217, 198, 168, 0.6);
            transform: scale(1.04);
          }
        }
      `}</style>

      {/* Canvas for dynamic gradient, stars, and split doors */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Center Sacred UI */}
      <div
        ref={uiRef}
        className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none px-4 transition-opacity duration-300"
      >
        {/* Sacred Circular Logo */}
        <div 
          className="relative mb-4 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-[#D9C6A8]/80 flex items-center justify-center p-0.5 bg-[#1A1612]/40"
          style={{
            animation: 'logoGlow 3s ease-in-out infinite'
          }}
        >
          <img
            src="https://res.cloudinary.com/dzc1dckta/image/upload/v1790697704/HOS_logo_bpd1v5.jpg"
            alt="House Of Sanatana"
            className="w-full h-full object-cover rounded-full select-none"
          />
        </div>

        <div
          className="text-2xl sm:text-3xl md:text-4xl text-[#F7F1E5] uppercase tracking-[4px] sm:tracking-[7px] md:tracking-[9px] font-semibold text-center pl-1 sm:pl-2"
          style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
        >
          House Of Sanatana
        </div>

        <div className="text-[10px] sm:text-[11px] md:text-xs tracking-[4px] sm:tracking-[6px] text-[#F7F1E5]/90 uppercase mt-2 font-medium text-center">
          Welcomes You
        </div>

        {/* Golden Gradient Divider */}
        <div
          className="w-28 sm:w-36 h-[1px] my-5"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(247, 241, 229, 0.7), transparent)'
          }}
        />

        {/* Four Pillars: Dharma, Satya, Karma, Seva */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-10">
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-base text-[#F7F1E5] mb-1">☀</span>
            <span className="text-[8px] sm:text-[9px] tracking-[2px] text-[#F7F1E5] uppercase font-medium">Dharma</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-base text-[#D9C6A8] mb-1">✦</span>
            <span className="text-[8px] sm:text-[9px] tracking-[2px] text-[#F7F1E5] uppercase font-medium">Satya</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-base text-[#66705A] mb-1">✿</span>
            <span className="text-[8px] sm:text-[9px] tracking-[2px] text-[#F7F1E5] uppercase font-medium">Karma</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm sm:text-base text-[#D9C6A8] mb-1">☽</span>
            <span className="text-[8px] sm:text-[9px] tracking-[2px] text-[#F7F1E5] uppercase font-medium">Seva</span>
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div
        ref={pbRef}
        className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-56 sm:w-64 pointer-events-none transition-opacity duration-300"
      >
        <div className="w-full h-[2px] bg-black/25 overflow-hidden rounded-full">
          <div
            ref={pfRef}
            className="h-full bg-gradient-to-r from-[#D9C6A8] to-[#F7F1E5] transition-all duration-75"
            style={{ width: '0%', boxShadow: '0 0 10px #F7F1E5' }}
          />
        </div>
        <div
          ref={pnRef}
          className="mt-2.5 text-[10px] sm:text-[11px] tracking-[3px] text-[#F7F1E5] text-center font-mono font-medium"
        >
          0%
        </div>
      </div>

      {/* Bottom Mantra Strip */}
      <div
        ref={mtRef}
        className="absolute bottom-5 sm:bottom-6 w-full text-center text-[7.5px] sm:text-[8.5px] tracking-[3px] text-[#F7F1E5]/80 uppercase pointer-events-none transition-opacity duration-300 px-4"
      >
        Dharma · Satya · Karma · Seva · Sanskriti
      </div>
    </div>
  );
}
