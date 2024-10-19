import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  
    <div className="navbar-left">
      <a href="/" className="logo">
        DeBlur
      </a>
    </div>
    <div className="navbar-right">
      <ul className="nav-links">
        <li>
          <a href="/" className="logo">
            Dash
          </a>
        </li>
        <li>
          <a href="/" className="logo">
            History
          </a>
        </li>
      </ul>

    </div>
  
</nav>
);
};

export default Navbar;
