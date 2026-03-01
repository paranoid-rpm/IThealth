import { useMemo, useState } from 'react';
import ContentBlock from '../components/ContentBlock';

type Protocol = {
  id: string;
  title: string;
  tags: string[];
  steps: string[];
};

const PROTOCOLS: Protocol[] = [
  {
    id: 'cvs-basic',
    title: 'CVS: базовый протокол на 7 дней',
    tags: ['CVS', 'Зрение', 'Перерывы'],
    steps: [
      'День 1: настройте монитор (высота/дистанция), уберите блики.',
      'День 2: внедрите правило 20-20-20 в рабочий день.',
      'День 3: добавьте тёплые компрессы для век (если есть сухость) по рекомендации врача.',
      'День 4: осознанное моргание: 10 быстрых морганий каждые 30 минут.',
      'День 5: проверьте коррекцию зрения (если есть подозрение на миопию/астигматизм).',
      'День 6: оптимизируйте шрифты/контраст, увеличьте кегль.',
      'День 7: оцените симптомы и закрепите привычки.',
    ],
  },
  {
    id: 'rsi-basic',
    title: 'RSI: профилактика боли в кистях/предплечьях',
    tags: ['RSI', 'Кисти', 'Эргономика'],
    steps: [
      'Нейтральные запястья, опора под предплечья, локти около 90°.',
      'Каждые 45–60 минут — 2 минуты разгрузки (встать/походить).',
      'Растяжка сгибателей и разгибателей предплечья по 15 секунд × 3.',
      'Снизьте усилие нажатия клавиш и хват мыши.',
      'Ротация задач: чередуйте код/созвоны/планирование.',
    ],
  },
  {
    id: 'back-basic',
    title: 'Спина/шея: минимальная программа разгрузки',
    tags: ['Спина', 'Шея', 'Перерывы'],
    steps: [
      'Проверьте высоту экрана: не поднимайте подбородок.',
      'Раз в 60 минут — 1–2 минуты ходьбы.',
      'Мягкая мобилизация шеи: наклоны/повороты без боли.',
      'Укрепление: 2–3 раза в неделю базовые упражнения (по состоянию).',
    ],
  },
];

export default function Tools() {
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PROTOCOLS;
    return PROTOCOLS.filter(p => {
      const hay = (p.title + ' ' + p.tags.join(' ') + ' ' + p.steps.join(' ')).toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 space-y-8">
      <ContentBlock label="Инструменты" title="Поиск по протоколам">
        <p>Найди протокол по теме: CVS, RSI, шея, спина, сон, перерывы.</p>
        <div className="mt-5 flex gap-3">
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
      </ContentBlock>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map(p => (
          <div key={p.id} className="glass-card rounded-3xl p-8">
            <div className="text-xs text-primary font-bold tracking-wider uppercase mb-2">{p.tags.join(' · ')}</div>
            <h3 className="text-xl font-bold mb-4">{p.title}</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted leading-relaxed">
              {p.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
