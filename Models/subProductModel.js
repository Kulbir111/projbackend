const mongoose = require('mongoose');

var subprodSchema = new mongoose.Schema({catid:String,pname:String,Rate:Number,Discount:Number,Stock:Number,Description:String,picture:String,addedon:String},{versionKey:false})

module.exports= mongoose.model("Sub Product",subprodSchema,"Sub Product");