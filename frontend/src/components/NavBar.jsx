import React from "react";
import logo from "../assets/hunarHaath-logo.png";
import hunarHaath from "../assets/hunarHaath.png";
import search from "../assets/search.svg";

export default function NavBar() {
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg"
        style={{ backgroundColor: "#FDF5E6", color: "#1F2937" }}
      >
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img
              src={logo}
              alt="Logo"
              width="55"
              height="55"
              class="d-inline-block align-text-top"
            />
          </a>
          <a class="navbar-brand" href="/">
            <img
              src={hunarHaath}
              alt="hunarHaath"
              height="30"
              class="d-inline-block align-text-top"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Shop
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Become a seller
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Contact
                </a>
              </li>
            </ul>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2 rounded-pill"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn" type="submit">
                <img
                  src={search}
                  alt="search"
                  height="30"
                  className="d-inline-block align-text-top"
                />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
