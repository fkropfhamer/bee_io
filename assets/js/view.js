class View {
  constructor() {
    this.scale = 0.15;
    this.bulletScale = 0.05;
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

  showStartMenu(startEvent) {
    const div = document.createElement('div');
    div.style.backgroundColor = 'grey';
    div.style.position = 'absolute';
    div.style.left = '25%';
    div.style.top = '25%';
    div.style.width = `${this.width / 2}px`;
    div.style.height = `${this.height / 2}px`;
    document.getElementById('root').appendChild(div);
    this.div = div;

    const form = document.createElement('form');
    form.onsubmit = () => false;
    this.form = form;
    this.div.appendChild(form);

    const button = document.createElement('button');
    button.type = 'submit';
    button.style.position = 'absolute';
    button.style.left = '20%';
    button.style.top = '50%';
    button.innerHTML = 'start';
    button.disabled = true;
    button.addEventListener('click', () => {
      if (this.input.value !== '') {
        // TODO set Player name and send to server!
        console.log(this.input.value);
        startEvent();
      }
    });
    this.form.appendChild(button);
    this.button = button;

    const input = document.createElement('input');
    input.placeholder = 'Name';
    input.required = true;
    input.style.position = 'absolute';
    input.style.left = '20%';
    input.style.top = '30%';
    this.input = input;

    this.form.appendChild(input);

    const heading = document.createElement('h1');
    heading.innerHTML = 'BEE IO';
    heading.style.position = 'absolute';
    heading.style.left = '20%';
    heading.style.top = '5%';

    this.div.appendChild(heading);

    // this.div.style.display = "none";
  }

  hideStartMenu() {
    this.div.style.display = 'none';
  }

  enableStartButton() {
    this.button.disabled = false;
  }

  disableStartButton() {
    this.button.disabled = true;
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
      this.bulletScale
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

  // helper function to see hitbox
  drawRectAtAngle(x, y, angle, width, height, scale = 1) {
    const imgWidth = width * scale;
    const imgHeight = height * scale;

    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);

    // this.ctx.drawImage(image, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    this.ctx.beginPath();
    // this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'red';

    this.ctx.rect(-imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawPlayer(angle, frame) {
    const beeImage = this.beeImages[frame];
    this.drawImageAtAngle(beeImage, this.width / 2, this.height / 2, angle, this.scale);
    this.drawRectAtAngle(this.width / 2, this.height / 2, angle, 733, 333, this.scale);
  }
}

export default View;
