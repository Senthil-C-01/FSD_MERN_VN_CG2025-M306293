import React, { useEffect, useState } from "react";
import axios from "axios";
import Snavbar from "./Snavbar";
import Book from "./Book";
import "./MyProducts.css";

const MyProducts = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Track which book is being edited
  const [editingBookId, setEditingBookId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    author: "",
    price: "",
    stock: ""
  });

  // 🔹 Fetch seller's books
  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:8000/api/seller/my-books",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch seller books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBooks();
  }, []);

  // 🔹 Start editing
  const handleEdit = (book) => {
    setEditingBookId(book._id);
    setEditData({
      title: book.title,
      author: book.author,
      price: book.price,
      stock: book.stock
    });
  };

  // 🔹 Input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  // 🔹 Save update
  const handleSave = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:8000/api/seller/update-book/${id}`,
        {
          title: editData.title,
          author: editData.author,
          price: Number(editData.price),
          stock: Number(editData.stock)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Update UI instantly
      setBooks((prev) =>
        prev.map((b) => (b._id === id ? res.data.book : b))
      );

      setEditingBookId(null);
    } catch (error) {
      console.error("Update book failed:", error);
      alert("Failed to update book");
    }
  };

  // 🔹 Delete book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8000/api/seller/delete-book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Delete book failed:", error);
      alert("Failed to delete book");
    }
  };

  return (
    <div className="myproducts-page">
      <Snavbar />

      <div className="myproducts-container">
        <h2>My Products</h2>

        {loading ? (
          <p>Loading your books...</p>
        ) : books.length === 0 ? (
          <p>No books added yet.</p>
        ) : (
          <div className="books-grid">
            {books.map((book) =>
              editingBookId === book._id ? (
                // 🔴 INLINE EDIT MODE
                <div key={book._id} className="edit-card">
                  <input
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                  />
                  <input
                    name="author"
                    value={editData.author}
                    onChange={handleEditChange}
                  />
                  <input
                    name="price"
                    type="number"
                    value={editData.price}
                    onChange={handleEditChange}
                  />
                  <input
                    name="stock"
                    type="number"
                    value={editData.stock}
                    onChange={handleEditChange}
                  />

                  <div className="edit-actions">
                    <button onClick={() => handleSave(book._id)}>Save</button>
                    <button onClick={() => setEditingBookId(null)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <Book
                  key={book._id}
                  book={book}
                  onEdit={() => handleEdit(book)}
                  onDelete={() => handleDelete(book._id)}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;
