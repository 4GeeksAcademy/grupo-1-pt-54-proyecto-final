import React from "react";

function BookCard({ book, updateBookStatus }) {
  const handleStartReading = () => {
    if (book.status === "No leído") {
      updateBookStatus(book.id, "En progreso", 10); // inicia con 10%
    }
  };

  const handleProgress = () => {
    if (book.status === "En progreso" && book.progress < 100) {
      const newProgress = book.progress + 20;
      if (newProgress >= 100) {
        updateBookStatus(book.id, "Leído", 100);
      } else {
        updateBookStatus(book.id, "En progreso", newProgress);
      }
    }
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p className="author">{book.author}</p>
      <p className={`status ${book.status.replace(" ", "-").toLowerCase()}`}>
        {book.status}
      </p>

      {book.status === "En progreso" && (
        <div className="progress-bar">
          <div style={{ width: `${book.progress}%` }}></div>
        </div>
      )}

      <div className="buttons">
        {book.status === "No leído" && (
          <button onClick={handleStartReading}>📖 Empezar</button>
        )}
        {book.status === "En progreso" && (
          <button onClick={handleProgress}>➡️ Avanzar</button>
        )}
      </div>
    </div>
  );
}

export default BookCard;