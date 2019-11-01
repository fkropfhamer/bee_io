class View {
  constructor() {
    this.scale = 0.15;
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.color = '#92922e';
    this.setupCanvas();
    this.ctx = this.canvas.getContext('2d');
  }

  setupImages(images) {
    this.backgroundImage = images.background;
    this.beeImages = [images.bee01, images.bee02, images.bee03];
    this.stingImage = images.sting;
  }

  setupCanvas() {
    this.canvas = document.createElement('canvas');
    this.changeCanvasSize(this.width, this.height);
    this.canvas.style.backgroundColor = this.color;
    document.getElementById('root').appendChild(this.canvas);
  }

  showStartButton(startEvent) {
    const button = document.createElement('button');
    button.style.position = 'absolute';
    button.style.left = '50%';
    button.style.top = '50%';
    button.innerHTML = 'start';
    button.disabled = true;
    button.addEventListener('click', () => startEvent());
    document.getElementById('root').appendChild(button);
    this.button = button;
    this.showStartMenu();
  }

  showStartMenu() {
    const div = document.createElement('div');
    div.style.backgroundColor = 'grey';
    div.style.position = 'absolute';
    div.style.left = '25%';
    div.style.top = '25%';
    div.style.width = `${this.width / 2}px`;
    div.style.height = `${this.height / 2}px`;
    document.getElementById('root').appendChild(div);
    this.div = div;
  }

  enableStartButton() {
    this.button.disabled = false;
  }

  disableStartButton() {
    this.button.disabled = true;
  }

  hideStartButton() {
    // console.log("test123");
    this.button.style.display = 'none';
  }

  changeCanvasSize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
  }

  reset() {
    this.ctx.fillStyle = this.color;
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawBackground(x, y) {
    this.ctx.drawImage(
      this.backgroundImage,
      -(x - this.width / 2),
      -(y - this.height / 2),
      this.backgroundImage.width,
      this.backgroundImage.height
    );
  }

  drawImageAtAngle(image, x, y, angle, scale = 1) {
    const imgWidth = image.width * scale;
    const imgHeight = image.height * scale;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);

    this.ctx.drawImage(image, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    this.ctx.restore();
  }

  drawBullet(x, y, angle, playerX, playerY) {
    this.drawImageAtAngle(
      this.stingImage,
      x - (playerX - this.width / 2),
      y - (playerY - this.height / 2),
      angle,
      0.05
    );
  }

  drawEnemy(x, y, angle, frame, playerX, playerY) {
    const enemyImage = this.beeImages[frame];
    this.drawImageAtAngle(
      enemyImage,
      x - (playerX - this.width / 2),
      y - (playerY - this.height / 2),
      angle,
      this.scale
    );
  }

  drawPlayer(angle, frame) {
    const beeImage = this.beeImages[frame];
    this.drawImageAtAngle(beeImage, this.width / 2, this.height / 2, angle, this.scale);
  }
}

export default View;
