

class Tree {
    
    constructor(){
        
        this.currDepth = 0;
        console.log("created" + len);
        this.branches = [];
        this.branches.push(new Branch(new createVector(width / 2, height - len), new createVector(width / 2, height - 2 * len), depthVal));
        // this.calculateTree();
    }
    
    
    calculateTree(){
        for (let i = this.branches.length -1; i >=0; i--) {
            if(!this.branches[i].hasBranches){
                this.branches.push(this.branches[i].createBranchRight());
                this.branches.push(this.branches[i].createBranchLeft());
                this.branches[i].hasBranches = true;
            }
        }
    }
    
    draw(){
        this.branches.forEach(branch => {
            branch.show();
        });
        if(this.currDepth < depthVal && this.branches[this.branches.length -1].animate == false){
            this.calculateTree();
            this.currDepth++;
        }
    }
}

