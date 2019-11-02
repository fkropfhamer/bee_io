import Player from "../src/player";

test('BulletHit', () => {
    const mockSocket = { on: (a, b) => true };
    const mockGame = {};
    const testPlayer = new Player(mockSocket, mockGame);

    testPlayer.x = 100;
    testPlayer.y = 100;
    testPlayer.angle = 1;
    expect(testPlayer.checkBulletHit(100, 100, 1)).toBe(true);
    expect(testPlayer.checkBulletHit(1000, 1000, 1)).toBe(false);
});
