const mongoose = require('mongoose');

var subcatSchema = new mongoose.Schema({catid:String,subcatname:String,subcatpic:String},{versionKey:false})

module.exports= mongoose.model("sub category",subcatSchema,"sub category");