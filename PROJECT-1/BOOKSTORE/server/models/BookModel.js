const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    price: { type: Number, required: true },

    stock: { type: Number, default: 0 },

    coverImage: { type: String },

    // 🔹 Seller = User with role "seller"
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true // backward compatibility
    },

    // 🔹 Admin control (does NOT break existing)
    // isApproved: {
    //   type: Boolean,
    //   default: true
    // },

    // ⭐ Calculated fields
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 }

    // // 📝 Reviews
    // reviews: [
    //   {
    //     userName: { type: String, required: true },
    //     rating: { type: Number, min: 1, max: 5, required: true },
    //     comment: { type: String },
    //     createdAt: { type: Date, default: Date.now }
    //   }
    // ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
