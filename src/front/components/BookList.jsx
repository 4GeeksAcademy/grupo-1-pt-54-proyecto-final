import React from "react";
import BookCard from "./BookCard";

function BookList({ books, updateBookStatus }) {
  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} updateBookStatus={updateBookStatus} />
      ))}
    </div>
  );
}

export default BookList;