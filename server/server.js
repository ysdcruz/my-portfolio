require("dotenv").config({path:__dirname+'/./../.env'});
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/", require("./routes/messageRoute"));

app.get("/", (req, res) => {
  res.send("express running");
});

if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`express server is runnning on port ${PORT}`);
});