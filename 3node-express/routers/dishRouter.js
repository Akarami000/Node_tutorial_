const express = require('express')
const bodyParser= require('body-parser')
const dishRouter = express.Router()

dishRouter.use(bodyParser.json())

dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    next()
})
.get((req,res,next)=>{
    res.end('will send all the dishis to you')
})

.post((req,res,next)=>{
    res.end('will add dish'+ req.body.name +'with detail'+req.body.description )
})
.put((req,res,next)=>{
    res.statusCode = 403
    res.end('the responce code is not supported' )
})
.delete((req,res,next)=>{
    
    res.end('Deleting all the dishes' )
})

module.exports = dishRouter;