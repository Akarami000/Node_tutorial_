const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json())
const Promo = require('../models/promo')
var authenticate = require('../authenticate')
var cors = require('./cors')

promoRouter.route('/')

.get(cors.cors,(req,res,next)=>{
    Promo.find({})
    .then((promo)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','applicaition/json')
        res.json(promo)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
Promo.create(req.body)
.then((promo)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json')
    res.json(promo)
},(err)=>next(err))
.catch((err)=>next(err))
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403
    res.end('the responce code is not suppoted')
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    Promo.remove({})
    .then((promo)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

promoRouter.route('/:PromoId')

.get(cors.cors,(req,res,next)=>{
    Promo.findById(req.params.PromoId)
    .then((promo)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','applicaition/json')
        res.json(promo)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
res.statusCode=403
console.log("Post operation not found")
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
 Promo.findByIdAndUpdate(req.params.PromoId,{$set:req.body},{new:true})
 .then((promo)=>{
     res.statusCode = 200
     res.setHeader('Content-Type','application/json')
     res.json(promo)
 },(err)=>next(err))
 .catch((err)=>next(err))
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    Promo.findByIdAndRemove(req.params.PromoId)
    .then((promo)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','application/json')
        res.json(promo)
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports = promoRouter;