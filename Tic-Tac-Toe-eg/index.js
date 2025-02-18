let player
let board
let third
let boundary

function drawX(i, j, alpha) {
  x = third / 2;
  y = third / 2;
  s = third / 3;
  push();
  noFill();
  stroke(255, alpha);
  strokeWeight(10);
  translate(x + j * third, y + i * third)
  line(s, -s, -s, s)
  line(-s, -s, s, s)
  pop();
}

function drawO(i, j, alpha) {
  let x = third / 2;
  let y = third / 2;
  push();
  noFill();
  stroke(255, alpha);
  strokeWeight(10);
  circle(x + j * third, y + i * third, third * 2 / 3)
  pop();
}

function getIJ(mX, mY) {
  // console.log(mX)
  if (0 < mX && mX < width && 0 < mY && mY < height) {
    x = floor(map(mX, 0, width, 0, 3))
    y = floor(map(mY, 0, height, 0, 3))
    return [x, y, false]
  } else {
    return [-1, -1, true]
  }
}

function win(n, type) {
  boundary = 30;
  push()
  stroke(255, 200);
  strokeWeight(5);
  if (type == 1) {
    x = third / 2 + n * third
    line(x, boundary, x, height - boundary)

  } else if (type == 2) {
    y = third / 2 + n * third
    line(boundary, y, width - boundary, y)

  } else if (type == 3) {
    line(boundary, boundary, width - boundary, height - boundary)
  } else if (type == 4) {
    line(width - boundary, boundary, boundary, height - boundary)
  }
  pop()
  noLoop();
}


function check() {
  let b = board;
  for (let j = 0; j < board.length; j++) {
    if ((b[0][j] == b[1][j] == b[2][j]) && b[2][j] != 0) {
      win(j, 1); // win horizontal
    }
  }
  for (let i = 0; i < board.length; i++) {
    if (b[i][0] == b[i][1] == b[i][2] && b[i][2] != 0) {
      win(i, 2); // win vertical
    }
  }
  if (b[0][0] == b[1][1] == b[2][2] && b[2][2] != 0) {
    win(-1, 3) // win diagonal tl to br
  }
  if (b[0][2] == b[1][1] == b[2][0] && b[0][2] != 0) {
    win(-1, 4) // win diagonal tr to bl
  }
}


function setup() {
  let canvas = createCanvas(400, 400);
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  player = 1;
  board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  third = width / 3; // as width == height
  boundary = 10
}

function draw() {
  background(51);
  // draw lines
  stroke(255, 200);
  strokeWeight(5);
  line(third, 0 + boundary, third, height - boundary);
  line(2 * third, 0 + boundary, 2 * third, height - boundary);
  line(0 + boundary, height / 3, width - boundary, height / 3);
  line(0 + boundary, 2 * height / 3, width - boundary, 2 * height / 3);

  // Symbols
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == 1) {
        // draw X
        drawX(i, j, 255)

      } else if (board[i][j] == -1) {
        // draw O
        drawO(i, j, 255)
      }
    }
  }

  check();

  [y1, x1, err] = getIJ(mouseX, mouseY)
  if (!err) {
    if (player == 1 && board[x1][y1] == 0) {
      drawX(x1, y1, 150)
    }
    else if (player == -1 && board[x1][y1] == 0) {
      drawO(x1, y1, 150)
    }
    if (mouseIsPressed && mouseButton == LEFT && board[x1][y1] == 0) {
      board[x1][y1] = player
      player = -player
    }

  }

}
  // push();
  // pop();