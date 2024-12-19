import { Avatar, Button, IconButton, Link, ListItemAvatar, ListItemText } from "@mui/material";
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseIcon from '@mui/icons-material/Pause';
import artistLinks from "./components/artistLinks";
import { useContext } from "react";
import { useNavigate } from "react-router";

const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
	year: "2-digit",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit"
});

const position = {
	accessorFn: (row) => row.position + 1,
	header: "#",
	muiTableHeadCellProps: { align: "right" },
	muiTableBodyCellProps: { align: "right" },
	//filterVariant: "range" //Broken? Downgraded because of general filter regression make sure to update when fixed
	size: 10
};

const blankArtist = {
	accessorFn: (row) => (row.track || row).artists.map(artist => artist.name).join(", "),
	header: "Artist",
	Cell: () => {
		return (null);
	}
};

const blankOwner = {
	accessorFn: (row) => row.owner.display_name,
	header: "Creator",
	Cell: () => {
		return (null);
	}
}

const added = {
	accessorFn: (row) => new Date(row.added_at),
	header: "Added",
	filterVariant: "datetime-range", //Too verbose?
	size: 300, //
	Cell: ({ cell }) => {
		return (dateTimeFormat.format(cell.getValue()).replace(",", ""));
	}
};

const trackLength = { //This needs a filter function
	accessorFn: (row) => (row.track || row).duration_ms,
	header: "Length",
	muiTableHeadCellProps: { align: "right" },
	muiTableBodyCellProps: { align: "right" },
	Cell: ({ cell }) => {
		let val = cell.getValue();
		if (!val)
			return ("");
		val = val / 1000
		return (`${Math.floor(val / 60)}:${Math.floor(val % 60).toString().padStart(2, "0")}`)
	}
};

const albumType = {
	accessorFn: (row) => row.album_type,
	header: "Album Type",
	Cell: ({ cell }) => {
		let val = cell.getValue();
		return (val[0].toUpperCase() + val.slice(1));
	}
}

const albumReleaseDate = {
	accessorFn: (row) => row.release_date,
	header: "Released",
	Cell: ({ cell }) => {
		return (cell.getValue().split("-").join("/"))
	}
};

const albumLength = {
	accessorFn: (row) => row.tracks?.total || row.total_tracks,
	header: "Tracks",
	muiTableHeadCellProps: { align: "right" },
	muiTableBodyCellProps: { align: "right" }
}

const artistFollowers = {
	accessorFn: (row) => row.followers.total,
	header: "Followers",
	muiTableHeadCellProps: { align: "right" },
	muiTableBodyCellProps: { align: "right" }
};

export default function getColDef()
{
	const navigate = useNavigate();
	const playing = false;
	const setPlaying = null;
	//const { playing, setPlaying } = useContext(PlaylistToolContext);

	return ({
		position,
		blankArtist,
		blankOwner,
		added,
		trackLength,
		albumType,
		albumReleaseDate,
		albumLength,
		artistFollowers,
		title: {
			accessorFn: (row) => (row.track || row).name,
			header: "Title",
			size: 300,
			Cell: ({ cell, row }) => {
				const itemAccessor = row.original.track || row.original;
				const artists = itemAccessor.owner || itemAccessor.artists;
				const image = (itemAccessor.album || itemAccessor).images?.[0]?.url;
				const type = itemAccessor.type;
				const id = itemAccessor.id;
				const title = cell.getValue() || "Missing " + type;

				return (
					<>
						<div>
							{type === "track" && cell.getValue()
								? <IconButton
										onClick={() => setPlaying(id === playing ? null : id)}
										color="primary"
										sx={{zIndex: 1, position: "absolute"}}>
										{playing === id
											? <PauseIcon />
											: <PlayArrowOutlinedIcon />}
									</IconButton>
								: null}
							{image
								? (<ListItemAvatar>
										<Avatar variant="rounded" src={image} />
									</ListItemAvatar>)
								: null}
						</div>
						<ListItemText
							primary={type !== "track"
								? (	<Link onClick={() => navigate("/app/" + type + "/" + id)}>
										{title}
									</Link>)
								: title}
							secondary={type === "playlist"
								? artists.display_name
								: artistLinks(navigate, artists)}
							inset={!image} />
					</>
				);
			}
		},
		album: {
			accessorFn: (row) => (row.track || row).album.name,
			header: "Album",
			Cell: ({ cell, row }) => {
				return (
					<Link onClick={() => navigate("/app/" + "album" + "/" + (row.original.track || row.original).album.id)}>
						{cell.getValue()}
					</Link>
				);
			}
		}
	});
}
