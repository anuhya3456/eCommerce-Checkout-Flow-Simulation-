import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import productList from "../data/productList";

const LandingPage = () => {
  const navigate = useNavigate();

  const [quantityMap, setQuantityMap] = useState({});
  const [variantMap, setVariantMap] = useState({});

  const handleBuyNow = (product) => {
    const quantity = quantityMap[product.id] || 1;
    const variant = variantMap[product.id] || product.variants[0];
    navigate("/checkout", { state: { ...product, quantity, variant } });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "1.5rem" }}>Choose Your Shoes</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {productList.map((product) => (
          <div key={product.id} style={{
            border: "1px solid #ccc",
            padding: "1rem",
            width: "250px",
            borderRadius: "8px"
          }}>
            <img
              src={product.image}
              alt={product.name}
              width="100%"
              height="150"
              style={{ objectFit: "cover", borderRadius: "4px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/300x150?text=No+Image";
              }}
            />
            <h2 style={{ fontSize: "1.2rem" }}>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <div>
              <label>Variant: </label>
              <select
                value={variantMap[product.id] || product.variants[0]}
                onChange={(e) => setVariantMap({ ...variantMap, [product.id]: e.target.value })}
              >
                {product.variants.map((variant) => (
                  <option key={variant} value={variant}>{variant}</option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: "0.5rem" }}>
              <label>Quantity: </label>
              <input
                type="number"
                min="1"
                value={quantityMap[product.id] || 1}
                onChange={(e) => setQuantityMap({ ...quantityMap, [product.id]: e.target.value })}
                style={{ width: "50px" }}
              />
            </div>
            <button onClick={() => handleBuyNow(product)} style={{
              marginTop: "0.8rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;