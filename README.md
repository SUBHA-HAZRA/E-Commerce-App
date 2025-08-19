# 🛍️ E‑Commerce App

A modern React + Vite storefront with product browsing, search, product detail pages, a shopping cart, and a simple checkout confirmation. Styled with Tailwind CSS and navigated via React Router.

Live site : https://e-commerce-app-peach-omega.vercel.app/

## ✨ Features
- Product listing grid and individual product details
- Search results page for quick discovery
- Add/remove/update items in cart with subtotal
- Checkout confirmation screen
- Responsive UI, accessible components
- Icons via lucide-react and React Icons

## 🧰 Tech Stack
- React 19, React DOM 19
- React Router DOM 7
- Vite 7
- Tailwind CSS 4 (+ @tailwindcss/vite)
- lucide-react, React Icons
- ESLint 9

## 📁 Project Structure
```
src/
├─ assets/
│  └─ react.svg
├─ Components/
│  ├─ Cartitems.jsx          # List of cart items / quantity controls
│  ├─ Footer.jsx
│  ├─ Navbar.jsx             # Navigation + cart badge
│  └─ ProductCard.jsx        # Product preview card
├─ Context/
│  └─ Counter.jsx            # App context (e.g., cart/quantity or shared state)
├─ layout/                   # Layout wrappers (if used)
├─ Pages/
│  ├─ Cart.jsx               # Cart page
│  ├─ CheckoutConfirmation.jsx
│  ├─ Home.jsx               # Hero/featured + categories
│  ├─ ProductDetails.jsx     # Single product page
│  ├─ Products.jsx           # Product grid/catalog
│  └─ SearchResults.jsx      # Search results page
├─ App.css
├─ App.jsx                   # Routes
├─ index.css                 # Tailwind base styles
└─ main.jsx                  # App entry
```
## 🛒 State & Data
- Cart operations handled via context (see src/Context/Counter.jsx) or local state.
- Persist cart to localStorage for a better UX (optional).
- Utility helpers recommended for price formatting and totals.

