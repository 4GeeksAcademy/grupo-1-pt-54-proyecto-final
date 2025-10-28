import { useParams } from "react-router-dom";

export const EliminarLibro = ({ id, onDelete }) => {
    const deleteBook = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("No se encontró un token de autenticación. Por favor, inicia sesión nuevamente.");
            console.error("Token ausente en localStorage");
            return;
        }

        try {
            console.log("Enviando DELETE con token:", token); // Para depuración
            const response = await fetch(
                `https://effective-space-spoon-975rgjpwg5xqcpg6r-3001.app.github.dev/api/books/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                console.log("Book deleted successfully");
                if (onDelete) onDelete(id);
            } else if (response.status === 401) {
                alert("No autorizado. Tu sesión ha expirado o el token es inválido.");
                console.error("Error 401: Unauthorized");
            } else {
                const errorData = await response.json();
                console.error("Failed to delete book", errorData);
                alert(errorData.message || "Failed to delete book");
            }
        } catch (error) {
            console.error("Error deleting book:", error);
            alert("Ocurrió un error al eliminar el libro. Intenta nuevamente.");
        }
    };

    return (
        <>
            <button
                className="btn btn-danger"
                data-bs-toggle="modal"
                data-bs-target={`#confirmation-${id}`}
            >
                <i className="fa-solid fa-trash"></i>
            </button>

            <div
                className="modal fade"
                id={`confirmation-${id}`}
                tabIndex="-1"
                aria-labelledby={`confirmation-${id}`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`#confirmation-${id}`}>REMOVE</h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        <div className="modal-body">
                            Are you sure? After deleting this book all changes will be deleted. You will no longer see your book in your reading list.
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={deleteBook}
                            >
                                I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
