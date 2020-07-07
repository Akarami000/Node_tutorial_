const mongoose = require('mongoose')
const Dishes = require('./models/dishes')
const url  = 'mongodb://localhost:27017/conFusion'
const connect = mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

connect.then((db)=>{
    console.log('connect correctly to the server')
    // var newDish = Dishes({
    //     name:"paprzi pizza",
    //     description:"loaded with sauges"
    // });
    // newDish.save()
    // .then((dish)=>{
    //     console.log(dish)
    //     return Dishes.find({})
    // })
    // .then((dishes)=>{
    //     console.log(dishes)
    //     return Dishes.remove({})
    // })
    // .then(()=>{
    //     return mongoose.connection.close();

    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    Dishes.create({
        name:"paprz pizza",
        description:"loaded with sauges"
    })
    .then((dish)=>{
        console.log(dish)
        return Dishes.findByIdAndUpdate(dish._id,{
            $set:{description:'Update test'}
        },{
            new:true
        })
    }).then((dish)=>{
        console.log(dish)
        dish.comments.push({
            rating:5,
            comment:"I\m getting a sinking feeling",
            author:"Ms jack"
        })
    })
    .then((dish)=>{
        console.log(dish)
        return Dishes.deleteOne({})
    })
    .then(()=>{
        return mongoose.connection.close();

    })
    .catch((err)=>{
        console.log(err);
    })
})
 