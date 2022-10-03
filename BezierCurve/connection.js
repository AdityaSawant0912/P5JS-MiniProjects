let r = 30

class Connection {
    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.mouseIn = false;
        this.wires = [];
        this.wireCount = 0;
    }

    addWire() {
        console.log("asd");
        this.wires.push(new Wire(this.x, this.y, this.wireCount));
        this.wireCount++;
    }

    update() {
        this.mouseIn = dist(this.x, this.y, mouseX, mouseY) <= r ? true : false
    }

    draw() {
        push();
        fill(255, 100);
        stroke(2);
        strokeWeight(2);
        circle(this.x, this.y, r);
        pop();
        this.wires.forEach(wire => {
            wire.draw();
        });

    }
}