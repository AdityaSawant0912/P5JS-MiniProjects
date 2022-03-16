let cols = 100;
let rows = 100;
let grid = new Array(cols);

let openSet = [];
let closeSet = [];
let start, end;
let w, h;
let path = [];

function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);
  // return abs(a.i - b.i) + abs(a.j - b.j);
}

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined;
  this.wall = false;
  
  if(random(1) < 0.4){
    this.wall = true;
  }

  this.show = function (col) {
    fill(col);
    if(this.wall){
      fill(0);
    }
    
    noStroke();
    // rect(this.i * w, this.j * h, w , h );
    ellipse(this.i * w + w/2, this.j * h + h/2,w/2,h/2)
    
  };

  this.addNeighbors = function (grid) {
    let i = this.i;
    let j = this.j;
    if (i < cols - 1) this.neighbors.push(grid[i + 1][j]);
    if (i > 0) this.neighbors.push(grid[i - 1][j]);
    if (j < rows - 1) this.neighbors.push(grid[i][j + 1]);
    if (j > 0) this.neighbors.push(grid[i][j - 1]);
    if(i > 0 && j > 0){
      this.neighbors.push(grid[i - 1][j - 1]);
    }
    if(i < cols-1 && j > 0){
      this.neighbors.push(grid[i + 1][j - 1]);
    }
    if(i > 0 && j < rows-1){
      this.neighbors.push(grid[i - 1][j + 1]);
    }
    if(i < cols - 1 && j < rows - 1){
      this.neighbors.push(grid[i + 1][j + 1]);
    }
  };
}

function setup() {
  createCanvas(400, 400);
  console.log("A*");

  w = width / cols;
  h = height / rows;

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false;
  end.wall = false;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }
  console.log(grid);
  openSet.push(start);
}

function draw() {
  if (openSet.length > 0) {
    // we can continue
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    // check if we are done
    if (current === end) {
      console.log("Done");
      console.log(path);
      noLoop();
    }

    removeFromArray(openSet, current);
    closeSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closeSet.includes(neighbor) && !neighbor.wall) {
        let tempG = current.g + heuristic(neighbor, current);
        
        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath  = true;
          openSet.push(neighbor);
        }
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
    
    
  } else {
    // no Solution
    console.log("No Solution");
    noLoop();
    return;
    
  }

  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255));
    }
  }

  // for (let i = 0; i < closeSet.length; i++) {
  //   closeSet[i].show(color(255, 0, 0));
  // }

  // for (let i = 0; i < openSet.length; i++) {
  //   openSet[i].show(color(0, 255, 0));
  // }
  
  path = []
  let temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  
  // for (let i = 0; i < path.length; i++) {
  //   path[i].show(color(0, 0, 255));
  // }
  
  end.show(color(0,255,0))
  stroke(200,0,255);
  strokeWeight(w/2);
  noFill()
  beginShape();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w/2, path[i].j * h + h/2);
  }
  endShape();
}
