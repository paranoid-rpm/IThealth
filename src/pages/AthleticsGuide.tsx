import ContentBlock from '../components/ContentBlock';

type Exercise = {
  id: string;
  sport: 'Лёгкая атлетика' | 'Тяжёлая атлетика';
  title: string;
  image: string;
  imageAlt: string;
  goal: string;
  steps: string[];
  mistakes: string[];
};

const EXERCISES: Exercise[] = [
  {
    id: 'sprint-start',
    sport: 'Лёгкая атлетика',
    title: 'Спринт: низкий старт и первые 30 метров',
    image: '/images/athletics/sprint-start.jpg',
    imageAlt: 'Спринтер на старте на беговой дорожке',
    goal: 'Быстро набрать скорость без потери техники и перегруза голени.',
    steps: [
      'Стартовая стойка: вес тела смещён вперёд, таз немного выше плеч.',
      'Первый шаг короткий и мощный, толчок идёт из стопы и ягодиц.',
      'Первые 6–8 шагов корпус сохраняет наклон примерно 35–45°.',
      'Руки работают резко назад-вперёд: локоть примерно под 90°.',
      'К 25–30 метрам постепенно выходим в более вертикальное положение.',
    ],
    mistakes: [
      'Слишком ранний подъём корпуса и потеря ускорения.',
      'Длинный первый шаг с “торможением” на пятке.',
      'Зажатые плечи и “деревянные” руки.',
    ],
  },
  {
    id: 'long-jump',
    sport: 'Лёгкая атлетика',
    title: 'Прыжок в длину: разбег, отталкивание, приземление',
    image: '/images/athletics/long-jump.jpg',
    imageAlt: 'Спортсмен выполняет прыжок в длину в песчаную яму',
    goal: 'Собрать целостную схему движения и снизить риск перегруза колена.',
    steps: [
      'Разбег ритмичный: последние 4 шага быстрее, но без суеты.',
      'Опорная нога ставится под центр тяжести, не “втыкается” далеко вперёд.',
      'Отталкивание короткое и жёсткое: толчок “вверх-вперёд”, не только вверх.',
      'В полёте сохраняем корпус собранным, колени подтягиваем к груди.',
      'Приземление на две ноги, колени мягкие, корпус слегка вперёд.',
    ],
    mistakes: [
      'Сбивка шага на планке из-за нестабильного ритма разбега.',
      'Сильный завал назад при приземлении.',
      '“Провал” колена внутрь в момент отталкивания.',
    ],
  },
  {
    id: 'clean-jerk',
    sport: 'Тяжёлая атлетика',
    title: 'Толчок (clean & jerk): безопасная схема по фазам',
    image: '/images/athletics/clean-jerk.jpg',
    imageAlt: 'Тяжелоатлет поднимает штангу над головой',
    goal: 'Выполнить движение по фазам и не терять контроль поясницы.',
    steps: [
      'Старт: штанга над серединой стопы, спина нейтральна, корпус натянут.',
      'Первая тяга: штанга идёт близко к ногам до уровня колен.',
      'Вторая тяга: мощное разгибание тазобедренных и голеностопа.',
      'Подсед: быстро уходим под штангу и фиксируем на груди (clean).',
      'Выталкивание и фиксация над головой с жёстким корпусом (jerk).',
    ],
    mistakes: [
      'Округление поясницы со старта.',
      'Ранний “рывок руками” вместо работы ног и таза.',
      'Штанга уходит далеко от корпуса в траектории.',
    ],
  },
  {
    id: 'snatch',
    sport: 'Тяжёлая атлетика',
    title: 'Рывок (snatch): поэтапная техника',
    image: '/images/athletics/back-squat.jpg',
    imageAlt: 'Тяжелоатлет выполняет рывок со штангой',
    goal: 'Собрать технику рывка с акцентом на траекторию штанги и фиксацию над головой.',
    steps: [
      'Старт: штанга над серединой стопы, спина нейтральная, плечи чуть впереди грифа.',
      'Первая тяга: сохраняем угол корпуса, штанга идёт близко к голени и бедру.',
      'Подрыв: мощное разгибание ног и таза, локти направляем вверх и в стороны.',
      'Подсед под штангу: быстрое “ныряние” и фиксация в глубоком положении.',
      'Подъём из подседа: удерживаем штангу над центром стопы до полного выпрямления.',
    ],
    mistakes: [
      'Раннее сгибание рук до завершения работы ног и таза.',
      'Штанга уходит дугой далеко от корпуса.',
      'Нестабильная фиксация над головой из-за слабого брейсинга.',
    ],
  },
];

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

function ExerciseCard({ item }: { item: Exercise }) {
  return (
    <article className="glass-card rounded-3xl p-7">
      <div className="text-xs font-black tracking-wider uppercase text-primary">{item.sport}</div>
      <h3 className="mt-2 text-xl font-black">{item.title}</h3>
      <p className="mt-3 text-sm text-muted leading-relaxed">{item.goal}</p>

      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <img src={withBase(item.image)} alt={item.imageAlt} className="w-full h-52 md:h-64 object-cover" loading="lazy" decoding="async" />
      </div>

      <div className="mt-5 grid md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-xs font-black tracking-wider uppercase text-white/80">Схема выполнения</div>
          <ol className="mt-3 list-decimal list-inside space-y-2 text-muted leading-relaxed">
            {item.steps.map(step => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="text-xs font-black tracking-wider uppercase text-red-300">Частые ошибки</div>
          <ul className="mt-3 list-disc list-inside space-y-2 text-muted leading-relaxed">
            {item.mistakes.map(m => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function AthleticsGuide() {
  const light = EXERCISES.filter(e => e.sport === 'Лёгкая атлетика');
  const heavy = EXERCISES.filter(e => e.sport === 'Тяжёлая атлетика');

  return (
    <div className="container mx-auto px-6 py-16 md:py-24 space-y-8">
      <ContentBlock label="Атлетика" title="Мини‑справочник: лёгкая и тяжёлая атлетика">
        <p>
          Это практический раздел с короткими схемами выполнения упражнений. Формат: цель движения, пошаговая техника и частые ошибки.
          Используй как чек‑лист перед тренировкой, а не как замену работе с тренером.
        </p>
      </ContentBlock>

      <ContentBlock label="Лёгкая" title="Лёгкая атлетика: техника и контроль ритма">
        <div className="grid gap-6">
          {light.map(item => (
            <ExerciseCard key={item.id} item={item} />
          ))}
        </div>
      </ContentBlock>

      <ContentBlock label="Тяжёлая" title="Тяжёлая атлетика: фазы движения и безопасность">
        <div className="grid gap-6">
          {heavy.map(item => (
            <ExerciseCard key={item.id} item={item} />
          ))}
        </div>
      </ContentBlock>

      <div className="text-xs text-muted leading-relaxed">
        Дисклеймер: при боли, головокружении, онемении или резком ухудшении самочувствия останови тренировку и обратись к врачу.
      </div>
    </div>
  );
}
