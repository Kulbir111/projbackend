const SubProdModel=require('../Models/subProductModel')
const fs = require('fs')

exports.savesubproduct=async(req,res)=>
{
    var picturename;
        if(!req.file)
        {
            picturename="noimage.jpg";
        }
        else{
            picturename=req.file.filename;
        }
        var newrecord = new SubProdModel({catid:req.body.catid,picture:picturename,pname:req.body.pname,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,Description:req.body.descp})    //this will create a temp record into the model, not in real collection
    
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

exports.fetchsubprodsbysubcatid=async(req,res)=>
{
    var result = await SubProdModel.find({catid:req.query.cid})
            
    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,prodsubdata:result})
    }    
}

exports.updatesubproduct=async(req,res)=>
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

var updateresult = await SubProdModel.updateOne({ _id: req.body.proid }, { $set: {pname:req.body.pname,picture:picturename,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,Description:req.body.descp}});

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

exports.getsubproddetails=async(req,res)=>
{
    var result = await SubProdModel.find({_id:req.query.pid})
    //result will become an array because find function returns an array
    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,prodsubdata:result[0]})
    }    
}

exports.fetchallsubprods=async(req,res)=>
{
    var result = await SubProdModel.find().sort({"addedon":-1}).limit(6)
        
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,prodsubdata:result})
        }    
}

exports.delsubprod=async(req,res)=>
{
    
        var result = await SubProdModel.deleteOne({_id:req.params.uid})
            
        if(result.deletedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }    
    }


exports.searchsubproducts=async(req,res)=>
{
    var searchtext=req.query.p
    var result = await SubProdModel.find({pname: { $regex: '.*' + searchtext ,$options:'i' }})
    
    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,prodsubdata:result})
    }    
}

exports.updatesubstock=async(req,res)=>
{
    try
    {
        var cartdata=req.body.cartinfo;
        for(var x=0;x<cartdata.length;x++)
        {
            var updateresult = await SubProdModel.updateOne({_id:cartdata[x].pid}, { $inc: {"Stock":-cartdata[x].Qty}});
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
