import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import BecomeSeller from "./components/BecomeSeller";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UploadProduct from "./components/UploadProduct";
import Cart from "./components/Cart";
import SellerDashboard from "./components/SellerDashboard";
import Profile from "./components/Profile";
import EditProduct from "./components/EditProduct";
import CustomOrderPage from "./components/CustomOrderPage";
import UserOrders from "./components/UserOrders";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";

export const AuthContext = createContext();

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <NavBar />
          <div style={{ paddingTop: "80px" }}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/become-seller" element={<BecomeSeller />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/upload-product" element={<UploadProduct/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/seller-dashboard" element={<SellerDashboard />} />
              <Route path="/edit-product/:productId" element={<EditProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/custom-order" element={<CustomOrderPage />} />
              <Route path="/orders" element={<UserOrders />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
