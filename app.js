const startBtn = document.querySelector('#start'),
      screens = document.querySelectorAll('.screen'),
      timeList = document.querySelector('#time-list'),
      timeEl = document.querySelector('#time'),
      board = document.querySelector('#board'),
      colors = ['#39ff14', '#fe59c2', '#fe019a', '#04d9ff', '#5555ff', '#ff073a', '#f80000', '#ccff00', ' #7df9ff'];

let time = 0,
    score = 0;

startBtn.addEventListener('click', e => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', e => {
    if (e.target.classList.contains('time-btn')) {
        time = +e.target.getAttribute('data-time');
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <spam class='primary'>${score}</spam></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div'),
          size = getRandomNumber(10, 60),
          {width, height} = board.getBoundingClientRect(),
          x = getRandomNumber(0, (width - size)),
          y = getRandomNumber(0, (height - size)),
          color = colors[getRandomNumber(0, 8)];

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `${color}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}