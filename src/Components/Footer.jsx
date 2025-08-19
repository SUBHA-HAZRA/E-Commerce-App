import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#283747] text-white py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-sm">
        
        {/* Links */}
        <div className="flex flex-wrap gap-6 mb-4 md:mb-0 font-medium">
          <Link to="/" className="text-gray-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/products" className="text-gray-400 hover:text-white transition-colors">
            Products
          </Link>
          <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
            Cart
          </Link>
          <Link to="#" className="text-gray-400 hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-center md:text-right">
           <span>© 2024 ModernStore. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
