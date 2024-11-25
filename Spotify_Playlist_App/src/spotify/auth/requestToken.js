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

	const res = await fetch("/api/token", {
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
	if (res.status !== 200)
	{
		setState(TokenComponentState.error)
		setError("Elaborate");
		return ;
	}
	const data = await res.json();
	maintainToken(data);
	setState(TokenComponentState.success);
}

export {TokenComponentState, requestToken};
