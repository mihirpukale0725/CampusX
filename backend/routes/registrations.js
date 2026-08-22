const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// Create a new registration
router.post("/", async (req, res) => {
  try {
    const {
      eventId,
      name,
      email,
      college,
      phone,
    } = req.body;

    // Basic validation
    if (!eventId || !name || !email || !college || !phone) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if event exists
    const eventResult = await pool.query(
      "SELECT * FROM events WHERE id = $1",
      [eventId]
    );

    if (eventResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Save registration
    const result = await pool.query(
      `INSERT INTO registrations
      (event_id, name, email, college, phone)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [eventId, name, email, college, phone]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      registration: result.rows[0],
    });

  } catch (error) {
    console.error("Error creating registration:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to register for event",
    });
  }
});

module.exports = router;