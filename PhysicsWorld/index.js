let fps = 60;
let player;
let entities = [];
let collided = [];
function setup() {
  let canvas = createCanvas(900, 900);
  canvas.style('display', 'block')
  canvas.style('margin', 'auto');
  frameRate(fps)
  player = new Obj(width / 3, 100, 50, 50, 0, 0, 0, 0, fps);
  entities.push(new Entity(width / 2, height - 100, 100, 100))
}

function draw() {
  background(51);
  player.update()

  entities.forEach(entity => {
    if (player.isAABB(entity)) {
      collided.push(entity)
      console.log("Collided");

    }
  });
  // Sort Collided
  collided.sort((a, b) => { return a.distanceFromPlayer - b.distanceFromPlayer })

  collided.forEach(entity => {
    // player.resolve(entity)
  });


  entities.forEach(entity => {
    entity.draw();
  });
  player.draw()

}