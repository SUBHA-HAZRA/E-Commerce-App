// src/Components/ProductCard.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CounterContext } from "../Context/Counter";

const ProductCard = ({ data }) => {
  const { count, setCount, cart, setCart } = useContext(CounterContext);
  const [isAdding, setIsAdding] = useState(false);

  const Click = () => {
    setIsAdding(true);

    const isAlreadyInCart = cart.find((item) => item.id === data.id);

    if (!isAlreadyInCart) {
      const productWithQty = { ...data, quantity: 1 };
      setCart([...cart, productWithQty]);
    } else {
      const updatedCart = cart.map((item) =>
        item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    }

    setCount(count + 1);

    // Add animation duration
    setTimeout(() => setIsAdding(false), 500);
  };

  const cartItem = cart.find((item) => item.id === data.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  return (
    <div className="w-full max-w-xs bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-[500px] overflow-hidden relative">

      {/* Image Container */}
      <div className="h-64 w-full flex items-center justify-center bg-gray-100 p-4 relative">
        <img
          src={data.image}
          alt={data.title}
          className="object-contain max-h-full max-w-full hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[48px]">
            {data.title}
          </h3>
          <p className="text-xl font-bold text-gray-900 mb-4">${data.price.toFixed(2)}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <Link to={`/products/${data.id}`} className="flex-1">
            <button className="w-full border border-gray-300 bg-white text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              View Details
            </button>
          </Link>

          <button
            onClick={Click}
            disabled={isAdding}
            className={`flex-1 py-2 px-3 rounded-lg transition-all duration-300 font-medium ${
              isAdding
                ? 'bg-green-500 text-white scale-95 cursor-not-allowed'
                : quantityInCart > 0
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } ${isAdding ? 'animate-pulse' : ''}`}
          >
            {isAdding ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding...
              </span>
            ) : quantityInCart > 0 ? (
              `Add More (${quantityInCart})`
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>

      {/* Floating Animation Particles */}
      {isAdding && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${50 + (Math.random() - 0.5) * 100}%`,
                top: `${50 + (Math.random() - 0.5) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="w-2 h-2 bg-green-400 rounded-full animate-ping"
                style={{
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1s'
                }}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProductCard;
