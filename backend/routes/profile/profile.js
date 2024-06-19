const fs = require("fs");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const formData = req.body;
    let jsonData = [];

    // Check if the file exists before reading it
    if (fs.existsSync("data.json")) {
      try {
        jsonData = JSON.parse(fs.readFileSync("data.json"));
      } catch (error) {
        console.error("Error parsing file:", error);
        return res.status(500).send("Error parsing file");
      }
    }

    jsonData.push(formData);

    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return res.status(500).send("Error writing file");
      }

      return res.status(200).json({ success: formData });
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
