import { Button, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MaterialReactTable } from "material-react-table";
import styles from "./Album.module.css";
import useInfiniteTable from "../../../hooks/useInfiniteTable";
import requestUtil from "../../../spotify/requestUtil";
import { useContext } from "react";
import SpotifyAuthContext from "../../../contexts/SpotifyAuthContext";
import getColDef from "../../../columnDefinitions";
import { useParams } from "react-router";
import durFormat from "../../../utilities/durFormat";
import artistLinks from "../../artistLinks";
import { useNavigate } from "react-router";

export default function Album()
{
	const navigate = useNavigate();
	const { id } = useParams();
	const { spotifyAuth } = useContext(SpotifyAuthContext);
	const { position, title, blankArtist, trackLength } = getColDef();
	const { table, data, tableData, error } = useInfiniteTable("albums/" + id,
		[position, title, blankArtist, trackLength],
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
		<div>
			<div className={styles.AlbumHeader}>
				{data
					? (<img className={styles.AlbumHeaderImage} src={data.pages[0].images[0]?.url} />)
					: (	<Skeleton variant="rounded" animation="wave">
							<img className={styles.AlbumHeaderImage} />
						</Skeleton>)}
				<div>
					<Button onClick={() => {history.back();}}>
						<ArrowBackIcon />
					</Button>
					<Typography variant="h2" sx={{ fontWeight: 900 }}>{data ? data.pages[0].name : <Skeleton width={350} animation="wave" />}</Typography>
					<div className={styles.AlbumHeaderBottomTextContainer}>
						<Typography className={styles.AlbumHeaderBottomTextPrimary}>
							{data ? artistLinks(navigate, data.pages[0].artists) : <Skeleton width={80} animation="wave" />}
						</Typography>
						<Typography className={styles.AlbumHeaderBottomTextPrimary}>
							{data ? data.pages[0].release_date.split("-").join("/") : <Skeleton width={80} animation="wave" />}
						</Typography>
						<Typography className={styles.AlbumHeaderBottomTextSecondary}>
							{data ? (data.pages[0].tracks.total + " tracks") : <Skeleton width={80} animation="wave" />}
							</Typography>
						<Typography className={styles.AlbumHeaderBottomTextSecondary}>
							{tableData
								? durFormat(tableData.reduce((a, e) => a + e.duration_ms, 0) || 0)
								: <Skeleton width={80} animation="wave" />}
							</Typography>
					</div>
				</div>
			</div>
			<MaterialReactTable table={table} />
		</div>
	);
}