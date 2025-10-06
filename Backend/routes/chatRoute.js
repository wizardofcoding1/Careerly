const express = require("express");
const Chat = require("../DataBase/models/chat");
const User = require("../DataBase/models/userSchema");
const OpenAI = require("openai");
require("dotenv").config();

const router = express.Router();

// Gemini Setup
const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

// Middleware to verify user
const verifyUser = async (req, res, next) => {
  try {
    const clerkId = req.headers['clerk-user-id'];
    if (!clerkId) {
      return res.status(401).json({ error: "Unauthorized: No user ID provided" });
    }
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Authentication error" });
  }
};

// Apply middleware to all routes
router.use(verifyUser);

// 1️⃣ Get all chats for the current user, sorted by updatedAt (latest first)
router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

// 2️⃣ Get one chat by ID (only if it belongs to the user)
router.get("/:id", async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id });
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// Rename chat (only if it belongs to the user)
router.patch("/:id/rename", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title },
      { new: true }
    );
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to rename chat" });
  }
});

// 3️⃣ Create new chat for the current user
router.post("/new", async (req, res) => {
  try {
    const chat = new Chat({ 
      title: "New Chat", 
      messages: [],
      userId: req.user._id,
      clerkId: req.user.clerkId
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create chat" });
  }
});

// 4️⃣ Delete chat (only if it belongs to the user)
router.delete("/:id", async (req, res) => {
  try {
    const result = await Chat.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!result) return res.status(404).json({ error: "Chat not found" });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

// 5️⃣ Send message & get Gemini reply
router.post("/:id/message", async (req, res) => {
  try {
    const { role, content } = req.body;
    if (!role || !content) {
      return res.status(400).json({ error: "Role and content are required" });
    }

    const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id });
    if (!chat) return res.status(404).json({ error: "Chat not found" });

    // Save user message
    chat.messages.push({ role, content });

    // If first user message, update title
    if (chat.title === "New Chat" && role === "user") {
      chat.title = content.slice(0, 30) + (content.length > 30 ? "..." : "");
    }

    await chat.save();

    // Call Gemini API
    const response = await openai.chat.completions.create({
      model: "gemini-2.5-flash",
      messages: chat.messages.map(m => ({ role: m.role, content: m.content }))
    });

    const aiReply = response.choices[0].message.content;

    // Save assistant reply
    chat.messages.push({ role: "assistant", content: aiReply });
    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error("Gemini error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
