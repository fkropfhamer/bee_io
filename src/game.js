import config from './config';
import Util from './util';

class Game {
  constructor() {
    this.players = [];
    this.bullets = [];
    this.boundTop = 1000;
    this.boundBottom = 3000;
    this.boundLeft = 1000;
    this.boundRight = 3000;
    this.bulletDuration = 10000;
    setInterval((game) => game.update(), 25, this);
  }

  addPlayer(player) {
    console.log('added Player');
    player.x = this.boundLeft + Math.random() * this.boundRight;
    player.y = this.boundTop + Math.random() * this.boundBottom;
    player.angle = Math.random();
    player.speed = config.playerSpeed;
    player.health = config.playerHealth;
    this.players.push(player);
    player.sendStart();
  }

  playerDisconnected(player) {
    this.players = this.players.filter((p) => !Object.is(p, player));
  }

  createBullet(x, y, angle) {
    this.bullets.push({
      x,
      y,
      angle,
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
      speed: bullet.speed,
      duration: bullet.duration - 1,
    }));
  }

  updatePlayers() {
    this.players.forEach((player) => {
      player.update();
    });
  }

  update() {
    this.updatePlayers();
    this.updateBullets();
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
      player.sendUpdate(enemyPos, this.bullets);
    });
  }
}

export default Game;
