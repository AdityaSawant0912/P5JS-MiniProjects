let board;
let COLS = 7;
let ROWS = 6;
let w 
let h


function setup() {
  createCanvas(800, 800);
  board = new Board(COLS, ROWS);
  w = width / (COLS);
  h = height / (ROWS + 1);
}

function refresh(){
  loop()
  setup();
}

function mousePressed() {
  let mx = mouseX;
  if ((mx >= 0 || mx <= width) && board.isDropable) {
    let nextX = floor(mx / (width / COLS));
    board.drop(nextX);
  }
}


function draw() {
  background(51);
  board.draw();
  if(frameCount % 5 == 0 && !board.isDropable) {
    board.dropUpdate();
    // console.log("dropping");
  }
  if(board.isDropable) {
    board.checkWinner()
    if (board.winner != 0) {
      console.log("winner " + board.winner);
      push();
      strokeWeight(10);
      stroke(200,0,255);
      if(board.winDir == "u"){
        console.log(board.winPos);
        line((board.winPos[0] * w + w / 2), (board.winPos[1] * h + h / 2) + h, (board.winPos[0] * w + w / 2), ((board.winPos[1] - 3) * h + h / 2) + h);
      }
      if(board.winDir == "r"){
        console.log(board.winPos);
        line((board.winPos[0] * w + w / 2), (board.winPos[1] * h + h / 2) + h, ((board.winPos[0] + 3) * w + w / 2), (board.winPos[1] * h + h / 2) + h);
      }
      if(board.winDir == "ur"){
        console.log(board.winPos);
        line((board.winPos[0] * w + w / 2), (board.winPos[1] * h + h / 2) + h, ((board.winPos[0] + 3) * w + w / 2), ((board.winPos[1] - 3) * h + h / 2) + h);
      }
      if(board.winDir == "ul"){
        console.log(board.winPos);
        line((board.winPos[0] * w + w / 2), (board.winPos[1] * h + h / 2) + h, ((board.winPos[0] - 3) * w + w / 2), ((board.winPos[1] - 3)* h + h / 2) + h);
      }
      pop()
      push()
      textAlign(CENTER, CENTER);
      fill(0, 255, 0, 200);
      textSize(w * 1.5);
      if (board.winner == 1)
        text("Red Wins", width / 2, height / 2);
      else {
        textSize(w * 1.2);
        text("Yellow Wins", width / 2, height / 2);
      }
      pop();
      
      noLoop();
    }
  }
  
}