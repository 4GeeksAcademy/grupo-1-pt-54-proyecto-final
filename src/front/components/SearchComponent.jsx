import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import BookList from "./BookList"; 

const SearchComponent = ({ onAddBook }) => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [myBooks, setMyBooks] = useState([]); 

  const ENDPOINT = "/api/books/search";
  const BASE_API_URL = import.meta.env.VITE_BACKEND_URL;
  const coverUrlFrom = (cover_i) =>
    cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
      : "/placeholder-book.png";

  const showData = async (query = "") => {
    try {
      const trimmed = query.trim();
      if (trimmed.length < 2) {
        setBooks([]);
        setSuggestions([]);
        setMensaje("Ingresa al menos 2 caracteres para buscar.");
        return;
      }

      const resp = await fetch(
        `${BASE_API_URL}${ENDPOINT}?title=${encodeURIComponent(trimmed)}`
      );
      if (resp.status === 304) {
        console.log("Response 304: Not Modified — reusing previous results.");
        return;
      }
      if (!resp.ok) {
        throw new Error(`Error ${resp.status}: ${resp.statusText}`);
      }

      const data = await resp.json();
      if (data.success && data.results.length > 0) {
        setBooks(data.results);
        setSuggestions(data.results);
        setMensaje("");
      } else {
        setBooks([]);
        setSuggestions([]);
        setMensaje(data.message || "No se encontraron resultados.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMensaje("Error al obtener datos. Revisa la consola.");
    }
  };

  const debouncedSearch = useMemo(() => debounce(showData, 500), []);
  const searcher = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const pickSuggestion = (book) => {
    setSearch(book.title);
    setSuggestions([]);
    setBooks([book]);
  };

  const handleAddBook = (book) => {
    // onAddBook(book);
    setMyBooks((prev) => [...prev, book]); 
  };

  const handleRemoveBook = (bookToRemove) => {
    setMyBooks((prev) => prev.filter((b) => b.title !== bookToRemove.title));
  };

  useEffect(() => {}, []);

  return (
    <div className="search-root">
      <div className="search-bar-container">
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Buscar título o autor..."
          className="search-input"
        />
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="books-list">
        {books.map((b) => (
         <div key={b.id || b.key || b.title} className="book-card">
            <div className="book-cover">
              <img
                src={coverUrlFrom(b.cover_i)}
                alt={b.title}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-book.png";
                }}
              />
            </div>
            <div className="book-body">
              <h3 className="book-title">{b.title}</h3>
              <p className="book-author">by {b.authors}</p>
            </div>
            <div className="book-actions">
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() =>
                  handleAddBook({
                    id: b.id || b.key || Date.now(),
                    title: b.title,
                    author: b.authors || "Autor desconocido",
                  })
                }
              >
                ➕ Agregar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* {myBooks.length > 0 && (
        <div className="mt-5">
          <BookList books={myBooks} onRemoveBook={handleRemoveBook} />
        </div>
      )} */}
    </div>
  );
};

export default SearchComponent;