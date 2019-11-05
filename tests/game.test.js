import Game from '../src/game';

test('constructor', () => {
  const game = new Game();

  expect(game.players).toEqual([]);
  expect(game.bullets).toEqual([]);
});
