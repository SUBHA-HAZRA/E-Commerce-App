import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CounterContext } from "../Context/Counter";

const ProductDetails = () => {
  const counterState = useContext(CounterContext);
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  // Add to Cart function with animations
  const handleAddToCart = () => {
    const currentCart = counterState.cart;
    const setCart = counterState.setCart;
    const setCount = counterState.setCount;
    const existingItem = currentCart.find((item) => item.id === details.id);

    if (existingItem) {
      const updatedCart = currentCart.map((item) =>
        item.id === details.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      const productWithQty = { ...details, quantity: 1 };
      setCart([...currentCart, productWithQty]);
    }

    setCount(counterState.count + 1);
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 800);
  };

  // Fetch product from API
  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setDetails(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    getProductData();
  }, [id]);

  const cartItem = counterState.cart.find((item) => item.id === details.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const discountedPrice = details.price
    ? (details.price - (25 / 100) * details.price).toFixed(2)
    : null;

  if (!details.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Product Image */}
        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden relative">
          {details.image ? (
            <img
              src={details.image}
              alt={details.title}
              className="object-contain w-full max-h-[400px] hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-500">Loading image...</p>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="relative">
          <div className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full w-fit mb-2">
            {details.category || "Unknown Category"}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {details.title || "Loading..."}
          </h1>

          {details.rating && (
            <p className="text-yellow-600 font-medium mb-2">
              ⭐ {details.rating.rate} / 5 ({details.rating.count} ratings)
            </p>
          )}

          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl font-bold text-gray-900">
              ${details.price?.toFixed(2)}
            </span>
            <span className="line-through text-gray-400 text-lg">
              ${discountedPrice}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <p className="text-green-600 font-medium">In Stock</p>
            {quantityInCart > 0 && (
              <p className="text-blue-600 font-medium">
                {quantityInCart} in cart
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{details.description || "No description available."}</p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || !details.id}
            className={`w-full text-lg font-medium py-3 rounded-md transition-all duration-300 ${
              isAdding
                ? 'bg-green-500 text-white scale-95 cursor-not-allowed'
                : quantityInCart > 0
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } ${isAdding ? 'animate-pulse' : ''}`}
          >
            {isAdding ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding to Cart...
              </span>
            ) : quantityInCart > 0 ? (
              `Add More to Cart (${quantityInCart})`
            ) : (
              'Add to Cart'
            )}
          </button>

          {/* Floating Animation Particles */}
          {isAdding && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="w-3 h-3 bg-green-400 rounded-full animate-ping"
                    style={{
                      animationDelay: `${i * 150}ms`,
                      animationDuration: '1.5s'
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
