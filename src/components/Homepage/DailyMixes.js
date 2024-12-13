// src/components/DailyMixes.js
import { useState, useEffect } from "react";
import requestWrapper from "../../spotify/requestWrapper";
import { Typography, Container, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";

export default function DailyMixes() {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestWrapper("me/player/queue?limit=5", null, setPlaylists, setError);
  }, []); // Fetch recently played tracks to get Daily Mixes playlists

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error {error.status}: {error.message}
      </Typography>
    );
  }

  if (!playlists) {
    return <Typography variant="h6">Loading Daily Mixes...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Daily Mixes</Typography>
      <Grid container spacing={3}>
        {playlists.items.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} key={playlist.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={playlist.images[0]?.url}
                alt={playlist.name}
              />
              <CardContent>
                <Typography variant="h6">{playlist.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={playlist.external_urls.spotify}
                  target="_blank"
                >
                  Listen
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
