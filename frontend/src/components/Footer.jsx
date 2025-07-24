import React from "react";
import logo from "../assets/hunarHaath-logo.png";

export default function Footer() {
  return (
    <footer
      className="mt-5 text-white"
      style={{
        backgroundColor: "#1F2937",
        paddingTop: "3rem",
        paddingBottom: "2rem",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-md-4">
            <div
              className="d-flex align-items-center mb-3"
              style={{ color: "#FDF5E6" }}
            >
              <img
                src={logo}
                alt="logo"
                style={{ height: "40px", width: "auto", marginRight: "10px" }}
              />
              <h4 className="fw-bold mb-0">HunarHaath</h4>
            </div>

            <p className="text-light small" style={{ color: "#E5E7EB" }}>
              Empowering India’s artisans to take their handmade crafts to
              global customers. A 0% commission platform to celebrate your
              skill.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-light fs-5"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-light fs-5"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="text-light fs-5"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3" style={{ color: "#FDF5E6" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled text-light small">
              <li className="mb-2">
                <a href="/" className="text-decoration-none text-light">
                  🏠 Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/shop" className="text-decoration-none text-light">
                  🛍️ Shop
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/become-seller"
                  className="text-decoration-none text-light"
                >
                  🧵 Become a Seller
                </a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-decoration-none text-light">
                  📞 Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info + Newsletter */}
          <div className="col-md-4">
            <h5 className="fw-semibold mb-3" style={{ color: "#FDF5E6" }}>
              Contact
            </h5>
            <p className="small text-light mb-1">
              <i className="bi bi-envelope me-2"></i> support@hunarhaath.in
            </p>
            <p className="small text-light mb-1">
              <i className="bi bi-telephone me-2"></i> +91 98765 43210
            </p>
            <p className="small text-light mb-3">
              <i className="bi bi-geo-alt me-2"></i> Ahmedabad, Gujarat
            </p>

            {/* Newsletter Input */}
            <label className="form-label text-light small">
              Get updates & offers
            </label>
            <div className="input-group">
              <input
                type="email"
                className="form-control rounded-start"
                placeholder="Your email"
              />
              <button
                className="btn text-white fw-semibold rounded-end"
                style={{ backgroundColor: "#D97706", border: "none" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr className="border-light mt-4" />

        <div className="container-fluid px-3">
          <p className="text-center text-light small mt-3 mb-0">
            &copy; {new Date().getFullYear()} <strong>HunarHaath</strong>.
            Crafted with ❤️ for Indian artisans.
          </p>
        </div>
      </div>
    </footer>
  );
}
