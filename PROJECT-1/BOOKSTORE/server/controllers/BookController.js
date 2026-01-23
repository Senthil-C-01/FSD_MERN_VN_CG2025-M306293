const Book = require("../models/BookModel");

// GET all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books", error });
  }
};

// GET single book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book", error });
  }
};

// ---------------- REVIEWS ----------------

// POST review for a book
const addReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;

    if (!userName || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid review data" });
    }

    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Add review
    book.reviews.push({ userName, rating: parseInt(rating), comment });

    // Recalculate average rating
    book.reviewsCount = book.reviews.length;
    book.rating =
      book.reviews.reduce((sum, r) => sum + r.rating, 0) /
      book.reviewsCount;

    await book.save();

    res.status(201).json(book); // return updated book
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
};

// GET reviews for a book
const getReviews = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).select("reviews");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book.reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addReview,
  getReviews
};
