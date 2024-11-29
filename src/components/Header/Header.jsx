import { Link } from "react-router";
import "./Header.css"

export default function Header()
{
	return (
		<nav>
			<ul>
				
				<li><Link to="/app">App (Playlist Demo)</Link></li>
				<li><Link to="/artist">Artist Demo</Link></li>
				<li><Link to="/player">Player</Link></li>
			</ul>
		</nav>
	);
}
