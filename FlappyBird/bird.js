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
        ellipse(this.x, this.y, (this.r+4) * 2);
    }
    
    update(){
        this.y += this.v;
        this.v += this.g;
    }
    
    fly(){
        // if(this.v >! -30)
        this.v += this.flyPower;
    }
    
    checkBoundary(goundY){
        if(this.y > goundY){
            this.y = goundY;
            this.v = 0;
            return true;
        }
        if(this.y < 0){
            this.y = 0;
            this.v = 0;
            return true;
        }
        return false
        
    }
}