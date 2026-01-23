import { useEffect, useState } from "react";


const Cart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartBooks, setCartBooks] = useState([]);

  const fetchCart = async () => {
    if (!user) return;
    const res = await api.get(`/cart/${user._id}`); // backend should return list of books
    setCartBooks(res.data);
  };

  const removeFromCart = async (bookId) => {
    await api.delete(`/cart/remove`, { data: { userId: user._id, bookId } });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartBooks.reduce((sum, book) => sum + book.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartBooks.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {cartBooks.map((book) => (
            <div key={book._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <BookCard book={book} />
              <button onClick={() => removeFromCart(book._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={() => alert("Checkout feature coming soon!")}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
