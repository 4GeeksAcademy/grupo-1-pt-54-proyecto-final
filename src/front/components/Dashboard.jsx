import { useState, useEffect } from 'react';
import { EliminarLibro } from "./EliminarLibro"
import SearchComponent from "./SearchComponent"
import { Link } from 'react-router-dom';
import { BookStatus } from "./BookStatus"
export const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const fetchBooks = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/books`);
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            console.error("Error fetching books:", err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    localStorage.removeItem("access_token");

    return (
        <div style={{ backgroundColor: '#F8F9FA', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', margin: 0, padding: 0, minHeight: '82vh' }}>
            <div style={{ backgroundColor: '#2C3E50', color: 'white', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        <i className="fa-solid fa-book" style={{ marginRight: '10px' }} ></i>
                        Biblioteca Virtual
                    </div>
                </div>
                <div className="" style={{ width: "500px", padding: "0" }}>
                    <SearchComponent onAddBook={(newBook) => setBooks(prev => [...prev, newBook])} />
                </div>
                <div style={{ position: "absolute", top: "29%", left: "85%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
                    <Link to="/login" style={{ margin: "10px 0 0 150px", padding: "8px 37px", backgroundColor: "#bb4a4a", color: "white", textDecoration: "none", borderRadius: "20px", fontSize: "x-large" }}>
                        Logout
                    </Link>
                </div>
            </div>
            <div style={{ marginTop: '48px', padding: '20px', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                    {books.map(book => (
                        <div key={book.id} className="book-card">
                            <div style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', marginBottom: '20px', height: '100%', border: 'none', background: 'white' }}>
                                <div style={{
                                    height: '200px',
                                    borderRadius: '10px 10px 0 0',
                                    backgroundColor: '#6C757D',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden'
                                }}>
                                    {book.image_url ? (
                                        <img
                                            src={book.image_url}
                                            alt={book.title}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <i className="fa-solid fa-book" style={{ color: 'white', fontSize: '3rem' }}></i>
                                    )}
                                </div>

                                <div style={{ padding: '1rem' }}>
                                    <h5 style={{ marginBottom: '0.5rem' }}>{book.title}</h5>
                                    <p style={{ color: '#6C757D', marginBottom: '1rem' }}>{book.author}</p>
                                    <BookStatus id={book.id}
                                        progreso={book.progreso ?? 0}
                                        style={{ margin: '15px', marginLeft: '-54px' }} />
                                    <div className="">
                                        <Link to={`/libro-individual/${book.id}`} style={{ marginRight: "15px" }}>
                                            <button className="btn btn-success">Ver libro</button>
                                        </Link>
                                        <EliminarLibro id={book.id} onDelete={() => {
                                            setBooks(prev => prev.filter(b => b.id !== book.id));
                                        }} />
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











