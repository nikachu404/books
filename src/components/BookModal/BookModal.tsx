import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Book } from '../../types/Book';

import './BookModal.scss';

type Props = {
  book: Book;
  onCloseModal: () => void;
  onDeleteBook: (bookId: number) => void;
  onToggleActivation: (book: Book, isActive: boolean) => void;
};

export const BookModal: React.FC<Props> = ({
  book,
  onCloseModal,
  onDeleteBook,
  onToggleActivation,
}) => {
  const { id, title, author, category, isbn, createdAt, editedAt, isActive } =
    book;

  const handleDeleteBook = (bookId: number) => {
    onDeleteBook(bookId);
    onCloseModal();
  }

  return (
    <div className="book-modal">
      <div className="book-modal__content">
        <div className="book-modal__close-button" onClick={onCloseModal}>
          Close
        </div>
        <h2 className="book-modal__title">{title}</h2>
        <p className="book-modal__author">Author: {author}</p>
        <p className="book-modal__category">Category: {category}</p>
        <p className="book-modal__isbn">ISBN: {isbn}</p>
        <p className="book-modal__createdAt">
          Created At: {moment(createdAt).format('MMM D YYYY, LT')}
        </p>
        <p className="book-modal__editedAt">
          Edited At:{' '}
          {editedAt ? moment(editedAt).format('MMM D YYYY, LT') : '--'}
        </p>
        <div className="book-modal__actions">
          <Link to={`/edit/${id}`} className="book-modal__button-link">
            <button className="book-modal__button book-modal__button--edit">
              Edit
            </button>
          </Link>
          <button
            onClick={() => handleDeleteBook(id)}
            className="book-modal__button book-modal__button--delete">
            Delete
          </button>
          {isActive ? (
            <button
              onClick={() => onToggleActivation(book, false)}
              className="book-modal__button book-modal__button--deactivate">
              Deactivate
            </button>
          ) : (
            <button
              onClick={() => onToggleActivation(book, true)}
              className="book-modal__button book-modal__button--reactivate">
              Re-Activate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
