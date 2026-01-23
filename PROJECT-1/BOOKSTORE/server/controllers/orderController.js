const Order = require("../models/OrderModel");
const Book = require("../models/BookModel");
const User = require("../models/UserModel");

// exports.placeOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { bookId, quantity, shippingAddress } = req.body;

//     // 1️⃣ Get user
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 2️⃣ Get book
//     const book = await Book.findById(bookId);
//     if (!book) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     // 3️⃣ Stock check
//     if (book.stock < quantity) {
//       return res.status(400).json({ message: "Out of stock" });
//     }

//     // 4️⃣ Create order
//     const order = new Order({
//       buyer: userId,
//       seller: book.seller,

//       // ✅ Use shippingAddress for buyerInfo phone
//       buyerInfo: {
//         fullName: shippingAddress.fullName,
//         phone: shippingAddress.phone,
//         email: user.email
//       },

//       shippingAddress,

//       items: [
//         {
//           book: book._id,
//           title: book.title,
//           price: book.price,
//           quantity
//         }
//       ],

//       totalAmount: book.price * quantity
//     });

//     // 5️⃣ Save order
//     await order.save();

//     // 6️⃣ Reduce stock
//     book.stock -= quantity;
//     await book.save();

//     res.status(201).json({
//       message: "Order placed successfully",
//       order
//     });
//   } catch (error) {
//     console.error("ORDER ERROR 👉", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.placeOrder = async (req, res) => {
  try {
    // const buyerId = req.user.id; // from authMiddleware

    const buyerId = req.user.id;


    const {
      items,
      shippingAddress,
      paymentMethod = "COD"
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided" });
    }

    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address required" });
    }

    // 🔹 Fetch buyer details from token
    // const buyer = req.user;
    const buyer = await User.findById(buyerId);
if (!buyer) {
  return res.status(404).json({ message: "User not found" });
}

    let totalAmount = 0;
    let sellerId = null;

    // 🔹 Validate items & calculate total
    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.book);

      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }

      if (book.stock < item.quantity) {
        return res
          .status(400)
          .json({ message: `${book.title} is out of stock` });
      }

      totalAmount += book.price * item.quantity;

      sellerId = book.seller; // assuming single seller per order

      orderItems.push({
        book: book._id,
        title: book.title,
        price: book.price,
        quantity: item.quantity
      });

      // 🔹 Reduce stock
      book.stock -= item.quantity;
      await book.save();
    }

    // 🔹 Create order
    const order = new Order({
      buyer: buyerId,
      seller: sellerId,
      buyerInfo: {
        fullName: shippingAddress.fullName,
        phone: shippingAddress.phone,
        email: buyer.email
      },
      shippingAddress,
      items: orderItems,
      totalAmount,
      paymentMethod
    });

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    console.error("PLACE ORDER ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports = {
//   placeOrder
// };


// 🔹 Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.id;

    // Find order and ensure the user is the buyer
    const order = await Order.findOne({ _id: orderId, buyer: userId })
      .populate("items.book", "title price") // optional: get book details
      .populate("seller", "name email");     // optional: get seller info

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("FETCH ORDER ERROR 👉", error);
    res.status(500).json({ message: "Server error" });
  }
};


//----------------------------------------------------------------------------------------------
// const Order = require("../models/OrderModel");
// const Book = require("../models/BookModel");

// /**
//  * @desc    Create new order (USER)
//  * @route   POST /api/orders/create
//  * @access  Private (User)
//  */
// exports.createOrder = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const {
//       items,
//       shippingAddress,
//       totalAmount
//     } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No order items" });
//     }

//     // 🔹 Assume single-seller per order (important)
//     const firstBook = await Book.findById(items[0].book);
//     if (!firstBook) {
//       return res.status(404).json({ message: "Book not found" });
//     }

//     const sellerId = firstBook.seller;

//     const order = new Order({
//       buyer: userId,
//       seller: sellerId,

//       buyerInfo: {
//         fullName: shippingAddress.fullName,
//         phone: shippingAddress.phone,
//         email: req.user.email
//       },

//       shippingAddress,
//       items,
//       totalAmount
//     });

//     const savedOrder = await order.save();

//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error("Create order error:", error);
//     res.status(500).json({ message: "Failed to create order" });
//   }
// };

// /**
//  * @desc    Get orders of logged-in USER
//  * @route   GET /api/orders/my-orders
//  * @access  Private (User)
//  */
// exports.getUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ buyer: req.user.id })
//       .sort({ createdAt: -1 });

//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch user orders" });
//   }
// };

// /**
//  * @desc    Get orders for logged-in SELLER
//  * @route   GET /api/orders/seller-orders
//  * @access  Private (Seller)
//  */

// exports.getSellerOrders = async (req, res) => {
//   console.log("SELLER FROM TOKEN:", req.user.id);

//   const orders = await Order.find({
//     seller: req.user.id
//   });

//   console.log("ORDERS FOUND:", orders.length);
//   res.json(orders);
// };


// // exports.getSellerOrders = async (req, res) => {
// //   try {
// //     console.log("SELLER ID FROM TOKEN:", req.user.id);

// //     const orders = await Order.find({
// //       seller: req.user.id
// //     });

// //     console.log("ORDERS FOUND:", orders.length);

// //     res.json(orders);
// //   } catch (error) {
// //     console.error("GET SELLER ORDERS ERROR:", error);
// //     res.status(500).json({ message: "Failed to fetch seller orders" });
// //   }
// // };


// // exports.getSellerOrders = async (req, res) => {
// //   try {
// //     console.log("SELLER ID FROM TOKEN:", req.user.id);

// //     const orders = await Order.find({ seller: req.user.id });
// //     console.log("ORDERS FOUND:", orders.length);

// //     res.json(orders);
// //   } catch (error) {
// //     console.error("GET SELLER ORDERS ERROR:", error);
// //     res.status(500).json({ message: "Failed to fetch seller orders" });
// //   }
// // };
// //-----------------------------------original below
// // exports.getSellerOrders = async (req, res) => {
// //   try {
// //     const orders = await Order.find({ seller: req.user.id })
// //       .sort({ createdAt: -1 });

// //     res.json(orders);
// //   } catch (error) {
// //     res.status(500).json({ message: "Failed to fetch seller orders" });
// //   }
// // };

// /**
//  * @desc    Update order status (SELLER)
//  * @route   PUT /api/orders/update-status/:id
//  * @access  Private (Seller)
//  */
// exports.updateOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     const order = await Order.findById(req.params.id);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // 🔐 Ensure seller owns this order
//     if (order.seller.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     order.status = status;
//     await order.save();

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update order status" });
//   }
// };
