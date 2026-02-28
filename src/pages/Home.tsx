import { motion } from 'framer-motion';
import { Activity, Brain, Monitor, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
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
          className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed"
        >
          Строго научный подход к снижению рисков CVS, RSI, дорсопатии и профессионального выгорания. 
          Основано на стандартах ВОЗ, ANSI/HFES и ГОСТ Р 50948-2001.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/protocols" className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-br from-primary to-accent text-white font-bold text-sm shadow-[0_0_30px_rgba(167,139,250,0.3)] hover:shadow-[0_0_40px_rgba(167,139,250,0.5)] transition-all hover:-translate-y-1">
            Открыть протоколы <ArrowRight size={16} />
          </Link>
          <Link to="/research" className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-all">
            Научная база
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">90%</div>
            <div className="text-sm text-muted font-medium">Страдают CVS</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">75%</div>
            <div className="text-sm text-muted font-medium">Симптомы RSI</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">68%</div>
            <div className="text-sm text-muted font-medium">Дорсопатия</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-mono font-black gradient-text mb-2">45%</div>
            <div className="text-sm text-muted font-medium">Клиническое выгорание</div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Направления профилактики</h2>
          <p className="text-muted max-w-2xl mx-auto">Клинические рекомендации для разработчиков, адаптированные для самостоятельного применения на рабочем месте.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-2xl">
            <Monitor className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Зрение (CVS)</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">Протоколы фильтрации синего света (450-470 нм), правило 20-20-20, эргономика дисплея и профилактика сухости роговицы.</p>
            <div className="p-4 bg-black/40 rounded-lg border-l-2 border-primary">
              <span className="block text-xs font-bold text-primary mb-1">ФАКТ</span>
              <span className="text-xs text-muted">Частота моргания за кодом падает с 17 до 4 раз в минуту (Sheppard, 2018).</span>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <Activity className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Опорно-двигательный аппарат</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">Профилактика туннельного синдрома (RSI) и шейного остеохондроза. Стандарты посадки ANSI/HFES 100-2007.</p>
            <div className="p-4 bg-black/40 rounded-lg border-l-2 border-primary">
              <span className="block text-xs font-bold text-primary mb-1">ROI</span>
              <span className="text-xs text-muted">Грамотная эргономика снижает риск МСД на 59% (OSHA).</span>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <Brain className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-xl font-bold mb-3">Нейрофизиология</h3>
            <p className="text-muted text-sm leading-relaxed mb-6">Управление кортизолом, декомпрессия после дедлайнов, циркадные ритмы и защита от выгорания (ICD-11 QD85).</p>
            <div className="p-4 bg-black/40 rounded-lg border-l-2 border-primary">
              <span className="block text-xs font-bold text-primary mb-1">МАСШТАБ</span>
              <span className="text-xs text-muted">57% разработчиков испытывают симптомы выгорания (StackOverflow).</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}