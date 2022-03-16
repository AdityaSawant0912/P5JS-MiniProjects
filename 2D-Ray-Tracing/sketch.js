let walls = [];
let particle;

let xoff = 0;
let yoff = 100000;

let complete = false;
let x1, x2;
let index;

function setup() {
  createCanvas(400, 400);

  // for (let i = 0; i < 5; i++) {
  //   let x1 = random(width);
  //   let x2 = random(width);
  //   let y1 = random(height);
  //   let y2 = random(height);
  //   walls[i] = new Boundary(x1, y1, x2, y2);
  // }

  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));
  index = walls.length - 1;

  particle = new Particle();
}

function mousePressed() {
  if (!complete) {
    x1 = mouseX;
    y1 = mouseY;
    complete = true;
  } else {
    walls.push(new Boundary(x1, y1, mouseX, mouseY));
    index++
    complete = false;
  }
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  if(complete){
    line(x1, y1, mouseX, mouseY);
  }

  if (keyIsDown(BACKSPACE)) {
    walls = [];
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));
  }

  // particle.update(noise(xoff)*width, noise(yoff)*height);
  // xoff += 0.01;
  // xoff += 0.01;
  particle.update(mouseX, mouseY);
  particle.show();
  particle.look(walls);
  // ray.show();
  // ray.lookAt(mouseX, mouseY);
  // let pt = ray.cast(wall);
  // if(pt){
  //   stroke(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}
