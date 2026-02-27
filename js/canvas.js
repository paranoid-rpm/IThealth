/* ========== CANVAS BACKGROUNDS v2 ========== */

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function mountCanvas() {
  if (prefersReducedMotion()) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;

  const resize = () => {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();

  const style = document.documentElement.dataset.canvasStyle || 'particles';

  if (style === 'waves') return waves(ctx, () => ({ w, h }));
  if (style === 'mesh') return mesh(ctx, () => ({ w, h }));
  return particles(ctx, () => ({ w, h }));
}

function particles(ctx, size) {
  const N = 90;
  const pts = new Array(N).fill(0).map(() => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    r: 1 + Math.random() * 2.2
  }));

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(32, now - last);
    last = now;

    const { w, h } = size();
    ctx.clearRect(0, 0, w, h);

    const g = ctx.createRadialGradient(w * 0.35, h * 0.25, 0, w * 0.35, h * 0.25, Math.max(w, h));
    g.addColorStop(0, 'rgba(167,139,250,0.10)');
    g.addColorStop(0.6, 'rgba(236,72,153,0.06)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (const p of pts) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.x < -0.05) p.x = 1.05;
      if (p.x > 1.05) p.x = -0.05;
      if (p.y < -0.05) p.y = 1.05;
      if (p.y > 1.05) p.y = -0.05;
    }

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = (a.x - b.x) * w;
        const dy = (a.y - b.y) * h;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const alpha = (1 - dist / 150) * 0.22;
          ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      }
    }

    for (const p of pts) {
      ctx.fillStyle = 'rgba(250,250,250,0.60)';
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function waves(ctx, size) {
  let t = 0;
  function frame() {
    const { w, h } = size();
    ctx.clearRect(0, 0, w, h);

    const mid = h * 0.58;
    for (let k = 0; k < 4; k++) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 12) {
        const y = mid + Math.sin((x / 170) + t + k * 0.6) * (14 + k * 7) + Math.cos((x / 55) - t * 0.7) * 7;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = k % 2 === 0 ? 'rgba(236,72,153,0.12)' : 'rgba(167,139,250,0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    t += 0.01;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function mesh(ctx, size) {
  let t = 0;
  function frame() {
    const { w, h } = size();
    ctx.clearRect(0, 0, w, h);

    const step = 56;
    for (let y = -step; y < h + step; y += step) {
      for (let x = -step; x < w + step; x += step) {
        const nx = x + Math.sin((y / 120) + t) * 10;
        const ny = y + Math.cos((x / 120) - t) * 10;

        ctx.fillStyle = 'rgba(245,158,11,0.05)';
        ctx.beginPath();
        ctx.arc(nx, ny, 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    t += 0.008;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export { mountCanvas };
