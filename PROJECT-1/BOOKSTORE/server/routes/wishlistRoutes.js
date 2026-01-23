// backend/routes/wishlistRoutes.js
const express = require("express");
const router = express.Router();
const wishlistCtrl = require("../controllers/wishlistController");

const auth = require("../middlewares/authMiddleware");

router.get("/", auth, wishlistCtrl.getWishlist);
router.post("/add", auth, wishlistCtrl.addToWishlist);
router.delete("/remove", auth, wishlistCtrl.removeFromWishlist);


module.exports = router;
