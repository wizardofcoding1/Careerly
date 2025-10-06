const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true, // to connect video with user
    },
    videoId: {
      type: String,
      required: true, // YouTube video ID
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true } // automatically adds createdAt, updatedAt
);

// ✅ Prevent duplicate video per user
videoSchema.index({ clerkId: 1, videoId: 1 }, { unique: true });

// ✅ Fix: prevent model overwrite in dev (hot reload)
const Video = mongoose.models.Video || mongoose.model("Video", videoSchema);

module.exports = Video;