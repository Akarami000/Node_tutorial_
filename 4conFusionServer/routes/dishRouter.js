var express = require('express')
var bodyParser= require('body-parser')
var dishRouter = express.Router()
var Dishes = require('../models/dishes')
var authenticate = require('../authenticate');
var cors = require('./cors')
dishRouter.use(bodyParser.json())
dishRouter.route('/')
// ////old
// .all((req,res,next)=>{
//     res.statusCode = 200
//     res.setHeader('Content-Type','text/html')
//     next()
// })

.get(cors.cors,(req,res,next) => {
    Dishes.find({})
    .populate('comments.author')
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOption,authenticate.verifyUser, (req, res, next)=>{
Dishes.create(req.body)
.then((dish)=>{
    console.log('Dish create',dish)
    res.statusCode =200 
    res.setHeader('Content-Type','application/json')
    res.json(dish)
},(err)=>next(err))
.catch((err)=>next(err))
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403
    res.end('Operation code is not supported' )
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader('Content-Type','applicaiton/json')
        res.json(resp)
    },(err)=>{next(err)})
    .catch((err)=>next(err))
})
 

dishRouter.route('/:dishId')
// ////old
// .all((req,res,next)=>{
//     res.statusCode = 200
//     res.setHeader('Content-Type','text/html')
//     next()
// })

.get(cors.corsWithOption,cors.cors,authenticate.verifyUser,(req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.auther')
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(dish)
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403
console.log('Post operation code not found')
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
 Dishes.findByIdAndUpdate(req.params.dishId,{$set:req.body},{new:true})
    .then((dish)=>{
        res.statusCode= 200
        res.setHeader('Content-Type','application/json')
        res.json(dish)
    },(err)=>next(err))
    .catch((err)=> next(err))
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp)=>{
        res.statusCode = 200
        res.setHeader = ('Content-Type','applicaiton/json')
        res.json(resp)
    },(err)=>{next(err)})
    .catch((err)=>next(err))
})


///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
dishRouter.route('/:dishId/comments')
// ////old
// .all((req,res,next)=>{
//     res.statusCode = 200
//     res.setHeader('Content-Type','text/html')
//     next()
// })

.get(cors.cors,(req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish)=>{
        if (dish != null){
            res.statusCode =200
            res.setHeader('Content-Type','application/json')
            res.json(dish.comments)
        }
        else{
            err = new Error('Dish' + req.params.dishId + 'not found');
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
Dishes.findById(req.params.dishId)
.then((dish)=>{
    if (dish != null){
        req.body.author=req.user._id
        dish.comments.push(req.body)
        dish.save()
        .then((dish)=>{
            Dishes.findById(dish._id)
            .populate('comment.author')
            .then((dish)=>{
                res.statusCode =200
                res.setHeader('Content-Type','application/json')
                res.json(dish)
            })
    },(err)=>next(err))
 }
    else{
        err = new Error('Dish' + req.params.dishId + 'not found');
        err.status = 404;
        return next(err);
    }
},(err)=>next(err))
.catch((err)=>next(err))
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403
    res.end('Operation code '+ req.params.dishId+'is not supported' )
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish != null){
            for(var i=(dish.comments.length-1); i>=0;i--){
                dish.comments.id(dish.comments[i]._id).remove()
            }
            dish.save()
            .then((dish)=>{
                res.statusCode =200
                res.setHeader('Content-Type','application/json')
                res.json(dish)
            },(err)=>next(err))
        }
        else{
            err = new Error('Dish' + req.params.dishId + 'not found');
        err.status = 404;
        return next(err);
        }
    },(err)=>{next(err)})
    .catch((err)=>next(err))
})
 

dishRouter.route('/:dishId/comments/:commentId')
.get(cors.cors,(req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish)=>{
        if(dish != null && dish.comments.id(req.params.commentId)!=null){
res.statusCode = 200
res.setHeader('Content-Type','application/json')
res.json(dish.comments.id(req.params.commentId))
        }
        else if(dish == null){
        err = new Error('Dish'+ req.params.dishId +'not found')
        err.status =404
        return next(err)
        }
        else{
            err = new Error('Comment'+req.params.commentId+"does not exists")
            err.status = 404
            return next(err)
        }
    },(err)=>next(err))
    .catch((err)=> next(err));
})

.post(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403
console.log('Post operation code not found'+req.params.dishId)
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
 Dishes.findById(req.params.dishId)
    .then((dish)=>{
     if(dish != null && dish.comments.id(req.params.commentId)!=null){
         if(req.body.rating){
             dish.comments.id(req.params.commentId).rating = req.body.rating

         }
         if (req.body.comment){
             dish.comments.id(req.params.commentId).comment = req.body.comment
         }
         dish.save()
         .then((dish)=>{
             Dishes.findById(dish._id)
             .populate('comments.author')
             .then((dish)=>{
                res.statusCode = 200
                res.setHeader('Content-Type','applicaiton/json')
                res.json (dish)
             })
             
         },(err)=>next(err))
     }
     else{
        err = new Error('Comment'+req.params.commentId+"does not exists")
        err.status = 404
        return next(err)
    }
    },(err)=>next(err))
    .catch((err)=> next(err))
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish)=>{
        if (dish != null && dish.comments.id(req.params.commentId) != null){
            dish.comments.id(req.params.commentId).remove()
            dish.save()
            .then((dish)=>{
                Dishes.findById(dish._id)
             .populate('comments.author')
             .then((dish)=>{
                res.statusCode = 200
                res.setHeader('Content-Type','applicaiton/json')
                res.json (dish)
             })
            },(err)=> next(err))
        }
        else if(dish==null){
            err = new Error('Dish'+ req.params.dishId +'not found')
        err.status =404
        return next(err)
        }
        else{
            err= new Error("Comment"+req.params.commentId+'not found')
            err.status = 404
            return next(err)
        }
    },(err)=>{next(err)})
    .catch((err)=>next(err))
})



module.exports = dishRouter;