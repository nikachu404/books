import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
      fetch(`http://localhost:3000/books/${id}`)
        .then(response => response.json())
        .then(data => setBook(data));
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

    const requestOptions: RequestInit = {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        id
          ? { ...book, editedAt: new Date() }
          : { ...book, createdAt: new Date() }
      ),
    };

    fetch(`http://localhost:3000/books${id ? `/${id}` : ''}`, requestOptions);

    setBook({
      id: 0,
      title: '',
      author: '',
      category: '',
      isbn: '',
      createdAt: null,
      editedAt: null,
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
          <option value="" disabled>Select a category</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
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
