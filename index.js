var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniquePreffix = new Date().valueOf();
    cb(null, uniquePreffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const fileMetaData = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  };
  res.json(fileMetaData);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
