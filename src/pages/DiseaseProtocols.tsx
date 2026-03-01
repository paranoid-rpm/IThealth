import { motion } from 'framer-motion';
import ContentBlock from '../components/ContentBlock';

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

export default function DiseaseProtocols() {
  return (
    <div className="container mx-auto px-6 py-16 md:py-24 space-y-8">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
        <div className="text-primary font-bold text-xs tracking-wider uppercase mb-4 border-l-4 border-primary pl-4">Медицинский справочник</div>
        <h1 className="text-4xl md:text-5xl font-black mb-6">Клинические протоколы профилактики</h1>
        <p className="text-lg md:text-xl text-muted leading-relaxed">
          Здесь собраны практические протоколы для IT-специалистов: зрение (CVS), повторяющиеся нагрузки (RSI), шея/спина и профилактика
          выгорания. Стиль подачи — “что делать завтра утром”, но с нормальной медицинской логикой: механизм → симптомы → интервенции →
          критерии эскалации.
        </p>
      </motion.div>

      <ContentBlock label="CVS" title="Computer Vision Syndrome: полный протокол">
        <p>
          CVS — не “миф про мониторы”, а комплекс симптомов: астенопия, сухость, жжение, размытость, головные боли, замедление фокуса.
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
              У большинства людей улучшение начинается не от “магии фильтра синего”, а от комбинации: правильная дистанция,
              снижение бликов, регулярные паузы и восстановление моргания. Очки/капли — опционально и лучше после проверки у офтальмолога.
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
        <p>
          RSI — это не одна болезнь, а спектр перегрузочных состояний: тендиниты, эпикондилиты, компрессия нервов (карпальный туннель).
          Важный момент: в IT боль часто “плавает” — сегодня кисть, завтра локоть, потом плечо — это типично для перегрузки цепи.
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
        <p>
          В сидячей работе ключевая проблема — длительная статическая нагрузка. Даже “идеальная” поза, удерживаемая часами,
          становится плохой. Поэтому в протоколе главный драйвер — не только настройка стула, а регулярная смена положения.
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
            'Ночная боль, лихорадка, необъяснимая потеря веса (редко, но важно)',
            'Травма, после которой симптомы быстро прогрессируют',
          ]}
        />
      </ContentBlock>

      <ContentBlock label="BURNOUT" title="Профессиональное выгорание: протокол стабилизации">
        <p>
          Выгорание — феномен, связанный с хроническим стрессом на работе. В быту оно часто маскируется под “лень” или “я перегорел”.
          На практике оно проявляется как: падение энергии, цинизм/отстранённость, снижение эффективности.
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
  );
}
