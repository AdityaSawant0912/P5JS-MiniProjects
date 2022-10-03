let boundary
let third, x, y, radius;
let b, err, x1, y1;
class Board {
    constructor() {
        this.board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.player = 1;
        third = width / 3;
        radius = 90;
        boundary = 10
    }

    win(n, type) {
        boundary = 30;
        push()
        stroke(255, 200);
        strokeWeight(5);
        if (type == 1) {
            x = third / 2 + n * third
            line(x, boundary, x, height - boundary)

        } else if (type == 2) {
            y = third / 2 + n * third
            line(boundary, y, width - boundary, y)

        } else if (type == 3) {
            line(boundary, boundary, width - boundary, height - boundary)
        } else if (type == 4) {
            line(width - boundary, boundary, boundary, height - boundary)
        }
        pop()
        noLoop();
    }

    check() {
        b = this.board;
        for (let i = 0; i < this.board.length; i++) {
            if (b[i][0] == b[i][1] && b[i][1] == b[i][2] && b[i][2] != 0) {
                this.win(i, 2);
            }
        }
        for (let j = 0; j < this.board.length; j++) {
            if (b[0][j] == b[1][j] && b[1][j] == b[2][j] && b[2][j] != 0) {
                this.win(j, 1);
            }
        }
        if (b[0][0] == b[1][1] && b[1][1] == b[2][2] && b[2][2] != 0) {
            this.win(-1, 3)
        } else if (b[0][2] == b[1][1] && b[1][1] == b[2][0] && b[0][2] != 0) {
            this.win(-1, 4)
        }
    }

    drawX(i, j, alpha) {
        x = third / 2;
        y = third / 2;
        push();
        noFill();
        stroke(255, alpha);
        strokeWeight(10);
        translate(x + j * third, y + i * third)
        line(cos(45) * radius, -cos(45) * radius, -cos(45) * radius, cos(45) * radius)
        line(-cos(45) * radius, -cos(45) * radius, cos(45) * radius, cos(45) * radius)
        pop();
    }

    drawO(i, j, alpha) {
        x = third / 2;
        y = third / 2;
        push();
        noFill();
        stroke(255, alpha);
        strokeWeight(8);
        circle(x + j * third, y + i * third, radius*1.2)
        pop();
    }

    draw() {
        // draw lines
        push();
        stroke(255, 200);
        strokeWeight(5);
        line(width / 3, 0 + boundary, width / 3, height - boundary);
        line(2 * width / 3, 0 + boundary, 2 * width / 3, height - boundary);
        line(0 + boundary, height / 3, width - boundary, height / 3);
        line(0 + boundary, 2 * height / 3, width - boundary, 2 * height / 3);
        pop();

        // Symbols
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                if (this.board[i][j] == 1) {
                    // draw X
                    this.drawX(i, j, 255)

                } else if (this.board[i][j] == -1) {
                    // draw O
                    this.drawO(i, j, 255)
                }
            }
        }
    }
    
    getIJ(mX, mY){
        // console.log(mX)
        if(0 < mX && mX < width && 0 < mY && mY < height){
            x = floor(map(mX, 0, width, 0, 3))
            y = floor(map(mY, 0, height, 0, 3))
            return [x, y, false]
        }else{
            return [-1, -1, true]
        }
    }

    update() {
        this.check();
        [y1, x1, err] = this.getIJ(mouseX, mouseY)
        if(!err){
            if(this.player == 1 && this.board[x1][y1] == 0){
                this.drawX(x1, y1, 150)
            }
            else if(this.player == -1 && this.board[x1][y1] == 0){
                this.drawO(x1, y1, 150)
            }
            if(mouseIsPressed && mouseButton == LEFT && this.board[x1][y1] == 0){
                this.board[x1][y1] = this.player
                this.player = -this.player
            }
            
        }
        
    }
}