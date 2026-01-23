import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";
import Unavbar from "./Unavbar";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("search") || "";
  const user = JSON.parse(localStorage.getItem("user"));


  const [allBooks, setAllBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [userName, setUserName] = useState(""); // dynamic username

  // Fetch books from backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books");
        setAllBooks(res.data);
      } catch (err) {
        console.error("Failed to fetch books", err);
      }
    };
    fetchBooks();
  }, []);

  // Get logged-in user info from localStorage
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user")); // stored on login
    // const user = () => JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    } else {
      setUserName("Guest");
    }
  }, []);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setRatingFilter("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const addToCart = async () => {
      if (!user) return alert("Login first");
      await api.post("/cart/add", { userId: user._id, bookId: book._id });
      alert("Added to cart");
    };
  
    // Add to wishlist
    // const addToWishlist = async () => {
    //   if (!user) return alert("Login first");
    //   await api.post("/wishlist/add", { userId: user._id, bookId: book._id });
    //   alert("Added to wishlist");
    // };
    const addToWishlist = async (bookId) => {
  if (!user) {
    alert("Please login first");
    return;
  }

  try {
    await axios.post("http://localhost:8000/api/wishlist/add",
  { bookId },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);
    alert("Added to wishlist ❤️");
  } catch (error) {
    console.error("Add to wishlist failed", error);
    alert("Something went wrong");
  }
};


  const filteredBooks = allBooks.filter((book) => {
    const matchesCategory = selectedCategory === "All" || book.genre === selectedCategory;
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice =
      (minPrice === "" || book.price >= Number(minPrice)) &&
      (maxPrice === "" || book.price <= Number(maxPrice));
    const matchesRating = ratingFilter === "" || book.rating >= Number(ratingFilter);

    return matchesCategory && matchesSearch && matchesPrice && matchesRating;
  });

  return (
    <div className="products-page">
      {/* <Unavbar /> */}
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-left">
          <h2>Bookstore</h2>
        </div>

        <div className="nav-center">
          <input
            type="text"
            placeholder="Search by book or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* FILTERS */}
      <div className="filters">
        <div className="filter-group">
          <label>Genre:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {["All", "Fiction", "Non-Fiction", "Technology", "Education", "Self-Help"].map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Min Price:</label>
          <input type="number" placeholder="No Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <label>Max Price:</label>
          <input type="number" placeholder="No Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>

        <div className="filter-group">
          <label>Min Rating:</label>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
            <option value="5">5</option>
          </select>
        </div>

        <button className="reset-btn" onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* BOOK GRID */}
      <div className="book-container">
        {filteredBooks.length === 0 ? (
          <p>No books found.</p>
        ) : (
          filteredBooks.map((book) => (
            <Link
              key={book._id}
              to={`/products/${book._id}`}
              className="book-card"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="book-img" style={{ backgroundImage: `url(${book.coverImage})` }}></div>
              <h4>{book.title}</h4>
              <p className="author">{book.author}</p>
              <p className="rating">⭐ {book.rating || "N/A"} ({book.reviewsCount || 0})</p>
              <p className="price">₹{book.price}</p>

              <div className="book-actions" onClick={(e) => e.preventDefault()}>
                {/* <button onClick={addToCart} className="cart-btn">Add to Cart</button> */}
                {/* <button onClick={addToCart} className="cart-btn">Buy Now</button> */}
                <button className="cart-btn" onClick={() => navigate(`/checkout/${book._id}`)}>
                  Buy Now
                  </button>
                <button onClick={() => addToWishlist(book._id)} className="wishlist-btn">♥</button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
