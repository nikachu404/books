import React, { useState, useEffect } from 'react';
import { Table } from '../components/Table/Table';
import { Book } from '../types/Book';
import axios from 'axios';

export const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('active');
  const [books, setBooks] = useState<Book[]>([]);

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

    axios.get(url).then(res => setBooks(res.data));
  };

  const deleteBook = (id: number) => {
    axios.delete(`http://localhost:3000/books/${id}`).then(() => loadBooks());
  };

  const toggleActivation = (book: Book, isActive: boolean) => {
    axios
      .put(`http://localhost:3000/books/${book.id}`, {
        ...book,
        isActive: isActive,
      })
      .then(() => loadBooks());
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

      <Table
        books={books}
        onDeleteBook={deleteBook}
        onToggleActive={toggleActivation}
      />
    </>
  );
};
