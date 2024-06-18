const express = require("express");
const app = express();
const PORT = 8000;

app.use("/profile", require("./routes/profile/profile"));

app.listen(8000, () => {
  console.log(` port is running on ${PORT}`);
});
