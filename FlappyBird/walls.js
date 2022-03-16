class Walls {
  constructor() {
    this.width = 20;
    this.x = width + this.width;
    // this.x = width / 2;   
    this.gapY = random(height * 0.2, height * 0.65 );
    this.gapY -= this.gapY % 10 ;
    this.gapH = 150
  }

  show() {
    fill(20, 200);
    noStroke();
    let x = this.x - this.width;
    let y1 = 0;
    let w = this.width*2;
    let h1 = this.gapY;
    let y2 = this.gapY + this.gapH;
    let h2 = groundY - y2;
    rect(x, y1, w, h1);
    rect(x, y2, w, h2);
  }
  
  update(){
    this.x -= 2;
  }
}
