const express = require('express')
const mongoose = require('mongoose');
const app = express()
const accountRoute=require('./Routes/accountRoute')
const catRoute=require('./Routes/categoryRoute')
const subCatRoute=require('./Routes/subCategoryRoute')
const productRoute=require('./Routes/productRoute')
const subproductRoute=require('./Routes/subProductRoute')
const cartRoute=require('./Routes/cartRoute')
const orderRoute=require('./Routes/orderRoute')
app.use(express.json());
var cors = require('cors');
app.use(cors())
app.use('/api',accountRoute)
app.use('/api',catRoute)
app.use('/api',subCatRoute)
app.use('/api',productRoute)
app.use('/api',subproductRoute)
app.use('/api',cartRoute)
app.use('/api',orderRoute)


mongoose.set("strictQuery",false)

// mongoose.connect('mongodb://127.0.0.1:27017/fashiondb').then(() => console.log('Connected to MongoDB!'));
mongoose.connect('mongodb+srv://fashion12:Fashion20@cluster0.xsvtg.mongodb.net/fashiondb?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('Connected to MongoDB!'));
const PORT=process.env.PORT||9000;

app.listen(PORT,()=>
    {
        console.log(`Server is running on ${PORT}`);
    })