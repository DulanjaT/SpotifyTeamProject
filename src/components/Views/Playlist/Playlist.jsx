import { Button, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MaterialReactTable } from "material-react-table";
import styles from "./Playlist.module.css";
import useInfiniteTable from "../../../hooks/useInfiniteTable";
import requestUtil from "../../../spotify/requestUtil";
import { useContext } from "react";
import SpotifyAuthContext from "../../../contexts/SpotifyAuthContext";
import getColDef from "../../../columnDefinitions";
import durFormat from "../../../utilities/durFormat";
import { useParams } from "react-router";

export default function Playlist()
{
	const { id } = useParams();
	const { spotifyAuth } = useContext(SpotifyAuthContext);
	const { position, title, blankArtist, album, added, trackLength } = getColDef();
	const { table, data, tableData, error } = useInfiniteTable("playlists/" + id,
		[position, title, blankArtist, album, added, trackLength],
		({ pageParam }) => requestUtil(spotifyAuth, pageParam),
		(data) => {
			if (!data)
				return ([null, null]);
	
			const tableData = data.pages.reduce((acc, page) => {
				acc.push(... (page.tracks?.items || page.items));
				return (acc);
			}, []).map((track, i) => {
				track.position = i;
				return (track)
			});
			return ([tableData, data.pages[0].tracks.total]);
		},
		(lastPage) => lastPage.tracks?.next || lastPage.next
	);

	if (error)
		return (<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>);
	return (
		<>
			<div className={styles.PlaylistHeader}>
				{data
					? (<img className={styles.PlaylistHeaderImage} src={data.pages[0].images[0]?.url} />)
					: (	<Skeleton variant="rounded" animation="wave">
							<img className={styles.PlaylistHeaderImage} />
						</Skeleton>)}
				<div>
					<Button onClick={() => {history.back()}}>
						<ArrowBackIcon />
					</Button>
					<Typography>
						{data
							? ((data.pages[0].public ? "Public" : "Private") + " Playlist")
							: <Skeleton width={110} animation="wave" />}
					</Typography>
					<Typography variant="h2" sx={{ fontWeight: 900 }}>{data ? data.pages[0].name : <Skeleton width={350} animation="wave" />}</Typography>
					{data 
						? (data.pages[0].description
							? (<Typography className={styles.PlaylistHeaderBottomTextSecondary}>{data.pages[0].description}</Typography>)
							: undefined)
						: (<Skeleton width={350} animation="wave" />)}
					<div className={styles.PlaylistHeaderBottomTextContainer}>
						<Typography className={styles.PlaylistHeaderBottomTextPrimary}>
							{data ? data.pages[0].owner.display_name : <Skeleton width={80} animation="wave" />}
						</Typography>
						<Typography className={styles.PlaylistHeaderBottomTextSecondary}>
							{data
								? (tableData.length < data.pages[0].tracks.total
									? tableData.length + " / "
									: "") + data.pages[0].tracks.total + " tracks"
								: <Skeleton width={80} animation="wave" />}
							</Typography>
						<Typography className={styles.PlaylistHeaderBottomTextSecondary}>
							{tableData
								? durFormat(tableData.reduce((a, e) => a + e.track.duration_ms, 0) || 0)
								: <Skeleton width={80} animation="wave" />}
							</Typography>
					</div>
				</div>
			</div>
			<MaterialReactTable table={table} />
		</>
	);
}
