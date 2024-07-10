import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/query">NBA Teams</Link></li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;