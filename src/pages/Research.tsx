import ContentBlock from '../components/ContentBlock';

type Topic = 'CVS' | 'RSI' | 'Ergonomics' | 'Burnout' | 'General';

type Evidence = 'Guideline' | 'Systematic review' | 'Review' | 'Standard' | 'PDF/Handout';

type Source = {
  id: string;
  topic: Topic;
  evidence: Evidence;
  title: string;
  year?: string;
  note: string;
  url: string;
};

const SOURCES: Source[] = [
  {
    id: 'who-burnout-faq',
    topic: 'Burnout',
    evidence: 'Standard',
    title: 'WHO: Burn-out an occupational phenomenon (FAQ)',
    year: '2019',
    note: 'Коротко и официально: выгорание как феномен в рабочем контексте, три компонента (истощение, цинизм/дистанция, снижение эффективности).',
    url: 'https://www.who.int/standards/classifications/frequently-asked-questions/burn-out-an-occupational-phenomenon',
  },
  {
    id: 'who-icd11-burnout',
    topic: 'Burnout',
    evidence: 'Standard',
    title: 'WHO ICD-11 MMS: Burn-out (QD85)',
    year: '2024',
    note: 'Страница в ICD-11: определение, ограничения и “не применять” вне работы.',
    url: 'https://icd.who.int/browse/2024-01/mms/en#129180281',
  },
  {
    id: 'osha-workstations',
    topic: 'Ergonomics',
    evidence: 'Guideline',
    title: 'OSHA: Computer Workstations eTool',
    note: 'Практическая эргономика (монитор, стул, клавиатура/мышь), схемы и чек-листы.',
    url: 'https://www.osha.gov/etools/computer-workstations',
  },
  {
    id: 'cal-osha-easy-ergo',
    topic: 'Ergonomics',
    evidence: 'PDF/Handout',
    title: 'Cal/OSHA: Easy Ergonomics (Computer workstation)',
    note: 'Короткая памятка по настройке рабочего места: высота монитора, клавиатура/мышь, поддержка ног и спины.',
    url: 'https://www.dir.ca.gov/dosh/dosh_publications/computerergo.pdf',
  },
  {
    id: 'cvs-sr-ophthalmology-2022',
    topic: 'CVS',
    evidence: 'Systematic review',
    title: 'Interventions for the Management of Computer Vision Syndrome: systematic review & meta-analysis (abstract)',
    year: '2022',
    note: 'Оценка интервенций при “eye strain” от компьютера; часто подчёркивают низкую определённость доказательств для многих “популярных” решений.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35597519/',
  },
  {
    id: 'cvs-review-2025-pmc',
    topic: 'CVS',
    evidence: 'Review',
    title: 'Computer vision syndrome: a comprehensive literature review (PMC)',
    year: '2025',
    note: 'Большой обзор: механизмы, факторы риска, профилактика и реальность доказательной базы (много выводов “доказательства ограничены”).',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11901492/',
  },
  {
    id: 'aoa-cvs',
    topic: 'CVS',
    evidence: 'Guideline',
    title: 'American Optometric Association: Computer vision syndrome',
    note: 'Практические рекомендации по зрительной нагрузке, перерывам и настройке рабочего места.',
    url: 'https://www.aoa.org/healthy-eyes/eye-and-vision-conditions/computer-vision-syndrome',
  },
];

function Badge({ children }: { children: string }) {
  return <span className="inline-flex px-2.5 py-1 rounded-full text-xs border border-white/10 bg-white/5 text-white/80">{children}</span>;
}

function SourceCard({ s }: { s: Source }) {
  return (
    <div className="glass-card rounded-3xl p-7">
      <div className="flex flex-wrap gap-2">
        <Badge>{s.topic}</Badge>
        <Badge>{s.evidence}</Badge>
        {s.year && <Badge>{s.year}</Badge>}
      </div>
      <div className="mt-3 text-lg font-bold">{s.title}</div>
      <div className="mt-3 text-sm text-muted leading-relaxed">{s.note}</div>
      <a className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline" href={s.url} target="_blank" rel="noreferrer">
        Открыть источник
      </a>
    </div>
  );
}

