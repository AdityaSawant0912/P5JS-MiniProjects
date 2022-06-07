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

  getNextsafeCol(row) {
    for (let c = 0; c < this.N; c++) {
      if (this.spots[Index(row, c, this.N)].visited) continue;
      if (this.isSafeC(row, c)) return c;
    }
    return -1;
  }


  isSafeC(r, c) {
    // check up
    for (let i = r; i >= 0; i--) {
      if (this.spots[Index(i, c, this.N)].isQueen) return false;
    }

    // check up left
    for (let i = r, j = c; i >= 0 && j >= 0; i--, j--) {
      if (this.spots[Index(i, j, this.N)].isQueen) return false;
    }

    // check up right
    for (let i = r, j = c; i >= 0 && j < this.N; i--, j++) {
      if (this.spots[Index(i, j, this.N)].isQueen) return false;
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
