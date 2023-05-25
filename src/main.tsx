import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { App } from './App.tsx';
import { Dashboard, AddBook } from './pages';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="add" element={<AddBook />} />
        <Route path="edit/:id" element={<AddBook />} />
      </Route>
    </Routes>
  </HashRouter>,
);
