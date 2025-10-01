import React, { useState, useEffect } from "react";


export const SearchComponent= () =>  {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const librosLocal = [
    { id: 1, titulo: " ", autor: " " },
  ];

  const URL = "https://openlibrary.org/search.json";

  const coverUrlFrom = (cover_i) =>
    cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : "/placeholder-book.png";

  const showData = async (query = "") => {
  
  
    try {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setBooks([]);
      setMensaje("Ingresa al menos 2 caracteres para buscar.");
      return;
    }

    const resp = await fetch(
      `${URL}?q=${encodeURIComponent(trimmed)}&limit=12`
    );
    
      if (!resp.ok) {
      throw new Error(`Error ${resp.status}: ${resp.statusText}`);
      }

      const data = await resp.json();

      if (data.docs && data.docs.length > 0) {
        const normalized = data.docs.map((d, idx) => ({
          id: d.key || `${d.title}-${idx}`,
          title: d.title,
          authors: d.author_name ? d.author_name.join(", ") : "Autor desconocido",
          cover_i: d.cover_i || null,
        }));
        setBooks(normalized);
        setMensaje("");
      } else {
        setBooks([]);
        setMensaje("No se encontraron resultados.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMensaje("Error al obtener datos. Revisa la consola.");
    }
  };

  const searcher = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = librosLocal.filter((libro) =>
        libro.titulo.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }

    showData(value);
  };

  const pickSuggestion = (libro) => {
    setSearch(libro.titulo);
    setSuggestions([]);
    showData(libro.titulo);
  };

  useEffect(() => {
    showData("tolstoy");
  }, []);

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

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s) => (
            <li key={s.id} onClick={() => pickSuggestion(s)} className="suggestion-item">
              <strong>{s.titulo}</strong> <span className="suggest-author">por {s.autor}</span>
            </li>
          ))}
        </ul>
      )}

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="books-list">
        {books.map((b) => (
          <div key={b.id} className="book-card">
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
          </div>
        ))}
      </div>
    </div>
  );
}