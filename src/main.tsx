import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard.tsx';
import { AddBook } from './pages/AddBook.tsx';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="add" element={<AddBook />} />
          <Route path="edit/:id" element={<AddBook />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
