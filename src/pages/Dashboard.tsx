import React, { useState } from 'react';
import { Table } from '../components/Table/Table';

export const Dashboard: React.FC = () => {
  const [filter, setFilter] = useState('active');

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

      <Table />
    </>
  )
}