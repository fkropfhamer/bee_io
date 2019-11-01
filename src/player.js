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
  }

  update() {
    this.x = Player.updateX(this.x, this.speed, this.angle);
    this.y = Player.updateY(this.y, this.speed, this.angle);
  }

  static updateX(x, speed, angle) {
    return x + speed * Math.cos(angle);
  }
  
  static updateY(y, speed, angle) {
    return y + speed * Math.sin(angle);
  }

  sendStart() {
      this.socket.emit('start', {x: this.x, y: this.y, angle: this.angle});
  }

  sendUpdate(enemys) {
      this.socket.emit('update', {x: this.x, y: this.y, angle: this.angle, enemys});
  }
}

export default Player;
