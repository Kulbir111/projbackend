const mongoose = require('mongoose');
var signupSchema = new mongoose.Schema({pname:String,phone:String,username:{type:String,unique:true},password:String,usertype:String,activated:Boolean},{versionKey:false})

module.exports = mongoose.model("signup",signupSchema,"signup");