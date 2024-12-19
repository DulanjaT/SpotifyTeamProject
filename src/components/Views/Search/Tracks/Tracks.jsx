import { useContext } from "react";
import { useSearchParams } from "react-router";
import SpotifyAuthContext from "../../../../contexts/SpotifyAuthContext";
import getColDef from "../../../../columnDefinitions";
import useInfiniteTable from "../../../../hooks/useInfiniteTable";
import { MaterialReactTable } from "material-react-table";
import requestUtil from "../../../../spotify/requestUtil";

export default function Tracks()
{
	const { spotifyAuth } = useContext(SpotifyAuthContext);
	const [ params, setParams ] = useSearchParams();
	const { title, blankArtist, album, trackLength } = getColDef();
	const { table, error } = useInfiniteTable(`search/?q=${params.get("q")}&type=track&limit=50`,
		[ title, blankArtist, album, trackLength ],
		({ pageParam }) => requestUtil(spotifyAuth, pageParam),
		(data) => {
			if (!data)
				return ([null, null]);

			const tableData = data.pages.reduce((acc, page) => {
				acc.push(... page.tracks.items);
				return (acc);
			}, []);
			return ([tableData, data.pages[0].tracks.total]);
		},
		(lastPage) => lastPage.tracks.offset < 150 ? lastPage.tracks.next : null
	);

	if (error)
		return (<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>);
	return (<MaterialReactTable table={table} />);
}
