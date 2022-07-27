
class Bulb {
    constructor(letter, x, y, r) {
        this.letter = letter;
        this.x = x;
        this.y = y;
        this.r = r;
        this.lit = false;
    }
    
    draw(){
        push();
        fill(155);
        if(this.lit)
            fill(242,232,79)
        noStroke();
        ellipse(this.x, this.y, this.r, this.r)
        fill(0)
        textAlign(CENTER)
        textSize(20)
        text(this.letter, this.x, this.y + this.r /7)
        pop();
    }
    
}



class Bulbs {
    
    constructor() {
        this.letters = 'QWERTZUIO-ASDFGHJK=PYXCVBNML'
        this.bulbLit = null; 
        this.bulb = [];
        this.r = 40
        let margin = 100
        let gap = (width - margin) / 9;
        let yGap = (height / 4) / 6;
        let x = margin/2 + gap/2
        let y = 1 * (height / 4) + yGap;
        
        for (const letter of this.letters) {
            if(letter == '-'){
                y += 2*yGap;
                x = margin/2 + gap;
            } else if(letter == '='){
                y += 2*yGap;
                x = margin/2 + gap/2;
            }else{
                this.bulb.push(new Bulb(letter, x, y, this.r))
                x += gap;
            }
        }
    }
    
    draw(){
        this.bulb.forEach(b => {
            if (this.bulbLit == b.letter)
                b.lit = true;
            else
                b.lit = false;
            b.draw();
        });
    }
    
    
    
    
}