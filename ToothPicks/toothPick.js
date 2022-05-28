let len = 10;

class toothPick {
	constructor(x, y, dir) {
		if(dir == 1){
			this.ax = x - len / 2;
			this.bx = x + len / 2;
			this.ay = y;
			this.by = y;
		}else{
			this.ay = y - len / 2;
			this.by = y + len / 2;
			this.ax = x;
			this.bx = x;
		}
		this.dir = dir;
		
	}
	intersect(x, y){
		if(this.ax == x && this.ay == y)
			return true;
		else if	(this.bx == x && this.by == y)
			return true;
		else
			return false;
	}
	
	
	show(r, g, b, a, factor){
		push();
		stroke(r, g, b, a);
		strokeWeight(1/factor);
		line(this.ax, this.ay, this.bx, this.by);
		pop();
	}
	
	createA(picks){
		let available = true;
		for(let pick of picks){
			if(pick != this && pick.intersect(this.ax, this.ay)){
				available = false;
			}
		};
		if(available)
			return new toothPick(this.ax, this.ay, this.dir * -1);
		else
			return null;
		
	}
	createB(picks){
		let available = true;
		for(let pick of picks){
			if(pick != this && pick.intersect(this.bx, this.by)){
				available = false;
			}
		};
		if(available)
			return new toothPick(this.bx, this.by, this.dir * -1);
		else
			return null;
		
	}
	
	
}