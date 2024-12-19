import React, { useState, useEffect } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import addToPlaylist from "../../utilities/addToPlaylist";
import addToQueue from "../../utilities/addToQueue";

export default function TrackOptionsMenu({ trackUri, onPlaylistUpdate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [playlistMenuAnchorEl, setPlaylistMenuAnchorEl] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null); // Store the timeout ID

  const open = Boolean(anchorEl);
  const playlistMenuOpen = Boolean(playlistMenuAnchorEl);
  const accessToken = window.localStorage.getItem("accessToken");


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setPlaylistMenuAnchorEl(null);
  };

  const handlePlaylistMenuOpen = (event) => {
    setPlaylistMenuAnchorEl(event.currentTarget);
  };
  /* Messing around with a delayed open */
  const handleDelayedPlaylistMenuOpen = (event) => {
    const currentTarget = event.currentTarget; // Capture the current target immediately
    clearHoverTimeout(); // Clear any existing timeout

    const timeout = setTimeout(() => {
      setPlaylistMenuAnchorEl(currentTarget); // Use the captured target
    }, 400); 

    setHoverTimeout(timeout);
  };
  const clearHoverTimeout = () => {
    if (hoverTimeout) {
     
      clearTimeout(hoverTimeout); // Clear the timeout if hover is interrupted
      setHoverTimeout(null);
    }
  };

  const fetchPlaylists = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setPlaylists(data.items || []);
    } catch (error) {
      console.error("Failed to fetch playlists:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePlaylistMenuClose = () => {
    clearHoverTimeout();
    setPlaylistMenuAnchorEl(null);
  };


  const handleAddToPlaylist = async (playlistId) => {
    await addToPlaylist(trackUri, playlistId);

    // Call the onPlaylistUpdate callback after adding the track
    if (onPlaylistUpdate) {
      onPlaylistUpdate(playlistId);
    }
  };


  useEffect(() => {
    if (playlistMenuOpen) {
      fetchPlaylists();
    }
  }, [playlistMenuOpen]);

  return (
    <div>
      {/* Main menu button */}
      <IconButton
        aria-label="track-options"
        onClick={(event) => {
          event.stopPropagation(); // Prevent triggering parent click events
          handleMenuOpen(event);
        }}
      >
        <MoreVertIcon />
      </IconButton>

      {/* Main menu */}
      <Menu
        id="track-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "more-options-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            width: "200px", // Adjust the width of the main menu
          },
        }}
      >

        {/* Add to Playlist */}
        <MenuItem
          onMouseEnter={handleDelayedPlaylistMenuOpen} // Open submenu with delay
          onMouseLeave={clearHoverTimeout}
          aria-controls="playlist-menu"
          aria-haspopup="true"
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add to Playlist" />
          
        </MenuItem>
        {/* Add to Queue */}
        <MenuItem
          onClick={(event) => {
            event.stopPropagation(); // Prevent triggering other menu actions
            addToQueue(trackUri); // Call your utility function
            handleMenuClose(); // Close the menu after adding to the queue
          }}
        >
          <ListItemIcon>
            <QueueMusicIcon />
          </ListItemIcon>
          <ListItemText primary="Add to Queue" />
        </MenuItem>
      </Menu>


      {/* Playlist submenu */}
      <Menu
        id="playlist-menu"
        anchorEl={playlistMenuAnchorEl}
        open={playlistMenuOpen}
        onClose={() => {
          console.log("Submenu closed"); // Debugging
          handlePlaylistMenuClose(); // Explicitly close the submenu
        }}
        MenuListProps={{
          "aria-labelledby": "playlist-menu-button",
          onMouseLeave: () => {
            console.log("Mouse left submenu"); // Optional debugging
          },
        }}
        sx={{
          "& .MuiPaper-root": {
            width: "250px", // Adjust the width of the playlist menu
            maxHeight: "300px", // Limit the height and make it scrollable if needed
            overflowY: "auto", // Add scroll if the playlists overflow
          },
        }}
      >

        {isLoading ? (
          <MenuItem>
            <CircularProgress size={24} />
          </MenuItem>
        ) : (
          playlists.map((playlist) => (
            <MenuItem
              key={playlist.id}
              onClick={(event) => {
                event.stopPropagation(); // Prevent triggering parent click events
                handleAddToPlaylist(playlist.id);
                handleMenuClose();
              }}
              sx={{
                fontSize: "0.9rem", // Smaller font for a compact look
                "&:hover": {
                  bgcolor: "primary.light", // Highlight on hover
                },
              }}
            >
              <ListItemText primary={playlist.name} />
            </MenuItem>
          ))
        )}
      </Menu>
    </div>
  );
}