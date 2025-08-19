import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white text-center">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">ModernStore</span>
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-lg mb-8">
          Discover amazing products at unbeatable prices. Shop the latest trends and timeless classics.
        </p>
        <Link to="/products">
          <button className="bg-black text-white px-6 py-3 text-sm rounded hover:bg-gray-800 transition">
            Shop Now
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Feature 1 */}
          <div>
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              🚚
            </div>
            <h3 className="font-semibold text-lg mb-1">Free Shipping</h3>
            <p className="text-gray-600 text-sm">Free shipping on orders over $50</p>
          </div>

          {/* Feature 2 */}
          <div>
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              🔒
            </div>
            <h3 className="font-semibold text-lg mb-1">Secure Payment</h3>
            <p className="text-gray-600 text-sm">Your payment information is safe</p>
          </div>

          {/* Feature 3 */}
          <div>
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
              🔄
            </div>
            <h3 className="font-semibold text-lg mb-1">Easy Returns</h3>
            <p className="text-gray-600 text-sm">30-day return policy</p>
          </div>
        </div>
      </section>
    </div>
  );
}
