import { useState } from "react";
import maintainToken from "../../spotify/maintainToken";

// "Enum"
const TokenComponentState = {
	init: 0,
	loading: 1,
	success: 2,
	error: 3
};

//Use env variables for clientID, redirectURI
//Temporarily using own client id because different redirect
//Need to handle fetch throwing
async function getToken(code, setState)
{
	const code_verifier = window.localStorage.getItem("codeVerifier");
	window.localStorage.removeItem("codeVerifier");

	const res = await fetch("/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams({
			client_id: "b65de9d727fd43d8a0c766bbdcbb842b",
			grant_type: "authorization_code",
			code,
			redirect_uri: "http://localhost:5173/getToken", //Using Vite's proxy feature because request will be blocked by browser CORS policy (HTTPS request from HTTP page). Can be done normally once app is served over HTTPS.
			code_verifier
		})
	});
	if (res.status !== 200)
	{
		setState(TokenComponentState.error)
		return ;
	}
	const data = await res.json();
	maintainToken(data);
	setState(TokenComponentState.success);
}

export default function GetToken()
{
	const [state, setState] = useState(TokenComponentState.init);
	console.log(state);

	if (state === TokenComponentState.success)
	{
		window.location.href = "/app";
		return ;
	}
	if (state === TokenComponentState.error)
	{
		return (
			<h1>Get token error</h1>
		);
	}

	if (state === TokenComponentState.init)
	{
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get("code"))
		{
			setState(TokenComponentState.loading);
			getToken(urlParams.get("code"), setState);
			return (
				<h1>Loading</h1>
			);
		}
		if (urlParams.get("error"))
		{
			return (
				<h1>Authorization redirect error</h1>
			);
		}
		//Later redirect to /authorize
		return (
			<h1>Where params</h1>
		);
	}
}
