const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json())

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    next()
})
.get((req,res,next)=>{
    res.end('will send all the promo')
})
.post((req,res,next)=>{
res.end('will add promo'+ req.body.name + 'with detail' + req.body.decription)
})
.put((req,res,next)=>{
    res.statusCode = 403
    res.end('the responce code is not suppoted')
})
.delete((req,res,next)=>{
    res.end('deleting all the promo')
})


module.exports = promoRouter;