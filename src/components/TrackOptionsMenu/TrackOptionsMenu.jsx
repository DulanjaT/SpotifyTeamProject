import React, { useState } from "react";
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TrackOptionsMenu({ onAddToPlaylist, onAddToQueue}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Button to trigger the menu */}
      <IconButton
        aria-label="more options"
        aria-controls="track-options-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <MoreVertIcon />
      </IconButton>

      {/* Pop-up menu */}
      <Menu
        id="track-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "more-options-button",
        }}
      >
        {/* Menu Items */}
        <MenuItem
          onClick={() => {
            onAddToPlaylist();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add to Playlist" />
        </MenuItem>
        {/* Add To Queue */}
        <MenuItem
          onClick={() => {
            onAddToQueue();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <QueueMusicIcon />
          </ListItemIcon>
          <ListItemText primary="Add to Queue" />
        </MenuItem>
{/* Remove  function not made yet*/}
   {/*      <MenuItem
          onClick={() => {
            onRemove();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary="Remove from Playlist" />
        </MenuItem> */}
      </Menu>
    </div>
  );
}