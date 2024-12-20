import React, { useEffect, useState } from "react";
import PlaylistTracks from "../PlaylistTracks/PlaylistTracks";
import requestWrapper from "../../spotify/requestWrapper";
import { Typography, Box } from "@mui/material";

export default function DailyMixes() {
  const [dailyMixes, setDailyMixes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestWrapper(
      "me/playlists",
      null,
      async (data) => {
        const mixes = data.items.filter((playlist) =>
          playlist.name.toLowerCase().includes("daily mix")
        );

        const mixesWithTracks = await Promise.all(
          mixes.map(async (mix) => {
            const tracksResponse = await requestWrapper(
              `playlists/${mix.id}/tracks`
            );
            return { ...mix, tracks: tracksResponse.items };
          })
        );

        setDailyMixes(mixesWithTracks);
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

  if (dailyMixes.length > 0) {
    return (
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            marginBottom: 4,
            fontWeight: "bold",
            color: "#fff",
            textAlign: "center",
          }}
        >
          Your Daily Mixes
        </Typography>
        <Box>
          {dailyMixes.map((mix) => (
            <PlaylistTracks
              key={mix.id}
              likedTracks={mix.tracks} // Updated to use fetched tracks
              playlistName={mix.name}
            />
          ))}
        </Box>
      </Box>
    );
  } else {
    return <Typography>Loading Daily Mixes...</Typography>;
  }
}
