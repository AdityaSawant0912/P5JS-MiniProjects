let dude;
let blocks = [];
let rate = 60;
let collidedBlocks = [];
function setup() {
  frameRate(rate)
  let canvas = createCanvas(800, 800);
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  dude = new Character(400, 400);
  // blocks.push(new Block(400, 800))
  blocks.push(new Block(480, 650))
  blocks.push(new Block(480, 700))

  for (let i = 0; i < 10; i++) {
    blocks.push(new Block(i * 80 + 40, 800))
  }

}



function mousePressed() {
  if (rate == 60) {
    frameRate(2);
    rate = 2;
  } else {
    frameRate(60);
    rate = 60;
  }
}

function keyPressed() {

}


function draw() {
  background(204);


  if (keyIsDown(32)) {
    dude.jump = true;
  }
  if (keyIsDown(65)) {
    dude.goL = true;
  }
  if (keyIsDown(68)) {
    dude.goR = true;
  }


  dude.update();
  dude.windowCollisonCheck();

  for (let block of blocks) {
    block.draw();
  }
  for (let block of blocks) {
    if (block.detectCollision && dude.collision(block)) {
      block.dist = dist(dude.pos.x, dude.pos.y, block.pos.x, block.pos.y)
      collidedBlocks.push(block);
    }
  }
  for (let block of blocks) {
    if (block.detectCollision && dude.collision(block)) {
      block.dist = dist(dude.pos.x, dude.pos.y, block.pos.x, block.pos.y)
      collidedBlocks.push(block);
    }
  }

  collidedBlocks.sort((a, b) => a.dist - b.dist);
  // console.log(collidedBlocks);
  for (let block of collidedBlocks) {
    dude.resolveCollison(block);
  }
  collidedBlocks = [];
  dude.draw();
}

