let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  rectMode(CENTER);
  
  let offset = 0;
  for (let x = 0; x < width; x += 10) {
    let a = angle + offset;
    let h = map(sin(a), -1, 1, 0, 100);
    fill(255);
    rect(x - width /2, 0, 10, h);
    offse
  }
  angle += 0.1;
}
