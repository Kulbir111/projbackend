const express = require('express')
const router=express.Router()
const upload = require('./multerConfig');
const subProController=require('../Controllers/subProductController')

router.post("/savesubproduct",upload.single('picture'),subProController.savesubProduct)
router.get("/fetchsubprodsbysubcatid",subProController.fetchsubprodsbysubcatid)
router.get("/searchsubproducts",subProController.searchsubproducts)
router.get("/fetchallsubprods",subProController.fetchallsubprods)
router.delete("/delsubprod/:uid",subProController.delsubprod)
router.put("/updatesubproduct",upload.single('picture'),subProController.updatesubproduct)
router.get("/getsubproddetails",subProController.getsubproddetails)
router.put("/updatesubstock",subProController.updatesubstock)

module.exports=router;