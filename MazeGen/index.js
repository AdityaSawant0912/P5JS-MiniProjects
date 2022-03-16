let cols, rows;
let w = 20;

let grid = [];
let current;
let stack = [];
let solveStack = [];
let SolvedPath = [];
let isCompleted = false;
let start, end;
let done = false;
function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function setup() {
  createCanvas(400, 400);
  // frameRate(5);
  cols = floor(width / w);
  rows = floor(height / w);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  start = grid[0];
  end = grid[grid.length - 1];
  current = start;
  SolvedPath.push(start);
}
function doframe() {
  frameRate(5);
}

function draw() {
  background(51);
  for (let cell of grid) {
    cell.show();
  }
  if (!isCompleted) {
    current.visited = true;
    current.highlight(color(0, 0, 255, 100));
    let next = current.checkNeighbors();
    if (next) {
      next.visited = true;
      stack.push(current);
      removeWalls(current, next);
      current = next;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else if (stack.length === 0) {
      console.log("completed");
      isCompleted = true;
      current = start;
      // noLoop();
    }
  } else {
    // if (!done) doframe();
    if (current === end) {
      console.log("Maze Solved");
      stroke(0, 200, 255);
      strokeWeight(w / 4);
      noFill();
      beginShape();
      for (let cell of SolvedPath) {
        // cell.highlight(color(0, 255, 0, 100));
        vertex(cell.i * w + w / 2, cell.j * w + w / 2);
      }
      endShape();
      noLoop();
    }
    current.visitedSolver = true;
    // SolvedPath.push(current);
    current.highlight(color(0, 0, 255, 100));
    let availableNext = current.getNeighbors(end);
    if (availableNext) {
      solveStack.push(current);
      current = availableNext;
      SolvedPath.push(current);
    } else if (solveStack.length > 0) {
      SolvedPath.pop();
      current = solveStack.pop();
    }
    push();
    stroke(0, 200, 255);
    strokeWeight(w / 4);
    noFill();
    beginShape();
    for (let cell of solveStack) {
      // cell.highlight(color(0, 255, 0, 100));
      vertex(cell.i * w + w / 2, cell.j * w + w / 2);
    }
    endShape();
    pop();
  }
}
