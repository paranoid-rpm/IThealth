import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ContentBlock from '../components/ContentBlock';

type TocItem = {
  id: string;
  label: string;
  hint: string;
};

const TOC: TocItem[] = [
  { id: 'quick', label: '10 минут', hint: 'Минимальная настройка, чтобы стало легче' },
  { id: 'angles', label: 'Углы и паттерны', hint: 'Что обычно даёт боль и как исправить' },
  { id: 'setup', label: 'Сценарии', hint: 'Ноутбук, два монитора, работа стоя' },
  { id: 'microbreaks', label: 'Микропауы', hint: 'Короткие разгрузки в течение дня' },
];

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="glass-card rounded-3xl p-8">
      <div className="text-xs font-black tracking-wider uppercase text-primary">{title}</div>
      <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-muted leading-relaxed">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function RedFlags({ items }: { items: string[] }) {
  return (
    <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
      <div className="text-xs font-black tracking-wider uppercase text-red-300">Когда к врачу</div>
      <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-muted">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
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

function SetupPicker({ onJump }: { onJump: (id: string) => void }) {
  const [picked, setPicked] = useState<string>('');

  const choices = useMemo(() => {
    return [
      { k: 'laptop', label: 'Работаю с ноутбука', go: 'setup' },
      { k: 'two-monitors', label: 'Два монитора', go: 'setup' },
      { k: 'standing', label: 'Стоячая работа', go: 'setup' },
      { k: 'wrists', label: 'Болит кисть/предплечье', go: 'angles' },
      { k: 'neck', label: 'Зажимы в шее/плечах', go: 'angles' },
      { k: 'micro', label: 'Хочу микропауы', go: 'microbreaks' },
    ];
  }, []);

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-8">
      <div className="text-xs font-black tracking-wider uppercase text-primary">Быстрый выбор</div>
      <div className="mt-3 text-lg font-bold">С чего начать настройку?</div>
      <p className="mt-2 text-sm text-muted">Выбери сетап/проблему — прыгнем в нужный блок.</p>

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
        Принцип: цель не “идеальная поза”, а отсутствие экстремальных углов + регулярная смена положения.
      </div>
    </div>
  );
}

