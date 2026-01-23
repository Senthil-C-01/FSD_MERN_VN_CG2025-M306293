import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Decide API URL based on role
      const url =
        role === "seller"
          ? "http://localhost:8000/api/seller/signup"
          : "http://localhost:8000/api/user/signup";

      await axios.post(url, {
        name,
        email,
        password,
        role, // send role to backend
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      // Display backend error
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p>Create your Bookstore account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* ROLE SELECTION */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="user">User</option>
            <option value="seller">Seller</option>
          </select>

          {error && <p className="error-text">{error}</p>}

          <button type="submit">Sign Up</button>
        </form>

        {/* ADMIN NOTE */}
        <div className="admin-note">
          <p>
            Admin account? <span>Contact developer</span>
          </p>
        </div>

        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
