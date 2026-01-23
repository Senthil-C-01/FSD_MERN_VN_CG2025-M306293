import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) setUserName(user.name);
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/orders/myorder",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };

    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="orders-page">
      <nav className="navbar">
        <div className="nav-left">
          <h2>Bookstore</h2>
        </div>

        <div className="nav-right">
          <Link to="/user/Uhome">Home</Link>
          <Link to="/products">Books</Link>
          {/* <Link to="/cart">Cart</Link> */}
          <Link to="/myorder">Orders</Link>
          <Link to="/wishlist">Wishlist</Link>
          <span className="user-name">{userName || "Guest"}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <h2 className="orders-title">My Orders</h2>

      <div className="orders-container">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map(order => (
            <Link
              key={order._id}
              to={`/order/${order._id}`}
              className="order-link"
            >
              <div className="order-card">
                <div className="order-header">
                  <div>
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-footer">
                  <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                  <p className="tracking">{order.tracking}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
