const router = require("express").Router();
const { addMessage, getMessage } = require("../controller/message");

// Add Message
router.post("/", addMessage);

// Get
router.get("/:conversationId", getMessage);

module.exports = router;
