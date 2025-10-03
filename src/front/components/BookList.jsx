import React from "react";

const BookList = ({ books, onRemoveBook }) => {
  return (
    <div className="mt-4">
      <h4>Mis Libros</h4>
      {books.length === 0 ? (
        <p>No has agregado libros todavía.</p>
      ) : (
        <ul className="list-group">
          {books.map((book, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{book.title}</strong> - {book.author}
              </span>
              <button
                className="btn btn-danger btn-sm"
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