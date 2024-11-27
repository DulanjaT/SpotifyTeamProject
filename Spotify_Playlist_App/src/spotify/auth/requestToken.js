import maintainToken from "./maintainToken";

// "Enum"
const TokenComponentState = {
	init: 0,
	loading: 1,
	success: 2,
	error: 3
};

//Need to handle fetch throwing
async function requestToken(code, setState, setError)
{
	const code_verifier = window.localStorage.getItem("codeVerifier");
	window.localStorage.removeItem("codeVerifier");

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
		maintainToken(data);
		return (setState(TokenComponentState.success));
	}

	let error = `Error ${res.status}`;
	if (res.status === 400)
	{
		const data = await res.json()
		error += `: ${data.error_description}`;
	}
	setError(error);
	setState(TokenComponentState.error);
}

export {TokenComponentState, requestToken};
