import React, { useState, useEffect } from 'react';
import { Table } from '../components/Table/Table';
import { Book } from '../types/Book';

export const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('active');
  const [books, setBooks] = useState<Book[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filteredRecords, setFilteredRecords] = useState(0);

  useEffect(() => {
    loadBooks();
  }, [filter]);

  const loadBooks = () => {
    let url = 'http://localhost:3000/books';

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
      });

    fetch('http://localhost:3000/books')
      .then(response => response.json())
      .then(data => setTotalRecords(data.length));
  };

  const deleteBook = (id: number) => {
    fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' })
      .then(() => loadBooks());
  };

  const toggleActivation = (book: Book, isActive: boolean) => {
    fetch(`http://localhost:3000/books/${book.id}`, {
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
    <>
      <select id="filter" value={filter} onChange={handleFilterChange}>
        <option value="all">Show All</option>
        <option value="active">Show Active</option>
        <option value="deactivated">Show Deactivated</option>
      </select>

      <p>
        Showing {filteredRecords} of {totalRecords} records.
      </p>

      <Table
        books={books}
        onDeleteBook={deleteBook}
        onToggleActive={toggleActivation}
      />
    </>
  );
};
