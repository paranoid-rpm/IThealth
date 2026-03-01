import { useEffect, useRef } from 'react';

type GlowCanvasProps = {
  className?: string;
};

export default function GlowCanvas(props: GlowCanvasProps) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let t0 = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      t0 = now;

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const time = now / 1000;

      ctx.clearRect(0, 0, w, h);

      const cx1 = w * (0.35 + 0.05 * Math.sin(time * 0.9));
      const cy1 = h * (0.35 + 0.06 * Math.cos(time * 0.8));
      const cx2 = w * (0.70 + 0.06 * Math.cos(time * 0.7));
      const cy2 = h * (0.55 + 0.05 * Math.sin(time * 0.6));

      const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, Math.max(w, h) * 0.55);
      g1.addColorStop(0, 'rgba(167, 139, 250, 0.16)');
      g1.addColorStop(1, 'rgba(167, 139, 250, 0)');

      const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, Math.max(w, h) * 0.6);
      g2.addColorStop(0, 'rgba(236, 72, 153, 0.12)');
      g2.addColorStop(1, 'rgba(236, 72, 153, 0)');

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(255,255,255,0.015)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);

    raf = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
      void t0;
    };
  }, []);

  return <canvas ref={ref} className={props.className} aria-hidden="true" />;
}
