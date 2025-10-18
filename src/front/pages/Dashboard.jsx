import { useState } from 'react';
import SearchComponent from "./components/SearchComponent";


export const Dashboard = () => {
    const [books] = useState([
        { id: 1, title: "Ejemplo de libro", author: "Autor Ejemplo" },
        { id: 2, title: "Ejemplo de libro", author: "Autor Ejemplo" },
        { id: 3, title: "Ejemplo de libro", author: "Autor Ejemplo" },
        { id: 4, title: "Ejemplo de libro", author: "Autor Ejemplo" },
        { id: 5, title: "Ejemplo de libro", author: "Autor Ejemplo" }
    ]);

    const [showSearchComponent, setShowSearchComponent] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleViewBook = (bookId) => {
        const book = books.find(b => b.id === bookId);
        if (book) {
            alert(`Abriendo: ${book.title}`);
        }
    };

    const handleDeleteBook = (bookId) => {
        if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
            alert('Libro eliminado correctamente');
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim().length >= 2) {
            setShowSearchComponent(true);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', margin: 0, padding: 0, minHeight: '100vh' }}>
            <div style={{ backgroundColor: '#2c3e50', color: 'white', padding: '15px 0', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <i className="fa-solid fa-book" style={{ marginRight: '10px' }} ></i> 
                        Biblioteca Virtual
                    </div>
                    <div style={{ display: 'flex', width: '50%' }}>
                        <input 
                            type="text" 
                            placeholder="Buscar libros..." 
                            value={searchQuery}
                            onChange={handleSearch}
                            onKeyPress={handleKeyPress}
                            style={{ borderRadius: '20px 0 0 20px', border: 'none', padding: '10px 15px', width: '100%' }}
                        />
                        <button 
                            style={{ borderRadius: '0 20px 20px 0', border: 'none', backgroundColor: '#3498db', color: 'white', padding: '0 20px', cursor: 'pointer' }}
                            onClick={handleSearchSubmit}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '80px', padding: '20px', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
                
               
                {showSearchComponent && (
                    <div style={{ marginBottom: '30px', backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0 }}>Resultados de búsqueda</h3>
                            <button 
                                className="btn btn-secondary btn-sm"
                                onClick={() => setShowSearchComponent(false)}
                                style={{ backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                <i className="fa-solid fa-times"></i> Cerrar
                            </button>
                        </div>
                        <SearchComponent onAddBook={() => {}} initialQuery={searchQuery} />
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                    {books.map(book => (
                        <div key={book.id} className="book-card">
                            <div style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', marginBottom: '20px', height: '100%', border: 'none', background: 'white' }}>
                                <div style={{ height: '200px', borderRadius: '10px 10px 0 0', backgroundColor: '#6c757d', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem' }}>
                                    <i className="fa-solid fa-book"></i> 
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h5 style={{ marginBottom: '0.5rem' }}>{book.title}</h5>
                                    <p style={{ color: '#6c757d', marginBottom: '1rem' }}>{book.author}</p>
                                    <div><p>Status</p></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                        <button 
                                            style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.875rem' }}
                                            onClick={() => handleViewBook(book.id)}
                                        >
                                            <i className="fa-solid fa-eye"></i> Ver
                                        </button>
                                        <button 
                                            style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', fontSize: '0.875rem' }}
                                            onClick={() => handleDeleteBook(book.id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 1200px) {
                    .books-grid {
                        grid-template-columns: repeat(4, 1fr) !important;
                    }
                }
                
                @media (max-width: 992px) {
                    .books-grid {
                        grid-template-columns: repeat(3, 1fr) !important;
                    }
                }
                
                @media (max-width: 768px) {
                    .books-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    
                    .header-content {
                        flex-direction: column !important;
                        gap: 15px !important;
                    }
                    
                    .search-container {
                        width: 100% !important;
                    }
                    
                    .main-content {
                        margin-top: 120px !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .books-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>
        </div>
    );
};

// SearchComponent sin editar - solo agregado al final
const SearchComponent = ({ onAddBook, initialQuery = "" }) => {
    const [search, setSearch] = useState(initialQuery);
    const [results, setResults] = useState([]);
    const [books, setBooks] = useState([]);
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

    React.useEffect(() => {
        if (initialQuery) {
            showData(initialQuery);
        }
    }, [initialQuery]);

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
                        <div> 
                            <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() =>
                                    onAddBook({
                                        title: b.title,
                                        author: b.authors,
                                    })
                                    }
                                >
                                    Agregar
                             </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};