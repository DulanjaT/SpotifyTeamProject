import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, CircularProgress, Button } from "@mui/material";
import requestWrapper from "../../spotify/requestWrapper"; // Ensure this is the API wrapper for Spotify
import addToQueue from "../../utilities/addToQueue";

export default function DailyMixes() {
    const [mixes, setMixes] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDailyMixes();
    }, []); // Fetch playlists once when the component mounts

    const fetchDailyMixes = async () => {
        try {
            await requestWrapper(
                "me/player/queue?limit=5", // Spotify API endpoint to fetch daily mixes (adjust as needed)
                {
                    headers: {
                        Authorization: `Bearer ${process.env.VITE_SPOTIFY_ACCESS_TOKEN}` // Use your Spotify API token from the .env file
                    }
                },
                setMixes, // Update mixes state
                setError // Update error state
            );
        } catch (err) {
            console.error("Error fetching daily mixes:", err);
        }
    };

    if (error) {
        return (
            <Typography variant="h6" color="error">
                Error: {error.message}
            </Typography>
        );
    }

    if (!mixes) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }

    return (
        <Box>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    marginTop: 6,
                    marginBottom: 4,
                    fontWeight: "bold",
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                Your Daily Mixes
            </Typography>
            <Grid container spacing={2}>
                {mixes.map((mix, index) => (
                    <Grid item xs={12} sm={6} md={4} key={mix.id}>
                        <Box
                            sx={{
                                bgcolor: "#1c1c1c",
                                padding: 2,
                                borderRadius: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <img
                                src={mix.images[0]?.url}
                                alt={mix.name}
                                style={{ width: "100%", borderRadius: 1 }}
                            />
                            <Typography variant="h6" sx={{ marginTop: 1, textAlign: "center" }}>
                                {mix.name}
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                sx={{ color: "#1DB954", borderColor: "#1DB954", marginTop: 1 }}
                                onClick={() => addToQueue(mix.uri)}
                            >
                                Add to Queue
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
