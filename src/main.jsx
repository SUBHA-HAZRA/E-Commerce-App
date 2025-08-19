import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { CounterProvaider } from "./Context/Counter";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CounterProvaider>
      <App />
    </CounterProvaider>
  </BrowserRouter>
);
