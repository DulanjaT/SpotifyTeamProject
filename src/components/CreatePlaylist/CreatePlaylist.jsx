import React, { useState } from "react";
import { fetchUserId } from "../../utilities/fetchUserData";

export default function CreatePlaylist({ onPlaylistCreated }) {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let userId = null;
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            setError("Access token not found. Please log in again.");
            return;
        }
        try {
            userId = await fetchUserId();
        } catch (error) {
            setError("Error fetching user ID. Please try again.");
            return;
        }

        if (!accessToken || !userId) {
            setError("Missing access token or user ID.");
            return;
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: playlistName,
                    description: playlistDescription,
                    public: false,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                onPlaylistCreated(data.id); // Send only the playlist ID
                setPlaylistName("");
                setPlaylistDescription("");
            } else {
                setError(data.error?.message || "Failed to create playlist");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Playlist Name:</label>
                    <input
                        type="text"
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={playlistDescription}
                        onChange={(e) => setPlaylistDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Create Playlist</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}