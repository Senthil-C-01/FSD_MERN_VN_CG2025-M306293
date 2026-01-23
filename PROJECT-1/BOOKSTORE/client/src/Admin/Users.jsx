import React, { useState, useEffect } from "react";
import axios from "axios";
import Anavbar from "./Anavbar";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  // 🔹 Fetch all users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/admin/users");
        console.log("Users from DB:", res.data);
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, []);

  // 🔹 Block a user
  const handleBlock = async (id) => {
    if (!window.confirm("Are you sure you want to block this user?")) return;

    try {
      const res = await axios.put(`http://localhost:8000/admin/users/${id}/block`);
      console.log("User blocked:", res.data);
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? res.data : user))
      );
    } catch (error) {
      console.error("Failed to block user", error);
    }
  };

  // 🔹 Activate a user
  const handleActivate = async (id) => {
    if (!window.confirm("Are you sure you want to activate this user?")) return;

    try {
      const res = await axios.put(`http://localhost:8000/admin/users/${id}/activate`);
      console.log("User activated:", res.data);
      setUsers((prev) =>
        prev.map((user) => (user._id === id ? res.data : user))
      );
    } catch (error) {
      console.error("Failed to activate user", error);
    }
  };

  // 🔹 View user details
  const handleView = (id) => {
    const user = users.find((u) => u._id === id);
    if (user) {
      alert(`User Details:\nName: ${user.name}\nEmail: ${user.email}\nStatus: ${user.status}`);
    }
  };

  return (
    <div>
      <Anavbar />

      <div className="users-container">
        <h2>All Users</h2>
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
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className={`status ${user.status.toLowerCase()}`}>{user.status}</td>
                <td>
                  {user.status === "Active" ? (
                    <button className="block-btn" onClick={() => handleBlock(user._id)}>Block</button>
                  ) : (
                    <button className="activate-btn" onClick={() => handleActivate(user._id)}>Activate</button>
                  )}
                  <button className="view-btn" onClick={() => handleView(user._id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
