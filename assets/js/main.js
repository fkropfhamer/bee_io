import bee01 from '../images/bee01.png'; // 934 x 632
import bee02 from '../images/bee02.png';
import bee03 from '../images/bee03.png';
import background from '../images/waben001.png'; // 8016 x 5881
import sting from '../images/sting001.png'; // 631 x 337
import '../css/index.css';
import music from '../sound/Six_Umbrellas_-_07_-_Asset_House.mp3';
import View from './view';

class Game {
  constructor() {
    this.count = 0;
    this.globalImages = [];
    this.connected = false;
    this.started = false;
    this.imagesLoaded = false;
    this.audioLoaded = false;
    this.frame = 0;

    this.bullets = [];
    this.enemys = [];

    // eslint-disable-next-line no-undef
    this.socket = io();

    this.view = new View();
    this.view.showStartMenu((name) => {
      this.view.hideStartMenu();
      this.socket.emit('start', { name });
    });

    this.setupSocket();

    this.setupAudio(() => {
      if (this.imagesLoaded && this.connected) {
        this.view.enableStartButton();
      }
      // console.log("audioLoaded");
      this.audioLoaded = true;
    });
    // setupImages(setup);
    this.setupImages(() => {
      const images = {};
      this.globalImages.forEach((img) => {
        images[img.name] = img.img;
      });
      this.view.setupImages(images);
      if (this.audioLoaded && this.connected) {
        this.view.enableStartButton();
      }
      this.imagesLoaded = true;
    });
  }

  loadImages(callback) {
    let loadedImagesCount = 0;
    this.globalImages.forEach((img) => {
      img.img.onload = () => {
        loadedImagesCount += 1;
        if (loadedImagesCount === this.globalImages.length) {
          callback();
        }
      };
    });
  }

  setupImages(callback) {
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

    this.globalImages.push({ img: beeImg01, name: 'bee01' });
    this.globalImages.push({ img: beeImg02, name: 'bee02' });
    this.globalImages.push({ img: beeImg03, name: 'bee03' });
    this.globalImages.push({ img: stingImg, name: 'sting' });
    this.globalImages.push({ img: backgroundImg, name: 'background' });

    this.loadImages(callback);
  }

  setupAudio(callback) {
    this.backgroundMusic = new Audio();
    this.backgroundMusic.src = music;
    this.backgroundMusic.loop = true;
    this.backgroundMusic.onloadeddata = callback;
  }

  setupEventlisteners() {
    window.addEventListener('mousemove', (e) => {
      const dir = Math.atan2(
        e.clientY - this.view.canvas.offsetTop - this.view.height / 2,
        e.clientX - this.view.canvas.offsetLeft - this.view.width / 2
      );
      this.socket.emit('update direction', dir);
    });
    // TODO: fires when start button clicked!
    window.addEventListener('click', () => {
      this.socket.emit('shoot');
    });
  }

  draw() {
    this.view.reset();
    // console.log(gameState.x, gameState.y);
    this.view.drawBackground(this.x, this.y);
    this.bullets.forEach((bullet) => {
      this.view.drawBullet(bullet.x, bullet.y, bullet.angle, this.x, this.y);
    });
    this.enemys.forEach((enemy) => {
      this.view.drawEnemy(enemy.x, enemy.y, enemy.angle, enemy.frame, this.x, this.y);
    });
    this.view.drawPlayer(this.angle, this.frame);
  }

  update() {
    this.count += 1;
    if (this.count % 10 === 0) {
      this.frame += 1;
      this.frame %= 3;
      this.count = 0;
    }
  }

  gameLoop() {
    this.update();
    this.draw();
  }

  death() {
    // view.reset();
    this.view.showDeathMenu();
  }

  start() {
    // socket.emit('start');
    this.setupEventlisteners();
    this.backgroundMusic.play();
    window.requestAnimationFrame(() => this.gameLoop());
  }

  setupSocket() {
    this.socket.on('connect', () => {
      console.log('connected');
      if (this.imagesLoaded && this.audioLoaded) {
        this.view.enableStartButton();
      }
      this.connected = true;
    });
    this.socket.on('disconnect', () => {
      console.log('disconnected');
      this.view.disableStartButton();
      this.connected = false;
    });
    this.socket.on('start', (data) => {
      console.log(data);
      this.x = data.x;
      this.y = data.y;
      this.angle = data.angle;
      this.start();
    });
    this.socket.on('update', (data) => {
      console.log(data);
      this.x = data.x;
      this.y = data.y;
      this.angle = data.angle;
      this.enemys = data.enemys;
      this.bullets = data.bullets;
      window.requestAnimationFrame(() => this.gameLoop());
    });

    this.socket.on('death', () => {
      this.death();
    });
  }
}

function init() {
  // eslint-disable-next-line no-new
  new Game();
}

window.onload = init();
