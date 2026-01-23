// controllers/AdminBookController.js
const Book = require("../models/BookModel");

// UPDATE book (Admin)
const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Failed to update book", error });
  }
};

// DELETE book (Admin)
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book", error });
  }
};
//--------------------------------------------------------------------------------
const User = require("../models/UserModel");

// GET all users (only role: "user")
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// GET single user
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

// BLOCK user
const blockUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "Blocked" },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to block user", error });
  }
};

// ACTIVATE user
const activateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "Active" },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to activate user", error });
  }
};

//-----------------------------------------------------------------------------------------

// const User = require("../models/UserModel");

// GET all sellers
const getAllSellers = async (req, res) => {
  try {
    const sellers = await User.find({ role: "seller" }).select("-password");
    res.status(200).json(sellers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sellers", error });
  }
};

// GET single seller
const getSellerById = async (req, res) => {
  try {
    const seller = await User.findOne({ _id: req.params.id, role: "seller" }).select("-password");
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller", error });
  }
};

// Approve seller
const approveSeller = async (req, res) => {
  try {
    const seller = await User.findOneAndUpdate(
      { _id: req.params.id, role: "seller" },
      { status: "Approved" },
      { new: true }
    );
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Failed to approve seller", error });
  }
};

// Block seller
const blockSeller = async (req, res) => {
  try {
    const seller = await User.findOneAndUpdate(
      { _id: req.params.id, role: "seller" },
      { status: "Blocked" },
      { new: true }
    );
    if (!seller) return res.status(404).json({ message: "Seller not found" });
    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Failed to block seller", error });
  }
};

//-----------------------------------------------------------------------------------

// const Order = require("../models/OrderModel"); 
// if exists

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalSellers = await User.countDocuments({ role: "seller" });
    const totalBooks = await Book.countDocuments();

    // Optional – only if orders exist
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);

    // const ordersToday = Order
    //   ? await Order.countDocuments({ createdAt: { $gte: today } })
    //   : 0;

    res.status(200).json({
      totalUsers,
      totalSellers,
      totalBooks,
    //   ordersToday
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats", error });
  }
};


module.exports = {
  // Books
  updateBook,
  deleteBook,

  // Users
  getAllUsers,
  getUserById,
  blockUser,
  activateUser,

  //Seller
  getAllSellers,
  getSellerById,
  approveSeller,
  blockSeller,

  //Dashboard
  getDashboardStats
};

