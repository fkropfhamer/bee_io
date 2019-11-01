import io from 'socket.io';
import server from './server';
import Player from './player';
import Game from './game';

class Socket {
  constructor() {
    this.games = [];
  }

  listen(port) {
    this.server = server.listen(port);
    this.io = io(this.server);
    this.setup();
  }

  findGame() {
    if (this.games.length <= 0) {
      const game = new Game();
      this.games.push(game);
      return game;
    }
    let game = this.games.find((g) => g.players.length < 16);
    if (game === undefined) {
      game = new Game();
      this.games.push(game);
    }
    return game;
  }

  setup() {
    this.io.on('connection', (socket) => {
      console.log('user connected');
      socket.on('start', () => {
        console.log('start');
        this.start(socket);
      });
    });
  }

  start(socket) {
    const game = this.findGame();
    const player = new Player(socket, game);
    game.addPlayer(player);
  }
}

export default Socket;
