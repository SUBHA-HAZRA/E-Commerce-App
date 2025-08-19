// src/pages/SearchResults.jsx
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";

const categoryMap = {
  electronics: "electronics",
  jewelery: "jewelery",
  men: "men's clothing",
  women: "women's clothing",
};

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const formattedQuery =
          categoryMap[query.toLowerCase()] || query.toLowerCase();

        const res = await fetch(
          `https://fakestoreapi.com/products/category/${formattedQuery}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
        <p className="text-gray-500 mt-1">
          Showing results for:{" "}
          <span className="font-semibold">"{decodeURIComponent(query)}"</span>
        </p>
      </div>

      {/* Product Grid */}
      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found for "{query}".</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
