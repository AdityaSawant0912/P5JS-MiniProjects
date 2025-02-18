const HEIGHT = 640;
const WIDTH = 930;

const particles = [] 
function setup() {
  const colors = [
    color('#F9ED69'),
    color('#F08A5D'),
    color('#B83B5E'),
    color('#6A2C70'),
  ]
  createCanvas(WIDTH, HEIGHT);
  const world = new Rect(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT)
  for(let i = 0; i < 1000; i++){
    particles.push(new Particle(createVector(random(WIDTH), random(HEIGHT)), 
    createVector(random(-5,5), random(-5,5)),
    5, 10, colors[floor(random(0,colors.length))], world))
  }
    // particles.push(new Particle(createVector(200, 200), 
    // createVector(1, 1),
    // 100, 10, colors[1], world))
    // particles.push(new Particle(createVector(400, 400), 
    // createVector(-1,-1),
    // 100, 10, colors[2], world))
}

function draw() {
  background(51);
  for(let i = 0; i < particles.length; i++){
    particles[i].draw()
    particles[i].update()
    for(let j =  i + 1; j < particles.length; j ++){
      particles[i].collide(particles[j])
    }
  }
}