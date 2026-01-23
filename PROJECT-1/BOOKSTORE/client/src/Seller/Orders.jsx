import React, { useEffect, useState } from "react";
import axios from "axios";
import Snavbar from "./Snavbar";
import "./Order.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch seller orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/seller/seller-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔹 Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:8000/api/seller/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="orders-page">
      <Snavbar />

      <div className="orders-container">
        <h2>Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders received yet.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Buyer</th>
                <th>Books</th>
                <th>Quantity</th>
                <th>Total (₹)</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.buyerInfo?.fullName}</td>

                  <td>
                    {order.items.map((item) => (
                      <div key={item.book}>
                        {item.title}
                      </div>
                    ))}
                  </td>

                  <td>
                    {order.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </td>

                  <td>{order.totalAmount}</td>

                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
