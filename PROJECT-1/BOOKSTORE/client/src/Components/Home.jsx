import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";
import Footer from "./Footer";

const Home = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books");
        const books = res.data;

        // Top Sellers: rating >= 3
        const top = books.filter((b) => b.rating >= 3);
        setTopSellers(top);

        // New Arrivals: latest 5 books (assuming books have a createdAt field)
        const sortedByDate = [...books].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNewArrivals(sortedByDate.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch books", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p style={{ padding: "20px" }}>Loading books...</p>;

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <h2>Bookstore</h2>
        </div>

        <div className="nav-center">
          <input type="text" placeholder="Search books..." />
        </div>

        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>Welcome to Bookstore</h1>
        <p>Buy, Sell, and Explore Books Easily</p>
      </section>

      {/* TOP SELLERS */}
      <section className="section">
        <h2>Top Sellers</h2>
        <div className="card-container">
          {topSellers.length === 0 ? (
            <p>No top-rated books yet.</p>
          ) : (
            topSellers.map((book) => (
              <div key={book._id} className="card">
                <Link to={`/products/${book._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div
                    className="book-img"
                    style={{
                      backgroundImage: `url(${book.coverImage || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "150px",
                    }}
                  ></div>
                  <h4>{book.title}</h4>
                  <p className="author">{book.author}</p>
                  <p className="rating">⭐ {book.rating.toFixed(1)}</p>
                  <p className="price">₹{book.price}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section">
        <h2>New Arrivals</h2>
        <div className="card-container">
          {newArrivals.length === 0 ? (
            <p>No new books yet.</p>
          ) : (
            newArrivals.map((book) => (
              <div key={book._id} className="card">
                <Link to={`/products/${book._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div
                    className="book-img"
                    style={{
                      backgroundImage: `url(${book.coverImage || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "150px",
                    }}
                  ></div>
                  <h4>{book.title}</h4>
                  <p className="author">{book.author}</p>
                  <p className="rating">⭐ {book.rating.toFixed(1)}</p>
                  <p className="price">₹{book.price}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
