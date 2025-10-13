import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";

export const SearchComponent = ({ onAddBook }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const librosLocal = [{ id: 1, titulo: " ", autor: " " }];
  const URL = "https://openlibrary.org/search.json";

  const coverUrlFrom = (cover_i) =>
    cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
      : "/placeholder-book.png";

  const showData = async (query = "") => {
    try {
      const trimmed = query.trim();
      if (trimmed.length < 2) {
        setResults([]);
        setMensaje("Ingresa al menos 2 caracteres para buscar.");
        return;
      }

      const resp = await fetch(`${URL}?q=${encodeURIComponent(trimmed)}&limit=12`);
      if (!resp.ok) throw new Error(`Error ${resp.status}: ${resp.statusText}`);

      const data = await resp.json();

      if (data.docs && data.docs.length > 0) {
        const normalized = data.docs.map((d, idx) => ({
          id: d.key || `${d.title}-${idx}`,
          title: d.title,
          authors: d.author_name ? d.author_name.join(", ") : "Autor desconocido",
          cover_i: d.cover_i || null,
        }));
        setResults(normalized);
        setMensaje("");
      } else {
        setResults([]);
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
    <div className="search-root container my-4">
      <div className="input-group mb-3">
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder="Buscar título o autor..."
          className="form-control"
        />
      </div>

      {suggestions.length > 0 && (
        <ul className="list-group mb-2">
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => pickSuggestion(s)}
              className="list-group-item list-group-item-action"
            >
              <strong>{s.titulo}</strong> <span>por {s.autor}</span>
            </li>
          ))}
        </ul>
      )}

      {mensaje && <p className="text-center text-muted">{mensaje}</p>}

      <div className="d-flex flex-wrap justify-content-center">
        {results.map((b) => (
          <BookCard key={b.id} book={b} onAddBook={onAddBook} />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;