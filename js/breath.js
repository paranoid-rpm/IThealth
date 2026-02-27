/* ========== BREATHING CANVAS (4-6) ========== */
import { toast } from './ui.js';

let raf = null;
let running = false;

function draw(ctx, w, h, phase, p) {
  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, 'rgba(167,139,250,.12)');
  bg.addColorStop(0.5, 'rgba(236,72,153,.08)');
  bg.addColorStop(1, 'rgba(245,158,11,.06)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const base = Math.min(w, h) * 0.18;
  const amp = Math.min(w, h) * 0.12;
  const r = base + amp * p;

  // ring
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(167,139,250,.18)';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, cy, r + 14, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(250,250,250,.12)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // text
  ctx.fillStyle = 'rgba(250,250,250,.88)';
  ctx.font = '800 22px Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(phase === 'in' ? 'Вдох' : 'Выдох', cx, cy - 8);

  ctx.fillStyle = 'rgba(250,250,250,.55)';
  ctx.font = '600 14px Inter, system-ui, sans-serif';
  ctx.fillText('4с / 6с', cx, cy + 18);
}

function loop(canvas, ctx) {
  const w = canvas.width;
  const h = canvas.height;

  const IN_MS = 4000;
  const OUT_MS = 6000;
  const start = performance.now();

  const frame = (now) => {
    if (!running) return;
    const t = (now - start) % (IN_MS + OUT_MS);

    if (t < IN_MS) {
      const p = t / IN_MS;
      draw(ctx, w, h, 'in', p);
    } else {
      const p = 1 - ((t - IN_MS) / OUT_MS);
      draw(ctx, w, h, 'out', p);
    }

    raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);
}

function init() {
  const canvas = document.getElementById('breathCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const startBtn = document.getElementById('breathStart');
  const stopBtn = document.getElementById('breathStop');

  const start = () => {
    if (running) return;
    running = True
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('breathCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const startBtn = document.getElementById('breathStart');
  const stopBtn = document.getElementById('breathStop');

  const start = () => {
    if (running) return;
    running = true;
    toast('Дышим: вдох 4с, выдох 6с');
    loop(canvas, ctx);
  };

  const stop = () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    draw(ctx, canvas.width, canvas.height, 'in', 0.2);
    toast('Остановлено');
  };

  startBtn?.addEventListener('click', start);
  stopBtn?.addEventListener('click', stop);

  draw(ctx, canvas.width, canvas.height, 'in', 0.2);
});
