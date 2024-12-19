function createCodeVerifier(length)
{
	const randomSource = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	return (window.crypto.getRandomValues(new Uint8Array(length))
		.reduce((acc, x) => acc + randomSource[x % randomSource.length], ""));
}

//Unknown whether digest function can throw
//https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
async function createCodeChallenge(code_verifier)
{
	const encoder = new TextEncoder();
	const utf8EncodedVerifier = encoder.encode(code_verifier);
	const hashedVerifier = await window.crypto.subtle.digest("SHA-256", utf8EncodedVerifier);
	return (btoa(String.fromCharCode(... new Uint8Array(hashedVerifier)))
		.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"));
}

//Use state param https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
export default async function authorizePKCE()
{
	const code_verifier = createCodeVerifier(64);
	window.localStorage.setItem("code_verifier", code_verifier);
	const codeChallenge = await createCodeChallenge(code_verifier);

	const authURL = new URL("https://accounts.spotify.com/authorize");
	authURL.search = new URLSearchParams({
		client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
		redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
		scope: import.meta.env.VITE_SPOTIFY_SCOPE,
		response_type: "code",
		code_challenge_method: "S256",
		code_challenge: codeChallenge
	}).toString();
	window.location.href = authURL.toString();
}
