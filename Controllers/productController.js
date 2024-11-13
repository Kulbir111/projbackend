const ProdModel=require('../Models/productModel')
const fs = require('fs')

exports.saveProduct=async(req,res)=>
{
    var picturename;
        if(!req.file)
        {
            picturename="noimage.jpg";
        }
        else{
            picturename=req.file.filename;
        }
        var newrecord = new ProdModel({catid:req.body.catid,picture:picturename,pname:req.body.pname,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,Description:req.body.descp})    //this will create a temp record into the model, not in real collection
    
        var result = await newrecord.save();//it will save the record into real collection
        
        if(result)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }    
}

exports.fetchprodsbycatid=async(req,res)=>
{
    var result = await ProdModel.find({catid:req.query.cid})
            
    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,proddata:result})
    }    
}

exports.fetchallprods=async(req,res)=>
{
    var result = await ProdModel.find().sort({"addedon":-1}).limit(6)
        
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,proddata:result})
        }    
}

exports.getproddetails=async(req,res)=>
{
    var result = await ProdModel.find({_id:req.query.pid})
        //result will become an array because find function returns an array
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,proddata:result[0]})
        }    
}

exports.searchproducts=async(req,res)=>
{
    var searchtext=req.query.q
        var result = await ProdModel.find({pname: { $regex: '.*' + searchtext ,$options:'i' }})
        
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,proddata:result})
        }    
}

exports.delprod=async(req,res)=>
{
    var result = await ProdModel.deleteOne({_id:req.params.uid})
        
        if(result.deletedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }    
}

exports.updateproduct=async(req,res)=>
{
    try
    {
        var picturename;
        if(!req.file)
        {
            picturename=req.body.oldpicname;//it will save current picname in this variable
        }
        else
        {
            picturename=req.file.filename;

            if(req.body.oldpicname!=="noimage.jpg")
            {
                fs.unlinkSync(`public/uploads/${req.body.oldpicname}`);
            }
        }

var updateresult = await ProdModel.updateOne({ _id: req.body.proid }, { $set: {pname:req.body.pname,picture:picturename,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,Description:req.body.descp}});

    if(updateresult.modifiedCount===1)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0})
    }
}
catch(e)
{
    console.log(e);
    res.status(500).send({statuscode:-1,msg:"Some error occured"})
}
}

exports.updatestock=async(req,res)=>
{
    try
    {
        var cartdata=req.body.cartinfo;
        for(var x=0;x<cartdata.length;x++)
        {
            var updateresult = await ProdModel.updateOne({_id:cartdata[x].pid}, { $inc: {"Stock":-cartdata[x].Qty}});
        }
        

        if(updateresult.modifiedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }
    }
    catch(e)
    {
        console.log(e);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})
    }
}

