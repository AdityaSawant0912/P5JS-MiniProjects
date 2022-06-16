let i;
let board;
let images

function preload(){
  images = {
			br: loadImage("peices/br.png"),
			bn: loadImage("peices/bn.png"),
			bb: loadImage("peices/bb.png"),
			bq: loadImage("peices/bq.png"),
			bk: loadImage("peices/bk.png"),
			bp: loadImage("peices/bp.png"),
			
			wR: loadImage("peices/wR.png"),
			wN: loadImage("peices/wN.png"),
			wB: loadImage("peices/wB.png"),
			wQ: loadImage("peices/wQ.png"),
			wK: loadImage("peices/wK.png"),
			wP: loadImage("peices/wP.png"),
		}
}

function setup() {
  createCanvas(480, 480);
  board = new Board(images);
  i = loadImage("peices/wN.png")
}

function mousePressed() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    board.select(floor(mouseX / ( width/ 8) ), floor(mouseY / ( height / 8)));
  }
}

function draw() {
  // background(247,160,77); //wood
  // background(255);
  background(0);
  board.show();
  // image(i, 0, 0);
  // noLoop()
  // console.log(floor(mouseX / ( width/ 8) ), floor(mouseY / ( height / 8)));
}