/* ========== PWA Service Worker ========== */

const CACHE_NAME = 'ith-cache-v2';

const ASSETS = [
  './',
  './index.html',
  './prevention.html',
  './risks.html',
  './eyes.html',
  './mental.html',
  './exercises.html',
  './quiz.html',
  './resources.html',
  './manifest.webmanifest',

  './js/app.js',
  './js/i18n.js',
  './js/nav.js',
  './js/animations.js',
  './js/eyeTimer.js',
  './js/breakTimer.js',
  './js/quiz.js',
  './js/ui.js',
  './js/search.js',
  './js/toc.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // Cache resiliently: one missing file should not break SW install.
      const requests = ASSETS.map((url) => new Request(url, { cache: 'reload' }));
      await Promise.allSettled(requests.map((req) => cache.add(req)));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return res;
      }).catch(() => {
        // Fallback to home page if navigation fails
        if (req.mode === 'navigate') return caches.match('./index.html');
        return cached;
      });
    })
  );
});
