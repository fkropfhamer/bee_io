import Game from '../src/game';
import config from '../src/config';

test('constructor', () => {
  const game = new Game();

  expect(game.players).toEqual([]);
  expect(game.bullets).toEqual([]);
});

test('add_player', () => {
  const game = new Game();
  const player = { sendStart: jest.fn(() => true) };

  game.addPlayer(player);

  expect(player.sendStart.mock.calls.length).toBe(1);
  expect(game.players).toEqual([player]);
});

test('player_disconnected', () => {
  const game = new Game();
  const player1 = { x: 1, y: 2 };
  const player2 = { x: 2, y: 5 };

  game.players = [player1, player2];

  game.playerDisconnected(player2);

  expect(game.players).toEqual([player1]);

  game.playerDisconnected(player1);

  expect(game.players).toEqual([]);
});

test('create_bullet', () => {
  const game = new Game();
  const player = { x: 1, y: 2 };

  game.createBullet(1, 2, 0, player);

  expect(game.bullets).toEqual([
    {
      x: 1,
      y: 2,
      angle: 0,
      player,
      speed: config.bulletSpeed,
      duration: config.bulletDuration,
    },
  ]);
});

test('update_players', () => {
  const game = new Game();
  const player1 = { update: jest.fn(() => true) };
  const player2 = { update: jest.fn(() => true) };
  const player3 = { update: jest.fn(() => true) };

  game.players = [player1, player2, player3];

  game.updatePlayers();

  expect(game.players).toEqual([player1, player2, player3]);
  expect(player1.update.mock.calls.length).toBe(1);
  expect(player2.update.mock.calls.length).toBe(1);
  expect(player3.update.mock.calls.length).toBe(1);
});
