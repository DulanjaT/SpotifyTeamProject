import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const HomePage = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  const fetchArtistById = async (artistId, accessToken) => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching artist data:", error);
      throw error;
    }
  };

  const fetchFeaturedArtists = async () => {
    const artistIds = [
      "06HL4z0CvFAxyc27GXpf02", // Taylor
      "1Xyo4u8uXC1ZmMpatF05PJ", // The Weeknd
      "6eUKZXaKkcviH0Ku9w2n3V", // Ed Sheeran
      "4gzpq5DPGxSnKTe4SA8HAU", // Coldplay
    ];

    const accessToken = localStorage.getItem("accessToken"); // Retrieve token from localStorage
    if (!accessToken) {
      setError("Access token is missing. Please log in.");
      return;
    }

    try {
      const artistPromises = artistIds.map((id) =>
        fetchArtistById(id, accessToken)
      );
      const artistData = await Promise.all(artistPromises);
      setArtists(artistData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchFeaturedArtists();
  }, []);

  if (error) {
    return (
      <Typography color="error" variant="h6">
        {`Error loading artists: ${error}`}
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Featured Artists
      </Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        {artists.length === 0 ? (
          <Typography>Loading artists...</Typography>
        ) : (
          artists.map((artist) => (
            <Card key={artist.id} sx={{ width: 300 }}>
              <CardMedia
                component="img"
                image={
                  artist.images?.[0]?.url || "https://via.placeholder.com/300"
                }
                alt={artist.name}
                sx={{ height: 200 }}
              />
              <CardContent>
                <Typography variant="h6">{artist.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Followers: {artist.followers.total.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Genres: {artist.genres.join(", ") || "Not Available"}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
