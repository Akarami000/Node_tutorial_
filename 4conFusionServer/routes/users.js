var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var User = require('../models/user')
var passport = require('passport')
var authenticate = require('../authenticate');
var cors = require('./cors')
router.use(bodyParser.json())



/* GET users listing. */
router.get('/',cors.corsWithOption,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  User.find({},(err,user)=>{

    if(err){
      return next(err)
    }
    else{
      status
    }
  })


})

// router.post('/signup',(req,res,next)=>{
//   // User.findOne({username:req.body.username}) ///old
//   User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
//       if (err){
//       res.statusCode = 500
//       res.setHeader('Content-Type','applicaition/json')
//       res.json({err:err})
//       }
//       else{
//         passport.authenticate('local')(req,res,()=>{
//           res.statusCode = 200
//           res.setHeader('Content-Type','applicaition/json')
//           res.json({success:true,status:"Registration Successfull"})
//         })
  
//       }
//   })
// })
////////////////////////////////////////
//   .then((user)=>{
//     if (user != null){
//       var err = new Error('User'+ req.body.username + ' already exist')
//       err.status=403
//       next(err)
//     }
//     else{
//       return User.create({
//         username:req.body.username,
//         password:req.body.password})

//     }
//   })
//   .then((user)=>{
//     res.statusCode = 200
//     res.setHeader('Content-Type','application/json');
//     res.json({status:'Regrestration Successful',user:user})
//   },(err)=>next(err))
//   .catch((err)=> next(err))
// });

////////////////old and without passport 
// router.post('/login',(req,res,next)=>{
//   if (!req.session.user){
//     var authHeader = req.headers.authorization;
//     if(!authHeader){
//       var err = new Error('you are not authenticated')
//       res.setHeader('WWW-Authenticate','Basic')
//       err.status = 401
//       return next(err)
      
//     }
//     var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':')
//     var username = auth[0]
//     var password = auth[1]
  
//     User.findOne({username:username})
//   .then((user)=>{
//     if(user === null){
//       var err = new Error("User"+ username + "does not exit")
//       err.status = 403
//       return next(err)
//     }
//     else if(user.password !== password){
//     var err = Error("your password is in correct")
//     err.status= 403
//     return next(err)}
//     else if(user.username === username && user.password === password){
//       req.session.user = 'authentication'
//       res.statusCode = 200
//       res.setHeader('Content-Type','application/json')
//       res.end('you are authenticated')
//     }
//   }).catch((err)=> next(err))
//   }
//   else{
//     res.statusCode = 200;
//     res.setHeader('Content-Type','application/json')
//     res.end('You are already authenticated')
//   }
// })

router.post('/signup',cors.corsWithOption, (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});


router.post('/login',cors.corsWithOption, passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout',cors.corsWithOption,(req,res)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/')
  }
  else{
    var err = new Error('you are not log in!')
    err.status = 403
    next(err)
  }
})


module.exports = router;
