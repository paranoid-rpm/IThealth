import { useEffect, useRef } from 'react';

export type HudCanvasProps = {
  className?: string;
  intensity?: number;
};

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

export default function HudCanvas({ className, intensity = 1 }: HudCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const k = clamp01(intensity);

    let raf = 0;
    let alive = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGrid = (w: number, h: number, t: number) => {
      ctx.save();
      ctx.globalAlpha = 0.18 * k;
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;

      const step = 56;
      const offset = (t * 10) % step;
      for (let x = -step; x <= w + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, h);
        ctx.stroke();
      }
      for (let y = -step; y <= h + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(w, y + offset);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawGlow = (w: number, h: number, t: number) => {
      const time = t;
      const cx1 = w * (0.30 + 0.06 * Math.sin(time * 0.8));
      const cy1 = h * (0.25 + 0.05 * Math.cos(time * 0.7));
      const cx2 = w * (0.78 + 0.05 * Math.cos(time * 0.6));
      const cy2 = h * (0.55 + 0.06 * Math.sin(time * 0.5));

      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, Math.max(w, h) * 0.55);
      g1.addColorStop(0, `rgba(167, 139, 250, ${0.16 * k})`);
      g1.addColorStop(1, 'rgba(167, 139, 250, 0)');

      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(w, h) * 0.60);
      g2.addColorStop(0, `rgba(236, 72, 153, ${0.12 * k})`);
      g2.addColorStop(1, 'rgba(236, 72, 153, 0)');

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
    };

    const drawRig = (w: number, h: number, t: number) => {
      ctx.save();
      ctx.globalAlpha = 1;

      const baseX = w * 0.52;
      const baseY = h * 0.58;
      const s = Math.min(w, h);

      const sway = prefersReduced ? 0 : 0.012 * Math.sin(t * 0.9);

      const chairW = s * 0.28;
      const chairH = s * 0.20;

      const deskY = baseY + s * 0.12;

      ctx.globalAlpha = 0.55 * k;
      ctx.strokeStyle = 'rgba(255,255,255,0.14)';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.roundRect(baseX - chairW * 0.45, baseY + chairH * 0.05, chairW * 0.9, chairH * 0.6, 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(baseX - chairW * 0.38, baseY - chairH * 0.25, chairW * 0.76, chairH * 0.35, 16);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(baseX - s * 0.35, deskY);
      ctx.lineTo(baseX + s * 0.42, deskY);
      ctx.stroke();

      const monW = s * 0.22;
      const monH = s * 0.14;
      const monX = baseX + s * 0.20;
      const monY = deskY - s * 0.18;

      ctx.beginPath();
      ctx.roundRect(monX - monW / 2, monY - monH / 2, monW, monH, 14);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(monX, monY + monH / 2);
      ctx.lineTo(monX, monY + monH / 2 + s * 0.06);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(monX - s * 0.04, monY + monH / 2 + s * 0.06);
      ctx.lineTo(monX + s * 0.04, monY + monH / 2 + s * 0.06);
      ctx.stroke();

      const headX = baseX - s * 0.02;
      const headY = baseY - s * 0.18;

      const neckX = baseX + s * (0.02 + sway);
      const neckY = baseY - s * 0.11;

      const torsoX = baseX - s * 0.02;
      const torsoY = baseY + s * 0.03;

      ctx.globalAlpha = 0.65 * k;
      ctx.beginPath();
      ctx.arc(headX, headY, s * 0.045, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(headX, headY + s * 0.045);
      ctx.lineTo(neckX, neckY);
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(torsoX - s * 0.06, torsoY - s * 0.08, s * 0.12, s * 0.18, 18);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(torsoX + s * 0.05, torsoY - s * 0.03);
      ctx.lineTo(torsoX + s * 0.14, torsoY + s * 0.02);
      ctx.lineTo(torsoX + s * 0.21, torsoY - s * 0.02);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(torsoX - s * 0.05, torsoY - s * 0.03);
      ctx.lineTo(torsoX - s * 0.14, torsoY + s * 0.02);
      ctx.lineTo(torsoX - s * 0.21, torsoY - s * 0.02);
      ctx.stroke();

      const pulse = prefersReduced ? 0.6 : 0.55 + 0.25 * (0.5 + 0.5 * Math.sin(t * 1.3));
      ctx.globalAlpha = (0.18 + 0.18 * pulse) * k;
      ctx.fillStyle = 'rgba(236, 72, 153, 1)';
      ctx.beginPath();
      ctx.arc(neckX, neckY, s * 0.06, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(167, 139, 250, 1)';
      ctx.beginPath();
      ctx.arc(torsoX + s * 0.16, torsoY + s * 0.01, s * 0.06, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const loop = (now: number) => {
      if (!alive) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const t = now / 1000;

      ctx.clearRect(0, 0, w, h);
      drawGlow(w, h, t);
      drawGrid(w, h, t);
      drawRig(w, h, t);

      raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
