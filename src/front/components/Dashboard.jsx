import { useState } from 'react';
import { EliminarLibro } from "./EliminarLibro"
import SearchComponent from "./SearchComponent"
import { Link } from 'react-router-dom';
import { BookStatus } from "./BookStatus"
export const Dashboard = () => {
    const [books, setBooks] = useState([
        { id: 1, title: "Ejemplo de libro", author: "Autor Ejemplo" },
        { id: 2, title: "Ejemplo de libro", author: "Autor Ejemplo" },
        { id: 3, title: "Ejemplo de libro", author: "Autor Ejemplo" },
        { id: 4, title: "Ejemplo de libro", author: "Autor Ejemplo" },
        { id: 5, title: "Ejemplo de libro", author: "Autor Ejemplo" }
    ]);
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
                    <SearchComponent />
                </div>
            </div>
            <div style={{ marginTop: '48px', padding: '20px', maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
                    {books.map(book => (
                        <div key={book.id} className="book-card">
                            <div style={{ borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s', marginBottom: '20px', height: '100%', border: 'none', background: 'white' }}>
                                <div style={{ height: '200px', borderRadius: '10px 10px 0 0', backgroundColor: '#6C757D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '3rem' }}>
                                    <i className="fa-solid fa-book"></i>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h5 style={{ marginBottom: '0.5rem' }}>{book.title}</h5>
                                    <p style={{ color: '#6C757D', marginBottom: '1rem' }}>{book.author}</p>
                                    <BookStatus style={{ margin: '15px', marginLeft: '-54px' }} />
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











