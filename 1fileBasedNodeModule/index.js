/////////  old
// var react={
//     area:()=>(l*b),
//     perimeter:()=>(2*(l+b))
// }
var rect  = require('./rectangle')

function solveRect(l,b){
    rect(l,b,(err,rectangle)=>{
        if(err){
            console.log('ERROR:',err.message)
        }
        else{
            console.log("the area of reactangle of dimension " + l + " and " + b + " is " + rectangle.area())
            console.log("the perimeter of reactangle of dimension " + l + " and " + b + " is " + rectangle.perimeter() )

        }
    })
}

solveRect(1,2)
solveRect(3,4)
solveRect(7,8)
solveRect(-1,7)