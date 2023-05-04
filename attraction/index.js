let CONSTANTS = {
  yellow: {
    yellow: 1,
    red: 1,
    blue: 1,
    white: 1,
  }
}
let yellow, red, green, white, cells = []


function createGroup(color, count) {
  let cs = []
  for (let i = 0; i < count; i++) {
    let cell = { x: 0, y: 0, vx: 0, vy: 0, color: color }
    cell.x = floor(random(50, width - 50))
    cell.y = floor(random(50, height - 50))
    cell.vx = 0
    cell.vy = 0
    cs.push(cell)
    cells.push(cell)
  }
  return cs
}

function gap(G = 0.5) {
  cells.forEach(cell1 => {
    let fx = 0
    let fy = 0

    cells.forEach(cell2 => {


      let dx = cell1.x - cell2.x
      let dy = cell1.y - cell2.y
      let d = sqrt(dx * dx + dy * dy)
      if (d > 0 && d < 40) {
        let F = G * 1 / d;
        fx += (F * dx)
        fy += (F * dy)
      }

    })
    cell1.vx = (cell1.vx + fx) * 0.05
    cell1.vy = (cell1.vy + fy) * 0.05
    cell1.x += cell1.vx
    cell1.y += cell1.vy

    if (cell1.x <= 50 || cell1.x >= width - 50) cell1.vx *= -1
    if (cell1.y <= 50 || cell1.y >= height - 50) cell1.vy *= -1

  });
}
function rule(group1, group2, G) {
  group1.forEach(cell1 => {
    let fx = 0
    let fy = 0

    group2.forEach(cell2 => {
      let dx = cell1.x - cell2.x
      let dy = cell1.y - cell2.y
      let d = sqrt(dx * dx + dy * dy)
      if (d > 0 && d < 100) {
        let F = (G * 1) / (d);
        fx += (F * dx)
        fy += (F * dy)
      }
    })
    cell1.vx = (cell1.vx + fx) * 0.5
    cell1.vy = (cell1.vy + fy) * 0.5
    cell1.x += cell1.vx
    cell1.y += cell1.vy

    if (cell1.x <= 50 || cell1.x >= width - 50) cell1.vx *= -1
    if (cell1.y <= 50 || cell1.y >= height - 50) cell1.vy *= -1

  });
}

function setup() {
  createCanvas(800, 800);

  yellow = createGroup(color(255, 255, 0), 500)
  red = createGroup(color(255, 0, 0), 500)
  // green = createGroup(color(0, 255, 0), 500)
}

function draw() {
  background(51);
  // draw Cells
  cells.forEach(cell => {
    push()
    fill(cell.color)
    noStroke()
    circle(cell.x, cell.y, 7)
    pop()
  });

  // update
  // apply rules


  // rule(red, red, -0.4)
  // rule(green, green, -0.4)
  // rule(yellow, yellow, -0.4)
  // rule(red, green, -0.1)
  // rule(green, yellow, -0.1)
  // rule(yellow, red, -0.1)
  rule(red, red, -1)
  rule(yellow, red, -0.001)
  gap()
  

}