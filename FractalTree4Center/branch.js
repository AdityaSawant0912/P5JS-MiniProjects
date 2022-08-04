

class Branch {
    constructor(begin, end){
        this.begin = begin;
        this.end = end;
        this.hasBranches = false;
    }
    
    show(){
        
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
        
    }
    
    createBranchRight(){
        let dir = p5.Vector.sub(this.end, this.begin).mult(rightLenMulVal);
        dir.rotate(rightAngleVal);
        return new Branch(this.end, p5.Vector.add(this.end, dir)) 
    }
    createBranchLeft(){
        let dir = p5.Vector.sub(this.end, this.begin).mult(leftLenMulVal);
        dir.rotate(-leftAngleVal);
        return new Branch(this.end, p5.Vector.add(this.end, dir)) 
    }
}