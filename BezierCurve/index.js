
let connections = [];
let wireInProgress = false;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  connections.push(new Connection(100, 100, "1"))
  connections.push(new Connection(400, 400, "2"))
}


function mouseClicked() {
  connections.forEach(connection => {

    if (connection.mouseIn) {
      connection.addWire()
      console.log("as");
    }
  });
}



function draw() {
  background(0);
  connections.forEach(connection => {

    connection.update()
    connection.draw()
  });

}