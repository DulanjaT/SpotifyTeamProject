import React, { useEffect, useState } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Grid } from "@mui/material";
import requestWrapper from "../../spotify/requestWrapper";
import addToQueue from "../../utilities/addToQueue";
import addToPlaylist from "../../utilities/addToPlaylist";
import TinyButton from "../Button.jsx/Button";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import TrackOptionsMenu from "../TrackOptionsMenu/TrackOptionsMenu";
export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm.trim()) return;
    fetchSearchResults();
  }, [searchTerm]); // Dependency array ensures this runs when searchTerm changes



  const handleAddToQueue = () => {
    console.log("Add to Queue clicked");
  };

  const handleRemove = () => {
    console.log("Remove from Playlist clicked");
  };



  const fetchSearchResults = async () => {
    try {
      await requestWrapper(
        `search?q=${encodeURIComponent(searchTerm)}&type=track,artist`,
        null, // No additional options
        setResults, // Update results state
        setError // Update error state
      );
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };
  const handleAddToPlaylist = async (trackUri) => {
    const playlistId = localStorage.getItem("playlistId"); // Retrieve playlist ID from localStorage
    if (!playlistId) {
      alert("No playlist is currently selected. Please create or select a playlist.");
      return;
    }
    try {
      await addToPlaylist(trackUri); // Add track to playlist using the utility function
      alert("Track added to playlist successfully!");
    } catch (err) {
      console.error("Error adding track to playlist:", err);
      alert("Failed to add track to playlist.");
    }
  };


  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error.message}
      </Typography>
    );
  }
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
  }
  return (
    <Box
      sx={{
        bgcolor: "#121212",
        color: "#fff",
        padding: 2,
        height: "100vh",
       
      }}
    >
      {/* Search Input */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search for songs or artists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{
            bgcolor: "#fff",
            borderRadius: 1,
            color: "black", // Text color inside the input
            "& .MuiInputBase-input": {
              color: "black", // Ensure input text is black
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ccc", // Border color
              },
              "&:hover fieldset": {
                borderColor: "#1DB954", // Spotify green on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1DB954", // Spotify green when focused
              },
            },
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {/* Results */}
      {!results ? (
        <Typography>Type something to search...</Typography>
      ) : (
        <List>
          {results.tracks?.items.map((track, index) => (
            <ListItem
              key={track.id}
              sx={{ display: "flex", alignItems: "center", borderBottom: "1px solid #333", padding: 1 }}
            >
              {/* Song Information */}
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <Typography>{index + 1}</Typography>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">{track.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {track.album.images[0] && (
                    <img
                      src={track.album.images[0].url}
                      alt={track.name}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  )}
                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right" }}>
                  {/*     <Button
                    variant="outlined"
                    size="small"
                    sx={{ color: "#1DB954", borderColor: "#1DB954" }}
                    onClick={() => addToQueue(track.uri)}
                  >
                    Add to Queue
                  </Button> */}
                  <TrackOptionsMenu
                    onAddToPlaylist={() => handleAddToPlaylist(track.uri)}
                    onAddToQueue={() => handleAddToQueue(track.uri)} 
                    />
                  <TinyButton
                    icon={<AddSharpIcon />} // Replace with your desired icon
                    tooltip="Add to Playlist"
                    onClick={() => handleAddToPlaylist(track.uri)}
                  />

                </Grid>
                <Grid item xs={2} sx={{ textAlign: "right" }}>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}