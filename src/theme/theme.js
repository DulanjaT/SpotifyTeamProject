import { green } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // Set dark mode for Spotify-like feel
    primary: {
      main: "#FF4693", // Accent color (was spotify green(#1DB954))
    },
    secondary: {
      main: "#050208", // Dark color. (was spotify gray) #050208 is dark violet.  
    },
    background: {
      default: "#050208", // Dark background
      paper: "#140821", // Slightly lighter background for cards
      highlight: "#38195D",
    },
    text: {
      primary: "#DFD1F0", // Lightest color (used to be fff)
      secondary: "#A983D8", // Sliglty darker than lightest (used to be light grey)
    },
    test: {
      one: "#06DEFF"
    }
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
  spacing: 4,
  shape: {
    borderRadius: 10, // Default border radius for components
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
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#DFD1F0", // Text color
          textTransform: "none", // Remove uppercase styling
          "&:hover": {
            backgroundColor: "background.paper", // Custom hover color
          },
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "none", // Removes shadow globally
        "--Paper-overlay": "none", // Remove overlay gradient
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: "none", // Ensure Paper component doesn't apply shadow
        "--Paper-overlay": "none", // Remove gradient globally for Paper

      },
    },
  },

});

export default theme;