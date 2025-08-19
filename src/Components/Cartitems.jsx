import React from "react";
import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { CounterContext } from "../Context/Counter";

const CartItems = ({ data }) => {
  const { count, setCount, cart, setCart } = useContext(CounterContext);

  const Increase = () => {
    const updatedCart = cart.map(item =>
      item.id === data.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    setCount(count + 1);
  };

  const Decrease = () => {
    if (data.quantity > 1) {
      const updatedCart = cart.map(item =>
        item.id === data.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
      setCount(count - 1);
    }
  };

  const RemoveItem = () => {
    setCount(count - data.quantity);
    const updatedCart = cart.filter(item => item.id !== data.id);
    setCart(updatedCart);
  };

  return (
    <>
      <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        {/* Mobile Layout (Stack Vertically) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Product Info */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
            {/* Image Container */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={data.image} 
                  alt={data.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/100x100/e5e7eb/9ca3af?text=No+Image';
                  }}
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base md:text-lg text-gray-800 line-clamp-2 leading-tight mb-1">
                {data.title}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <p className="text-lg sm:text-xl font-bold text-blue-600">
                  ${(data.price * data.quantity).toFixed(2)} 
                </p>
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 sm:gap-4">
            {/* Quantity Section */}
            <div className="flex items-center bg-gray-50 rounded-lg p-1">
              <button
                onClick={Decrease}
                disabled={data.quantity <= 1}
                className={`w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold transition-colors duration-200 ${
                  data.quantity <= 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm'
                }`}
              >
                −
              </button>
              
              <span className="mx-3 font-semibold text-lg min-w-[2rem] text-center">
                {data.quantity}
              </span>
              
              <button
                onClick={Increase}
                className="w-8 h-8 flex items-center justify-center rounded-md text-lg font-bold text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-sm transition-colors duration-200"
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={RemoveItem}
              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
              title="Remove item"
            >
              <FaTrashAlt className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;