

class Board {
	constructor(cols, rows) {
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
				};
			}
		}
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