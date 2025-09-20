import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <div
            className="container-fluid px-0 min-vh-100"
            style={{ backgroundColor: "lavender" }}
        >
            <div className="row g-0 align-items-stretch">
                <div className="col-12 col-lg-5">
                    <img
                        src="https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?_gl=1*1lyoxoj*_ga*MTkzNTkwMzEzMC4xNzU4MzM5NDg2*_ga_8JE65Q40S6*czE3NTgzMzk0ODUkbzEkZzEkdDE3NTgzMzk0ODckajU4JGwwJGgw"
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
                        <h1 className="mb-4 text-center">Login</h1>

                        <div className="form-group mb-3">
                            <label htmlFor="emailinput" className="fst-italic">Email</label>
                            <input
                                type="email"
                                className="form-control border-2"
                                id="emailinput"
                                placeholder="Enter email"
                                style={{
                                    backgroundColor: "transparent",
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
                                    backgroundColor: "transparent",
                                    border: "none",
                                    borderBottom: "2px solid #ffc107",
                                }}
                            />
                        </div>

                        <div className="text-center">
                            <Link to="/login">
                                <button type="submit" className="btn btn-outline-warning">
                                    Login
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


