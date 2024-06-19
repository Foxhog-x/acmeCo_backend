require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const uploadDir = path.join(__dirname, "./uploads");
const allowedOrigin = process.env.ORIGIN;

const corsOptions = {
  origin: (origin, callback) => {
    if (origin === allowedOrigin || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

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
