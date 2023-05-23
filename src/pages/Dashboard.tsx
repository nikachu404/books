import React, { useState, useEffect } from 'react';
import { Table } from '../components/Table/Table';
import { Book } from '../types/Book';
import axios from 'axios';

export const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('active');
  const [books, setBooks] =  useState<Book[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/books').then(res => setBooks(res.data))
  }, []);

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

      <Table books={books}/>
    </>
  )
}