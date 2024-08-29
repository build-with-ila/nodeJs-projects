const fs = require("fs");

/*fs.writeFileSync("./text.js","Hey,there!!");
fs.writeFile("./text.js","Hello Everyone!!", (err)=>{});
fs.readFile("./text.js","utf-8", (err,result)=>{
    if(err){
        console.log("Error: "+err);
    }
    else{
        console.log(result);
    }
});
*/

fs.appendFileSync("./text.js",`\n`+new Date().getDate().toLocaleString()+`\n`, (err)=>{});

fs.appendFile("./text.js",`${Date.now()}\n`, (err)=>{});
const fileContents = fs.readFileSync("./text.js","utf-8");
console.log(fileContents);


