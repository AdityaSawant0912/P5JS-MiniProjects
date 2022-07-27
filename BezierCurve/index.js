
let connections = [];
let wireInProgress = false;
let mouseIsClicked = false;
function setup() {
  createCanvas(600, 600);
  connections.push(new Connection(100, 100, "world"))
  connections.push(new Connection(400, 400, "world"))
}

function mouseReleased() {
  mouseIsClicked = false;
}
function mouseClicked() {
  mouseIsClicked = true;
}

class mousePoint{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

class Connection {
  constructor(x, y, parent) {
    this.pos = createVector(x, y);
    this.parent = parent;
    this.active = false;
    this.wires = [];
    this.currWire = null;
    this.highlight = false;
    this.connectedTo = [];
  }
  
  update() {
    if (dist(mouseX, mouseY, this.pos.x, this.pos.y) <= 20){
      this.highlight = true;
    }else{
      this.highlight = false;
    }
    
    
    // console.log(mouseIsClicked , wireInProgress , !this.highlight);
    // if(this.currWire == null){
    //    wireInProgress = false;
    // }
    if (this.currWire && !this.currWire.inComplete) {
      this.wires.push(this.currWire);
    
      for (const connection of connections) {
        if (connection.pos.x != this.currWire.end.x && connection.pos.y != this.currWire.end.y) {
          this.connectedTo.push(connection);
        }
      }
      this.currWire = null;
     
    }
    if(this.highlight && mouseIsClicked && !wireInProgress){
      wireInProgress = true;
        this.currWire = new Wire(this.pos.x, this.pos.y);
        // console.log("a");
    }
    else if(mouseIsClicked && wireInProgress && this.currWire && !this.highlight){
      // console.log("b");
        this.currWire.addPoint();
    }
      // console.log("c");
  }
  
  
  draw() {
    if(this.active){
        fill(255, 0, 0);
    }else{
      fill(100, 100);
      if(this.highlight)
        fill(100, 100, 100);
    }
    
    // strokeWeight(24);
    circle(this.pos.x, this.pos.y, 40)
    
    for (let wire of this.wires) {
      wire.active = this.active;
      wire.draw();
    }
    if(this.currWire != null)
    this.currWire.draw();
  }
}

class Wire {
  constructor(x, y) {
    this.start = createVector(x, y);
    this.end;
    this.path = []
    this.path.push(new mousePoint(x, y));
    this.path.push(new mousePoint(x, y));
    this.inComplete = true;
    this.active = false;
    
  }
  
  addPoint(){
    if (this.inComplete) {
      for (let connection of connections) {
        if (connection.highlight == true && connection.pos.x != this.start.x && connection.pos.y != this.start.y) {
          console.log("aaa");
          this.end = new mousePoint(connection.pos.x, connection.pos.y)
          this.path.push(this.end);
          this.path.push(this.end);
          this.inComplete = false;
          this.end = createVector(connection.pos.x, connection.pos.y);
          console.log();
        } else {
          this.path.push(new mousePoint(mouseX, mouseY));
        }
      }
    }
    
    console.log(this.path);
  }
  
  draw(){
    push()
    noFill();
    strokeWeight(1);
    if(this.active)
      stroke(255, 0, 0);
    else
      stroke(100, 100, 100);
    
    beginShape();
    
    for (let point of this.path) {
      curveVertex(point.x, point.y);
    }
    if (this.inComplete) {
      curveVertex(mouseX, mouseY);
      curveVertex(mouseX, mouseY);
    }
    endShape();
    pop()
    
  }
}




function draw() {
  background(0);
  
  for (let connection of connections) {
    connection.update()
  }
  for (let connection of connections) {
    connection.draw()
  }
  
}