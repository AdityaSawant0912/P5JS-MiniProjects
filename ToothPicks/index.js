
let picks;
let previous;

let minX;
let maxX;

function setup() {
  createCanvas(400, 400);
  minX = -width / 2;
  maxX = width / 2;    
  picks = [];
  picks.push(new toothPick(0, 0, 1));
  // noLoop();
  previous = picks;
  frameRate(5);
}

function mousePressed() {
  // console.log("mousePressed");
  redraw(); 
  
  
}


function draw() {
  console.log(picks.length);
  
  if(picks.length > 18900)
    noLoop();
  let next = [];
  background(0);
  let factor = width / (maxX - minX);
  translate(width / 2, height / 2);
  scale(factor);
  for (const t of picks) {
    t.show(255, 255, 255, 255, factor);
    minX = min(minX, t.ax);
    maxX = max(minX, t.bx);
  }
  for(let t of previous ){
    let nextA = t.createA(picks);
    let nextB = t.createB(picks);
    if(nextA){
      next.push(nextA);
      nextA.show(255, 0, 0, 255, factor);
    }
    if(nextB){
      next.push(nextB);
      nextB.show(255, 0, 0, 255, factor);
    }
    
  };
  previous = next;
  picks.push(...next)
}