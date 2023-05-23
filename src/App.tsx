import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import './App.scss';

export const App: React.FC = () => {
  return (
    <div className='App'>
      <Navigation />

      <div className="App__main">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
