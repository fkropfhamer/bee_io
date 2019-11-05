import Player from '../src/player';

test('BulletHit', () => {
  const mockSocket = { on: () => true };
  const mockGame = {};
  const testPlayer = new Player(mockSocket, mockGame);

  testPlayer.x = 100;
  testPlayer.y = 100;
  testPlayer.angle = 1;
  expect(testPlayer.checkBulletHit(100, 100, 1)).toBe(true);
  expect(testPlayer.checkBulletHit(1000, 1000, 1)).toBe(false);
});

test('constructor', () => {
  const mockSocket = { on: jest.fn(() => true) };
  const mockGame = {};
  const testPlayer = new Player(mockSocket, mockGame);

  expect(testPlayer.socket).toBe(mockSocket);
  expect(testPlayer.game).toBe(mockGame);
  expect(mockSocket.on.mock.calls.length).toBe(3);
});

test('shoot', () => {
  const mockSocket = { on: jest.fn(() => true) };
  const mockGame = { createBullet: jest.fn(() => true) };
  const testPlayer = new Player(mockSocket, mockGame);

  testPlayer.shoot();

  expect(mockGame.createBullet.mock.calls.length).toBe(1);
});
describe('update', () => {
  test('update position out of bound', () => {
    const mockSocket = { on: jest.fn(() => true) };
    const mockGame = { createBullet: jest.fn(() => true) };
    const testPlayer = new Player(mockSocket, mockGame);

    testPlayer.x = 0;
    testPlayer.y = 0;
    testPlayer.angle = 0;
    testPlayer.speed = 0;

    testPlayer.update();

    expect(testPlayer.x).toBe(684);
    expect(testPlayer.y).toBe(672);
    expect(testPlayer.angle).toBe(0);
    expect(testPlayer.speed).toBe(0);
  });
  test('update normal', () => {
    const mockSocket = { on: jest.fn(() => true) };
    const mockGame = { createBullet: jest.fn(() => true) };
    const testPlayer = new Player(mockSocket, mockGame);

    testPlayer.x = 2000;
    testPlayer.y = 2000;
    testPlayer.angle = 0;
    testPlayer.speed = 10;

    testPlayer.update();

    expect(testPlayer.x).toBe(2010);
    expect(testPlayer.y).toBe(2000);
  });
});
