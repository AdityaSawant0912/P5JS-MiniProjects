let cols = 4;
let rows = 4;
let w, h;
let board;


function setup() {
  let canvas = createCanvas(400, 400);
  // frameRate(5);a
  w = width / cols;
  h = height / rows;
  board = new Board(cols, rows, w, h);
  board.updateTile(floor(random(0, cols)), floor(random(0, rows)), 1);
  board.addTile();

}

function keyPressed() {
  //up
  if (keyIsDown(87)) {
    board.moveUp();
    board.addTile();
  }
  //right
  if (keyIsDown(68)) {
    board.moveRight();
    board.addTile();
  }
  //down
  if (keyIsDown(83)) {
    board.moveDown();
    board.addTile();
  }
  //left
  if (keyIsDown(65)) {
    board.moveLeft();
    board.addTile();
  }
}

function draw() {
  background(51);
  board.show();
}