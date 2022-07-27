let w, h;
let N = 8;
let cols, rows;
let grid = new Array(cols);
let Q;
let board;
let current;
let row;
let sol = [];
let p;
let input;
let solP;


function changeN() {
  if (this.value()) {
    N = parseInt(this.value());
    start()
    loop()
  }
}
function start() {
  row = 0;
  Q = N;
  cols = rows = N;
  sol = []
  solP.html("")
  w = width / cols;
  h = height / rows;
  board = new Board(N, w, h);
  board.show();
  // current = board.spots[index];
  sol = [];
}


function setup() {
  p = createP("Enter N: ");
  input = createInput(`${N}`);
  solP = createP("");
  frameRate(5)
  createCanvas(800, 800);
  input.input(changeN)
  start()
}
function Index(i, j, N) {
  if (i < 0 || j < 0 || i > N - 1 || j > N - 1) return -1;
  return i + j * N;
}


function draw() {
  background(255);
  board.show();
  let safeCol = board.getNextsafeCol(row);
  if (safeCol == -1) {
    for (let i = row; i < N; i++) {
      for (let j = 0; j < N; j++) {
        board.spots[Index(i, j, N)].visited = false;
      }
    }
    row--;
    let rm = sol.pop();
    if(rm)
      rm.isQueen = false;
    else{
      solP.html("No Solution");
      noLoop();
    }
  } else {
    current = board.spots[Index(row, safeCol, N)];
    current.visited = true;
    current.isQueen = true;
    sol.push(current);
    row++;
  }

  if (sol.length == N) {
    solP.html("Solution Found");
    noLoop();
    background(255);
    board.show();
  }
}