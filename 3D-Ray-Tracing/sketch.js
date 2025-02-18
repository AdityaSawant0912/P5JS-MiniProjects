let walls = [];
let particle;

let xoff = 0;
let yoff = 100000;


const sceneW = 400;
const sceneH = 400


function setup() {
  let canvas = createCanvas(800, 400);
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  walls.push(new Boundary(0, 0, sceneW, 0));
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  walls.push(new Boundary(0, sceneH, 0, 0));

  particle = new Particle();
  sliderFOV = createSlider(0, 360, 45);
  sliderFOV.input(changeFOV)
}

function changeFOV() {
  const fov = sliderFOV.value();
  particle.updateFOV(fov)
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }


  if (keyIsDown(65)) {
    particle.rotate(-0.1);
  }
  else if (keyIsDown(68)) {
    particle.rotate(0.1);
  }
  else if (keyIsDown(87)) {
    particle.move(1);
  }
  else if (keyIsDown(83)) {
    particle.move(-1);
  }


  // particle.update(noise(xoff)*sceneW, noise(yoff)*sceneH);
  // xoff += 0.01;
  // xoff += 0.01;
  // particle.update(mouseX, mouseY)
  particle.show();

  const scene = particle.look(walls);
  const w = sceneW / scene.length;
  push();
  translate(sceneW, 0);
  for (let i = 0; i < scene.length; i++) {
    noStroke();
    const sq = scene[i] * scene[i];
    const wSq = sceneW * sceneW;
    const b = map(sq, 0, wSq, 255, 0);
    const h = map(sq, 0, wSq, sceneH, 0);
    fill(b);
    rectMode(CENTER);
    rect(i * w + w / 2, sceneH / 2, w + 1, h);
  }
  pop();

  // ray.show();
  // ray.lookAt(mouseX, mouseY);
  // let pt = ray.cast(wall);
  // if(pt){
  //   stroke(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}