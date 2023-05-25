import React from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.scss';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { id } = useParams();

  const isDashboardActive = location.pathname === '/';
  const isAddBookActive =
    location.pathname === '/add' || location.pathname === `/edit/${id}`;

  return (
    <header className="navigation">
      <nav className="navigation__container">
        <ul className="navigation__nav-list">
          <li className="navigation__nav-item">
            <img
              src={`./assets/${isDashboardActive ? 'home-active.svg' : 'home.svg'}`}
              alt="dashboard"
              className="navigation__icon"
            />
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn('navigation__nav-link', {
                  'navigation__nav-link--selected': isActive,
                })
              }>
              Dashboard
            </NavLink>
          </li>

          <li className="navigation__nav-item">
            <img
              src={`./assets/${isAddBookActive ? 'pencil-active.svg' : 'pencil.svg'}`}
              alt="add"
              className="navigation__icon"
            />
            <NavLink
              to="/add"
              className={({ isActive }) =>
                cn('navigation__nav-link', {
                  'navigation__nav-link--selected': isActive || isAddBookActive,
                })
              }>
              Add Book
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
