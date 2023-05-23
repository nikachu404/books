import React from 'react';
import './Table.scss';

export const Table: React.FC = () => {
  const data = [
    {
      id: 1,
      title: 'Book 1',
      author: 'Author 1',
      category: 'Category 1',
      isbn: '1234567890',
      createdAt: new Date(2022, 2, 12, 8, 35),
      modifiedAt: new Date(2022, 2, 13, 13, 48),
    },
    {
      id: 2,
      title: 'Book 2',
      author: 'Author 2',
      category: 'Category 2',
      isbn: '0987654321',
      createdAt: new Date(2022, 4, 20, 11, 15),
      modifiedAt: new Date(2022, 4, 21, 9, 30),
    },
  ];

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Book title</th>
          <th>Author name</th>
          <th>Category</th>
          <th>ISBN</th>
          <th>Created At</th>
          <th>Modified/Edited At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>{item.category}</td>
            <td>{item.isbn}</td>
            <td>
              {item.createdAt.toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </td>
            <td>
              {item.modifiedAt.toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              })}
            </td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
              <button>Deactivate/Re-Activate</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
