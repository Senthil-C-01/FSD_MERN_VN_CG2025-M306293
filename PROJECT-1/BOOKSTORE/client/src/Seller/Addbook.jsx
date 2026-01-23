import React, { useState } from "react";
import axios from "axios";
import Snavbar from "./Snavbar";
import "./Addbook.css";

const Addbook = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",        // new
  description: "",  // new
    price: "",
    stock: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleImageChange = (e) => {
    // optional image (filename for now)
    setBook({ ...book, image: e.target.files[0]?.name || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      await axios.post(
        "http://localhost:8000/api/seller/add-book",
        {
          title: book.title,
          author: book.author,
          genre: book.genre,             // new
    description: book.description, // new
          price: Number(book.price),
          stock: Number(book.stock),
          coverImage: book.image // optional
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Book added successfully!");

      // reset form
      setBook({
        title: "",
        author: "",
        genre: "",
  description: "",
        price: "",
        stock: "",
        image: ""
      });
    } catch (error) {
      console.error("Add book error:", error);
      alert(error.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="addbook-page">
      <Snavbar />

      <div className="addbook-container">
        <h2>Add New Book</h2>

        <form className="addbook-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
  <label>Genre</label>
  <input
    type="text"
    name="genre"
    value={book.genre}
    onChange={handleChange}
  />
</div>

<div className="form-group">
  <label>Description</label>
  <textarea
    name="description"
    value={book.description}
    onChange={handleChange}
    rows={4}
  />
</div>



          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={book.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                value={book.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Book Image (optional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <button type="submit" className="submit-btn">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbook;
