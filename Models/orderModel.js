const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({saddr:String,state:String,pincode:String,billamt:Number,uname:String,OrderDate:String,pmode:String,CardDetails:Object,OrderProducts:[Object],status:String},{versionKey:false})

module.exports = mongoose.model("finalorder",orderSchema,"finalorder");