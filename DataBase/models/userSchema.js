const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true }, // 🔹 Important for Clerk integration
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "is invalid"],
    },
    number: { type: String },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
