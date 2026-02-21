/* ========== BREAK TIMER (45/5) ========== */

let interval = null;
let phase = 'work';
let secondsLeft = 45 * 60;

const WORK = 45 * 60;
const BREAK = 5 * 60;

function format(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2,'0')}`;
}

function render() {
  const el = document.getElementById('breakTimer');
  if (el) el.textContent = format(secondsLeft);
}

function tick() {
  secondsLeft--;
  render();
  if (secondsLeft <= 0) {
    clearInterval(interval);
    interval = null;

    if (phase === 'work') {
      phase = 'break';
      secondsLeft = BREAK;
      render();
      alert('⏸️ Перерыв 5 минут!\n\nВстаньте, пройдитесь, сделайте 2–3 упражнения.');
    } else {
      phase = 'work';
      secondsLeft = WORK;
      render();
      alert('▶ Время работать 45 минут.\n\nСядьте удобно, проверьте осанку и положение кистей.');
    }
  }
}

function start() {
  if (interval) return;
  interval = setInterval(tick, 1000);
}

function reset() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  phase = 'work';
  secondsLeft = WORK;
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('breakStart')?.addEventListener('click', start);
  document.getElementById('breakReset')?.addEventListener('click', reset);
  render();
});
