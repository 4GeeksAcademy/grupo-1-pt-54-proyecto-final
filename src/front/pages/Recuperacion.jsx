import { useState } from 'react';

export const Recuperacion = () => {
    const [email, setEmail] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [redirectToNewPassword, setRedirectToNewPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Enviando código a:', email);
        
        setShowNotification(true);
        
        setTimeout(() => {
            setShowNotification(false);
            setRedirectToNewPassword(true);
        }, 3000);
        
        setEmail('');
    };

    if (redirectToNewPassword) {
        return <NuevaContrasena email={email} />;
    }

    return (
        <div className="container">
            {showNotification && (
                <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    <strong>¡Éxito!</strong> Código enviado correctamente a tu correo electrónico.
                    <strong> Redirigiendo al formulario de nueva contraseña...</strong>
                    <button 
                        type="button" 
                        className="btn-close" 
                        onClick={() => setShowNotification(false)}
                    ></button>
                </div>
            )}

            <div className="row justify-content-center">
                <div className="col-md-5 p-0">
                    <img 
                        src="https://i.pinimg.com/736x/2a/9a/ca/2a9acad6f2853ecd86c0f007ccfbf14b.jpg" 
                        alt="Imagen de recuperación"
                        className="img-fluid rounded-start w-100 h-100" 
                        style={{objectFit: "cover"}}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="card-body p4 w-100">
                        <h2 className="card-title text-center mb-4">Recuperación de Contraseña</h2>
                        <form id="passwordRecoveryForm" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Enviar código</button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <a href="#" className="text-decoration-none">Volver al Inicio de sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const NuevaContrasena = ({ email }) => {
    const [codigo, setCodigo] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [carga, setCarga] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (nuevaContrasena !== confirmarContrasena) {
            setMensaje('Las contraseñas no coinciden');
            return;
        }

        if (!codigo.trim()) {
            setMensaje('Por favor ingresa el código de verificación');
            return;
        }
        try {
            setCarga(true);
            // llamada a API
            setTimeout(() => {
                setCarga(false);
                setMensaje('¡Contraseña cambiada exitosamente!');
                
                setCodigo('');
                setNuevaContrasena('');
                setConfirmarContrasena('');
            }, 2000);
        } catch (error) {
            setCarga(false);
            setMensaje('Error al cambiar la contraseña. Inténtalo de nuevo.');
        }

        console.log('Cambiando contraseña para:', email);
        console.log('Código:', codigo);
        console.log('Nueva contraseña:', nuevaContrasena);
        
        setMensaje('¡Contraseña cambiada exitosamente!');
        
        setCodigo('');
        setNuevaContrasena('');
        setConfirmarContrasena('');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5 p-0">
                    <img 
                        src="https://i.pinimg.com/736x/2a/9a/ca/2a9acad6f2853ecd86c0f007ccfbf14b.jpg" 
                        alt="Imagen de recuperación"
                        className="img-fluid rounded-start w-100 h-100" 
                        style={{objectFit: "cover"}}
                    />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="card-body p4 w-100">
                        <h2 className="card-title text-center mb-4">Nueva Contraseña</h2>
                        
                        {mensaje && (
                            <div className={`alert ${mensaje.includes('éxito') ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                                {mensaje}
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setMensaje('')}
                                ></button>
                            </div>
                        )}
                        
                        <p className="text-muted text-center mb-4">
                            Se ha enviado un código de verificación a: <strong>{email}</strong>
                        </p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="codigo" className="form-label">Código de verificación</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="codigo" 
                                    placeholder="Ingresa el código recibido" 
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="nuevaContrasena" className="form-label">Nueva Contraseña</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="nuevaContrasena" 
                                    placeholder="Ingresa tu nueva contraseña" 
                                    value={nuevaContrasena}
                                    onChange={(e) => setNuevaContrasena(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <div className="form-text">
                                    La contraseña debe tener al menos 6 caracteres.
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="confirmarContrasena" className="form-label">Confirmar Contraseña</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="confirmarContrasena" 
                                    placeholder="Confirma tu nueva contraseña" 
                                    value={confirmarContrasena}
                                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Cambiar Contraseña</button>
                            </div>
                        </form>
                        
                        <div className="text-center mt-3">
                            <a href="#" className="text-decoration-none">Volver al Inicio de sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};