let angle = 0;
let slider;
let len = 200;
let depthSlider;
let lenSlider;
let depth;
function setup() {
  createCanvas(800, 800);
  slider = createSlider(0, PI, PI / 4, 0.01);
  depthSlider = createSlider(1, 13, 5, 1);
  // lenSlider = createSlider(50, 400, 200, 25);
  angle = slider.value();
  depth = depthSlider.value();
  // len = lenSlider.value();
}

function draw() {
  background(51);
  angle = slider.value();
  depth = depthSlider.value();
  // len = lenSlider.value();
  textSize(30);
  noStroke();
  fill(255);
  text("Angle: " + angle, width - 200, 100);
  text("Depth: " + depth, width - 200, 150);
  stroke(255, 100);
  strokeWeight(2);
  // line(width / 2, height, width / 2, height - len);
  translate(400, height-0.5*len);
  branch(len, 0);
}


function branch(len, d){
  line(0, 0, 0, -len)
  translate(0, -len)
  len*= 0.67
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

