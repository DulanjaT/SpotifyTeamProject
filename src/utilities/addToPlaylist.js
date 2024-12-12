async function addToPlaylist(trackUri) {
    const accessToken = window.localStorage.getItem("accessToken");

    if (!accessToken) {
        console.error("No access token available");
        return;
    }
let playlistId = window.localStorage.getItem("playlistId");
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                uris: [trackUri],
            }),
        });

        if (response.ok) {
            console.log("Track added to playlist successfully");
        } else {
            const errorData = await response.json();
            console.error("Failed to add track to playlist:", errorData);
        }
    } catch (error) {
        console.error("Error adding track to playlist:", error);
    }
}

export default addToPlaylist;