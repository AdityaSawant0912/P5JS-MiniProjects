let w, h;
let cols = rows = 8;
let grid = new Array(cols);
let N = 8;
let Q = 8;
let board;
let current;
let stack = [];
let index = 0;




// function isSafe(row, col) {
//   for (let i = 0; i < col; i++) {
//     if (grid[i][row].isQueen) return false;
//   }
//   for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
//     if (grid[j][i].isQueen) return false;
//   }
//   for (let i = row, j = col; i < cols && j >= 0; i++, j--) {
//     if (grid[j][i].isQueen) return false;
//   }
//   return true;
// }



function setup() {
  frameRate(1)
  createCanvas(400, 400);
  w = width / cols;
  h = height / rows;
  board = new Board(N, w, h);
  current = board.spots[index];
  
}
function Index(i, j, N) {
  if (i < 0 || j < 0 || i > N - 1 || j > N - 1) return -1;
  return i + j * N;
}


function draw() {
  background(255);
  board.show();
  // board.spots[8].show(color(255,0,0))
  // console.log(board.spots[19]);
  // board.spots[19-7].show(color(0,255,0))
  // let index = Index(4, 4, N);
  // board.spots[index].show(color(0,255,0))
  //   for (let i = index; i >= 0; i -= 1) {
  //     // if (board.spots[i].isQueen) return false;
  //     // if(board.spots[i].)
  //     board.spots[i].show(color(0,255,0))
  //     if (board.spots[i].j == 0 ) break;
  //     console.log(i);
      
  //   }
  // current.isQueen = true;
  // current.visited = true;
  // board.spots[3].isQueen = true;
  // board.spots[0].visited = true;
  // console.log(board.isSafe(1));
  // console.log(board.getNextSafe(0));
  // console.log(board.spots[1]);
  
  
  if(Q == 0){
    console.log("Done");
    noLoop();
  }
  current.visited = true; 
  current.isQueen = true;
  current.safe = false;
  current.show(color(0,0,255));
  let next = board.getNextSafe(Index(current.i, current.j, N), current.cameFrom);
  if(next){
    stack.push(current);
    Q--;
    current = next;
    current.visited == true;
  }else if(stack.length>0){
    current.safe = true;
    current.isQueen = false;
    Q++
    next = stack.pop();
    // while(current.camefrom.length > 0)
    // current.camefrom = [];

    if (!next.cameFrom.includes(current)) {
      next.cameFrom.push(current)
    }
    current = next
    console.log(Index(current.i, current.j, N), current.cameFrom);   
    // current.visited = true;
    // noLoop(); 
  }
  else{
    console.log("Error");
    noLoop();
  }
  
  
  // board.show()
  // noLoop()
  
  

  
}