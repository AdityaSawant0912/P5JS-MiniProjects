let ig
let PX_WIDTH
let currLevel;
let levelNo = 0;
let SKY;
let DEALY;
let Levels = {
  level0: {
    width: 8,
    height: 9,
    goals: 7,
    map:[ ["s", "s", "#", "#", "#", "#", "#", "s"],
          ["#", "#", "#", " ", " ", " ", "#", "s"],
          ["#", "o", " p", " b", " ", " ", "#", "s"], 
          ["#", "#", "#", " ", " b", "o", "#", "s"], 
          ["#", "o", "#", "#", " b", " ", "#", "s"], 
          ["#", " ", "#", " ", "o", " ", "#", "#"], 
          ["#", " b", " ", "ob", " b", " b", "o", "#"], 
          ["#", " ", " ", " ", "o", " ", " ", "#"], 
          ["#", "#", "#", "#", "#", "#", "#", "#"]],
    player: {
      x: 2,
      y: 2,
    }
  }
}
function setup() {
  DELAY = 10;
  SKY = color(49, 150, 205);
  createCanvas(900, 900);
  currLevel = new Level(300, 300, Levels[`level${levelNo}`])
  console.table(currLevel.map);
}

function preload() {
  PX_WIDTH = 32;
  ig = loadImage("images/GreenBoxPlainTriangleInPlace.png");
}

function drawText(){
  push();
  textAlign(CENTER);
  textSize(100);
  fill(255);
  text('SOKOBAN', 450, 100);
  pop();
  push();
  textAlign(CENTER);
  textSize(50);
  fill(255);
  text(`Moves: ${currLevel.moves}`, 700, 175);
  text(`Box Moves: ${currLevel.boxMoves}`, 700, 225);
  text(`Completed: ${currLevel.completed}`, 700, 275);
  if(currLevel.win){
    textSize(100);
    fill(255);
    text('Welldone', 450, 700);
  }
  pop();
}

function draw() {
  background(SKY);
  drawText();
  currLevel.draw();
  currLevel.checkWin()
  if(frameCount % DELAY == 0){
    currLevel.update()
  }
  
}