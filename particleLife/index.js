const N = 2000;
const dt = 0.01;
const frictionHalfLife = 0.040;
const rmax = 0.1;
const m = 4;
const matrix = makeRandomMatrix();
const frictionFactor = Math.pow(0.5, dt / frictionHalfLife);
const beta = 0.3;
const forceFactor = 10;
const particles = [];

class Particle {
  constructor() {
    this.pos = createVector(Math.random(), Math.random());
    this.vel = createVector(0, 0);
    this.color = Math.floor(Math.random() * m)
  }
}

function force(r, a) {
  if (r < beta)
    return r / beta - 1;
  else if (beta < r && r < 1)
    return a * (1 - Math.abs(2 * r - 1 - beta) / (1 - beta))
  else
    return 0;
}

function updateParticles() {
  // update velocities
  for (let i = 0; i < N; i++) {
    const p1 = particles[i];
    let fx = 0;
    let fy = 0;
    for (let j = 0; j < N; j++) {
      if (i == j) continue; // skip self (no self-interaction
      const p2 = particles[j];
      let rx = p2.pos.x - p1.pos.x;
      let ry = p2.pos.y - p1.pos.y;
      let r = Math.sqrt(rx * rx + ry * ry);
      if (r > 0 && r < rmax) {
        let f = force(r / rmax, matrix[p1.color][p2.color])
        fx += rx / r * f;
        fy += ry / r * f;
      }
    }
    fx *= rmax * forceFactor;
    fy *= rmax * forceFactor;

    p1.vel.y *= frictionFactor;
    p1.vel.x *= frictionFactor;

    p1.vel.x += fx * dt;
    p1.vel.y += fy * dt;

  };

  // update particles
  particles.forEach(particle => {
    particle.pos.x += particle.vel.x * dt;
    particle.pos.y += particle.vel.y * dt;
  });
}


function makeRandomMatrix() {
  const rows = [];
  for (let i = 0; i < m; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      row.push(Math.random() * 2 - 1);
    }
    rows.push(row);
  }
  return rows;
}

function setup() {
  let canvas = createCanvas(900, 900);
  
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  for (let i = 0; i < N; i++) {
    particles.push(new Particle());
  }
  console.table(matrix);
}


function draw() {
  background(0);
  //update
  updateParticles();
  //draw
  noStroke();

  particles.forEach(particle => {
    colorMode(HSL, 360, 100, 100);
    fill(particle.color * 360 / m, 100, 50);
    circle(particle.pos.x * width, particle.pos.y * height, 5);
  });




}
