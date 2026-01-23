const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/UsersController");

// SIGNUP
router.post("/signup", signupUser);

// LOGIN
router.post("/login", loginUser);

module.exports = router;
