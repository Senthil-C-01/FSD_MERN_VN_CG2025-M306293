import React from "react";
import "./Book.css";

const Book = ({ book, onEdit, onDelete }) => {
  return (
    <div className="seller-book-card">
      <div className="seller-book-img">
        {book.image ? (
          <img src={book.image} alt={book.title} />
        ) : (
          <div className="img-placeholder">No Image</div>
        )}
      </div>

      <h4>{book.title}</h4>
      <p className="author">by {book.author}</p>
      <p className="price">₹{book.price}</p>
      <p className="stock">Stock: {book.stock}</p>

      <div className="seller-book-actions">
        <button className="edit-btn" onClick={() => onEdit(book)}>
          Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(book.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Book;
