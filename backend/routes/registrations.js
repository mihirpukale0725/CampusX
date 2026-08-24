const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// Get registrations for a student by email
router.get("/student/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const result = await pool.query(
      `SELECT
        r.id,
        r.event_id,
        r.name,
        r.email,
        r.college,
        r.phone,
        r.registered_at,
        e.title AS event_title,
        e.category,
        e.date,
        e.location
      FROM registrations r
      JOIN events e ON r.event_id = e.id
      WHERE r.email = $1
      ORDER BY r.registered_at DESC`,
      [email]
    );

    res.json({
      success: true,
      registrations: result.rows,
    });

  } catch (error) {
    console.error(
      "Error fetching student registrations:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch registrations",
    });
  }
});


// Create a new registration
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      event_id,
      name,
      email,
      college,
      phone,
    } = req.body;

    if (!name || !email || !event_id) {
      return res.status(400).json({
        success: false,
        message: "Name, email and event are required.",
      });
    }

    const result = await pool.query(
      `INSERT INTO registrations
        (user_id, event_id, name, email, college, phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        user_id || null,
        event_id,
        name,
        email,
        college || null,
        phone || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Registration successful",
      registration: result.rows[0],
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    // Duplicate registration
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "You are already registered for this event.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to register for event.",
    });
  }
});

module.exports = router;