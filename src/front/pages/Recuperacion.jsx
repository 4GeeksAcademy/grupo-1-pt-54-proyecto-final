import { useState } from 'react';

function PasswordRecovery() {
    const [email, setEmail] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        console.log('Enviando código a:', email);
        
       
        setShowNotification(true);
        
        
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
        
        
        setEmail('');
    };

    return (
        <div className="container">
          
            {showNotification && (
                <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    <strong>¡Éxito!</strong> Código enviado correctamente a tu correo electrónico.
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
