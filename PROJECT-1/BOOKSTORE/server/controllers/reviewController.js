// backend/controllers/reviewController.js
const Review = require("../models/Review");
const Book = require("../models/BookModel");
const mongoose = require("mongoose");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { bookId } = req.params;
    const userId = req.user.id;

    // 🔴 validate bookId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    // 🔴 check book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // 🔴 prevent duplicate review
    const exists = await Review.findOne({
      book: bookId,
      user: userId
    });

    if (exists) {
      return res
        .status(400)
        .json({ message: "You already reviewed this book" });
    }

    // 🔹 create review
    await Review.create({
      book: bookId,
      user: userId,
      rating,
      comment
    });

    // 🔹 calculate average rating + count
    const stats = await Review.aggregate([
      { $match: { book: new mongoose.Types.ObjectId(bookId) } },
      {
        $group: {
          _id: "$book",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    const avgRating =
      stats.length > 0 ? Number(stats[0].avgRating.toFixed(1)) : 0;

    const reviewsCount = stats.length > 0 ? stats[0].totalReviews : 0;

    // 🔹 store calculated rating in Book
    await Book.findByIdAndUpdate(bookId, {
      rating: avgRating,
      reviewsCount
    });

    res.status(201).json({
      message: "Review added successfully",
      rating: avgRating,
      reviewsCount
    });
  } catch (error) {
    console.error("Add review error:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

exports.getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    // map user.name → name
    const formattedReviews = reviews.map(r => ({
      _id: r._id,
      name: r.user.name,
      rating: r.rating,
      comment: r.comment,
      createdAt: r.createdAt
    }));

    res.json(formattedReviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
