import React from "react";
import { Link } from "react-router";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import UserInfo from "../UserInfo/UserInfo";
import SpotifyLogo from "../../assets/spotify-logo.png"; // Adjust path as needed

export default function Header() {
  return (
    <AppBar position="absolute" sx={{ bgcolor: "transparent", height: "0" }}>
      <Toolbar>
        {/* Spotify Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src={SpotifyLogo}
            alt="Spotify Logo"
            style={{
              height: "40px",
              marginRight: "10px",
            }}
          />
          {/* App Title */}
          <Typography variant="h6" sx={{ color: "white" }}>
            Spotify App
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box>
          <Button component={Link} to="/artist" color="inherit">
            Artist Demo (To be removed)
          </Button>
        </Box>
        <UserInfo />
      </Toolbar>
    </AppBar>
  );
}
