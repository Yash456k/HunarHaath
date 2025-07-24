import React from "react";

export default function Login() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#FFF8F0" }}
    >
      <div
        className="card shadow p-5 rounded-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center fw-bold mb-4" style={{ color: "#D97706" }}>
          Login to HunarHaath
        </h3>
        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white rounded-pill fw-semibold"
            style={{ backgroundColor: "#D97706", border: "none" }}
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-center text-muted small">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-decoration-none text-dark fw-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
