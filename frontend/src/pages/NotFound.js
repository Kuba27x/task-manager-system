import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="container not-found my-5">
      <div className="text-center">
        <FaExclamationTriangle className="text-warning" size={80} />
        <h1 className="display-4 mt-3">404 - Page Not Found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <div className="mt-4">
          <Link to="/" className="btn btn-primary me-3">
            <FaHome className="me-2" />
            Go Home
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary">
            <FaArrowLeft className="me-2" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;