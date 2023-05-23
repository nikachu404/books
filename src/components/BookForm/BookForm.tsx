import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Book } from '../../types/Book';

export const BookForm: React.FC = () => {
  const { id } = useParams();

  const [book, setBook] = useState<Book>({
    id: 0,
    title: '',
    author: '',
    category: '',
    isbn: '',
    createdAt: null,
    editedAt: null,
    isActive: true,
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/books/${id}`)
        .then(res => setBook(res.data));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id) {
      axios.put(`http://localhost:3000/books/${id}`, {
        ...book,
        editedAt: new Date(),
      });
    } else {
      axios.post('http://localhost:3000/books', {
        ...book,
        createdAt: new Date(),
      });
    }

    setBook({
      id: 0,
      title: '',
      author: '',
      category: '',
      isbn: '',
      createdAt: new Date(),
      editedAt: new Date(),
      isActive: true,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Book title</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Author name</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Category</label>
        <select
          name="category"
          value={book.category}
          onChange={handleChange}
          required>
          <option value="">Select a category</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
      </div>
      <div>
        <label>ISBN</label>
        <input
          type="number"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">{id ? 'Edit Book' : 'Add a Book'}</button>
    </form>
  );
};
