/* ========== SCROLL REVEAL & ANIMATIONS ========== */

export function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty('--i', i);
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

export function initParallax() {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.3;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

export function initReadingProgress() {
  const bar = document.querySelector('.reading-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.transform = `scaleX(${Math.min(progress, 1)})`;
  }, { passive: true });
}

export function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function step(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* Smooth page transitions */
export function initPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

    link.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('page-exit');
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });

  window.addEventListener('pageshow', () => {
    document.body.classList.remove('page-exit');
    document.body.classList.add('page-enter');
    setTimeout(() => document.body.classList.remove('page-enter'), 500);
  });
}
