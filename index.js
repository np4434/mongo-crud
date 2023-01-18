const express = require("express");
const app = express();
const router = require("./routes/emp");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  "mongodb://localhost:27017/Employee",
  { useNewUrlParser: true },
  (err, client) => {
    if (!err) {
      console.log("Successfully Established Connection with MongoDB");
    } else {
      console.log(
        "Failed to Establish Connection with MongoDB with Error: " + err
      );
    }
  }
);

app.use("/emp", router);

const PORT = 4001;

app.listen(PORT, () => {
  console.log("sever listening on port:",PORT);
});
