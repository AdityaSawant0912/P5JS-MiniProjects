class Particle {
  
  PVector pos = new PVector(0, 0);
  PVector vel = new PVector(0, 0);
  PVector acc = new PVector(0, 0);
  float maxSpeed = 4;
  float maxForce = 0.1;
  float r = 6;
  float mass = 10;
  color col = color(255);
  
  Particle(PVector pos, PVector vel, float r, float mass, color c) {
    this.pos = pos;
    this.vel = vel;
    this.r = r;
    this.mass = mass;
    this.col = c;
  }
  
  void setPos(PVector pos) {
    this.pos = pos;
  }
  void setPos(float x, float y) {
    this.pos.x = x;
    this.pos.y = y;
  }
  
  void setVel(PVector vel) {
    this.vel = vel;
  }
  void setVel(float x, float y) {
    this.vel.x = x;
    this.vel.y = y;
  }
  
  void setAcc(PVector acc) {
    this.acc = acc;
  }
  void setAcc(float x, float y) {
    this.acc.x = x;
    this.acc.y = y;
  }
  
  void addForce(PVector force) {
    this.acc.add(force);
  }
  void addForce(float x, float y) {
    this.acc.add(new PVector(x, y));
  }
  
  
  boolean checkCollision(Particle other) {
    float d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    if (d < this.r + other.r) {
      return true;
    }
    return false;
  }
  
  void resolveParticle(Particle other) {
    PVector dir = PVector.sub(this.pos, other.pos);
    float d = dir.mag();
    dir.normalize();
    float force = (this.r + other.r - d) / d;
    dir.mult(force * dt);
    this.addForce(dir);
    other.addForce(dir.mult( - 1));
    
  }
  
  
  void update() {
    this.vel.add(new PVector(this.acc.x * dt, this.acc.y * dt));
    this.vel.limit(this.maxSpeed);
    this.pos.add(new PVector(this.vel.x * dt, this.vel.y * dt));
  }
  
  
  void draw() {
    
    fill(this.col);
    noStroke();
    circle(this.pos.x, this.pos.y, this.r * 2);
    
  }
  
}