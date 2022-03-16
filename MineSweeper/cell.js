class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hidden = true;
    this.bomb = false;
    this.value = 0;
    this.flag = false;
  }
  show() {
    fill(200);
    if (!this.hidden) {
      fill(150);
    }
    stroke(0);
    strokeWeight(0);
    rect(this.x * w, this.y * w, w - 1, w - 1);
    // if (this.bomb) {
    //   fill(0, 0, 255);
    //   ellipse(this.x * w + w / 2, this.y * w + w / 2, w / 3);
    // }
    if (!this.hidden) {
      if (this.value > 0) {
        fill(255, 0, 0);
        textSize(w / 2 + 3);
        text(this.value, this.x * w + w / 4, this.y * w + w / 1.5);
      }
    } else if (this.flag) {
      fill(255, 0, 0);
      ellipse(this.x * w + w / 2, this.y * w + w / 2, w / 3);
    }
  }

  getNeighbors() {
    let arr = [];
    
    if(this.x > 0) arr.push(grid[this.x - 1][this.y]);
    if(this.x < N - 1) arr.push(grid[this.x + 1][this.y]);
    if(this.y > 0) arr.push(grid[this.x][this.y - 1]);
    if(this.y < N - 1) arr.push(grid[this.x][this.y + 1]);
    if(this.x > 0 && this.y > 0) arr.push(grid[this.x - 1][this.y - 1]);
    if(this.x < N - 1 && this.y > 0) arr.push(grid[this.x + 1][this.y - 1]);
    if(this.x > 0 && this.y < N - 1) arr.push(grid[this.x - 1][this.y + 1]);
    if(this.x < N - 1 && this.y < N - 1) arr.push(grid[this.x + 1][this.y + 1]);

    return arr;
  }

  pop() {
    let neighbors = this.getNeighbors();
    if (this.hidden) {
      this.hidden = false;
      for (let neighbor of neighbors) {
        if (neighbor.bomb) this.value++;
      }
      if (this.value == 0) {
        for (let neighbor of neighbors) {
          if (neighbor.hidden && !neighbor.bomb) neighbor.pop();
        }
      }
    }
  }
}
