import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Box, Typography, Button, Grid2 } from "@mui/material";
import requestWrapper from "../../spotify/requestWrapper";

export default function PlaylistTracks({ playlistId, onBack }) {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestWrapper(`playlists/${playlistId}/tracks`, null, setTracks, setError);
  }, [playlistId]);

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error.message}
      </Typography>
    );
  }

  if (!tracks) {
    return <Typography>Loading tracks...</Typography>;
  }

  return (
    <Box p={2} sx={{ bgcolor: "#121212", color: "#fff", height: "100vh", overflowY: "auto" }}>
      <Button variant="contained" onClick={onBack} sx={{ mb: 2 }}>
        Back to Playlists
      </Button>
      <Typography variant="h5" gutterBottom>
        Playlist Tracks
      </Typography>

      {/* Table Header */}
      <Grid2 container sx={{ fontWeight: "bold", p: 1, borderBottom: "1px solid #333" }}>
        <Grid2 item xs={1}>
          #
        </Grid2>
        <Grid2 item xs={7}>
          Title
        </Grid2>
        <Grid2 item xs={3} sx={{color: "#ffff"}}>
          Artist
        </Grid2>
        <Grid2 item xs={1} sx={{ textAlign: "right" }}>
          Duration
        </Grid2>
      </Grid2>

      {/* Track List */}
      <List>
        {tracks.items.map((item, index) => {
          const track = item.track;

          // Skip items with invalid or null tracks
          if (!track || !track.name || !track.artists || !track.duration_ms) {
            console.warn(`Skipping invalid track at index ${index}`, item);
            return null;
          }

          // Convert duration from milliseconds to minutes:seconds
          const duration = new Date(track.duration_ms).toISOString().substr(14, 5);

          return (
            <ListItem key={index} sx={{ display: "flex", py: 1, borderBottom: "1px solid #333" }}>
              <Grid2 container alignItems="center">
                <Grid2 item xs={1}>
                  {index + 1}
                </Grid2>
                <Grid2 item xs={7}>
                  <Typography variant="body1">{track.name}</Typography>
                </Grid2>
                <Grid2 item xs={3}>
                  <Typography variant="body2" color="textSecondary">
                    {track.artists.map((a) => a.name).join(", ")}
                  </Typography>
                </Grid2>
                <Grid2 item xs={1} sx={{ textAlign: "right" }}>
                  <Typography variant="body2" color="textSecondary">
                    {duration}
                  </Typography>
                </Grid2>
              </Grid2>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}