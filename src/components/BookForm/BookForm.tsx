import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';
import { Book } from '../../types/Book';

import './BookForm.scss';

export const BookForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
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

  const [errors, setErrors] = useState({
    title: false,
    author: false,
    category: false,
    isbn: false,
  });

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/${id}`)
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formErrors = {
      title: book.title.trim() === '',
      author: book.author.trim() === '',
      category: book.category === '',
      isbn: book.isbn.toString().trim() === '',
    };

    if (Object.values(formErrors).some(error => error === true)) {
      setErrors(formErrors);
      setMessage('Please fill in all the required fields.');
      return;
    }

    const requestOptions: RequestInit = {
      method: id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        id
          ? { ...book, editedAt: new Date() }
          : { ...book, createdAt: new Date() },
      ),
    };

    try {
      const response = await fetch(
        `${API_URL}/${id ? `/${id}` : ''}`,
        requestOptions,
      );

      if (response.ok) {
        setMessage('Record saved successfully!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessage('Failed to save record.');
        console.log('aaaaaaa');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }

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

    setErrors({
      title: false,
      author: false,
      category: false,
      isbn: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <div className="book-form__field">
        <label>Book title</label>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          autoComplete="off"
          className={`book-form__input ${
            errors.title && 'book-form__input--error'
          }`}
        />
        {errors.title && (
          <span className="book-form__error-message">
            Please enter a book title.
          </span>
        )}
      </div>

      <div className="book-form__field">
        <label>Author name</label>
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          autoComplete="off"
          className={`book-form__input ${
            errors.author && 'book-form__input--error'
          }`}
        />
        {errors.author && (
          <span className="book-form__error-message">
            Please enter an author name.
          </span>
        )}
      </div>

      <div className="book-form__field">
        <label>Category</label>
        <select
          name="category"
          value={book.category}
          onChange={handleChange}
          className={`book-form__input ${
            errors.category && 'book-form__input--error'
          }`}>
          <option value="" disabled>
            Select a category
          </option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
        </select>
        {errors.category && (
          <span className="book-form__error-message">
            Please select a category.
          </span>
        )}
      </div>

      <div className="book-form__field">
        <label>ISBN</label>
        <input
          type="number"
          name="isbn"
          value={book.isbn}
          onChange={handleChange}
          autoComplete="off"
          className={`book-form__input ${
            errors.isbn && 'book-form__input--error'
          }`}
        />
        {errors.isbn && (
          <span className="book-form__error-message">
            Please enter an ISBN.
          </span>
        )}
      </div>
      <button type="submit" className="book-form__submit-button">
        {id ? 'Edit Book' : 'Add a Book'}
      </button>
      {message && <p className="book-form__message">{message}</p>}
    </form>
  );
};
