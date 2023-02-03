let p1 = { x: 0, y: 0 }
let p2 = { x: 0, y: 0 }
class Arrow {
  constructor(text, x1, y1, x2, y2, isFinal = false, arc = false, dist, fromBot) {
    this.arc = arc;
    this.text = text;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.isFinal = isFinal
    this.dist = arc ? dist : null;
    this.fromBot = arc ? fromBot : null;
    // if(arc)
      // console.log(this.dist, this.fromBot);
  }

  draw() {

    if (this.arc) {

      if (this.y1 < 0 || this.y2 < 0) {

      } else {
        if (this.x1 > this.x2) {
          p1.x = this.x1 - SPACE / 2;
          p2.x = this.x2 + SPACE / 2;
        } else {
          p1.x = this.x1 + SPACE / 2;
          p2.x = this.x2 - SPACE / 2;
        }
        if (this.fromBot) {
          p1.y = this.y1 + SPACE/2 + this.dist;
          p2.y = this.y2 + SPACE/2 + this.dist;
        } else {
          p1.y = this.y1 - SPACE/2 + this.dist;
          p2.y = this.y2 - SPACE/2 + this.dist;
        }

        push();
        stroke(255);
        strokeWeight(3);
        noFill();
        curve(this.x1, this.y1, this.x1, this.y1, p1.x, p1.y, p2.x, p2.y)
        curve(this.x1, this.y1, p1.x, p1.y, p2.x, p2.y, this.x2, this.y2)
        curve(p1.x, p1.y, p2.x, p2.y, this.x2, this.y2, this.x2, this.y2)
        pop()
      }

    } else {

      let m = (this.y2 - this.y1) / (this.x2 - this.x1);
      // drawArrow(createVector(this.x1, this.y1), createVector(this.x2 - this.x1, this.y2 -  this.y1), false, m, this.isFinal)
      push()
      stroke(255);
      strokeWeight(3);
      fill(255);
      // let v1 = createVector(this.x1, this.y1);
      // let v2 = createVector(this.x2, this.y2);
      // let d = dist(this.x1, this.y1, this.x2, this.y2)
      // let mp = map(RAD, 0, d, 0, 1, true)
      // let v3 = p5.Vector.lerp(v1, v2, mp);
      // let v4 = p5.Vector.lerp(v1, v2, 1-mp);
      line(this.x1, this.y1, this.x2, this.y2)
      let angle = atan2(this.y1 - this.y2, this.x1 - this.x2);
      // translate(v4.x, v4.y); //translates to the destination vertex
      translate((this.x2 + this.x1) / 2, (this.y2 + this.y1) / 2)
      rotate(angle - HALF_PI);
      triangle(-arrowSize * 0.5, arrowSize, arrowSize * 0.5, arrowSize, 0, -arrowSize / 2);
      pop()
      let x = (this.x2 + this.x1) / 2;
      let y = m * x - m * this.x1 + this.y1;
      noStroke()
      fill(255, 0, 0)
      textSize(25);
      textAlign(CENTER)

      if (m == 0)
        text(this.text, x + 5, y - 15)
      else if (m > 0)
        text(this.text, x + 15, y - 15)
      else if (m < 0)
        text(this.text, x - 15, y - 15)
      else
        text(this.text, x, y - 15)

    }
  }
}