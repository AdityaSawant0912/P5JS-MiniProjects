const cols = 4;
const rows = 4;
let w;
let h;
let tiles = new Array(cols);
let emptyTile = new Array(2);
let score = new Array(4);
let tempTiles;
let solvedTiles = new Array(cols);
let lowest, lowestIndex;

class tile {
  constructor(id, i, j) {
    this.id = id;
    this.i = i;
    this.j = j;
    this.isEmpty = id == "X";
    if (this.isEmpty) {
      this.lastDirection = "";
      this.neghibors = [];
    }
  }
  show() {
    fill(color(255, 0, 0));
    textSize(20);
    noStroke();
    text(this.id, this.i * w + w / 2 - 9, this.j * w + h / 2 + 7);
  }

  swap(swapTile) {
    [
      tiles[this.i][this.j].i,
      tiles[this.i][this.j].j,
      tiles[swapTile.i][swapTile.j].i,
      tiles[swapTile.i][swapTile.j].j,
    ] = [
      tiles[swapTile.i][swapTile.j].i,
      tiles[swapTile.i][swapTile.j].j,
      tiles[this.i][this.j].i,
      tiles[this.i][this.j].j,
    ];
    [tiles[this.i][this.j], tiles[swapTile.i][swapTile.j]] = [
      tiles[swapTile.i][swapTile.j],
      tiles[this.i][this.j],
    ];
  }

  addNeighbors() {
    this.neghibors = [];
    if (this.j > 0 && this.lastDirection != "up") {
      this.neghibors.push(tiles[this.i][this.j - 1]);
    } else this.neghibors.push(null);
    if (this.j < rows - 1 && this.lastDirection != "down") {
      this.neghibors.push(tiles[this.i][this.j + 1]);
    } else this.neghibors.push(null);
    if (this.i < cols - 1 && this.lastDirection != "right") {
      this.neghibors.push(tiles[this.i + 1][this.j]);
    } else this.neghibors.push(null);
    if (this.i > 0 && this.lastDirection != "left") {
      this.neghibors.push(tiles[this.i - 1][this.j]);
    } else this.neghibors.push(null);
  }
}

function setup() {
  frameRate(1);
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;
  let state = [
    [2, 1, 3, 4],
    [5, 6,7,8],
    [9, 10,11, 12],
    [13, 14, 15, "X"],
  ];
  let solvedState = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, "X"],
  ];

  for (let i = 0; i < 4; i++) {
    tiles[i] = new Array(4);
    for (let j = 0; j < 4; j++) {
      tiles[i][j] = new tile(state[j][i], i, j);
    }
  }
  for (let i = 0; i < 4; i++) {
    solvedTiles[i] = new Array(4);
    for (let j = 0; j < 4; j++) {
      solvedTiles[i][j] = new tile(solvedState[j][i], i, j);
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (tiles[i][j].isEmpty) {
        tiles[i][j].addNeighbors();
        emptyTile = [tiles[i][j].i, tiles[i][j].j];
        break;
      }
    }
  }
  
  drawBoard();
}

function calculateScore(tiles) {
  let count = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (tiles[i][j].id != solvedTiles[i][j].id) {
        count++;
      }
    }
  }
  return count;
}

function drawBoard() {
  background(0);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      fill(255);
      stroke(2);
      rect(i * w, j * h, w, h);
      tiles[i][j].show();
    }
  }
}

function getLowest(arr) {
  let low = arr[0],
    lowIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (low > arr[i]) {
      low = arr[i];
      lowIndex = i;
    }
  }
  return [lowIndex, lowIndex];
}

function draw() {
  drawBoard();

  let neighbors = tiles[emptyTile[0]][emptyTile[1]].neghibors;
  for (let i = 0; i < neighbors.length; i++) {
    let neighbor = neighbors[i];
    if (neighbor == null) {
      score[i] = 10000;
    } else {
      console.log(neighbor.i, neighbor.j);
      let neighborIJ = [neighbor.i, neighbor.j];
      tiles[emptyTile[0]][emptyTile[1]].swap(
        tiles[neighborIJ[0]][neighborIJ[1]]
      );
      score[i] = calculateScore(tiles);
      tiles[emptyTile[0]][emptyTile[1]].swap(
        tiles[neighborIJ[0]][neighborIJ[1]]
      );
    }
  }
  drawBoard();

  [lowestIndex, lowest] = getLowest(score);
  console.log(tiles);
  let temp = [neighbors[lowestIndex].i, neighbors[lowestIndex].j];
  
  tiles[emptyTile[0]][emptyTile[1]].swap(
    tiles[neighbors[lowestIndex].i][neighbors[lowestIndex].j]
  );
  console.log(tiles);
  // console.log(neighbors[lowestIndex].i, neighbors[lowestIndex].j);
  // console.log(emptyTile[0],emptyTile[1],neighbors[lowestIndex].i,neighbors[lowestIndex].j);
  emptyTile = temp;
  
  console.log(emptyTile);
  if (lowestIndex == 0) tiles[emptyTile[0]][emptyTile[1]].lastDirection = "down";
  if (lowestIndex == 1)
    tiles[emptyTile[0]][emptyTile[1]].lastDirection = "up";
  if (lowestIndex == 2)
    tiles[emptyTile[0]][emptyTile[1]].lastDirection = "left";
  if (lowestIndex == 3)
    tiles[emptyTile[0]][emptyTile[1]].lastDirection = "right";
  tiles[emptyTile[0]][emptyTile[1]].addNeighbors();
  drawBoard();
  console.log(tiles);
  if (calculateScore(tiles) == 0) {
    console.log("Tiles Solved");
    drawBoard();
    noLoop();
  }

  // noLoop();
}
