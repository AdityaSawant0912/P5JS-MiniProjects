
//Inputs
function func(x){
    return (Math.pow(x, 2) - 6 * x + 15);
}
let a = 0;
let b = 4;


// Iterations
const GR = (Math.sqrt(5) - 1) / 2;
const ITERATIONS = 30
for (let i = 0; i < ITERATIONS; i++) {
    let d = GR * (b - a)
    let x1 = a + d;
    let x2 = b - d;
    let fx1 = func(x1);
    let fx2 = func(x2);
    
    // Conditions
    if(fx1 < fx2){
        a = x2;
    }else if (fx1 > fx2){
        b = x1;
    }
}

// Outputs
console.log("Average X: " + (a+b)/2);
console.log("Average Y: " + (func(a)+func(b))/2);


