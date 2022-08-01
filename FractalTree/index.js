let angle = 0;
let slider;
let len = 100;
let depthSlider;
let lenMulSlider;
let depth;
let lenMul;
function setup() {
  createCanvas(800, 800);
  frameRate(5)
  slider = createSlider(0, PI, 0.26, 0.01);
  depthSlider = createSlider(1, 13, 10, 1);
  lenMulSlider = createSlider(0.25, 1, 0.8, 0.01);
  angle = slider.value();
  depth = depthSlider.value();
  lenMul = lenMulSlider.value();
}

function draw() {
  background(51);
  angle = slider.value();
  depth = depthSlider.value();
  lenMul = lenMulSlider.value();
  // len = lenSlider.value();
  textSize(30);
  noStroke();
  fill(255);
  text("Angle: " + angle, width - 200, 100);
  text("Depth: " + depth, width - 200, 150);
  text("Len Mul: " + lenMul, width - 200, 200);
  stroke(255, 100);
  strokeWeight(2);
  // line(width / 2, height, width / 2, height - len);
  translate(400, height-0.5*len);
  branch(len, 0);
}


function branch(len, d){
  line(0, 0, 0, -len)
  translate(0, -len)
  len*= lenMul
  if(d < depth){
    d++;
    push()
    rotate(angle);
    branch(len, d);
    pop()
    push()
    rotate(-angle);
    branch(len, d);
    pop()
  }
}

