const rectangle = require("./rectangle");
var rect = require("./rectangle");
const solveRect = (x,y) =>{
    console.log("Solving for rect l = "+x+" b = "+y);
    rect(x,y,(error, rectangle)=>{
        if(error){
            console.log(error.message);
        }
        else{
            console.log("perimeter of rectangle with l = "+x+" b = "+y+" is = "+rectangle.perimeter());
            console.log("Area of rectangle with l = "+x+" b = "+y+" is = "+rectangle.area());
        }
        console.log("The statement is at the end of solveRect xD");
    })
}
solveRect(0,3);
solveRect(4,6);