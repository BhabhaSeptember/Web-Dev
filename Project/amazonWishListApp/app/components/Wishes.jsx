"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import LoadingPage from "../loading";
import { SearchContext } from "../context/SearchContext"; // Import context
import AddWish from "./AddWish";

const Wishes = () => {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useContext(SearchContext); // Use searchTerm from context

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      if (!res.ok) throw new Error("Failed to fetch wishes");
      const json = await res.json();
      setWishes(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  if (loading) return <LoadingPage />;

  const filteredWishes = wishes.filter((wish) =>
    wish.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteWish = async (id) => {
    try {
      const res = await fetch(`api/wishes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete wish");
      console.log("Wish deleted successfully");
      fetchWishes();
    } catch (error) {
      console.error("Error deleting wish:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-base-content mb-2">
           My Wish List
        </h1>
        <p className="text-lg text-base-content/70">
          Your collection of amazing finds from Amazon
        </p>
      </div>

      {/* Add Wish Component */}
      <div className="flex justify-center mb-8">
        <AddWish refreshWishes={fetchWishes} />
      </div>

      {/* Wishes Grid */}
      <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
        {filteredWishes.map((wish) => (
          <div key={wish.id} className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <figure className="px-4 pt-4">
              <img 
                src={wish.img} 
                alt={wish.title}
                className="w-full h-48 object-cover rounded-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold line-clamp-2">
                {wish.title}
              </h2>
              
              <div className="card-actions justify-between items-center mt-4">
                <Link
                  href={wish.link}
                  className="btn btn-primary btn-sm flex-1 mr-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View on Amazon
                </Link>
                <button
                  onClick={() => deleteWish(wish.id)}
                  className="btn btn-error btn-sm"
                  title="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredWishes.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg className="w-24 h-24 mx-auto text-base-content/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content/70 mb-2">
            No wishes found
          </h3>
          <p className="text-base-content/50 mb-6">
            {searchTerm ? 
              `No wishes match "${searchTerm}". Try a different search term.` : 
              "Start building your wishlist by adding your first item!"
            }
          </p>
          <Link href="/amazonStore" className="btn btn-primary">
            Browse Amazon Store
          </Link>
        </div>
      )}
    </div>
  );
};

export default Wishes;