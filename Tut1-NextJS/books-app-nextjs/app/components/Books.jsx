"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import LoadingPage from "../loading";
import { SearchContext } from "../layout"; // Import context
import AddBook from "./AddBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useContext(SearchContext); // Use searchTerm from context

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      if (!res.ok) throw new Error("Failed to fetch books");
      const json = await res.json();
      setBooks(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <LoadingPage />;

  // Filter books based on search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteBook = async (id) => {
    const res = await fetch(`api/books/${id}`, {
      method: "DELETE",
    });
    console.log("Deleting...")
    fetchBooks();
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <AddBook refreshBooks={fetchBooks} />
      {filteredBooks.map((book) => (
        <div key={book.id} className="card w-96 bg-base-100 shadow-xl mb-10">
          <figure>
            <img src={book.img} alt={book.title} width="200" height="150" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{book.title}</h2>
            <p>{book.id}</p>
            <div className="card-actions justify-end">
              <Link href={book.link} className="btn btn-primary">
                See in Amazon
              </Link>
              <button
                onClick={() => deleteBook(book.id)}
                className="btn btn-error"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      {filteredBooks.length === 0 && (
        <p className="text-center text-gray-500">No books found.</p>
      )}
    </div>
  );
};

export default Books;


