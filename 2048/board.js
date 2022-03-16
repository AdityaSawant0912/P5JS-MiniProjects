class Board {
  constructor(cols, rows, w, h) {
    this.grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.grid[i] = new Array(cols);
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.grid[i][j] = new Tile(i, j, w, h);
      }
    }
  }

  show() {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        this.grid[i][j].show();
      }
    }
  }
  
  updateTile(i, j, power) {
    this.grid[i][j].power += power;
  }
  
  isFree(){
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if(this.grid[i][j].power == 0) return true;
      }
    }
    return false;
  }
  
  
  addTile(){
    if(!this.isFree())
      return;
    let i = floor(random(0, cols));
    let j = floor(random(0, rows));
    if(this.grid[i][j].power === 0){
      this.updateTile(i, j, floor(random(1, 3)));
    }else{
      this.addTile();
    }
  }
  
  moveUp(){
    for (let i = cols-1; i >= 0; i--) {
      for (let j = rows-1; j >= 1; j--) {
        let tile = this.grid[i][j];
        if(tile.power != 0){
          let prev = this.grid[i][j-1];
          if(prev.power === 0){
            prev.power += tile.power;
            tile.power = 0;
          }else if(prev.power === tile.power){
            prev.power += 1;
            tile.power = 0;
          }
        }
      }
    }
  }
  
  moveDown(){
    for (let i = 0; i < cols; i++) {
      for (let j = rows-2; j >= 0; j--) {
        let tile = this.grid[i][j];
        if(tile.power != 0){
          let prev = this.grid[i][j+1];
          if(prev.power === 0){
            prev.power += tile.power;
            tile.power = 0;
          }else if(prev.power === tile.power){
            prev.power += 1;
            tile.power = 0;
          }
        }
      }
    }
  }
  
  moveRight() {
    for (let i = 0; i < cols-1; i++) {
      for (let j = 0; j < rows; j++) {
        let tile = this.grid[i][j];
        if(tile.power != 0){
          let prev = this.grid[i+1][j];
          if(prev.power === 0){
            prev.power += tile.power;
            tile.power = 0;
          }else if(prev.power === tile.power){
            prev.power += 1;
            tile.power = 0;
          }
        }
        
      }
    }
  }
  
  moveLeft() {
    for (let i = cols-1; i >= 1; i--) {
      for (let j = 0; j < rows; j++) {
        let tile = this.grid[i][j];
        if(tile.power != 0){
          let prev = this.grid[i-1][j];
          if(prev.power === 0){
            prev.power += tile.power;
            tile.power = 0;
          }else if(prev.power === tile.power){
            prev.power += 1;
            tile.power = 0;
          }
        }
        
      }
    }
  }
  
}
