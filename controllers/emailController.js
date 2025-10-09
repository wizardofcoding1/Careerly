// controllers/emailController.js
const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Please provide email & message" });
    }

    // Create transporter
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transport.verify((err, success) => {
  if (err) console.log("Transporter Error:", err);
  else console.log("✅ Transporter ready to send emails");
});

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: "New Message From Careerly",
      text: message,
    };

    // Send email
    await transport.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "✅ Email Sent Successfully!",
    });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Handle contact form submissions
const contactForm = async (req, res) => {
  try {
    // Removed console log with request body data
    const { firstName, lastName, email, phone, description } = req.body;

    if (!firstName || !lastName || !email || !phone || !description) {
      // Removed console log with field data
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    // Create transporter
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    // Verify transporter connection

     // Verify transporter connection

    transport.verify((err, success) => {
      if (err) {
        console.error("Transporter verification error occurred");
      } else {
        console.log("✅ Transporter verified successfully for contact form");
      }
    });

    // Format the message
    const messageText = `
Contact Form Submission:
-----------------------
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Message: ${description}
-----------------------
Submitted on: ${new Date().toLocaleString()}
`;

    // Mail options - send to your email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: "New Contact Form Submission",
      text: messageText,
    };

    // Removed console log with email options

    // Send email
    const info = await transport.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    res.status(200).json({
      success: true,
      message: "✅ Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Contact Form Error occurred");
    res.status(500).json({ error: "Failed to send your message" });
  }
};

module.exports = { sendEmail, contactForm };
