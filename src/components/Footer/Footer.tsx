import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => (
  <div className="footer">
    <Link
      to="https://github.com/nikachu404"
      target="_blank"
      className="footer__link">
      Visit GitHub
    </Link>
  </div>
);
