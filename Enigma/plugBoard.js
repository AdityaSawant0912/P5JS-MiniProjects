


class Port {
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
        text(this.letter, this.x, this.y - this.r /7)
        pop();
    }
    
}



class PlugBoard {
    
    constructor() {
        this.letters = 'QWERTZUIO-ASDFGHJK=PYXCVBNML'
        this.ports = [];
        this.connections = [];
        this.connected = [];
        this.curr = null;
        this.r = 40
        let margin = 100
        let gap = (width - margin) / 9;
        let yGap = (height / 4) / 6;
        let x = margin/2 + gap/2
        let y = 3 * (height / 4) + yGap;
        
        for (const letter of this.letters) {
            if(letter == '-'){
                y += 2*yGap;
                x = margin/2 + gap;
            } else if(letter == '='){
                y += 2*yGap;
                x = margin/2 + gap/2;
            }else{
                this.ports.push(new Port(letter, x, y, this.r))
                x += gap;
            }
        }
    }
    
    draw(){
        console.log(this.curr);
        console.log(this.connections);
        this.ports.forEach(p => {
            
            if(p.pressed() != null && this.connections.length < 20){
                if(this.curr != null){
                    this.connections.push([this.curr, p.pressed()])
                    this.connections.push([p.pressed(), this.curr])
                    this.connected.push(this.curr)
                    this.connected.push(p.pressed())
                    this.curr = null;
                }else if (!this.connected.includes(p.pressed())){
                    this.curr = p.pressed();
                }
            }
            
            p.draw();
        });
        this.connections.forEach(c => {
            this.ports.forEach(p1 => {
                if (p1.letter == c[0]) {
                    this.ports.forEach(p2 => {
                        if (p2.letter == c[1]) {
                            push()
                            strokeWeight(5);
                            fill(146, 110, 81);
                            line(p1.x, p1.y, p2.x, p2.y);
                            pop()
                        }
                    });
                }
            });
        });
    }
    
    
    
    
}