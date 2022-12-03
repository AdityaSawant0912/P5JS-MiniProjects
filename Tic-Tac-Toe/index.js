let board

function setup() {
  createCanvas(400, 400);
  board = new Board(); 
}

function draw() {
  background(51);
  board.draw();
  board.update();
  // board.win(0, 2)
}