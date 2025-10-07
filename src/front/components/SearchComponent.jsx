import React, { useState } from "react";

const SearchBar = ({ onAddBook }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const URL = "https://openlibrary.org/search.json";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const response = await fetch(
        `${URL}?q=${encodeURIComponent(search)}&limit=10&fields=title,author_name`
      );
      const data = await response.json();
      setResults(data.docs || []);
    } catch (error) {
      console.error("Error al buscar libros:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="d-flex mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Busca por título o autor"
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-success">
          Buscar
        </button>
      </form>

      {results.length > 0 && (
        <table className="table table-striped table-hover shadow-lg">
          <thead>
            <tr className="bg-dark text-white">
              <th>Título</th>
              <th>Autor</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {results.map((book, index) => (
              <tr key={index}>
                <td>{book.title}</td>
                <td>
                  {book.author_name
                    ? book.author_name.join(", ")
                    : "Autor desconocido"}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                      onAddBook({
                        title: book.title,
                        author: book.author_name
                          ? book.author_name[0]
                          : "Autor desconocido",
                      })
                    }
                  >
                    ➕ Agregar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchBar;
