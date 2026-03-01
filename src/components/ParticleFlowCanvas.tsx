import { useEffect, useMemo, useRef } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';

export type ParticleFlowCanvasProps = {
  className?: string;
  intensity?: number;
};

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  a: number;
  r: number;
  hue: number;
};

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function hash01(n: number) {
  const x = Math.sin(n) * 10000;
  return x - Math.floor(x);
}

export default function ParticleFlowCanvas({ className, intensity = 1 }: ParticleFlowCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  const reduced = useReducedMotion();

  const opts = useMemo(() => {
    const k = clamp01(intensity);
    return {
      k,
      count: Math.floor(90 + 180 * k),
      maxSpeed: 0.38 + 0.55 * k,
      linkDist: 110 - 25 * k,
      fade: 0.07 + 0.08 * k,
    };
  }, [intensity]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (reduced) return;

    let raf = 0;
    let alive = true;

    const particles: P[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < opts.count; i++) {
        const u = hash01(i * 12.9898);
        const v = hash01(i * 78.233);
        const s = hash01(i * 3.11);
        const x = u * w;
        const y = v * h;
        const ang = s * Math.PI * 2;
        const sp = (0.08 + 0.12 * hash01(i * 9.7)) * opts.maxSpeed;
        particles.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp,
          a: 0.22 + 0.30 * hash01(i * 5.3) * opts.k,
          r: 0.9 + 1.8 * hash01(i * 2.7),
          hue: 250 + 60 * hash01(i * 1.7),
        });
      }
    };

    const field = (x: number, y: number, t: number) => {
      const nx = x * 0.0022;
      const ny = y * 0.0022;
      const a = Math.sin(nx * 2.1 + t * 0.45) + Math.cos(ny * 1.9 - t * 0.35);
      const b = Math.sin((nx + ny) * 1.7 + t * 0.25);
      const ang = (a + b) * 1.6;
      return { ax: Math.cos(ang), ay: Math.sin(ang) };
    };

    const step = (w: number, h: number, t: number) => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const f = field(p.x, p.y, t);
        const sp = opts.maxSpeed;
        p.vx = 0.92 * p.vx + 0.08 * f.ax * sp;
        p.vy = 0.92 * p.vy + 0.08 * f.ay * sp;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;
      }
    };

    const draw = (w: number, h: number) => {
      ctx.fillStyle = `rgba(0,0,0,${opts.fade})`;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.fillStyle = `hsla(${p.hue}, 95%, 68%, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 1;
      const d2 = opts.linkDist * opts.linkDist;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dd = dx * dx + dy * dy;
          if (dd < d2) {
            const alpha = (1 - dd / d2) * 0.14 * opts.k;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.restore();
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      seed(rect.width, rect.height);
    };

    init();

    const loop = (now: number) => {
      if (!alive) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const t = now / 1000;

      step(w, h, t);
      draw(w, h);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [opts, reduced]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
