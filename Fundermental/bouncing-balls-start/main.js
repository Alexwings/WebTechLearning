// 设置画布
const headline = document.querySelector('h1');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const p = document.createElement("p");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

function randomColor() {
  return (
    "rgb(" + 
      random(0,255) + "," +
      random(0,255) + "," + 
      random(0,255) +")"
  );
}

class Shape {
  x;
  y;
  velX;
  velY;
  exist;
  constructor(x,y,velX, velY, exist) {
    this.x = x;
    this.y = y; 
    this.velX = velX;
    this.velY = velY;
    this.exist = exist;
  }
  draw() {

  };
  update() {
    if ((this.x + this.size >= width) || (this.x - this.size <= 0)) {
      this.velX = -this.velX;
    }
    if ((this.y + this.size >= height) || (this.y - this.size <= 0)) {
      this.velY = -this.velY;
    }
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;
  };

  collisionDetect() {};
}

class Ball extends Shape {
  color;
  size;
  constructor(x,y,velX, velY, color, size, exist) {
    super(x,y,velX,velY, exist);
    this.color = color;
    this.size = size;
  }

  draw() {
    if (!this.exist) return;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  };

  update() {
    if (!this.exist) return;
    super.update();
  }


  collisionDetect(balls) {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      if (this !== balls[i] && ball.exist && this.exist) { //碰撞不会重叠
        const dx = ball.x - this.x;
        const dy = ball.y - this.y;
        const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
        if (dist < this.size + ball.size) {
          this.color = randomColor();
        }
      }
    }
  }
}

class EvilCircle extends Shape {
  color = "white";
  size = 15;
  constructor(x,y,exist) {
    super(x, y, 20, 20, exist);
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  checkBounds() {
    if (this.x + this.size >= width) {
      this.x = width - this.size;
    }

    if (this.x - this.size <= 0) {
      this.x = this.size
    }

    if (this.y + this.size >= height) {
      this.y = height - this.size
    } 

    if (this.y - this.size <= 0) {
      this.y = this.size
    }
  }

  setControl(balls) {
    for (let i = 0; i < balls.length; i++) {
      const ball = balls[i];
      const dx = ball.x - this.x;
      const dy = ball.y - this.y;
      const dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
      if ((ball.size + this.size) >= dist) {
        ball.exist = false;
      }
    }
  }
}

const balls = []
const evilCircel = new EvilCircle(width / 2, height / 2, true)
headline.append(p);
while (balls.length < 25) {
  let size = random(10, 20);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomColor(),
    size,
    true
  );
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  evilCircel.draw();
  let leftovers = balls.length;
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].velX == 0 && balls[i].velY == 0) {
      balls[i].velX += random(-7, 7);
      balls[i].velX += 1;
    }
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect(balls);
    evilCircel.checkBounds();
    evilCircel.setControl(balls);
    if (!balls[i].exist) {
      leftovers -= 1;
    }
  }
  p.textContent = `Total: ${leftovers} left`;
  requestAnimationFrame(loop);
}
loop();

window.onkeydown = (e) => {
  switch(e.key) {
    case "a":
      evilCircel.x -= evilCircel.velX;
      break;
    case "d":
      evilCircel.x += evilCircel.velX;
      break;
    case "w":
      evilCircel.y -= evilCircel.velY;
      break;
    case "s":
      evilCircel.y += evilCircel.velY;
      break;
  }
}