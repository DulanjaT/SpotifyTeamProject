import { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";
import styles from "./SearchField.module.css";

export default function SearchField()
{
	const navigate = useNavigate();
	const [ params, setParams ] = useSearchParams();
	const [ query, setQuery ] = useState("");
	let inputTimer = null;

	return (
		<TextField className={styles.SearchField} label="Search" type="search" value={query} onChange={(event) => {
			clearTimeout(inputTimer);
			setQuery(event.target.value);
			inputTimer = setTimeout(() => {
				if (!event.target.value.length)
					navigate("/app");
				else
					navigate("/app/search?q=" + event.target.value);
			}, 800);
		}} />
	);
}
