const express = require('express');
const bodyParser = require('body-parser');
const dishId  = express.Router();

dishId.route('/:dishId')
.get((req,res,next)=>{
    res.end('will send detail of the dishis to you'+req.params.dishId+'to you')
})

.post((req,res,next)=>{
    res.statusCode=403
    res.end('POST operatin support on/dishes/'+req.params.dishId )
})
.put((req,res,next)=>{
    res.write('updating the dish' +req.params.dishId +'\n')
    res.end('will update the dish:' + req.body.name +"with details :"+req.body.discription)
})
.delete((req,res,next)=>{
    
    res.end('Deleting dish :' + req.params.dishId)
})
module.exports = dishId