let bird;
let groundY;
let score = 0;
let wallsArr = [];

function setup() {
  createCanvas(500, 700);
  bird = new Bird();
  groundY = height - bird.r * 2;
  bird.checkBoundary();
  wallsArr.push(new Walls());
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
  noStroke();
  textSize(60);
  text("Game Over", 100, height / 2);
  noLoop();
}

function mousePressed() {
  bird = new Bird();
  wallsArr = [];
  score = 0;
  wallsArr.push(new Walls());
  loop();
}

function draw() {
  background(200);
  drawGround();
  if (bird.checkBoundary(groundY)) {
    endGame();
  }

  for (let i = wallsArr.length - 1; i >= 0; i--) {
    let walls = wallsArr[i];
    walls.show();
    if (walls.x + walls.width < 0) {
      wallsArr.splice(i, 1);
      score++;
    }
    if (walls.x == width / 2) {
      wallsArr.push(new Walls());
    }
    if (
      walls.x - walls.width <= bird.x + bird.r &&
      walls.x + walls.width >= bird.x - bird.r
    ) {
      if (
        bird.y - bird.r <= walls.gapY ||
        bird.y + bird.r >= walls.gapY + walls.gapH
      ) {
        endGame();
      }
    }
    walls.update();
  }
  bird.show();
  showScore();
  bird.update();
}
