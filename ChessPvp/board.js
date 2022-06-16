let img;
class Board {

	constructor(images) {
		this.Images = images;
		this.board = [['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
		['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
		['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
		['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']];

		this.turn = 'w';
		this.selected = null;
		this.isCheck = false;
		this.gameOver = false;
		this.h = (height / 8)
		this.w = (width / 8)
		this.N = 8

	}

	select(y, x) {
		if (this.board[x][y] != ' ' && this.turn == this.board[x][y][0]) {
			this.selected = [this.board[x][y], x, y]
			this.board[x][y] = ' '
		}
	}

	drawBoard() {
		for (let j = 0; j < this.N; j++) {
			for (let i = 0; i < this.N; i++) {
				if (i % 2 == 0) {
					if (j % 2 == 0) {
						push()
						fill(255);
						noStroke();
						rect(i * this.w, j * this.h, this.w, this.h);
						pop()
					} else {
						push()
						fill(247, 160, 77);
						noStroke();
						rect(i * this.w, j * this.h, this.w, this.h);
						pop()
					}
				} else {
					if (j % 2 == 0) {
						push()
						fill(247, 160, 77);
						noStroke();
						rect(i * this.w, j * this.h, this.w, this.h);
						pop()
					} else {
						fill(255);
						push()
						noStroke();
						rect(i * this.w, j * this.h, this.w, this.h);
						pop()
					}
				}
			}
		}
	}


	isValidMove(y, x, y2, x2) {
		let peice = this.selected[0][1].toLowerCase();
		let color = this.selected[0][0];

		// P

		if (y == y2 && x == x2) {
			return false;
		}
		if (peice == 'p') {
			if (color == 'w') {
				if (y2 == y - 1 && x2 == x && this.board[y2][x2] == ' ') {
					return true;
				}
				if (y2 == y - 1 && (x2 == x - 1 || x2 == x + 1) && this.board[y2][x2][0] == 'b') {
					return true;
				}
				if (y2 == y - 2 && x2 == x && this.board[y2][x2] == ' ' && y == 6) {
					return true;
				}
			}
			if (color == 'b') {
				if (y2 == y + 1 && x2 == x && this.board[y2][x2] == ' ') {
					return true;
				}
				if (y2 == y + 1 && (x2 == x - 1 || x2 == x + 1) && this.board[y2][x2][0] == 'w') {
					return true;
				}
				if (y2 == y + 2 && x2 == x && this.board[y2][x2] == ' ' && y == 1) {
					return true;
				}
			}

		}

		// r

		if (peice == 'r' && (y2 == y || x2 == x))
			return true;

		if (peice == 'n' && ((((y == y2 + 2) || (y == y2 - 2)) && ((x == x2 + 1) || (x == x2 - 1))) || (((x == x2 + 2) || (x == x2 - 2)) && ((y == y2 + 1) || (y == y2 - 1)))))
			return true

		if (peice == 'b' && (abs(y - y2) == abs(x - x2)))
			return true

		if (peice == 'q' && ((y2 == y || x2 == x) || (abs(y - y2) == abs(x - x2))))
			return true;

		if (peice == 'k' && ((abs(y - y2) == 1 && abs(x - x2) == 1) || (abs(y - y2) == 1 || abs(x - x2) == 1)))
			return true;
		console.log(y2, x2);
		if (peice == 'k' && color == 'w' && (y == 7 && x == 4) && (y2 == 7 && x2 == 6) && this.board[7][5] == ' ' && this.board[7][6] == ' ' && this.board[7][7][1] == 'R') {
			this.board[7][6] = 'wK';
			this.board[7][5] = 'wR';
			this.board[7][4] = ' ';
			this.board[7][7] = ' ';
			this.turn = 'b';
			this.selected = null;
			console.log("done");
			return false;
		}
		if (peice == 'k' && color == 'b' && (y == 0 && x == 3) && (y2 == 0 && x2 == 1) && this.board[0][1] == ' ' && this.board[0][2] == ' ' && this.board[0][0][1] == 'r') {
			this.board[0][1] = 'bk';
			this.board[0][2] = 'br';
			this.board[0][3] = ' ';
			this.board[0][0] = ' ';
			this.turn = 'w';
			this.selected = null;
			console.log("done");
			return false;
		}


		return false;
	}

	show() {

		// draw board
		this.drawBoard();

		// Draw pieces
		for (let i = 0; i < this.N; i++) {
			for (let j = 0; j < this.N; j++) {
				if (this.board[i][j] != ' ') {
					image(this.Images[this.board[i][j]], j * (this.w), i * (this.h))
				}
			}
		}


		if (this.selected != null && mouseIsPressed) {
			image(this.Images[this.selected[0]], mouseX - 30, mouseY - 30)
		}
		if (this.selected != null && !mouseIsPressed) {
			if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
				let y = floor(mouseX / (width / 8))
				let x = floor(mouseY / (height / 8))

				if (this.isValidMove(this.selected[1], this.selected[2], x, y)) {
					let colorS = this.selected[0].substring(0, 1);
					let colorE = this.board[x][y].substring(0, 1);
					if (colorS == colorE) {
						this.board[this.selected[1]][this.selected[2]] = this.selected[0];
						this.selected = null;
					} else {
						if (this.turn == 'w' && this.selected[0][1].toLowerCase() == 'p' && x == 0) {
							this.board[x][y] = 'wQ'
						}
						else if (this.turn == 'b' && this.selected[0][1].toLowerCase() == 'p' && x == 7) {
							this.board[x][y] = 'bq'
						} else {
							this.board[x][y] = this.selected[0];
						}
						if (this.turn == 'w')
							this.turn = 'b';
						else
							this.turn = 'w';
						this.selected = null;
					}


				} else {
					if (this.selected != null) {

						this.board[this.selected[1]][this.selected[2]] = this.selected[0];
						this.selected = null;
					}
				}
			} else {
				this.board[this.selected[1]][this.selected[2]] = this.selected[0];
				this.selected = null;
			}
		}

	}
}