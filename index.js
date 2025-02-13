const express = require('express');
const { resolve } = require('path');
const Mongoose = require("mongoose")
require("dotenv").config();
const User = require("./schema")

const app = express();
const port = 3010;
app.use(express.json());

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

const MONGO_URI = process.env.MONGO_URI;

Mongoose.connect(MONGO_URI)
.then(()=> console.log("Database successfully connected."))
.catch((err)=>console.log("Database failed to connect!",err))


//post request

app.post("/api/users", async (req, res)=>{
  try{
    const{name, email, password} = req.body;

    if (!name || !email || !password){
      return res.status(400).json({Message: "All fields are required."})
    }
    const newUser = new User({name, email, password})

    await newUser.save( )
    res.status(201).json({Message: "Successfully created data."})
  }
  catch(err){
    console.log("Error saving data",err);
    res.status(500).json({Message: "Internal Server Error."})
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
