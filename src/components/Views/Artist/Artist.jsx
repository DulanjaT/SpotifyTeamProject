import { useParams } from "react-router";
import ArtistAlbums from "./ArtistAlbums/ArtistAlbums";
import ArtistPopularTracks from "./ArtistPopularTracks/ArtistPopularTracks";
import useSpotifyRequestWrapper from "../../../hooks/useSpotifyRequestWrapper";
import styles from "./Artist.module.css";
import { Button, Skeleton, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect } from "react";

export default function Artist()
{
	const { id } = useParams();
	const { requestWrapper, data, error, clear } = useSpotifyRequestWrapper();

	useEffect(() => {
		clear();
		requestWrapper("artists/" + id, null);
	}, [id]);
	if (error)
	{
		return (
			<h1>Error {error.status}{error.message ? ": " + error.message : null}</h1>
		);
	}
	if (!data)
		return (<p>Artist skeleton</p>);
	return (
		<>
			<div className={styles.ArtistHeader}>
				{data
					? (<img className={styles.ArtistHeaderImage} src={data.images[0]?.url} />)
					: (	<Skeleton variant="rounded" animation="wave">
							<img className={styles.ArtistHeaderImage} />
						</Skeleton>)}
				<div>
					<Button onClick={() => {history.back();}}>
						<ArrowBackIcon />
					</Button>
					<Typography variant="h2" sx={{ fontWeight: 900 }}>{data ? data.name : <Skeleton width={350} animation="wave" />}</Typography>
					<div className={styles.ArtistHeaderBottomTextContainer}>
						<Typography className={styles.ArtistHeaderBottomTextPrimary}>
							{data ? `${data.followers.total} followers` : <Skeleton width={80} animation="wave" />}
						</Typography>
					</div>
				</div>
			</div>
			<ArtistPopularTracks id={id}/>
			<ArtistAlbums id={id}/>
		</>
	);
}
