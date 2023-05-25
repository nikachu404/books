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
  const [fetchSuccess, setFetchSuccess] = useState(false);

  useEffect(() => {
    loadBooks();
  }, [filter]);

  const loadBooks = async () => {
    let url = API_URL;

    if (filter === 'active') {
      url += '?isActive=true';
    } else if (filter === 'deactivated') {
      url += '?isActive=false';
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data);
      setFilteredRecords(data.length);
      setFetchSuccess(true);
    } catch (error) {
      setBooks([]);
      setFilteredRecords(0);
      setFetchSuccess(false);
    }

    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTotalRecords(data.length);
      setFetchSuccess(true);
    } catch (error) {
      setFilteredRecords(0);
      setFetchSuccess(false);
    }
  };

  const toggleActivation = async (book: Book, isActive: boolean) => {
    try {
      fetch(`${API_URL}/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...book, isActive: isActive }),
      });
      await loadBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const deleteBook = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      await loadBooks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      {fetchSuccess ? (
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
