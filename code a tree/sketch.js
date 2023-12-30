let snowflakes = [];
let decorations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  createDecorations();
}

function draw() {
  background(230, 248, 255);

  if (random() > 0.8) {
    let snowflake = new Snowflake(random(width), 0);
    snowflakes.push(snowflake);
  }
  
  for (let snowflake of snowflakes) {
    snowflake.display();
    snowflake.update();
  }

  fill(34, 139, 34);
  triangle(width / 2, height / 3, width / 2 - 80, height - 50, width / 2 + 80, height - 50);
  fill(139, 69, 19);
  rect(width / 2 - 20, height - 50, 40, 150);

  for (let decoration of decorations) {
    decoration.display();
  }
}

class Snowflake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 15);
    this.speed = random(1, 3);
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  update() {
    this.y += this.speed;

    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
}

function createDecorations() {
  createLights(150);

  createOrnamentType(OrnamentType.BAUBLE1, 5);
  createOrnamentType(OrnamentType.BAUBLE2, 5);
  createOrnamentType(OrnamentType.BAUBLE3, 5);
  createOrnamentType(OrnamentType.BAUBLE4, 5);

  decorations.push(new Ornament(width / 2, height / 3 - 10, OrnamentType.STAR));

  createOrnamentType(OrnamentType.BELL, 3);
}

function createLights(count) {
  for (let i = 0; i < count; i++) {
    let x = random(width / 2 - 60, width / 2 + 40);
    let y = random(height / 3 + 20, height - 70);
    decorations.push(new Ornament(x, y, OrnamentType.LIGHT));
  }
}

function createOrnamentType(type, count) {
  for (let i = 0; i < count; i++) {
    let x, y;

    do {
      x = random(width / 2 - 80, width / 2 + 80);
      y = random(height / 3, height - 50);
    } while (!isPointInTriangle(x, y));

    let ornament = new Ornament(x, y, type);
    decorations.push(ornament);
  }
}

function isPointInTriangle(x, y) {
  const x0 = width / 2;
  const y0 = height / 3;
  const x1 = width / 2 - 80;
  const y1 = height - 50;
  const x2 = width / 2 + 80;
  const y2 = height - 50;

  const d1 = (x - x1) * (y0 - y1) - (x0 - x1) * (y - y1);
  const d2 = (x - x2) * (y1 - y2) - (x1 - x2) * (y - y2);
  const d3 = (x - x0) * (y2 - y0) - (x2 - x0) * (y - y0);

  const hasNeg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  const hasPos = (d1 > 0) || (d2 > 0) || (d3 > 0);

  return !(hasNeg && hasPos);
}

class Ornament {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.rotation = 0;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    switch (this.type) {
      case OrnamentType.LIGHT:
        drawLight(15, 10, random(5));
        break;
      case OrnamentType.BAUBLE1:
        drawOrnament(0, 0, 20, color(random(255), 192, 203));
        break;
      case OrnamentType.BAUBLE2:
        drawOrnament(0, 0, 20, color(random(255), 255, 0));
        break;
      case OrnamentType.BAUBLE3:
        drawOrnament(0, 0, 20, color(random(192), 192, 192));
        break;
      case OrnamentType.BAUBLE4:
        drawOrnament(0, 0, 20, color(random(255), 215, 0));
        break;
      case OrnamentType.STAR:
        drawStar(0, 0, 30, color(random(255), 223, 0));
        break;
      case OrnamentType.BELL:
        drawBell(0, 0, 20, color(random(255), 223, 0));
        break;
    }

    pop();
  }
}

const OrnamentType = {
  LIGHT: 'light',
  BAUBLE1: 'bauble1',
  BAUBLE2: 'bauble2',
  BAUBLE3: 'bauble3',
  BAUBLE4: 'bauble4',
  STAR: 'star',
  BELL: 'bell',
};

function drawLight(x, y, size) {
  fill(255, 255, 0);
  ellipse(x, y, size, size);
}

function drawOrnament(x, y, size, ornamentColor) {
  fill(ornamentColor);
  ellipse(x, y, size, size);
}

function drawStar(x, y, size, starColor) {
  fill(starColor);
  noStroke();
  beginShape();
  for (let i = 0; i < 5; i++) {
    let angle = 1.8 + HALF_PI + TWO_PI * (i * 2) / 5;
    let sx = x + cos(angle) * size;
    let sy = y + sin(angle) * size;
    vertex(sx, sy);
    angle += HALF_PI / 2;
    let mx = x + cos(angle) * size / 2;
    let my = y + sin(angle) * size / 2;
    vertex(mx, my);
  }
  endShape(CLOSE);
}

function drawBell(x, y, size, bellColor) {
  fill(bellColor);
  ellipse(x, y - size / 2, size, size);
  rect(x - size / 2, y - size / 4, size, size / 2);
  ellipse(x, y, size * 0.7, size * 0.7);
}