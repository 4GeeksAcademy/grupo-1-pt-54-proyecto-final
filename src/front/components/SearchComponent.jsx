import React, { useState, useEffect } from "react";

const SearchComponent = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const URL = "https://openlibrary.org/search.json";

    const showData = async (query = "") => {
        try {
            const response = await fetch(
                `${URL}?q=${encodeURIComponent(query)}&limit=10&fields=title,author_name`
            );
            const data = await response.json();
            setBooks(data.docs || []); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

   
    const searcher = (e) => {
        const value = e.target.value;
        setSearch(value);
        showData(value); 
    };

   
    useEffect(() => {
        showData("tolstoy"); 
    }, []);

    return (
        <div>
            <input
                value={search}
                onChange={searcher}
                type="text"
                placeholder="Search by title or author"
                className="form-control"
            />

            <table className="table table-striped table-hover mt-5 shadow-lg">
                <thead>
                    <tr className="bg-curso text-white">
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((book, index) => (
                            <tr key={index}>
                                <td>{book.title}</td>
                                <td>
                                    {book.author_name
                                        ? book.author_name.join(", ")
                                        : "N/A"}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">No results found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default SearchComponent;