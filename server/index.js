const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;
//Connection
mongoose
.connect('mongodb://127.0.0.1:27017/testMongoDB')
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo Error",err));

//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
} , {timestamps: true});

const User = mongoose.model('user', userSchema);

//Middleware
app.use(express.urlencoded({extended: false}));

/*app.use((req,res,next)=>{
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
});*/

// GET /users - HTML Document Render
app.get('/users',async(req,res)=>{
    const allDbUsers = await User.find({});
    const html = `
        <ul>
            ${allDbUsers.map((user)=> `<li>${user.firstName}</li> - ${user.email}`).join("")}
        </ul>
    `
    return res.status(201).send(html);
});

// GET /api/users List all users -JSON
app.get('/api/users',async(req,res)=>{
    const allDbUsers = await User.find({});
    return res.status(201).json(allDbUsers);
});

// GET /api/users/:id List user for given ID -JSON

app.route("/api/users/:id")
.get(async(req,res)=>{
    //Get user with ID
    const user = await User.findById(req.params.id);
    if(!user)return res.status(404).json({error: "User not found",user});
    return res.status(201).json({status: "SUCCESS",user});
    
})

//PATCH /api/users/id - Edit the user with given ID -JSON

.patch(async(req,res)=>{
    //Edit user with ID
    await User.findByIdAndUpdate(req.params.id,{ lastName: "Changed"});
    return res.json({status: "SUCCESS"});
})

//DELETE /api/users/id - Delete the user with given ID

.delete(async(req,res)=>{
    //Delete user with ID
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "SUCCESS"});
})

//POST /api/users - Create new User
app.post('/api/users',async(req,res)=>{
    //To do: create new User
    const body = req.body;

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        console.log("All fields are req...");
        res.status(400).json({msg: "All fields are req...", body});
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    return res.status(201).json({msg: "SUCCESS"});
});

app.listen(PORT,()=>{console.log(`Server started on port: ${PORT}`)});