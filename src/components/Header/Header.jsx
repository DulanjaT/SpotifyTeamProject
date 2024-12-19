import React, { useContext } from "react";
import { Link } from "react-router";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import Me from "../Me/Me";
import { logout } from "../../utilities/logout"; // Adjust the relative path
// import { ReactComponent as Logo } from "../../assets/logo.svg";
import logo from "../../assets/logo.svg";
import SearchField from "../SearchField/SearchField";
import styles from "./Header.module.css";
import SpotifyAuthContext from "../../contexts/SpotifyAuthContext";

export default function Header()
{
	return (
		<AppBar elevation={0} className={styles.AppBar} >
			<Toolbar sx={{justifyContent: "space-between"}}>
				<div className={styles.ToolbarSection}>
					<img src={logo} alt="App Logo" className={styles.Logo}/>
					<Typography variant="h6" component={Link} to="/" className={styles.LogoText}>
						SimpleTunes
					</Typography>
				</div>
				<div className={styles.ToolbarSection}>
					<SearchField />
				</div>
				<div className={styles.ToolbarSection}>
					<Me />
				</div>
			</Toolbar>
		</AppBar>
	);
}
