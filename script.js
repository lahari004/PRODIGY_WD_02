let startTime;
let interval;
let isRunning = false;
let lapStartTime;
let laps = [];

const display = document.querySelector('.display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const resetLapsButton = document.getElementById('resetLaps');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
    const date = new Date(ms);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = Math.floor(date.getMilliseconds() / 10); // Get hundredths of a second
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    const currentTime = isRunning ? Date.now() - startTime : 0;
    display.textContent = formatTime(currentTime);
}

function start() {
    if (!isRunning) {
        startTime = Date.now() - (isRunning ? (Date.now() - startTime) : 0);
        interval = setInterval(updateDisplay, 10); // Update every 10 milliseconds for hundredths of a second
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    }
}

function reset() {
    pause();
    startTime = 0;
    updateDisplay();
    laps = [];
    lapsList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now() - startTime;
        const lapTime = currentTime - lapStartTime || currentTime;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(lapTime)}`;
        lapsList.appendChild(lapItem);
        lapStartTime = currentTime;
    }
}

function resetLaps() {
    laps = [];
    lapsList.innerHTML = '';
}

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
resetLapsButton.addEventListener('click', resetLaps);

reset();
