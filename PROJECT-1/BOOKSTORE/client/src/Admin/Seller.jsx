import React, { useState, useEffect } from "react";
import axios from "axios";
import Anavbar from "./Anavbar";
import "./Seller.css";

const Seller = () => {
  const [sellers, setSellers] = useState([]);

  // 🔹 Fetch all sellers from backend
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/sellers");
        console.log("Sellers from DB:", res.data);
        setSellers(res.data);
      } catch (error) {
        console.error("Failed to fetch sellers", error);
      }
    };
    fetchSellers();
  }, []);

  // 🔹 Approve seller
  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8000/admin/sellers/${id}/approve`);
      setSellers((prev) =>
        prev.map((seller) => (seller._id === id ? res.data : seller))
      );
    } catch (error) {
      console.error("Failed to approve seller", error);
    }
  };

  // 🔹 Block seller
  const handleBlock = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8000/admin/sellers/${id}/block`);
      setSellers((prev) =>
        prev.map((seller) => (seller._id === id ? res.data : seller))
      );
    } catch (error) {
      console.error("Failed to block seller", error);
    }
  };

  // 🔹 View seller details
  const handleView = (id) => {
    const seller = sellers.find((s) => s._id === id);
    alert(
      `Seller Details:\nName: ${seller.name}\nEmail: ${seller.email}\nStatus: ${seller.status}`
    );
  };

  return (
    <div>
      <Anavbar />

      <div className="seller-container">
        <h2>All Sellers</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={seller._id}>
                <td>{index + 1}</td>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td className={`status ${seller.status.toLowerCase()}`}>
                  {seller.status}
                </td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => handleApprove(seller._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="block-btn"
                    onClick={() => handleBlock(seller._id)}
                  >
                    Block
                  </button>
                  <button
                    className="view-btn"
                    onClick={() => handleView(seller._id)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Seller;
