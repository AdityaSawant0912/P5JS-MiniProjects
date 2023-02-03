const RAD = 50;
const FINAL_RAD = 15;
const EPSILON = 'ɛ';
const arrowSize = 15;
let old = [-1, -1];
let temp = [0, 0];
let state1;
let enfa;
let cnv;
let wasPressed = false;
let diff = [0, 0];
let CanvasScale = [1, 1];
// let expression = "(((0+1)*.1.0) +((0.0)*.(1.1)*))"
// expression = "(a + b) + ( c + d)";
let p = null;
let inp = null;
expression = "(((0+1)*.1.0) +((0.0)*.(1.1)*))";
function drawArrow(base, vec) {
  push();
  stroke(255);
  strokeWeight(3);
  fill(255);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 10;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function changeExp() {
  if (this.value()) {
    expression = this.value();
    // noLoop()
    // loop()
    setup()
  }
}

function start() {
  CanvasScale = [1, 1]
  let exps = document.getElementById("exps").value;
  let expression = InfixToPostfix(exps)
  // console.log(expression);
  enfa = new eNFA(expression)
  enfa.calculateTree();
  enfa.calculateArrows();
}

function setup() {
  cnv = createCanvas(800, 800);
  cnv.mousePressed(mousePressed1);
  // state1 = new State(0, false, false);
  // // state1.show = 8
  // state1.x = 200;
  // state1.y = 200;

  start(expression)

  // expression = InfixToPostfix(expression)
  // // expression = InfixToPostfix(expression).split("").reverse().join("");
  // console.log(expression);
  // enfa = new eNFA(expression)
  // enfa.calculateTree();
  // enfa.calculateArrows();
  // console.log(enfa.tree);
  // console.log(enfa.connections);
  // console.log(enfa.extra);
  // enfa.generateTree();

}

function mouseWheel(event) {
  // print(event.delta);
  //move the square according to the vertical scroll amount
  CanvasScale[0] -= event.delta / 1000;
  CanvasScale[1] -= event.delta / 1000;
  //uncomment to block page scrolling
  //return false;
  if (CanvasScale[0] < 0.4) {
    CanvasScale[0] = 0.4;
    CanvasScale[1] = 0.4;
  }
  if(CanvasScale[0] > 2){
  CanvasScale[0] = 2;
  CanvasScale[1] = 2;
  }
  // console.log(CanvasScale[0]);
}


function mousePressed1() {
  old[0] = mouseX;
  old[1] = mouseY;
  temp = diff;
  wasPressed = true;
}

function draw() {
  translate(0 + SPACE + RAD/2, height / 2)
  translate(width/2 -(SPACE + RAD/2), 0)
  scale(CanvasScale[0], CanvasScale[1])
  translate(-width/2 - (SPACE + RAD/2), -0)
  // translate(width/2 - enfa.tree[enfa.tree.length - 1].x/2, height/2)


  background(51);
  if (mouseIsPressed && wasPressed == true) {
    diff = [mouseX - old[0], mouseY - old[1]];
    diff[0] += temp[0];
    diff[1] += temp[1];
  } else if (!mouseIsPressed && wasPressed == true) {
    wasPressed = false
    diff = [mouseX - old[0] + temp[0], mouseY - old[1] + temp[1]]
    temp = [0, 0]
  }
  translate(diff[0], diff[1])

  // state1.draw(400, 400);
  // console.log(mousePressed);

  enfa.arrows.forEach(arrow => {
    arrow.draw();
  });
  enfa.tree.forEach(state => {
    // if(state.show != 2)
    state.draw()
  });

}
