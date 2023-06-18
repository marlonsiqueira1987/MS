import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Importamos o Toastify

import Header from "./components/Header";
import Routes from "./routes";

import "react-toastify/dist/ReactToastify.css"; // O estilo do Toastify

function App() {
  return (
    <BrowserRouter>
      <ToastContainer autoClose={3000} />
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App