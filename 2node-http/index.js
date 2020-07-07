const http =require('http')
const hostname = 'localhost'
const port = 3000
const path = require('path')
const  fs = require("fs")

const server = http.createServer((req,res)=>{
  if (req.method == 'GET'){
    var fileUrl;
    if(req.url=='/')fileUrl='./index.html'
    else fileUrl = req.url
    var filePath = path.resolve('./public'+fileUrl)
    const fileExt =path.extname(filePath)

    if (fileExt == '.html'){
      fs.exists(filePath,(exists)=>{
        if(!exists){
          res.statusCode=404
          res.setHeader('Content-Type','text/html')
          res.end('<html><body><h1>Error code: 404 Not found'+ fileUrl+'</h1></body></html>')
        return;
        }
        res.statusCode=200
        res.setHeader('Content-Type','text/html')
        fs.createReadStream(filePath).pipe(res)

      })
    }
    else{
      res.statusCode=404
          res.setHeader('Content-Type','text/html')
          res.end('<html><body><h1>Error code: 404 Not html file'+ fileUrl+'</h1></body></html>')
        return;
    }


  }
  else{
    res.statusCode=404
          res.setHeader('Content-Type','text/html')
          res.end('<html><body><h1>Error code: 404 Not found requset method:'+ req.method+'</h1></body></html>')
        return;
  }

})


server.listen(port,hostname,()=>{
    console.log(`server run on ${hostname}:${port}`)

})