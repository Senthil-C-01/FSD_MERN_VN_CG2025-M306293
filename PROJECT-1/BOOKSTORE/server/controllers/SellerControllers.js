const Book = require("../models/BookModel");

const addBook = async (req, res) => {
  try {
    const { title, author, genre, description, price, stock, coverImage } =
      req.body;

    const sellerId = req.user.id; // 🔥 AUTO from middleware

    if (!title || !author || !price) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const book = new Book({
      title,
      author,
      genre,
      description,
      price,
      stock,
      coverImage: coverImage || null,
      seller: sellerId
    });

    await book.save();

    res.status(201).json({
      message: "Book added successfully",
      book
    });
  } catch (error) {
    console.error("Add book error:", error);
    res.status(500).json({ message: "Failed to add book" });
  }
};

//--------------------------------------------------------------------------

// const Book = require("../models/BookModel");

// 🔹 Get all books added by logged-in seller
const getMyBooks = async (req, res) => {
  try {
    const sellerId = req.user && req.user.id;

    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const books = await Book.find({ seller: sellerId }).sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    console.error("Get seller books error:", error);
    res.status(500).json({ message: "Failed to fetch seller books" });
  }
};

//  DELETE BOOK (seller only)
const deleteBook = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const bookId = req.params.id;

    const book = await Book.findOne({
      _id: bookId,
      seller: sellerId
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found or unauthorized"
      });
    }

    await book.deleteOne();

    res.status(200).json({
      message: "Book deleted successfully"
    });
  } catch (error) {
    console.error("Delete book error:", error);
    res.status(500).json({ message: "Failed to delete book" });
  }
};

// ✏️ UPDATE BOOK (Seller only)
const updateBook = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const bookId = req.params.id;

    const {
      title,
      author,
      genre,
      description,
      price,
      stock,
      coverImage
    } = req.body;

    // Find book owned by this seller
    const book = await Book.findOne({
      _id: bookId,
      seller: sellerId
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found or unauthorized"
      });
    }

    // Update only provided fields
    if (title !== undefined) book.title = title;
    if (author !== undefined) book.author = author;
    if (genre !== undefined) book.genre = genre;
    if (description !== undefined) book.description = description;
    if (price !== undefined) book.price = price;
    if (stock !== undefined) book.stock = stock;
    if (coverImage !== undefined) book.coverImage = coverImage;

    await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      book
    });
  } catch (error) {
    console.error("Update book error:", error);
    res.status(500).json({ message: "Failed to update book" });
  }
};

//---------------------------------------------------------------

const Order = require("../models/OrderModel");

const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const orders = await Order.find({ seller: sellerId })
      .populate("buyer", "name email") // optional, buyer info
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error("FETCH SELLER ORDERS ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const sellerId = req.user.id;
    const { orderId } = req.params;
    const { status } = req.body;

    // Find order for this seller
    const order = await Order.findOne({ _id: orderId, seller: sellerId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DASHBOARD STATS ================= */
const getSellerDashboardStats = async (req, res) => {
  try {
    const sellerId = req.user.id;

    // 1️⃣ Total books by seller
    const totalBooks = await Book.countDocuments({ seller: sellerId });

    // 2️⃣ Orders belonging to this seller
    const orders = await Order.find({ seller: sellerId });

    const totalOrders = orders.length;

    // 3️⃣ Total revenue (use totalAmount directly)
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0
    );

    res.json({
      totalBooks,
      totalOrders,
      totalRevenue
    });

  } catch (error) {
    console.error("SELLER DASHBOARD ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addBook,
  getMyBooks,
  deleteBook,
  updateBook,
  getSellerOrders,
  updateOrderStatus,
  getSellerDashboardStats
};

// module.exports = {
//   addBook,
//   getMyBooks,
//   deleteBook
// };

// module.exports = {
//   addBook,
//   getMyBooks
// };


// module.exports = { addBook };
