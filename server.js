const mongoose = require("mongoose");
const express = require("express");
const bodyparser =require ("body-parser")
const app = express();
const user = require("./router/user.router")

const port = process.env.port || 4000;

app.listen(port,() => {console.log(`listening the port ${port}...`)});

const db = "mongodb+srv://RegisterDataBase:Venkat2610@@cluster0.lbuzi.mongodb.net/RegisterDatabase?retryWrites=true&w=majority";

mongoose.connect(db, {useNewUrlParser:true, useUnifiedTopology:true})
            .then(()=>{console.log(`connected to db`)})
            .catch(()=>{console.log(`Failed to connect db`)})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use("/api/user",user);
