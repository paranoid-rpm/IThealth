import { motion } from 'framer-motion';
import { Activity, Brain, Monitor, ArrowRight, BookOpen, ClipboardCheck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlowCanvas from '../components/GlowCanvas';

export default function Home() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <GlowCanvas className="absolute inset-0 w-full h-full -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Evidence-Based Occupational Health
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 max-w-4xl"
        >
          Медицинские протоколы для <span className="gradient-text">IT-специалистов</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-muted max-w-3xl mb-10 leading-relaxed"
        >
          Системный подход к снижению рисков CVS, RSI, дорсопатии и выгорания. Чек-листы, протоколы и инструменты мониторинга
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
            Открыть протоколы <ArrowRight size={16} />
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

      {/* Stats Section */}
      <section className="py-12 border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">90%</div>
            <div className="text-sm text-muted font-medium">Симптомы CVS</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">75%</div>
            <div className="text-sm text-muted font-medium">Симптомы RSI</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">68%</div>
            <div className="text-sm text-muted font-medium">Шея/спина</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">45%</div>
            <div className="text-sm text-muted font-medium">Выгорание</div>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="py-10">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
          <Link to="/protocols" className="glass-card p-7 rounded-2xl block">
            <BookOpen className="w-9 h-9 text-primary mb-4" />
            <div className="text-lg font-bold">Протоколы</div>
            <div className="text-sm text-muted mt-1">Структура “механизм → симптомы → действия → red flags”.</div>
          </Link>
          <Link to="/ergonomics" className="glass-card p-7 rounded-2xl block">
            <Shield className="w-9 h-9 text-primary mb-4" />
            <div className="text-lg font-bold">Эргономика</div>
            <div className="text-sm text-muted mt-1">Настройка рабочего места и посадки, чтобы не болело.</div>
          </Link>
          <Link to="/tools" className="glass-card p-7 rounded-2xl block">
            <ClipboardCheck className="w-9 h-9 text-primary mb-4" />
            <div className="text-lg font-bold">Инструменты</div>
            <div className="text-sm text-muted mt-1">Поиск по протоколам и быстрые чек-листы.</div>
          </Link>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Направления профилактики</h2>
          <p className="text-muted max-w-2xl mx-auto">Клинические рекомендации для разработчиков, адаптированные для применения на рабочем месте.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-2xl">
            <Monitor className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Зрение (CVS)</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">Правило 20-20-20, контроль бликов, оптимизация расстояния и кегля, восстановление моргания.</p>
            <div className="p-4 bg-black/40 rounded-lg border-l-2 border-primary">
              <span className="block text-xs font-bold text-primary mb-1">Практика</span>
              <span className="text-xs text-muted">Начинай с освещения и пауз: это даёт максимум эффекта.</span>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <Activity className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">RSI и перегрузка кистей</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">Нейтральные запястья, короткие частые разгрузки, ротация задач, настройка устройств ввода.</p>
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
              <span className="text-xs text-muted">Если хуже 6+ недель — это уже не “само пройдёт”.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
