const mongoose = require("mongoose");

const db = process.env.MONGO_URI;

mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log(err);
});