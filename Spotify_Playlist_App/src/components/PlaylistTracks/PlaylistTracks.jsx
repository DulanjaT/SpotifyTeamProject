import { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Box, Typography, Button, Grid } from "@mui/material";
import requestWrapper from "../../spotify/requestWrapper";
import { useOutletContext } from "react-router";
import TinyButton from "../Button.jsx/Button";
import AddIcon from "@mui/icons-material/Add";
import addToQueue from "../../utilities/addToQueue";


export default function PlaylistTracks({ playlistId, onBack }) {
  const { onSelectTrack } = useOutletContext(); // Get onSelectTrack from OutletContext
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

  const handleAddToQueue = (trackUri) => {
    console.log("Adding to queue:", trackUri);
    // Call Spotify API to add to queue
     addToQueue(trackUri);
  };

  return (
    <Box
    sx={{
      bgcolor: "#121212",
      color: "#fff",
      padding: 2,
      height: "100vh",
      overflowY: "auto",
    }}
  >
    {/* Back Button */}
    <Button variant="contained" onClick={onBack} sx={{ mb: 2 }}>
      Back to Playlists
    </Button>

    {/* Playlist Tracks Header */}
    <Typography variant="h5" gutterBottom>
      Playlist Tracks
    </Typography>

    {/* Table Header */}
    <Grid container sx={{ fontWeight: "bold", p: 1, borderBottom: "1px solid #333" }}>
      <Grid item xs={1}>
        #
      </Grid>
      <Grid item xs={2}>
        
      </Grid>
      <Grid item xs={4}>
        Title
      </Grid>
      <Grid item xs={3}>
        Album
      </Grid>
       <Grid item xs={2}>
        
      </Grid> 
    </Grid>

    {/* Track List */}
    <List>
      {tracks.items.map((item, index) => {
        const track = item.track;

        // Skip invalid or null tracks
        if (!track || !track.name || !track.artists || !track.album) {
          return null;
        }

        return (
          <ListItem
          key={track.id}
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid #333",
            padding: 1,
            cursor: "pointer",
            transition: "background-color 0.2s ease", // Smooth transition for hover
            "&:hover": {
              backgroundColor: "#1db954", // Spotify green highlight
            },
          }}
          onClick={() => onSelectTrack(track.uri)}
        >
            <Grid container alignItems="center">
              {/* Index */}
              <Grid item xs={1}>
                <Typography>{index + 1}</Typography>
              </Grid>

              {/* Album Art */}
              <Grid item xs={2}>
                {track.album.images[0] && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.album.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                )}
              </Grid>

              {/* Track Details */}
              <Grid item xs={4}>
                <Typography variant="body1">{track.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </Typography>
              </Grid>

              {/* Album Name */}
              <Grid item xs={3}>
                <Typography variant="body2" color="textSecondary">
                  {track.album.name}
                </Typography>
              </Grid>

              {/* Add to Queue Button */}
              <Grid item xs={2} sx={{ textAlign: "center" }}>
                <TinyButton
                  icon={<AddIcon />}
                  tooltip="Add to Queue"
                  onClick={(event) => {
                    event.stopPropagation(); // Prevent triggering the ListItem's onClick
                    handleAddToQueue(track.uri);
                  }}
                />
              </Grid>
            </Grid>
          </ListItem>
        );
      })}
    </List>
  </Box>
);
}