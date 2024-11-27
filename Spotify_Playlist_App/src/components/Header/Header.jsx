import { Link } from "react-router";
import "./Header.css"


const Header = () => {
	return (
		<nav>
			<ul>
				
				<li><Link to="/app">App</Link></li>
				<li><Link to="/demo">Demo</Link></li>
				<li><Link to="/artist">Artist Demo</Link></li>
				<li><Link to="/player">Player (WIP)</Link></li>
			</ul>
		</nav>
	);
};

export default Header;