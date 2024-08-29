const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Middleware
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
    console.log("Hello from Middleware1");
    req.myUserName = "Jane Doe";
    //return res.json({msg: "Hello from Middleware1"});
    next();
});

app.use((req,res,next)=>{
    console.log("Hello from Middleware2",req.myUserName);
    next();
    //return res.json({msg: "Hello from Middleware1"});
    next();
});

// GET /users - HTML Document Render
app.get('/users',(req,res)=>{
    const html = `
        <ul>
            ${users.map((user)=> `<li>${user.first_name}</li>`)}
        </ul>
    `
    return res.send(html);
});

// GET /api/users List all users JSON
app.get('/api/users',(req,res)=>{
    return res.json(users);
});

/*app.get('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);
    return res.json(user);
});
*/
app.route("/api/users/:id")
.get((req,res)=>{
    //Get user with ID
    const id = Number(req.params.id);
    const user = users.find((user)=>user.id === id);
    if(typeof(user) === 'undefined') {
        return res.status(404).json({status: "User not found",id});
    }
    else{
        return res.status(201).json({status: "SUCCESS",user});
    }
    
})
.patch((req,res)=>{
    //Edit user with ID
    const editId = Number(req.params.id);
    const editParams = req.body;
    const editUser = users.find((user)=>user.id === editId);
    if(Object.prototype.toString.call(editUser) === '[object Object]' && !Array.isArray(editUser)) {
        Object.assign(editUser, editParams);
        users[editId-1] = editUser;

        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
           return res.json({status: "SUCCESS",id: editId});
        });
    }
    else{        
        console.log("Failed: "+editId);
        return res.json({status: "Failed: Could not find ID", editId});
    }
})
.delete((req,res)=>{
    //Delete user with ID
    const id = Number(req.params.id);
    const userId = users.findIndex((user)=>user.id === id);
    users.splice(userId,1);
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status: "SUCCESS",id});
    });
})

app.post('/api/users',(req,res)=>{
    //To do: create new User
    const body = req.body;
    if(Object.prototype.toString.call(body) === '[object Object]' && !Array.isArray(body)) {
        users.push({...body,id: users.length+1});
        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
            return res.status(201).json({status: "SUCCESS",id: users.length});
        }); 
    }
    else{       
        console.log("Failed to create User");
        return res.json({status: "Failed to create User", body});
    }   
});


//POST /api/users - Create new User

//PATCH /api/users/id - Edit the user with given ID

//DELETE /api/users/id - Delete the user with given ID


app.listen(PORT,()=>{console.log(`Server started on port: ${PORT}`)});