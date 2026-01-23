const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connect");
const orderRoutes = require("./routes/orderRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const adminRoutes = require("./routes/adminRoutes");


dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Routes
app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/seller", require("./routes/sellerRoutes"));
// app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));

// Seller
// app.use("/uploads", express.static("uploads"));
app.use("/api/seller", require("./routes/sellerRoutes"));
// app.use("/api/seller", sellerRoutes);


//Admin
app.use("/admin", require("./routes/adminRoutes"));
app.use("/admin/users", require("./routes/adminRoutes"));
app.use("/api/admin", adminRoutes);

//order

app.use("/api/orders", orderRoutes);



// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
