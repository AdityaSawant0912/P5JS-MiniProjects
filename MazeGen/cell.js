function heusirtics(neighbors, end){
  if (neighbors.length == 0)
    return neighbors[0];
  else{
    let index = 0;
    for(let i = 0; i < neighbors.length; i++){
      if (dist(neighbors[i].i, neighbors[i].j, end.i, end.j) < dist(neighbors[index].i, neighbors[index].j, end.i, end.j)) {
        index = i;
      }
    }
    return(neighbors[index])
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.visitedSolver = false;
  }

  show() {
    stroke(255);
    let x = this.i * w;
    let y = this.j * w;
    if (this.walls[0]) line(x, y, x + w, y);

    if (this.walls[1]) line(x + w, y, x + w, y + w);
    if (this.walls[2]) line(x + w, y + w, x, y + w);
    if (this.walls[3]) line(x, y + w, x, y);
    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
    // if (this.visitedSolver) {
    //   noStroke();
    //   fill(255, 0, 0, 100);
    //   rect(x, y, w, w);
    // }
  }

  highlight(col) {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(col);
    rect(x, y, w, w);
  }

  getNeighbors(end) {
    let neighbors = [];
    let i = this.i;
    let j = this.j;
    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];
    if (top && !top.visitedSolver && !this.walls[0]) neighbors.push(top);
    if (right && !right.visitedSolver && !this.walls[1]) neighbors.push(right);
    if (bottom && !bottom.visitedSolver && !this.walls[2]) neighbors.push(bottom);
    if (left && !left.visitedSolver && !this.walls[3]) neighbors.push(left);
    return heusirtics(neighbors, end);
  }

  checkNeighbors() {
    let neighbors = [];
    let i = this.i;
    let j = this.j;
    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];
    if (top && !top.visited) neighbors.push(top);
    if (right && !right.visited) neighbors.push(right);
    if (bottom && !bottom.visited) neighbors.push(bottom);
    if (left && !left.visited) neighbors.push(left);

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }
}
