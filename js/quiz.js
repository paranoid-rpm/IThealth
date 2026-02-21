/* ========== QUIZ: SELF-ASSESSMENT ========== */

const QUESTIONS = [
  {
    q: 'Сколько часов в день вы проводите за компьютером?',
    options: [
      { text: 'Менее 3 часов', score: 0 },
      { text: '3–5 часов', score: 1 },
      { text: '6–8 часов', score: 2 },
      { text: 'Более 8 часов', score: 3 }
    ]
  },
  {
    q: 'Как часто вы делаете перерывы каждые 45–60 минут?',
    options: [
      { text: 'Всегда', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Редко', score: 2 },
      { text: 'Почти никогда', score: 3 }
    ]
  },
  {
    q: 'Есть ли у вас боль/скованность в шее или спине после работы?',
    options: [
      { text: 'Нет', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти каждый день', score: 3 }
    ]
  },
  {
    q: 'Бывают ли симптомы сухости/жжения в глазах?',
    options: [
      { text: 'Нет', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти постоянно', score: 3 }
    ]
  },
  {
    q: 'Используете ли вы правило 20-20-20?',
    options: [
      { text: 'Да, регулярно', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Слышал(а), но не делаю', score: 2 },
      { text: 'Нет', score: 3 }
    ]
  },
  {
    q: 'Есть ли онемение/покалывание в кистях или пальцах?',
    options: [
      { text: 'Нет', score: 0 },
      { text: 'Иногда', score: 2 },
      { text: 'Часто', score: 3 },
      { text: 'Почти постоянно', score: 4 }
    ]
  },
  {
    q: 'Как организовано ваше рабочее место?',
    options: [
      { text: 'Кресло/монитор/высота стола настроены', score: 0 },
      { text: 'Частично удобно', score: 1 },
      { text: 'Неудобно, но терпимо', score: 2 },
      { text: 'Очень неудобно', score: 3 }
    ]
  },
  {
    q: 'Сколько дней в неделю вы двигаетесь (спорт/ходьба 30 минут+)?',
    options: [
      { text: '5–7 дней', score: 0 },
      { text: '3–4 дня', score: 1 },
      { text: '1–2 дня', score: 2 },
      { text: 'Почти никогда', score: 3 }
    ]
  },
  {
    q: 'Как вы спите в среднем?',
    options: [
      { text: '7–9 часов, стабильно', score: 0 },
      { text: '6–7 часов', score: 1 },
      { text: 'Менее 6 часов', score: 2 },
      { text: 'Сильные проблемы со сном', score: 3 }
    ]
  },
  {
    q: 'Есть ли у вас признаки выгорания (апатия, раздражительность, усталость)?',
    options: [
      { text: 'Нет', score: 0 },
      { text: 'Иногда', score: 1 },
      { text: 'Часто', score: 2 },
      { text: 'Почти постоянно', score: 3 }
    ]
  }
];

const STORAGE_KEY = 'ith-quiz-result-v1';

let idx = 0;
let answers = new Array(QUESTIONS.length).fill(null);

function $(id) { return document.getElementById(id); }

function renderProgress() {
  const p = ((idx) / QUESTIONS.length) * 100;
  $('quizProgress').style.width = `${p}%`;
}

function renderQuestion() {
  const q = QUESTIONS[idx];
  $('quizQuestion').textContent = `${idx + 1}/${QUESTIONS.length}: ${q.q}`;

  const opts = $('quizOptions');
  opts.innerHTML = '';

  q.options.forEach((o, oi) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = o.text;

    if (answers[idx] === oi) btn.classList.add('selected');

    btn.addEventListener('click', () => {
      answers[idx] = oi;
      renderQuestion();
    });

    opts.appendChild(btn);
  });

  $('quizBack').disabled = idx === 0;
  $('quizNext').textContent = idx === QUESTIONS.length - 1 ? 'Результат' : 'Дальше →';

  renderProgress();
}

function computeScore() {
  let score = 0;
  answers.forEach((a, i) => {
    if (a === null) return;
    score += QUESTIONS[i].options[a].score;
  });
  return score;
}

function resultText(score) {
  if (score <= 6) {
    return {
      level: 'Низкий риск',
      emoji: '✅',
      text: 'У вас хорошие привычки. Поддерживайте эргономику, перерывы и физическую активность.'
    };
  }
  if (score <= 14) {
    return {
      level: 'Средний риск',
      emoji: '⚠️',
      text: 'Есть факторы риска. Усильте перерывы, настройте рабочее место, добавьте упражнения для спины/кистей и правило 20-20-20.'
    };
  }
  return {
    level: 'Высокий риск',
    emoji: '🆘',
    text: 'Рекомендуется срочно пересмотреть режим работы и рабочее место. При симптомах (боль, онемение, ухудшение зрения, бессонница) обратитесь к врачу.'
  };
}

function showResult() {
  const score = computeScore();
  const r = resultText(score);

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ score, r, date: new Date().toISOString() }));

  const box = document.querySelector('.quiz-container');
  box.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-score">${r.emoji} ${score}</div>
      <h2 style="margin-bottom:12px;">${r.level}</h2>
      <p style="color:var(--clr-text-muted);max-width:560px;margin:0 auto;">${r.text}</p>

      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:24px;">
        <a class="btn btn-primary" href="prevention.html">Перейти к профилактике</a>
        <a class="btn btn-outline" href="ergonomics.html">Проверить эргономику</a>
        <button class="btn btn-outline" id="quizRestart">Пройти заново</button>
      </div>

      <p style="margin-top:18px;color:var(--clr-text-muted);font-size:var(--fs-sm);">Результат не является медицинским диагнозом.</p>
    </div>
  `;

  document.getElementById('quizRestart')?.addEventListener('click', () => {
    idx = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    window.location.reload();
  });
}

function canProceed() {
  return answers[idx] !== null;
}

document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  // Не автопоказываем сохранённый результат, чтобы пользователь мог пройти заново.

  $('quizBack').addEventListener('click', () => {
    idx = Math.max(0, idx - 1);
    renderQuestion();
  });

  $('quizNext').addEventListener('click', () => {
    if (!canProceed()) {
      alert('Выберите вариант ответа.');
      return;
    }
    if (idx === QUESTIONS.length - 1) {
      showResult();
      return;
    }
    idx++;
    renderQuestion();
  });

  renderQuestion();
});
