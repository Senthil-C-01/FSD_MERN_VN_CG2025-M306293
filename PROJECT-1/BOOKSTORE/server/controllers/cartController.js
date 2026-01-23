// exports.getCart = async (req, res) => {
//   const userId = req.user._id;

//   let cart = await Cart.findOne({ user: userId })
//     .populate("items.book", "title price coverImage");

//   if (!cart) {
//     cart = await Cart.create({ user: userId, items: [] });
//   }

//   res.json(cart.items);
// };

// exports.addToCart = async (req, res) => {
//   const userId = req.user._id;
//   const { bookId } = req.body;

//   let cart = await Cart.findOne({ user: userId });
//   if (!cart) cart = await Cart.create({ user: userId, items: [] });

//   const item = cart.items.find(i => i.book.toString() === bookId);

//   if (item) {
//     item.quantity += 1;
//   } else {
//     cart.items.push({ book: bookId });
//   }

//   await cart.save();
//   res.json({ message: "Added to cart" });
// };

// exports.removeFromCart = async (req, res) => {
//   const userId = req.user._id;
//   const { bookId } = req.body;

//   const cart = await Cart.findOne({ user: userId });
//   if (!cart) return res.json({ message: "Cart empty" });

//   cart.items = cart.items.filter(
//     i => i.book.toString() !== bookId
//   );

//   await cart.save();
//   res.json({ message: "Removed from cart" });
// };
