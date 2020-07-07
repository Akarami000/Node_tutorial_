module.exports=(x,y,callback)=>{
    if (x <= 0 || y <= 0){
        setTimeout(()=>
        callback(new Error("the length and breath of the rectangle should be greater then 0"),null),2000);

        
    }
    else{
        setTimeout(()=>
        callback(null,{
            perimeter :() => (2*(x+y)),
            area : () => (x*y)
        }),2000);


    }
}

// old
// exports.perimeter =(x,y) => (2*(x+y))
// exports.area = (x,y) => (x*y)



