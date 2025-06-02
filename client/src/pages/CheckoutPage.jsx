import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { state: product } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { cardNumber, expiry, cvv, email, phone } = form;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return alert("Enter a valid email address.");
    }

    if (!/^\d{10}$/.test(phone)) {
      return alert("Phone number must be exactly 10 digits.");
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      return alert("Card number must be exactly 16 digits.");
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return alert("Expiry must be in MM/YY format.");
    }

    const [expMonth, expYear] = expiry.split("/").map(Number);
    const now = new Date();
    const expiryDate = new Date(2000 + expYear, expMonth - 1);
    if (expiryDate < now) {
      return alert("Card expiry date must be in the future.");
    }

    if (!/^\d{3}$/.test(cvv)) {
      return alert("CVV must be exactly 3 digits.");
    }

    // Simulate transaction outcome
    const random = Math.random();
    if (random < 0.7) {
      // Approved
      const payload = {
        ...form,
        productName: product.name,
        variant: product.variant,
        quantity: product.quantity,
        price: product.price
      };

      try {
        const res = await axios.post("http://localhost:5000/api/orders", payload);
        navigate(`/thank-you/${res.data._id}`);
      } catch (err) {
        alert("Gateway Error: Failed to submit order.");
      }
    } else if (random < 0.9) {
      // Declined
      alert("Transaction Declined. Please use a different card.");
    } else {
      // Gateway failure
      alert("Gateway Error: Please try again later.");
    }
  };

  const subtotal = product.quantity * product.price;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Checkout</h1>

      <h3>Order Summary</h3>
      <ul>
        <li><strong>Product:</strong> {product.name}</li>
        <li><strong>Variant:</strong> {product.variant}</li>
        <li><strong>Quantity:</strong> {product.quantity}</li>
        <li><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</li>
      </ul>

      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required /><br />

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required /><br />

        <label>Phone Number:</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} required /><br />

        <label>Address:</label>
        <input type="text" name="address" value={form.address} onChange={handleChange} required /><br />

        <label>City:</label>
        <input type="text" name="city" value={form.city} onChange={handleChange} required /><br />

        <label>State:</label>
        <input type="text" name="state" value={form.state} onChange={handleChange} required /><br />

        <label>ZIP Code:</label>
        <input type="text" name="zip" value={form.zip} onChange={handleChange} required /><br />

        <label>Card Number:</label>
        <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} required /><br />

        <label>Expiry (MM/YY):</label>
        <input type="text" name="expiry" value={form.expiry} onChange={handleChange} required /><br />

        <label>CVV:</label>
        <input type="text" name="cvv" value={form.cvv} onChange={handleChange} required /><br />

        <button type="submit" style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "4px" }}>
          Confirm Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
