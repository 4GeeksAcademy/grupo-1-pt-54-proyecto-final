import { Link } from "react-router-dom";

export const NavbarLibroIndividual = () => {

    return (
        <nav className="navbar navbar-light bg-light" style={{ marginBottom: "20px" }}>
            <div className="container" style={{ justifyContent: "right" }} >
                <div className="ml-auto">
                    <Link to="/dashboard">
                        <button className="btn btn-outline-success border-2" style={{ justifyItems: "right" }}>Go back Reading List</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};