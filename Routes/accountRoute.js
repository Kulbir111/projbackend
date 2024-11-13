const express = require('express')
const router=express.Router()
const SignupController=require('../Controllers/accountController')

router.post('/signup',SignupController.signup)
router.post('/admin',SignupController.addadmin)
router.post('/login',SignupController.login)
router.get('/forgotpass',SignupController.forgotpass)
router.get('/getusers',SignupController.getusers)
router.get('/searchuser',SignupController.searchuser)
router.put('/resetpass',SignupController.resetpass)
router.delete('/deluser/:uid',SignupController.deluser)
router.put('/changepassword',SignupController.changepassword)
router.put('/profile',SignupController.profile)
router.put('/activateaccount',SignupController.activateaccount)
router.post('/contact',SignupController.contact)


module.exports=router;