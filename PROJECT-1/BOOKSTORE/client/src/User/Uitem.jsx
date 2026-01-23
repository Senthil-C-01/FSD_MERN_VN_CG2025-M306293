import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Uitem.css";
import Navbar from "./Navbar";

const Uitem = () => {
  const { id } = useParams(); // MongoDB book _id from URL
  // const userName = "John Doe"; // later from auth
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  const addToWishlist = async (bookId) => {
  const token = localStorage.getItem("token"); // check login via token
  if (!token) {
    alert("Please login first");
    navigate("/login"); // optional: redirect to login
    return;
  }

  try {
    await axios.post(
      "http://localhost:8000/api/wishlist/add",
      { bookId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Added to wishlist ❤️");
  } catch (error) {
    console.error("Add to wishlist failed", error);
    alert("Something went wrong");
  }
};


  // Fetch book and its reviews
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const resBook = await axios.get(`http://localhost:8000/api/books/${id}`);
        setBook(resBook.data);

        const resReviews = await axios.get(`http://localhost:8000/api/reviews/book/${id}`);
        setReviews(resReviews.data);
      } catch (err) {
        console.error(err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Submit review
  const submitReview = async () => {
  if (userRating === 0 || userComment.trim() === "") return;

  try {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `http://localhost:8000/api/reviews/${id}`,
      {
        rating: userRating,
        comment: userComment
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // update book rating/count from backend response
    setBook(prev => ({
      ...prev,
      rating: res.data.rating,
      reviewsCount: res.data.reviewsCount
    }));

    // refetch reviews (backend is source of truth)
    const resReviews = await axios.get(
      `http://localhost:8000/api/reviews/book/${id}`
    );
    setReviews(resReviews.data);

    setUserRating(0);
    setUserComment("");
  } catch (err) {
    console.error("Failed to submit review", err);
  }
};


  if (loading) return <p style={{ padding: "20px" }}>Loading book...</p>;
  if (!book) return <p style={{ padding: "20px" }}>Book not found</p>;

  return (
    <div className="uitem-page">
      <Navbar />

      <div className="uitem-card">
        <div className="uitem-image">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} />
          ) : (
            <div className="book-placeholder">Book Image</div>
          )}
        </div>

        <div className="uitem-details">
          <h2>{book.title}</h2>
          <p className="author">by {book.author}</p>
          <p className="rating">⭐ {book.rating.toFixed(1)} ({book.reviewsCount || 0} reviews)</p>
          <p className="price">₹{book.price}</p>
          <p className="description">{book.description}</p>
          <p><strong>Category:</strong> {book.genre || "N/A"}</p>
          <p className={book.stock > 0 ? "in-stock" : "out-stock"}>
            {book.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          <div className="uitem-actions">
            {/* <button disabled={book.stock === 0} className="add-cart-btn">
              Add to Cart
            </button> */}
            <button className="add-cart-btn" onClick={() => navigate(`/checkout/${book._id}`)}>
                  Buy Now
                  </button>
            <button onClick={() => addToWishlist(book._id)} className="wishlist-btn">♥</button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((rev, index) => (
            <div key={index} className="review-card">
              <p className="review-name">{rev.name}</p>
              <p className="review-rating">⭐ {rev.rating}</p>
              <p className="review-comment">{rev.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* ADD REVIEW */}
      <div className="add-review">
        <h3>Write a Review</h3>
        <div className="star-input">
          {[1, 2, 3, 4, 5].map(star => (
            <span
              key={star}
              className={star <= userRating ? "star active" : "star"}
              onClick={() => setUserRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review..."
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
        ></textarea>

        <button onClick={submitReview} className="submit-review-btn">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Uitem;
