import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Set dark mode for Spotify-like feel
    primary: {
      main: "#1DB954", // Spotify green
    },
    secondary: {
      main: "#535353", // Spotify gray
    },
    background: {
      default: "#121212", // Dark background
      paper: "#181818", // Slightly lighter background for cards
    },
    text: {
      primary: "#FFFFFF", // White text for primary content
      secondary: "#B3B3B3", // Light gray for secondary text
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Remove uppercase styling
          borderRadius: "20px", // Add rounded corners
        },
      },
    },
  },
});

export default theme;