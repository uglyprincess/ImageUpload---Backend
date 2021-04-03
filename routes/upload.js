const express = require("express");
const router = express.Router();
const Image = require("../models/image");
const multer = require("multer");
const {v4: uuidv4} = require("uuid");

var useName = "";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, '../frontend/public/uploads');
    },

    filename: (req, file, cb) => {
        useName = req.body.name + '_' + uuidv4() + '.jpg'
        cb (null, useName);
    }
});

const upload = multer({storage: storage});

router.get("/", function(req, res){
    res.send("Welcome to the upload page");
});

router.post("/", upload.single('image'), function(req, res){

    console.log(req.file.filename);

    var obj = new Image({
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: useName,
            contentType: "image/png"
        }
    });

    obj.save(function(error){
        if(error) {
            console.log(error);
        } else {
            console.log("Image successfully saved!");
            res.send("Done");
        }
    });
});

module.exports = router;