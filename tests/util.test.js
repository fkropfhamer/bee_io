import Util from '../src/util';

test('vector', () => {
  expect(Util.vector({ x: 1, y: 2 }, { x: 3, y: 4 })).toEqual({ x: 2, y: 2 });
});

test('dot', () => {
  expect(Util.dot({ x: 1, y: 2 }, { x: 3, y: 4 })).toBe(11);
});

test('in', () => {
  const a = { x: 8, y: 11 };
  const b = { x: 12, y: 7 };
  const c = { x: 7, y: 2 };
  const d = { x: 3, y: 6 };
  const p1 = { x: 13, y: 10 };
  const p2 = { x: 9, y: 7 };
  const p3 = { x: 9, y: 4 };
  const p4 = { x: 10, y: 4 };
  const p5 = { x: 9, y: 4 };
  const p6 = { x: 0, y: 0 };
  expect(Util.isIn(a, b, c, d, p1)).toBe(false);
  expect(Util.isIn(a, b, c, d, p2)).toBe(true);
  expect(Util.isIn(a, b, c, d, p3)).toBe(true);
  expect(Util.isIn(a, b, c, d, p4)).toBe(false);
  expect(Util.isIn(a, b, c, d, p5)).toBe(true);
  expect(Util.isIn(a, b, c, d, p6)).toBe(false);
});


test('in turned', () => {
  const a = { x: 8, y: 11 };
  const b = { x: 12, y: 7 };
  const c = { x: 7, y: 2 };
  const d = { x: 3, y: 6 };
  const p1 = { x: 13, y: 10 };
  const p2 = { x: 9, y: 7 };
  const p3 = { x: 9, y: 4 };
  const p4 = { x: 10, y: 4 };
  const p5 = { x: 9, y: 4 };
  const p6 = { x: 0, y: 0 };
  expect(Util.isIn(b, c, d, a, p1)).toBe(false);
  expect(Util.isIn(b, c, d, a, p2)).toBe(true);
  expect(Util.isIn(b, c, d, a, p3)).toBe(true);
  expect(Util.isIn(b, c, d, a, p4)).toBe(false);
  expect(Util.isIn(b, c, d, a, p5)).toBe(true);
  expect(Util.isIn(b, c, d, a, p6)).toBe(false);
});

test('rotate', () => {
  expect(Util.rotate({ x: 10, y: 0 }, (90 * Math.PI) / 180)).toEqual({ x: 0, y: 10 });
  expect(Util.rotate({ x: 12, y: 0 }, (180 * Math.PI) / 180)).toEqual({ x: -12, y: 0 });
});

test('rotate around point', () => {
  expect(Util.rotatePoint({ x: 5, y: 0 }, { x: 10, y: 0 }, (180 * Math.PI) / 180)).toEqual({
    x: 15,
    y: 0,
  });
  expect(Util.rotatePoint({ x: 5, y: 0 }, { x: 10, y: 5 }, (180 * Math.PI) / 180)).toEqual({
    x: 15,
    y: 10,
  });
});
