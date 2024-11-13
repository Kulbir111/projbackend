const express = require('express')
const router=express.Router()
const catController=require('../Controllers/categoryController')
const upload=require("../Routes/multerConfig")

router.post("/savecategory",upload.single('catpic'),catController.savecategory)
router.get("/getcat",catController.getcat)
router.get("/getcatname",catController.getcatname)
router.put("/updatecategory",upload.single('catpic'),catController.updatecategory)
router.delete("/delcat/:uid",catController.delcat)

module.exports=router;