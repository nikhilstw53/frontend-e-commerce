import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./pages/CartContext";
import { FetchedAsync } from "./pages/FetchedAsync";
import { Cart } from "./pages/Cart";
import { BuyNow } from "./pages/BuyNow";
import Auth from "./pages/Auth";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<FetchedAsync />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/BuyNow" element={<BuyNow />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
