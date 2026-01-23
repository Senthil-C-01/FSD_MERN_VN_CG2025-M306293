import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Snavbar.css";

const Snavbar = () => {
  const navigate = useNavigate();
  const [sellerName, setSellerName] = useState("Seller");

  // useEffect(() => {
  //   const token = localStorage.getItem("sellerToken");

  //   if (!token) return;

  //   axios
  //     .get("http://localhost:5000/api/seller/profile", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setSellerName(res.data.name);
  //     })
  //     .catch((err) => {
  //       console.log("Auth error", err);
  //     });
  // }, []);

  useEffect(() => {
  const token = localStorage.getItem("token");

  console.log("SELLER TOKEN 👉", token); // 🔴 ADD THIS

  if (!token) return;

  axios
    .get("http://localhost:8000/api/seller/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log("PROFILE RESPONSE 👉", res.data); // 🔴 ADD THIS
      setSellerName(res.data.name);
    })
    .catch((err) => {
      console.log("PROFILE ERROR 👉", err.response || err);
    });
}, []);


  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    navigate("/login");
  };

  return (
    <div className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <h2>Bookstore Seller</h2>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Link to="/seller/Shome">Dashboard</Link>
        <Link to="/seller/add-book">Add Book</Link>
        <Link to="/seller/products">My Products</Link>
        <Link to="/seller/orders">Orders</Link>

        <span className="user-name">Hi, {sellerName}</span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Snavbar;
