import React, { useState, useEffect } from "react";
import SearchBar from "./SearchComponent";
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
      setMyBooks((prev) => [...prev, book]);
    }
  };

  const handleRemoveBook = (book) => {
    const updatedBooks = myBooks.filter(
      (b) => !(b.title === book.title && b.author === book.author)
    );
    setMyBooks(updatedBooks);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Buscador y lista de libros</h2>
      <SearchBar onAddBook={handleAddBook} />
      <BookList books={myBooks} onRemoveBook={handleRemoveBook} />
    </div>
  );
};

export default BookApp;