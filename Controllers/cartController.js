const CartModel=require('../Models/cartModel')

exports.savetocart=async(req,res)=>
{
    var newrecord = new CartModel({pid:req.body.pid,picture:req.body.picture,ProdName:req.body.pname,Rate:req.body.rate,Qty:req.body.qty,TotalCost:req.body.tc,Username:req.body.username}) 
    
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

exports.getcart=async(req,res)=>
{
    try{
        var result = await CartModel.find({Username:req.query.un})
        //result will become an array because find function returns an array
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,cartinfo:result})
        } 
    }
    catch(e)
    {
        res.status(500).send({statuscode:-1})
    }   
}

exports.delcart=async(req,res)=>
{
    var result = await CartModel.deleteOne({_id:req.params.uid})
        
        if(result.deletedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }    
}

exports.deletecart=async(req,res)=>
{
    var result = await CartModel.deleteMany({Username:req.query.un})//{ acknowledged: true, deletedCount: ... }
    if(result.deletedCount>=1)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0})
    }    
}

