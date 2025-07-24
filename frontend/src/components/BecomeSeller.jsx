import React, { useState } from "react";

export default function BecomeSeller() {
  const [formData, setFormData] = useState({
    fullName: "",
    contact: "",
    email: "",
    shopName: "",
    region: "",
    bio: "",
    password: "",
    productImages: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "productImages" ? files : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Thank you! We'll review your profile shortly.");
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#FFF8F0" }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold text-uppercase" style={{ color: "#78350F" }}>
          🌿 Become a Seller on HunarHaath
        </h1>
        <p className="text-muted fs-5">
          Empower your craft. Sell with 0% commission. Reach a wider world.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(to bottom right, #ffffff, #fef6e0, #fff8f0)",
            }}
          >
            <div className="card-body p-5">
              <h4
                className="text-center fw-bold mb-4"
                style={{ color: "#D97706" }}
              >
                Seller Registration Form
              </h4>

              <form onSubmit={handleSubmit} className="row g-4">
                {/* Full Name */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Full Name *</label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-sm"
                    name="fullName"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Contact Number */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    className="form-control rounded-pill shadow-sm"
                    name="contact"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill shadow-sm"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                {/* Shop Name */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Shop Name (Optional)
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-sm"
                    name="shopName"
                    onChange={handleChange}
                  />
                </div>

                {/* Region */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Region / City *
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-sm"
                    name="region"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Product Images */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Upload Product Images
                  </label>
                  <input
                    type="file"
                    className="form-control rounded-pill shadow-sm"
                    name="productImages"
                    multiple
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>

                {/* Bio */}
                <div className="col-12">
                  <label className="form-label fw-semibold">Short Bio *</label>
                  <textarea
                    name="bio"
                    className="form-control rounded-4 shadow-sm"
                    rows="3"
                    placeholder="Tell us about your craft (1-2 lines)..."
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>

                {/* Password */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Set Password *
                  </label>
                  <input
                    type="password"
                    className="form-control rounded-pill shadow-sm"
                    name="password"
                    required
                    onChange={handleChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn w-100 py-3 fw-bold text-white rounded-pill"
                    style={{
                      background: "linear-gradient(to right, #D97706, #c45e00)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    🚀 Start Selling on HunarHaath
                  </button>
                </div>

                {/* Support */}
                <div className="text-center mt-3">
                  <small className="text-muted">
                    Need help?{" "}
                    <a
                      href="/contact"
                      className="fw-semibold text-decoration-none text-dark"
                    >
                      Contact Us
                    </a>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
