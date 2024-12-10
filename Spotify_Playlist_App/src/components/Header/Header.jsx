import React from "react";
import { Link } from "react-router"; 
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import UserInfo from "../UserInfo/UserInfo";

export default function Header() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1d1d1d" }}>
      <Toolbar>
        {/* App Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          component={Link}
          to="/"
        >
          Spotify App
        </Typography>

        {/* Navigation Links */}
        <Box>
          <Button component={Link} to="/app" color="inherit">
            App (Playlist Demo)
          </Button>
          <Button component={Link} to="/artist" color="inherit">
            Artist Demo
          </Button>
          <Button component={Link} to="/search" color="inherit">
            Search
          </Button>
          <Button component={Link} to="/playlists" color="inherit">
            All Playlists
          </Button>
        </Box>
		<UserInfo />
      </Toolbar>
    </AppBar>
  );
}