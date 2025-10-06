const express = require("express");
const Video = require("../DataBase/models/video"); // adjust path if needed

const router = express.Router();

// ✅ Save video (heart click)
router.post("/save", async (req, res) => {
  try {
    const { clerkId, videoId, title, description, thumbnail } = req.body;

    if (!clerkId || !videoId) {
      return res.status(400).json({ error: "clerkId and videoId required" });
    }

    const video = await Video.findOneAndUpdate(
      { clerkId, videoId },
      { title, description, thumbnail },
      { new: true, upsert: true } // create if not exists
    );

    res.json({ success: true, video });
  } catch (err) {
    console.error("Save error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Check if already saved
router.get("/is-saved", async (req, res) => {
  try {
    const { clerkId, videoId } = req.query;

    if (!clerkId || !videoId) {
      return res.status(400).json({ error: "clerkId and videoId required" });
    }

    const video = await Video.findOne({ clerkId, videoId });
    res.json({ saved: !!video });
  } catch (err) {
    console.error("Check error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete (unheart)
router.post("/delete", async (req, res) => {
  try {
    const { clerkId, videoId } = req.body;

    if (!clerkId || !videoId) {
      return res.status(400).json({ error: "clerkId and videoId required" });
    }

    await Video.findOneAndDelete({ clerkId, videoId });

    res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all saved videos for a user
router.get("/all", async (req, res) => {
  try {
    const { clerkId } = req.query;
    if (!clerkId) {
      return res.status(400).json({ error: "clerkId required" });
    }

    const videos = await Video.find({ clerkId }).sort({ createdAt: -1 });
    res.json(videos);
  } catch (err) {
    console.error("Fetch saved videos error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;