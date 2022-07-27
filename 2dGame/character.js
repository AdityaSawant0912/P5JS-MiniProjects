let dx;
let dy;
let absDX;
let absDY;

class Character {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.height = 60;
		this.width = 30;
		this.halfHeight = this.height * 0.5;
		this.halfWidth = this.width * 0.5;
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0.5);
		this.jump = false;
		this.isJumpable = false;
		this.jumpVector = createVector(0, -12);
		this.moveSpeed = 7;
		this.velYLimit = 15;
		this.velXLimit = 10;
		this.goL = false;
		this.goR = false;
		this.fric = 0.90;
		this.drag = 0.99;
		this.STICKY_THRESHOLD = 0.0004;
		this.isCollided = {
			up: false,
			down: false,
			left: false,
			right: false
		}
		this.threshold = 0.01;
	}

	draw() {
		push();
		fill(255, 0, 0);
		noStroke();
		translate(this.pos.x, this.pos.y);
		rect(-this.halfWidth, -this.halfHeight, this.width, this.height)
		pop();
		// console.log(this.isCollided.down);
	}

	update() {
		// console.log(this.isJumpable);
		if (this.jump && this.isJumpable) {
			this.vel.add(this.jumpVector);
			this.jump = false;
		} else {
			this.vel.add(this.acc);
			this.jump = false;
		}
		this.vel.x *= this.fric;
		this.vel.y *= this.drag;

		if (this.goL && !this.isCollided.left) {
			this.vel.add(-this.moveSpeed)
			if (keyIsPressed === true && keyCode == 65)
				this.goL = true;
			else
				this.goL = false;

		} else
			this.goL = false;
		if (this.goR && !this.isCollided.right) {
			this.vel.add(this.moveSpeed)
			if (keyIsPressed === true && keyCode == 68)
				this.goR = true;
			else
				this.goR = false;

		} else
			this.goR = false;

		if (abs(this.vel.x) < 0.2) {
			this.vel.x = 0;
		}
		this.pos.add(this.vel);
		this.clampXY();

	}
	clampXY() {
		if (this.vel.y > this.velYLimit)
			this.vel.y = this.velYLimit;
		else if (this.vel.y < -this.velYLimit)
			this.vel.y = -this.velYLimit;
		if (this.vel.x > this.velXLimit)
			this.vel.x = this.velXLimit;
		else if (this.vel.x < -this.velXLimit)
			this.vel.x = -this.velXLimit;
	}

	windowCollisonCheck() {
		if (this.pos.x + this.halfWidth >= width) {
			this.vel.x = 0;
			this.pos.x = width - this.halfWidth
			// this.isCollided.right = true;
		} else {
			this.isCollided.right = false;
		}

		if (this.pos.x - this.halfWidth <= 0) {
			this.vel.x = 0;
			this.pos.x = this.halfWidth;
			// this.isCollided.left = true;
		} else {
			this.isCollided.left = false;
		}

		if (this.pos.y + this.halfHeight >= height) {
			this.vel.y = 0;
			this.pos.y = height - this.halfHeight
			this.isJumpable = true;
			this.isCollided.down = true;

		} else {
			this.isJumpable = false;
			this.isCollided.down = false;
		}
		if (this.pos.y - this.halfHeight <= 0) {
			this.vel.y = 0;
			this.pos.y = 0 + this.halfHeight
			this.isCollided.up = true;
		}
		else {
			this.isCollided.up = false;
		}
	}


	collision(block) {
		if (this.pos.y + this.halfHeight < block.pos.y - block.halfHeight ||
			this.pos.y - this.halfHeight > block.pos.y + block.halfHeight ||
			this.pos.x + this.halfWidth < block.pos.x - block.halfWidth ||
			this.pos.x - this.halfWidth > block.pos.x + block.halfWidth)
			return false

		// console.log("Collided");
		return true;

	}

	resolveCollison(block) {
		dx = (block.pos.x - this.pos.x) / block.halfWidth;
		dy = (block.pos.y - this.pos.y) / block.halfHeight;
		absDX = abs(dx);
		absDY = abs(dy);
		// console.log("1", this.vel.x, this.pos.x, this.goR, this.goL);
		// Player comming from corner
		console.log(this.pos.x); 
		if (abs(absDX - absDY) < this.threshold) {

			// If the player is approaching from positive X
			if (dx < 0) {

				// Set the player x to the right side
				this.pos.x = block.pos.x + block.halfWidth + this.halfWidth + 0;
				this.isCollided.left = true; 
				// If the player is approaching from negative X
			} else {

				// console.log("here"); 
				// Set the player x to the left side
				this.pos.x = block.pos.x - block.halfWidth - this.halfWidth - 0;
				this.isCollided.right = true;
			}

			// If the player is approaching from positive Y
			if (dy < 0) {

				// Set the player y to the bottom
				this.pos.y = block.pos.y + block.halfHeight + this.halfHeight;
				this.isCollided.down = true;
				this.isJumpable = true;

				// If the player is approaching from negative Y
			} else {

				// Set the player y to the top
				this.pos.y = block.pos.y - block.halfHeight - this.halfHeight;
			}
			if (Math.random() < .5) {
				console.log("this");
				// Reflect the velocity at a reduced rate
				this.vel.x = -(this.vel.x * block.restitution + block.restitution);
				console.log("cor", this.vel.x);
				// If the object's velocity is nearing 0, set it to 0
				// STICKY_THRESHOLD is set to .0004
				if (abs(this.vel.x) < this.STICKY_THRESHOLD) {
					this.vel.x = 0;
				}
				// this.vel.x = 0;
			} else {

				this.vel.y = -this.vel.y * block.restitution;
				if (abs(this.vel.y) < this.STICKY_THRESHOLD) {
					this.vel.y = 0;
				}
			}



		}
		// Player comming from sides
		else if (absDX > absDY) {
			// If the player is approaching from positive X
			if (dx < 0) {
				this.pos.x = block.pos.x + block.halfWidth + this.halfWidth + 0;
				this.isCollided.left = true;
			} else {
				// If the player is approaching from negative X
				this.pos.x = block.pos.x - block.halfWidth - this.halfWidth - 0;
				this.isCollided.right = true;
			}

			// Velocity component
			this.vel.x = -(this.vel.x * block.restitution + block.restitution);
			// console.log("!", this.vel.x);
			if (abs(this.vel.x) < this.STICKY_THRESHOLD) {
				this.vel.x = 0;
			}
			// this.vel.x = 0;

		}
		// Player comming from top or bottom
		else {
			if (dy < 0) {
				this.pos.y = block.pos.y + block.halfHeight + this.halfHeight;
			} else {
				this.pos.y = block.pos.y - block.halfHeight - this.halfHeight;
				this.isCollided.down = true;
				this.isJumpable = true;
			}
			this.vel.y = -this.vel.y * block.restitution;
			if (abs(this.vel.y) < this.STICKY_THRESHOLD || this.goR || this.goL) {
				this.vel.y = 0;
			}
			// this.vel.y = 0;

		}
		
		// console.log("2", this.vel.x, this.pos.x, this.goR, this.goL);

	}



	// checkCollision(block) {
	// 	// direction refrence of block (not dude)
	// 	// check vertical
	// 	if (this.pos.x - this.halfWidth < block.pos.x + block.width / 2 && this.pos.x + this.halfWidth > block.pos.x - block.width / 2) {
	// 		if (this.pos.y + this.halfHeight >= block.pos.y -  block.halfHeight && this.pos.y - this.halfHeight <= block.pos.y -  block.halfHeight) {
	// 			if (this.pos.y < block.pos.y) {
	// 				this.vel.y = 0;
	// 				this.pos.y = block.pos.y -  block.halfHeight - this.halfHeight;
	// 				this.isCollided.down = true;
	// 				console.log("down");
	// 				this.isJumpable = true;
	// 			}
	// 			else if (this.pos.y > block.pos.y) {
	// 				this.vel.y = 0;
	// 				// this.pos.y = block.pos.y +  block.halfHeight + this.halfHeight;
	// 				this.isCollided.up = true;
	// 				this.isJumpable = false;
	// 			}
	// 		} else {
	// 			this.isCollided.up = false;
	// 			this.isCollided.down = false;
	// 		}
	// 	}

	// 	// check horizontal;

	// 	console.log(this.pos.y, block.pos.y);
	// 	if (this.pos.y + this.halfHeight > block.pos.y -  block.halfHeight && this.pos.y - + this.halfHeight < block.pos.y +  block.halfHeight) {

	// 		console.log("in");
	// 		console.log(block.pos.x - block.width / 2 - (this.pos.x + this.halfWidth));
	// 		if ((block.pos.x - block.width / 2) - (this.pos.x + this.halfWidth) <= 0 && this.pos.x < block.pos.x) {
	// 			this.vel.x = 0;
	// 			this.pos.x = block.pos.x - block.width / 2 - this.halfWidth;
	// 			this.isCollided.right = true;
	// 		}
	// 		else if ((this.pos.x - this.halfWidth) - (block.pos.x + block.width / 2) <= 0 && this.pos.x > block.pos.x) {
	// 			this.vel.x = 0;
	// 			this.pos.x = block.pos.x + block.width / 2 + this.halfWidth;
	// 			this.isCollided.left = true;
	// 		} else {
	// 			this.isCollided.right = false;
	// 			this.isCollided.left = false;
	// 		}
	// 	} else {
	// 		this.isCollided.right = false;
	// 		this.isCollided.left = false;
	// 	}

	// }





}