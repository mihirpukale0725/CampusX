const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");
const eventsRouter = require("./routes/events");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/events", eventsRouter);

app.get("/", (req, res) => {
  res.send("CampusX API is running 🚀");
});

app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      success: true,
      message: "PostgreSQL connection successful 🚀",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CampusX server running on http://localhost:${PORT}`);
});