let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function updateDisplay(time) {
  const milliseconds = parseInt((time % 1000) / 10);
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);

  display.textContent = 
    `${String(minutes).padStart(2, '0')}:` +
    `${String(seconds).padStart(2, '0')}:` +
    `${String(milliseconds).padStart(2, '0')}`;
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(() => {
      updatedTime = new Date().getTime();
      difference = updatedTime - startTime;
      updateDisplay(difference);
    }, 10);
  }
}

function pauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  isRunning = false;
  difference = 0;
  lapCount = 0;
  laps.innerHTML = '';
}

function lapStopwatch() {
  if (isRunning) {
    lapCount++;
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCount} - ${display.textContent}`;
    laps.appendChild(li);
  }
}
