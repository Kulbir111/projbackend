const express = require('express')
const router=express.Router()
const orderController=require('../Controllers/orderController')

router.post('/checkout',orderController.checkout)
router.delete('/delorder/:uid',orderController.delorder)
router.get('/getorderid',orderController.getorderid)
router.get('/getallorders',orderController.getallorders)
router.get('/getorderproducts',orderController.getorderproducts)
router.get('/getuserorders',orderController.getuserorders)
router.put('/updatestatus',orderController.updatestatus)

module.exports=router;
