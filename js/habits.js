/* ========== HABITS TRACKER (localStorage) ========== */
import { toast } from './ui.js';

const KEY = 'ith-habits-v1';
const DEFAULTS = [
  { id: 'breaks', title: 'Перерывы 45/5', hint: 'Запусти таймер и реально встань.' },
  { id: 'water', title: 'Вода', hint: '1–2 стакана в первой половине дня.' },
  { id: 'eyes', title: 'Правило 20‑20‑20', hint: '20 минут → 20 секунд вдаль.' },
  { id: 'posture', title: 'Поза', hint: 'Плечи вниз, шея нейтрально.' },
  { id: 'wrists', title: 'Кисти', hint: 'Растяжка сгибателей/разгибателей.' },
  { id: 'walk', title: 'Прогулка 20–30 минут', hint: 'Лучше днём или после работы.' },
  { id: 'sleep', title: 'Сон', hint: 'Стабильный подъём — ключ.' },
];

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function save(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

function pct(done, total) {
  return Math.round((done / total) * 100);
}

function render(root) {
  const data = load();
  const t = todayKey();
  const day = data[t] || {};

  const doneCount = DEFAULTS.reduce((acc, h) => acc + (day[h.id] ? 1 : 0), 0);
  const total = DEFAULTS.length;

  root.innerHTML = `
    <div class="card" style="padding:18px;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
        <div>
          <div style="font-weight:900;font-size:18px;">Сегодня: ${pct(doneCount, total)}%</div>
          <div style="color:var(--clr-text-muted);font-size:12px;">Отмечено ${doneCount} из ${total}</div>
        </div>
        <button class="btn btn-outline" id="habitsClear">Сбросить день</button>
      </div>
    </div>

    <div class="grid-2" style="margin-top:12px;">
      ${DEFAULTS.map(h => `
        <button class="card" data-habit="${h.id}" style="text-align:left;cursor:pointer;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
            <div>
              <div style="font-weight:900;font-size:16px;margin-bottom:6px;">${h.title}</div>
              <div style="color:var(--clr-text-muted);font-size:12px;line-height:1.6;">${h.hint}</div>
            </div>
            <div style="font-size:18px;">${day[h.id] ? '✅' : '⬜'}</div>
          </div>
        </button>
      `).join('')}
    </div>
  `;

  root.querySelectorAll('[data-habit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.habit;
      const fresh = load();
      const d = todayKey();
      fresh[d] = fresh[d] || {};
      fresh[d][id] = !fresh[d][id];
      save(fresh);
      toast(fresh[d][id] ? 'Отмечено' : 'Снято');
      render(root);
    });
  });

  root.querySelector('#habitsClear')?.addEventListener('click', () => {
    const fresh = load();
    const d = todayKey();
    delete fresh[d];
    save(fresh);
    toast('День сброшен');
    render(root);
  });
}

function initModals() {
  const habitModal = document.getElementById('habitModal');
  const breathModal = document.getElementById('breathModal');

  const openHabit = () => { habitModal?.classList.add('open'); habitModal?.setAttribute('aria-hidden', 'false'); };
  const closeHabit = () => { habitModal?.classList.remove('open'); habitModal?.setAttribute('aria-hidden', 'true'); };

  const openBreath = () => { breathModal?.classList.add('open'); breathModal?.setAttribute('aria-hidden', 'false'); };
  const closeBreath = () => { breathModal?.classList.remove('open'); breathModal?.setAttribute('aria-hidden', 'true'); };

  document.getElementById('openHabits')?.addEventListener('click', openHabit);
  document.getElementById('openBreath')?.addEventListener('click', openBreath);

  habitModal?.querySelectorAll('[data-habit-close]').forEach(el => el.addEventListener('click', closeHabit));
  breathModal?.querySelectorAll('[data-breath-close]').forEach(el => el.addEventListener('click', closeBreath));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeHabit(); closeBreath(); }
  });

  const root = document.getElementById('habitsRoot');
  if (root) render(root);
}

document.addEventListener('DOMContentLoaded', initModals);
