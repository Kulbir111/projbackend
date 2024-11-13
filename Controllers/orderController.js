const OrderModel=require('../Models/orderModel')

exports.checkout=async(req,res)=>
{
    var newrecord = new OrderModel({saddr:req.body.saddr,state:req.body.state,pincode:req.body.pincode,billamt:req.body.tbill,uname:req.body.uname,OrderDate:new Date(),pmode:req.body.pmode,CardDetails:req.body.cartdetails,OrderProducts:req.body.cartinfo,status:"Payment Recieved & Processing"}) 
    
    var result = await newrecord.save();

    if(result)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0})
    }    
}

exports.delorder=async(req,res)=>
{
    var result = await OrderModel.deleteOne({_id:req.params.uid})
        
        if(result.deletedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }    
}

exports.getorderid=async(req,res)=>
{
    var result = await OrderModel.findOne({uname:req.query.un}).sort({"OrderDate":-1});
        
        if(result)
        {
            res.status(200).send({statuscode:1,orderdata:result})
            
        }
        else
        {
            res.status(200).send({statuscode:0})
        }    
}

exports.getallorders=async(req,res)=>
{
    var result = await OrderModel.find().sort({"OrderDate":-1})
        //result will become an array because find function returns an array
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,orderdata:result})
        }    
}

exports.getorderproducts=async(req,res)=>
{
    try{
        var result = await OrderModel.findOne({_id:req.query.orderno});
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,items:result.OrderProducts})
        }    
    }
    catch(e)
    {
        res.status(500).send({statuscode:-1})
    }
}

exports.updatestatus=async(req,res)=>
{
    try
    {
        var updateresult = await OrderModel.updateOne({_id: req.body.orderid}, { $set: {status:req.body.newst}});

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

exports.getuserorders=async(req,res)=>
{
    try{
        var result = await OrderModel.find({uname:req.query.un}).sort({"OrderDate":-1})
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,orderdata:result})
        }    
    }
    catch(e)
    {
        res.status(500).send({statuscode:-1})
    }
}



