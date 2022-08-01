

class Branch {
    constructor(begin, end, sw){
        this.begin = begin;
        this.end = end;
        this.hasBranches = false;
        this.animate = true;
        this.percent = 0;
        this.sw = sw;
    }
    
    show(){
        
        stroke(255);
        strokeWeight(this.sw * 0.5);
        if (this.animate) {
            let mid = p5.Vector.sub(this.end, this.begin).mult(this.percent * 0.01)
            mid = p5.Vector.add(this.begin, mid)
           
            line(this.begin.x, this.begin.y, mid.x, mid.y)
            if (this.percent > 99) {
                this.animate = false;
            } else {
            
                this.percent+= 1;
            }
        } else{
            line(this.begin.x, this.begin.y, this.end.x, this.end.y);
        }
        
    }
    
    createBranchRight(){
        let dir = p5.Vector.sub(this.end, this.begin).mult(rightLenMulVal);
        dir.rotate(rightAngleVal);
        return new Branch(this.end, p5.Vector.add(this.end, dir), this.sw-1) 
    }
    createBranchLeft(){
        let dir = p5.Vector.sub(this.end, this.begin).mult(leftLenMulVal);
        dir.rotate(-leftAngleVal);
        return new Branch(this.end, p5.Vector.add(this.end, dir), this.sw-1) 
    }
}