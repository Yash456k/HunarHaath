import React from "react";
import heroImg from "../assets/hero-bg.png";
import Products from "./Products";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <div className="card text-bg-dark ">
        <img src={heroImg} className="card-img" alt="..." />
        <div
          className="card-img-overlay text-center d-flex flex-column justify-content-center align-items-center"
          style={{ color: "#FDF5E6" }}
        >
          <h1 className="card-title">Empowering</h1>
          <h1 className="card-text">Local Artisans</h1>
          <button
            className="btn my-3 btn-lg"
            style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}
            onClick={() => navigate("/shop")}
          >
            Shop Now
          </button>
        </div>
      </div>
      <Products />
      <Footer />
    </>
  );
}
