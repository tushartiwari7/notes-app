import React from "react";
import ReactDOM from "react-dom";
import "./utils/utilities.css";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/Context";
// Call make Server
makeServer();
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
