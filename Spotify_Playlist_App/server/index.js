const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors package

dotenv.config();

const app = express();
const PORT = 3001;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173' // Allow only this origin to access your API
}));
app.get('/spotify-auth', async (req, res) => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    data: 'grant_type=client_credentials',
  };

  try {
    const response = await axios(authOptions);
    res.json(response.data); // Sends back the token to the client
  } catch (error) {
    console.error('Error fetching Spotify token:', error.response ? error.response.data : error.message);
    res.status(500).send('Error fetching Spotify token');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});