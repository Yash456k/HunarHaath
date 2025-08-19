import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { API_BASE_URL } from "../config";

export default function BecomeSeller() {
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shopName: "",
  });

  useEffect(() => {
    if (user?.isSeller) {
      setIsSeller(true);
    }
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        fullName: user.name || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = user?.token;

  try {
    const res = await fetch(`${API_BASE_URL}/api/users/become-seller`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      // Backend responded with error status
      alert(data.message || "Something went wrong");
      return;
    }

    // ✅ Success: update context and notify
    updateUser({ isSeller: true });
    alert("Your account is now a seller account.");
    setIsSeller(true);
    navigate("/seller-dashboard");
  } catch (err) {
    console.error("Become seller error:", err);

  }
};

  if (isSeller) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h2 className="mb-3">You are now a seller!</h2>
            <a href="/seller-dashboard" className="btn btn-dark">Go to Seller Dashboard</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#FFF8F0",
        minHeight: "100vh",
        padding: "40px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <h2 className="mb-4" style={{ textAlign: "center", color: "#333" }}>
          Become a Seller
        </h2>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Shop Name</label>
          <input
            type="text"
            className="form-control"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            placeholder="Enter your shop name"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          style={{
            backgroundColor: "#333",
            borderColor: "#333",
          }}
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
