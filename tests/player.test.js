import Player from '../src/player';

test('BulletHit', () => {
  // TODO add some more test case
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

  expect(mockSocket.on.mock.calls[0][0]).toBe('disconnect');
  expect(mockSocket.on.mock.calls[1][0]).toBe('update direction');
  expect(mockSocket.on.mock.calls[2][0]).toBe('shoot');
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

    expect(testPlayer.x).toBe(679);
    expect(testPlayer.y).toBe(667);
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

  test('update 90°', () => {
    const mockSocket = { on: jest.fn(() => true) };
    const mockGame = { createBullet: jest.fn(() => true) };
    const testPlayer = new Player(mockSocket, mockGame);

    testPlayer.x = 2000;
    testPlayer.y = 2000;
    testPlayer.angle = Math.PI / 2;
    testPlayer.speed = 10;

    testPlayer.update();

    expect(testPlayer.x).toBe(2000);
    expect(testPlayer.y).toBe(2010);
  });

  test('update', () => {
    const mockSocket = { on: jest.fn(() => true) };
    const mockGame = { createBullet: jest.fn(() => true) };
    const testPlayer = new Player(mockSocket, mockGame);

    testPlayer.x = 2000;
    testPlayer.y = 2000;
    testPlayer.angle = 2;
    testPlayer.speed = 10;

    testPlayer.update();

    expect(Math.round(testPlayer.x)).toBe(1996);
    expect(Math.round(testPlayer.y)).toBe(2009);
  });
});

test('send_start', () => {
  const mockSocket = { on: jest.fn(() => true), emit: jest.fn(() => true) };
  const mockGame = { createBullet: jest.fn(() => true) };
  const testPlayer = new Player(mockSocket, mockGame);

  testPlayer.x = 2000;
  testPlayer.y = 2000;
  testPlayer.angle = 2;
  testPlayer.speed = 10;

  testPlayer.sendStart();

  expect(mockSocket.emit.mock.calls.length).toBe(1);
  expect(mockSocket.emit.mock.calls[0][0]).toBe('start');
  expect(mockSocket.emit.mock.calls[0][1]).toEqual({ x: 2000, y: 2000, angle: 2 });
});

test('send_update', () => {
  const mockSocket = { on: jest.fn(() => true), emit: jest.fn(() => true) };
  const mockGame = { createBullet: jest.fn(() => true) };
  const testPlayer = new Player(mockSocket, mockGame);

  testPlayer.x = 2000;
  testPlayer.y = 2000;
  testPlayer.angle = 2;
  testPlayer.speed = 10;

  const enemys = [{ x: 1000, y: 2000, angle: 3 }, { x: 3000, y: 4000, angle: 0 }];
  const bullets = [{ x: 500, y: 2500, angle: 1 }, { x: 3500, y: 4500, angle: 2 }];

  testPlayer.sendUpdate(enemys, bullets);

  expect(mockSocket.emit.mock.calls.length).toBe(1);
  expect(mockSocket.emit.mock.calls[0][0]).toBe('update');
  expect(mockSocket.emit.mock.calls[0][1]).toEqual({
    x: 2000,
    y: 2000,
    angle: 2,
    enemys,
    bullets,
  });
});
