const mongoose = require('mongoose');

var prodSchema = new mongoose.Schema({catid:String,pname:String,Rate:Number,Discount:Number,Stock:Number,Description:String,picture:String,addedon:String},{versionKey:false})

module.exports = mongoose.model("Product",prodSchema,"Product");