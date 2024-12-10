// import { useContext } from "react";
import { Box, Typography, IconButton, Slider } from "@mui/material";
import { assets } from "../../assets/assets";

const Player = () => {
  return (
    <Box
      sx={{
        height: "100px",
        bgcolor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        px: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Stack buttons and progress bar vertically
          alignItems: "center", // Center them horizontally
          justifyContent: "center", // Center them vertically within the container
          gap: 1, // Add spacing between buttons and progress bar
        }}
      >
        {/* Buttons Row */}
        <Box
          sx={{
            display: "flex",
            gap: 2, // Space between buttons
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={assets.prev_icon}
            alt="Prev Icon"
            sx={{
              width: "16px", // Matches Tailwind w-4 (4 x 4px = 16px)
              cursor: "pointer", // Pointer cursor for clickability
            }}
          />
          <Box
            component="img"
            src={assets.play_icon}
            alt="Play Icon"
            sx={{
              width: "16px", // Matches Tailwind w-4 (4 x 4px = 16px)
              cursor: "pointer", // Pointer cursor for clickability
            }}
          />
          <Box
            component="img"
            src={assets.next_icon}
            alt="Next Icon"
            sx={{
              width: "16px", // Matches Tailwind w-4 (4 x 4px = 16px)
              cursor: "pointer", // Pointer cursor for clickability
            }}
          />
        </Box>

        {/* Progress Bar */}
        <Box
          sx={{
            width: "60vw", // Responsive width
            height: "10px",
            maxWidth: "500px", // Maximum width
            bgcolor: "gray.300", // Background color
            borderRadius: "50px", // Rounded corners
            cursor: "pointer", // Pointer cursor for clickability
            backgroundColor: "grey",
          }}
        />
      </Box>
    </Box>
  );
};

export default Player;
