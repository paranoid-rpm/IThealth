import { motion } from 'framer-motion';
import ContentBlock from '../components/ContentBlock';

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

export default function Ergonomics() {
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

      <ContentBlock label="10 минут" title="Быстрая настройка (минимум)">
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

      <ContentBlock label="Углы" title="Нормальные диапазоны (чтобы не болело)">
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Шея" items={['Подбородок не тянется к экрану.', 'Экран не выше уровня глаз.', 'Чаще менять положение, чем “держать идеал”.']} />
          <Card title="Плечи" items={['Плечи не подняты.', 'Локти близко к корпусу.', 'Опора под предплечья лучше, чем “висеть”.']} />
          <Card title="Кисти" items={['Запястья без излома.', 'Нажатия мягкие, без “ударов”.', 'Чувствительность мыши выше — хват слабее.']} />
        </div>
      </ContentBlock>

      <ContentBlock label="Сетапы" title="Ноутбук, два монитора, стоячая работа">
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
              'Второй монитор под небольшим углом, без поворота шеи на 30–40° постоянно.',
              'Чаще меняй: какой монитор главный (если работа симметричная).',
            ]}
          />
          <Card
            title="Standing"
            items={[
              'Стоять весь день — не цель: чередование сидя/стоя.',
              'Экран на уровне глаз, локти ~90°, не “висеть” на плечах.',
              'Усталость ног = коврик/перерывы/ходьба.',
            ]}
          />
          <Card
            title="Микропауы"
            items={[
              'Раз в 60 минут: 1–2 минуты ходьбы.',
              'Раз в 20–30 минут: сменить фокус, плечи вниз, дыхание.',
              'Лучше 12 коротких разгрузок, чем одна “зарядка вечером”.',
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

      <div className="max-w-5xl">
        <div className="text-xs text-muted leading-relaxed">
          Дисклеймер: информация не заменяет консультацию врача. Любые упражнения — без боли.
        </div>
      </div>
    </div>
  );
}
