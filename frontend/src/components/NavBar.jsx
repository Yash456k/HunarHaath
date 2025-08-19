import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import logo from "../assets/hunarHaath-logo.png";
import hunarHaath from "../assets/hunarHaath.png";
import search from "../assets/search.svg";

export default function NavBar() {
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg z-1 position-fixed"
      style={{
        width: "100%",
        backgroundColor: "#FDF5E6",
        color: "#1F2937",
        fontSize: "20px",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand me-2" to="/">
          <img
            src={logo}
            alt="Logo"
            width="55"
            height="55"
            className="d-inline-block align-text-top"
          />
        </Link>
        <Link className="navbar-brand me-3" to="/">
          <img
            src={hunarHaath}
            alt="hunarHaath"
            height="30"
            className="d-inline-block align-text-top"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {!user?.isSeller && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">Shop</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/custom-order">Custom Order</Link>
                </li>
              </>
            )}
{user?.isSeller ? (
  <li className="nav-item">
    <Link className="nav-link" to="/upload-product">
      Upload Products
    </Link>
  </li>
) : (
  <li className="nav-item">
    <Link className="nav-link" to="/become-seller">
      Become a seller
    </Link>
  </li>
)}

            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Cart Icon (hidden for sellers) */}
          {!user?.isSeller && (
            <div className="d-flex align-items-center me-3">
              <Link to="/cart" className="position-relative">
                <i className="fas fa-shopping-cart fs-5" style={{ color: "#1F2937" }}></i>
                {getCartItemCount() > 0 && (
                  <span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{ backgroundColor: "#DC2626", fontSize: "0.7rem" }}
                  >
                    {getCartItemCount()}
                  </span>
                )}
              </Link>
            </div>
          )}

          <div className="d-flex ms-lg-3 align-items-center">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    backgroundColor: "#DC2626",
                    color: "#FDF5E6",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    fontWeight: "500",
                  }}
                >
                  {user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown" style={{ 
                  backgroundColor: "#FDF5E6", 
                  border: "1px solid #DC2626",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}>
                  <li>
                    <Link 
                      className="dropdown-item" 
                      to="/profile"
                      style={{ 
                        color: "#1F2937",
                        padding: "10px 20px",
                        borderBottom: "1px solid #e5e7eb"
                      }}
                                              onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#DC2626";
                          e.target.style.color = "#FDF5E6";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#1F2937";
                        }}
                    >
                      <i className="fas fa-user me-2"></i>Profile
                    </Link>
                  </li>
                  {user.isSeller && (
                    <li>
                      <Link 
                        className="dropdown-item" 
                        to="/seller-dashboard"
                        style={{ 
                          color: "#1F2937",
                          padding: "10px 20px",
                          borderBottom: "1px solid #e5e7eb"
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#DC2626";
                          e.target.style.color = "#FDF5E6";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#1F2937";
                        }}
                      >
                        <i className="fas fa-store me-2"></i>Seller Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <hr className="dropdown-divider" style={{ margin: "5px 0", borderColor: "#e5e7eb" }} />
                  </li>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                      style={{ 
                        color: "#1F2937",
                        padding: "10px 20px",
                        border: "none",
                        background: "transparent",
                        width: "100%",
                        textAlign: "left"
                      }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = "#DC2626";
                        e.target.style.color = "#FDF5E6";
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#1F2937";
                      }}
                    >
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button
                    className="btn me-2"
                    style={{
                      backgroundColor: "#DC2626",
                      color: "#FDF5E6",
                      borderRadius: "20px",
                      padding: "5px 15px",
                      fontWeight: "500",
                    }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#DC2626",
                      color: "#FDF5E6",
                      borderRadius: "20px",
                      padding: "5px 15px",
                      fontWeight: "500",
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
