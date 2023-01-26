const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://ysa-admin:x59Tn7nBbrUp8WPP@cluster0.42gzlth.mongodb.net/portfolioDB");

app.use("/", require("./routes/messageRoute"));

app.get('/test', (req, res) => {
  return res.send('<script>console.log("Hello world!")</script>')
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log("express server is runnning on port " + port);
});