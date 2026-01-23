const express = require("express");
const router = express.Router();
const Seller = require("../models/UserModel"); // adjust path
const { placeOrder, getOrderById } = require("../controllers/orderController");
const Order = require("../models/OrderModel");
const authMiddleware = require("../middlewares/authMiddleware");

// ------------------ USER → PLACE ORDER ------------------
router.post("/", authMiddleware, placeOrder);

// ------------------ USER → GET MY ORDERS ------------------
router.get("/myorder", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ buyer: userId })
      .populate("items.book", "title price")  // populate book info
      .populate("seller", "name");            // populate seller info

    res.json(orders);
  } catch (error) {
    console.error("FETCH MY ORDERS ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🔹 New route to get a single order by ID
router.get("/:id", authMiddleware, getOrderById);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const {
//   createOrder,
//   getUserOrders,
//   getSellerOrders,
//   updateOrderStatus
// } = require("../controllers/orderController");

// const authMiddleware = require("../middlewares/authMiddleware");

// // USER
// // router.post("/create", authMiddleware, createOrder);
// // router.get("/my-orders", authMiddleware, getUserOrders);

// // SELLER
// router.get("/seller-orders", authMiddleware, getSellerOrders);
// router.put("/update-status/:id", authMiddleware, updateOrderStatus);

// module.exports = router;
