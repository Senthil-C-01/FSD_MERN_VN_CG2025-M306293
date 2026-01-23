import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Anavbar.css";

const Anavbar = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:8000/api/admin/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("ADMIN PROFILE 👉", res.data);
        setAdminName(res.data.name || "Admin");
      })
      .catch((err) => {
        console.log("ADMIN PROFILE ERROR 👉", err.response || err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>Bookstore Admin</h2>
      </div>

      <div className="nav-right">
        <Link to="/admin/Ahome">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/sellers">Sellers</Link>
        <Link to="/admin/items">Books</Link>

        <span className="user-name">Hi, {adminName}</span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Anavbar;
