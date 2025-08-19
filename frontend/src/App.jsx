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

export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  // On first load, check localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      // Ideally you'd decode it or fetch user data, but for now just mark user as logged in
      setUser({ token, ...user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
