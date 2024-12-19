import { Link } from "@mui/material";

//Don't link to various
export default function artistLinks(navigate, artists)
{
	if (!artists)
		return ;
	return (artists.reduce((acc, artist, i) => {
			acc =	(<>
						{acc}
						{!artist.name
							? <a >{artist.name || "Missing artist"}</a>
							: 	(<Link
									onClick={() => navigate("/app/" + "artist" + "/" + artist.id)}>
									{artist.name}
								</Link>)}
						{i < (artists.length - 1)
							? <a>, </a>
							: null}
					</>);
			return (acc);
		}, null));
}
