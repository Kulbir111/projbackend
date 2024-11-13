const SubCatModel = require('../Models/subCategoryModel');
const fs = require('fs');

exports.savesubcategory = async (req, res) => {
    try {
        let picturename;
        if (!req.file) {
            picturename = "noimage.jpg";
        } else {
            picturename = req.file.filename;
        }

        const newrecord = new SubCatModel({
            catid: req.body.catid,
            subcatname: req.body.subcname,
            subcatpic: picturename
        });

        const result = await newrecord.save();

        if (result) {
            res.status(200).send({ statuscode: 1 });
        } else {
            res.status(500).send({ statuscode: 0 });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};

exports.getsubcat = async (req, res) => {
    try {
        const result = await SubCatModel.find();

        if (result.length === 0) {
            res.status(200).send({ statuscode: 0 });
        } else {
            res.status(200).send({ statuscode: 1, catsubdata: result });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};

exports.getsubcatname = async (req, res) => {
    try {
        const result = await SubCatModel.find({ _id: req.query.un });

        if (result.length === 0) {
            res.status(200).send({ statuscode: 0 });
        } else {
            res.status(200).send({ statuscode: 1, catsubdata: result });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};

exports.updatesubcategory = async (req, res) => {
    try {
        let picturename;
        if (!req.file) {
            picturename = req.body.oldpicname; // Use old picture if no new picture is provided
        } else {
            picturename = req.file.filename;

            // Delete old picture from file system if it's not the default image
            if (req.body.oldpicname && req.body.oldpicname !== "noimage.jpg") {
                fs.unlinkSync(`public/uploads/${req.body.oldpicname}`);
            }
        }

        // Perform the update
        const updateresult = await SubCatModel.updateOne(
            { _id: req.body.catid }, // Ensure you are using the correct field
            { $set: { subcatname: req.body.subcatname, subcatpic: picturename } }
        );

        console.log(updateresult); // Log the result for debugging

        if (updateresult.modifiedCount === 1) {
            res.status(200).send({ statuscode: 1 });
        } else {
            res.status(500).send({ statuscode: 0, msg: "Update failed, document may not exist" });
        }
    } catch (e) {
        console.error(e); // Log the error
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};


exports.delsubcat = async (req, res) => {
    try {
        const result = await SubCatModel.deleteOne({ _id: req.params.uid });

        if (result.deletedCount === 1) {
            res.status(200).send({ statuscode: 1 });
        } else {
            res.status(500).send({ statuscode: 0 });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};

exports.fetchprodsbysubcatid = async (req, res) => {
    try {
        const result = await SubCatModel.find({ catid: req.query.cid });

        if (result.length === 0) {
            res.status(200).send({ statuscode: 0 });
        } else {
            res.status(200).send({ statuscode: 1, prodsubdata: result });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};
