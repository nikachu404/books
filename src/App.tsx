import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

export const App: React.FC = () => {
  return (
    <>
      <div>Hello</div>
      <Outlet />
    </>
  );
};

export default App;
