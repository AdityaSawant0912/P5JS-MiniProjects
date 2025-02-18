
let board
let rad
let innerWidth;
let widthDiff;
let picked, droped;
let state;
let gap;
let num;
function setup() {
  state = 'idle';
  num = -1;
  picked = null;
  droped = null;
  let canvas = createCanvas(800, 800);
  board = []
  for (let i = 0; i < 7; i++) {
    board.push([])
    for (let j = 0; j < 7; j++) {
      num++;
      board[i][j] = 1;
    }
  }
  innerWidth = width * 0.95
  widthDiff = width - innerWidth;
  gap = (width - (2 * widthDiff)) / board.length
  rad = innerWidth / board.length

  // board = new Array(7).fill(new Array(7).fill(1));

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if ((i < 2 || i > 4) && (j < 2 || j > 4)) {
        num--;
        board[i][j] = -1;
      }
    }
  }

  board[3][3] = 0;
  // console.table(board); 
}

function drawSetup() {
  push()
  noStroke()
  fill(175, 139, 117)
  circle(width / 2, height / 2, width)
  pop()
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if ((i > 1 && i < 5) || (j > 1 && j < 5)) {
        push()
        translate(i * gap + widthDiff + gap / 2, j * gap + widthDiff + gap / 2)
        noStroke();

        if (board[i][j] == 1) {
          if (picked) {
            if (!(picked[0] == i && picked[1] == j)) {
              fill(6, 85, 1);
              circle(0, 0, rad * 0.90)
            } else {
              fill(210, 180, 150);
              circle(0, 0, rad * 0.80) // base
            }
          } else {
            fill(6, 85, 1);
            circle(0, 0, rad * 0.90)
          }
        } else {
          fill(210, 180, 150);
          circle(0, 0, rad * 0.80) // base
        }
        pop()
      }
    }
  }
  push()
  if (picked) {
    fill(6, 85, 1);
    stroke(1)
    circle(mouseX, mouseY, rad * 0.90)
  }
  pop()


}

function getCord(x, y) {
  if (x >= widthDiff && x <= width - widthDiff && y >= widthDiff && y <= width - widthDiff) {
    return [floor(map(x, widthDiff, width - widthDiff, 0, 7)), floor(map(y, widthDiff, width - widthDiff, 0, 7))]
  }
}


function isLegal(px, py, dx, dy) {

  if (((Math.abs(px - dx) == 2 && py == dy) || (Math.abs(py - dy) == 2 && px == dx)) && board[(px + dx) / 2][(py + dy) / 2] == 1) {
    board[(px + dx) / 2][(py + dy) / 2] = 0
    return true;
  }

  return false;
}


function pick() {
  picked = getCord(mouseX, mouseY)
  console.log(picked);
  if (board[picked[0]][picked[1]] == 1) {
    return true;
  }
  picked = null;
  return false;
}

function place() {
  droped = getCord(mouseX, mouseY)

  if (picked[0] == droped[0] && picked[1] == droped[1]) {
    picked = null;
    droped = null;
    return true;
  }

  if ((board[droped[0]][droped[1]] == 0 && isLegal(picked[0], picked[1], droped[0], droped[1]))) {
    board[droped[0]][droped[1]] = 1;
    board[picked[0]][picked[1]] = 0;
    picked = null;
    droped = null;
    num--;
    return true;
  }
  droped = null;
  return false;
}


function mouseClicked() {
  if (state == 'idle' && !picked && pick()) {
    console.log("here");
    state = 'pick';
  }
  else if (state == 'pick' && place()) {
    state = 'idle';
  }
  console.log(state);
  return false;

}

function graph() {
  strokeWeight(1);
  noFill()
  fill(0);
  for (let i = 0; i < 8; i++) {
    line(widthDiff + i * (width - 2 * widthDiff) / 7, widthDiff, widthDiff + i * (width - 2 * widthDiff) / 7, width - widthDiff)
    line(widthDiff, widthDiff + i * (width - 2 * widthDiff) / 7, width - widthDiff, widthDiff + i * (width - 2 * widthDiff) / 7)
  }
}

function count() {
  textAlign(CENTER)
  textSize(30)
  fill(255)
  text(`Marbles : ${num}`, 110, 50)
}

function draw() {
  background(51);
  drawSetup();
  count();
//   graph()
} 