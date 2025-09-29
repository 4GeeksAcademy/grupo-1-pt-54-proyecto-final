import { useParams } from "react-router-dom";


export const EliminarLibro = () => {
    const { id } = useParams();

    const deleteBook = async () => {
        try {
            const response = await fetch(`api/books/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Book deleted successfully");
            } else {
                console.error("Failed to delete book");
            }
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <>
            <button
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#confirmation"
            >
                <i className="fa-solid fa-trash"></i>
            </button>

            <div
                className="modal fade"
                id="confirmation"
                tabIndex="-1"
                aria-labelledby="confirmationTitle"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="confirmationTitle">REMOVE</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            Are you sure? After deleting this book all changes will be deleted. You will no longer see your book in your reading list.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteBook}>
                                I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
