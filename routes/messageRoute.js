const express = require("express");
const router = express.Router();
const controllers = require("../controllers/messageControllers");

router.post("/send", controllers.createMessage);
router.get("/all", controllers.getAllMessages);

module.exports = router;