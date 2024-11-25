import { useState } from "react";
import requestWrapper from "../../spotify/requestWrapper";

export default function Demo()
{
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	
	if (data)
	{
		return (
			<h1>Logged in as {data.display_name}</h1>
		);
	} else if(error)
	{
		return (
			<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>
		);
	}
	requestWrapper("me", null, setData, setError);
	return (
		<h1>Loading profile information</h1>
	);
}
