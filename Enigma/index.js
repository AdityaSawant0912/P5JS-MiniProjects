let inputs, bulbs, plugBoard, rotors;
let inputOut, plugBoardOut, rotorOut, rotorIn;
let bulbIn = null;

const IC = ['EKMFLGDQVZNTOWYHXUSPAIBRCJ', 'Q'];
const IIC = ['AJDKSIRUXBLHWTMCQGZNPYFVOE', 'E'];
const IIIC = ['BDFHJLCPRTXVZNYEIWGAKMUSQO', 'V'];


function setup() {
  let canvas = createCanvas(800, 800);
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  inputs = new Inputs();
  bulbs = new Bulbs();
  plugBoard = new PlugBoard();
  rotors = new RotorBody(IC, IIC, IIIC);
  noLoop()
}

function mousePressed() {
  draw();
}

function mouseReleased() {
  if (inputs.buttonPressed != null)
    inputs.buttonPressed = null;
  if (bulbs.bulbLit != null)
    bulbs.bulbLit = null;

}

function keyPressed() {
  if (keyCode == 8 && plugBoard.connections.length > 1) {
    plugBoard.connections.pop();
    plugBoard.connections.pop();
    plugBoard.connected.pop();
    plugBoard.connected.pop();
  }
  draw()
}

function draw() {
  background(200);
  inputs.draw();
  plugBoard.draw();
  inputOut = inputs.buttonPressed
  rotorIn = inputOut
  plugBoard.connections.forEach(con => {
    if (con[0] == inputOut) {
      rotorIn = con[1]
    }
  });
  rotors.update();
  rotors.draw(rotorIn);
  bulbIn = rotors.out;
  // bulbIn = inputOut;

  plugBoard.connections.forEach(con => {
    if (con[0] == rotors.out) {
      bulbIn = con[1]
    }
  });

  bulbs.bulbLit = bulbIn
  bulbs.draw();




  line(0, height / 4, width, height / 4)
  line(0, 2 * height / 4, width, 2 * height / 4)
  line(0, 3 * height / 4, width, 3 * height / 4)

}