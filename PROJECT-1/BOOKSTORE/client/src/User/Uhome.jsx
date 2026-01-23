import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Uhome.css";
import Unavbar from "./Unavbar";

const Uhome = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get logged-in user info from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) setUserName(user.name);
  }, []);

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books");
        const allBooks = res.data;

        // Featured: rating >= 4.5
        const featured = allBooks.filter((b) => b.rating >= 4.5);
        setFeaturedBooks(featured);

        // Recommended: pick a genre, e.g., "Fiction"
        const recommended = allBooks.filter((b) => b.genre === "Dummy");
        setRecommendedBooks(recommended);
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const addToWishlist = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/wishlist/add",
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to wishlist ❤️");
    } catch (err) {
      console.error("Add to wishlist failed", err);
      alert("Something went wrong");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading books...</p>;

  return (
    <div className="uhome">
      <Unavbar />

      {/* WELCOME */}
      <section className="welcome">
        <h1>Welcome back, {userName} 📚</h1>
        <p>Discover books you’ll love</p>
        <Link to="/products" className="browse-btn">Browse Books</Link>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <h2>Categories</h2>
        <div className="category-container">
          <div className="category">Fiction</div>
          <div className="category">Non-Fiction</div>
          <div className="category">Technology</div>
          <div className="category">Education</div>
          <div className="category">Self-Help</div>
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section className="section">
        <h2>Featured Books</h2>
        <div className="book-container">
          {featuredBooks.map((book) => (
            <div key={book._id} className="book-card">
              <div
                className="book-img"
                style={{
                  backgroundImage: `url(${book.coverImage || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <h4>{book.title}</h4>
              <p className="author">{book.author}</p>
              <p className="rating">⭐ {book.rating.toFixed(1)}</p>
              <p className="price">₹{book.price}</p>

              <div className="book-actions">
                <button
                  className="cart-btn"
                  onClick={() => navigate(`/checkout/${book._id}`)}
                  disabled={book.stock === 0}
                >
                  Buy Now
                </button>
                <button
                  className="wishlist-btn"
                  onClick={() => addToWishlist(book._id)}
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECOMMENDED BOOKS */}
      <section className="section">
        <h2>Recommended For You</h2>
        <div className="book-container">
          {recommendedBooks.map((book) => (
            <div key={book._id} className="book-card">
              <div
                className="book-img"
                style={{
                  backgroundImage: `url(${book.coverImage || ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
              <h4>{book.title}</h4>
              <p className="author">{book.author}</p>
              <p className="rating">⭐ {book.rating.toFixed(1)}</p>
              <p className="price">₹{book.price}</p>

              <div className="book-actions">
                <button
                  className="cart-btn"
                  onClick={() => navigate(`/checkout/${book._id}`)}
                  disabled={book.stock === 0}
                >
                  Buy Now
                </button>
                <button
                  className="wishlist-btn"
                  onClick={() => addToWishlist(book._id)}
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Uhome;
