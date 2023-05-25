import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BookForm } from '../../components';

import './AddBook.scss';

export const AddBook: React.FC = () => {
  const location = useLocation();
  const { id } = useParams();

  const isEditMode = location.pathname === `/edit/${id}`;

  return (
    <div className="add-book">
      <div className="add-book__container">
        <h2 className="add-book__header">
          {isEditMode ? 'Edit selected book' : 'Add new book'}
        </h2>
        <BookForm />
      </div>

      <Link to={'/'} className="add-book__home-link">
        <div className="add-book__home-button">
          <img
            src="./assets/home-dark.svg"
            alt="add"
            className="add-book__home-icon"
            color="red"
          />
        </div>
      </Link>
    </div>
  );
};
