// // Backend/routes/clerkWebhook.js
// const express = require("express");
// const router = express.Router();
// const { Webhook } = require("svix");
// const User = require("../DataBase/models/userSchema"); // your mongoose model
// const Video = require("../DataBase/models/video"); // import video model to delete user's saved videos

// // Clerk Webhook
// router.post("/webhook", express.json({ type: "application/json" }), async (req, res) => {
//   const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

//   if (!WEBHOOK_SECRET) {
//     throw new Error("Missing Clerk Webhook Secret!");
//   }

//   const payload = req.body;
//   const headers = req.headers;

//   const wh = new Webhook(WEBHOOK_SECRET);

//   let evt;
//   try {
//     evt = wh.verify(payload, headers);
//   } catch (err) {
//     console.error("❌ Error verifying Clerk webhook:", err.message);
//     return res.status(400).json({ error: "Invalid signature" });
//   }

//   const { id, type } = evt;

//   console.log(`Webhook received: ${id} - Type: ${type}`);

//   try {
//     if (type === "user.deleted") {
//       const deletedUserId = evt.data.id; // Clerk user ID
      
//       // Set a delay for deletion (e.g., 7 days = 604800000 ms)
//       const deletionDelay = 1000 * 60 * 5; // 5 minutes for testing purposes
      
//       console.log(`✅ User ${deletedUserId} scheduled for deletion in ${deletionDelay/1000} seconds`);
      
//       // Schedule deletion after the specified delay
//       setTimeout(async () => {
//         try {
//           // Delete user from MongoDB
//           const deletedUser = await User.findOneAndDelete({ clerkId: deletedUserId });
          
//           // Also delete all user's saved videos
//           await Video.deleteMany({ clerkId: deletedUserId });
          
//           console.log(`✅ User ${deletedUserId} and related data deleted from DB after delay`);
          
//           // You can add more collections to clean up here if needed
//           // Example: await Quiz.deleteMany({ clerkId: deletedUserId });
//         } catch (error) {
//           console.error(`❌ Error during delayed deletion for user ${deletedUserId}:`, error);
//         }
//       }, deletionDelay);
//     }

//     if (type === "user.created") {
//       const { id, email_addresses, username } = evt.data;
//       const email = email_addresses[0].email_address;

//       const existing = await User.findOne({ clerkId: id });
//       if (!existing) {
//         await User.create({
//           clerkId: id,
//           email,
//           username,
//         });
//         console.log("✅ User created in DB:", email);
//       }
//     }

//     if (type === "user.updated") {
//       const { id, username } = evt.data;
//       await User.findOneAndUpdate(
//         { clerkId: id },
//         { username },
//         { new: true }
//       );
//       console.log("✅ User updated in DB:", id);
//     }

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error("❌ Webhook handling error:", err.message);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;
