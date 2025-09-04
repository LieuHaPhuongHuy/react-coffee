import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider";
import "./styles/index.css";
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
     // <React.StrictMode>
     <ContextProvider>
          <BrowserRouter >
               <App />
          </BrowserRouter>
     </ContextProvider>
     // </React.StrictMode>
);
