const Message = require("../models/messageModel");
const BASE_URL = process.env.BASE_URL

// Create new message
exports.createMessage = async (req, res) => {

  const { name, email, message } = req.body;

  if(!name || !email || !message)
    res.status(401).json("All inputs are required.");

  const newMessage = new Message({
    name,
    email,
    message
  });

  await newMessage.save();

  res.status(200).json(newMessage);

}

// Get all messages
exports.getAllMessages = async (req, res) => {

  try {
    const messageData = await Message.find();

    res.status(200).json({ messageData });
  } catch (err) {
    res.status(401).json(err);
  }

}