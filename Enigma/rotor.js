const reflector = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
let index;
let letter;
function letterToNumber(letter) {
    return letter.charCodeAt(0) - 65; 
}


class RotorButtons {
    constructor(x, y, r, text) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.text = text;
    }

    pressed() {
        if (dist(mouseX, mouseY, this.x, this.y) <= this.r && mouseIsPressed) {
            return true;
        }
        else
            return false;
    }

    draw() {
        push();

        fill(155);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r)
        fill(0)
        textAlign(CENTER)
        textSize(20)
        text(this.text, this.x, this.y + this.r / 7)
        pop();
    }
}


class Rotor {
    constructor(id, x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rotor = id;
        this.top = 0;
        this.up = new RotorButtons(this.x , this.y - height / 16, this.r, "+");
        this.down = new RotorButtons(this.x , this.y + height / 16, this.r, "-");
    }

    increment() {
        this.top = abs((this.top + 1) % 26);
    }
    decrement() {
        this.top--;
        if (this.top == -1)
            this.top = 25;
    }

    update() {
        if (this.up.pressed())
            this.increment();
        else if (this.down.pressed())
            this.decrement();
    }

    draw() {
        this.up.draw();
        this.down.draw();
        push();

        fill(155);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r)
        fill(0)
        textAlign(CENTER)
        textSize(20)
        text(this.rotor[this.top], this.x, this.y + this.r / 7)
        pop();


    }
}


class RotorBody {
    constructor(id1, id2, id3) {
        this.id1 = id1;
        this.id2 = id2;
        this.id3 = id3;
        this.r1 = new Rotor(id1[0], 3 * width / 4, height / 8, 40);
        this.r2 = new Rotor(id2[0], width / 2, height / 8, 40);
        this.r3 = new Rotor(id3[0], width / 4, height / 8, 40);
        this.out = null;
    }

    update() {
        this.r1.update();
        this.r2.update();
        this.r3.update();
    }

    draw(r1Input) {
        if (r1Input != null) {
            if (this.id1[0][this.r1.top] == this.id1[1]) {
                if (this.id1[0][this.r2.top] == this.id1[1]) {
                    this.r3.top++;
                }
                this.r2.top++;
            }
            this.r1.top++;
        
        
            index = letterToNumber(r1Input)
            letter = this.id1[0][(this.r1.top + index) % 26];
            index = letterToNumber(letter)
            letter = this.id2[0][(this.r2.top + index) % 26];
            index = letterToNumber(letter)
            letter = this.id2[0][(this.r3.top + index) % 26];
            index = letterToNumber(letter)
            letter = reflector[(index) % 26];
            index = letterToNumber(letter)
            letter = this.id2[0][(this.r3.top + index) % 26];
            index = letterToNumber(letter)
            letter = this.id2[0][(this.r2.top + index) % 26];
            index = letterToNumber(letter)
            letter = this.id1[0][(this.r1.top + index) % 26];
            this.out = letter;

        }
        this.r1.draw()
        this.r2.draw()
        this.r3.draw()
        
    }

}