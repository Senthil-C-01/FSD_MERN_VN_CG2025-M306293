const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const sellerLogin = async (req, res) => {
  const { email, password } = req.body;

  const seller = await User.findOne({ email, role: "seller" });
  if (!seller) {
    return res.status(401).json({ message: "Seller not found" });
  }

  // ⚠️ Plain password for now (hash later)
  if (seller.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: seller._id, name: seller.name, role: seller.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token,
    seller: {
      id: seller._id,
      name: seller.name,
      email: seller.email
    }
  });
};

module.exports = { sellerLogin };
