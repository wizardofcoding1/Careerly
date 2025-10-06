const express = require("express");
const mongoose = require("mongoose");
const Chat = require("../DataBase/models/chat");
const OpenAI = require("openai");
require("dotenv").config();

const router = express.Router();

// Gemini via OpenAI SDK
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Add user message & get assistant reply
router.post("/:id/message", async (req, res) => {
  try {
    const { id } = req.params;
    const { role, content } = req.body;

    if (!role || !content) {
      return res.status(400).json({ error: "Role and content are required" });
    }

    // ✅ Validate chatId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid chat ID format" });
    }

    const chat = await Chat.findById(id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    // Save user message
    chat.messages.push({ role, content });

    // Update title if first user message
    if (chat.title === "New Chat" && role === "user") {
      chat.title = content.slice(0, 30) + (content.length > 30 ? "..." : "");
    }

    await chat.save();

    // Call Gemini AI
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: chat.messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    });

    // Extract AI reply
    const aiReply = response.choices[0].message.content;

    // Save assistant reply
    chat.messages.push({ role: "assistant", content: aiReply });
    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

// Optional: Get all messages for a chat
router.get("/:id/messages", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid chat ID format" });
    }

    const chat = await Chat.findById(id);
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat.messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages", details: err.message });
  }
});

module.exports = router;
