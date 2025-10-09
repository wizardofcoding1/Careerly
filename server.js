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
const videoRoutes = require("./routes/videoRoutes");
const quizRouter = require("./routes/quiz");
const emailRoute = require('./routes/emailRoute.js');
const messageRoute = require('./routes/messageRoute');
const chatRoute = require('./routes/chatRoute');

// Middlewares

// ✅ Proper CORS configuration
const allowedOrigins = [
  "https://careerly-04.onrender.com", // deployed frontend
  "http://localhost:5173",             // local frontend dev
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser requests
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true,
}));

// Body parser
app.use(express.json());

// Mount routes
app.use("/api/youtube", youtubeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api", quizRouter);
app.use("/api/email", emailRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

console.log("✅ Email route mounted at /api/email");

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
