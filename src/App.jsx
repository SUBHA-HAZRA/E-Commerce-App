import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import CheckoutConfirmation from "./Pages/CheckoutConfirmation";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Navbar />

      <ScrollToTop/>

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/confirmation" element={<CheckoutConfirmation />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
