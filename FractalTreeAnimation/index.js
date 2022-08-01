
let tree;
let leftAngle, rightAngle, leftLenMul, rightLenMul;
let leftAngleVal, rightAngleVal, leftLenMulVal, rightLenMulVal;
let depth;
let depthVal;
let p;
let len = 200;
function setup() {
  createCanvas(800, 800);
  p = createP("Left Angle")
  leftAngle = createSlider(0, PI, 0.26, 0.01)
  p = createP("Right Angle")
  rightAngle = createSlider(0, PI, 0.26, 0.01)
  p = createP("Left Length Multiplier")
  leftLenMul = createSlider(0.25, 1, 0.8, 0.01);
  p = createP("Right Length Multiplier")
  rightLenMul = createSlider(0.25, 1, 0.8, 0.01);
  p = createP("Depth")
  depth = createSlider(1, 13, 3, 1);
  createTree();
}

function createTree(){
  leftAngleVal = leftAngle.value()
  rightAngleVal = rightAngle.value()
  leftLenMulVal = leftLenMul.value()
  rightLenMulVal = rightLenMul.value()
  depthVal = depth.value()
  
  tree = new Tree(leftAngleVal, rightAngleVal, leftLenMulVal, rightLenMulVal, depthVal, len)
}



function draw() {
  if(leftAngleVal != leftAngle.value() || rightAngleVal != rightAngle.value() || leftLenMulVal != leftLenMul.value() || rightLenMulVal != rightLenMul.value() || depthVal != depth.value() ){
    createTree();
  }

  background(0);
  noStroke();
  fill(255);
  text("Angle: " + leftLenMulVal, width - 200, 100);
  text("Depth: " + rightLenMulVal, width - 200, 150);
  text("Len Mul: " + leftAngle, width - 200, 200);
  tree.draw();
}