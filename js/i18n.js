/* ========== INTERNATIONALIZATION ========== */
const translations = {
  ru: {
    // Nav
    'nav.home': 'Главная',
    'nav.diseases': 'Заболевания',
    'nav.risks': 'Факторы риска',
    'nav.prevention': 'Профилактика',
    'nav.ergonomics': 'Эргономика',
    'nav.eyes': 'Зрение',
    'nav.mental': 'Ментальное здоровье',
    'nav.exercises': 'Упражнения',
    'nav.quiz': 'Тест',
    'nav.resources': 'Ресурсы',

    // Hero
    'hero.badge': 'Здоровье IT-специалистов',
    'hero.title': 'Профилактика профессиональных заболеваний',
    'hero.sub': 'Всё о сохранении здоровья специалистов по компьютерным системам: от эргономики рабочего места до упражнений для глаз и борьбы со стрессом.',
    'hero.cta1': 'Начать изучение',
    'hero.cta2': 'Пройти тест',

    // Stats
    'stat.diseases': 'Заболеваний',
    'stat.factors': 'Факторов риска',
    'stat.tips': 'Советов',
    'stat.exercises': 'Упражнений',

    // Sections
    'main.why.tag': 'Почему это важно',
    'main.why.title': 'Скрытые угрозы «офисных» профессий',
    'main.why.text': 'Несмотря на кажущуюся безопасность, работа за компьютером сопряжена с комплексом скрытых угроз для здоровья. Вредные факторы действуют незаметно, но неотвратимо — хронические заболевания проявляются, когда переходят в серьёзную стадию.',
    'main.why.item1.title': 'Синдром запястного канала',
    'main.why.item1.text': 'Тоннельный синдром развивается при однотипных движениях кисти. Может привести к хронической боли и потере трудоспособности.',
    'main.why.item2.title': 'Компьютерный зрительный синдром',
    'main.why.item2.text': 'До 90% пользователей ПК испытывают проблемы со зрением: сухость глаз, головные боли, размытость изображения.',
    'main.why.item3.title': 'Заболевания позвоночника',
    'main.why.item3.text': 'Остеохондроз шейного и грудного отделов — следствие многочасового сидения в неправильной позе.',
    'main.why.item4.title': 'Эмоциональное выгорание',
    'main.why.item4.text': 'Хронический стресс, дедлайны и монотония приводят к неврозам, психосоматическим расстройствам и снижению продуктивности.',

    // Topics
    'main.topics.tag': 'Разделы сайта',
    'main.topics.title': 'Изучайте, тестируйте, внедряйте',

    // Cards
    'card.diseases.title': 'Профессиональные заболевания',
    'card.diseases.text': 'Подробный обзор заболеваний IT-специалистов: от туннельного синдрома до варикоза.',
    'card.risks.title': 'Факторы риска',
    'card.risks.text': 'Физические, химические, биологические и психологические факторы профессионального вреда.',
    'card.prevention.title': 'Методы профилактики',
    'card.prevention.text': 'Научно обоснованные способы предотвращения заболеваний на рабочем месте.',
    'card.ergonomics.title': 'Эргономика',
    'card.ergonomics.text': 'Организация рабочего места: стол, стул, монитор, клавиатура, освещение.',
    'card.eyes.title': 'Здоровье глаз',
    'card.eyes.text': 'Правило 20-20-20, гимнастика для глаз, настройки монитора и защита зрения.',
    'card.mental.title': 'Ментальное здоровье',
    'card.mental.text': 'Борьба со стрессом, профилактика выгорания, баланс работы и отдыха.',
    'card.exercises.title': 'Упражнения и перерывы',
    'card.exercises.text': 'Комплексы разминок, таймер перерывов и производственная гимнастика.',
    'card.quiz.title': 'Тест самооценки',
    'card.quiz.text': 'Проверьте свои привычки и узнайте уровень риска профессиональных заболеваний.',

    // Footer
    'footer.copy': '© 2026 IT Health. Индивидуальный проект.',
    'footer.disclaimer': 'Информация на сайте не является медицинской консультацией.',
  },

  en: {
    'nav.home': 'Home',
    'nav.diseases': 'Diseases',
    'nav.risks': 'Risk Factors',
    'nav.prevention': 'Prevention',
    'nav.ergonomics': 'Ergonomics',
    'nav.eyes': 'Eye Health',
    'nav.mental': 'Mental Health',
    'nav.exercises': 'Exercises',
    'nav.quiz': 'Quiz',
    'nav.resources': 'Resources',

    'hero.badge': 'IT Professionals\' Health',
    'hero.title': 'Prevention of Occupational Diseases',
    'hero.sub': 'Everything about keeping computer system specialists healthy: from workplace ergonomics to eye exercises and stress management.',
    'hero.cta1': 'Start Learning',
    'hero.cta2': 'Take the Quiz',

    'stat.diseases': 'Diseases',
    'stat.factors': 'Risk Factors',
    'stat.tips': 'Tips',
    'stat.exercises': 'Exercises',

    'main.why.tag': 'Why it matters',
    'main.why.title': 'Hidden Threats of "Office" Jobs',
    'main.why.text': 'Despite seeming safe, working at a computer carries a range of hidden health threats. Harmful factors act invisibly but inevitably — chronic diseases become apparent only when they reach a serious stage.',
    'main.why.item1.title': 'Carpal Tunnel Syndrome',
    'main.why.item1.text': 'Tunnel syndrome develops from repetitive hand movements. Can lead to chronic pain and disability.',
    'main.why.item2.title': 'Computer Vision Syndrome',
    'main.why.item2.text': 'Up to 90% of PC users experience vision problems: dry eyes, headaches, blurred vision.',
    'main.why.item3.title': 'Spinal Disorders',
    'main.why.item3.text': 'Cervical and thoracic osteochondrosis results from sitting for hours in an incorrect posture.',
    'main.why.item4.title': 'Burnout Syndrome',
    'main.why.item4.text': 'Chronic stress, deadlines, and monotony lead to neurosis, psychosomatic disorders, and decreased productivity.',

    'main.topics.tag': 'Site Sections',
    'main.topics.title': 'Learn, Test, Implement',

    'card.diseases.title': 'Occupational Diseases',
    'card.diseases.text': 'Detailed overview of IT specialist diseases: from carpal tunnel to varicose veins.',
    'card.risks.title': 'Risk Factors',
    'card.risks.text': 'Physical, chemical, biological and psychological factors of occupational harm.',
    'card.prevention.title': 'Prevention Methods',
    'card.prevention.text': 'Evidence-based methods for preventing workplace diseases.',
    'card.ergonomics.title': 'Ergonomics',
    'card.ergonomics.text': 'Workspace setup: desk, chair, monitor, keyboard, lighting.',
    'card.eyes.title': 'Eye Health',
    'card.eyes.text': 'The 20-20-20 rule, eye exercises, monitor settings, and vision protection.',
    'card.mental.title': 'Mental Health',
    'card.mental.text': 'Stress management, burnout prevention, work-life balance.',
    'card.exercises.title': 'Exercises & Breaks',
    'card.exercises.text': 'Workout routines, break timer, and workplace gymnastics.',
    'card.quiz.title': 'Self-Assessment Quiz',
    'card.quiz.text': 'Check your habits and find out your occupational disease risk level.',

    'footer.copy': '© 2026 IT Health. Individual Project.',
    'footer.disclaimer': 'Information on this site is not medical advice.',
  }
};

function getLang() {
  return localStorage.getItem('ith-lang') || 'ru';
}

function setLang(lang) {
  localStorage.setItem('ith-lang', lang);
  document.documentElement.lang = lang;
  applyTranslations(lang);
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || key;
}

function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = translations[lang]?.[key];
    if (val) el.textContent = val;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const val = translations[lang]?.[key];
    if (val) el.placeholder = val;
  });
}

function initI18n() {
  const lang = getLang();
  document.documentElement.lang = lang;
  applyTranslations(lang);

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

export { initI18n, setLang, getLang, t, translations };
