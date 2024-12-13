// src/components/DiscoverWeekly.js
import { useState, useEffect } from "react";
import requestWrapper from "../../spotify/requestWrapper";
import { Typography, Container, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";

export default function DiscoverWeekly() {
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestWrapper("me/player/queue?limit=1", null, setPlaylist, setError);
  }, []); // Fetch the current playback queue to get Discover Weekly playlist

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error {error.status}: {error.message}
      </Typography>
    );
  }

  if (!playlist) {
    return <Typography variant="h6">Loading Discover Weekly...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Discover Weekly</Typography>
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
