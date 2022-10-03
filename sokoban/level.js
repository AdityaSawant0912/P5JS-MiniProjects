let tile;
let cnt
class Level {
    constructor(LEVEL_X, LEVEL_Y, level) {
        this.LEVEL_X = LEVEL_X;
        this.LEVEL_Y = LEVEL_Y;
        this.level = level;
        this.levelWidth = this.level.width * PX_WIDTH;
        this.levelHeight = this.level.height * PX_WIDTH;
        this.player = createVector(this.level.player.x, this.level.player.y);
        this.goals = this.level.goals;
        this.map = this.level.map;
        this.boxMoves = 0;
        this.moves = 0;
        this.win = false;
        this.completed = 0;
    }

    draw() {
        // rect(this.LEVEL_X, this.LEVEL_Y, this.levelWidth, this.levelHeight)
        for (let i = 0; i < this.level.height; i++) {
            for (let j = 0; j < this.level.width; j++) {
                push();
                translate(this.LEVEL_X, this.LEVEL_Y)
                tile = this.map[i][j];
                if (tile == " ") {
                    fill(211, 200, 164);
                }
                if (tile == "#") {
                    fill(138, 131, 68);
                }
                else if (tile == "ob") {
                    fill(123, 47, 2);
                }
                else if (tile[1] == "b") {
                    fill(239, 166, 87);
                }
                else if (tile == "o") {
                    fill(194, 152, 129);
                }
                else if (tile[1] == "p") {
                    fill(69, 111, 157);
                }else if (tile == "s") {
                    fill(SKY)
                }
                noStroke()
                rect(j * PX_WIDTH, i * PX_WIDTH, PX_WIDTH, PX_WIDTH)
                pop();
            }
        }
    }

    move(x, y) {
        [x, y] = [y, x]
        console.log(x, y);
        if (this.map[this.player.x + x][this.player.y + y] != "#") {
            if (this.map[this.player.x + x][this.player.y + y] == " " || this.map[this.player.x + x][this.player.y + y] == "o") {
                this.map[this.player.x][this.player.y] = this.map[this.player.x][this.player.y][0];
                this.map[this.player.x + x][this.player.y + y] = this.map[this.player.x + x][this.player.y + y] + "p";
                this.player.x += x;
                this.player.y += y;
                this.moves++;
            }
            else if (this.map[this.player.x + x][this.player.y + y][1] == "b" && (this.map[this.player.x + (x * 2)][this.player.y + (y * 2)] == " " || this.map[this.player.x + (x * 2)][this.player.y + (y * 2)] == "o")) {
                this.map[this.player.x][this.player.y] = this.map[this.player.x][this.player.y][0];
                this.map[this.player.x + x][this.player.y + y] = this.map[this.player.x + x][this.player.y + y][0] + "p";
                this.map[this.player.x + (x * 2)][this.player.y + (y * 2)] = this.map[this.player.x + (x * 2)][this.player.y + (y * 2)] + "b";
                this.player.x += x;
                this.player.y += y;
                this.moves++;
                this.boxMoves++;
            }
        }
    }
    
    checkWin(){
        cnt = 0;
        for (let i = 0; i < this.level.height; i++) {
            for (let j = 0; j < this.level.width; j++) {
                if (this.map[i][j] == "ob") {
                    cnt++;
                }
            }
        }
        this.completed = cnt;
        if(cnt == this.goals){
            this.win = true;
        }
    }

    update() {
        if (keyIsPressed === true) {
            if (key === 'w') {
                this.move(0, -1);
            }
            if (key === 's') {
                this.move(0, 1);
            }
            if (key === 'd') {
                this.move(1, 0);
            }
            if (key === 'a') {
                this.move(-1, 0);
            }
        }
    }


}