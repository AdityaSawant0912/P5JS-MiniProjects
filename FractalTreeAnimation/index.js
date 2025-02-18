
let tree;
let leftAngle, rightAngle, leftLenMul, rightLenMul;
let leftAngleVal, rightAngleVal, leftLenMulVal, rightLenMulVal;
let depth;
let depthVal;
let p;
let len = 100;
let y = 20, mul = 2;
function setup() {
  let canvas = createCanvas(1024, 995);
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  p = createP("Left Angle")
  leftAngle = createSlider(0, PI, 0.26, 0.01)
  p = createP("Right Angle")
  rightAngle = createSlider(0, PI, 0.26, 0.01)
  p = createP("Left Length Multiplier")
  leftLenMul = createSlider(0.25, 1, 0.91, 0.01);
  p = createP("Right Length Multiplier")
  rightLenMul = createSlider(0.25, 1, 0.8, 0.01);
  p = createP("Depth")
  depth = createSlider(1, 20, 13, 1);
  createTree();
}

function createTree() {
  leftAngleVal = leftAngle.value()
  rightAngleVal = rightAngle.value()
  leftLenMulVal = leftLenMul.value()
  rightLenMulVal = rightLenMul.value()
  depthVal = depth.value()

  tree = new Tree(leftAngleVal, rightAngleVal, leftLenMulVal, rightLenMulVal, depthVal, len)
}



function draw() {
  if (leftAngleVal != leftAngle.value() || rightAngleVal != rightAngle.value() || leftLenMulVal != leftLenMul.value() || rightLenMulVal != rightLenMul.value() || depthVal != depth.value()) {
    createTree();
  }

  background(0);
  noStroke();
  fill(255);

  text("Left Angle: " + leftAngleVal, width - 150, y);
  text("Right Left Angle: " + rightAngleVal, width - 150, y * mul);
  text("Left Length Multiplier: " + leftLenMulVal, width - 150, y * mul * 1.5);
  text("Right Length Multiplier: " + rightLenMulVal, width - 150, y * mul * 2);
  text("Depth: " + depthVal, width - 150, y * mul * 2.5);
  text("Current Depth: " + tree.currDepth, width - 150, y * mul * 3);
  tree.draw();
}