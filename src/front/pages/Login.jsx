import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem("token", data.access_token);
                toast.success('Login exitoso!')
                setTimeout(() => {
                    navigate("/dashboard");
                }, 2000);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error en login:", error);
            toast.error("Hubo un error en la conexión con el servidor.");
        }
    };

    return (
        <div
            className="container-fluid px-0 min-vh-100"
            style={{ backgroundColor: "lavender" }}
        > <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="row g-0 align-items-stretch">
                <div className="col-12 col-lg-5">
                    <img
                        src="https://images.pexels.com/photos/1148399/pexels-photo-1148399.jpeg?_gl=1*1lyoxoj*_ga*MTkzNTkwMzEzMC4xNzU4MzM5NDg2*_ga_8JE65Q40S6*czE3NTgzMzk0ODUkbzEkZzEkdDE3NTgzMzk0ODckajU4JGwwJGgw"
                        alt="imagen de libros"
                        className="img-fluid w-100"
                        style={{
                            objectFit: "cover",
                            height: "633px",
                            WebkitMaskImage: "linear-gradient(to right, black 75%, transparent 100%)",
                            maskImage: "linear-gradient(to right, black 80%, transparent 100%)"
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    borderBottom: "2px solid #ffc107",
                                }}
                            />
                        </div>

                        <div className="text-center"><button type="button" onClick={handleSubmit} className="btn btn-outline-warning">
                            Login
                        </button>
                        </div>
                        <Link className="icon-link icon-link-hover" to="/recuperacion" style={{ color: "black" , marginLeft: 270 , marginTop: 20}}>
                            Olvidé mi contraseña
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};


