
class Grid {
    constructor(rows, cols) {
        this.cols = cols;
        this.rows = rows;
        this.tiles = [];
        for (let i = 0; i < rows; i++) {
            this.tiles[i] = [];
            for (let j = 0; j < cols; j++) {
                this.tiles[i][j] = 0;
            }
        }
        // console.table(tiles);
        this.food = {};
        this.snake;
        this.gameOver = false;
        this.addBody = [false, 0, 0];
        this.score = 0;
    }


    show() {
        push()
        let w = width / this.cols;
        let r = height / this.rows;
        stroke(200);
        strokeWeight(1);
        for (let i = 0; i < width; i = i + r) {
            line(0, i, width, i);
        }
        for (let i = 0; i < height; i = i + w) {
            line(i, 0, i, height);
        }

        let fy = this.food.x * w + w / 2;
        let fx = this.food.y * r + r / 2;
        // console.log(fx, fy);
        fill(255, 0, 0);
        noStroke();
        ellipse(fx, fy, w * 1.5 / 2, r * 1.5 / 2);


        fill(0, 255, 0);
        for (let i = 0; i < this.snake.length; i++) {
            if (i == 0) fill(3, 98, 0);
            else fill(10, 190, 0);

            let body = this.snake[i];
            rect(body[0] * w + 2, body[1] * r + 2, w - 4, r - 4);
        }
        
        if (this.addBody[0]==true){
            let x = this.addBody[1];
            let y = this.addBody[2];
            fill(227, 79, 79)
            rect(x * w + 2, y* r + 2, w - 4, r - 4);
        }

        pop()
    }

    createSnake() {
        this.snake = [];
        let x = floor((this.cols - 1) / 2);
        let y = floor((this.rows - 1) / 2);
        console.log(x, y);
        // console.log(x, y);
        this.snake.push([x, y, 'u']);
        this.tiles[y][x] = 1;
        y = y + 1;
        this.snake.push([x, y, 'u'])
        this.tiles[y][x] = 1;
        y = y + 1;
        this.snake.push([x, y, 'u'])
        this.tiles[y][x] = 1;

    }

    update(dir) {
        for (let i = this.snake.length - 1; i > 0; i--) {
            this.snake[i][2] = this.snake[i - 1][2];
        }
        this.snake[0][2] = dir;
    }
    addFood() {
        let x = floor(random(this.cols));
        let y = floor(random(this.rows));
        if (this.tiles[y][x] == 0) {
            this.food = { y, x };
        } else {
            this.addFood();
        }

    }

    moveSnake() {
        if (!this.gameOver) {
            for (let i = 0; i < this.snake.length; i++) {
                let body = this.snake[i];
                let x = body[0];
                let y = body[1];
                let dir = body[2];
                this.tiles[y][x] = 0
                if (dir == 'u') y = y - 1;
                if (dir == 'd') y = y + 1;
                if (dir == 'l') x = x - 1;
                if (dir == 'r') x = x + 1;



                if (x < 0) x = this.cols - 1;
                if (x > this.cols - 1) x = 0;
                if (y < 0) y = this.rows - 1;
                if (y > this.rows - 1) y = 0;
                if (this.tiles[y][x] == 1) {
                    console.log("gameOver");
                    this.gameOver = true;
                    break;
                }
                this.snake[i] = [x, y, dir];
                this.tiles[y][x] = 1
            }            
            
            let head = this.snake[0];
            if (head[0] == this.food.y && head[1] == this.food.x) {
                let x = this.food.y;
                let y = this.food.x;
                this.addFood();
                this.score = this.score + 1;
                let tail = this.snake[this.snake.length - 1];
                let dir = tail[2];
                this.addBody = [true, x, y, dir];
            }
            
            // console.log(this.addBody);
            // console.log(this.tiles[this.addBody[2]][this.addBody[1]]);
            // console.table(this.tiles);
            if (this.addBody[0] == true && this.tiles[this.addBody[2]][this.addBody[1]] == 0) {
                this.snake.push([this.addBody[1], this.addBody[2], this.addBody[3]]);
                // this.tiles[this.addBody[2]][this.addBody[2]] = 1;
                this.addBody[0] = false;
                console.log("now");
            }
            
        }
    }
}