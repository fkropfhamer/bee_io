import bee01 from '../images/bee01.png'; // 934 x 632
import bee02 from '../images/bee02.png';
import bee03 from '../images/bee03.png';
import background from '../images/waben001.png'; // 8016 x 5881
import sting from '../images/sting001.png';
import '../css/index.css';
import music from '../sound/Six_Umbrellas_-_07_-_Asset_House.mp3';
import View from './view';

let socket;

let count = 0;
const globalImages = [];
let view;
let backgroundMusic;
const gameState = {
  connected: false,
  started: false,
  imagesLoaded: false,
  audioLoaded: false,
  x: 1000,
  y: 1000,
  frame: 0,
  angle: -1,
  speed: 5,
  bullets: [],
  enemys: [],
};

function loadImages(images, callback) {
  // console.log(images);
  let loadedImagesCount = 0;
  images.forEach((img) => {
    img.img.onload = () => {
      loadedImagesCount += 1;
      if (loadedImagesCount === images.length) {
        callback();
      }
    };
  });
}

function setupImages(callback) {
  const beeImg01 = new Image();
  const beeImg02 = new Image();
  const beeImg03 = new Image();
  const stingImg = new Image();
  const backgroundImg = new Image();

  beeImg01.src = bee01;
  beeImg02.src = bee02;
  beeImg03.src = bee03;
  stingImg.src = sting;
  backgroundImg.src = background;

  globalImages.push({ img: beeImg01, name: 'bee01' });
  globalImages.push({ img: beeImg02, name: 'bee02' });
  globalImages.push({ img: beeImg03, name: 'bee03' });
  globalImages.push({ img: stingImg, name: 'sting' });
  globalImages.push({ img: backgroundImg, name: 'background' });

  loadImages(globalImages, callback);
}

// TODO: add music!!!

function setupAudio(callback) {
  backgroundMusic = new Audio();
  backgroundMusic.src = music;
  backgroundMusic.loop = true;
  backgroundMusic.onloadeddata = callback;
}

function setupEventlisteners() {
  window.addEventListener('mousemove', (e) => {
    const dir = Math.atan2(
      e.clientY - view.canvas.offsetTop - view.height / 2,
      e.clientX - view.canvas.offsetLeft - view.width / 2
    );
    // gameState.angle = dir;
    // console.log(dir);
    socket.emit('update direction', dir);
  });
  // TODO: fires when start button clicked!
  window.addEventListener('click', () => {
    gameState.bullets.push({
      x: gameState.x,
      y: gameState.y,
      angle: (gameState.angle - Math.PI) % (2 * Math.PI),
      speed: 5,
    });
  });
}

const draw = () => {
  view.reset();
  // console.log(gameState.x, gameState.y);
  view.drawBackground(gameState.x, gameState.y);
  gameState.enemys.forEach((enemy) => {
    view.drawEnemy(enemy.x, enemy.y, enemy.angle, enemy.frame, gameState.x, gameState.y);
  });
  gameState.bullets.forEach((bullet) => {
    view.drawBullet(bullet.x, bullet.y, bullet.angle, gameState.x, gameState.y);
  });
  view.drawPlayer(gameState.angle, gameState.frame);
};

function updateX(x, speed, angle) {
  return x + speed * Math.cos(angle);
}

function updateY(y, speed, angle) {
  return y + speed * Math.sin(angle);
}

function update() {
  count += 1;
  if (count % 10 === 0) {
    gameState.frame += 1;
    gameState.frame %= 3;
    count = 0;
    /* gameState.enemys.forEach((enemy) => {
      enemy.frame += 1;
      enemy.frame %= 3;
    });
    */
  }

  gameState.bullets = gameState.bullets.map((bullet) => ({
    x: updateX(bullet.x, bullet.speed, bullet.angle),
    y: updateY(bullet.y, bullet.speed, bullet.angle),
    speed: bullet.speed,
    angle: bullet.angle,
  }));

  // gameState.x = updateX(gameState.x, gameState.speed, gameState.angle);
  // gameState.y = updateY(gameState.y, gameState.speed, gameState.angle);
}

function gameLoop() {
  update();
  draw();
  // window.requestAnimationFrame(gameLoop);
}

function start() {
  // socket.emit('start');
  setupEventlisteners();
  backgroundMusic.play();
  window.requestAnimationFrame(gameLoop);
}

function setupSocket() {
  socket.on('connect', () => {
    console.log('connected');
    if (gameState.imagesLoaded && gameState.audioLoaded) {
      view.enableStartButton();
    }
    gameState.connected = true;
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
    view.disableStartButton();
    gameState.connected = false;
  });
  socket.on('start', (data) => {
    console.log(data);
    gameState.x = data.x;
    gameState.y = data.y;
    gameState.angle = data.angle;
    start();
  });
  socket.on('update', (data) => {
    console.log(data);
    gameState.x = data.x;
    gameState.y = data.y;
    gameState.angle = data.angle;
    gameState.enemys = data.enemys;
    window.requestAnimationFrame(gameLoop);
  });
}

function init() {
  // eslint-disable-next-line no-undef
  socket = io();

  view = new View();
  view.showStartButton(() => {
    view.hideStartButton();
    socket.emit('start');
  });

  setupSocket();

  setupAudio(() => {
    if (gameState.imagesLoaded && gameState.connected) {
      view.enableStartButton();
    }
    // console.log("audioLoaded");
    gameState.audioLoaded = true;
  });
  // setupImages(setup);
  setupImages(() => {
    const images = {};
    globalImages.forEach((img) => {
      images[img.name] = img.img;
    });
    view.setupImages(images);
    if (gameState.audioLoaded && gameState.connected) {
      view.enableStartButton();
    }
    gameState.imagesLoaded = true;
  });
}

window.onload = init();
