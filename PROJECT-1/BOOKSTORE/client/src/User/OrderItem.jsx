// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import "./OrderItem.css";

// const OrderItem = () => {
//   const { orderId } = useParams();

//   // Temporary static data (later from backend)
//   const orders = [
//     {
//       id: "ORD12345",
//       date: "10 Sep 2025",
//       status: "Delivered",
//       tracking: "Delivered on 12 Sep 2025",
//       total: 798,
//       customer: {
//         name: "John Doe",
//         phone: "9876543210",
//         address: "12, MG Road, Near City Mall, Bengaluru, Karnataka - 560001"
//       },
//       items: [
//         { name: "Atomic Habits", qty: 1 },
//         { name: "The Alchemist", qty: 1 }
//       ]
//     },
//     {
//       id: "ORD12346",
//       date: "20 Sep 2025",
//       status: "Shipped",
//       tracking: "Expected by 25 Sep 2025",
//       total: 499,
//       customer: {
//         name: "John Doe",
//         phone: "9876543210",
//         address: "12, MG Road, Near City Mall, Bengaluru, Karnataka - 560001"
//       },
//       items: [
//         { name: "Clean Code", qty: 1 }
//       ]
//     }
//   ];

//   const order = orders.find(o => o.id === orderId);

//   if (!order) {
//     return <p style={{ padding: "20px" }}>Order not found</p>;
//   }

//   return (
//     <div className="order-item-page">
//       <Link to="/cart" className="back-link">← Back to My Orders</Link>

//       <div className="order-item-card">
//         {/* HEADER */}
//         <div className="order-item-header">
//           <div>
//             <p><strong>Order ID:</strong> {order.id}</p>
//             <p className="order-date">{order.date}</p>
//           </div>

//           <span className={`status ${order.status.toLowerCase()}`}>
//             {order.status}
//           </span>
//         </div>

//         {/* DELIVERY DETAILS */}
//         <div className="order-delivery">
//           <p className="section-title">Delivery Details</p>
//           <p><strong>Name:</strong> {order.customer.name}</p>
//           <p><strong>Phone:</strong> {order.customer.phone}</p>
//           <p><strong>Address:</strong> {order.customer.address}</p>
//         </div>

//         {/* ITEMS */}
//         <div className="order-item-list">
//           <p className="section-title">Items</p>
//           {order.items.map((item, index) => (
//             <div key={index} className="order-book">
//               <span>{item.name}</span>
//               <span>× {item.qty}</span>
//             </div>
//           ))}
//         </div>

//         {/* FOOTER */}
//         <div className="order-item-footer">
//           <div>
//             <p><strong>Total:</strong> ₹{order.total}</p>
//             <p className="tracking">{order.tracking}</p>
//           </div>

//           {order.status !== "Delivered" && (
//             <button className="track-btn">Track Order</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderItem;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./OrderItem.css";

const OrderItem = () => {
  const { id } = useParams(); // The order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/api/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(res.data); // backend should send the order object
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (!order) return <p style={{ padding: "20px" }}>Order not found</p>;

  return (
    <div className="order-item-page">
      <Link to="/myorder" className="back-link">← Back to My Orders</Link>

      <div className="order-item-card">
        {/* HEADER */}
        <div className="order-item-header">
          <div>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p className="order-date">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>

          <span className={`status ${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>

        {/* DELIVERY DETAILS */}
        <div className="order-delivery">
          <p className="section-title">Delivery Details</p>
          <p><strong>Name:</strong> {order.buyerInfo?.fullName}</p>
          <p><strong>Email:</strong> {order.buyerInfo?.email}</p>
          <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
          <p><strong>Address:</strong> {`${order.shippingAddress?.addressLine}, ${order.shippingAddress?.city}, ${order.shippingAddress?.state} - ${order.shippingAddress?.pincode}`}</p>
        </div>

        {/* ITEMS */}
        <div className="order-item-list">
          <p className="section-title">Items</p>
          {order.items.map((item) => (
            <div key={item.book} className="order-book">
              <span>{item.title}</span>
              <span>× {item.quantity}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="order-item-footer">
          <div>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p className="tracking">{order.status === "Delivered" ? "Delivered" : "In Transit"}</p>
            <p><strong>Seller:</strong> {order.seller?.name || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
