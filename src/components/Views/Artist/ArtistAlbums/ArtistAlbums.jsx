import { Button, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MaterialReactTable } from "material-react-table";
import useInfiniteTable from "../../../../hooks/useInfiniteTable";
import requestUtil from "../../../../spotify/requestUtil";
import { useContext } from "react";
import SpotifyAuthContext from "../../../../contexts/SpotifyAuthContext";
import getColDef from "../../../../columnDefinitions";

export default function ArtistAlbums({id})
{
	const { spotifyAuth } = useContext(SpotifyAuthContext);
	const { title, blankArtist, albumType, albumReleaseDate, albumLength } = getColDef();
	const { table, data, tableData, error } = useInfiniteTable(`artists/${id}/albums?include_groups=album,single`,
		[title, blankArtist, albumType, albumReleaseDate, albumLength],
		({ pageParam }) => requestUtil(spotifyAuth, pageParam),
		(data) => {
			if (!data)
				return ([null, null]);

			const tableData = data.pages.reduce((acc, page) => {
				acc.push(... page.items);
				return (acc);
			}, []);
			return ([tableData, data.pages[0].total]);
		},
		(lastPage) => lastPage.next
	);

	if (error)
		return (<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>);
	return (
		<div>
			<MaterialReactTable table={table} />
		</div>
	);
}
