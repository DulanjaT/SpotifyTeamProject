// src/components/ReleaseRadar.js
import { useState, useEffect } from "react";
import requestWrapper from "../../spotify/requestWrapper";
import { Typography, Container, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";

export default function ReleaseRadar() {
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestWrapper("me/player/recently-played?limit=1", null, setPlaylist, setError);
  }, []); // Fetch the recently played tracks to get Release Radar playlist

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error {error.status}: {error.message}
      </Typography>
    );
  }

  if (!playlist) {
    return <Typography variant="h6">Loading Release Radar...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Release Radar</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
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
      </Grid>
    </Container>
  );
}
