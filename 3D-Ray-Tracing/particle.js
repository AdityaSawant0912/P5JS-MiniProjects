class Particle{
    constructor(color){
        this.fov = 45
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        this.heading = 0;
        for (let i = -this.fov/2; i < this.fov/2; i+=1) {
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }
    
    
    update(x, y){
        this.pos.set(x, y);
    }
    updateFOV(fov){
        this.fov = fov;
        this.rays = [];
        for (let i = -this.fov/2; i < this.fov/2; i+=1) {
            this.rays.push(new Ray(this.pos, radians(i)+this.heading));
        }
    }
    
    rotate(angle){
        this.heading += angle;
        let index = 0;
        for (let i = -this.fov/2; i < this.fov/2; i+=1) {
            this.rays[index].setAngle(radians(i)+this.heading);
            index++;
        }
    }
    move(amt){
        const vel = p5.Vector.fromAngle(this.heading);
        vel.setMag(amt);
        this.pos.add(vel);
    }
    
    look(walls) {
        const scene = [];
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                let pt = ray.cast(wall)
                if (pt) {
                    let d = p5.Vector.dist(this.pos, pt);
                    const a = ray.dir.heading() - this.heading;
                    d *= cos(a);
                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if(closest){
                stroke(255, 100)
                line(this.pos.x, this.pos.y, closest.x, closest.y)
            }
            scene.push (record);
        }
        return scene
    }
    
    show(){
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for (let ray of this.rays) {
            ray.show()
        }
    }
}