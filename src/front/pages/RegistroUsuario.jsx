import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const RegistroUsuario = () => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showNotification, setShowNotification] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password })
            });
            const data = await response.json();

            if (data.success) {
                toast.success('Registro éxitoso! Por favor, verifica tu email.')
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error en registro:", error);
            toast.error("Hubo un error en la conexión con el servidor.")
        }

    };


    return (
        <div
            className="container-fluid px-0 min-vh-100"
            style={{ backgroundColor: "antiquewhite" }}
        > <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div className="row g-0 align-items-stretch">
                <div className="col-12 col-lg-5">
                    <img
                        src="https://i.pinimg.com/736x/ab/c0/dc/abc0dc80dd5c8832ab37700a725e990a.jpg"
                        alt="imagen de libros"
                        className="img-fluid w-100"
                        style={{
                            objectFit: "cover",
                            height: "633px",
                            WebkitMaskImage: "linear-gradient(to right, black 67%, transparent 95%)",
                            maskImage: "linear-gradient(to right, black 80%, transparent 100%)"
                        }}
                    />
                </div>
                <div className="col-12 col-lg-7 d-flex align-items-center justify-content-center p-4">
                    <form className="w-100" style={{ maxWidth: "700px" }} >
                        <h1 className="mb-4 text-center">Register</h1>
                        <div className="form-group mb-3">
                            <label htmlFor="firstnameinput" className="fst-italic">First Name</label>
                            <input
                                type="text"
                                className="form-control border-2"
                                id="firstnameinput"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={(e) => setFirstname(e.target.value)}
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
                                value={lastName}
                                onChange={(e) => setLastname(e.target.value)}
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    backgroundColor: "beige",
                                    border: "none",
                                    borderBottom: "2px solid #ffc107",
                                }}
                            />
                        </div>

                        <div className="text-center">

                            <button type="button" onClick={handleSubmit} className="btn btn-outline-warning">
                                Sign Up
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
