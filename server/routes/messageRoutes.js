import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";

const router = express.Router();

// POST route to send a message
router.post("/send", sendMessage);
// Route to send a message
router.get("/getall", getAllMessages);

export default router;

