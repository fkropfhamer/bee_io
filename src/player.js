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

  shoot() {
    const bulletAngle = (this.angle + Math.PI) % (2 * Math.PI);
    this.game.createBullet(this.x, this.y, bulletAngle);
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
