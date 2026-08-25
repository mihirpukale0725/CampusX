const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const pool = require("../config/db");

// ===============================
// REGISTER
// ===============================

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      college,
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    // Check existing user
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = await pool.query(
      `INSERT INTO users
        (name, email, password, college)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, college, created_at`,
      [
        name,
        email,
        hashedPassword,
        college || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: result.rows[0],
    });

  } catch (error) {
    console.error("Registration error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create account.",
    });
  }
});


// ===============================
// LOGIN
// ===============================

router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user
    const result = await pool.query(
      `SELECT *
       FROM users
       WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const user = result.rows[0];

    // Compare password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Don't send password to frontend
    delete user.password;

    res.json({
      success: true,
      message: "Login successful.",
      user,
    });

  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});


module.exports = router;