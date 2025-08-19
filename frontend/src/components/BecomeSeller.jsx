import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

export default function BecomeSeller() {
  const [isSeller, setIsSeller] = useState(false);
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    shopName: "",
  });
  const {User,setUser} = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.isSeller) {
      setIsSeller(user.isSeller);
      setUser(user)
    }
    
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        fullName: user.name || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token"); // assuming you store token here

  try {
    const res = await fetch("http://localhost:4000/api/auth/become-seller", {
      method: "POST",
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

    // ✅ Success: show message returned from backend
    alert(data.message); // shows "User is now a seller"
    setIsSeller(true);
    navigate("/"); // Redirect to shop page after becoming a seller
  } catch (err) {
    console.error("Become seller error:", err);

  }
};

{if(isSeller) 
  return ( <p>You are now a seller!</p>)
  else 
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
 
}
