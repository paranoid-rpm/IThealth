/* ========== EYE TIMER (20-20-20 RULE) ========== */

let eyeTimerInterval = null;
let eyeSecondsLeft = 20 * 60; // 20 minutes
const WORK_TIME = 20 * 60;
const BREAK_TIME = 20;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  const display = document.getElementById('eyeTimer');
  if (display) display.textContent = formatTime(eyeSecondsLeft);
}

function startEyeTimer() {
  if (eyeTimerInterval) return; // already running
  eyeTimerInterval = setInterval(() => {
    eyeSecondsLeft--;
    updateDisplay();
    if (eyeSecondsLeft <= 0) {
      clearInterval(eyeTimerInterval);
      eyeTimerInterval = null;
      eyeSecondsLeft = BREAK_TIME;
      updateDisplay();
      alert('🛑 Время для отдыха глаз!\n\nСмотрите на объект вдали (6 метров) в течение 20 секунд.\nПоморгайте 10–15 раз.');
      // After break, reset to work time
      setTimeout(() => {
        eyeSecondsLeft = WORK_TIME;
        updateDisplay();
      }, BREAK_TIME * 1000);
    }
  }, 1000);
}

function resetEyeTimer() {
  if (eyeTimerInterval) {
    clearInterval(eyeTimerInterval);
    eyeTimerInterval = null;
  }
  eyeSecondsLeft = WORK_TIME;
  updateDisplay();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('eyeStart');
  const resetBtn = document.getElementById('eyeReset');
  if (startBtn) startBtn.addEventListener('click', startEyeTimer);
  if (resetBtn) resetBtn.addEventListener('click', resetEyeTimer);
  updateDisplay();
});