export default function Ergonomics() {
  const [active, setActive] = useState<string>('quick');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      for (let i = TOC.length - 1; i >= 0; i--) {
        const el = document.getElementById(TOC[i].id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (y >= top) {
          setActive(TOC[i].id);
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
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
        <div className="text-primary font-bold text-xs tracking-wider uppercase mb-4 border-l-4 border-primary pl-4">Эргономика</div>
        <h1 className="text-4xl md:text-5xl font-black mb-6">Рабочее место, которое не ломает</h1>
        <p className="text-lg md:text-xl text-muted leading-relaxed">
          Цель эргономики — снизить статическую нагрузку, убрать экстремальные углы в суставах и дать телу возможность менять положение.
          Даже небольшие отклонения (экран слишком высоко, плечи приподняты, запястье перегнуто) при 6–10 часах в день превращаются
          в хроническое раздражение тканей.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="space-y-8">
          <SetupPicker onJump={jump} />

          <ContentBlock label="10 минут" title="Быстрая настройка (минимум)">
            <div id="quick" className="scroll-mt-28" />
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                title="Сидение"
                items={[
                  'Стопы полностью на полу/подставке, бёдра параллельно полу.',
                  'Поясница опирается (валик/спинка), без “провала” таза.',
                  'Локти около 90°, плечи опущены.',
                ]}
              />
              <Card
                title="Экран и ввод"
                items={[
                  'Монитор 50–70 см, верхняя кромка на уровне глаз или ниже.',
                  'Клавиатура ближе: предплечья на столе, кисти нейтрально.',
                  'Мышь рядом с корпусом, без вытянутой руки.',
                ]}
              />
            </div>
          </ContentBlock>

          <ContentBlock label="Углы" title="Нормальные диапазоны (и где чаще всего ошибка)">
            <div id="angles" className="scroll-mt-28" />
            <div className="grid md:grid-cols-3 gap-6">
              <Card
                title="Шея"
                items={[
                  'Подбородок не тянется к экрану (нет “черепахи”).',
                  'Экран не выше уровня глаз.',
                  'Лучше чаще менять положение, чем “держать идеал”.',
                ]}
              />
              <Card
                title="Плечи"
                items={[
                  'Плечи не подняты, трапеции не “держат” весь день.',
                  'Локти близко к корпусу, не выносить руки вперёд.',
                  'Опора под предплечья лучше, чем “висеть”.',
                ]}
              />
              <Card
                title="Кисти"
                items={[
                  'Запястья без излома и без постоянного разгибания.',
                  'Нажатия мягкие, без “ударов”.',
                  'Чувствительность мыши выше — хват слабее.',
                ]}
              />
            </div>

            <RedFlags
              items={[
                'Боль отдаёт в руку + онемение/слабость',
                'Боль усиливается ночью или быстро прогрессирует',
                'После травмы симптомы нарастают',
              ]}
            />
          </ContentBlock>

          <ContentBlock label="Сценарии" title="Ноутбук, два монитора, работа стоя">
            <div id="setup" className="scroll-mt-28" />
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                title="Ноутбук"
                items={[
                  'Подставка + внешняя клавиатура/мышь — иначе шея в постоянном сгибании.',
                  'Если нет подставки: подложить книги/коробку, поднять экран хотя бы частично.',
                  'Не работать часами с ноутом “на коленях”.',
                ]}
              />
              <Card
                title="Два монитора"
                items={[
                  'Если один главный — ставь его по центру.',
                  'Второй монитор под небольшим углом, без поворота шеи часами.',
                  'Если работа симметричная — иногда меняй “главный” монитор местами.',
                ]}
              />
              <Card
                title="Работа стоя"
                items={[
                  'Стоять весь день — не цель: чередование сидя/стоя.',
                  'Экран на уровне глаз, локти ~90°, не “висеть” на плечах.',
                  'Усталость ног = коврик/перерывы/ходьба.',
                ]}
              />
              <Card
                title="Устройства ввода (быстрые фиксы)"
                items={[
                  'Клавиатура ближе: не тянуться, держать локти у корпуса.',
                  'Поднять DPI/скорость мыши: меньше усилий, меньше “зажима”.',
                  'Если боль нарастает: временно снизить объём набора и добавить ротацию задач.',
                ]}
              />
            </div>
          </ContentBlock>

          <ContentBlock label="Микропауы" title="Микро‑разгрузки в течение дня">
            <div id="microbreaks" className="scroll-mt-28" />
            <div className="grid md:grid-cols-2 gap-6">
              <Card
                title="Каждый час (2 минуты)"
                items={[
                  'Встать и пройтись 10–20 шагов.',
                  'Плечи вниз, длинный выдох.',
                  'Поменять фокус: посмотреть вдаль 20–30 секунд.',
                ]}
              />
              <Card
                title="Каждые 20–30 минут (15 секунд)"
                items={[
                  'Сменить положение: откинуться/подвинуться/поменять опору.',
                  'Разжать кисти, убрать “хват”.',
                  'Коротко расслабить лицо и челюсть.',
                ]}
              />
            </div>
            <div className="mt-6 text-xs text-muted leading-relaxed">
              Лучше 12 коротких разгрузок, чем одна “зарядка вечером”. Если упражнение вызывает боль — не делай его.
            </div>
          </ContentBlock>

          <div className="max-w-5xl">
            <div className="text-xs text-muted leading-relaxed">Дисклеймер: информация не заменяет консультацию врача. Любые упражнения — без боли.</div>
          </div>
        </div>

        <aside className="hidden lg:block sticky top-24">
          <div className="glass-card rounded-3xl p-6">
            <div className="text-xs font-black tracking-wider uppercase text-white/80">Навигация</div>
            <div className="mt-4 space-y-2">
              {TOC.map(i => (
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
