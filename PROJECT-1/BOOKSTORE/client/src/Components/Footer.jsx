import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>Bookstore</h3>
          <p>Your one-stop online bookstore</p>
        </div>

        <div className="footer-center">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign up</Link></li>

            {/* <li><Link to="/user/products">Books</Link></li>
            <li><Link to="/user/orders">My Orders</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/seller">Seller</Link></li> */}
          </ul>
        </div>

        <div className="footer-right">
          <h4>Contact</h4>
          <p>Email: support@bookstore.com</p>
          <p>Phone: +91 987654XXXX</p>
          <p>Address: Bangalore, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Bookstore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
