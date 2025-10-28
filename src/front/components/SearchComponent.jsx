import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import toast, { Toaster } from "react-hot-toast";

const SearchComponent = ({ onAddBook }) => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const coverUrlFrom = (cover_i) => `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`

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
        `${import.meta.env.VITE_BACKEND_URL}/api/books/search?title=${encodeURIComponent(trimmed)}`
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

  const handleAddBook = async (book) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          cover_i: book.cover_i,
          sinopsis: book.description
        })
      });

      const data = await response.json();

      if (data.success) {
        setMyBooks(prev => [...prev, data.book]);
        toast.success('Libro agregado correctamente')
        setSuggestions([]);
        if (onAddBook) onAddBook(data.book);
      } else {
        toast.error("Error al agregar el libro")
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al conectar con el servidor")
    }
  };

  return (
    <div className="search-root">
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
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
          <div key={b.id || b.key || b.title} className="book-card" style={{ height: "80px" }}>
            <div className="book-cover">
              <img
                src={coverUrlFrom(b.cover_i)}
                alt={b.title}
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
                    cover_i: b.cover_i,
                    description: b.description
                  })
                }
              >
                <i className="fa-solid fa-plus"></i> Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;