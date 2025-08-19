import { useState } from "react";
import { BsCart2, BsSearch, BsX, BsList } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CounterContext } from "../Context/Counter";

export default function Navbar() {
  const counterState = useContext(CounterContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchOpen(false);
      setMenuOpen(false);
       setQuery("");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <div className="text-2xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                ModernStore
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 justify-center px-8 max-w-2xl">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-300 focus-within:border-blue-500 focus-within:shadow-md transition-all duration-300">
                  <BsSearch className="absolute left-4 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for amazing products..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 w-full outline-none text-sm text-gray-700 placeholder-gray-500 bg-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 transform active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Home
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Products
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                    )}
                  </>
                )}
              </NavLink>

              {/* Cart Icon with Enhanced Badge */}
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative group p-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                <BsCart2 className="w-6 h-6" />
                {counterState.count > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
                    {counterState.count > 99 ? '99+' : counterState.count}
                  </span>
                )}
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Cart ({counterState.count})
                </span>
              </NavLink>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center space-x-2">
              {/* Mobile Search Button */}
              <button
                onClick={toggleSearch}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <BsSearch className="w-5 h-5" />
              </button>

              {/* Mobile Cart */}
              <NavLink
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                <BsCart2 className="w-6 h-6" />
                {counterState.count > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white animate-pulse">
                    {counterState.count > 99 ? '99+' : counterState.count}
                  </span>
                )}
              </NavLink>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
              >
                {menuOpen ? <BsX className="w-6 h-6" /> : <BsList className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 shadow-lg">
            <form onSubmit={handleSearch}>
              <div className="relative flex items-center bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-all duration-200">
                <BsSearch className="absolute left-3 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full outline-none text-sm text-gray-700 placeholder-gray-500 bg-transparent"
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-3 text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-200"
                >
                  Go
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="px-4 py-4 space-y-1">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                🏠 Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                📦 Products
              </NavLink>

              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                <span className="flex items-center">
                  🛒 Cart
                </span>
                {counterState.count > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {counterState.count}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {(menuOpen || searchOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => {
            setMenuOpen(false);
            setSearchOpen(false);
          }}
        />
      )}
    </>
  );
}