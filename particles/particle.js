class Rect {
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Particle {
    constructor(pos, vel, r, m, c, boundary) {
        this.r = r;
        this.m = m;
        this.c = c;
        this.pos = pos;
        this.vel = vel;
        this.acc = createVector(0,0);
        this.boundary = boundary;
    }
    
    update() {
        this.vel = this.vel.add(this.acc)
        this.pos = this.pos.add(this.vel)
        this.handleBoundary()
    }
    
    handleBoundary() {
        if (this.pos.x - this.r < this.boundary.x - this.boundary.w / 2) {
            this.pos.x = this.boundary.x - this.boundary.w / 2 + this.r; // Push inside
            this.vel.x *= -1; // Reflect velocity
        }
        if (this.pos.x + this.r > this.boundary.x + this.boundary.w / 2) {
            this.pos.x = this.boundary.x + this.boundary.w / 2 - this.r;
            this.vel.x *= -1;
        }
    
        // Top & Bottom Boundaries
        if (this.pos.y - this.r < this.boundary.y - this.boundary.h / 2) {
            this.pos.y = this.boundary.y - this.boundary.h / 2 + this.r;
            this.vel.y *= -1;
        }
        if (this.pos.y + this.r > this.boundary.y + this.boundary.h / 2) {
            this.pos.y = this.boundary.y + this.boundary.h / 2 - this.r;
            this.vel.y *= -1;
        }
    }
    
    isColliding(other) {
        return !(this.pos.x + this.r < other.pos.x || 
            this.pos.x > other.pos.x + other.r ||
            this.pos.y + this.r < other.pos.y || 
            this.pos.y > other.pos.y + other.r);
    }
    
    collide(other) {
        // **Step 1: Resolve Overlap (Push Particles Apart)**
        let impact = p5.Vector.sub(other.pos, this.pos);
        let d = impact.mag();
        let overlap = this.r + other.r - d;

        if (overlap > 0) {
        
            let correction = impact.copy().normalize().mult(overlap / 2);
            this.pos.sub(correction);
            other.pos.add(correction);
        }
        if(d < this.r + other.r){
            let mSum = this.m + other.m;
            let vDiff = p5.Vector.sub(other.vel, this.vel);
            
            let num = 2 * other.m * vDiff.dot(impact);
            let den = mSum * d * d;
            let deltaVA = impact.copy()
            deltaVA.mult(num/den);
            this.vel.add(deltaVA)
            let deltaVB = impact.copy()
            deltaVB.mult(-num/den)
            other.vel.add(deltaVB)
            
            
            
        }
        
            
        
    }
    
    draw() {
        push();
        fill(this.c);
        noStroke();
        circle(this.pos.x,this.pos.y,this.r*2)
        pop();
    }
}