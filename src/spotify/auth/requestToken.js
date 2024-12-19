export default async function requestToken(code_verifier, code)
{
	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
			grant_type: "authorization_code",
			code,
			code_verifier
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
