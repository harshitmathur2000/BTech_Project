import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navButtons = [
    { name: 'Home', path: '/homePage' },
    { name: 'MyItems', path: '/myItems' },
    { name: 'Buy', path: '/buy' },
    { name: 'Sell', path: '/sell' },
    { name: 'Rent', path: '/request' },
    { name: 'View Rented Items', path: '/view-request' },
  ];

  return (
    <div className="navbar navbar-dark bg-dark">
      <Link to={navButtons[0].path} className="navbar-link btn btn-outline-light">
        {navButtons[0].name}
      </Link>
      {navButtons.slice(1).map((button) => (
        location.pathname !== button.path && (
          <Link key={button.name} to={button.path} className="navbar-link btn btn-outline-light">
            {button.name}
          </Link>
        )
      ))}
    </div>
  );
};

export default Navbar;