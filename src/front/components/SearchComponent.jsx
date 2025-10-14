import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";

export const SearchComponent = ({ onAddBook }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const BASE_API_URL = import.meta.env.VITE_BACKEND_URL || "";
  const ENDPOINT = "/api/books/search";
  const FALLBACK_URL = "https://openlibrary.org/search.json";

  const coverUrlFrom = (cover_i) =>
    cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
      : "/placeholder-book.png";

  const showData = async (query = "") => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setSuggestions([]);
      setMensaje("Ingresa al menos 2 caracteres para buscar.");
      return;
    }

    try {
      const resp = await fetch(`${BASE_API_URL}${ENDPOINT}?title=${encodeURIComponent(trimmed)}`);
      if (!resp.ok) throw new Error("Backend no disponible");

      const data = await resp.json();
      if (data.success && data.results.length > 0) {
        setResults(
          data.results.map((b) => ({
            id: b.id || b.key || b.title,
            title: b.title,
            authors: b.authors || b.author || "Autor desconocido",
            cover_i: b.cover_i || null,
          }))
        );
        setMensaje("");
        return;
      } else {
        throw new Error("Sin resultados en backend");
      }
    } catch {
      try {
        const fallbackResp = await fetch(`${FALLBACK_URL}?q=${encodeURIComponent(trimmed)}&limit=12`);
        if (!fallbackResp.ok) throw new Error("Error con OpenLibrary");

        const data = await fallbackResp.json();
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
        console.error("Error al obtener datos:", error);
        setMensaje("Error al obtener datos. Revisa la consola.");
      }
    }
  };

  const searcher = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim() === "") {
      setSuggestions([]);
      setResults([]);
      return;
    }
    showData(value);
  };

  const pickSuggestion = (book) => {
    setSearch(book.title);
    setSuggestions([]);
    showData(book.title);
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
              <strong>{s.title}</strong> <span>por {s.authors}</span>
            </li>
          ))}
        </ul>
      )}

      {mensaje && <p className="text-center text-muted">{mensaje}</p>}

      <div className="d-flex flex-wrap justify-content-center">
        {results.map((b) => (
          <BookCard
            key={b.id}
            book={{
              title: b.title,
              authors: b.authors,
              cover_i: b.cover_i,
              id: b.id,
            }}
            onAddBook={onAddBook}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
