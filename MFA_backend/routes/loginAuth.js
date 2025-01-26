const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../database");
const { body, validationResult } = require("express-validator"); // Add express-validator
require("dotenv").config();

const router = express.Router();

// Login route for email/password authentication
router.post(
  "/",
  // Input validation and sanitization middleware
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .trim()
      .normalizeEmail(), // Normalize email
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .trim()
      .escape(), // Sanitize password
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return validation errors to the client
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Step 1: Check if the user exists and validate the password in a single query
      const query = `
        SELECT id, email, name 
        FROM users
        WHERE email = pgp_sym_encrypt($1, $2) 
          AND password = crypt($3, password);
      `;
      const values = [email, process.env.ENCRYPTION_KEY, password];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const user = result.rows[0];

      // Step 2: Generate a JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token valid for 1 hour
      );

      // Step 3: Send the token and user details
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
