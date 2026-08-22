const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// Get all events
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM events ORDER BY id ASC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching events:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
});

// Get single event by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM events WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching event:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
});

module.exports = router;