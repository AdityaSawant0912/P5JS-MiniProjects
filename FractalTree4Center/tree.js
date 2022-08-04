

class Tree {
    
    constructor(){
        
        this.currDepth = 0;
        console.log("created" + len);
        this.branches = [];
        this.branches.push(new Branch(new createVector(width / 2, height), new createVector(width / 2, height-len)));
        this.calculateTree();
    }
    
    
    calculateTree(){
        for (let i = this.branches.length -1; i >=0; i--) {
            if(!this.branches[i].hasBranches){
                this.branches.push(this.branches[i].createBranchRight());
                this.branches.push(this.branches[i].createBranchLeft());
                this.branches[i].hasBranches = true;
            }
        }
        this.currDepth++;
        if(this.currDepth < depthVal){
            this.calculateTree();
        }
    }
    
    draw(){
        this.branches.forEach(branch => {
            branch.show();
        });
    }
}

