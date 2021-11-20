const $background = document.querySelector('.background');
const $startButton = document.querySelector('.startButton');
const $timer = document.querySelector('.timer');
const $count = document.querySelector('.count');
const $playarea = document.querySelector('.playarea');
const $replay = document.querySelector('.replay');
const $endPopup = document.querySelector('.endPopup');
const $carrot = document.querySelectorAll('.carrot');
const $endMsg = document.querySelector('.endMsg');

let clickable = true;
const windowWidth = $playarea.clientWidth;
const windowHeight = $playarea.clientHeight;
let timer;

$startButton.addEventListener('click', onClick);
function onClick() {
  if (!clickable) {
    return;
  }
  $startButton.innerHTML = `<i class="fas fa-stop"></i>`;
  // Game Start
  // randomly place carrot & bugs

  for (let i = 0; i < $count.innerText; i++) {
    //carrot
    placeCarrot();
    //bug
    placebugs();
    clickable = false;
  }

  // Timer
  let timeLimit = 10;
  timer = setInterval(() => {
    // show End msg
    if (timeLimit === 0) {
      clearInterval(timer);
      showEnd('You Lose');
      const loseAudio = new Audio('./sound/alert.wav');
      loseAudio.loop = false;
      loseAudio.volume = 0.5;
      loseAudio.play();
    }
    $timer.innerHTML = `0:${timeLimit}`;
    timeLimit--;
  }, 1000);
}
// replay
$replay.addEventListener('click', () => {
  $endPopup.style.visibility = 'hidden';
  $startButton.innerHTML = `<i class="fas fa-play"></i>`;
  location.reload();
});

function showEnd(msg) {
  $endPopup.style.visibility = 'visible';
  $endMsg.innerHTML = msg;
}
function getRandomPosition(min, max) {
  return Math.floor(Math.random() * (max - min));
}
function placeCarrot() {
  const carrot = document.createElement('div');
  carrot.setAttribute('class', 'carrot');
  const carrotimg = document.createElement('img');
  carrotimg.setAttribute('class', 'carrotimg');
  carrotimg.src = '/img/carrot.png';
  carrot.append(carrotimg);
  $playarea.append(carrot);
  const carrotRandomX = getRandomPosition(0, windowWidth);
  const carrotRandomY = getRandomPosition(windowHeight / 3, windowHeight);

  carrot.style.left = carrotRandomX + 'px';
  carrot.style.bottom = carrotRandomY + 'px';
  carrot.style.display = 'inline';
  carrot.addEventListener('click', () => {
    const carrotAudio = new Audio('./sound/carrot_pull.mp3');
    carrotAudio.loop = false;
    carrotAudio.volume = 0.5;
    carrotAudio.play();
    let carrotcount = $count.innerHTML;
    carrot.style.display = 'none';
    carrotcount--;
    $count.innerHTML = carrotcount;
    if (carrotcount === 0) {
      clearInterval(timer);
      showEnd('You Win!!');
      const winAudio = new Audio('./sound/game_win.mp3');
      winAudio.loop = false;
      winAudio.volume = 0.5;
      winAudio.play();
    }
  });
}
function placebugs() {
  const bug = document.createElement('div');
  bug.setAttribute('class', 'bug');
  const bugimg = document.createElement('img');
  bugimg.setAttribute('class', 'bugimg');
  bugimg.src = '/img/bug.png';
  bug.append(bugimg);
  $playarea.append(bug);
  const bugRandomX = getRandomPosition(0, windowWidth);
  const bugRandomY = getRandomPosition(windowHeight / 3, windowHeight);

  bug.style.left = bugRandomX + 'px';
  bug.style.bottom = bugRandomY + 'px';
  bug.style.display = 'inline';

  bug.addEventListener('click', () => {
    const bugAudio = new Audio('./sound/bug_pull.mp3');
    bugAudio.loop = false;
    bugAudio.volume = 0.5;
    bugAudio.play();
    clearInterval(timer);
    showEnd('You Lose');
  });
}
