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
        const fileData = fs.readFileSync("data.json", "utf8");
        jsonData = JSON.parse(fileData);
        if (!Array.isArray(jsonData)) {
          throw new Error("File does not contain an array");
        }
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

      console.log("Form data saved successfully:", formData);
      return res.status(200).json({ success: formData });
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
