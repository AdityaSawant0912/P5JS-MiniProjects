let N = 3;
let tower;
let slider;
let maxMoves;
let resetB;
let solveB;

// slover
let isSolving = false;
let dir;
let smallest = true;
let small = 0;
let a, b;
let pa
let pb

function setup() {
  let canvas = createCanvas(900, 600);
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  frameRate(60);
  tower = new Tower(N);
  slider = createSlider(1, 7, 3);
  resetB = createButton('Reset')
  solveB = createButton('Solve')
  resetB.mousePressed(restart)
  solveB.mousePressed(solveInit)
  maxMoves = createP(`Change N using Slider <br>Minimum No. Moves Required: 2<sup>n</sup> - 1 ie.: ${Math.pow(2, N) - 1}`)
  maxMoves.style('font-size', '30px')
  slider.style('display', 'block');
  slider.style('margin', 'auto');
  resetB.style('margin', 'auto');
  resetB.style('display', 'block');
  solveB.style('margin', 'auto');
  solveB.style('display', 'block');
  maxMoves.style('margin', 'auto');
  maxMoves.style('display', 'block');
  maxMoves.style('text-align', 'center');
}


function restart() {
  noLoop();
  frameRate(60);
  tower = new Tower(slider.value());
  N = slider.value();
  small = 0;
  smallest = true;
  isSolving = false;
  dir = null;
  a = null;
  b = null;
  pa = null;
  pb = null;
  maxMoves.html(`Change N using Slider <br>Minimum No. Moves Required: 2<sup>n</sup> - 1 ie.: ${Math.pow(2, N) - 1}`)
  loop();
}

function mousePressed() {
  let mx = mouseX;
  let my = mouseY;
  if ((mx >= 0 && mx <= width) && (my >= 0 && my <= height) && !tower.gameOver) {
    if (tower.holding != null)
      tower.place(mx);
    else
      tower.hold(mx);
  }
}

function mouseReleased() {
  let mx = mouseX;
  let my = mouseY;
  if ((mx >= 0 && mx <= width) && (my >= 0 && my <= height) && !tower.gameOver) {
    if (tower.holding != null)
      tower.place(mx);
  }
}


function draw() {
  background(75, 53, 53);
  if (N != slider.value())
    restart();
  tower.draw();
  if (isSolving) makeMove();

  if (tower.gameOver) isSolving = false;
}

function solveInit() {
  restart();
  frameRate(1);
  if (N % 2 == 0)
    dir = 1
  else dir = -1;
  isSolving = true;
}

function getMX(m) {
  if (m == 0)
    return 0;
  else if (m == 1)
    return width / 2;
  else if (m == 2)
    return width;
}

function makeMove() {
  if (!tower.gameOver) {
    if (smallest) {
      tower.hold(getMX(small))

      if (dir > 0) {
        small++;
        if (small == 3)
          small = 0;
      }
      else if (dir < 0) {
        small--;
        if (small == -1)
          small = 2;

      }
      tower.place(getMX(small))

      smallest = false;
    }
    else {
      if (small == 0) {
        a = 1;
        b = 2;
      }
      else if (small == 1) {
        a = 0;
        b = 2;
      }
      else if (small == 2) {
        a = 0;
        b = 1;
      }
      if (tower.pegs[a].length > 0) {
        pa = tower.pegs[a].pop()
        tower.pegs[a].push(pa)
      } else pa = 0;
      if (tower.pegs[b].length > 0) {
        pb = tower.pegs[b].pop()
        tower.pegs[b].push(pb)
      } else pb = 0;

      if (pa == 0) {
        tower.hold(getMX(b))
        tower.place(getMX(a))
      } else if (pb == 0) {
        tower.hold(getMX(a))
        tower.place(getMX(b))
      }
      else if (pa < pb) {
        tower.hold(getMX(a))
        tower.place(getMX(b))
      } else {
        tower.hold(getMX(b))
        tower.place(getMX(a))
      }

      smallest = true;
    }
  }
}




