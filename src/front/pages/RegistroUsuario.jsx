import { Link } from "react-router-dom";

export const RegistroUsuario = () => {
    return (
        <div
            className="container-fluid px-0 min-vh-100"
            style={{ backgroundColor: "antiquewhite" }}
        >
            <div className="row g-0 align-items-stretch">
                <div className="col-12 col-lg-5">
                    <img
                        src="https://i.pinimg.com/736x/ab/c0/dc/abc0dc80dd5c8832ab37700a725e990a.jpg"
                        alt="imagen de libros"
                        className="img-fluid w-100"
                        style={{
                            objectFit: "cover",
                            height: "633px"
                        }}
                    />
                </div>
                <div className="col-12 col-lg-7 d-flex align-items-center justify-content-center p-4">
                    <form className="w-100" style={{ maxWidth: "700px" }}>
                        <h1 className="mb-4 text-center">Register</h1>

                        <div className="form-group mb-3">
                            <label htmlFor="firstnameinput" className="fst-italic">First Name</label>
                            <input
                                type="text"
                                className="form-control border-2"
                                id="firstnameinput"
                                placeholder="Enter First Name"
                                style={{
                                    backgroundColor: "beige",
                                    border: "none",
                                    borderBottom: "2px solid #ffc107",
                                }}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="lastnameinput" className="fst-italic">Last Name</label>
                            <input
                                type="text"
                                className="form-control border-2"
                                id="lastnameinput"
                                placeholder="Enter Last Name"
                                style={{
                                    backgroundColor: "beige",
                                    border: "none",
                                    borderBottom: "2px solid #ffc107",
                                }}
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="emailinput" className="fst-italic">Email</label>
                            <input
                                type="email"
                                className="form-control border-2"
                                id="emailinput"
                                placeholder="Enter email"
                                style={{
                                    backgroundColor: "beige",
                                    border: "none",
                                    borderBottom: "2px solid #ffc107",
                                }}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="passwordinput" className="fst-italic">Password</label>
                            <input
                                type="password"
                                className="form-control border-2"
                                id="passwordinput"
                                placeholder="Enter password"
                                style={{
                                    backgroundColor: "beige",
                                    border: "none",
                                    borderBottom: "2px solid #ffc107",
                                }}
                            />
                        </div>

                        <div className="text-center">
                            <Link to="/login">
                                <button type="submit" className="btn btn-outline-warning">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
