import React, { useState } from "react";
import PlaylistDetails from "./PlaylistDetails";
import CreatePlaylist from "./CreatePlaylist";

export default function PlaylistManager() {
    const [playlistId, setPlaylistId] = useState(null);

    // Callback to handle playlist creation and save the playlist ID
    const handlePlaylistCreated = (id) => {
        if (id) {
            window.localStorage.setItem("playlistId", id);
            setPlaylistId(id);
        }
    };

    return (
        <div>
            <h1>Spotify Playlist Manager</h1>
            {/* Component for creating a new playlist */}
            <CreatePlaylist onPlaylistCreated={handlePlaylistCreated} />

            {/* Show details of the created playlist */}
            {playlistId ? (
                <PlaylistDetails playlistId={playlistId} />
            ) : (
                <p>Create a playlist to see its details here.</p>
            )}
        </div>
    );
}