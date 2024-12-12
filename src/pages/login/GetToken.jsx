import { useState } from "react";
import { TokenComponentState, requestToken } from "../../spotify/auth/requestToken";

export default function GetToken()
{
	const [state, setState] = useState(TokenComponentState.init);
	const [error, setError] = useState(null);

	if (state === TokenComponentState.success)
		window.location.href = "/app";
	else if (state === TokenComponentState.init)
	{
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.get("code"))
		{
			setState(TokenComponentState.loading);
			requestToken(urlParams.get("code"), setState, setError);
			return (
				<h1>Loading</h1>
			);
		}
		setState(TokenComponentState.error);
		//Missing parameters should probably trigger redirect to authorize again
		setError("Error: " + (urlParams.get("error") || "Params missing"));
	} else if (state === TokenComponentState.error)
	{
		return (
			<h1>{error}</h1>
		);
	}
}
