import React from "react";

export default function Signup() {
  return (
    <div
      className=" d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#FFF8F0" }}
    >
      <div
        className="card shadow p-5 rounded-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center fw-bold mb-4" style={{ color: "#D97706" }}>
          Create Your Account
        </h3>
        <form>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Create password"
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white rounded-pill fw-semibold"
            style={{ backgroundColor: "#D97706", border: "none" }}
          >
            Sign Up
          </button>
        </form>
        <p className="mt-3 text-center text-muted small">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-decoration-none text-dark fw-semibold"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
