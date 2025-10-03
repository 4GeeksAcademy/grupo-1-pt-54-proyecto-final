import React, { useState } from "react";
import BookList from "./BookList";


function App() {
  const [books, setBooks] = useState([
    { id: 1, title: "The Black Cat", author: "Edgar Allan Poe", status: "No leído", progress: 0 },
    { id: 2, title: "Annabel Lee", author: "Edgar Allan Poe", status: "No leído", progress: 0 },
    { id: 3, title: "IT", author: "Stephen King", status: "No leído", progress: 0 },
    { id: 4, title: "The Picture of Dorian Gray", author: "Oscar Wilde", status: "No leído", progress: 0 },
    { id: 5, title: "Carrie", author: "Stephen King", status: "No leído", progress: 0 }
  ]);

  const updateBookStatus = (id, newStatus, progress = null) => {
    setBooks(books.map(book =>
      book.id === id
        ? { ...book, status: newStatus, progress: progress !== null ? progress : book.progress }
        : book
    ));
  };

  return (
    <div className="App">
      <h1> Mi Lista de Libros</h1>
      <BookList books={books} updateBookStatus={updateBookStatus} />
    </div>
  );
}

export default App;
