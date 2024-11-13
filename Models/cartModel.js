const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({pid:String,picture:String,ProdName:String,Rate:Number,Qty:Number,TotalCost:Number,Username:String},{versionKey:false})

module.exports = mongoose.model("cart",cartSchema,"cart");