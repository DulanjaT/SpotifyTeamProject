/**
 * Spotify API wrapper utility for using a pair of React useState setters as callbacks
 * 
 * @param {string} path Api endpoint such as "me" or "users/{user_id}/playlists". May not be prefixed with a forward-slash
 * @param {?Object} req null or Fetch RequestInit object https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
 * @param {Function} setData React useState setter function.
 * On success, it receives the JSON response body
 * @param {Function} setError React useState setter function.
 * On failure, it receives an object with guaranteed property "status" containing the HTTP error code
 * and optional property "message" if one was provided by the API.
 * @returns
 */
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
