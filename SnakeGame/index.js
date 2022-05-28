
let grid;
let dir = 'u';
let cooldown = 0;
let p
function setup() {
  createCanvas(800, 800);
  frameRate(10);
  grid = new Grid(20, 20);
  grid.addFood();
  grid.createSnake();
  
  p = createP("Score: 0");
  
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
  if(cooldown>0)cooldown = 0;
}
  // noLoop()
  
  
  
  
