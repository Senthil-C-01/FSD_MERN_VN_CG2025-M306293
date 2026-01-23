// routes/adminBookRoutes.js
const express = require("express");
const router = express.Router();

const {
  updateBook,
  deleteBook,
} = require("../controllers/AdminControllers");

// Admin book management
router.put("/product/:id", updateBook);
router.delete("/product/:id", deleteBook);

const {
  getAllUsers,
  getUserById,
  blockUser,
  activateUser
} = require("../controllers/AdminControllers");

// Admin user management

// GET all users
router.get("/users", getAllUsers);

// GET single user by ID
router.get("/users/:id", getUserById);

// Block / Activate user
router.put("/users/:id/block", blockUser);
router.put("/users/:id/activate", activateUser);

const {
  getAllSellers,
  getSellerById,
  approveSeller,
  blockSeller
} = require("../controllers/AdminControllers");

// Admin seller management
router.get("/sellers", getAllSellers);
router.get("/sellers/:id", getSellerById);
router.put("/sellers/:id/approve", approveSeller);
router.put("/sellers/:id/block", blockSeller);

//---------------------------------------------------------------------------------------
const { getDashboardStats } = require("../controllers/AdminControllers");

router.get("/dashboard-stats", getDashboardStats);


//----------------------------------------------------------

const authMiddleware = require("../middlewares/authMiddleware");

router.get("/profile", authMiddleware, (req, res) => {
  // console.log(res.send)
  res.json({
    id: req.user.id,
    name: req.user.name,
    role: req.user.role
  });
});

module.exports = router;
