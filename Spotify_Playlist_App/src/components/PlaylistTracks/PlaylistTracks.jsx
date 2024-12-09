import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Box, Typography, Button } from "@mui/material";
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
    <Box p={2}>
      <Button variant="contained" onClick={onBack} sx={{ mb: 2 }}>
        Back to Playlists
      </Button>
      <Typography variant="h5" gutterBottom>
        Playlist Tracks
      </Typography>
      <List>
        {tracks.items.map((item, index) => {
          const track = item.track;

          // Skip items with invalid or null tracks
          if (!track || !track.name || !track.artists) {
            console.warn(`Skipping invalid track at index ${index}`, item);
            return null;
          }

          return (
            <ListItem key={index}>
              <ListItemText
                primary={track.name}
                secondary={`Artist: ${track.artists.map((a) => a.name).join(", ")}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}