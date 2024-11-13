const express = require('express')
const router=express.Router()
const cartController=require('../Controllers/cartController')

router.post('/savetocart',cartController.savetocart)
router.get('/getcart',cartController.getcart)
router.delete('/delcart/:uid',cartController.delcart)
router.delete('/deletecart',cartController.deletecart)

module.exports=router;