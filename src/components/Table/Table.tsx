import React from 'react';
import moment from 'moment';
import { Book } from '../../types/Book';
import { Link } from 'react-router-dom';
import './Table.scss';

type Props = {
  books: Book[];
  onDeleteBook: (id: number) => void;
};

export const Table: React.FC<Props> = ({ books, onDeleteBook }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Book title</th>
          <th>Author name</th>
          <th>Category</th>
          <th>ISBN</th>
          <th>Created At</th>
          <th>Edited At</th>
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
              {item.editedAt ? moment(item.editedAt).format('LL LT') : '--'}
            </td>
            <td className="table__buttons">
              <Link to={`/edit/${item.id}`}>Edit</Link>
              <button onClick={() => onDeleteBook(item.id)}>Delete</button>
              <button>Deactivate/Re-Activate</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
