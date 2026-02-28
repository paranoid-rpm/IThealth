import { motion } from 'framer-motion';

export default function DiseaseProtocols() {
  return (
    <div className="container mx-auto px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <div className="text-primary font-bold text-sm tracking-wider uppercase mb-4 border-l-4 border-primary pl-4">Медицинский справочник</div>
        <h1 className="text-4xl md:text-5xl font-black mb-8">Клинические протоколы профилактики</h1>
        <p className="text-xl text-muted leading-relaxed mb-12">
          Подробное описание профессиональных патологий IT-специалистов, их патогенез и доказательные методы превенции.
        </p>

        <div className="space-y-12">
          {/* CVS Section */}
          <div className="glass-card p-8 md:p-10 rounded-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl">1</div>
              <h2 className="text-2xl md:text-3xl font-bold">CVS (Computer Vision Syndrome)</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-3">Патогенез</h4>
                <p className="text-sm text-muted leading-relaxed mb-4">Специфическая зрительная нагрузка вызывает спазм аккомодации. Снижение частоты моргания приводит к нарушению липидного слоя слёзной плёнки и кератоконъюнктивиту.</p>
                <h4 className="font-bold text-white mb-3 mt-6">Симптоматика</h4>
                <ul className="list-disc list-inside text-sm text-muted space-y-2">
                  <li>Астенопия (зрительное утомление)</li>
                  <li>Чувство "песка" в глазах</li>
                  <li>Размытость зрения к вечеру</li>
                  <li>Фокусная задержка при переводе взгляда</li>
                </ul>
              </div>
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <h4 className="font-bold text-primary mb-4">Протокол лечения (AOA Guidelines)</h4>
                <ul className="space-y-4">
                  <li className="text-sm">
                    <strong className="text-white block mb-1">Оптика:</strong> 
                    <span className="text-muted">Очки с антибликовым покрытием и блокировкой синего спектра (450нм).</span>
                  </li>
                  <li className="text-sm">
                    <strong className="text-white block mb-1">Среда:</strong> 
                    <span className="text-muted">Освещённость 300-500 лк. Увлажнитель воздуха (влажность 40-60%).</span>
                  </li>
                  <li className="text-sm">
                    <strong className="text-white block mb-1">Поведение:</strong> 
                    <span className="text-muted">Протокол 20-20-20. Сознательное форсированное моргание.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RSI Section */}
          <div className="glass-card p-8 md:p-10 rounded-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-black text-xl">2</div>
              <h2 className="text-2xl md:text-3xl font-bold">RSI (Repetitive Strain Injury)</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white mb-3">Патогенез</h4>
                <p className="text-sm text-muted leading-relaxed mb-4">Микротравматизация сухожилий предплечья из-за постоянных монотонных движений (тайпинг, мышь). Приводит к воспалению (тендинит) и компрессии срединного нерва (карпальный туннельный синдром).</p>
              </div>
              <div className="bg-black/30 p-6 rounded-2xl border border-white/5">
                <h4 className="font-bold text-accent mb-4">Превентивные меры</h4>
                <ul className="space-y-4">
                  <li className="text-sm">
                    <strong className="text-white block mb-1">Аппаратура:</strong> 
                    <span className="text-muted">Сплит-клавиатуры, вертикальные мыши (угол пронации 50-90°).</span>
                  </li>
                  <li className="text-sm">
                    <strong className="text-white block mb-1">Кинезиология:</strong> 
                    <span className="text-muted">Растяжка сгибателей предплечья каждые 2 часа.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}