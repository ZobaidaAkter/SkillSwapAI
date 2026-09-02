const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const requestRoutes = require("./routes/requestRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();


// ===============================
// Middleware
// ===============================

// Allow frontend during development and production
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SkillSwap AI Backend is running!",
  });
});


// ===============================
// Database Test
// ===============================

app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT 1 AS test"
    );

    res.json({
      success: true,
      message: "MySQL database connected successfully!",
      result: rows,
    });
  } catch (error) {
    console.error(
      "Database connection error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Database connection failed!",
    });
  }
});


// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/profile", profileRoutes);


// ===============================
// API 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});


// ===============================
// Global Error Handler
// ===============================

app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS policy blocked this request",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});


// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});