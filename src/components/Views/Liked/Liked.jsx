import { Button, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MaterialReactTable } from "material-react-table";
import styles from "./Liked.module.css";
import useInfiniteTable from "../../../hooks/useInfiniteTable";
import requestUtil from "../../../spotify/requestUtil";
import { useContext } from "react";
import SpotifyAuthContext from "../../../contexts/SpotifyAuthContext";
import getColDef from "../../../columnDefinitions";
import durFormat from "../../../utilities/durFormat";

export default function Liked()
{
	const { spotifyAuth } = useContext(SpotifyAuthContext);
	const { position, title, blankArtist, album, added, trackLength } = getColDef();
	const { table, data, tableData, error } = useInfiniteTable("me/tracks",
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
			return ([tableData, data.pages[0].total]);
		},
		(lastPage) => lastPage.next
	);

	if (error)
		return (<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>);
	return (
		<div>
			<div className={styles.LikedHeader}>
				{data
					? (<img className={styles.LikedHeaderImage} src="https://misc.scdn.co/liked-songs/liked-songs-640.png" />)
					: (	<Skeleton variant="rounded" animation="wave">
							<img className={styles.LikedHeaderImage} />
						</Skeleton>)}
				<div>
					<Button onClick={() => {history.back();}}>
						<ArrowBackIcon />
					</Button>
					<Typography variant="h2" sx={{ fontWeight: 900 }}>{data ? "Liked Songs" : <Skeleton width={350} animation="wave" />}</Typography>
					{data 
						? (data.pages[0].description
							? (<Typography className={styles.LikedHeaderBottomTextSecondary}>{data.pages[0].description}</Typography>)
							: undefined)
						: (<Skeleton width={350} animation="wave" />)}
					<div className={styles.LikedHeaderBottomTextContainer}>
						<Typography className={styles.LikedHeaderBottomTextSecondary}>
							{data ? (data.pages[0].total + " tracks") : <Skeleton width={80} animation="wave" />}
							</Typography>
						<Typography className={styles.LikedHeaderBottomTextSecondary}>
							{data
								? durFormat(tableData.reduce((a, e) => a + e.track.duration_ms, 0) || 0)
								: <Skeleton width={80} animation="wave" />}
							</Typography>
					</div>
				</div>
			</div>
			<MaterialReactTable table={table} />
		</div>
	);
}