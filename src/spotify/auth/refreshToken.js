//Untested
//Infinite recursion is bad design but this would take a couple thousand hours to become a problem
export default async function refreshToken(refresh_token)
{
	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			grant_type: "refresh_token",
			refresh_token: refresh_token
		})
	});

	if (res.status === 200)
	{
		const data = await res.json();
		return (data);
	}
	
	let error = { status: res.status };
	if (res.status == 400)
	{
		const data = await res.json();
		error.message = data.error_description;
	}
	throw (error);
}
