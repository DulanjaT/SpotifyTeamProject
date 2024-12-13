import { useEffect, useState } from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import requestWrapper from "../../spotify/requestWrapper";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use the request wrapper to fetch user info
    requestWrapper("me", null, setUserInfo, setError);
  }, []);

  if (error) {
    return (
      <Typography color="error">
        Failed to fetch user info: {error.message}
      </Typography>
    );
  }

  if (!userInfo) {
    return <Typography>Loading user info...</Typography>;
  }

  return (
    <Box display="flex" alignItems="center" p={2}>
      <Avatar
        src={userInfo.images?.[0]?.url || ""}
        alt={userInfo.display_name || "User Avatar"}
        sx={{ width: 40, height: 40 }}
      />
      <Typography sx={{ ml: 1, fontSize: "0.875rem", color: "white" }}>
        {userInfo.display_name}
      </Typography>
    </Box>
  );
}
