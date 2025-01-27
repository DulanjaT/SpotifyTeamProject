import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

export default function PlaybackQueueDrawer({ accessToken, playlistUri }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [queueData, setQueueData] = useState(null); // Queue data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to toggle the drawer open/close
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Fetch playlist/queue data from Spotify
  useEffect(() => {
    if (playlistUri && accessToken) {
      fetchQueueData();
    }
  }, [ playlistUri, accessToken]);

 
    const fetchQueueData = async () => {
      try {
        setIsLoading(true);
       
          const response = await fetch(
            `https://api.spotify.com/v1/me/player/queue`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
          }
        );
        const uniqueTracks = [...new Map(data.items.map((item) => [item.track.id, item])).values()];
        setQueueData(uniqueTracks);
        
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }


    
  }
console.log("HELLO!");
  return (
    <Box>
      {/* Toggle Drawer Button */}
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        <QueueMusicIcon sx={{ color: "white" }} />
      </IconButton>

      {/* Drawer Component */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "300px", // Adjust width of drawer
            bgcolor: "background.default", // Use theme colors
            color: "text.primary",
            "--Paper-overlay": "none", // Remove the gradient locally for this Drawer
            boxShadow: "none", // Optional: Remove shadow if desired
          },
        }}
      >
        <Box p={2}>
          <Typography variant="h6">Playback Queue</Typography>
        </Box>
        {isLoading && <CircularProgress sx={{ margin: "auto" }} />}
        {error && (
          <Typography color="error" sx={{ p: 2 }}>
            Error loading queue: {error.message}
          </Typography>
        )}
        <List>
          {!isLoading &&
            !error &&
            queueData &&
            queueData.map((track, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={track.track.name}
                  secondary={track.track.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                />
              </ListItem>
            ))}
          {!isLoading && !queueData?.length && (
            <Typography sx={{ p: 2 }}>No songs in queue</Typography>
          )}
        </List>
      </Drawer>
    </Box>
  );
}
