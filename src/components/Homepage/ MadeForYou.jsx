import { useState, useEffect } from "react";
import requestWrapper from "../../spotify/requestWrapper";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";

export default function MadeForYou() {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestWrapper("me/playlists?limit=5", null, setPlaylists, setError);
  }, []);

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error {error.status}: {error.message}
      </Typography>
    );
  }

  if (!playlists) {
    return (
      <Container>
        <CircularProgress />
        <Typography variant="h6">Loading playlists...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Made for You
      </Typography>
      <Grid container spacing={3}>
        {playlists.items.map((playlist) => (
          <Grid item xs={12} sm={6} md={4} key={playlist.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={playlist.images[0]?.url || "/placeholder-image.png"}
                alt={playlist.name}
              />
              <CardContent>
                <Typography variant="h6">{playlist.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {playlist.description || "Your curated playlist"}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  aria-label={`Listen to ${playlist.name} on Spotify`}
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
