const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");

router.route("/send").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const datetime = req.body.datetime;
  const newMessage = new Message({
    name,
    email,
    message
  });

  newMessage.save();

  res.send("Message sent.");
});

module.exports = router;