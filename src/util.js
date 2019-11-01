class Util {
  static updateX(x, speed, angle) {
    return x + speed * Math.cos(angle);
  }

  static updateY(y, speed, angle) {
    return y + speed * Math.sin(angle);
  }
}

export default Util;
