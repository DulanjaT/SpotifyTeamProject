import React, { useEffect, useState } from "react";

import PlaylistTracks from "../PlaylistTracks/PlaylistTracks";
import requestWrapper from "../../spotify/requestWrapper";
import { Typography } from "@mui/material";

export default function MyPlaylist() {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestWrapper("me/tracks", null, setTracks, setError);
  }, []);

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error.message}
      </Typography>
    );
  }

  if (tracks !== null) {
    return (
      <PlaylistTracks
        likedTracks={tracks}
        isLikedSongs={true}
        playlistName={"Liked Songs"}
      />
    );
  } else {
    return <Typography>Loading tracks...</Typography>;
  }
}
