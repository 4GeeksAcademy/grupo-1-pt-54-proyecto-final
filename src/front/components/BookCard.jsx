import React from "react";

const BookCard = ({ book, onAddBook, onRemoveBook, onUpdateProgress, isInList = false }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/placeholder-book.png";

  const getStatus = (progress) => {
    if (progress === 0) return "Por leer";
    if (progress > 0 && progress < 100) return "En progreso";
    return "Leído";
  };

  return (
    <div
      className="card shadow-sm m-2 text-center"
      style={{ width: "180px", minHeight: "360px" }}
    >
      <img
        src={coverUrl}
        alt={book.title}
        className="card-img-top"
        onError={(e) => (e.currentTarget.src = "/placeholder-book.png")}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h6 className="card-title">{book.title}</h6>
          <p className="card-text text-muted" style={{ fontSize: "0.9em" }}>
            {book.authors || book.author}
          </p>
        </div>

        {isInList ? (
          <>
            {onUpdateProgress && (
              <div className="my-2">
                <label className="form-label mb-1">
                  Estado:{" "}
                  <strong
                    style={{
                      color:
                        book.progress === 100
                          ? "green"
                          : book.progress > 0
                          ? "orange"
                          : "gray",
                    }}
                  >
                    {getStatus(book.progress)}
                  </strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={book.progress || 0}
                  onChange={(e) =>
                    onUpdateProgress(book, Number(e.target.value))
                  }
                  className="form-range"
                />
                <span>{book.progress || 0}%</span>
              </div>
            )}
            {onRemoveBook && (
              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => onRemoveBook(book)}
              >
                Eliminar
              </button>
            )}
          </>
        ) : (
          <button
            className="btn btn-primary btn-sm mt-3"
            onClick={() =>
              onAddBook({
                title: book.title,
                author: book.authors || "Autor desconocido",
                cover_i: book.cover_i || null,
                progress: 0,
              })
            }
          >
            ➕ Agregar
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;