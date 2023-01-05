const GRAPH_SIZE = 700;
const GRAPH_GAP = 40;
const GRAPH_MARGIN = 10;
const TABLE_SIZE = 400;
let graph;

function restart() {
  distanceMatrix = [];
  letter = [];
  allX = [];
  allY = [];
  belongsToCluster = [];
  clusterRadius = [];
  graph = new Graph(1, 1, 3);
  // graph.addPoint(2, 10)
}

function itr () {
  if(graph.points.length > 0 && graph.noOfClusters > 0)
  graph.iterate()
}

document.getElementById("noOfClusters").onchange = () => {

  let points = graph.points
  graph = new Graph(graph.sclX, graph.sclY, parseInt(document.getElementById("noOfClusters").value))
  graph.points = points;
}

document.getElementById("sclX").onchange = () => {
  graph.sclX = round(parseFloat(document.getElementById("sclX").value), 2)
}
document.getElementById("sclY").onchange = () => {
  graph.sclY = round(parseFloat(document.getElementById("sclY").value), 2)
}

document.getElementById("points").onchange = () => {
  let str = document.getElementById("points").value
  str = `[${str}]`
  graph.points = [];
  distanceMatrix = [];
  letter = [];
  allX = [];
  allY = [];
  console.log(str);
  try {
    arr = eval(str)
    console.log(arr);
    arr.forEach(p => {
      graph.addPoint(p[0], p[1])
    });
  } catch (error) {
    console.log(error);
  }
}



function setup() {
  createCanvas(GRAPH_SIZE * 2, GRAPH_SIZE);
  restart()

}

function draw() {
  background(204);
  graph.draw()
  graph.drawTable()
}