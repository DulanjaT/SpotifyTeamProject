import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Slider,
  Stack,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

export default function SimpleWebPlayer({ trackUri }) {
  const [accessToken, setAccessToken] = useState(null);
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trackDetails, setTrackDetails] = useState({
    trackName: "Loading...",
    artistName: "Loading...",
    duration: 0,
  });

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (!token) {
      console.error("Access token is missing");
      return;
    }
    setAccessToken(token);

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "Simple Web Player",
        getOAuthToken: (cb) => cb(token),
      });

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        console.log("Player ready with Device ID", device_id);
        setDeviceId(device_id);
      });

      spotifyPlayer.addListener("player_state_changed", (state) => {
        if (!state) return;

        setIsPlaying(!state.paused);
        setProgress(state.position / 1000); // Convert milliseconds to seconds

        setTrackDetails({
          trackName: state.track_window.current_track.name,
          artistName: state.track_window.current_track.artists
            .map((artist) => artist.name)
            .join(", "),
          duration: Math.floor(state.duration / 1000),
        });
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (trackUri && player && deviceId) {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        body: JSON.stringify({ uris: [trackUri] }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }).catch((error) => console.error("Error starting playback:", error));
    }
  }, [trackUri, player, deviceId, accessToken]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        player.getCurrentState().then((state) => {
          if (!state) return;
          setProgress(state.position / 1000); // Convert milliseconds to seconds
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, player]);

  const togglePlay = () => {
    if (player) {
      isPlaying ? player.pause() : player.resume();
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#121212",
        color: "#fff",
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Track Info */}
      <Typography variant="h6" gutterBottom>
        {trackDetails.trackName}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {trackDetails.artistName}
      </Typography>

      {/* Controls */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <IconButton onClick={() => player.previousTrack()}>
          <SkipPreviousIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon sx={{ color: "#fff" }} />
          ) : (
            <PlayArrowIcon sx={{ color: "#fff" }} />
          )}
        </IconButton>
        <IconButton onClick={() => player.nextTrack()}>
          <SkipNextIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>

      {/* Progress Bar */}
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, width: "80%" }}>
        <Typography variant="body2">{Math.floor(progress / 60)}:{(progress % 60).toFixed(0).padStart(2, "0")}</Typography>
        <Slider
          value={progress}
          min={0}
          max={trackDetails.duration || 100}
          sx={{ color: "#1db954" }}
          onChange={(_, value) => {
            if (player) player.seek(value * 1000);
          }}
        />
        <Typography variant="body2">{Math.floor(trackDetails.duration / 60)}:{(trackDetails.duration % 60).toString().padStart(2, "0")}</Typography>
      </Stack>
    </Box>
  );
}