import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books, onRemoveBook, onUpdateProgress }) => {
  return (
    <div className="mt-4">
      <h4>Mis Libros</h4>
      {books.length === 0 ? (
        <p>No has agregado libros todavía.</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {books.map((book, index) => (
            <BookCard
              key={index}
              book={book}
              isInList={true}
              onRemoveBook={onRemoveBook}
              onUpdateProgress={onUpdateProgress}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;