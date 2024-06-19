require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const uploadDir = path.join(__dirname, "./uploads");

app.use(
  cors({
    origin: "*",
  })
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.get("/", (req, res) => {
  res.send("Server api is running successfully ");
});

app.use(
  "/profile",
  upload.single("image"),
  require("./routes/profile/profile")
);

app.listen(PORT, () => {
  console.log(` port is running on ${PORT}`);
});
