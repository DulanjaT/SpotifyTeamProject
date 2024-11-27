//Untested
//Infinite recursion is bad design but this would take a couple thousand hours to become a problem
export default function maintainToken(data)
{
	window.localStorage.setItem("accessToken", data.access_token);
	window.localStorage.setItem("refreshToken", data.refresh_token);
	window.localStorage.setItem("tokenExpiration", Date.now() + data.expires_in * 1000);
	setTimeout(async () => {
		const res = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: new URLSearchParams({
				client_id: "b65de9d727fd43d8a0c766bbdcbb842b",
				grant_type: "refresh_token",
				refresh_token: data.refresh_token
			})
		});
		if (res.status !== 200)
		{
			//Should probably throw user back to authorization page?
			//Alt; modal
			return ;
		}
		const newData = await res.json();
		maintainToken(newData);
	}, data.expires_in * 1000);
}
