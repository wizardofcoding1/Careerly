// routes/emailRoute.js
const express = require("express");
const { sendEmail, contactForm } = require("../controllers/emailController");

const router = express.Router();

// GET /api/email
router.get("/", (req, res) => {
  res.status(200).json({ message: "Email API is working" });
});



// POST /api/email/send
router.post("/send", sendEmail);

// POST /api/email/contact
router.post("/contact", contactForm);

module.exports = router;
