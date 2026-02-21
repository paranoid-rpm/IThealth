/* ========== APP ENTRY POINT ========== */
import { initI18n } from './i18n.js';
import { initNav } from './nav.js';
import { initReveal, initParallax, initReadingProgress, initCountUp, initPageTransitions } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initNav();
  initReveal();
  initParallax();
  initReadingProgress();
  initCountUp();
  initPageTransitions();
});
