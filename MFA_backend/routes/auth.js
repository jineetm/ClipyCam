const express = require('express');
const axios = require('axios');
const pool = require('../database'); // Database connection

const router = express.Router();


router.post('/google', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.error('Token is missing');
    return res.status(400).json({ error: 'Google token is required' });
  }

  console.log('Received token:', token);

  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    console.log('Google API Response:', response.data);

    const { sub, email, name } = response.data;

    let result = await pool.query('SELECT * FROM users WHERE google_id = $1', [sub]);
    let user = result.rows[0];

    if (!user) {
      const insertResult = await pool.query(
        'INSERT INTO users (google_id, email, display_name) VALUES ($1, $2, $3) RETURNING *',
        [sub, email, name]
      );
      user = insertResult.rows[0];
    }

    console.log('User data:', user);

    res.status(200).json({ message: 'Sign-In successful', user });
  } catch (error) {
    console.error('Error during Google Sign-In:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.post('/google', async (req, res) => {
//   const { token } = req.body; // Get the token from the request body

//   if (!token) {
//     return res.status(400).json({ error: 'Google token is required' });
//   }

//   console.log('token',token);

//   try {
//     // Step 1: Verify the token with Google
//     const response = await axios.get(
//       `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
//     );

//     const { sub, email, name, picture } = response.data; // Extract user info
//     console.log('Data received from Google API:', response.data); // Log Google API data

//     // Step 2: Check if the user exists in the database
//     let result = await pool.query('SELECT * FROM users WHERE google_id = $1', [sub]);
//     let user = result.rows[0];

//     if (!user) {
//       // Step 3: If user doesn't exist, insert into the database
//       const insertResult = await pool.query(
//         'INSERT INTO users (google_id, email, display_name) VALUES ($1, $2, $3) RETURNING *',
//         [sub, email, name]
//       );
//       user = insertResult.rows[0];
//       console.log('New user inserted into the database:', user); // Log new user
//     } else {
//       console.log('Existing user retrieved from the database:', user); // Log existing user
//     }

//     // Step 4: Respond with user details
//     res.status(200).json({ message: 'Sign-In successful', user });
//   } catch (error) {
//     console.error('Error during Google Sign-In:', error.message); // Log errors
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

 module.exports = router;
