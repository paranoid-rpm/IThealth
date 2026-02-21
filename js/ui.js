/* ========== UI ENHANCEMENTS: theme, cursor glow, toast, shortcuts ========== */

const THEME_KEY = 'ith-theme'; // dark | light

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  setTheme(saved);

  const btn = document.querySelector('[data-theme-toggle]');
  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      setTheme(next);
    });
  }
}

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

export function toast(message, ms = 2600) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = message;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 300);
  }, ms);
}

export function initShortcuts() {
  window.addEventListener('keydown', (e) => {
    // Alt+K open search
    if (e.altKey && (e.key.toLowerCase() === 'k')) {
      const input = document.querySelector('#siteSearchInput');
      if (input) {
        e.preventDefault();
        input.focus();
        toast('Поиск по сайту');
      }
    }

    // Alt+T toggle theme
    if (e.altKey && (e.key.toLowerCase() === 't')) {
      e.preventDefault();
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      setTheme(next);
      toast(next === 'light' ? 'Светлая тема' : 'Тёмная тема');
    }
  });
}

export function initCursorGlow() {
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  window.addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
}
