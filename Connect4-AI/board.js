

class Board {
  constructor(cols, rows) {
    // Board
    this.cols = cols;
    this.rows = rows;
    this.turn = 1;
    this.winner = 0;
    this.winPos;
    this.winDir;
    this.board = [];
    this.isDropable = true;
    this.dropRow = 0;
    this.dropCol = -1;
    for (let i = 0; i < this.cols; i++) {
      this.board.push(new Array(this.rows).fill(0));
    }

    // AI
    this.agent = -1;
    this.human = 1;
  }

  colPlayable(board, col) {
    if (board[col][0] == 0) {
      return true;
    }
    return false;
  }

  minimax( depth, isMaximizing, alpha, beta) {
    let ai = this.agent;
    let human = this.human;
    let result = this.checkWinner();
    console.log(depth);
    if (result == ai)
      return 10;
    else if (result == human)
      return -10;
    else if (result == 2)
      return 0;

    if (isMaximizing) {
      let bestScore = -100;
      for (let i = 0; i < this.cols; i++) {
        if (this.colPlayable(this.board, i)) {
          let j = this.calRow(this.board, i);
          this.board[i][j] = ai;
          score = this.minimax(depth + 1, 0, false, alpha, beta);
          console.log(score);
          this.board[i][j] = 0;
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha)
            break;
        }
      }
      return bestScore;
    } else {
      let bestScore = 100;
      for (let i = 0; i < this.cols; i++) {
        if (this.colPlayable(this.board, i)) {
          let j = this.calRow(this.board, i);
          this.board[i][j] = human;
          score = this.minimax(depth + 1, 0, true, alpha, beta);
          this.board[i][j] = 0;
          bestScore = Math.min(score, bestScore);
          alpha = Math.min(beta, bestScore);
          if (beta <= alpha)
            break;
        }
      }
      return bestScore;
    }
  }


  bestMove(aii) {
    let ai = aii;
    let human = -ai;
    let move = 0;
    let bestScore = -Infinity;
    let score;

    for (let i = 0; i < this.cols; i++) {
      if (this.colPlayable(this.board, i)) {
        let j = this.calRow(this.board, i);
        this.board[i][j] = ai;
        score = this.minimax(0, false, -100, 100);
        this.board[i][j] = 0;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }

    return move;
  }

  calRow(board, col) {
    for (let i = this.row - 1; i >= 0; i--) {
      if (board[col][i] == 0) {
        return i;
      }
    }
  }


  drop(col) {
    this.dropCol = col;
    this.dropRow = -1;
    this.isDropable = false;
    // this.dropUpdate();
  }
  checkPosition(col, row) {
      // console.log(col, row);
 
      let player = this.board[col][row];
      // check up
      let flag;

      if (row > this.rows - 4) {
        flag = true;
        for (let r = row; r > row - 4; r--) {
          if (this.board[col][r] != player)
            flag = false;
        }
      }
      if (flag) {
        this.winPos = [col, row];
        this.winDir = "u"
        return true;

      };

      // check right
      if (col <= this.cols - 4) {
        flag = true;
        for (let c = col; c < col + 4; c++) {
          if (this.board[c][row] != player)
            flag = false;
        }
      }
      if (flag) {
        this.winPos = [col, row];
        this.winDir = "r"
        return true;

      };

      // check up right
      if (col <= this.cols - 4) {
        flag = true;
        let r = row
        for (let c = col; c < col + 4; c++) {
          if (this.board[c][r] != player)
            flag = false;
          r--;
        }
      }
      if (flag) {
        this.winPos = [col, row];
        this.winDir = "ur"
        return true;

      };

      // check up left
      if (col >= 3) {
        flag = true;
        let r = row
        for (let c = col; c > col - 4; c--) {
          if (this.board[c][r] != player)
            flag = false;
          r--;
        }
      }
      if (flag) {
        this.winPos = [col, row];
        this.winDir = "ul"
        return true;

      };



      return false;


    }

  checkWinner() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = this.rows - 1; j >= 0; j--) {
        if (this.board[i][j] != 0 && this.checkPosition(i, j)) {
          this.winner = this.board[i][j]
          return this.board[i][j]
        };
      }
    }
    
    for (let i = 0; i < this.cols; i++) {
      if(this.board[i][0]==0){
        return 0;
      }
    }
    return 2;
  }


  dropUpdate() {
    if (this.board[this.dropCol][this.dropRow + 1] != 0) {
      this.isDropable = true;
    } else {
      if (this.dropRow != -1) {
        this.board[this.dropCol][this.dropRow] = 0;
      }
      this.dropRow++;
      this.board[this.dropCol][this.dropRow] = this.turn;
      if (this.board[this.dropCol][this.dropRow + 1] != 0) {
        this.isDropable = false;
        this.turn = -this.turn;
        if (this.turn == this.agent) {
          this.drop(this.bestMove(this.agent));
        }
      }

    }
  }


  draw() {
    let w = width / (this.cols);
    let h = height / (this.rows + 1);

    for (let c = 0; c < this.cols; c++) {
      for (let r = 0; r < this.rows; r++) {
        push()
        fill(100);
        ellipse((c * w + w / 2), (r * h + h / 2) + h, w - 10, h - 10)
        if (this.board[c][r] == 1) {
          fill(255, 0, 0);
          ellipse((c * w + w / 2), (r * h + h / 2) + h, w - 20, h - 20)
        }
        if (this.board[c][r] == -1) {
          fill(247, 180, 1)
          ellipse((c * w + w / 2), (r * h + h / 2) + h, w - 20, h - 20)
        }
        pop()

      }
    }

    let mx = mouseX;
    if ((mx >= 0 || mx <= width) && this.isDropable) {
      let nextX = floor(mx / w);
      push()
      if (this.turn == 1) fill(255, 0, 0);
      else fill(247, 180, 1)
      ellipse((nextX * w + w / 2), (h / 2), w - 20, h - 20)
      pop()
    }
  }
}