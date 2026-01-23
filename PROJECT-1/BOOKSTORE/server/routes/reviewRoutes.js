// backend/routes/reviewRoutes.js
const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

// POST review for a book
router.post("/:bookId", authMiddleware, reviewController.addReview);

router.get("/book/:bookId", reviewController.getReviewsByBook);

module.exports = router;
