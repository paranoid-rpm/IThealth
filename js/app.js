/* ========== APP ENTRY POINT (v2) ========== */
import { initI18n } from './i18n.js';
import { initNav } from './nav.js';
import { initReveal, initParallax, initReadingProgress, initCountUp, initPageTransitions } from './animations.js';
import { initTheme, initShortcuts, initCursorGlow } from './ui.js';
import { initSearch } from './search.js';
import { initTOC } from './toc.js';
import { mountCanvas } from './canvas.js';

function initPWA() {
  const m = document.createElement('link');
  m.rel = 'manifest';
  m.href = './manifest.webmanifest';
  document.head.appendChild(m);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

function mountGlobalUI() {
  if (!document.querySelector('[data-search-root]')) {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.dataset.searchRoot = '1';
    modal.innerHTML = `
      <div class="search-modal-backdrop" data-search-close></div>
      <div class="search-modal-card">
        <div class="search-top">
          <div class="search-pill">Alt+K</div>
          <input id="siteSearchInput" class="search-input" placeholder="Поиск по сайту…" />
          <button class="btn btn-outline" data-search-close>Закрыть</button>
        </div>
        <div id="siteSearchResults" class="search-results"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const open = () => { modal.classList.add('open'); document.getElementById('siteSearchInput')?.focus(); };
    const close = () => modal.classList.remove('open');

    window.addEventListener('keydown', (e) => {
      if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        open();
      }
      if (e.key === 'Escape') close();
    });

    modal.querySelectorAll('[data-search-close]').forEach(el => el.addEventListener('click', close));
  }

  const nav = document.querySelector('.navbar .container');
  if (nav && !document.querySelector('[data-theme-toggle]')) {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline';
    btn.style.padding = '8px 14px';
    btn.style.fontSize = '12px';
    btn.dataset.themeToggle = '1';
    btn.textContent = 'Theme';
    nav.appendChild(btn);
  }

  const article = document.querySelector('.article');
  if (article && !document.querySelector('[data-toc]')) {
    const tocHost = document.createElement('div');
    tocHost.dataset.toc = '1';
    tocHost.className = 'toc-host';
    tocHost.innerHTML = `<div class="toc-title">Оглавление</div>`;
    const h2 = article.querySelector('h2');
    if (h2) h2.parentNode.insertBefore(tocHost, h2);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPWA();

  // Canvas style per page
  if (document.body.classList.contains('home')) {
    document.documentElement.dataset.canvasStyle = 'particles';
  } else if (document.location.pathname.includes('eyes')) {
    document.documentElement.dataset.canvasStyle = 'mesh';
  } else if (document.location.pathname.includes('mental')) {
    document.documentElement.dataset.canvasStyle = 'waves';
  } else {
    document.documentElement.dataset.canvasStyle = 'particles';
  }

  mountCanvas();

  mountGlobalUI();

  initI18n();
  initNav();
  initTheme();
  initShortcuts();
  initCursorGlow();

  initReveal();
  initParallax();
  initReadingProgress();
  initCountUp();
  initPageTransitions();

  initSearch();
  initTOC();
});
