import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaTasks, FaSignInAlt, FaUserPlus, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          <FaTasks className="me-1" /> Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">
          <FaUser className="me-1" /> Profile
        </Link>
      </li>
      <li className="nav-item">
        <a onClick={onLogout} href="#!" className="nav-link">
          <FaSignOutAlt className="me-1" /> Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <FaUserPlus className="me-1" /> Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <FaSignInAlt className="me-1" /> Login
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaTasks className="me-2" />
          Task Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
          {isAuthenticated && user && (
            <span className="navbar-text text-light ms-3">
              Hello, {user.username}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;