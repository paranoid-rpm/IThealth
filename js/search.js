/* ========== SITE SEARCH (client-side) ========== */
import { getLang } from './i18n.js';

const PAGES = [
  { href: 'index.html', titleRu: 'Главная', titleEn: 'Home' },
  { href: 'diseases.html', titleRu: 'Профессиональные заболевания', titleEn: 'Occupational diseases' },
  { href: 'risks.html', titleRu: 'Факторы риска', titleEn: 'Risk factors' },
  { href: 'prevention.html', titleRu: 'Профилактика', titleEn: 'Prevention' },
  { href: 'ergonomics.html', titleRu: 'Эргономика', titleEn: 'Ergonomics' },
  { href: 'eyes.html', titleRu: 'Здоровье глаз', titleEn: 'Eye health' },
  { href: 'mental.html', titleRu: 'Ментальное здоровье', titleEn: 'Mental health' },
  { href: 'exercises.html', titleRu: 'Упражнения и перерывы', titleEn: 'Exercises & breaks' },
  { href: 'quiz.html', titleRu: 'Тест самооценки', titleEn: 'Quiz' },
  { href: 'resources.html', titleRu: 'Ресурсы', titleEn: 'Resources' }
];

function pageTitle(p) {
  return getLang() === 'en' ? p.titleEn : p.titleRu;
}

async function indexPage(href) {
  const res = await fetch(`./${href}`);
  const html = await res.text();
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const title = doc.querySelector('title')?.textContent || pageTitle(PAGES.find(p => p.href === href) || { titleRu: href, titleEn: href });
  const text = doc.body?.innerText || '';
  return { href, title, text: text.replace(/\s+/g, ' ').trim() };
}

let INDEX = null;

export async function initSearch() {
  const root = document.querySelector('[data-search-root]');
  if (!root) return;

  const input = document.getElementById('siteSearchInput');
  const list = document.getElementById('siteSearchResults');

  if (!input || !list) return;

  // Lazy index build
  if (!INDEX) {
    list.innerHTML = '<div class="small" style="color:var(--clr-text-muted)">Индексируем страницы…</div>';
    INDEX = await Promise.all(PAGES.map(p => indexPage(p.href)));
  }

  const render = (items) => {
    list.innerHTML = '';
    if (!items.length) {
      list.innerHTML = '<div class="small" style="color:var(--clr-text-muted)">Ничего не найдено.</div>';
      return;
    }
    items.slice(0, 8).forEach(it => {
      const a = document.createElement('a');
      a.href = `./${it.href}`;
      a.className = 'search-item';
      a.innerHTML = `<div class="search-title">${it.title}</div><div class="search-snippet">${it.snippet}</div>`;
      list.appendChild(a);
    });
  };

  const search = (q) => {
    const query = q.trim().toLowerCase();
    if (!query) {
      render(PAGES.map(p => ({ href: p.href, title: pageTitle(p), snippet: 'Открыть страницу' })));
      return;
    }

    const results = INDEX.map(doc => {
      const pos = doc.text.toLowerCase().indexOf(query);
      const score = pos === -1 ? 0 : (1000 - pos);
      const snippet = pos === -1 ? '' : doc.text.slice(Math.max(0, pos - 70), pos + 130) + '…';
      return { href: doc.href, title: doc.title, snippet, score };
    }).filter(r => r.score > 0).sort((a,b) => b.score - a.score);

    render(results);
  };

  input.addEventListener('input', () => search(input.value));

  // First render
  render(PAGES.map(p => ({ href: p.href, title: pageTitle(p), snippet: 'Открыть страницу' })));
}
