import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton } from "@mui/material";
import useLibraryGetter from "../../hooks/useLibraryGetter";
import { useLocation, useNavigate, useParams } from "react-router";
import { useContext, useEffect } from "react";
import SpotifyAuthContext from "../../contexts/SpotifyAuthContext";

// Ellipsize overflow on ListItemText primary
export default function Library()
{
	const navigate = useNavigate();
	const { id } = useParams();
	const location = useLocation();
	const { spotifyAuth } = useContext(SpotifyAuthContext);
	const { getLibrary, data, error, clear } = useLibraryGetter();

	useEffect(() => {
		if (!spotifyAuth && data)
			clear();
		if (spotifyAuth && !data)
			getLibrary();
	}, [spotifyAuth])

	if (error)
	{
		return (
			<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>
		);
	}
	return (
		<List>
			{(data || [... Array(15).keys()]).map(e => {
				let secondaryText = null;
				if (data)
				{
					if (e.type === "playlist")
						secondaryText =	(<>
											{e.type[0].toUpperCase() + e.type.slice(1) + " - " + e.owner.display_name}
											<br />
										</>);
					else if (e.type === "album")
						secondaryText =	(<>
											{e.type[0].toUpperCase() + e.type.slice(1) + " - " + e.artists.map(artist => artist.name).join(", ")}
											<br />
										</>);
					secondaryText =	(<>
										{secondaryText}
										{`${e.tracks.total} tracks`}
									</>);
				}
				return (
					<ListItem disablePadding key={e?.id || e}>
						<ListItemButton
							disabled={!data}
							onClick={() => navigate("app/" + e.type + (e.type === "liked" ? "" : "/" + e.id))}
							selected={data && e.id === id && ("/" + e.type === location.pathname)}>
							<ListItemAvatar>
								{data
									? ( e.images[0]?.url ? <Avatar variant="rounded" src={e.images[0]?.url} /> : null)
									: (	<Skeleton variant="rounded" animation="wave">
											<Avatar variant="rounded" />
										</Skeleton>)}
							</ListItemAvatar>
							<ListItemText
								primary={data ? e.name : <Skeleton width={80} animation="wave" />}
								secondary={data ? secondaryText : <Skeleton width={80} animation="wave" />}/>
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
}
