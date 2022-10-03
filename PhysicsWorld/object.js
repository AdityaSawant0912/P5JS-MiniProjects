let dx, dy;

class Obj {
    constructor(px, py, w, h, vx, vy, ax, ay, fps){
        this.position = createVector(px, py);
        this.width = w;
        this.height = h;
        this.halfWidth = w/2;
        this.halfHeight = h/2;
        this.velocity = createVector(vx, vy); 
        this.acceleration = createVector(ax, ay);
        this.deltaT = 1 / fps;
        this.isCollided = {
            north: false,
            south: false,
            east: false,
            west: false
        }
    }
    
    boxCollision(){
        if (this.position.y + this.halfHeight >= height) {
            this.velocity.y = -this.velocity.y;
            this.isCollided.south = true;
        }else{
            this.isCollided.south = false;
        }
        if (this.position.y - this.halfHeight <= 0) {
            this.velocity.y = -this.velocity.y;
            this.isCollided.north = true;
        }else{
            this.isCollided.north = false;
        }
        if (this.position.x + this.halfWidth >= width) {
            this.velocity.x = -this.velocity.x;
            this.isCollided.east = true;
        }else{
            this.isCollided.east = false;
        }
        if (this.position.x - this.halfWidth <= 0) {
            this.velocity.x = -this.velocity.x;
            this.isCollided.west = true;
        }else{
            this.isCollided.west = false;
        }
    }
    
    takeInput(){
        if(keyIsDown(68) && !this.isCollided.east){
            this.velocity.add(10, 0);
        }
        if(keyIsDown(65)&& !this.isCollided.west){
            this.velocity.add(-10, 0);
        }
        if(keyIsDown(87)&& this.isCollided.south){
            this.velocity.add(0, -10);
        }
    }
    
    isAABB(entity){
        return this.position.x < entity.position.x + entity.width &&
            this.position.x + this.width > entity.position.x &&
            this.position.y < entity.position.y + entity.height &&
            this.position.y + this.height > entity.position.y
    }
    
    CalculateAabbDistanceTo(entity){
        dx = 0;
        dy = 0;
        if(this.position.x < entity.position.x)
            dx = entity.position.x - (this.position.x + this.width)
        else if(this.position.x < entity.position.x)
            dx = this.position.x - (entity.position.x + entity.width)
        
        if(this.position.y < entity.position.y)
            dy = entity.position.y - (this.position.y + this.height)
        else if(this.position.y < entity.position.y)
            dy = this.position.y - (entity.position.y + entity.height)
        
        entity.distanceFromPlayer = [dx, dy]
    }
    
    update(){
        this.takeInput();
        if (!this.isCollided.south) {
            this.velocity.add(this.acceleration.x * this.deltaT, this.acceleration.y * this.deltaT)
        }
        this.velocity.x = (mouseX - this.position.x) * 5
        this.velocity.y = (mouseY - this.position.y) * 5
        this.position.add(this.velocity.x * this.deltaT, this.velocity.y * this.deltaT)
        // console.log(this.velocity);
        this.velocity.limit(500, 0)
        // this.position.x = mouseX;
        // this.position.y = mouseY;
        this.boxCollision();
        
        
    }
    draw(){
        push();
        fill(207,25,58);
        noStroke();  
        // rectMode(CENTER)
        rect(this.position.x, this.position.y, this.width, this.height)
        pop();
    }
}