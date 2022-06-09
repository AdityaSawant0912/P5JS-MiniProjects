let w;
let N = 10;
let B = N * 2;
let grid = new Array(N);
let flag = false;
let first = true;

function setup() {
  createCanvas(400, 400);
  w = width / N;
  for (let row = 0; row < N; row++) {
    grid[row] = new Array(N);
    for (let col = 0; col < N; col++) {
      grid[row][col] = new Cell(row, col);
    }
  }
  addBombs();
}

function refresh(){
  loop()
  setup();
} 

function toggleFlag(){
  flag = !flag;
}

function mousePressed() {
  let x = floor(mouseX / w);
  let y = floor(mouseY / w);
  if (mouseButton == LEFT && x < N && y < N && flag) {
    grid[x][y].flag = !grid[x][y].flag;
  }
}

function addBombs() {
  for (let i = 0; i < B; i++) {
    let x = Math.floor(random(0, N));
    let y = Math.floor(random(0, N));
    if (grid[x][y].bomb) i--;
    else grid[x][y].bomb = true;
  }
}

function showGrid() {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      grid[col][row].show();
    }
  }
}

function showBombs() {
  for(let col of grid){
    for (let cell of col){
      if (cell.bomb) {
        fill(0);
        ellipse(cell.x * w + w / 2, cell.y * w + w / 2, w / 3);
      }
    }
  }
}

function checkIfDone(){
  let c = 0
  for(let col of grid){
    for (let cell of col){
      if (cell.hidden) c++;
    }
  }
  if(c == B) {
    push();
    textAlign(CENTER, CENTER);
    fill(0, 255, 0, 100);
    textSize(w * 2);
    text("You Win", width / 2, height / 2);
    pop();
    noLoop();
  }
  // console.log(c);
}

function switchB(x, y) {
  let nx = Math.floor(random(0, N));
  let ny = Math.floor(random(0, N));
  if (nx == x && ny == y) return switchB(x, y);
  else if (grid[nx][ny].bomb) return switchB(x, y);
  else grid[nx][ny].bomb = true;

}
function draw() {
  background(0);
  showGrid();
  if (mouseIsPressed === true) {
    let x = floor(mouseX / w);
    let y = floor(mouseY / w);
    
    if (mouseButton == LEFT && x < N && y < N && !flag) {
      if (grid[x][y].bomb) {
        
        if (first) {
          grid[x][y].bomb = false;
          switchB(x, y)
          grid[x][y].pop()
          first = false;
        }
        else {
          push();
          textAlign(CENTER, CENTER);
          fill(255, 0, 0, 150);
          textSize(w * 2);
          text("You Lose", width / 2, height / 2);
          showBombs();
          pop();
          noLoop();
        }
      } else{
        grid[x][y].pop();
        first = false;
      } 
    }
  }
  if(flag){
    let x = floor(mouseX / w);
    let y = floor(mouseY / w);
    push();
    fill(255, 0, 0);
    ellipse(x * w + w / 2, y * w + w / 2, w / 3);
    pop();
  }
  checkIfDone();
}
