const http = require("http");
const path = require("path");
const fs = require("fs");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req,res)=>{
    console.log("Request for "+req.url);
    if(req.method == "GET"){
        var fileurl;
        if(req.url == "/") fileurl = "/index.html";
        else fileurl = req.url;
        var filepath = path.resolve("./public/"+fileurl);
        console.log(filepath);
        const fileext = path.extname(filepath);
        if(fileext == ".html"){
            if(fs.existsSync(filepath)){
                res.statusCode = 200;
                res.setHeader("Content-Type","text/html");
                fs.createReadStream(filepath).pipe(res);
            }
            else{
                res.statusCode = 404;
                res.setHeader("Content-Type","text/html");
                res.end("<html><body><h1>Error 404:"+fileurl+" not found!</h1></body></html>")
            }
        }
        else{
            res.statusCode = 404;
                res.setHeader("Content-Type","text/html");
                res.end("<html><body><h1>Error 404:"+fileurl+" not a HTML file!</h1></body></html>")
        }
    }
    else{
        res.statusCode = 404;
                res.setHeader("Content-Type","text/html");
                res.end("<html><body><h1>Error 404:"+ req.method +" not supported!</h1></body></html>")
    }
});

server.listen(port,hostname,()=>{
    console.log(`HTTP server started at http://${hostname}:${port}`);
})