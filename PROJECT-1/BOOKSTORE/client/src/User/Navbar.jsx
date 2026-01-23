import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Unavbar.css";

const Unavbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");

  // Get logged-in user info from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>Bookstore</h2>
      </div>

      <div className="nav-center">
        <input
          type="text"
          placeholder="Search by book or author..."
        />
      </div>

      <div className="nav-right">
        <Link to="/user/Uhome">Home</Link>
        <Link to="/products">Books</Link>
        {/* <Link to="/cart">Cart</Link> */}
        <Link to="/myorder">Orders</Link>
        <Link to="/wishlist">Wishlist</Link>
        <span className="user-name">{userName}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Unavbar;



// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = ({ userName = "John Doe", onLogout }) => {
//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <h2>Bookstore</h2>
//       </div>

//       {/* <div className="nav-center">
//         <input type="text" placeholder="Search books..." />
//       </div> */}

//       <div className="nav-right">
//         <Link to="/user/Uhome">Home</Link>
//         <Link to="/products">Books</Link>
//         <Link to="/cart">Cart</Link>
//         <Link to="/wishlist">Wishlist</Link>
//         <span className="user-name">{userName}</span>
//         <button className="logout-btn" onClick={onLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
