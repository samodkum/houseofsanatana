import React, { useRef, useEffect, useCallback, useMemo } from 'react';

export interface HoverBloomProps {
  backgroundColor?: string;
  paperTint?: string;
  grid?: boolean;
  gridSize?: number;
  gridDotSize?: number;
  gridColor?: string;
  maxBlooms?: number;
  spawnRate?: number;
  bloomScale?: number;
  trailFade?: number;
  watercolor?: number;
  blur?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface StemSegment {
  x: number;
  y: number;
  a: number;
}

interface Stem {
  id: string;
  x: number;
  y: number;
  targetLen: number;
  grown: number;
  speed: number;
  a: number;
  targetA: number;
  segs: StemSegment[];
  done: boolean;
  hasFlower: boolean;
  type: number;
  scale: number;
  hue: number;
  sat: number;
  light: number;
}

interface Bloom {
  id: string;
  x: number;
  y: number;
  age: number;
  maxAge: number;
  type: number;
  scale: number;
  hue: number;
  sat: number;
  light: number;
}

// Sacred Sanatana palette (Marigold, Kumkum, Lotus, Saffron & Gold)
const SACRED_PALETTE_HUES = [15, 35, 45, 345, 5, 25, 355, 40];

export const HoverBloomCanvas: React.FC<HoverBloomProps> = ({
  backgroundColor = '#F7F1E5',
  paperTint = '#D9C6A8',
  grid = true,
  gridSize = 28,
  gridDotSize = 1.2,
  gridColor = 'rgba(143, 110, 91, 0.04)',
  maxBlooms = 120,
  spawnRate = 16,
  bloomScale = 1.1,
  trailFade = 0.06,
  watercolor = 0.85,
  blur = 0.5,
  className = '',
  style
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paintCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const runningRef = useRef<boolean>(false);
  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({ w: 0, h: 0, dpr: 1 });
  const hoverRef = useRef<boolean>(false);
  const lastPointerRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const spawnAccRef = useRef<number>(0);
  const stemsRef = useRef<Stem[]>([]);
  const bloomsRef = useRef<Bloom[]>([]);

  const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
  const pick = <T,>(arr: T[]): T => arr[(Math.random() * arr.length) | 0];

  const get2D = useCallback((c: HTMLCanvasElement): CanvasRenderingContext2D | null => {
    return c.getContext('2d', { alpha: true, desynchronized: true });
  }, []);

  const hsl = useCallback((c: { h: number; s: number; l: number }, a: number) => {
    const hh = ((c.h % 360) + 360) % 360;
    return `hsla(${hh}, ${Math.max(0, Math.min(100, c.s))}%, ${Math.max(0, Math.min(100, c.l))}%, ${Math.max(0, Math.min(1, a))})`;
  }, []);

  const ensureCanvases = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!paintCanvasRef.current) {
      paintCanvasRef.current = document.createElement('canvas');
    }
  }, []);

  const resizeToHost = useCallback(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const paint = paintCanvasRef.current;
    if (!host || !canvas || !paint) return;

    const rect = host.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.max(1, Math.min(2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1));

    const prev = sizeRef.current;
    if (prev.w === w && prev.h === h && prev.dpr === dpr) return;

    sizeRef.current = { w, h, dpr };
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h* dpr);
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    paint.width = Math.floor(w * dpr);
    paint.height = Math.floor(h * dpr);

    const pctx = get2D(paint);
    if (pctx) {
      pctx.setTransform(1, 0, 0, 1, 0, 0);
      pctx.scale(dpr, dpr);
      pctx.lineCap = 'round';
      pctx.lineJoin = 'round';
      pctx.globalCompositeOperation = 'source-over';
      pctx.fillStyle = backgroundColor;
      pctx.fillRect(0, 0, w, h);
    }
  }, [backgroundColor, get2D]);

  const clearAll = useCallback(() => {
    const paint = paintCanvasRef.current;
    const canvas = canvasRef.current;
    if (!paint || !canvas) return;

    const { w, h, dpr } = sizeRef.current;
    const pctx = get2D(paint);
    const dctx = get2D(canvas);
    if (!pctx || !dctx) return;

    pctx.setTransform(1, 0, 0, 1, 0, 0);
    pctx.clearRect(0, 0, paint.width, paint.height);
    pctx.scale(dpr, dpr);
    pctx.fillStyle = backgroundColor;
    pctx.fillRect(0, 0, w, h);

    dctx.setTransform(1, 0, 0, 1, 0, 0);
    dctx.clearRect(0, 0, canvas.width, canvas.height);

    stemsRef.current = [];
    bloomsRef.current = [];
  }, [backgroundColor, get2D]);

  const spawnStemAt = useCallback((x: number, y: number, intensity: number) => {
    const { w, h } = sizeRef.current;
    if (w <= 0 || h <= 0) return;

    if (stemsRef.current.length + bloomsRef.current.length >= Math.max(1, maxBlooms)) {
      stemsRef.current.splice(0, Math.max(0, stemsRef.current.length - (maxBlooms - 1)));
      bloomsRef.current.splice(0, Math.max(0, bloomsRef.current.length - (maxBlooms - 1)));
    }

    const hue = pick(SACRED_PALETTE_HUES) + (Math.random() * 10 - 5);
    const sat = 82 + Math.random() * 12;
    const light = 58 + Math.random() * 12;

    const scale = Math.max(0.2, bloomScale) * (0.65 + Math.random() * 0.6) * (0.8 + intensity * 0.6);
    const targetA = -Math.PI / 2;
    const len = (h * 0.12 + Math.random() * (h * 0.22) + 40) * (0.65 + scale);
    const angle = targetA + (Math.random() - 0.5) * 0.75;

    const s: Stem = {
      id: `${Date.now()}-${Math.random()}`,
      x: Math.max(w * 0.03, Math.min(w * 0.97, x + (Math.random() - 0.5) * 14)),
      y: Math.max(h * 0.1, Math.min(h * 0.98, y + 10 + Math.random() * 18)),
      targetLen: len,
      grown: 0,
      speed: 1.6 + Math.random() * 2.2,
      a: angle,
      targetA,
      segs: [{ x, y, a: angle }],
      done: false,
      hasFlower: false,
      type: (Math.random() * 6) | 0,
      scale,
      hue,
      sat,
      light
    };
    stemsRef.current.push(s);
  }, [bloomScale, maxBlooms]);

  const addBloom = useCallback((x: number, y: number, type: number, scale: number, hue: number, sat: number, light: number) => {
    const b: Bloom = {
      id: `${Date.now()}-${Math.random()}`,
      x,
      y,
      age: 0,
      maxAge: 85 + Math.random() * 70,
      type,
      scale,
      hue,
      sat,
      light
    };
    bloomsRef.current.push(b);
  }, []);

  const drawBlob = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, r: number, c: { h: number; s: number; l: number }, a: number, angle = 0, stretch = 1.6) => {
    const jitter = r * 0.25;
    for (let i = 0; i < 2; i++) {
      const jx = (Math.random() - 0.5) * jitter;
      const jy = (Math.random() - 0.5) * jitter;
      const rr = Math.max(0.6, r * (0.75 + Math.random() * 0.5));
      const rx = rr * stretch;
      const ry = rr * (0.55 + Math.random() * 0.55);
      const aa = angle + (Math.random() - 0.5) * 0.35;
      ctx.beginPath();
      ctx.ellipse(x + jx, y + jy, rx, ry, aa, 0, Math.PI * 2);
      ctx.fillStyle = hsl({ h: c.h + (Math.random() * 10 - 5), s: c.s, l: c.l + (Math.random() * 12 - 6) }, a);
      ctx.fill();
    }
  }, [hsl]);

  const stroke = useCallback((ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, c: { h: number; s: number; l: number }, w: number, a: number) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = hsl({ h: c.h + (Math.random() * 8 - 4), s: c.s, l: c.l + (Math.random() * 10 - 5) }, a);
    ctx.lineWidth = Math.max(0.2, w * (0.8 + Math.random() * 0.5));
    ctx.stroke();
  }, [hsl]);

  const stepStem = useCallback((s: Stem) => {
    const stepSize = 5;
    const steps = Math.max(1, Math.floor(s.speed));
    for (let k = 0; k < steps; k++) {
      if (s.grown >= s.targetLen) {
        s.done = true;
        break;
      }
      const last = s.segs[s.segs.length - 1];
      let a = last.a;
      a += ((s.targetA ?? -Math.PI / 2) - a) * 0.04 + (Math.random() - 0.5) * 0.12;
      const nx = last.x + Math.cos(a) * stepSize;
      const ny = last.y + Math.sin(a) * stepSize;
      s.segs.push({ x: nx, y: ny, a });
      s.grown += stepSize;
    }
    if (s.grown >= s.targetLen) s.done = true;
  }, []);

  const drawStem = useCallback((ctx: CanvasRenderingContext2D, s: Stem) => {
    const segs = s.segs;
    if (segs.length < 2) return;
    const stemBase = { h: 95, s: 45, l: 38 }; // Tulsi Green
    const stemAlt = { h: 110, s: 45, l: 30 };
    const maxI = segs.length - 1;
    const total = Math.max(1, Math.floor(s.targetLen / 5));
    const start = Math.max(1, maxI - 4);

    for (let i = start; i <= maxI; i++) {
      const prev = segs[i - 1];
      const cur = segs[i];
      const t = i / total;
      const w = (2.8 * (1 - t) + 0.8) * s.scale;
      stroke(ctx, prev.x, prev.y, cur.x, cur.y, stemAlt, w * 0.7, 0.22);
      stroke(ctx, prev.x, prev.y, cur.x, cur.y, stemBase, w, 0.18);

      const leafChance = 0.12;
      if (i > 5 && i < maxI - 3 && Math.random() < leafChance) {
        const a = cur.a + (Math.random() < 0.5 ? -1 : 1) * (0.6 + Math.random() * 0.7);
        const len = (10 + Math.random() * 22) * s.scale;
        const tipX = cur.x + Math.cos(a) * len;
        const tipY = cur.y + Math.sin(a) * len;
        const leaf = { h: 95 + (Math.random() * 10 - 5), s: 50, l: 45 };
        drawBlob(ctx, (cur.x + tipX) * 0.5, (cur.y + tipY) * 0.5, (4 + Math.random() * 4) * s.scale, leaf, 0.12, a, 2.2);
        stroke(ctx, cur.x, cur.y, tipX, tipY, stemAlt, Math.max(0.35, w * 0.35), 0.18);
      }
    }
  }, [drawBlob, stroke]);

  const drawBloom = useCallback((ctx: CanvasRenderingContext2D, b: Bloom) => {
    b.age += 1;
    const t = clamp01(b.age / 55);
    const bloom = 0.15 + t * 0.85;
    const fadeOut = clamp01((b.maxAge - b.age) / 25);

    const hue = b.hue;
    const fs = b.sat;
    const fl = b.light;
    const base = { h: hue, s: fs, l: fl };
    const light = { h: hue + 4, s: Math.max(20, fs - 8), l: Math.min(92, fl + 14) };
    const dark = { h: hue, s: Math.min(100, fs + 12), l: Math.max(16, fl - 20) };
    const stamen = { h: 42, s: 90, l: 52 };
    const s = b.scale;
    const headX = b.x + (Math.random() - 0.5) * 0.2;
    const headY = b.y - (8 + Math.random() * 6) * s * bloom;

    const petalCount = 8 + (b.type % 5) * 2;
    const radius = 10 * s * bloom;

    for (let i = 0; i < petalCount; i++) {
      if (Math.random() > 0.8) continue;
      const baseA = -Math.PI / 2 + (Math.PI * 2 * i) / petalCount;
      const a = baseA + (Math.random() - 0.5) * 0.35;
      const dist = radius * (0.75 + Math.random() * 0.85);
      const px = headX + Math.cos(a) * dist;
      const py = headY + Math.sin(a) * dist;
      const stretch = 1.6 + Math.random() * 0.9;
      const main = Math.random() > 0.65 ? light : base;
      drawBlob(ctx, px, py, radius * (0.55 + Math.random() * 0.25), main, fadeOut * 0.08 * (0.6 + watercolor * 0.8), a, stretch);
      drawBlob(ctx, (px + headX) * 0.5, (py + headY) * 0.5, radius * 0.45, dark, fadeOut * 0.06 * (0.7 + watercolor * 0.7), a + 0.1, stretch * 0.95);
    }

    const core = (5 + Math.random() * 3) * s * bloom;
    drawBlob(ctx, headX, headY + 1 * s, core * 1.05, dark, fadeOut * 0.09 * (0.7 + watercolor * 0.8), 0, 1.2);

    if (b.age > 8) {
      for (let i = 0; i < 6; i++) {
        if (Math.random() > 0.5) continue;
        const aa = Math.random() * Math.PI * 2;
        const dd = (1 + Math.random() * 5) * s * bloom;
        const dx = headX + Math.cos(aa) * dd;
        const dy = headY + Math.sin(aa) * dd;
        drawBlob(ctx, dx, dy, (1.2 + Math.random() * 1.8) * s * bloom, stamen, fadeOut * 0.1, aa, 1);
      }
    }
  }, [drawBlob, watercolor]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const paint = paintCanvasRef.current;
    if (!canvas || !paint) return;

    const { w, h, dpr } = sizeRef.current;
    if (w <= 0 || h <= 0) return;

    const pctx = get2D(paint);
    const dctx = get2D(canvas);
    if (!pctx || !dctx) return;

    for (const s of stemsRef.current) {
      if (!s.done) {
        stepStem(s);
        drawStem(pctx, s);
      } else if (!s.hasFlower) {
        const segs = s.segs;
        const anchor = segs[Math.max(1, segs.length - 2)];
        addBloom(anchor.x, anchor.y, s.type, Math.max(0.2, s.scale * (0.8 + Math.random() * 0.5)), s.hue, s.sat, s.light);
        s.hasFlower = true;
      }
    }

    let anyBloomAlive = false;
    const blooms = bloomsRef.current;
    for (let i = 0; i < blooms.length; i++) {
      const b = blooms[i];
      if (b.age < b.maxAge) {
        drawBloom(pctx, b);
        anyBloomAlive = true;
      }
    }

    dctx.setTransform(1, 0, 0, 1, 0, 0);
    dctx.clearRect(0, 0, canvas.width, canvas.height);
    dctx.scale(dpr, dpr);

    const blurPx = Math.max(0, blur);
    const wc = clamp01(watercolor);
    dctx.filter = `blur(${blurPx * (0.5 + wc * 0.9)}px) contrast(${1.02 + wc * 0.08}) saturate(${1.05 + wc * 0.15})`;
    dctx.globalAlpha = 1;
    dctx.drawImage(paint, 0, 0, w * dpr, h * dpr, 0, 0, w, h);
    dctx.filter = 'none';

    stemsRef.current = stemsRef.current.filter(s => !(s.done && s.hasFlower));
    if (bloomsRef.current.length > maxBlooms) {
      bloomsRef.current.splice(0, bloomsRef.current.length - maxBlooms);
    }

    const shouldContinue = hoverRef.current || stemsRef.current.length > 0 || anyBloomAlive;
    if (shouldContinue) {
      rafRef.current = requestAnimationFrame(render);
    } else {
      runningRef.current = false;
      rafRef.current = null;
    }
  }, [addBloom, blur, drawBloom, drawStem, get2D, maxBlooms, stepStem, watercolor]);

  const ensureLoop = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (runningRef.current) return;
    runningRef.current = true;
    rafRef.current = requestAnimationFrame(render);
  }, [render]);

  const onPointerEnter = useCallback(() => {
    hoverRef.current = true;
    ensureLoop();
  }, [ensureLoop]);

  const onPointerLeave = useCallback(() => {
    hoverRef.current = false;
    lastPointerRef.current = null;
    spawnAccRef.current = 0;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!hoverRef.current) return;
    const host = hostRef.current;
    if (!host) return;

    const rect = host.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    const last = lastPointerRef.current;

    let intensity = 0.35;
    if (last) {
      const dt = Math.max(1, now - last.t);
      const dx = x - last.x;
      const dy = y - last.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / dt;
      intensity = clamp01(0.25 + speed * 3.2);
    }
    lastPointerRef.current = { x, y, t: now };

    const rate = Math.max(0, spawnRate);
    const dt = last ? Math.max(0, now - last.t) / 1000 : 1 / 60;
    spawnAccRef.current += rate * dt;

    while (spawnAccRef.current >= 1) {
      spawnAccRef.current -= 1;
      spawnStemAt(x + (Math.random() - 0.5) * 10, y + (Math.random() - 0.5) * 10, intensity);
    }
    ensureLoop();
  }, [ensureLoop, spawnRate, spawnStemAt]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const host = hostRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spawnStemAt(x, y, 0.9);
    ensureLoop();
  }, [ensureLoop, spawnStemAt]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    ensureCanvases();
    resizeToHost();

    const host = hostRef.current;
    if (!host) return;

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        resizeToHost();
      });
      ro.observe(host);
    }

    return () => {
      if (ro) ro.disconnect();
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      runningRef.current = false;
    };
  }, [ensureCanvases, resizeToHost]);

  const gridBackground = useMemo(() => {
    if (!grid) return 'none';
    const s = Math.max(6, gridSize);
    const dot = Math.max(0.5, gridDotSize);
    return `radial-gradient(${gridColor} ${dot}px, transparent ${dot}px)`;
  }, [grid, gridColor, gridDotSize, gridSize]);

  return (
    <div
      ref={hostRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{
        backgroundColor,
        backgroundImage: gridBackground,
        backgroundSize: grid ? `${Math.max(6, gridSize)}px ${Math.max(6, gridSize)}px` : undefined,
        touchAction: 'none',
        ...style
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      role="application"
      aria-label="Hover Bloom canvas"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
      {/* Paper texture tint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          background: `linear-gradient(135deg, ${paperTint} 0%, rgba(255,255,255,0) 62%)`
        }}
      />
    </div>
  );
};
