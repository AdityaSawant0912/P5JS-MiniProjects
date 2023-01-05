let distanceMatrix = [];
let letter = [];
let allX = [];
let allY = [];
let belongsToCluster = [];
let clusterRadius = [];


class Graph {
  constructor(sclX, sclY, noOfClusters) {
    this.sclX = sclX;
    this.sclY = sclY;
    this.points = [];
    this.noOfClusters = noOfClusters;
    this.clusters = [];
    this.headings = ["Points", "X", "Y"]
    for (let i = 1; i <= this.noOfClusters; i++) {
      this.clusters.push([`C${i}`, 0, 0])
      this.headings.push(`C${i}`)
    }
    this.headings.push("Cluster")
    this.iterationCount = -1;
  }



  draw() {
    textAlign(CENTER)
    // Partition Line
    push()
    strokeWeight(4)
    stroke(51);
    line(GRAPH_SIZE, 0, GRAPH_SIZE, GRAPH_SIZE)
    pop()


    // Origin
    push()
    textSize(20)
    strokeWeight(1)
    text(0, GRAPH_GAP - GRAPH_GAP / 2.5, GRAPH_SIZE - GRAPH_GAP / 2.5)
    pop()

    // Vertical Lines

    push()
    let gap = GRAPH_SIZE - 2 * GRAPH_MARGIN - GRAPH_GAP;
    gap = gap / 10;
    let subGap = gap / 5;
    for (let i = 1; i <= 10; i++) {
      // MAIN LINES
      strokeWeight(2)
      stroke(80)
      line(GRAPH_GAP + gap * i, GRAPH_MARGIN, GRAPH_GAP + gap * i, GRAPH_SIZE - GRAPH_GAP)

      // SUB LINES
      for (let j = 1; j <= 5; j++) {
        strokeWeight(1)
        stroke(160)
        line(GRAPH_GAP + gap * i - subGap * j, GRAPH_MARGIN, GRAPH_GAP + gap * i - subGap * j, GRAPH_SIZE - GRAPH_GAP)
      }

      // TEXT
      textSize(20);
      strokeWeight(1)
      text(round(this.sclY * i, 2), GRAPH_GAP + gap * i, GRAPH_SIZE - GRAPH_GAP / 2.5)
    }
    pop()

    // Horizontal Lines
    push()
    for (let i = 1; i <= 10; i++) {
      // MAIN LINES
      strokeWeight(2)
      stroke(80)
      line(GRAPH_GAP, GRAPH_SIZE - GRAPH_GAP - gap * i, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_SIZE - GRAPH_GAP - gap * i)

      // SUB LINES
      for (let j = 1; j <= 5; j++) {
        strokeWeight(1)
        stroke(160)
        line(GRAPH_GAP, GRAPH_SIZE - GRAPH_GAP - gap * i + subGap * j, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_SIZE - GRAPH_GAP - gap * i + subGap * j)
      }

      // TEXT
      textSize(20);
      strokeWeight(1)
      text(round(this.sclX * i, 2), GRAPH_GAP / 2.5, GRAPH_SIZE - GRAPH_GAP - gap * i + GRAPH_MARGIN)
    }
    pop()


    // X Y lines
    push()
    strokeWeight(2.5)
    stroke(51)
    line(GRAPH_GAP, GRAPH_MARGIN, GRAPH_GAP, GRAPH_SIZE - GRAPH_MARGIN)
    line(GRAPH_MARGIN, GRAPH_SIZE - GRAPH_GAP, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_SIZE - GRAPH_GAP)
    pop()

    // draw Points

    if (this.points.length < 1)
      return;
    push()
    this.points.forEach(p => {
      let plotX = map(p[1], 0, this.sclX * 10, GRAPH_GAP, GRAPH_GAP + gap * 10)
      let plotY = map(p[2], 0, this.sclY * 10, GRAPH_SIZE - GRAPH_GAP, GRAPH_SIZE - GRAPH_GAP - gap * 10)

      stroke(51)
      strokeWeight(5)
      point(plotX, plotY)

      push()
      strokeWeight(1)
      noFill()
      circle(plotX, plotY, 10)
      pop()

      textSize(20);
      strokeWeight(1)

      let x = 15;
      let y = -5
      if (plotX > GRAPH_GAP + gap * 5)
        x = - x
      if (plotY < GRAPH_SIZE - GRAPH_GAP - gap * 5)
        y = - y * 4
      text(p[0], plotX + x, plotY + y)

    });

    pop()

    // draw clusters

    push()
    for (let i = 0; i < this.noOfClusters; i++) {
      stroke(70);
      strokeWeight(2);
      noFill();
      let x = map(this.clusters[i][1], 0, this.sclX * 10, GRAPH_GAP, GRAPH_GAP + gap * 10)
      let y = map(this.clusters[i][2], 0, this.sclY * 10, GRAPH_SIZE - GRAPH_GAP, GRAPH_SIZE - GRAPH_GAP - gap * 10)
      circle(
        map(this.clusters[i][1], 0, this.sclX * 10, GRAPH_GAP, GRAPH_GAP + gap * 10),
        map(this.clusters[i][2], 0, this.sclY * 10, GRAPH_SIZE - GRAPH_GAP, GRAPH_SIZE - GRAPH_GAP - gap * 10),
        map(2 * clusterRadius[i], 0, this.sclX * 10, GRAPH_GAP, GRAPH_GAP + gap * 10),
      )
    }
    pop()


  }

