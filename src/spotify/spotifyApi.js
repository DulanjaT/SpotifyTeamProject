/*
import axios from 'axios';

export const searchSongs = async (query) => {
  try {
    // First, get the access token from your backend
    const tokenResponse = await axios.get('http://localhost:3001/spotify-auth');
    const token = tokenResponse.data.access_token;

    // Use the token to make a search request to the Spotify API
    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,        // The search term (song name, artist, etc.)
        type: 'track',   // Specify 'track' to search for songs
        limit: 10        // Limit results for simplicity
      },
    });

    // Return the array of tracks
    return response.data.tracks.items;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};
*/