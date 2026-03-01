import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ContentBlock from '../components/ContentBlock';

type TocItem = {
  id: string;
  label: string;
  hint: string;
};

function RedFlags({ items }: { items: string[] }) {
  return (
    <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
      <div className="text-xs font-black tracking-wider uppercase text-red-300">Когда нужно к врачу</div>
      <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-muted">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function Checklist({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="text-xs font-black tracking-wider uppercase text-primary">{title}</div>
      <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-muted">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function Timeline({ steps }: { steps: Array<{ t: string; d: string }> }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
      <div className="text-xs font-black tracking-wider uppercase text-accent">План внедрения</div>
      <div className="mt-4 space-y-3">
        {steps.map((s) => (
          <div key={s.t} className="flex gap-4">
            <div className="w-16 shrink-0 text-xs font-black text-white/80">{s.t}</div>
            <div className="text-sm text-muted leading-relaxed">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pill({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
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

function SymptomPicker({ onJump }: { onJump: (id: string) => void }) {
  const [picked, setPicked] = useState<string>('');

  const choices = useMemo(() => {
    return [
      { k: 'eyes-dry', label: 'Сухость/жжение глаз', go: 'cvs' },
      { k: 'eyes-blur', label: 'Размытость/головная боль от экрана', go: 'cvs' },
      { k: 'hands-tingle', label: 'Онемение/покалывание в пальцах', go: 'rsi' },
      { k: 'hands-pain', label: 'Боль в кисти/предплечье', go: 'rsi' },
      { k: 'neck', label: 'Шея/плечи “горят”', go: 'neck-back' },
      { k: 'back', label: 'Спина “деревянная” после сидения', go: 'neck-back' },
      { k: 'sleep', label: 'Нет сил, сон сломан', go: 'burnout' },
      { k: 'anxiety', label: 'Тревога/выгорание', go: 'burnout' },
    ];
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-8">
      <div className="text-xs font-black tracking-wider uppercase text-primary">Быстрый выбор</div>
      <div className="mt-3 text-lg font-bold">Что беспокоит прямо сейчас?</div>
      <p className="mt-2 text-sm text-muted">Выбери симптом — я перекину тебя в нужный протокол.</p>

      <div className="mt-5 flex flex-col md:flex-row gap-3">
        <select
          value={picked}
          onChange={(e) => setPicked(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-primary/60"
        >
          <option value="">Выбрать…</option>
          {choices.map(c => (
            <option key={c.k} value={c.go}>{c.label}</option>
          ))}
        </select>
        <button
          disabled={!picked}
          onClick={() => onJump(picked)}
          className="px-5 py-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Перейти
        </button>
      </div>

      <div className="mt-6 text-xs text-muted leading-relaxed">
        Это справочник. Если есть “красные флаги” (резкая слабость, выраженное онемение, падение зрения и т.п.) — смотри блоки “к врачу”.
      </div>
    </div>
  );
}

export default function DiseaseProtocols() {
  const toc: TocItem[] = [
    { id: 'cvs', label: 'CVS (зрение)', hint: 'Сухость, жжение, головные боли от экрана' },
    { id: 'rsi', label: 'RSI (кисти)', hint: 'Туннельный синдром, тендиниты, перегруз' },
    { id: 'neck-back', label: 'Шея/спина', hint: 'Статическая нагрузка и “зажимы”' },
    { id: 'burnout', label: 'Burnout', hint: 'Сон, стресс, истощение' },
  ];

  const [active, setActive] = useState<string>('cvs');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      for (let i = toc.length - 1; i >= 0; i--) {
        const el = document.getElementById(toc[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (y >= top) {
          setActive(toc[i].id);
          return;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
        <div className="text-primary font-bold text-xs tracking-wider uppercase mb-4 border-l-4 border-primary pl-4">Медицинский справочник</div>
        <h1 className="text-4xl md:text-5xl font-black mb-6">Клинические протоколы профилактики</h1>
        <p className="text-lg md:text-xl text-muted leading-relaxed">
          Здесь собраны практические протоколы для IT-специалистов: зрение (CVS), повторяющиеся нагрузки (RSI), шея/спина и профилактика
          выгорания. Стиль подачи — “что делать завтра утром”, но с медицинской логикой: механизм → симптомы → интервенции → критерии эскалации.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="space-y-8">
          <SymptomPicker onJump={jump} />

          <ContentBlock label="CVS" title="Computer Vision Syndrome: полный протокол">
            <div id="cvs" className="scroll-mt-28" />
            <p>
              CVS — комплекс симптомов: астенопия, сухость, жжение, размытость, головные боли, замедление фокуса.
              В IT он почти всегда состоит из трёх факторов: непрерывная аккомодационная нагрузка, падение частоты моргания и плохая световая среда.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Checklist
                title="Диагностические маркеры (самопроверка)"
                items={[
                  'Сухость/жжение усиливаются к вечеру',
                  'Размытость после 2–3 часов экрана',
                  'Сложно быстро “перефокусироваться” вдаль',
                  'Головные боли в лобной области',
                  'Невольно щуритесь/наклоняетесь ближе к экрану',
                ]}
              />
              <Checklist
                title="Базовые интервенции"
                items={[
                  'Правило 20-20-20 (каждые 20 мин — 20 секунд вдаль)',
                  'Монитор 50–70 см, верхняя кромка на уровне глаз/ниже',
                  'Убрать блики: источник света сбоку, не за спиной',
                  'Осознанное моргание: 10 “двойных” морганий каждые 30 мин',
                  'Увлажнение: 40–60% влажности (если есть сухость)',
                ]}
              />
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Timeline
                steps={[
                  { t: 'День 1', d: 'Переставить монитор/свет, убрать блики, увеличить кегль шрифта.' },
                  { t: 'День 2', d: 'Внедрить 20-20-20 + таймер/помидоро.' },
                  { t: 'День 3', d: 'Добавить осознанное моргание и микропауы.' },
                  { t: 'День 4', d: 'Проверить зрение, если щуритесь или тянетесь к экрану.' },
                  { t: 'День 5', d: 'Оптимизировать контраст/яркость: без “фонаря” и без “подвала”.' },
                  { t: 'Неделя', d: 'Оценить динамику: сухость, боль, головные боли, размытость.' },
                ]}
              />
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <div className="text-xs font-black tracking-wider uppercase text-white/80">Пояснение (медлогика)</div>
                <p className="mt-4 text-sm text-muted leading-relaxed">
                  Улучшение обычно начинается не от “магии фильтра синего”, а от комбинации: дистанция, блики, регулярные паузы и моргание.
                  Очки/капли — опционально и лучше после проверки у офтальмолога.
                </p>
                <RedFlags
                  items={[
                    'Острая боль, резкое падение зрения, “пелена”',
                    'Сильная светобоязнь или односторонние симптомы',
                    'Постоянная боль в глазах, которая не проходит после отдыха',
                  ]}
                />
              </div>
            </div>
          </ContentBlock>

          <ContentBlock label="RSI" title="Repetitive Strain Injury: кисти, предплечья, локоть">
            <div id="rsi" className="scroll-mt-28" />
            <p>
              RSI — спектр перегрузочных состояний: тендиниты, эпикондилиты, компрессия нервов (карпальный туннель).
              В IT боль часто “плавает” — сегодня кисть, завтра локоть, потом плечо — это типично для перегрузки цепи.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Checklist
                title="Что чаще всего вызывает RSI"
                items={[
                  'Запястье в разгибании или “изломе” при печати',
                  'Мышь далеко от корпуса, рука вытянута',
                  'Сильный хват мыши и “ударный” набор',
                  'Нулевая ротация задач (4–6 часов подряд только код)',
                ]}
              />
              <Checklist
                title="Протокол профилактики"
                items={[
                  'Нейтральные запястья + опора под предплечья, локти около 90°',
                  'Каждые 45–60 минут: 2–3 минуты разгрузки (встать/походить)',
                  'Растяжка сгибателей/разгибателей предплечья: 15 сек × 3',
                  'Снизить усилие нажатия клавиш и чувствительность мыши',
                  'Ротация: код → ревью → созвон → планирование',
                ]}
              />
            </div>

            <RedFlags
              items={[
                'Онемение/покалывание в 1–3 пальцах, ночные симптомы (подозрение на карпальный туннель)',
                'Слабость хвата, выпадение предметов',
                'Боль, которая нарастает даже при снижении нагрузки',
              ]}
            />
          </ContentBlock>

          <ContentBlock label="ШЕЯ/СПИНА" title="Дорсопатия и головные боли напряжения">
            <div id="neck-back" className="scroll-mt-28" />
            <p>
              В сидячей работе ключевая проблема — длительная статическая нагрузка. Даже “идеальная” поза, удерживаемая часами,
              становится плохой. Поэтому в протоколе главный драйвер — регулярная смена положения.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Checklist
                title="Минимум на каждый день"
                items={[
                  'Раз в 60 минут: 1–2 минуты ходьбы',
                  'Экран не выше уровня глаз, подбородок не “вверх”',
                  'Лопатки “вниз и назад” на выдохе, без фанатизма',
                  '2–3 раза в неделю: базовое укрепление (по состоянию)',
                ]}
              />
              <Checklist
                title="Плохие паттерны"
                items={[
                  'Ноутбук без подставки: постоянный сгиб шеи',
                  'Один монитор сбоку: ротация шеи часами',
                  'Стол высоко: плечи подняты, трапеция “горит”',
                  'Сутулость + выдвинутая голова (forward head posture)',
                ]}
              />
            </div>

            <RedFlags
              items={[
                'Боль с иррадиацией в руку, слабость, стойкое онемение',
                'Ночная боль, лихорадка, необъяснимая потеря веса',
                'Травма, после которой симптомы быстро прогрессируют',
              ]}
            />
          </ContentBlock>

          <ContentBlock label="BURNOUT" title="Профессиональное выгорание: протокол стабилизации">
            <div id="burnout" className="scroll-mt-28" />
            <p>
              Выгорание — феномен, связанный с хроническим стрессом на работе. В быту оно маскируется под “лень” или “я перегорел”.
              На практике проявляется как: падение энергии, цинизм/отстранённость, снижение эффективности.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Checklist
                title="Базовый протокол (2 недели)"
                items={[
                  'Сон: фиксированное время подъёма, 7–9 часов, минимум экранов за час до сна',
                  'Границы: выключать мессенджеры после рабочего окна',
                  'Нагрузка: убрать “вечные” таски, резать WIP, делать более короткие спринты',
                  'Физнагрузка: 20–30 минут ходьбы 4–5 раз в неделю',
                ]}
              />
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                <div className="text-xs font-black tracking-wider uppercase text-white/80">Тесты (самомониторинг)</div>
                <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-muted">
                  <li>PSQI (качество сна)</li>
                  <li>MBI (выгорание)</li>
                  <li>Субъективная шкала стресса 0–10 (каждый день)</li>
                </ul>
                <RedFlags
                  items={[
                    'Суицидальные мысли или выраженная безнадёжность',
                    'Панические атаки, неконтролируемая тревога',
                    'Симптомы держатся 6+ недель и прогрессируют',
                  ]}
                />
              </div>
            </div>
          </ContentBlock>

          <div className="max-w-5xl">
            <div className="text-xs text-muted leading-relaxed">
              Дисклеймер: материалы носят информационный характер и не заменяют консультацию врача.
              Любые упражнения выполняйте без боли; при сомнениях — медицинская консультация.
            </div>
          </div>
        </div>

        <aside className="hidden lg:block sticky top-24">
          <div className="glass-card rounded-3xl p-6">
            <div className="text-xs font-black tracking-wider uppercase text-white/80">Навигация</div>
            <div className="mt-4 space-y-2">
              {toc.map(i => (
                <div key={i.id} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-bold">{i.label}</div>
                    <Pill active={active === i.id} label={active === i.id ? 'Сейчас' : 'Открыть'} onClick={() => jump(i.id)} />
                  </div>
                  <div className="mt-1 text-xs text-muted">{i.hint}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
