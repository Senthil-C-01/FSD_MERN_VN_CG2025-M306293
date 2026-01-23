const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  addressLine: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true }
});

const orderSchema = new mongoose.Schema(
  {
    // 🔹 Buyer reference (for queries)
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🔹 Seller reference
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🔹 SNAPSHOT of buyer info
    buyerInfo: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String }
    },

    // 🔹 Shipping address snapshot
    shippingAddress: {
      type: shippingAddressSchema,
      required: true
    },

    // 🔹 Items ordered
    items: {
      type: [orderItemSchema],
      required: true
    },

    // 🔹 Order total
    totalAmount: {
      type: Number,
      required: true
    },

    // 🔹 Order status (seller controls)
    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending"
    },

    // 🔹 Payment info (future)
    paymentMethod: {
      type: String,
      default: "COD"
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
