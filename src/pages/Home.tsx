import { motion } from 'framer-motion';
import { Activity, Brain, Monitor, ArrowRight, BookOpen, ClipboardCheck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">{value}</div>
      <div className="text-sm text-muted font-medium">{label}</div>
    </div>
  );
}

function StepCard({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="glass-card p-7 rounded-2xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
        <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 text-primary flex items-center justify-center font-black">
          {n}
        </span>
        Быстрый старт
      </div>
      <div className="mt-4 text-lg font-bold">{title}</div>
      <div className="mt-2 text-sm text-muted leading-relaxed">{text}</div>
    </div>
  );
}

function UpdateItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
      <div className="text-sm font-bold">{title}</div>
      <div className="mt-2 text-sm text-muted leading-relaxed">{text}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="pb-24">
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-10 right-[-200px] w-[700px] h-[700px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Доказательный подход к здоровью в IT
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl"
        >
          Медицинские схемы для <span className="gradient-text whitespace-nowrap inline-block">IT-специалистов</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-3xl mb-10 leading-relaxed"
        >
          Системный подход к снижению рисков CVS, RSI, дорсопатии и выгорания. Чек-листы, схемы и инструменты мониторинга
          для разработчиков и всех, кто работает за экраном.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            to="/protocols"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-sm shadow-[0_0_30px_rgba(167,139,250,0.3)] hover:shadow-[0_0_40px_rgba(167,139,250,0.5)] transition-all hover:-translate-y-1"
          >
            Открыть схемы <ArrowRight size={16} />
          </Link>
          <Link
            to="/tools"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all"
          >
            Инструменты
          </Link>
        </motion.div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs text-muted">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Без эмодзи</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Много текста и чек-листов</span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Плавные анимации</span>
        </div>
      </section>

      <section className="py-12 border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <MiniStat value="90%" label="Симптомы CVS" />
          <MiniStat value="75%" label="Симптомы RSI" />
          <MiniStat value="68%" label="Шея/спина" />
          <MiniStat value="45%" label="Выгорание" />
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black">Как пользоваться проектом</h2>
            <p className="text-muted max-w-2xl mx-auto mt-3">Три шага, чтобы не утонуть в тексте и получить результат за неделю.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <StepCard n="1" title="Начни со схемы" text="Открой раздел “Клинические схемы” и выбери то, что ближе к твоим симптомам." />
            <StepCard n="2" title="Включи микро‑паузы" text="Добавь 2–5 минутные разгрузки каждый час: они дают максимальный эффект на дистанции." />
            <StepCard n="3" title="Отслеживай динамику" text="В “Инструментах” быстро находи чек-листы и закрепляй привычки без перегруза." />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/protocols"
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm font-semibold"
            >
              Перейти к схемам
            </Link>
            <Link
              to="/research"
              className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm font-semibold"
            >
              Источники и гайды
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
          <Link to="/protocols" className="glass-card p-7 rounded-2xl block">
            <BookOpen className="w-9 h-9 text-primary mb-4" />
            <div className="text-lg font-bold">Клинические схемы</div>
            <div className="text-sm text-muted mt-1">Структура “механизм → симптомы → действия → тревожные сигналы”.</div>
          </Link>
          <Link to="/ergonomics" className="glass-card p-7 rounded-2xl block">
            <Shield className="w-9 h-9 text-primary mb-4" />
            <div className="text-lg font-bold">Эргономика</div>
            <div className="text-sm text-muted mt-1">Настройка рабочего места и посадки, чтобы не болело.</div>
          </Link>
          <Link to="/tools" className="glass-card p-7 rounded-2xl block">
            <ClipboardCheck className="w-9 h-9 text-primary mb-4" />
            <div className="text-lg font-bold">Инструменты</div>
            <div className="text-sm text-muted mt-1">Поиск по схемам, фильтры и быстрые чек-листы.</div>
          </Link>
        </div>
      </section>

      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Направления профилактики</h2>
          <p className="text-muted max-w-2xl mx-auto">Клинические рекомендации, адаптированные под реальную работу за экраном.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-2xl">
            <Monitor className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Зрение (CVS)</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">Перерывы, контроль бликов, дистанция до экрана, восстановление моргания.</p>
            <div className="p-4 bg-black/40 rounded-lg border-l-2 border-primary">
              <span className="block text-xs font-bold text-primary mb-1">Практика</span>
              <span className="text-xs text-muted">Начинай с освещения и пауз: это даёт максимум эффекта.</span>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <Activity className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">RSI и перегрузка кистей</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">Нейтральные запястья, частые разгрузки, ротация задач, настройка устройств ввода.</p>
            <div className="p-4 bg-black/40 rounded-lg border-l-2 border-primary">
              <span className="block text-xs font-bold text-primary mb-1">Идея</span>
              <span className="text-xs text-muted">Не лечим боль “героизмом”: уменьшаем дозу нагрузки.</span>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <Brain className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Сон, стресс, выгорание</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">Стабилизация режима, границы коммуникаций, снижение WIP, базовая аэробная активность.</p>
            <div className="p-4 bg-black/40 rounded-lg border-l-2 border-primary">
              <span className="block text-xs font-bold text-primary mb-1">Порог</span>
              <span className="text-xs text-muted">Если хуже 6+ недель — пора подключать специалиста.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-6">
        <div className="container mx-auto px-6">
          <div className="glass-card rounded-3xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="text-xs font-black tracking-wider uppercase text-primary">Что нового</div>
                <div className="mt-2 text-2xl font-black">Обновления проекта</div>
                <div className="mt-2 text-sm text-muted">Короткий список, чтобы понимать, куда смотреть в первую очередь.</div>
              </div>
              <Link
                to="/protocols"
                className="px-6 py-3 rounded-xl bg-gradient-to-br from-primary to-accent text-white text-sm font-bold"
              >
                Открыть схемы
              </Link>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <UpdateItem title="Инструменты: фильтры и тревожные сигналы" text="Схемы стало искать легче: теги, длительность, “почему” и красные флаги." />
              <UpdateItem title="Схемы: быстрый выбор симптома" text="Выбираешь симптом и сразу переходишь в нужный раздел, плюс есть оглавление с подсветкой." />
              <UpdateItem title="Исследования: библиография" text="Добавлены карточки источников и внешние рекомендации для доказательной опоры." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
