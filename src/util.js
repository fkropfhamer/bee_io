class Util {
  static updateX(x, speed, angle) {
    return x + speed * Math.cos(angle);
  }

  static updateY(y, speed, angle) {
    return y + speed * Math.sin(angle);
  }

  static isIn(a, b, c, d, p) {
    const ab = this.vector(a, b);
    const ap = this.vector(a, p);
    const bc = this.vector(b, c);
    const bp = this.vector(b, p);

    const abap = this.dot(ab, ap);
    const abab = this.dot(ab, ab);
    const bcbp = this.dot(bc, bp);
    const bcbc = this.dot(bc, bc);

    return abap >= 0 && abap <= abab && bcbp >= 0 && bcbp <= bcbc;
  }

  static vector(a, b) {
    const x = b.x - a.x;
    const y = b.y - a.y;
    return { x, y };
  }

  static dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }

  // rotate Point about an angle around the Origin 
  static rotate(p, angle) {
    const x = p.x * Math.cos(angle) - p.y * Math.sin(angle);
    const y = p.y * Math.cos(angle) + p.x * Math.sin(angle);
    return { x: Math.round(x), y: Math.round(y) };
  }

  // rotate Point around m
  static rotatePoint(p, m, angle) {
    const mp = this.vector(m, p);
    const rotatedPoint = this.rotate(mp, angle);
    const x = m.x + rotatedPoint.x;
    const y = m.y + rotatedPoint.y;
    return { x, y };
  }
}

export default Util;
