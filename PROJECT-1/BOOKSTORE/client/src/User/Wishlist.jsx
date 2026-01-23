import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!token) return;

        const res = await axios.get(
          "http://localhost:8000/api/wishlist",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setWishlist(res.data);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  // 🔹 Remove from wishlist
  const removeFromWishlist = async (bookId) => {
    try {
      await axios.delete(
        "http://localhost:8000/api/wishlist/remove",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { bookId }
        }
      );

      // Update UI instantly
      setWishlist((prev) => prev.filter((b) => b._id !== bookId));
    } catch (error) {
      console.error("Remove wishlist failed", error);
    }
  };

  return (
    <div className="wishlist-page">
      <Link to="/user/Uhome" className="back-link">
        ← Back to Home
      </Link>

      <h2 className="wishlist-title">My Wishlist ❤️</h2>

      {loading ? (
        <p className="empty-msg">Loading wishlist...</p>
      ) : wishlist.length === 0 ? (
        <p className="empty-msg">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-container">
          {wishlist.map((book) => (
            <div key={book._id} className="wishlist-card">
              {/* IMAGE */}
              <div
                className="wishlist-img clickable"
                onClick={() => navigate(`/products/${book._id}`)}
                style={{ backgroundImage: `url(${book.coverImage})` }}
              />

              <div className="wishlist-details">
                <h4
                  className="clickable-title"
                  onClick={() => navigate(`/products/${book._id}`)}
                >
                  {book.title}
                </h4>

                <p className="author">{book.author}</p>
                <p className="rating">⭐ {book.rating || "N/A"}</p>
                <p className="price">₹{book.price}</p>

                <div className="wishlist-actions">
                  <button
                    className="cart-btn"
                    onClick={() => navigate(`/checkout/${book._id}`)}
                  >
                    Buy Now
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(book._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
