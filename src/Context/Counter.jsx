// src/Context/Counter.jsx
import { createContext, useState, useEffect } from "react";

export const CounterContext = createContext(null);

export const CounterProvaider = ({ children }) => {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("count");
    return savedCount ? parseInt(savedCount) : 0;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("count", count.toString());
  }, [cart, count]);

  return (
    <CounterContext.Provider value={{ count, setCount, cart, setCart }}>
      {children}
    </CounterContext.Provider>
  );
};
