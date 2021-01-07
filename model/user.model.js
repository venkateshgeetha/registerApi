const mongoose = require("mongoose");

const user = new mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName :{
        type : String,
        required : true
    },
    email :{
        type : String,
        required : true
    },
    mobileNumber :{
        type : Number,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    confirmPassword :{
        type : String,
        required : true
    },
    token : {
        type : String
    }
});

module.exports = mongoose.model("user",user);