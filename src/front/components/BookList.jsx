import React from "react";

const BookList = ({ books, onRemoveBook, onUpdateProgress }) => {
  const getStatus = (progress) => {
    if (progress === 0) return "Por leer";
    if (progress > 0 && progress < 100) return "En progreso";
    return "Leído";
  };

  return (
    <div className="mt-4">
      <h4 className="mb-3">Mis Libros</h4>

      {books.length === 0 ? (
        <p>No has agregado libros todavía.</p>
      ) : (
        <ul className="list-group">
          {books.map((book, index) => (
            <li
              key={index}
              className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2 shadow-sm rounded"
            >
              <div className="book-info">
                <strong>{book.title}</strong> - {book.author}
              </div>

              <div className="book-progress mt-3 mt-md-0" style={{ width: "100%", maxWidth: "300px" }}>
                <label htmlFor={`progress-${index}`} className="form-label mb-1">
                  Estado:{" "}
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        book.progress === 100
                          ? "green"
                          : book.progress > 0
                          ? "orange"
                          : "gray",
                    }}
                  >
                    {getStatus(book.progress)}
                  </span>
                </label>
                <input
                  type="range"
                  className="form-range"
                  id={`progress-${index}`}
                  min="0"
                  max="100"
                  value={book.progress || 0}
                  onChange={(e) => onUpdateProgress(book, Number(e.target.value))}
                />
                <span>{book.progress || 0}%</span>
              </div>

              <button
                className="btn btn-danger btn-sm mt-3 mt-md-0"
                onClick={() => onRemoveBook(book)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;