import React, { useState, useEffect } from "react";
import SearchComponent from "./SearchComponent";
import BookList from "./BookList";

const BookApp = () => {
  const [myBooks, setMyBooks] = useState([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("myBooks");
    if (storedBooks) {
      setMyBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myBooks", JSON.stringify(myBooks));
  }, [myBooks]);

  const handleAddBook = (book) => {
    const exists = myBooks.some(
      (b) => b.title === book.title && b.author === book.author
    );
    if (!exists) {
      setMyBooks((prev) => [...prev, { ...book, progress: 0 }]);
    }
  };

  const handleRemoveBook = (book) => {
    const updatedBooks = myBooks.filter(
      (b) => !(b.title === book.title && b.author === book.author)
    );
    setMyBooks(updatedBooks);
  };

  const handleUpdateProgress = (book, newProgress) => {
    const updated = myBooks.map((b) =>
      b.title === book.title && b.author === book.author
        ? { ...b, progress: newProgress }
        : b
    );
    setMyBooks(updated);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Buscador y lista de libros</h2>
      <SearchComponent onAddBook={handleAddBook} />
      <BookList
        books={myBooks}
        onRemoveBook={handleRemoveBook}
        onUpdateProgress={handleUpdateProgress}
      />
    </div>
  );
};

export default BookApp;