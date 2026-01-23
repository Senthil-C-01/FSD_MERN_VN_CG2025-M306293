import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch book
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/books/${bookId}`
        );
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch book", err);
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  // 🔹 Prefill user info
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setShipping((prev) => ({
        ...prev,
        fullName: user.name || "",
        phone: user.phone || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  // ✅ FIXED PLACE ORDER
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8000/api/orders",
        {
          items: [
            {
              book: book._id,
              quantity: quantity
            }
          ],
          shippingAddress: shipping
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Order placed successfully!");
      navigate(`/order/${res.data.order._id}`);
    } catch (err) {
      console.error("Order placement failed", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to place order");
    }
  };

  if (loading) return <p>Loading book...</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-container">
        {/* Book Summary */}
        <div className="book-summary">
          <img src={book.coverImage} alt={book.title} />
          <div>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Price:</strong> ₹{book.price}</p>

            <label>
              Quantity:
              <input
                type="number"
                min="1"
                max={book.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </label>
          </div>
        </div>

        {/* Shipping */}
        <div className="shipping-info">
          <h3>Shipping Information</h3>

          <input name="fullName" placeholder="Full Name" value={shipping.fullName} onChange={handleChange} />
          <input name="phone" placeholder="Phone" value={shipping.phone} onChange={handleChange} />
          <input name="addressLine" placeholder="Address" value={shipping.addressLine} onChange={handleChange} />
          <input name="city" placeholder="City" value={shipping.city} onChange={handleChange} />
          <input name="state" placeholder="State" value={shipping.state} onChange={handleChange} />
          <input name="pincode" placeholder="Pincode" value={shipping.pincode} onChange={handleChange} />
        </div>

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order (₹{book.price * quantity})
        </button>
      </div>
    </div>
  );
};

export default Checkout;
