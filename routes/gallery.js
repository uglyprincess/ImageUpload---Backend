const express = require("express");
const router = express.Router();
const Image = require("../models/image");

router.get("/", function(req, res){

    Image.find({}, function(err, images){
        if(err) {
            console.log(err);
            res.send("Nope");
        } else if(images) {
            res.send(images);
        } else {
            console.log("No images found");
        }
    });
});

module.exports = router;