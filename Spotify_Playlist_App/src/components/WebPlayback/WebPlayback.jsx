import React, { useState, useEffect } from "react";
import { Box, Slider, IconButton, Typography, Stack } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import requestWrapper from "../../spotify/requestWrapper";

export default function WebPlayer({ trackUri }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [trackDetails, setTrackDetails] = useState({
    trackName: "Loading...",
    artistName: "Loading...",
    duration: 0,
  });
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    console.log("This is Web Player");

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Player",
        getOAuthToken: (cb) => cb(window.localStorage.getItem("accessToken")),
      });

      player.addListener("ready", ({ device_id }) => {
        console.log("Device ID:", device_id);
        window.localStorage.setItem("spotifyDeviceId", device_id);
      });

      player.connect();
    };
  }, []);

  useEffect(() => {
    if (trackUri) {
      // Fetch track details when trackUri changes
      requestWrapper(
        `tracks/${trackUri.split(":").pop()}`,
        null,
        (data) => {
          setTrackDetails({
            trackName: data.name,
            artistName: data.artists.map((artist) => artist.name).join(", "),
            duration: Math.floor(data.duration_ms / 1000), // Convert ms to seconds
          });
          playTrack(trackUri); // Start playing the track
        },
        (error) => {
          console.error("Error fetching track details:", error);
        }
      );
    }
  }, [trackUri]);

  const playTrack = async (uri) => {
    await requestWrapper(
      "me/player/play",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uris: [uri] }),
      },
      () => {
        setIsPlaying(true);
      },
      (error) => {
        console.error("Error playing track:", error);
      }
    );
  };

  const togglePlay = async () => {
    const deviceId = window.localStorage.getItem("spotifyDeviceId");
    if (!deviceId) {
      console.error("No device ID available");
      return;
    }

    const endpoint = isPlaying
      ? `me/player/pause?device_id=${deviceId}`
      : `me/player/play?device_id=${deviceId}`;
    await requestWrapper(
      endpoint,
      { method: "PUT" },
      () => {
        setIsPlaying(!isPlaying);
        console.log(isPlaying ? "Paused" : "Playing");
      },
      (error) => {
        console.error("Error toggling play state:", error);
      }
    );
  };

  const handleProgressChange = async (event, newValue) => {
    await requestWrapper(
      "me/player/seek",
      { method: "PUT", body: JSON.stringify({ position_ms: newValue * 1000 }) },
      () => {
        setProgress(newValue);
      },
      (error) => {
        console.error("Error seeking track:", error);
      }
    );
  };

  const handleVolumeChange = async (event, newValue) => {
    await requestWrapper(
      "me/player/volume",
      { method: "PUT", body: JSON.stringify({ volume_percent: newValue }) },
      () => {
        setVolume(newValue);
      },
      (error) => {
        console.error("Error changing volume:", error);
      }
    );
  };

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "#121212",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Track Info */}
      <Typography variant="h6" gutterBottom>
        {trackDetails.trackName}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {trackDetails.artistName}
      </Typography>

      {/* Controls and Progress */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <IconButton onClick={() => console.log("Previous track")}>
          <SkipPreviousIcon sx={{ color: "#fff" }} />
        </IconButton>
        <IconButton onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon sx={{ color: "#fff" }} />
          ) : (
            <PlayArrowIcon sx={{ color: "#fff" }} />
          )}
        </IconButton>
        <IconButton onClick={() => console.log("Next track")}>
          <SkipNextIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>

      {/* Seek Bar */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ width: "80%", mt: 2 }}
      >
        <Typography variant="body2" color="textSecondary">
          {Math.floor(progress / 60)}:
          {Math.floor(progress % 60)
            .toString()
            .padStart(2, "0")}
        </Typography>
        <Slider
          value={progress}
          onChange={handleProgressChange}
          min={0}
          max={trackDetails.duration}
          sx={{ color: "#1db954" }}
        />
        <Typography variant="body2" color="textSecondary">
          {Math.floor(trackDetails.duration / 60)}:
          {(trackDetails.duration % 60).toString().padStart(2, "0")}
        </Typography>
      </Stack>

      {/* Volume Control */}
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ width: "50%", mt: 2 }}
      >
        <VolumeUpIcon sx={{ color: "#fff" }} />
        <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={100}
          sx={{ color: "#1db954" }}
        />
      </Stack>
    </Box>
  );
}
