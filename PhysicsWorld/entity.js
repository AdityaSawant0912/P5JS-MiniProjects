
class Entity {
    
    constructor(x, y, w, h) {
        this.position = createVector(x, y);
        this.width = w;
        this.height = h;
        this.halfWidth = w / 2;
        this.halfHeight = h / 2;
        this.color = color(65)
        this.distanceFromPlayer = [];
    }
    
    draw(){
        push();
        fill(this.color);
        noStroke();
        // rectMode(CENTER)
        rect(this.position.x, this.position.y, this.width, this.height);
        pop();
    }
    
    
}