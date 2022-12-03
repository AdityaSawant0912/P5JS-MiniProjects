
class Wire {
    constructor(x1, y1, id){
        this.points = [];
        this.points.push(createVector(x1, y1));
        this.id = id;
        this.isComplete = false;
        this.x2
    }
    
    draw(){
        for (let i = 0; i < this.points.length; i++) {
            push()
            stroke(255);
            strokeWeight(4);
            if(i == this.points.length - 1){
                line(this.points[i].x, this.points[i].y, mouseX, mouseY);
            }else{
                line(this.points[i].x, this.points[i].y,this.points[i + 1].x, this.points[i + 1].y);
            }
            pop()
        }
    }
}