  addPoint(x, y) {
    let alpha = String.fromCharCode(64 + 1 + this.points.length)
    this.points.push([alpha, x, y])
    letter.push(alpha)
    allX.push(x)
    allY.push(y)
    distanceMatrix.push([])
  }

  drawTable() {

    push()
    stroke(51)
    strokeWeight(2);
    translate(GRAPH_SIZE, 0)
    // BOX
    line(GRAPH_SIZE - GRAPH_MARGIN, GRAPH_MARGIN, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_SIZE - GRAPH_MARGIN)
    line(GRAPH_MARGIN, GRAPH_MARGIN, GRAPH_MARGIN, GRAPH_SIZE - GRAPH_MARGIN)
    line(GRAPH_MARGIN, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_SIZE - GRAPH_MARGIN)
    line(GRAPH_MARGIN, GRAPH_MARGIN, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_MARGIN)

    // Vertical Lines
    let noOfColumns = 4 + this.noOfClusters
    let gapX = GRAPH_SIZE - 2 * GRAPH_MARGIN;
    gapX = gapX / noOfColumns
    for (let i = 0; i < noOfColumns + 1; i++) {
      line(GRAPH_MARGIN + gapX * (i + 1), GRAPH_MARGIN, GRAPH_MARGIN + gapX * (i + 1), GRAPH_SIZE - GRAPH_MARGIN)
    }

    // Horizontal Lines
    line(GRAPH_MARGIN, GRAPH_MARGIN + 100, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_MARGIN + 100)
    let gapY = GRAPH_SIZE - 2 * GRAPH_MARGIN - 100;
    gapY = gapY / this.points.length

    for (let i = 0; i < this.points.length; i++) {
      line(GRAPH_MARGIN, GRAPH_MARGIN + gapY * (i + 1) + 100, GRAPH_SIZE - GRAPH_MARGIN, GRAPH_MARGIN + gapY * (i + 1) + 100)
    }

    // Text Headings
    textSize(20);
    strokeWeight(1)
    for (let i = 0; i < this.headings.length; i++) {
      text(this.headings[i], GRAPH_MARGIN + (gapX * i) + gapX / 2, GRAPH_MARGIN + 50)
    }
    // Text Points X, Y

    for (let i = 0; i < this.points.length; i++) {
      textSize(20);
      strokeWeight(1)
      text(letter[i], GRAPH_MARGIN + (gapX * 0) + gapX / 2, GRAPH_MARGIN + 100 + (gapY * i) + gapY / 2)
      text(allX[i], GRAPH_MARGIN + (gapX * 1) + gapX / 2, GRAPH_MARGIN + 100 + (gapY * i) + gapY / 2)
      text(allY[i], GRAPH_MARGIN + (gapX * 2) + gapX / 2, GRAPH_MARGIN + 100 + (gapY * i) + gapY / 2)
    }

    if (this.iterationCount < 0)
      return
    // Text Dist from Clusters
    for (let i = 0; i < this.points.length; i++) {
      textSize(20);
      strokeWeight(1)
      for (let j = 0; j < this.noOfClusters; j++) {
        text(distanceMatrix[i][j], GRAPH_MARGIN + (gapX * 3) + (gapX * j) + gapX / 2, GRAPH_MARGIN + 100 + (gapY * i) + gapY / 2)

      }
    }

    // Cluster

    for (let i = 0; i < this.points.length; i++) {
      textSize(20);
      strokeWeight(1)
      text(belongsToCluster[i], GRAPH_SIZE - GRAPH_MARGIN - gapX / 2, GRAPH_MARGIN + 100 + (gapY * i) + gapY / 2)
    }



    pop()
  }

  iterate() {
    this.iterationCount++
    if (this.iterationCount == 0) {

      for (let i = 0; i < this.noOfClusters; i++) {
        this.clusters[i][1] = this.points[i][1]
        this.clusters[i][2] = this.points[i][2]
      }

    }
    belongsToCluster = [];
    for (let i = 0; i < this.points.length; i++) {
      distanceMatrix[i] = [];
      for (let j = 0; j < this.noOfClusters; j++) {
        distanceMatrix[i].push(round(dist(this.points[i][1], this.points[i][2], this.clusters[j][1], this.clusters[j][2]), 2))
      }
      belongsToCluster.push(this.clusters[distanceMatrix[i].indexOf(Math.min(...distanceMatrix[i]))][0])
    }
    // Calculate Mean

    let c = 0;
    let sumx = 0;
    let sumy = 0;
    clusterRadius = [];
    for (let cluster = 0; cluster < this.noOfClusters; cluster++) {
      clusterRadius.push(0);
      c = 0;
      sumx = 0;
      sumy = 0;
      for (let p = 0; p < this.points.length; p++) {
        if (belongsToCluster[p] == this.clusters[cluster][0]) {
          c++;
          sumx += this.points[p][1];
          sumy += this.points[p][2];
        }
      }

      this.clusters[cluster][1] = sumx / c;
      this.clusters[cluster][2] = sumy / c;

      for (let p = 0; p < this.points.length; p++) {
        if (belongsToCluster[p] == this.clusters[cluster][0]) {
          clusterRadius[clusterRadius.length - 1] = Math.max(dist(this.clusters[cluster][1], this.clusters[cluster][2], this.points[p][1], this.points[p][2]), clusterRadius[clusterRadius.length - 1])
        }
      }


    }

    console.log(this.clusters);
  }

}