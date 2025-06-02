import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ThankYouPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <p>Loading order...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>✅ Thank you for your purchase!</h1>
      <p><strong>Order Number:</strong> {order._id}</p>

      <h2>🛒 Order Summary</h2>
      <ul>
        <li><strong>Product:</strong> {order.productName}</li>
        <li><strong>Variant:</strong> {order.variant}</li>
        <li><strong>Quantity:</strong> {order.quantity}</li>
        <li><strong>Total Price:</strong> ${order.price * order.quantity}</li>
      </ul>

      <h2>👤 Customer Information</h2>
      <ul>
        <li><strong>Full Name:</strong> {order.fullName}</li>
        <li><strong>Email:</strong> {order.email}</li>
        <li><strong>Phone:</strong> {order.phone}</li>
        <li><strong>Address:</strong> {order.address}, {order.city}, {order.state} {order.zip}, {order.country}</li>
      </ul>

      <h3 style={{ marginTop: "2rem" }}>We’ve emailed you a confirmation. Have a great day!</h3>
    </div>
  );
};

export default ThankYouPage;