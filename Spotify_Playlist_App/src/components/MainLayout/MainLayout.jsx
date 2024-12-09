import React from "react";
import { Box, Grid2, Typography, List, ListItem, ListItemButton, ListItemText, Avatar } from "@mui/material";
import UserInfo from "../UserInfo/UserInfo";
import UserPlaylists from "../UserPlaylists/UserPlaylists";
import { Outlet } from "react-router";
import SongSearch from "../SongSearch/SongSearch";

export default function MainLayout() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Main Grid */}
      <Grid2 container sx={{ flexGrow: 1 }}>
        {/* Sidebar */}
        <Grid2
          item="true"
          xs={2}
          sx={{
            bgcolor: "#1d1d1d",
            color: "#fff",
            p: 2,
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
          item="true"
          xs={8}
          sx={{
            bgcolor: "#121212",
            color: "#fff",
            p: 3,
            overflowY: "auto",
          }}
          >
            <SongSearch/>
        </Grid2>

        {/* User Info Section */}
        <Grid2
          item="true"
          xs={5}
          sx={{
            bgcolor: "#1d1d1d",
            color: "#fff",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          
        </Grid2>
      </Grid2>
    </Box>
  );
}