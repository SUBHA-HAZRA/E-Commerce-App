import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
        <p className="text-gray-500 mt-1">
          Browse from our exclusive collection
        </p>
      </div>

      {/* Future: Sorting and Category Filters */}
      {/* 
      <div className="flex justify-between items-center mb-6">
        <CategoryDropdown />
        <SortDropdown />
      </div> 
      */}

      {/* Product Grid */}
      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
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

export default Products;
