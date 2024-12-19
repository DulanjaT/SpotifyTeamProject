export default async function requestUtil(spotifyAuth, path)
{
	const res = await fetch(new URL(path, "https://api.spotify.com/v1/"), {
		headers: {
			Authorization: "Bearer " + spotifyAuth.access_token
		}
	});

	if (res.ok)
		return (await res.json());

	let error = { status: res.status };
	if (res.status == 401
		|| res.status == 403
		|| res.status == 429)
	{
		const data = await res.json();
		error.message = data.message;
	}
	throw (error);
}
