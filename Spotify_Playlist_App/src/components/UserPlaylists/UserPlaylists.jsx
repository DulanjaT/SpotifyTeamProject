import { useEffect, useState } from "react";
import { List, ListItem, ListItemButton, ListItemText, Box, Typography } from "@mui/material";
import requestWrapper from "../../spotify/requestWrapper";
import PlaylistTracks from "../PlaylistTracks/PlaylistTracks";
import fallbackImage from "../../assets/musicIcon.jpg";
export default function UserPlaylists() {
  const [playlists, setPlaylists] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
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

  if (selectedPlaylist) {
    return (
      <PlaylistTracks
        playlistId={selectedPlaylist}
        onBack={() => setSelectedPlaylist(null)}
      />
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Your Playlists
      </Typography>
      <List>
  {playlists.items.map((playlist) => {
    if (!playlist || !playlist.name) return null; // Skip invalid playlists
    const imageSrc = playlist.images?.[0]?.url || fallbackImage; // Use playlist image or fallback image
    return (
      <ListItem key={playlist.id} disablePadding>
        <ListItemButton onClick={() => setSelectedPlaylist(playlist.id)}>
          <ListItemText
          primary={playlist.name}
          secondary={`Tracks: ${playlist.tracks.total}`}
          />
        </ListItemButton>
        <img src={imageSrc} alt={playlist.name} width="50" />
      </ListItem>
    );
  })}
</List>
    </Box>
  );
}