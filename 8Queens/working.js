let w, h;
let cols = rows = 8;
let grid = new Array(cols);

class Spot {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.isQueen = false;
    this.col = color(255);

    this.show = function (col) {
      fill(col);
      this.col = col;
      noStroke();
      rect(this.i * w, this.j * h, w, h);
    };
  }
}

function isSafe(row, col) {
  for (let i = 0; i < col; i++) {
    if (grid[i][row].isQueen) return false;
  }
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (grid[j][i].isQueen) return false;
  }
  for (let i = row, j = col; i < cols && j >= 0; i++, j--) {
    if (grid[j][i].isQueen) return false;
  }
  return true;
}

function solveNQueens(col) {
  if (col >= cols) return true;
  for (let row = 0; row < rows; row++) {
    if (isSafe(row, col)) {
      grid[col][row].isQueen = true;
      erase();
      rect(0, 0, width, height);
      noErase();
      drawBoard();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j].isQueen) {
            fill(color(255, 0, 0));
            text(
              "Q",
              grid[i][j].i * w + w / 2 - 5,
              grid[i][j].j * h + h / 2 + 5
            );
          } else {
            fill(grid[i][j].col);
            noStroke();
            rect(this.i * w, this.j * h, w, h);
          }
        }
      }
      if (solveNQueens(col + 1)) return true;
      grid[col][row].isQueen = false;
    }
  }
}

function setup() {
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
}

function drawBoard() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          grid[i][j].show(color(255));
        } else {
          grid[i][j].show(color(0));
        }
      } else {
        if (j % 2 == 0) {
          grid[i][j].show(color(0));
        } else {
          grid[i][j].show(color(255));
        }
      }
    }
  }
}

function draw() {
  background(255);

  drawBoard();

  if (solveNQueens(0)) console.log("done");
  else console.log("no solution");
  noLoop();
}
