class Walls {
  constructor() {
    this.w = 40; // some constant width
    this.x = width + this.w; // Starting Position of Walls, outside view, RHS
    this.gap = 170; // constant space between the walls
    this.h1 = random(this.gap * 0.5, groundY - this.gap* 1.5); // random height of top wall
    this.y1 = 0; // y -coordinate of top wall
    this.y2 = this.h1 + this.gap; // y cordinate of top of bottom rectangle
    this.h2 = groundY - this.y2; // height of bottom rectangle
    this.v = -2 // Velocity (Negative because moving from right to left)
  }

  show() {
    fill(20, 200);
    noStroke();
    rect(this.x, this.y1, this.w, this.h1); // Top
    rect(this.x, this.y2, this.w, this.h2); // Bottom
  }

  update() {
    this.x += this.v;
  }
}
