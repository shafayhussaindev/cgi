// This is the starting point of the website.
// It loads the global styles and puts the App inside the page's <div id="root">.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// All the website's styles are in this one file
import "./index.css";

// BrowserRouter lets us have separate pages like /contact and /the-shift
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
