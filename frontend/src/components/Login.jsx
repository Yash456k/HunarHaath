import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { API_BASE_URL } from "../config";




export default function Login() {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate()

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/login`, formData);
    // Persist login to sessionStorage to isolate per tab
    login(res.data, res.data.token, { persist: 'session' });
    navigate("/"); // Redirect to home page after successful login
    console.log("Login successful:", res.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Login failed");
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#FFF8F0" }}>
      <div className="card shadow p-5 rounded-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center fw-bold mb-4" style={{ color: "#D97706" }}>
          Login to HunarHaath
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control rounded-pill" placeholder="Enter email" required />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control rounded-pill" placeholder="Enter password" required />
          </div>
          <button type="submit" className="btn w-100 text-white rounded-pill fw-semibold" style={{ backgroundColor: "#D97706", border: "none" }}>
            Login
          </button>
        </form>
        <p className="mt-3 text-center text-muted small">
          Don't have an account?{" "}
          <a href="/signup" className="text-decoration-none text-dark fw-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
