let a, b, d, dx, dy, H;

function setup() {
  createCanvas(400, 400);
  background(0);
}

atom = function(x, y, c){
  fill(c);
  rect(x, y, 3, 3)
}

function draw() {
  // background(255)
  for (let y = 1; y < height; y++) {
    for (let x = 1; x < width; x++) {
      dx = (x - width / 2) / (width * 100) - 0.233;
      dy = (y - height / 2) / (height * 100) - 0.655;
      a = dx;
      b = dy;
      
      for (let t = 1; t < 200; t++) {
        d = (a * a) - (b * b) + dx;
        b = 2 * (a * b) + dy;
        a = d;
        H = d > 200;
        if(H){
          fill(t*3, t, t*0.5);
          rect(x, y, 3, 3)
          break;
        }
      }
    }
  }
  
  noLoop()
}