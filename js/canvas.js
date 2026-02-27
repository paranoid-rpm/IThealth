/* ========== CANVAS BACKGROUNDS ========== */

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
  const N = 70;
  const pts = new Array(N).fill(0).map(() => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    r: 1 + Math.random() * 2
  }));

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(32, now - last);
    last = now;

    const { w, h } = size();
    ctx.clearRect(0, 0, w, h);

    // background vignette
    const g = ctx.createRadialGradient(w * 0.5, h * 0.2, 0, w * 0.5, h * 0.2, Math.max(w, h));
    g.addColorStop(0, 'rgba(6,214,160,0.10)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.lineWidth = 1;

    // update
    for (const p of pts) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.x < -0.05) p.x = 1.05;
      if (p.x > 1.05) p.x = -0.05;
      if (p.y < -0.05) p.y = 1.05;
      if (p.y > 1.05) p.y = -0.05;
    }

    // links
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = (a.x - b.x) * w;
        const dy = (a.y - b.y) * h;
        const dist = Math.hypot(dx, dy);
        if (dist < 140) {
          const alpha = (1 - dist / 140) * 0.25;
          ctx.strokeStyle = `rgba(17,138,178,${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      }
    }

    // points
    for (const p of pts) {
      ctx.fillStyle = 'rgba(226,232,240,0.65)';
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

    const mid = h * 0.55;
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 14) {
        const y = mid + Math.sin((x / 180) + t + k) * (16 + k * 9) + Math.cos((x / 65) - t * 0.7) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = k === 0 ? 'rgba(6,214,160,0.18)' : k === 1 ? 'rgba(17,138,178,0.14)' : 'rgba(239,71,111,0.10)';
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

    const step = 60;
    for (let y = -step; y < h + step; y += step) {
      for (let x = -step; x < w + step; x += step) {
        const nx = x + Math.sin((y / 120) + t) * 10;
        const ny = y + Math.cos((x / 120) - t) * 10;

        ctx.fillStyle = 'rgba(6,214,160,0.06)';
        ctx.beginPath();
        ctx.arc(nx, ny, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    t += 0.008;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

export { mountCanvas };
