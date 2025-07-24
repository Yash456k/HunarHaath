import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form:", formData);
    alert("Thank you for contacting HunarHaath! We’ll get back to you soon.");
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#FFF8F0" }}>
      <div className="text-center mb-5">
        <h1 className="fw-bold text-uppercase" style={{ color: "#78350F" }}>
          📬 Contact Us
        </h1>
        <p className="text-muted fs-5">
          We're here to help! Whether you're a customer or an artisan, reach out
          anytime.
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
                Send Us a Message
              </h4>

              <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Your Name *</label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-sm"
                    name="name"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Email *</label>
                  <input
                    type="email"
                    className="form-control rounded-pill shadow-sm"
                    name="email"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Subject *</label>
                  <input
                    type="text"
                    className="form-control rounded-pill shadow-sm"
                    name="subject"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Message *</label>
                  <textarea
                    name="message"
                    className="form-control rounded-4 shadow-sm"
                    rows="4"
                    placeholder="Type your message here..."
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    className="btn w-100 py-3 fw-bold text-white rounded-pill"
                    style={{
                      background: "linear-gradient(to right, #D97706, #c45e00)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    }}
                  >
                    ✉️ Submit Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-5">
            <h5 className="fw-semibold" style={{ color: "#78350F" }}>
              📞 Contact Details
            </h5>
            <p className="mb-1">Email: support@hunarhaath.in</p>
            <p className="mb-1">Phone: +91 98765 43210</p>
            <p>
              WhatsApp:{" "}
              <a
                href="https://wa.me/919876543210"
                className="text-decoration-none fw-bold"
                style={{ color: "#D97706" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat Now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
