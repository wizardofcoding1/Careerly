const nodemailer = require("nodemailer");

const contactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, description } = req.body;

    if (!firstName || !lastName || !email || !phone || !description) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transport.verify((err, success) => {
      if (err) console.error("❌ Transporter verification error:", err.message);
      else console.log("✅ Transporter verified successfully for contact form");
    });

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

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      text: messageText,
    };

    await transport.sendMail(mailOptions);
    console.log("✅ Email sent successfully");

    res.status(200).json({
      success: true,
      message: "✅ Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("❌ Contact Form Error:", error.message);
    if (error.response) console.error("📨 SMTP Response:", error.response);
    res.status(500).json({ error: "Failed to send your message" });
  }
};

module.exports = { contactForm };
