// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { CartProvider } from "./pages/CartContext";
// import { FetchedAsync } from "./pages/FetchedAsync";
// import { Cart } from "./pages/Cart";
// import { BuyNow } from "./pages/BuyNow";
// import { Login } from "./pages/Login";
// import { Signup } from "./pages/Signup";
// import { Navbar } from "./components/Navbar";

// function App() {
//   return (
//     <CartProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<FetchedAsync />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/BuyNow" element={<BuyNow />} />

//           {/* Auth Routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />

//         </Routes>
//       </BrowserRouter>
//     </CartProvider>
//   );
// }

// // export default App