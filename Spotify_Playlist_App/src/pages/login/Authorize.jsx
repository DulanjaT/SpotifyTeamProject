import maintainToken from "../../spotify/maintainToken";

function createCodeVerifier(length)
{
	const randomSource = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	return (window.crypto.getRandomValues(new Uint8Array(length))
		.reduce((acc, x) => acc + randomSource[x % randomSource.length], ""));
}

//Unknown whether digest function can throw
//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
async function createCodeChallenge(codeVerifier)
{
	const encoder = new TextEncoder();
	const utf8EncodedVerifier = encoder.encode(codeVerifier);
	const hashedVerifier = await window.crypto.subtle.digest("SHA-256", utf8EncodedVerifier);
	return (btoa(String.fromCharCode(... new Uint8Array(hashedVerifier)))
		.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"));
}

//Use env variables for clientID, redirectURI
//Temporarily using own client id because different redirect
//Update scope
//Use state param https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
async function authorizeWithPKCE()
{
	const codeVerifier = createCodeVerifier(64);
	window.localStorage.setItem("codeVerifier", codeVerifier);
	const codeChallenge = await createCodeChallenge(codeVerifier);

	const authURL = new URL("https://accounts.spotify.com/authorize");
	authURL.search = new URLSearchParams({
		response_type: "code",
		client_id: "b65de9d727fd43d8a0c766bbdcbb842b",
		scope: "user-read-currently-playing",
		code_challenge_method: "S256",
		code_challenge: codeChallenge,
		redirect_uri: "http://localhost:5173/getToken"
	}).toString();
	window.location.href = authURL.toString();
}

export default function Authorize()
{
	//Check if accessToken exists and validate
	if (window.localStorage.getItem("accessToken")
		&& window.localStorage.getItem("refreshToken")
		&& window.localStorage.getItem("tokenExpiration") > Date.now())
	{
		maintainToken({
			access_token: window.localStorage.getItem("accessToken"),
			refresh_token: window.localStorage.getItem("refreshToken"),
			expires_in: (window.localStorage.getItem("tokenExpiration") - Date.now()) / 1000
		});
		window.location.href = "/App";
		return ;
	}
	return (
		<div>
			<p>Explain access requirements here</p>
			<button onClick={authorizeWithPKCE}>Authorize</button>
		</div>
	);
}
