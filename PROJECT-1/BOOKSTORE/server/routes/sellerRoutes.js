const express = require("express");
const router = express.Router();

const { addBook, getMyBooks, deleteBook, updateBook, getSellerOrders, updateOrderStatus, getSellerDashboardStats } = require("../controllers/SellerControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add-book", authMiddleware, addBook);

router.get("/my-books", authMiddleware, getMyBooks);

router.delete("/delete-book/:id", authMiddleware, deleteBook);

router.put("/update-book/:id", authMiddleware, updateBook);

// Only seller can fetch their orders
router.get("/seller-orders", authMiddleware, getSellerOrders);

// Update order status (seller only)
router.put("/orders/:orderId/status", authMiddleware, updateOrderStatus);


router.get("/profile", authMiddleware, (req, res) => {
//   console.log("PROFILE USER 👉", req.user);
  res.json(req.user);
});

router.get("/dashboard-stats",  authMiddleware, getSellerDashboardStats);


module.exports = router;
