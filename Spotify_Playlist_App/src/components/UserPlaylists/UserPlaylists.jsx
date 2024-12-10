import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemButton, ListItemText, Typography, Box } from "@mui/material";
import { useOutletContext } from "react-router"; // Access onSelectTrack via context
import requestWrapper from "../../spotify/requestWrapper";

export default function Playlists() {
  const { onSelectTrack } = useOutletContext(); // Get onSelectTrack from OutletContext
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user's playlists
    requestWrapper("me/playlists", null, setPlaylists, setError);
  }, []);

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error.message}
      </Typography>
    );
  }

  if (!playlists) {
    return <Typography>Loading playlists...</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Your Playlists
      </Typography>
      <List>
        {playlists.items.map((playlist) => (
          <ListItem
            key={playlist.id}
            disablePadding
            onClick={() => onSelectTrack(`spotify:playlist:${playlist.id}`)} // Pass the playlist URI
          >
            <ListItemButton>
              <ListItemText primary={playlist.name} secondary={`${playlist.tracks.total} tracks`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}