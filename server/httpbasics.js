const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req,res)=>{    
    //const dateTimeStr = new Date().getDate().toLocaleString();
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.method} ${req.url} New Request Received\n`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);

    fs.appendFile("log.txt",log,(err,data)=>{            
        switch(myUrl.pathname){
            case '/':
                if(req.method === 'GET') res.end("Home Page");
            break;
            case '/about':  
                const username = myUrl.query.myName;
                res.end(`Hi,${username}`);
            break;
            case '/search':
                const search = myUrl.query.user_id;
                res.end('Here are search results: '+search);
            break;
            case '/signup':
                if(req.method === 'GET') res.end("This is a signup form");
                else if(req.method === 'POST'){
                    //DB QUERY
                    res.end('Success');
                }
            break;
            default:    res.end("Error: HTTP 404: File Not Found");
        }
    });
    //console.log(req.headers);    
});
myServer.listen(8000,()=>{console.log("Server started on port: 8000")});