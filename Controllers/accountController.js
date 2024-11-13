const SignupModel=require ("../Models/accountModel")

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : 'hotmail',
    auth : {
        user : `${process.env.SMTP_UNAME}`,
        pass : `${process.env.SMTP_PASS}`
    }
  })
  
exports.signup=async(req,res)=>
{
    const hash = bcrypt.hashSync(req.body.pass, 10);
    var newrecord = new SignupModel({pname:req.body.name,phone:req.body.phone,username:req.body.uname,password:hash,usertype:"normal",activated:false})    //this will create a temp record into the model, not in real collection

    var result = await newrecord.save();//it will save the record into real collection
    console.log(result);
    if(result)
    {
        const mailOptions = 
        {
        from: 'Fashionhub_12@hotmail.com',//smtp email
        to: req.body.uname,
        subject: 'Activation mail from Fashionhub.com',
        html: `Hello ${req.body.name}<br/><br/>Thanks for signing up on our website. Click on the following link to activate your account<br/><br/><a href='http://localhost:3000/activateaccount?actcode=${result._id}'>Activate Account</a><br><br>Team Fashionhub.com `
        };
    
      // Use the transport object to send the email
        transporter.sendMail(mailOptions, (error, info) => 
        {
            if (error) 
            {
                console.log(error);
                res.send({statuscode:0, msg:', Signup done, but error sending email'});
            } 
            else 
            {
                console.log('Email sent: ' + info.response);
                res.status(200).send({statuscode:1,msg:"Signup Successfull, check your mail to activate account"})
            }
        });
        
    }
    else
    {
        res.status(500).send({statuscode:0,msg:"Signup not successfull"})
    }    
}

exports.addadmin = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.pass, 10);
        var newrecord = new SignupModel({ pname: req.body.name, phone: req.body.phone, username: req.body.uname, password: hash, usertype: "admin", activated: "false" });

        var result = await newrecord.save();

        if (result) {
            res.status(200).send({ statuscode: 1, msg: "Add Admin Successfully" });
        } else {
            res.status(500).send({ statuscode: 0, msg: "Admin not Added" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Some error occurred" });
    }
};

exports.login = async (req, res) => {
    try {
        var result = await SignupModel.findOne({ username: req.body.uname });

        if (!result) {
            res.status(200).send({ statuscode: 0 });
        } else {
            var compres = bcrypt.compareSync(req.body.pass, result.password);
            if (compres) {
                res.status(200).send({ statuscode: 1, pdata: result });
            } else {
                res.status(200).send({ statuscode: 0 });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Some error occurred" });
    }
};

exports.forgotpass = async (req, res) => {
    try {
        var result = await SignupModel.findOne({ username: req.query.un });

        if (!result) {
            res.status(200).send({ msg: "Incorrect Username" });
        } else {
            const mailOptions = {
                from: 'Fashionhub_12@hotmail.com',
                to: req.query.un,
                subject: 'Reset password mail from Fashionhub.com',
                html: `Hello ${result.pname}<br/><br/>Click on the following link to reset your password<br/><br/><a href='http://localhost:3000/resetpassword?code=${result._id}'>Reset Password</a><br><br>Team Fashionhub.com`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send({ msg: 'Error while sending mail, try again' });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).send({ msg: "Check your email to reset your password" });
                }
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Some error occurred" });
    }
};

exports.resetpass = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.newpass, 10);
        var updateresult = await SignupModel.updateOne({ _id: req.body.id }, { $set: { password: hash } });

        if (updateresult.modifiedCount === 1) {
            res.status(200).send({ msg: "Password reset successfully" });
        } else {
            res.status(200).send({ msg: "Problem while resetting password" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Some error occurred" });
    }
};

exports.getusers = async (req, res) => {
    try {
        var result = await SignupModel.find();

        if (result.length === 0) {
            res.status(200).send({ statuscode: 0 });
        } else {
            res.status(200).send({ statuscode: 1, membersdata: result });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Some error occurred" });
    }
};

exports.searchuser = async (req, res) => {
    try {
        var result = await SignupModel.find({ username: req.query.un });

        if (result.length === 0) {
            res.status(200).send({ statuscode: 0 });
        } else {
            res.status(200).send({ statuscode: 1, searchdata: result });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Some error occurred" });
    }
};

exports.deluser = async (req, res) => {
    try {
        var result = await SignupModel.deleteOne({ _id: req.params.uid });

        if (result.deletedCount === 1) {
            res.status(200).send({ statuscode: 1 });
        } else {
            res.status(200).send({ statuscode: 0 });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ msg: "Some error occurred" });
    }
};

exports.changepassword=async(req,res)=>
{
    try
            {
                var result = await SignupModel.findOne({username:req.body.uname})
            
                if(result.length===0)
                {
                    res.status(200).send({statuscode:0})
                }
                else
                {
                   var compres= bcrypt.compareSync(req.body.currentpass, result.password);
                   if(compres===true){
                    const hash = bcrypt.hashSync(req.body.newpass, 10);
                    var updateresult = await SignupModel.updateOne({ username: req.body.uname }, { $set: {password:hash}});
            
                    if(updateresult.modifiedCount===1)
                    {
                        res.status(200).send({statuscode:1})
                    }
                    else
                    {
                        res.status(200).send({statuscode:0})
                    }
                   }
                   else{
                    res.status(200).send({statuscode:0})
                   }  
                }    
            }
            catch(e)
            {
                console.log(e);
                res.status(500).send({statuscode:-1,msg:"Some error occured"})
            }
}

exports.profile=async(req,res)=>
{
    try
    {
        var result = await SignupModel.findOne({username:req.body.uname})
    
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            var updateresult = await SignupModel.updateOne({ username: req.body.uname }, { $set: {pname:req.body.pname,phone:req.body.phone}});
    
            if(updateresult.modifiedCount===1)
            {
                res.status(200).send({statuscode:1})
            }
            else
            {
                res.status(200).send({statuscode:0})
            }
            }
            
        }    
    
    catch(e)
    {
        console.log(e);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})
    }
}

exports.activateaccount=async(req,res)=>
{
    try
    {
        var updateresult = await SignupModel.updateOne({_id: req.query.code}, { $set: {activated:true}});

        if(updateresult.modifiedCount===1)
        {
            res.status(200).send({msg:"Account activated successfully"})
        }
        else
        {
            res.status(200).send({msg:"Account not activated"})
        }
           
    }    
    catch(e)
    {
        console.log(e);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})
    }
}

exports.contact=async(req,res)=>
{
    const mailOptions = 
        {
        from: 'supermarket_12@hotmail.com',//smtp email
        to: 'kulbirsinghmiglani@gmail.com',//any email id of admin or where you want to receive email
        subject: 'Message from Website - Contact Us',
        text: `Name:- ${req.body.name}\nPhone:-${req.body.phone}\nEmail:-${req.body.uname}\nMessage:-${req.body.message}`
        };
    
      // Use the transport object to send the email
    transporter.sendMail(mailOptions, (error, info) => 
    {
        if (error) 
        {
          console.log(error);
          res.send({msg:'Error sending email'});
        } 
        else 
        {
          console.log('Email sent: ' + info.response);
          res.send({msg:"Message sent successfully"});
        }
    })}