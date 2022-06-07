
let grid;
let dir = 'u';
let cooldown = 0;
let p
let speed = 8;
let bestScore = 0;
let bestP;
function setup() {
  createCanvas(800, 800);
  frameRate(speed);
  grid = new Grid(20, 20);
  grid.addFood();
  grid.createSnake();
  
  bestScore = getItem("SnakeGame-best");
  p = createP("Score: 0");
  if(bestScore == null) bestScore = 0;
  bestP = createP(`Best Score: ${bestScore}`);
  
}


function keyPressed() {
  if (cooldown > 0) return;
  else {
    if (key == 'w' && dir == 'd') dir = 'd';
    else if (key == 's' && dir == 'u') dir = 'u';
    else if (key == 'd' && dir == 'l') dir = 'l';
    else if (key == 'a' && dir == 'r') dir = 'r';
    else if (key == 'w') dir = 'u';
    else if (key == 's') dir = 'd';
    else if (key == 'd') dir = 'r';
    else if (key == 'a') dir = 'l';
    cooldown++;
  }
}

function mousePressed() {
  grid.update(dir);
  grid.moveSnake();
}

function draw() {
  background(51);
  grid.update(dir);
  grid.moveSnake();
  grid.show()
  p.html("Score: " + grid.score);
  if (grid.score > bestScore) {
    bestP.html(`Best Score: ${grid.score}`);
    storeItem("SnakeGame-best", grid.score);
  }
  else  
    bestP.html(`Best Score: ${bestScore}`);
  if(grid.score > 0 && grid.score % 15 == 0) 
    speed++;
  if(cooldown>0)cooldown = 0;
}
  // noLoop()
  
  
  
  
