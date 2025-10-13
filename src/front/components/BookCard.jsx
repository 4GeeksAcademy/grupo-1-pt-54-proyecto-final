import React from "react";

const BookCard = ({ book, onAddBook }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/placeholder-book.png";

  const handleAdd = () => {
 
    onAddBook({
      title: book.title,
      author: book.authors || "Autor desconocido",
      status: "Por leer",
      cover_i: book.cover_i || null,
    });
  };

  return (
    <div className="card shadow-sm m-2" style={{ width: "180px" }}>
      <img
        src={coverUrl}
        alt={book.title}
        className="card-img-top"
        onError={(e) => (e.currentTarget.src = "/placeholder-book.png")}
      />
      <div className="card-body text-center">
        <h6 className="card-title">{book.title}</h6>
        <p className="card-text text-muted" style={{ fontSize: "0.9em" }}>
          {book.authors}
        </p>
        <button className="btn btn-primary btn-sm" onClick={handleAdd}>
          ➕ Agregar
        </button>
      </div>
    </div>
  );
};

export default BookCard;