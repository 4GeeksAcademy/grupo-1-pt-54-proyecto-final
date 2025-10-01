
export const Recuperacion = () => {
    return (

        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5 p-0">
                    <img src="https://i.pinimg.com/736x/2a/9a/ca/2a9acad6f2853ecd86c0f007ccfbf14b.jpg" alt="Imagen de recuperación"
                        className="img-fluid rounded-start w-100 h-100" style={{objectFit: "cover"}}/>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div className="card-body p4 w-100">
                        <h2 className="card-title text-center mb-4">Recuperación de Contraseña</h2>
                        <form id="passwordRecoveryForm">
                            <div className="mb-3">
                                <label for="email" className="form-label">Correo electrónico</label>
                                <input type="email" className="form-control" id="email" placeholder="Email" required/>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Enviar codigo</button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <a href="#" className="text-decoration-none">Volver al Inicio de sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 
