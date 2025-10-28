import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export const Recuperacion = () => {
    const [email, setEmail] = useState('');
    const [redirectToNewPassword, setRedirectToNewPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forgot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            });
            if (!response.ok) throw new Error("Error en la solicitud para recuperar la contraseña.");

            toast.success('Se ha enviado un correo para restablecer la contraseña.');
            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="row justify-content-center">
                <div className="col-md-5 p-0">
                    <img
                        src="https://i.pinimg.com/736x/2a/9a/ca/2a9acad6f2853ecd86c0f007ccfbf14b.jpg"
                        alt="Imagen de recuperación"
                        className="img-fluid rounded-start w-100 h-100"
                        style={{
                            objectFit: "cover",
                            marginLeft: -155,
                            WebkitMaskImage: "linear-gradient(to right, black 75%, transparent 100%)",
                            maskImage: "linear-gradient(to right, black 80%, transparent 97%)"
                        }}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center" >
                    <div className="card-body p4 w-100">
                        <h2 className="card-title text-center mb-4" style={{ marginBottom: 60 }}>Recuperación de Contraseña</h2>
                        <form id="passwordRecoveryForm" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fst-italic">Correo electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        borderBottom: "2px solid #63d80aff",
                                    }}
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-outline-success">Enviar código</button>
                            </div>
                        </form>
                        <Link className="icon-link icon-link-hover" to="/login" style={{ color: "black", marginLeft: 190, marginTop: 20 }}>
                            Volver al Inicio de sesión
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const NuevaContrasena = ({ email }) => {
    const [params] = useSearchParams();
    const token = params.get("token");
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: nuevaContrasena }),
        });

        if (nuevaContrasena !== confirmarContrasena) {
            toast.error("Las contraseñas no coinciden")
            return;
        }

        toast.success('Contraseña cambiada exitosamente! Por favor, inicia sesión con tu nueva contraseña.');
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5 p-0">
                    <img
                        src="https://i.pinimg.com/736x/2a/9a/ca/2a9acad6f2853ecd86c0f007ccfbf14b.jpg"
                        alt="Imagen de recuperación"
                        className="img-fluid rounded-start w-100 h-100"
                        style={{
                            objectFit: "cover",
                            marginLeft: -155,
                            WebkitMaskImage: "linear-gradient(to right, black 75%, transparent 100%)",
                            maskImage: "linear-gradient(to right, black 80%, transparent 97%)"
                        }}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="card-body p4 w-100">
                        <h2 className="card-title text-center mb-4">Nueva Contraseña</h2>
                        <Toaster position="top-center" reverseOrder={false} />

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nuevaContrasena" className="form-label fst-italic">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="nuevaContrasena"
                                    placeholder="Ingresa tu nueva contraseña"
                                    value={nuevaContrasena}
                                    onChange={(e) => setNuevaContrasena(e.target.value)}
                                    required
                                    minLength={6}
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        borderBottom: "2px solid #63d80aff",
                                    }}
                                />
                                <div className="form-text">
                                    La contraseña debe tener al menos 6 caracteres.
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="confirmarContrasena" className="form-label fst-italic">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmarContrasena"
                                    placeholder="Confirma tu nueva contraseña"
                                    value={confirmarContrasena}
                                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                                    required
                                    style={{
                                        backgroundColor: "transparent",
                                        border: "none",
                                        borderBottom: "2px solid #63d80aff",
                                    }}
                                />
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-outline-success">Cambiar Contraseña</button>
                            </div>
                        </form>
                        <Link className="icon-link icon-link-hover" to="/login" style={{ color: "black", marginLeft: 190, marginTop: 20 }}>
                            Volver al Inicio de sesión
                            <svg xmlns="http://www.w3.org/2000/svg" className="bi" viewBox="0 0 16 16" aria-hidden="true">
                                <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};