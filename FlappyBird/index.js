let bird;
let groundY;
let score = 0;
let wallsArr = [];
let gSlider;
let flyPowerSlider;
let gameOver = false;

function setup() {
  createCanvas(500, 700);
  bird = new Bird();
  groundY = height - bird.r * 2;
  bird.checkCollision();
  wallsArr.push(new Walls());
  gSlider = createSlider(0.1, 3.0, 0.6, 0.1);
  gSlider.input(changeG);
  flyPowerSlider = createSlider(10, 70, 20, 5);
  flyPowerSlider.input(changeFlyPower);
}

function changeG() {
  bird.g = gSlider.value();
  noLoop();
  restart();
}

function changeFlyPower() {
  bird.changeFlyPower = gSlider.value() * -1;
  noLoop();
  restart();
}

function drawGround() {
  fill(110, 38, 14);
  rect(0, groundY, width, height);
}

function keyPressed() {
  if (keyCode === 32) {
    bird.fly();
  }
}

function showScore() {
  push();
  fill(0, 0, 255, 140);
  noStroke();
  textSize(30);
  textAlign(CENTER);
  text(score, width / 2 - 14, 50);
  pop();
}

function endGame() {
  fill(255, 0, 0);
  gameOver = true;
  noStroke();
  textSize(60);
  text("Game Over", 100, height / 2);
  noLoop();
}

function restart() {
  bird.y = width / 2
  bird.v = 0;
  gameoOver = false;
  wallsArr = [];
  score = 0;
  wallsArr.push(new Walls());
  loop();
}

function mousePressed() {
  restart();
}

function draw() {
  background(200);
  drawGround();
  showScore();
  
  for (let i = wallsArr.length - 1; i >= 0; i--) {
    let walls = wallsArr[i];
    walls.show();
  }
  bird.show();
  
  if (bird.checkCollision(groundY)) {
    endGame();
  }

  for (let i = wallsArr.length - 1; i >= 0; i--) {
    let walls = wallsArr[i];
    if (walls.x + walls.width < 0) {
      wallsArr.splice(i, 1);
      score++
    }
    if (walls.x == width / 2) {
      wallsArr.push(new Walls());
    }
    if (
      walls.x - bird.r <= bird.x &&  // Check if the Bird is between
      walls.x + walls.w + bird.r  >= bird.x  // the walls horizontally
    ) {
      if (
        walls.h1 + bird.r >= bird.y || // Check if the bird is not 
        walls.y2 - bird.r <= bird.y // in the walls
      )
        endGame(); // Stop the game
      }
    walls.update();
  }
  
  bird.update();
}
