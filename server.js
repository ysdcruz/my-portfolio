require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router =  require("./routes/messageRoute");
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/", router)

app.get("/", (req, res) => {
  res.status(301).redirect("https://ysadc.netlify.app");
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