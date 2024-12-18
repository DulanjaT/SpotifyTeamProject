import React from "react";
import { IconButton, Tooltip } from "@mui/material";

export default function TinyButton({ icon, tooltip, onClick }) {
  return (
    <Tooltip title={tooltip || ""} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          padding: "5px", // Smaller padding for a compact button
          fontSize: "small",
          color: "#fff", // Default white color
          "&:hover": {
            color: "primary.main", // Spotify green on hover
          },
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}
