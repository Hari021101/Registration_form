const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Hariharan:6383594264@cluster0.ctklkxm.mongodb.net/registrationform", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to Database"))
  .catch(error => console.error("Error connecting to database:", error));

const listSchema = new mongoose.Schema({
  name: String,
  mail: String,
  phone: Number,
  dateofbirth: String,
  gender: String,
});

const List = mongoose.model("List", listSchema);

app.get("/", function (_, res) {
    res.sendFile(__dirname + "/index.html");
  });
  

app.post("/", upload.single("resume"), (req, res) => {
  let newlist = new List({
    name: req.body.name,
    mail: req.body.email,
    phone: req.body.phone,
    dateofbirth: req.body.dob,
    gender: req.body.gender,
  });
  newlist.save();
  res.redirect("/");
});

const PORT = 1111;
app.listen(PORT, function () {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = List;
