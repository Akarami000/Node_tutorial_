const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json())
const Leader = require('../models/leader')
var authenticate = require('../authenticate')
var cors = require('./cors')

leaderRouter.route('/')

.get(cors.cors,(req,res,next)=>{
    Leader.find({})
    .then((leader)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','applicaition/json')
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
Leader.create(req.body)
.then((leader)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json')
    res.json(leader)
},(err)=>next(err))
.catch((err)=>next(err))
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403
    res.end('the responce code is not suppoted')
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    Leader.remove({})
    .then((leader)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

leaderRouter.route('/:leaderId')

.get(cors.cors,(req,res,next)=>{
    Leader.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','applicaition/json')
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
res.statusCode=403
console.log("Post operation not found")
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
 Leader.findByIdAndUpdate(req.params.leaderId,{$set:req.body},{new:true})
 .then((leader)=>{
     res.statusCode = 200
     res.setHeader('Content-Type','application/json')
     res.json(leader)
 },(err)=>next(err))
 .catch((err)=>next(err))
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((leader)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})


module.exports = leaderRouter;