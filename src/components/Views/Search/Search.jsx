import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Tracks from "./Tracks/Tracks";
import Albums from "./Albums/Albums";
import Artists from "./Artists/Artists";
import Playlists from "./Playlists/Playlists";

export default function Search()
{
	const [ selected, setSelected ] = useState(0);

	return (
		<>
			<Tabs value={selected} onChange={(event, val) => {setSelected(val)}}>
				<Tab label="Tracks" id={0} />
				<Tab label="Artists" id={1} />
				<Tab label="Albums" id={2} />
				<Tab label="Playlist" id={3} />
			</Tabs>
			{[
				(<Tracks />),
				(<Artists />),
				(<Albums />),
				(<Playlists />)
			][selected]}
		</>
	);
}
