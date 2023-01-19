let bird;
let groundY;
let wallsArr;
let gameOver;
let score;
let restarBtn;
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

function setup() {
  createCanvas(500, 700);
  bird = new Bird();
  groundY = height;
  wallsArr = [new Walls()];
  score = 0;
  
  restarBtn = createButton('Restart')
  restarBtn.mousePressed(() => {
    bird = new Bird()
    wallsArr = [new Walls()];
    score = 0;
    loop()
  })
}

function draw() {
  // Draw stuff
  background(200);
  showScore() 
  wallsArr.forEach(walls => {
    walls.show();
  });
  bird.show()
  
  
  // Check stuff
  if(bird.checkCollision(groundY))
    endGame()
  
  wallsArr.forEach(walls => {
    if(walls.x == width/2)
      wallsArr.push(new Walls) // add new wall
  
    if(walls.x < -walls.w)
      wallsArr.splice(wallsArr.indexOf(walls), 1) // remove wall
    
    if (walls.x + walls.w == floor(width / 4) || walls.x + walls.w == floor(width / 4) + 1)
      score++;
  });

  // update Stuff
  wallsArr.forEach(walls => {
    if (
      walls.x - bird.r <= bird.x &&  // Check if the Bird is between
      walls.x + walls.w + bird.r >= bird.x  // the walls horizontally
    ) {
      if (
        walls.h1 + bird.r >= bird.y || // Check if the bird is not 
        walls.y2 - bird.r <= bird.y // in the walls
      )
        endGame(); // Stop the game
      }
    walls.update();
  });
  bird.update();
}
