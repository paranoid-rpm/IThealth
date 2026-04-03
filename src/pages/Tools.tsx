import { useMemo, useState } from 'react';
import ContentBlock from '../components/ContentBlock';

type Protocol = {
  id: string;
  title: string;
  tags: string[];
  duration: '2 мин' | '5 мин' | '10 мин' | 'Еженедельно' | '2 недели';
  steps: string[];
  why: string;
  redFlags?: string[];
};

type Tag = string;

const PROTOCOLS: Protocol[] = [
  {
    id: 'cvs-basic',
    title: 'CVS: базовая схема на 7 дней',
    tags: ['CVS', 'Зрение', 'Перерывы'],
    duration: '10 мин',
    why: 'Снимает пик нагрузки: дистанция, блики, паузы, моргание — это база, которая реально меняет симптомы.',
    steps: [
      'День 1: настройте монитор (высота/дистанция), уберите блики.',
      'День 2: внедрите правило 20-20-20 в рабочий день.',
      'День 3: проверьте освещение (300–500 лк) и контраст, уберите “фонарь” в лицо.',
      'День 4: осознанное моргание: 10 “двойных” морганий каждые 30 минут.',
      'День 5: проверьте коррекцию зрения (если щуритесь или тянетесь к экрану).',
      'День 6: оптимизируйте шрифты/контраст, увеличьте кегль.',
      'День 7: оцените симптомы и закрепите привычки.',
    ],
    redFlags: ['Острая боль в глазу, резкое падение зрения', 'Сильная светобоязнь, односторонние симптомы'],
  },
  {
    id: 'cvs-microbreaks',
    title: 'CVS: микропаузы на 2 минуты (каждый час)',
    tags: ['CVS', 'Зрение', 'Микропауы'],
    duration: '2 мин',
    why: 'Дешёвый по времени инструмент, который работает через регулярное снятие аккомодации и восстановление моргания.',
    steps: ['Встаньте и сделайте 10 шагов.', 'Переведите взгляд вдаль на 20–30 секунд.', 'Сделайте 10 медленных морганий.', 'Плечи вниз, челюсть расслабить.'],
  },
  {
    id: 'rsi-basic',
    title: 'RSI: профилактика боли в кистях/предплечьях',
    tags: ['RSI', 'Кисти', 'Эргономика'],
    duration: '5 мин',
    why: 'RSI — это “доза нагрузки”. Мы снижаем экстремальные углы, уменьшаем непрерывную нагрузку и возвращаем восстановление.',
    steps: [
      'Нейтральные запястья, опора под предплечья, локти около 90°.',
      'Каждые 45–60 минут — 2 минуты разгрузки (встать/походить).',
      'Растяжка сгибателей/разгибателей предплечья: 15 секунд × 3.',
      'Снизьте усилие нажатия клавиш и хват мыши.',
      'Ротация задач: чередуйте код/созвоны/планирование.',
    ],
    redFlags: ['Онемение/покалывание в 1–3 пальцах ночью', 'Слабость хвата, “роняете” вещи'],
  },
  {
    id: 'back-basic',
    title: 'Шея/спина: минимальная программа разгрузки',
    tags: ['Спина', 'Шея', 'Перерывы'],
    duration: '5 мин',
    why: 'Даже “идеальная” поза ломается, если держать её часами. Нужна смена положения и разгрузка.',
    steps: ['Экран не выше уровня глаз, подбородок не тянется вперёд.', 'Раз в 60 минут — 1–2 минуты ходьбы.', 'Мягкая мобилизация шеи без боли.', '2–3 раза в неделю: базовое укрепление по состоянию.'],
  },
  {
    id: 'burnout-2w',
    title: 'Выгорание: схема стабилизации на 2 недели',
    tags: ['Выгорание', 'Сон', 'Стресс'],
    duration: '2 недели',
    why: 'Цель — стабилизировать сон/нагрузку/границы и убрать хронический перерасход. Это не “мотивация”, а гигиена системы.',
    steps: ['Фиксированное время подъёма, 7–9 часов сна.', 'Ограничить рабочие чаты после рабочего окна.', 'Снизить WIP, резать параллельные задачи.', '20–30 минут ходьбы 4–5 раз в неделю.', 'Ежедневно: стресс 0–10 и короткая заметка “почему”.'],
    redFlags: ['Выраженная безнадёжность, суицидальные мысли', 'Панические атаки или сильная тревога'],
  },
];

function uniqTags(data: Protocol[]): Tag[] {
  const s = new Set<string>();
  data.forEach(p => p.tags.forEach(t => s.add(t)));
  return Array.from(s).sort((a, b) => a.localeCompare(b, 'ru'));
}

function Chip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        'px-3 py-1.5 rounded-full text-xs border transition ' +
        (active ? 'bg-primary/15 border-primary/40 text-primary' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10')
      }
    >
      {label}
    </button>
  );
}

function ProtocolCard({ p }: { p: Protocol }) {
  return (
    <div className="glass-card rounded-3xl p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="text-xs text-primary font-bold tracking-wider uppercase mb-2">{p.tags.join(' · ')}</div>
        <div className="text-xs text-white/70 border border-white/10 bg-white/5 px-2 py-1 rounded-lg">{p.duration}</div>
      </div>
      <h3 className="text-xl font-bold">{p.title}</h3>
      <p className="mt-3 text-sm text-muted leading-relaxed">{p.why}</p>
      <ol className="mt-5 list-decimal list-inside space-y-2 text-sm text-muted leading-relaxed">
        {p.steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
      {p.redFlags && p.redFlags.length > 0 && (
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="text-xs font-black tracking-wider uppercase text-red-300">Тревожные сигналы</div>
          <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-muted">
            {p.redFlags.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Tools() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const tags = useMemo(() => uniqTags(PROTOCOLS), []);

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROTOCOLS.filter(p => {
      const hay = (p.title + ' ' + p.tags.join(' ') + ' ' + p.steps.join(' ') + ' ' + p.why).toLowerCase();
      const matchesQuery = !q || hay.includes(q);
      const matchesTags = selectedTags.length === 0 || selectedTags.every(t => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [query, selectedTags]);

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 space-y-8">
      <ContentBlock label="Инструменты" title="Поиск по схемам и фильтрам">
        <p className="text-sm text-muted">
          Поиск по схемам и быстрые фильтры. Идея страницы: открыть, выбрать тему и сразу выполнять микро-план на 2-5 минут в течение дня.
        </p>

        <div className="mt-5 flex flex-col md:flex-row gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Например: CVS, кисти, сон"
            className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-primary/60"
          />
          <button
            onClick={() => setQuery('')}
            className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm font-semibold"
          >
            Сброс
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(t => {
            const active = selectedTags.includes(t);
            return (
              <Chip
                key={t}
                label={t}
                active={active}
                onClick={() => setSelectedTags(prev => (active ? prev.filter(x => x !== t) : [...prev, t]))}
              />
            );
          })}
          {selectedTags.length > 0 && (
            <Chip label="Очистить теги" active={false} onClick={() => setSelectedTags([])} />
          )}
        </div>
      </ContentBlock>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map(p => (
          <ProtocolCard key={p.id} p={p} />
        ))}
      </div>

      {data.length === 0 && <div className="text-sm text-muted">Ничего не найдено. Попробуй убрать теги или поиск.</div>}
    </div>
  );
}
