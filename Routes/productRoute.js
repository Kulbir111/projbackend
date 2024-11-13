const express = require('express')
const router=express.Router()
const upload = require('./multerConfig');
const procontroller=require('../Controllers/productController')

router.post("/saveproduct",upload.single('picture'),procontroller.saveProduct)
router.get("/fetchprodsbycatid",procontroller.fetchprodsbycatid)
router.get("/searchproducts",procontroller.searchproducts)
router.get("/fetchallprods",procontroller.fetchallprods)
router.delete("/delprod/:uid",procontroller.delprod)
router.put("/updateproduct",upload.single('picture'),procontroller.updateproduct)
router.get("/getproddetails",procontroller.getproddetails)
router.put("/updatestock",procontroller.updatestock)

module.exports=router;