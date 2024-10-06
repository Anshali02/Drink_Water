const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const restartButton = document.getElementById('restart');

// Timer Elements
const timerDisplay = document.getElementById('timer');
const startTimerButton = document.getElementById('start-timer');
const stopTimerButton = document.getElementById('stop-timer');
const resetTimerButton = document.getElementById('reset-timer');

let timerInterval;
let timerSeconds = 0;

// Initialize Big Cup
updateBigCup();

// Event Listeners for Small Cups
smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

// Event Listener for Restart Button
restartButton.addEventListener('click', () => {
  // Reset all small cups
  smallCups.forEach(cup => cup.classList.remove('full'));
  updateBigCup();

  // Reset Timer
  resetTimer();
});

// Timer Functions
function startTimer() {
  if (timerInterval) return; // Prevent multiple intervals

  timerInterval = setInterval(() => {
    timerSeconds++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  stopTimer();
  timerSeconds = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const hours = String(Math.floor(timerSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timerSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(timerSeconds % 60).padStart(2, '0');
  timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
}

// Event Listeners for Timer Buttons
startTimerButton.addEventListener('click', startTimer);
stopTimerButton.addEventListener('click', stopTimer);
resetTimerButton.addEventListener('click', resetTimer);

// Highlight Cups Function
function highlightCups(idx) {
  if (idx === smallCups.length - 1 && smallCups[idx].classList.contains("full")) {
    idx--;
  } else if (
    smallCups[idx].classList.contains('full') &&
    !smallCups[idx].nextElementSibling.classList.contains('full')
  ) {
    idx--;
  }

  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  updateBigCup();
}

// Update Big Cup Function
function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${(2 - (250 * fullCups) / 1000).toFixed(2)}L`;
  }
}
