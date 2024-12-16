//
//
// --- For testing purposes, can be removed if needed.
//
// 

// const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // Use environment variables
// const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || "http://localhost:5173/getToken";
// const SCOPES = [
//     "user-read-private",
//     "user-read-email",
//     "streaming",
//     "user-modify-playback-state",
//     "user-library-read",
//     "playlist-read-private",
// ].join(" ");
// const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

// export const login = () => {
//     const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
//         REDIRECT_URI
//     )}&scope=${encodeURIComponent(SCOPES)}&response_type=token&show_dialog=true`;

//     window.location.href = authUrl;
// };