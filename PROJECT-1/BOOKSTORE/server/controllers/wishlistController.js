// backend/controllers/wishlistController.js
const Wishlist = require("../models/wishlist");

exports.getWishlist = async (req, res) => {
  const userId = req.user.id;
  let wishlist = await Wishlist.findOne({ user: userId }).populate("books");
  if (!wishlist) wishlist = await new Wishlist({ user: userId, books: [] }).save();
  res.json(wishlist.books);
};

exports.addToWishlist = async (req, res) => {
    const userId = req.user.id;
  const { bookId } = req.body;
  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) wishlist = await new Wishlist({ user: userId, books: [] });
  if (!wishlist.books.includes(bookId)) wishlist.books.push(bookId);
  await wishlist.save();
  res.json({ message: "Book added to wishlist" });
};

exports.removeFromWishlist = async (req, res) => {
    const userId = req.user.id;
  const { bookId } = req.body;
  const wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    wishlist.books = wishlist.books.filter((b) => b.toString() !== bookId);
    await wishlist.save();
  }
  res.json({ message: "Book removed from wishlist" });
};
