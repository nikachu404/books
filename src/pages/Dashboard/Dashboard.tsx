import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from '../../components';
import { Book } from '../../types/Book';
import { API_URL, PLUS_ICON } from '../../constants';

import './Dashboard.scss';

export const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('active');
  const [books, setBooks] = useState<Book[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filteredRecords, setFilteredRecords] = useState(0);

  useEffect(() => {
    loadBooks();
  }, [filter]);

  const loadBooks = () => {
    let url = API_URL;

    if (filter === 'active') {
      url += '?isActive=true';
    } else if (filter === 'deactivated') {
      url += '?isActive=false';
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setFilteredRecords(data.length);
      })
      .catch(() => {
        setBooks([]);
        setFilteredRecords(0);
      });

    fetch(API_URL)
      .then(response => response.json())
      .then(data => setTotalRecords(data.length))
      .catch(() => setFilteredRecords(0));
  };

  const deleteBook = (id: number) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' }).then(() => loadBooks());
  };

  const toggleActivation = (book: Book, isActive: boolean) => {
    fetch(`${API_URL}/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...book, isActive: isActive }),
    }).then(() => loadBooks());
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="dashboard">
      {books.length ? (
        <>
          <div className="dashboard__filter">
            <select
              id="filter"
              value={filter}
              onChange={handleFilterChange}
              className="dashboard__filter-select">
              <option value="all">Show All</option>
              <option value="active">Show Active</option>
              <option value="deactivated">Show Deactivated</option>
            </select>

            <p className="dashboard__filter-info">
              Showing {filteredRecords} of {totalRecords} records.
            </p>
          </div>
          <Table
            books={books}
            onDeleteBook={deleteBook}
            onToggleActive={toggleActivation}
          />
        </>
      ) : (
        <p className="dashboard__no-books">No books ;(</p>
      )}

      <Link to={'/add'} className="dashboard__add-link">
        <div className="dashboard__add-button">
          <img src={PLUS_ICON} alt="add" className="dashboard__add-plus" />
        </div>
      </Link>
    </div>
  );
};
