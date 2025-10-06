require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// DB Connection
const connectDB = require("./DataBase/config/db");
connectDB();

// Routes
const youtubeRoutes = require("./routes/youtubeRoutes");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes"); // ✅ add this
const quizRouter = require("./routes/quiz");
const emailRoute = require('./routes/emailRoute.js');
const messageRoute = require('./routes/messageRoute');
const chatRoute = require('./routes/chatRoute');
// const clerkWebhookRoutes = require('./routes/clerkWebhookRoutes'); // ✅ add Clerk webhook routes

// Middlewares
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/youtube", youtubeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes); // ✅ add this
app.use("/api", quizRouter);
app.use("/api/email", emailRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);
// app.use("/api/clerk", clerkWebhookRoutes); // ✅ add Clerk webhook routes

console.log("✅ Email route mounted at /api/email");
console.log("✅ Clerk webhook route mounted at /api/clerk");

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});