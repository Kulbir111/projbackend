const express = require('express')
const router=express.Router()
const upload = require('./multerConfig');
const subcatcontroller=require('../Controllers/subCategoryController')

router.post("/savesubcategory",upload.single('subcatpic'),subcatcontroller.savesubcategory)
router.put("/updatesubcategory",upload.single('subcatpic'),subcatcontroller.updatesubcategory)
router.get("/getsubcat",subcatcontroller.getsubcat)
router.get("/getsubcatname",subcatcontroller.getsubcatname)
router.get("/fetchprodsbysubcatid",subcatcontroller.fetchprodsbysubcatid)
router.delete("/delsubcat/:uid",subcatcontroller.delsubcat)

module.exports=router;