import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navigate = useNavigate()

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:4000/api/auth/signup", formData);
    const { token, user } = res.data;

    // Save token to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(res.data)); // Store user info

   navigate("/"); // Redirect to home page after successful signup    


  } catch (err) {
    console.error(err.response?.data || err.message);
    alert(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#FFF8F0" }}>
      <div className="card shadow p-5 rounded-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center fw-bold mb-4" style={{ color: "#D97706" }}>
          Create Your Account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control rounded-pill" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control rounded-pill" placeholder="Enter email" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control rounded-pill" placeholder="Create password" required />
          </div>
          <button type="submit" className="btn w-100 text-white rounded-pill fw-semibold" style={{ backgroundColor: "#D97706", border: "none" }}>
            Sign Up
          </button>
        </form>
        <p className="mt-3 text-center text-muted small">
          Already have an account?{" "}
          <a href="/login" className="text-decoration-none text-dark fw-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
