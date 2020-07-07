var express = require('express')
var bodyParser= require('body-parser')
var uploadRouter = express.Router()
var cors = require('./cors')
// var Dishes = require('../models/dishes')
var authenticate = require('../authenticate');
const multer= require("multer")
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{

        cb(null,file.originalname)
    }
})

const imageFileFilter  = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error('you can only upload only image files!'),false)
    }
    cb(null,true)
}

const upload = multer({storage:storage,fileFilter:imageFileFilter})
uploadRouter.use(bodyParser.json())
uploadRouter.route('/')

.post(cors.corsWithOption,authenticate.verifyUser,upload.single('imageFile'),(req,res)=>{
    res.statusCode = 200
    res.setHeader('Content-Type','application/json')
    res.json(req.file)
})

.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403
    res.end(' GET Operation code is not supported' )
})
.put(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403
    res.end('PUT Operation code is not supported' )
})
.delete(cors.corsWithOption,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403
    res.end(' DELETE Operation code is not supported' )
})



module.exports = uploadRouter;


