class Spot {
  constructor(i, j,w, h) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.h = h;
    this.isQueen = false;
    // this.col = color(255);
    this.visited = false;
    this.safe = true;
    this.cameFrom = []

    this.show = function (col) {
      fill(col);
      this.col = col;
      noStroke();
      rect(this.i * this.w, this.j * this.h, this.w, this.h);
      if (this.isQueen) {
        fill(color(255, 0, 0));
        textSize(16)
        text(
          "Q",
          this.i * w + w / 2 - 7,
          this.j * h + h / 2 + 6
        );
      }
    };
  }
}