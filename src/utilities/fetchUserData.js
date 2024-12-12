export async function fetchUserId() {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
        throw new Error("Access token is missing. Please log in.");
    }

    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Failed to fetch user ID.");
        }

        const data = await response.json();
        return data.id; // The user's Spotify ID
    } catch (error) {
        throw new Error(error.message || "An error occurred while fetching user ID.");
    }
}