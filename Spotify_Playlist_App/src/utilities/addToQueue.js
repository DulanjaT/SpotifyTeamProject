async function addToQueue(trackUri) {
    const accessToken = window.localStorage.getItem("accessToken"); // Ensure this is your valid access token
  
    if (!accessToken) {
      console.error("No access token available");
      return;
    }
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${encodeURIComponent(trackUri)}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log("Track added to queue successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to add track to queue:", errorData);
      }
    } catch (error) {
      console.error("Error adding track to queue:", error);
    }
  }
  export default addToQueue;