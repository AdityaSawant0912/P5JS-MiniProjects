let boundary
let third, x, y, radius;
let b, err, x1, y1;
let board, player;
let xWins = 0, oWins = 0, draws = 0; 
let lastWin = []
newRound = true
function win(n, type) {
  boundary = 30;
  push()
  stroke(255, 200);
  strokeWeight(5);
  if (type == 1) {
    x = third / 4 + n * third/2
    line(x, boundary, x, height - boundary)

  } else if (type == 2) {
    y = third / 4 + n * third/2
    line(boundary, y, (width/2) - boundary, y)

  } else if (type == 3) {
    line(boundary, boundary, (width/2) - boundary, height - boundary)
  } else if (type == 4) {
    line((width/2) - boundary, boundary, boundary, height - boundary)
  }
  pop()
  newRound = false
  // noLoop();
}

function check() {
  let b = board;
  for (let i = 0; i < b.length; i++) {
    if (b[i][0] == b[i][1] && b[i][1] == b[i][2] && b[i][2] != 0) {
      if(b[i][0] == 1)
        xWins += 1
      else
        oWins += 1
      win(i, 2);
      lastWin = [i, 2]
      return
    }
  }
  for (let j = 0; j < b.length; j++) {
    if (b[0][j] == b[1][j] && b[1][j] == b[2][j] && b[2][j] != 0) {
      if(b[0][j] == 1)
        xWins += 1
      else
        oWins += 1
      win(j, 1);
      lastWin = [j, 1]
      return
    }
  }
  if (b[0][0] == b[1][1] && b[1][1] == b[2][2] && b[2][2] != 0) {
    if(b[0][0] == 1)
        xWins += 1
      else
        oWins += 1
    win(-1, 3)
    lastWin = [-1, 3]
    return} else
   if (b[0][2] == b[1][1] && b[1][1] == b[2][0] && b[0][2] != 0) {
    if(b[0][2] == 1)
        xWins += 1
      else
        oWins += 1
    win(-1, 4)
    lastWin = [-1, 4]
    return
  }
  let draw = true;
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < b.length; j++) {
      if (b[i][j] == 0) {
        draw = false;
      }
    }
  }
  if(draw){
    draws += 1
    newRound = false
  }
  
}

function drawX(i, j, alpha) {
  x = third / 2;
  y = third / 2;
  push();
  noFill();
  stroke(255, alpha);
  strokeWeight(20);
  translate(x + j * third, y + i * third)
  line(third / 3, - third / 3, - third / 3, third / 3)
  line(- third / 3, - third / 3, third / 3, third / 3)
  pop();
}
function drawDash(i, j, alpha) {
  x = third / 2;
  y = third / 2;
  push();
  noFill();
  stroke(255, alpha);
  strokeWeight(20);
  translate(x + j * third, y + i * third)
  line(third / 3, 0, - third / 3, 0 )
  pop();
}
function drawScore(i, j, score) {
  x = third / 2;
  y = third / 2;
  push();
  fill(255);
  stroke(255, alpha);
  translate(x + j * third, y + i * third)
  textAlign(CENTER)
  textSize(250)
  text(`${score}`,0,0)
  pop();
}

function drawO(i, j, alpha) {
  x = third / 2;
  y = third / 2;
  push();
  noFill();
  stroke(255, alpha);
  strokeWeight(16);
  circle(x + j * third, y + i * third, third * 2 / 3)
  pop();
}

function getIJ(mX, mY) {
  // console.log(mX)
  if (0 < mX && mX < width/2 && 0 < mY && mY < height) {
    x = floor(map(mX, 0, width/2, 0, 3))
    y = floor(map(mY, 0, height, 0, 3))
    return [x, y, false]
  } else {
    return [-1, -1, true]
  }
}

function restart(){
  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  player = 1;
  xWins = 0
  draws= 0
  oWins = 0
}

function keyPressed() {
  if (keyCode === 32) {
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    player = 1;
    newRound = true;
  }
}


function setup() {
  createCanvas(800, 400);
  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  player = 1;
  third = width / 3;
  radius = 90;
  boundary = 10
}

function draw() {
  background(51);
  // draw lines
  push();
  scale(0.5, 1)
  stroke(255, 200);
  strokeWeight(10);
  line(third, 0 + boundary, third, height - boundary);
  line(2 * third, 0 + boundary, 2 * third, height - boundary);
  strokeWeight(5);
  line(0 + boundary, height / 3, width - boundary, height / 3);
  line(0 + boundary, 2 * height / 3, width - boundary, 2 * height / 3);
  pop();
  
  // Divider
  stroke(255, 200);
  strokeWeight(5);
  line(width / 2 + boundary, 0 + boundary, width / 2 + boundary, height - boundary);
  
  // Scoring
  line(width / 2 + 2 * boundary, height / 3, width - boundary, height / 3);
  line(width / 2 + 2 * boundary, 2 * height / 3, width - boundary, 2 * height / 3);
  
  // Draw X and O
  push()
  scale(0.5)
  translate(100,0)
  drawX(0,3)
  drawDash(1,3)
  drawO(2,3)
  pop()
  if(!newRound )
    win(lastWin[0], lastWin[1])
  
  // Draw Score
  
  push()
  scale(0.5)
  translate(150,100)
  drawScore(0,4, xWins)
  drawScore(1,4, draws)
  drawScore(2,4, oWins)
  pop()
  
  // Symbols
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 1) {
        // draw X
        push()
        scale(0.5, 0.5)
        drawX(i, j, 255)
        pop()

      } else if (board[i][j] == -1) {
        // draw O
        push()
        scale(0.5, 0.5)
        drawO(i, j, 255)
        pop()
      }
    }
  }


  [y1, x1, err] = getIJ(mouseX, mouseY)
  if (!err) {
    if (player == 1 && board[x1][y1] == 0) {
      push()
      scale(0.5, 0.5)
      drawX(x1, y1, 150)
      pop()
    }
    else if (player == -1 && board[x1][y1] == 0) {
      push()
      scale(0.5, 0.5)
      drawO(x1, y1, 150)
      pop()
    }
    if (mouseIsPressed && mouseButton == LEFT && board[x1][y1] == 0 && newRound) {
      board[x1][y1] = player
      player = -player
      check();
    }

  }

}