function TopicGroup({ topic, subtitle }: { topic: Topic; subtitle: string }) {
  const data = SOURCES.filter(s => s.topic === topic);
  if (data.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-baseline justify-between flex-wrap gap-3">
        <div>
          <div className="text-xl font-black">{topic}</div>
          <div className="text-sm text-muted mt-1">{subtitle}</div>
        </div>
        <div className="text-xs text-white/60">{data.length} источника</div>
      </div>

      <div className="mt-5 grid md:grid-cols-2 gap-6">
        {data.map(s => (
          <SourceCard key={s.id} s={s} />
        ))}
      </div>
    </div>
  );
}

export default function Research() {
  const counts = {
    total: SOURCES.length,
    cvs: SOURCES.filter(s => s.topic === 'CVS').length,
    rsi: SOURCES.filter(s => s.topic === 'RSI').length,
    ergo: SOURCES.filter(s => s.topic === 'Ergonomics').length,
    burnout: SOURCES.filter(s => s.topic === 'Burnout').length,
  };

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 space-y-8">
      <ContentBlock label="Исследования" title="Доказательная база (без снобизма)">
        <p>
          Для практики в профилактике чаще всего полезны клинические гайды и систематические обзоры: они агрегируют данные и честнее описывают
          границы уверенности. Отдельные исследования могут противоречить друг другу из‑за дизайна, выборок и метрик.
        </p>
        <div className="mt-4 grid md:grid-cols-5 gap-3 text-center text-xs">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="font-black text-white">{counts.total}</div>
            <div className="text-white/60 mt-1">Всего</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="font-black text-white">{counts.cvs}</div>
            <div className="text-white/60 mt-1">CVS</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="font-black text-white">{counts.rsi}</div>
            <div className="text-white/60 mt-1">RSI</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="font-black text-white">{counts.ergo}</div>
            <div className="text-white/60 mt-1">Эргономика</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="font-black text-white">{counts.burnout}</div>
            <div className="text-white/60 mt-1">Burnout</div>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock label="Уровни" title="Какие источники считать “сильнее”">
        <p className="text-sm text-muted">
          Упрощённая шкала: guideline/standard → systematic review → review → отдельные исследования/мнения.
          Мы используем это как навигацию по надёжности, а не как “истину в последней инстанции”.
        </p>
        <div className="mt-5 grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-7">
            <div className="text-xs font-black tracking-wider uppercase text-primary">Guideline / Standard</div>
            <div className="mt-2 text-sm text-muted leading-relaxed">
              Хорошо для практических рекомендаций и терминов. Обычно аккуратно формулируют ограничения.
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/20 p-7">
            <div className="text-xs font-black tracking-wider uppercase text-primary">Systematic review / Meta-analysis</div>
            <div className="mt-2 text-sm text-muted leading-relaxed">
              Сводят несколько работ; полезны, чтобы понять, где эффект устойчивый, а где “маркетинг”.
            </div>
          </div>
        </div>
      </ContentBlock>

      <ContentBlock label="Библиография" title="Источники и гайды">
        <p className="text-sm text-muted">Карточки ниже сгруппированы по темам. Ссылки открываются в новой вкладке.</p>

        <TopicGroup topic="CVS" subtitle="Экранная нагрузка, сухость, астенопия, перерывы и доказательная база" />
        <TopicGroup topic="Ergonomics" subtitle="Workstation, поза, ввод, микропауы и практические чек-листы" />
        <TopicGroup topic="Burnout" subtitle="Определение (ICD-11), границы термина и чем он не является" />
      </ContentBlock>

      <ContentBlock label="Дальше" title="Что добавим следующим">
        <ul className="list-disc list-inside space-y-2 text-sm text-muted leading-relaxed">
          <li>RSI: систематические обзоры по эргономике ввода и микропаузам.</li>
          <li>Burnout: обзоры по интервенциям на уровне организации (нагрузка, WIP, рабочие границы).</li>
          <li>“Резюме по каждому источнику”: что утверждает, и где границы уверенности.</li>
        </ul>
      </ContentBlock>
    </div>
  );
}
