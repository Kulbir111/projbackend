const mongoose = require('mongoose');

var catSchema = new mongoose.Schema({catname:String,catpic:String},{versionKey:false})

module.exports = mongoose.model("category",catSchema,"category");