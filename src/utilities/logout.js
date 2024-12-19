//
//
// --- For testing purposes, can be removed if needed.
//
// 


// export const logout = () => {
//     // Clear access token from localStorage
//     localStorage.removeItem("accessToken");

//     // Redirect to Spotify logout page
//     window.location.href = `https://accounts.spotify.com/en/logout?continue=${encodeURIComponent(
//         window.location.origin
//     )}`;
// };

// export const logout = async () => {
//     try {
//         // Clear access token
//         localStorage.removeItem("accessToken");

//         // Optional: Make API call to revoke token (if applicable)
//         await fetch("https://api.spotify.com/v1/me/token/revoke", {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             },
//         });

//         // Redirect to Spotify logout page
//         window.location.href = `https://accounts.spotify.com/en/logout?continue=${encodeURIComponent(
//             window.location.origin
//             // "http://localhost:5173"
//         )}`;
//     } catch (error) {
//         console.error("Error during logout:", error);
//     }
// };

export const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
};