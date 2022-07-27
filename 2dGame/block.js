


class Block {

	constructor(x, y) {
		this.height = 80;
		this.width = 80;
		this.halfHeight = this.height * 0.5;
		this.halfWidth = this.width * 0.5;
		this.restitution = 0.8;
		if (x - this.width / 2 <= 0) {
			x = this.width / 2;
		} else if (x + this.width / 2 >= width) {
			x = width - this.width / 2;
		}

		if (y - this.height / 2 <= 0) {
			y = this.height / 2;
		} else if (y + this.height / 2 >= height) {
			y = width - this.height / 2;
		}

		this.pos = createVector(x, y);
		this.detectCollision = true;
		this.dist;
	}

	draw() {
		push();
		translate(this.pos.x, this.pos.y);
		noStroke();
		fill(153, 183, 181);
		rect(-this.width / 2, -this.height / 2, this.width, this.height)
		pop();
	}

}