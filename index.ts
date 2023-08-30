//Functions in typescript

//This function takes in two numbers and returns the sum of them.
function addTwoNums(a: number, b: number): number{
    if(a == 0) return b;
    else if(b == 0) return a;
    return a + b;
}

console.log(addTwoNums(5,6));