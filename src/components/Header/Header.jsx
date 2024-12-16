import React from "react";
import { Link } from "react-router";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import UserInfo from "../UserInfo/UserInfo";
import { logout } from "../../utilities/logout"; // Adjust the relative path

export default function Header() {
  return (
    <AppBar position="absolute" sx={{ bgcolor: "transparent", height: "0" }}>
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

        <UserInfo />
        {/* Navigation Links */}
        <Box>
          {/* <Button component={Link} to="/artist" color="inherit">
            Artist Demo(To be removed)
          </Button> */}
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
