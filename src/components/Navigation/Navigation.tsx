import React from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import './Navigation.scss';

export const Navigation: React.FC = () => {
  return (
    <header className="navigation">
      <nav className="navigation__container">
        <ul className="navigation__nav-list">
          <li className="navigation__nav-item">
            <img src="https://img.icons8.com/dusk/64/null/dictionary.png" className="navigation__icon" />
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn('navigation__nav-link',
                  { 'navigation__nav-link--selected': isActive })
              }
            >
              Dashboard
            </NavLink>
          </li>

          <li className="navigation__nav-item">
            <img src="https://img.icons8.com/dusk/64/null/questions.png" className="navigation__icon" />
            <NavLink
              to="/add"
              className={({ isActive }) =>
                cn('navigation__nav-link',
                  { 'navigation__nav-link--selected': isActive })
              }
            >
              Add Book
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

