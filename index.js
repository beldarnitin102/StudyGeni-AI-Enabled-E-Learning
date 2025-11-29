require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/authRoutes");
const fileRoutes = require("./routes/fileRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect MongoDB
connectDB();

// Test root route (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// API Routes
app.use("/auth", authRoutes);
app.use("/files", fileRoutes);
app.use("/ai", aiRoutes);

// Export for Vercel Serverless
module.exports = app;
