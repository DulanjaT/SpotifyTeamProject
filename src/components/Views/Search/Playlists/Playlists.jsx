import { useContext } from "react";
import { useSearchParams } from "react-router";
import SpotifyAuthContext from "../../../../contexts/SpotifyAuthContext";
import getColDef from "../../../../columnDefinitions";
import useInfiniteTable from "../../../../hooks/useInfiniteTable";
import { MaterialReactTable } from "material-react-table";
import requestUtil from "../../../../spotify/requestUtil";

export default function Playlists()
{
	const { spotifyAuth } = useContext(SpotifyAuthContext);
	const [ params, setParams ] = useSearchParams();
	const { title, blankOwner, albumLength } = getColDef();
	const { table, error } = useInfiniteTable(`search/?q=${params.get("q")}&type=playlist&limit=50`,
		[ title, blankOwner, albumLength ],
		({ pageParam }) => requestUtil(spotifyAuth, pageParam),
		(data) => {
			if (!data)
				return ([null, null]);

			const tableData = data.pages.reduce((acc, page) => {
				acc.push(... page.playlists.items.filter(playlist => playlist));
				return (acc);
			}, []);
			return ([tableData, data.pages[0].playlists.total]);
		},
		(lastPage) => lastPage.playlists.offset < 150 ? lastPage.playlists.next : null
	);

	if (error)
		return (<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>);
	return (<MaterialReactTable table={table} />);
}
