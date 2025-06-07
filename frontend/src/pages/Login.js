import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthContext } from '../context/AuthContext';
import { loginValidationSchema } from '../utils/validation';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated, error, clearError } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    // Cleanup
    return () => {
      clearError();
    };
    // eslint-disable-next-line
  }, [isAuthenticated, navigate]);

  const initialValues = {
    email: '',
    password: ''
  };

  const onSubmit = values => {
    login(values);
  };

  return (
    <div className="container auth-container">
      <div className="card my-5">
        <div className="card-body p-4">
          <h1 className="text-center mb-4">
            <FaSignInAlt className="me-2" />
            Login
          </h1>
          
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}
          
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    <FaEnvelope className="me-2" />
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger mt-1" />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <FaLock className="me-2" />
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="text-danger mt-1" />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      <FaSignInAlt className="me-2" />
                      Login
                    </>
                  )}
                </button>
              </Form>
            )}
          </Formik>
          
          <div className="text-center mt-3">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;