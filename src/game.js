class Game {
  constructor() {
    this.players = [];
    this.boundTop = 1000;
    this.boundBottom = 3000;
    this.boundLeft = 1000;
    this.boundRight = 3000;
    setInterval((game) => game.update(), 25, this);
  }

  addPlayer(player) {
    console.log('added Player');
    player.x = this.boundLeft + Math.random() * this.boundRight;
    player.y = this.boundTop + Math.random() * this.boundBottom;
    player.angle = Math.random();
    player.speed = 5;
    this.players.push(player);
    player.sendStart();
  }

  playerDisconnected(player) {
      this.players = this.players.filter(p => !Object.is(p, player));
  }

  update() {
      // console.log('update');
      this.players.forEach((player) => {
        player.update();
      });
      this.players.forEach((player) => {
        const enemys = this.players.filter(p => !Object.is(p, player));
        // console.log('enemy', enemys);
        // console.log('player', this.players);
        const enemyPos = enemys.map(enemy => ({x: enemy.x, y: enemy.y, angle: enemy.angle, frame: 1}));
        player.sendUpdate(enemyPos);
      });
  }
}

export default Game;
