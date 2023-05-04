public Particle p, p1;
float lastTime = 0;
public float dt = 0;
void setup() {
  size(400, 400);
  p  = new Particle(new PVector(150, 150), new PVector(4, 4), 21, 100, color(255, 0, 0));
  p1  = new Particle(new PVector(width - 150, height - 150), new PVector(-4, -4), 21, 100, color(0, 0, 255));
  frameRate(60);
}

void draw() {
  dt = (millis() - lastTime) / 1000.0f;
  // dt = 1;
  background(51);
  p.draw();
  p1.draw();
  p.update();
  if(p.checkCollision(p1))
    println("Collided");
  if(p.checkCollision(p1))
    p.resolveParticle(p1);
  p1.update();
  lastTime = millis();  
}