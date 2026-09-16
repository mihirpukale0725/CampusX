const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ===============================
// Middleware
// ===============================

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ===============================
// Routes
// ===============================

const eventsRoutes = require("./routes/events");
const registrationsRoutes = require("./routes/registrations");
const usersRoutes = require("./routes/users");

// Events
app.use("/api/events", eventsRoutes);

// Registrations
app.use("/api/registrations", registrationsRoutes);

// Users / Authentication
app.use("/api/users", usersRoutes);

// Also support /api/auth/login
app.use("/api/auth", usersRoutes);

// ===============================
// Health Check
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CampusX backend is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "CampusX API is healthy",
  });
});

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ===============================
// Error Handler
// ===============================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`CampusX server running on http://localhost:${PORT}`);
});