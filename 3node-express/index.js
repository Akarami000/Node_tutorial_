const express = require('express')
const http = require('http')
const port= 3000
const hostname = 'localhost'
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const dishRouter = require('./routers/dishRouter')
const dishId = require('./routers/dishId')
const promoRouter = require('./routers/promoRouter')
const leaderRouter = require('./routers/leaderRouter')
app.use(morgan('dev'))
app.use(bodyParser.json())

// app.all('/dishes',(req,res,next)=>{
//     res.statusCode = 200
//     res.setHeader('Content-Type','text/html')
//     next()
// })
// app.get('/dishes',(req,res,next)=>{
//     res.end('will send all the dishis to you')
// })

// app.post('/dishes',(req,res,next)=>{
//     res.end('will add dish'+ req.body.name +'with detail'+req.body.description )
// })
// app.put('/dishes',(req,res,next)=>{
//     res.statusCode = 403
//     res.end('the responce code is not supported' )
// })
// app.delete('/dishes',(req,res,next)=>{
    
//     res.end('Deleting all the dishes' )
// })

/////////////////////id
// app.get('/dishes/:dishId',(req,res,next)=>{
//     res.end('will send detail of the dishis to you'+req.params.dishId+'to you')
// })

// app.post('/dishes/:dishId',(req,res,next)=>{
//     res.statusCode=403
//     res.end('POST operatin support on/dishes/'+req.params.dishId )
// })
// app.put('/dishes/:dishId',(req,res,next)=>{
//     res.write('updating the dish' +req.params.dishId +'\n')
//     res.end('will update the dish:' + req.body.name +"with details :"+req.body.discription)
// })
// app.delete('/dishes/:dishId',(req,res,next)=>{
    
//     res.end('Deleting dish :' + req.params.dishId)
// })
app.use('/leader',leaderRouter)
app.use('/promo',promoRouter)
app.use('/dishes',dishId)
app.use('/dishes',dishRouter)
app.use(express.static(__dirname +'/public'));
app.use((req,res,next)=>{
    // console.log((req.header))
    res.statusCode = 200
    res.setHeader('Content-Type','text/html')
    res.end('<html><body><h1>this is express server</h1></body></html>')

})

const server =http.createServer(app)
server.listen(port,hostname,()=>{
    console.log(`port start on ${hostname}:${port}`)
})