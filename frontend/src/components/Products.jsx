import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductItems from "./ProductItems";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center m-5" style={{ color: "#1F2937" }}>
        Featured Products
      </h1>
      <div className="d-flex flex-wrap justify-content-evenly gap-4">
        {products.map((product, index) => (
          <div style={{ flex: "0 1 300px" }} key={index}>
            <ProductItems {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
