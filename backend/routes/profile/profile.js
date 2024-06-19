const express = require("express");
const router = express.Router();
const fs = require("fs");

router.post("/", (req, res) => {
  try {
    const formData = req.body;
    let jsonData = [];
    try {
      jsonData = JSON.parse(fs.readFileSync("data.json"));
    } catch (error) {
      console.error("Error reading file:", error);
    }

    jsonData.push(formData);

    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Error writing file");
        return;
      }
      console.log("Data appended to file successfully");
      res.send("Data appended to file successfully");
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
