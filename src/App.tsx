import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation, Footer } from './components';

import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Navigation />

      <div className="App__main">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
