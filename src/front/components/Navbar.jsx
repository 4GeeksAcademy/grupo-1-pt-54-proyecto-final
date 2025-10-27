import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<div style={{ position: "absolute", top: "6%", left: "85%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
			<Link to="/login" style={{ margin: "10px", padding: "8px 37px", backgroundColor: "#bb4a4a", color: "white", textDecoration: "none", borderRadius: "20px", fontSize: "x-large" }}>
				Login
			</Link>
		</div>
	);
};