const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../ImageUpload/build")));
}
else {
  app.use(
      cors({
          origin: "http://localhost:3000", 
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          credentials: true 
      })
  );
}


mongoose.connect('mongodb://localhost:27017/imageDB', {useNewUrlParser: true, useUnifiedTopology: true});

const uploadRoute = require("./routes/upload");
const viewRoute = require("./routes/gallery");

app.use("/api/upload", uploadRoute);
app.use("/api/gallery", viewRoute);

app.listen(4000, function(){
    console.log("Server started at port 4000");
});