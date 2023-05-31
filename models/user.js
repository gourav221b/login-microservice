const mongoose = require("mongoose");

const userSchema= new mongoose.Schema(
{
    username:
    {
        type:String,
        unique:true,
        required:true
    },
    password:
    {
        type:String,
        unique:false,
        required:true
    }
    ,
    email:
    {
        type:String,
        unique:true,
        required:true
    },
    profilePic:
    {
        type:String
    }
},
{timestamps:true}

)
module.exports = mongoose.model("User", userSchema);