function Index(i, j, N) {
  if (i < 0 || j < 0 || i > N - 1 || j > N - 1) return -1;
  return i + j * N;
}
let temp;
class Board {
  constructor(N, w, h) {
    this.N = N;
    this.spots = [];
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        this.spots.push(new Spot(i, j, w, h));
      }
    }
  }
  getNextSafe(index, cameFrom) {
    let temp = [];
    // for (let row = 0; row < N; row++) {
    //   for (let col = 0 ; col < N; col++) {
    //     temp = this.spots[Index(col, row, this.N)];
    //     if (row !== i && col !== j && this.isSafe(temp.i, temp.j)) {
    //       temp.safe = true;
    //       return temp;
    //     }
    //   }
    // }

    for (let i = 0; i < this.N * this.N; i++) {
      if (cameFrom.includes(this.spots[i])){
        console.log("true");
      }
      if (i == index) continue;
      else if (cameFrom.includes(this.spots[i])) console.log("Skiped");
      else if (this.isSafe(i)) temp.push(this.spots[i]);
    }
    console.log(index, cameFrom);
    for (let spot of temp) 
      spot.show(color(0, 255, 0));
    // let done = false;
    // index = 0
    // if(cameFrom.includes(temp[index]))
    //   console.log(true);
    // if(temp.length == 1) return temp[0];
    // while (done){
    //   if(cameFrom.includes(temp[0])){
    //     temp = temp.shift(1);
    //   }else{
    //     done = true;
    //   }
    // }
    return temp[0];
  }

  isSafe(index) {
    // check right
    for (let i = index; i < this.N * this.N; i += this.N) {
      if (this.spots[i].isQueen) return false;
    }
    // check left
    for (let i = index; i >= 0; i -= this.N) {
      if (this.spots[i].isQueen) return false;
    }
    // check top
    for (let i = index; i >= 0; i -= 1) {
      if (this.spots[i].j == 0 && !this.spots[i].isQueen) break;
      if (this.spots[i].isQueen) return false;
    }
    // check bottom
    for (let i = index; i < this.N * this.N; i += 1) {
      if (this.spots[i].j == this.N - 1 && !this.spots[i].isQueen) break;
      if (this.spots[i].isQueen) return false;
    }
    // check top right
    for (let i = index; i < this.N * this.N; i += this.N + 1) {
      if (
        (this.spots[i].j == 0 || this.spots[i].i == this.N - 1) &&
        !this.spots[i].isQueen
      )
        break;
      if (this.spots[i].isQueen) return false;
    }
    // check top left
    for (let i = index; i >= 0; i -= this.N + 1) {
      if (
        (this.spots[i].j == 0 || this.spots[i].i == 0) &&
        !this.spots[i].isQueen
      )
        break;
      if (this.spots[i].isQueen) return false;
    }
    // check bottom right
    for (let i = index; i < this.N * this.N; i += this.N - 1) {
      if (
        (this.spots[i].j == this.N - 1 || this.spots[i].i == this.N - 1) &&
        !this.spots[i].isQueen
      )
        break;
      if (this.spots[i].isQueen) return false;
    }
    // check bottom left
    for (let i = index; i >= 0; i -= this.N - 1) {
      if (
        (this.spots[i].j == this.N - 1 || this.spots[i].i == 0) &&
        !this.spots[i].isQueen
      )
        break;
      if (this.spots[i].isQueen) return false;
    }
    return true;
  }

  show() {
    for (let i = 0; i < this.N; i++) {
      for (let j = 0; j < this.N; j++) {
        if (i % 2 == 0) {
          if (j % 2 == 0) {
            this.spots[Index(i, j, this.N)].show(color(255));
          } else {
            this.spots[Index(i, j, this.N)].show(color(0));
          }
        } else {
          if (j % 2 == 0) {
            this.spots[Index(i, j, this.N)].show(color(0));
          } else {
            this.spots[Index(i, j, this.N)].show(color(255));
          }
        }
      }
    }
  }
}
