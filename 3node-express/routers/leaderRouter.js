const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json())

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    next()
})
.get((req,res,next)=>{
    res.end('will send all the leader')
})
.post((req,res,next)=>{
res.end('will add leader'+ req.body.name + 'with detail' + req.body.decription)
})
.put((req,res,next)=>{
    res.statusCode = 403
    res.end('the responce code is not suppoted')
})
.delete((req,res,next)=>{
    res.end('deleting all the leader')
})


module.exports = leaderRouter;