// controllers/emailController.js
const nodemailer = require("nodemailer");

// Send a custom email
const sendEmail = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Please provide email & message" });
    }

    // Create transporter with TLS fix for Render
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter
    transport.verify((err, success) => {
      if (err) console.error("❌ Transporter verification failed:", err);
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
    try {
      await transport.sendMail(mailOptions);
      console.log("✅ Email sent successfully");
      res.status(200).json({
        success: true,
        message: "✅ Email Sent Successfully!",
      });
    } catch (err) {
      console.error("❌ Error sending email:", err);
      res.status(500).json({ error: "Failed to send email" });
    }
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Handle contact form submissions
const contactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, description } = req.body;

    if (!firstName || !lastName || !email || !phone || !description) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    // Create transporter with TLS fix
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify transporter
    transport.verify((err, success) => {
      if (err) console.error("❌ Transporter verification error occurred:", err);
      else console.log("✅ Transporter verified successfully for contact form");
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

    // Mail options - send to yourself
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: messageText,
    };

    // Send email
    try {
      await transport.sendMail(mailOptions);
      console.log("✅ Contact form email sent successfully");
      res.status(200).json({
        success: true,
        message: "✅ Your message has been sent successfully!",
      });
    } catch (err) {
      console.error("❌ Error sending contact form email:", err);
      res.status(500).json({ error: "Failed to send your message" });
    }
  } catch (error) {
    console.error("Contact Form Error occurred:", error);
    res.status(500).json({ error: "Failed to send your message" });
  }
};

module.exports = { sendEmail, contactForm };
