import React, { useEffect, useState } from "react";
import axios from "axios";
import Anavbar from "./Anavbar";
import Footer from "../Components/Footer";
import "./Ahome.css";

const Ahome = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/dashboard-stats");

        setStats([
          { title: "Total Users", value: res.data.totalUsers },
          { title: "Total Sellers", value: res.data.totalSellers },
          { title: "Total Books", value: res.data.totalBooks },
          // { title: "Orders Today", value: res.data.ordersToday }
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  const [adminName, setUserName] = useState("Guest");
      
        // Get logged-in user info from localStorage
        useEffect(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user && user.name) {
            setUserName(user.name);
          }
        }, []);

  return (
    <div>
      <Anavbar />

      <div className="hero">
        <h1>Welcome, {adminName}!</h1>
        <p>Manage users, sellers, books, and monitor store activity.</p>
      </div>

      <div className="section">
        <h2>Quick Stats</h2>
        <div className="card-container">
          {stats.map((stat, index) => (
            <div key={index} className="card">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <a href="/admin/items" className="view-books-btn">View Books</a>
          <a href="/admin/users" className="view-books-btn">Manage Users</a>
          <a href="/admin/sellers" className="view-books-btn">Manage Sellers</a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Ahome;
