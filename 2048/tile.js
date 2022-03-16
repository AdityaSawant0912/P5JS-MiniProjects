class Tile {
  constructor(i, j, h) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.h = h;
    this.power = 0;
    // this.value = Math.pow(2, this.power);
  }

  show() {
    fill(255, 200);
    // noStroke();
    rect(this.i * this.w, this.j * this.h, this.w, this.h);
    if (this.power > 0) {
      textSize(32);
      fill(0)
      text("2", this.i * this.w + this.w / 2 - 17, this.j * this.h + this.h / 2 + 17);
      textSize(24);
      fill(255, 0, 0, 100);
      text(this.power, this.i * this.w + this.w / 2, this.j * this.h + this.h / 2 - 7);
    }
  }
}
