import React, { useEffect, useState } from "react";

export default function PlaylistDetails({ playlistId }) {
    const [playlist, setPlaylist] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!playlistId) return;

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError("Access token not found. Please log in again.");
            return;
        }

        const fetchPlaylistDetails = async () => {
            try {
                const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const data = await response.json();
                if (response.ok) {
                    setPlaylist(data);
                } else {
                    setError(data.error?.message || "Failed to fetch playlist details");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPlaylistDetails();
    }, [playlistId]);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!playlist) {
        return <p>Loading playlist details...</p>;
    }

    return (
        <div>
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
            <p>Tracks: {playlist.tracks.items.length}</p>
            <ul>
                {playlist.tracks.items.map((item) => (
                    <li key={item.track.id}>
                        {item.track.name} by {item.track.artists.map((artist) => artist.name).join(", ")}
                    </li>
                ))}
            </ul>
        </div>
    );
}