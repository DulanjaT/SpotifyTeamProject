import React, { useEffect, useState } from "react";
import PlaylistTracks from "../PlaylistTracks/PlaylistTracks";
import requestWrapper from "../../spotify/requestWrapper";
import { Typography } from "@mui/material";

export default function MyPlaylist() {
  const [tracks, setTracks] = useState({ items: [] }); // Initialize with { items: [] }
  const [error, setError] = useState(null);

  useEffect(() => {
    requestWrapper(
      "me/tracks",
      null,
      (data) => {
        setTracks({ items: data.items || [] }); // Ensure items key exists
      },
      setError
    );
  }, []);

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error.message}
      </Typography>
    );
  }

  if (tracks.items.length > 0) {
    return (
      <PlaylistTracks
        likedTracks={tracks.items}
        isLikedSongs={true}
        playlistName={"Liked Songs"}
      />
    );
  } else {
    return <Typography>Loading tracks...</Typography>;
  }
}