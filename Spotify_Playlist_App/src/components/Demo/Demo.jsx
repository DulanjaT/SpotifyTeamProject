import { useState } from "react";
import requestWrapper from "../../spotify/requestWrapper";
import CreatePlaylistDemo from "../CreatePlaylistDemo/CreatePlaylistDemo";

export default function Demo()
{
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	
	if (data)
	{
		return (
			<div>
				<h1>Logged in as {data.display_name}</h1>
				<CreatePlaylistDemo userID={data.id}/>
			</div>
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
