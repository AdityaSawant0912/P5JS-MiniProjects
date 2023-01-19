class Bird {
    constructor(){
        this.y = height / 2;
        this.x = width / 4;
        this.r = 20;
        this.g = 0.6;
        this.v = 0;
        this.flyPower = -15;
        
    }
    
    show(){
        fill(0, 200, 90);
        noStroke()
        ellipse(this.x, this.y, (this.r) * 2);
    }
    
    update(){
        this.y += this.v;
        this.v += this.g;
    }
    
    fly(){
        this.v += this.flyPower;
    }
    
    checkCollision(goundY){
        // Bottom
        if(this.y + this.r > goundY){
            this.y  = goundY - this.r;
            this.v = 0;
            return true;
        }
        // Top
        if(this.y - this.r < 0){
            this.y = this.r;
            this.v = 0;
            return true;
        }
        // Somewhere in middle
        return false
        
    }
}