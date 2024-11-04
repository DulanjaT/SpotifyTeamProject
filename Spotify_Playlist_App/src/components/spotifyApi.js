import axios from 'axios';

const fetchSpotifyToken = async () => {
  try {
    const response = await axios.get('http://localhost:3001/spotify-auth');
    return response.data.access_token; // Get the token from the response
  } catch (error) {
    console.error('Error fetching token:', error);
  }
};