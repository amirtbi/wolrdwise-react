import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
