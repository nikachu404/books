import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';
import { BookModal } from '../BookModal/BookModal';
import { Book } from '../../types/Book';
import { EYE_ICON } from '../../constants';

import './Table.scss';

type Props = {
  books: Book[];
  onDeleteBook: (id: number) => void;
  onToggleActive: (id: Book, isActive: boolean) => void;
};

export const Table: React.FC<Props> = ({
  books,
  onDeleteBook,
  onToggleActive,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const openModal = (book: Book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const handleToggleActivation = (book: Book, isActive: boolean) => {
    onToggleActive(book, isActive);
    setSelectedBook({ ...book, isActive: isActive });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Book title</th>
            <th className="table__cell-author">Author name</th>
            <th className="table__cell">Category</th>
            <th className="table__cell">ISBN</th>
            <th className="table__cell">Created At</th>
            <th className="table__cell">Edited At</th>
            <th className="table__cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(item => (
            <tr
              key={item.id}
              className={item.isActive ? '' : 'table__cell-deactivated'}>
              <td>{item.title}</td>
              <td className="table__cell-author">{item.author}</td>
              <td className="table__cell">{item.category}</td>
              <td className="table__cell">{item.isbn}</td>
              <td className="table__cell">
                {moment(item.createdAt).format('MMM D YYYY, LT')}
              </td>
              <td className="table__cell">
                {item.editedAt
                  ? moment(item.editedAt).format('MMM D YYYY, LT')
                  : '--'}
              </td>
              <td className="table__buttons table__cell">
                <Link to={`/edit/${item.id}`} className="table__button-link">
                  <button className="table__button table__button--edit">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => onDeleteBook(item.id)}
                  className="table__button table__button--delete">
                  Delete
                </button>
                {item.isActive ? (
                  <button
                    onClick={() => handleToggleActivation(item, false)}
                    className="table__button table__button--deactivate">
                    Deactivate
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleActivation(item, true)}
                    className="table__button table__button--reactivate">
                    Re-Activate
                  </button>
                )}
              </td>
              <td className="table__open">
                <img
                  src={EYE_ICON}
                  alt="open"
                  className="table__eye"
                  onClick={() => openModal(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedBook && (
        <BookModal
          book={selectedBook}
          onCloseModal={closeModal}
          onDeleteBook={() => onDeleteBook(selectedBook.id)}
          onToggleActivation={() =>
            handleToggleActivation(selectedBook, !selectedBook.isActive)
          }
        />
      )}
    </>
  );
};
