export default async function requestWrapper(path, req, setData, setError)
{
	if (!req)
		req = {};
	if (!req.headers)
		req.headers = {};
	req.headers.Authorization = "Bearer " + window.localStorage.getItem("accessToken");
	const res = await fetch(new URL(path, "https://api.spotify.com/v1/"), req);
	if (res.status >= 200 && res.status <= 226)
	{
		const data = await res.json(); //Handle throw
		return (setData(data));
	}

	let error = { status: res.status };
	if (res.status == 401
		|| res.status == 403
		|| res.status == 429)
	{
		const data = await res.json();
		error.message = data.message;
	}
	setError(error);
}
