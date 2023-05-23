import React from 'react';
import './Table.scss';
import moment from 'moment';
import { Book } from '../../types/Book';

type Props = {
  books: Book[];
};

export const Table: React.FC<Props> = ({ books }) => {
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
        {books.map(item => (
          <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.author}</td>
            <td>{item.category}</td>
            <td>{item.isbn}</td>
            <td>{moment(item.createdAt).format('LL LT')}</td>
            <td>
              {item.modifiedAt ? moment(item.modifiedAt).format('LL LT') : '--'}
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
