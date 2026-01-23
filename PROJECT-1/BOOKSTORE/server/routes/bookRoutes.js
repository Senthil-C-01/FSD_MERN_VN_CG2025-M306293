const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  addReview,
  getReviews
} = require("../controllers/BookController");

// GET all books
router.get("/", getAllBooks);

// GET book by ID
router.get("/:id", getBookById);

// ---------- REVIEWS ----------

// ADD review to a book
router.post("/:id/review", addReview);

// GET reviews of a book
router.get("/:id/reviews", getReviews);

module.exports = router;
