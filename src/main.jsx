import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext.jsx";

import { SearchProvider } from "./context/SearchContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ThemeProvider>
    <SearchProvider>
    <App />
    </SearchProvider>
  </ThemeProvider>
  </BrowserRouter>
);
