// const express = require('express');
// const axios = require('axios');
// const pool = require('../database'); // Database connection
// require('dotenv').config();

// const router = express.Router();

// // Retrieve the encryption key from the environment variable
// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// router.post('/google', async (req, res) => {
//   const { token } = req.body;

//   if (!token) {
//     console.error('Token is missing');
//     return res.status(400).json({ error: 'Google token is required' });
//   }

//   console.log('Received token:', token);

//   try {
//     // Step 1: Verify the token with Google
//     const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
//     console.log('Google API Response:', response.data);

//     // Extract user information from the Google API response
//     const { sub: google_id, email, name } = response.data;

//     // Split full name into first_name and last_name
//     console.log('Full Name from Google:', name);

//     const [first_name, ...last_nameParts] = name ? name.split(' ') : [''];
//     const last_name = last_nameParts.join(' ');

//     console.log('First Name:', first_name);
//     console.log('Last Name:', last_name);

//     // Ensure first_name and last_name are set to null if empty
//     const sanitizedFirstName = first_name || null;
//     const sanitizedLastName = last_name || null;

//     // Step 2: Check if the user exists in the database using hashed_google_id
//     const selectQuery = `
//       SELECT * FROM users 
//       WHERE hashed_google_id = encode(digest($1, 'sha256'), 'hex')
//     `;
//     const result = await pool.query(selectQuery, [google_id]);
//     let user = result.rows[0];

//     if (!user) {
//       // Step 3: If user doesn't exist, insert into the database with encryption and hashing
//       const insertQuery = `
//         INSERT INTO users (
//           google_id, 
//           email, 
//           hashed_google_id, 
//           first_name, 
//           last_name, 
//           createdAt, 
//           updatedAt
//         )
//         VALUES (
//           pgp_sym_encrypt($1, $5),                     -- Encrypt google_id
//           pgp_sym_encrypt($2, $5),                     -- Encrypt email
//           encode(digest($1, 'sha256'), 'hex'),         -- Hash google_id
//           $3,                                          -- First name
//           $4,                                          -- Last name
//           NOW(),
//           NOW()
//         )
//         RETURNING *;
//       `;
//       const parameters = [google_id, email, sanitizedFirstName, sanitizedLastName, ENCRYPTION_KEY];

//       console.log('Executing Insert Query:', insertQuery);
//       console.log('With Parameters:', parameters);

//       const insertResult = await pool.query(insertQuery, parameters);
//       user = insertResult.rows[0];
//       console.log('New user inserted into the database:', user);
//     } else {
//       console.log('Existing user retrieved from the database:', user);

//       // Step 3a: Update first_name and last_name if they are NULL
//       const updateQuery = `
//         UPDATE users
//         SET first_name = COALESCE($1, first_name),
//             last_name = COALESCE($2, last_name),
//             updatedAt = NOW()
//         WHERE hashed_google_id = encode(digest($3, 'sha256'), 'hex')
//         RETURNING *;
//       `;
//       const updateParameters = [sanitizedFirstName, sanitizedLastName, google_id];

//       console.log('Executing Update Query:', updateQuery);
//       console.log('With Parameters:', updateParameters);

//       const updateResult = await pool.query(updateQuery, updateParameters);
//       user = updateResult.rows[0];
//       console.log('User updated in the database:', user);
//     }

//     // Step 4: Respond with user details (excluding sensitive data)
//     res.status(200).json({ message: 'Sign-In successful', user });
//   } catch (error) {
//     console.error('Error during Google Sign-In:', error.message);

//     // Check for specific Axios or database errors
//     if (error.response) {
//       console.error('Error response from Google:', error.response.data);
//       return res.status(400).json({ error: 'Invalid Google token', details: error.response.data });
//     }

//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;



const express = require("express");
const googleAuthRoutes = require("./googleAuth"); // Google OAuth routes
const loginAuthRoutes = require("./loginAuth"); // Email/password login routes

const router = express.Router();

// Mount the Google OAuth routes at /auth/google
router.use("/google", googleAuthRoutes);

// Mount the email/password login routes at /auth/login
router.use("/login", loginAuthRoutes);

module.exports = router;
