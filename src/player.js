import config from './config';
import Util from './util';

class Player {
  constructor(socket, game) {
    this.socket = socket;
    this.game = game;
    this.setupSocket();
  }

  setupSocket() {
    this.socket.on('disconnect', () => {
      console.log('disconnected');
      this.game.playerDisconnected(this);
    });
    this.socket.on('update direction', (dir) => {
      // console.log(dir);
      this.angle = dir;
    });
    this.socket.on('shoot', () => {
      this.shoot();
    });
  }

  checkBulletHit(x, y, angle) {
    // TODO
    const width = config.playerWidth;
    const height = config.playerHeight;
    const bWidth = config.bulletWidth;
    const bHeight = config.bulletHeight;
    // { x: 2421.1696444469108, y: 2116.508065147513 }
    // { x: 2302.940558909733, y: 2116.508065147513 }
    // { x: 2302.940558909733, y: 2126.7779645268015 }
    // { x: 2421.1696444469108, y: 2126.7779645268015 }
    // { x: 2376.8337373704694, y: 2117.6334749544935 }
    const sA = { x: this.x - width / 2, y: this.y - height / 2 };
    const sB = { x: this.x + width / 2, y: this.y - height / 2 };
    const sC = { x: this.x + width / 2, y: this.y + height / 2 };
    const sD = { x: this.x - width / 2, y: this.y + height / 2 };

    const m = { x: this.x, y: this.y };

    const a = Util.rotatePoint(sA, m, this.angle);
    const b = Util.rotatePoint(sB, m, this.angle);
    const c = Util.rotatePoint(sC, m, this.angle);
    const d = Util.rotatePoint(sD, m, this.angle);

    const sB1 = { x: x - bWidth / 2, y: y - bHeight / 2 };
    const sB2 = { x: x + bWidth / 2, y };
    const sB3 = { x: x - bWidth / 2, y: y + bHeight / 2 };

    const b1 = Util.rotatePoint(sB1, { x, y }, angle);
    const b2 = Util.rotatePoint(sB2, { x, y }, angle);
    const b3 = Util.rotatePoint(sB3, { x, y }, angle);

    return Util.isIn(a, b, c, d, b1) || Util.isIn(a, b, c, d, b2) || Util.isIn(a, b, c, d, b3);
  }

  shoot() {
    const bulletAngle = (this.angle + Math.PI) % (2 * Math.PI);
    this.game.createBullet(this.x, this.y, bulletAngle, this);
  }

  update() {
    this.x = Util.updateX(this.x, this.speed, this.angle);
    this.y = Util.updateY(this.y, this.speed, this.angle);
  }

  sendStart() {
    this.socket.emit('start', { x: this.x, y: this.y, angle: this.angle });
  }

  sendUpdate(enemys, bullets) {
    this.socket.emit('update', {
      x: this.x,
      y: this.y,
      angle: this.angle,
      enemys,
      bullets,
    });
  }
}

export default Player;
