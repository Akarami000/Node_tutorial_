var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// var auth = require('auth')
var session = require('express-session')
var FileStore = require('session-file-store')(session);
var passport = require('passport')
var config = require('./config');
var uploadRouter = require('./routes/uploadRouter')
 
var authenticate = require('./authenticate')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter')
var promoRouter = require('./routes/promoRouter')
var leaderRouter = require('./routes/leaderRouter')
var favoriteRouter = require('./routes/favoriteRouter');

var app = express();
var Dishes = require('./models/dishes')
var  mongoose = require('mongoose')
const url = config.mongoUrl;
var connect = mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })

app.all('*',(req,res,next)=>{
  if(req.secure){
    return next()
  }
  else{
    res.redirect(307,'https://'+req.hostname+":"+app.get('secPort')+req.url)
  }
})

connect.then((db)=>{
  console.log('connection correctly to  the server')
},(err)=>console.log(err))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(''12345-67890-098264));

// app.use(session({
//   name:'session-id',
//   secret:'12345-67890-098264',
//   saveUninitialized:false,
//   resave:false,
//   store:new FileStore()
// }))

app.use(passport.initialize())
// app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter)
app.use('/leader',leaderRouter)
app.use('/promo',promoRouter)
app.use('/imageUpload',uploadRouter)
app.use('/favorites', favoriteRouter);

// app.use(auth)
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

 

//  function auth(req,res,next){
//   console.log(req.user)
//   // if (!req.signedCookies.user){
//     if (!req.user){
//   // var authHeader = req.headers.authorization;
//   // if(!authHeader){
//     var err = new Error('you are not authenticated')
//     // res.setHeader('WWW-Authenticate','Basic')
//     err.status = 403  
//     return next(err)
    
//   // // }
//   // var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':')
//   // var user = auth[0]
//   // var pass = auth[1]

//   // if (user == 'admin' && pass == 'password') {
//   //       // res.cookie('user','admin',{signed: true});
//   //       req.session.user = 'admin'
//   //       next(); // authorized
//   //   }
//   // else{
//   //   var err = new Error('you are not authenticated')
//   //   res.setHeader('WWW-Authenticate','Basic')
//   //   err.status = 401
//   //   next(err)
//   // }
// }
// else {
// ///////////old
//   // if (req.session.user === 'authenticated') {
//       //     next();
//       // }
//       // else {
//       //     var err = new Error('You are not authenticated!');
//       //     err.status = 403;
//       //    return next(err);
//       // }
//       next();
// }
// }

// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; 
