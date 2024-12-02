import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route for sending email
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Create transporter with an SMTP server
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., Gmail (use appropriate service or SMTP configuration)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Replace with your email password or app-specific password
      },
    });

    // Define the email options
    const mailOptions = {
      from: email, // Sender's email (from the form)
      to: "babu982004@gmail.com", // Replace with your recipient's email
      subject: `New Contact Form Submission from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
