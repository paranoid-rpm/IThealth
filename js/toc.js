/* ========== TABLE OF CONTENTS (auto) ========== */

export function initTOC() {
  const host = document.querySelector('[data-toc]');
  const article = document.querySelector('.article');
  if (!host || !article) return;

  const headers = Array.from(article.querySelectorAll('h2, h3'));
  if (!headers.length) return;

  const ul = document.createElement('div');
  ul.className = 'toc';

  headers.forEach((h, i) => {
    if (!h.id) h.id = `sec-${i}`;
    const a = document.createElement('a');
    a.href = `#${h.id}`;
    a.className = 'toc-link';
    a.textContent = h.textContent;
    a.dataset.level = h.tagName;
    ul.appendChild(a);
  });

  host.appendChild(ul);

  // active section highlight
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.toc-link').forEach(x => x.classList.remove('active'));
        const link = document.querySelector(`.toc-link[href="#${e.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

  headers.forEach(h => obs.observe(h));
}
