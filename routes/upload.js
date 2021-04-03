const express = require("express");
const router = express.Router();
const Image = require("../models/image");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, 'uploads');
    },

    filename: (req, file, cb) => {
        cb (null, file.filename + '_' + Date.now() + '.jpg');
    }
});

const upload = multer({storage: storage});

router.get("/", function(req, res){
    res.send("Welcome to the upload page");
});

router.post("/", upload.single('image'), function(req, res){

    var obj = new Image({
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: req.file.filename,
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