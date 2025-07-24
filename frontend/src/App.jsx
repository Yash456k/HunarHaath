import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Shop from "./components/Shop";
import BecomeSeller from "./components/BecomeSeller";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
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
          </Routes>
        </div>
      </Router>
      {/* <NavBar /> 
      <Hero />
      <Products />
      <Contact />*/}
    </>
  );
}

export default App;
