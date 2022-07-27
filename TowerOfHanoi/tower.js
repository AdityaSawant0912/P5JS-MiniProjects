

class Tower {
	constructor(n) {
		this.N = n;
		this.pegs = [[], [], []]
		for (let i = n; i > 0; i--) {
			this.pegs[0].push(i)
		}
		// this.pegs = [[1], [], []]
		this.holding = null;
		// this.holding =  [0, 1];
		this.moves = 0;
		// Pegs
		this.w = (3 / 100) * width;
		this.h = (50 / 100) * height;
		this.d = 1.3;

		// Disks
		this.minDiskW = this.w * 1.45;
		this.maxDiskW = ((this.d * width) / 8) - 2;
		this.dh = this.minDiskW * 0.7;
		this.bottom = ((height / 2) + (this.h / 2)) - 10;
		this.gap = this.dh * 1.1;
		this.dw;
		this.disk = 0;
		this.currW;
		this.gameOver = false;
	}

	draw() {
		// Texts
		push();
		textAlign(CENTER, CENTER);
		fill(189, 98, 6);
		textSize(this.w * 1.3);
		text(`N: ${this.N}`, width * 0.87, height * 0.1);
		pop();

		push();
		textAlign(CENTER, CENTER);
		fill(189, 98, 6);
		textSize(this.w * 1.3);
		text(`Moves: ${this.moves}`, width * 0.87, height * 0.16);
		pop();

		push();
		textAlign(CENTER, CENTER);
		fill(240, 117, 15);
		textSize(this.w * 1.9);
		text(`Tower of Hanoi`, width * 0.5, height * 0.1);
		pop();

		// Pegs
		// console.log(width);
		push();
		fill(199, 165, 121);
		strokeWeight(1)
		rect((width / 2) - (this.w / 2), (height / 2) - (this.h / 2), this.w, this.h);
		rect((width / 2) - (this.w / 2) - ((this.d * width) / 4), (height / 2) - (this.h / 2), this.w, this.h);
		rect((width / 2) - (this.w / 2) + ((this.d * width) / 4), (height / 2) - (this.h / 2), this.w, this.h);
		pop();


		// Disks
		this.disk = 0;
		// Disk 1
		push();
		fill(125, 81, 54);
		strokeWeight(1);
		this.currw = (width / 2) - ((this.d * width) / 4);
		if (this.pegs[this.disk].length) {
			for (let i = 0; i < this.pegs[this.disk].length; i++) {
				this.dw = map(this.pegs[this.disk][i], 1, this.N, this.minDiskW, this.maxDiskW)
				if (this.N == 1) this.dw = this.maxDiskW / 3
				rect(this.currw - this.dw, this.bottom - this.dh - (this.gap * i), this.dw * 2, this.dh)
			}
		}
		pop();
		this.disk++;
		// Disk 2
		push();
		fill(125, 81, 54);
		strokeWeight(1);
		this.currw = (width / 2);
		if (this.pegs[this.disk].length) {
			for (let i = 0; i < this.pegs[this.disk].length; i++) {
				this.dw = map(this.pegs[this.disk][i], 1, this.N, this.minDiskW, this.maxDiskW)
				if (this.N == 1) this.dw = this.maxDiskW / 3
				rect(this.currw - this.dw, this.bottom - this.dh - (this.gap * i), this.dw * 2, this.dh)
			}
		}
		pop();
		this.disk++;
		// Disk 3
		push();
		fill(125, 81, 54);
		strokeWeight(1);
		this.currw = (width / 2) + ((this.d * width) / 4);
		if (this.pegs[this.disk].length) {
			for (let i = 0; i < this.pegs[this.disk].length; i++) {
				this.dw = map(this.pegs[this.disk][i], 1, this.N, this.minDiskW, this.maxDiskW)
				if (this.N == 1) this.dw = this.maxDiskW / 3
				rect(this.currw - this.dw, this.bottom - this.dh - (this.gap * i), this.dw * 2, this.dh)
			}
		}
		pop();


		// Holding

		push()
		fill(125, 81, 54);
		strokeWeight(1);
		if (this.holding != null) {

			this.dw = map(this.holding[1], 1, this.N, this.minDiskW, this.maxDiskW)
			if (this.N == 1) this.dw = this.maxDiskW / 3;
			rect(mouseX - this.dw, mouseY - this.dh / 2, this.dw * 2, this.dh);
		}
		pop()


		if (this.pegs[2].length == this.N) {
			push();
			textAlign(CENTER, CENTER);
			fill(122, 180, 27);
			textSize(this.w * 1.9);
			text(`Well Done`, width * 0.5, height * 0.88);
			this.gameOver = true;
			pop();
			// noLoop();
		}


	}

	hold(mx) {
		let disk;
		if (mx >= ((width / 2) - this.maxDiskW - 1) && mx <= ((width / 2) + this.maxDiskW + 1)) disk = 1;
		else if (mx <= ((width / 2) - this.maxDiskW - 1)) disk = 0;
		else if (mx >= ((width / 2) + this.maxDiskW + 1)) disk = 2;
		if (this.pegs[disk].length > 0)
			this.holding = [disk, this.pegs[disk].pop()]


	}
	place(mx) {
		let disk;
		if (mx >= ((width / 2) - this.maxDiskW - 1) && mx <= ((width / 2) + this.maxDiskW + 1)) disk = 1;
		else if (mx <= ((width / 2) - this.maxDiskW - 1)) disk = 0;
		else if (mx >= ((width / 2) + this.maxDiskW + 1)) disk = 2;
		if (disk == this.holding[0]) this.pegs[disk].push(this.holding[1])
		else if (this.pegs[disk].length == 0) {
			this.pegs[disk].push(this.holding[1])
			this.moves++;
		} 
		else {
			let top = this.pegs[disk].pop();
			this.pegs[disk].push(top);
			if (top > this.holding[1]) {
				this.pegs[disk].push(this.holding[1]);
				this.moves++;
			}
			else
				this.pegs[this.holding[0]].push(this.holding[1])
		}

		this.holding = null;
	}
}