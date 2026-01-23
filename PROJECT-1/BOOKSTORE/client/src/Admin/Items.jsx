import React, { useState, useEffect } from "react";
import axios from "axios";
import Anavbar from "./Anavbar";
import "./Items.css";

const Items = () => {
  const [books, setBooks] = useState([]);

  // 🔹 edit state
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: ""
  });

  // 🔹 Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books");
        console.log("Books from DB:", res.data);
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

  // 🔹 Open edit form
  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price
    });
  };

  // 🔹 Update book (Admin)
  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/admin/product/${editingBook._id}`,
        formData
      );

      console.log("Updated book:", res.data);

      // update table without reload
      setBooks((prev) =>
        prev.map((b) =>
          b._id === editingBook._id ? res.data : b
        )
      );

      setEditingBook(null);
    } catch (error) {
      console.error("Failed to update book", error);
    }
  };

  // 🔹 Remove book (Admin)
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this book?")) return;

    try {
      await axios.delete(`http://localhost:8000/admin/product/${id}`);
      console.log("Book deleted:", id);

      setBooks((prev) => prev.filter((book) => book._id !== id));
    } catch (error) {
      console.error("Failed to delete book", error);
    }
  };

  return (
    <div>
      <Anavbar />

      <div className="items-container">
        <h2>All Books</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.price}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(book._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 🔹 INLINE EDIT FORM */}
        {editingBook && (
          <div className="edit-box">
            <h3>Edit Book</h3>

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Title"
            />

            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              placeholder="Author"
            />

            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="Price"
            />

            <button className="edit-btn" onClick={handleUpdate}>
              Update
            </button>
            <button
              className="remove-btn"
              onClick={() => setEditingBook(null)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Items;
