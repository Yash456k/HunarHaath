import React from "react";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

export default function ProductItems({ _id, title, price, image, description }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    addToCart({ _id, title, price, image, description });
  };

  return (
    <div
      className="card h-100 border border-dark-subtle"
      style={{ width: "100%", backgroundColor: "#faf7f1ff" }}
    >
      <img
        src={image}
        className="card-img-top img-fluid"
        alt={title}
        style={{ height: "350px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <strong>
            <h5 className="card-title my-2">{title}</h5>
          </strong>
          <h6 className="card-text my-3">${price}</h6>
          <p className="card-text my-4">{description}</p>
        </div>
        {!user?.isSeller && (
          <button
            onClick={handleAddToCart}
            className="btn"
            style={{ backgroundColor: "#DC2626", color: "#FDF5E6" }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
