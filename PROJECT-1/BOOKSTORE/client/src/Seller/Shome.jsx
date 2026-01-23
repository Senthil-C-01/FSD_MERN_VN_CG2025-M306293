import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Snavbar from "./Snavbar";
import "./Shome.css";

const Shome = () => {
  const [sellerName, setSellerName] = useState("Guest");
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setSellerName(user.name);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/seller/dashboard-stats",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setStats(res.data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="shome">
      <Snavbar />

      <div className="seller-welcome">
        <h2>Welcome back, {sellerName} 👋</h2>
        <p>Manage your books, track orders, and grow your sales</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p>{stats.totalBooks}</p>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{stats.totalRevenue}</p>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/seller/add-book" className="action-btn">➕ Add New Book</Link>
          <Link to="/seller/products" className="action-btn">📚 My Products</Link>
          <Link to="/seller/orders" className="action-btn">📦 View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default Shome;
