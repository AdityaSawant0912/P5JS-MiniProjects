const GR = (Math.sqrt(5) - 1) / 2;
const INTERVAL = 0.01;
const ITERATIONS = 30;
const grid = 25
const xPos = 10;
const yPos = 2;
let itr = 0;
let col;
let row;
let X;
let Y;
let p, x, y;
let x1 
let x2 
let fx1
let fx2

let a = 0;
let b = 4;

function func(x) {
  return (Math.pow(x, 2) - 6 * x + 15);
}

function drawGrid() {
  stroke(255, 50);
  textSize(25)
  let f = text('f(x) = x^2 - 6x + 15', 20, 120);
  let a = text("dy/dx = 2x - 6  = 0 (for min)\n\n x = 3\n\nf(3) = 6 \n\n\u2234  Min (X, Y) = (3, 6)", 450, 150)
  col = width / grid;
  row = height / grid;
  stroke(255, 100)
  strokeWeight(1)
  for (let i = 0; i < width; i += col) {
    line(i, 0, i, height);
  }
  for (let i = 0; i < height; i += col) {
    line(0, i, width, i);
  }

  // Axis
  stroke(255)
  strokeWeight(2)
  X = xPos * col;
  Y = height - yPos * row;
  line(0, Y, width, Y);
  line(X, 0, X, height);
  
  noStroke();
  fill(255);
  textSize(18)
  let t1 = []
  for (let i = -5; i < 11; i++) {
    if(i < 0)
    t1[i] = text(`${i}`, X + i * col, Y + 20)
    else
    t1[i] = text(` ${i}`, X + i * col, Y + 20)
  }
  textSize(18)
  let t = [];
  for (let i = -2; i < 11; i++) {
    if(i == 10)
    t[i] = text(` ${i}`, X - 35, Y - i * row - 3)
    else
    t[i] = text(`   ${i}`, X - 35, Y - i * row - 3)
  }
  ;
}

function drawFunc() {
  for (let i = -1; i < 5; i += INTERVAL) {
    let x = i;
    let y = func(x);
    let px = X + x * col;
    let py = Y - y * row;
    stroke(255)
    strokeWeight(3)
    point(px, py);
  }
}

function drawLines(){
  let fx, fy
  // A
  stroke(255, 0, 0)
  strokeWeight(2)
  fx = X + a * col;
  fy = Y - func(a) * row;
  line(fx, fy, fx, Y)
  // B
  stroke(0, 0, 255)
  strokeWeight(2)
  fx = X + b * col;
  fy = Y - func(b) * row;
  line(fx, fy, fx, Y)

}

function itrate() {
  let d = GR * (b - a)
  x1 = a + d;
  x2 = b - d;
  fx1 = func(x1);
  fx2 = func(x2);
  x.elt.innerHTML = (x1 +x2) / 2;
  y.elt.innerHTML = (fx1 + fx2) / 2;
  if (fx1 < fx2) {
    a = x2;
  } else if (fx1 > fx2) {
    b = x1;
  }
  
}

function setup() {
  createCanvas(800, 800);
  // console.log(GR);
  // console.log(func(5));
  let itra = createP('Iterations: ');
  itra.style('font-size', '16px');
  itra.position(20, height)
  p = createP('0');
  p.style('font-size', '16px');
  p.position(100, height);

  let xL = createP('Average X: ');
  xL.style('font-size', '16px');
  xL.position(20, height + 30)

  x = createP('-');
  x.style('font-size', '16px');
  x.position(100, height + 30)

  let yL = createP('Average Y: ');
  yL.style('font-size', '16px');
  yL.position(20, height + 60)

  y = createP('-');
  y.style('font-size', '16px');
  y.position(100, height + 60)
  fill(255, 100);

}

function draw() {
  background(51);
  // stroke(255)
  drawGrid();
  drawFunc();
  drawLines();
  if (frameCount % 75 == 0 && itr < ITERATIONS) {
    itr++;
    p.elt.innerHTML = itr;
    itrate();

  }
  if (itr == ITERATIONS) {
    noLoop();
  }
}