import React from "react";
import { Link } from "react-router";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import UserInfo from "../UserInfo/UserInfo";
import { logout } from "../../utilities/logout"; // Adjust the relative path
// import { ReactComponent as Logo } from "../../assets/logo.svg";
import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <AppBar
      position="absolute"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        height: "64",
        boxShadow: "none",
        "--Paper-overlay": "none",
      }}
    >
      <Toolbar>
        {/* App logo */}
        {/* <Logo style={{ width: "50px", height: "50px" }} /> */}
        <img
          src={logo}
          alt="App Logo"
          style={{ width: "32px", height: "32" }}
        />

        {/* App Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textDecoration: "none", color: "text.primary" }}
          component={Link}
          to="/"
        >
          SimpleTunes
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
