import React, { useContext, useState } from "react";
import { CounterContext } from "../Context/Counter";
import CartItems from "../Components/Cartitems";
import CheckoutConfirmation from "./CheckoutConfirmation";

const Cart = () => {
  const { count, cart } = useContext(CounterContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const currentCart = cart;

  // 🔢 Calculate subtotal and shipping
  const subtotal = currentCart.reduce((acc, item) => {
    const quantity = item.quantity || 1;
    return acc + item.price * quantity;
  }, 0);

  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;

  // Handle checkout
  const handleProceedToCheckout = () => {
    if (currentCart.length > 0) {
      setShowCheckout(true);
    }
  };

  // Handle navigation back to cart
  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  // If showing checkout confirmation, render that instead
  if (showCheckout) {
    return (
      <CheckoutConfirmation 
        orderData={{
          subtotal,
          shipping,
          total,
          itemCount: count,
          items: currentCart
        }}
        onContinueShopping={() => window.location.href = '/'}
        onViewCart={handleBackToCart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 🛒 Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {currentCart.length === 0 ? (
              <p className="text-gray-600 text-lg">Your cart is empty.</p>
            ) : (
              currentCart.map((item) => (
                <CartItems key={item.id} data={item} />
              ))
            )}
          </div>

          {/* 📦 Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>

            <div className="flex justify-between mb-2 text-gray-700">
              <span>Subtotal ({count} items):</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-700">
              <span>Shipping:</span>
              <span className="font-medium">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <hr className="border-gray-300 mb-4" />

            <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Updated checkout button */}
            <button 
              onClick={handleProceedToCheckout}
              disabled={currentCart.length === 0}
              className={`w-full py-3 rounded-md transition duration-200 ${
                currentCart.length === 0 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Proceed to Checkout
            </button>

            <p className="text-sm text-center text-gray-500 mt-3">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;