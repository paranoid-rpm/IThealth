import ContentBlock from '../components/ContentBlock';

type Source = {
  id: string;
  topic: 'CVS' | 'RSI' | 'Ergonomics' | 'Burnout';
  type: 'Guideline' | 'Systematic review' | 'Review' | 'Standard';
  title: string;
  year?: string;
  note: string;
  url: string;
};

const SOURCES: Source[] = [
  {
    id: 'aoa-cvs',
    topic: 'CVS',
    type: 'Guideline',
    title: 'Computer vision syndrome (patient guidance / clinician-facing materials)',
    note: 'Базовые рекомендации по зрительной нагрузке, перерывам и настройке рабочего места.',
    url: 'https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/computer-vision-syndrome',
  },
  {
    id: 'who-burnout',
    topic: 'Burnout',
    type: 'Standard',
    title: 'ICD-11: Burn-out (QD85) description',
    note: 'Нормальная “дефиниция”, чтобы не путать выгорание с депрессией.',
    url: 'https://icd.who.int/browse/2024-01/mms/en#129180281',
  },
  {
    id: 'oshanergo',
    topic: 'Ergonomics',
    type: 'Guideline',
    title: 'OSHA: Computer Workstations eTool',
    note: 'Практическая эргономика (монитор, стул, клавиатура/мышь), понятные схемы и чек-листы.',
    url: 'https://www.osha.gov/etools/computer-workstations',
  },
];

function Badge({ children }: { children: string }) {
  return <span className="inline-flex px-2.5 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-white/80">{children}</span>;
}

export default function Research() {
  return (
    <div className="container mx-auto px-6 py-16 md:py-24 space-y-8">
      <ContentBlock label="Исследования" title="Как читать доказательную базу">
        <p>
          Для практики в профилактике лучше всего подходят клинические гайды и систематические обзоры: они агрегируют много данных и обычно
          аккуратнее говорят о том, “что работает”. Отдельные исследования могут противоречить друг другу из-за дизайна и контекста.
        </p>
      </ContentBlock>

      <ContentBlock label="Библиография" title="Источники и гайды">
        <p className="text-sm text-muted">
          Тут будет “скелет” доказательной базы проекта: коротко, по делу, с понятным применением. Ссылки открываются в новой вкладке.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {SOURCES.map(s => (
            <div key={s.id} className="glass-card rounded-3xl p-7">
              <div className="flex flex-wrap gap-2">
                <Badge>{s.topic}</Badge>
                <Badge>{s.type}</Badge>
                {s.year && <Badge>{s.year}</Badge>}
              </div>
              <div className="mt-3 text-lg font-bold">{s.title}</div>
              <div className="mt-3 text-sm text-muted leading-relaxed">{s.note}</div>
              <a
                className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
                href={s.url}
                target="_blank"
                rel="noreferrer"
              >
                Открыть источник
              </a>
            </div>
          ))}
        </div>
      </ContentBlock>

      <ContentBlock label="CVS" title="Компьютерный зрительный синдром">
        <p>
          Механизмы: снижение частоты моргания, рост испарения слёзной плёнки, нагрузка на аккомодацию.
          Интервенции: оптимизация освещения, правило 20-20-20, регулярные перерывы, корректная дистанция до экрана.
        </p>
      </ContentBlock>

      <ContentBlock label="RSI" title="Повторяющиеся нагрузки (туннельный синдром и тендиниты)">
        <p>
          Механизмы: микротравматизация сухожилий и фасций при монотонных движениях.
          Интервенции: уменьшение непрерывного времени набора, микропауы, нейтральное положение кисти, подбор устройств ввода.
        </p>
      </ContentBlock>

      <ContentBlock label="Burnout" title="Профессиональное выгорание">
        <p>
          Важно отличать выгорание как рабочий феномен от депрессии и тревожных расстройств.
          Самопомощь — это гигиена сна, разграничение работы и отдыха, контроль нагрузки и поддержка.
          При стойких симптомах нужна консультация специалиста.
        </p>
      </ContentBlock>
    </div>
  );
}
