// controllers/userController.js
const User = require("../DataBase/models/userSchema");

const saveUser = async (req, res) => {
  try {
    const { clerkId, name, email, number, username } = req.body;

    if (!clerkId) {
      return res.status(400).json({ error: "Missing clerkId" });
    }

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({ clerkId, name, email, number, username });
      await user.save();
      return res.status(201).json({ message: "User created", user });
    }

    // Update
    user.name = name;
    user.email = email;
    user.number = number;
    user.username = username;

    await user.save();
    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = { saveUser };
