import React from "react";
import {
  Box,
  Grid2,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
} from "@mui/material";
import UserInfo from "../UserInfo/UserInfo";
import UserPlaylists from "../UserPlaylists/UserPlaylists";
import SongSearch from "../SongSearch/SongSearch";

export default function MainLayout() {
  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height
        display: "flex",
      }}
    >
      {/* Main Grid */}

      {/* Sidebar (Non-scrollable) */}
      <Grid2 container sx={{ flex: 1 }}>
        <Grid2
          item="true"
          sx={{
            width: "200px", // Added fixed width
            bgcolor: "#1d1d1d",
            color: "#fff",
            p: 2,
            flexShrink: 0, // Prevents sidebar from shrinking
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Spotify
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Search" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Library" />
              </ListItemButton>
            </ListItem>
          </List>
        </Grid2>

        {/* Main Content */}
        <Grid2
          item
          sx={{
            flex: 1, // Fill remaining space
            bgcolor: "#121212",
            color: "#fff",
            p: 3,
            overflowY: "auto",
          }}
        >
          <SongSearch />
        </Grid2>
      </Grid2>
    </Box>
  );
}
