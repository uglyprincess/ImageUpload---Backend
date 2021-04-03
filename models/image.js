const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: {
        data: String,
        contentType: String
    }
});

module.exports = new mongoose.model("Image", imageSchema);