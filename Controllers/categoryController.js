const CatModel = require('../Models/categoryModel');
const fs = require('fs');

exports.savecategory = async (req, res) => {
    try {
        let picturename;
        if (!req.file) {
            picturename = "noimage.jpg";
        } else {
            picturename = req.file.filename;
        }

        const newrecord = new CatModel({ catname: req.body.catname, catpic: picturename }); // create a temporary record

        const result = await newrecord.save(); // save the record to the real collection

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

exports.getcat = async (req, res) => {
    try {
        const result = await CatModel.find();

        if (result.length === 0) {
            res.status(200).send({ statuscode: 0 });
        } else {
            res.status(200).send({ statuscode: 1, catdata: result });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};

exports.updatecategory = async (req, res) => {
    try {
        let picturename;
        if (!req.file) {
            picturename = req.body.oldpicname; // current picname
        } else {
            picturename = req.file.filename;

            // Remove the old image if it's not the default image
            if (req.body.oldpicname !== "noimage.jpg") {
                fs.unlinkSync(`public/uploads/${req.body.oldpicname}`);
            }
        }

        const updateresult = await CatModel.updateOne({ _id: req.body.cid }, { $set: { catname: req.body.catname, catpic: picturename } });

        if (updateresult.modifiedCount === 1) {
            res.status(200).send({ statuscode: 1 });
        } else {
            res.status(500).send({ statuscode: 0 });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};

exports.delcat = async (req, res) => {
    try {
        const result = await CatModel.deleteOne({ _id: req.params.uid });

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

exports.getcatname = async (req, res) => {
    try {
        const result = await CatModel.find({ _id: req.query.un });

        if (result.length === 0) {
            res.status(200).send({ statuscode: 0 });
        } else {
            res.status(200).send({ statuscode: 1, catdata: result });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occurred" });
    }
};
