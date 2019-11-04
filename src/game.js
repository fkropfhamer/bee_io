import config from './config';
import Util from './util';

class Game {
  constructor() {
    this.players = [];
    this.bullets = [];
    // this.boundTop = 1000;
    // this.boundBottom = 3000;
    // this.boundLeft = 1000;
    // this.boundRight = 3000;
    // this.bulletDuration = 10000;
    setInterval((game) => game.update(), 25, this);
  }

  addPlayer(player) {
    console.log('added Player');
    player.x = config.boundLeft + Math.random() * config.boundRight;
    player.y = config.boundTop + Math.random() * config.boundBottom;
    player.angle = Math.random();
    player.speed = config.playerSpeed;
    player.health = config.playerHealth;
    this.players.push(player);
    player.sendStart();
  }

  playerDisconnected(player) {
    this.players = this.players.filter((p) => !Object.is(p, player));
  }

  createBullet(x, y, angle, player) {
    this.bullets.push({
      x,
      y,
      angle,
      player,
      speed: config.bulletSpeed,
      duration: config.bulletDuration,
    });
  }

  updateBullets() {
    const bullets = this.bullets.filter((bullet) => bullet.duration !== 0);
    this.bullets = bullets.map((bullet) => ({
      x: Util.updateX(bullet.x, bullet.speed, bullet.angle),
      y: Util.updateY(bullet.y, bullet.speed, bullet.angle),
      angle: bullet.angle,
      player: bullet.player,
      speed: bullet.speed,
      duration: bullet.duration - 1,
    }));
  }

  updatePlayers() {
    this.players.forEach((player) => {
      player.update();
    });
  }

  // checks for every player every enemy bullet if it hits the player
  checkHits() {
    // TODO
    this.players.forEach((player) => {
      // console.log(player.socket.id);
      const enemyBullets = this.bullets.filter((bullet) => !Object.is(bullet.player, player));
      // console.log(this.players.length, enemyBullets.length);
      enemyBullets.forEach((bullet) => {
        if (player.checkBulletHit(bullet.x, bullet.y, bullet.angle)) {
          player.health -= 5;
          this.bullets = this.bullets.filter((b) => !Object.is(b, bullet));
          console.log('hit');
        }
      });
    });
  }

  update() {
    this.updatePlayers();
    this.updateBullets();

    this.checkHits();
    // console.log('update');
    this.players.forEach((player) => {
      player.update();
    });
    this.players.forEach((player) => {
      const enemys = this.players.filter((p) => !Object.is(p, player));
      // console.log('enemy', enemys);
      // console.log('player', this.players);
      const enemyPos = enemys.map((enemy) => ({
        x: enemy.x,
        y: enemy.y,
        angle: enemy.angle,
        frame: 1,
      }));
      const bulletsPos = this.bullets.map((bullet) => ({
        x: bullet.x,
        y: bullet.y,
        angle: bullet.angle,
      }));
      player.sendUpdate(enemyPos, bulletsPos);
    });
  }
}

export default Game;
