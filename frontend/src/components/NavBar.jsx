import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import logo from "../assets/hunarHaath-logo.png";
import hunarHaath from "../assets/hunarHaath.png";
import search from "../assets/search.svg";

export default function NavBar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo"
            width="55"
            height="55"
            className="d-inline-block align-text-top"
          />
        </Link>
        <Link className="navbar-brand" to="/">
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
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                Shop
              </Link>
            </li>
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
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>

          

          <div className="d-flex ms-lg-3">
            {user ? (
              <button
                className="btn"
                onClick={handleLogout}
                style={{
                  backgroundColor: "#DC2626",
                  color: "#FDF5E6",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  fontWeight: "500",
                }}
              >
                Logout
              </button>
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
