
class Button {
    constructor(letter, x, y, r) {
        this.letter = letter;
        this.x = x;
        this.y = y;
        this.r = r;
    }
    
    pressed() {
        if (dist(mouseX, mouseY, this.x, this.y) <= this.r && mouseIsPressed) {
            return this.letter;
        }
        else
            return null;
    }
    
    draw(){
        push();
        
        fill(155);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r)
        fill(0)
        textAlign(CENTER)
        textSize(20)
        text(this.letter, this.x, this.y + this.r /7)
        pop();
    }
    
}



class Inputs {
    
    constructor() {
        this.letters = 'QWERTZUIO-ASDFGHJK=PYXCVBNML'
        this.buttonPressed = null; 
        this.buttons = [];
        this.r = 40
        let margin = 100
        let gap = (width - margin) / 9;
        let yGap = (height / 4) / 6;
        let x = margin/2 + gap/2
        let y = 2 * (height / 4) + yGap;
        
        for (const letter of this.letters) {
            if(letter == '-'){
                y += 2*yGap;
                x = margin/2 + gap;
            } else if(letter == '='){
                y += 2*yGap;
                x = margin/2 + gap/2;
            }else{
                this.buttons.push(new Button(letter, x, y, this.r))
                x += gap;
            }
        }
    }
    
    draw(){
        this.buttons.forEach(button => {
            if(this.buttonPressed == null)
                this.buttonPressed = button.pressed();
            button.draw();
        });
        console.log(this.buttonPressed);
    }
    
    
    
    
}