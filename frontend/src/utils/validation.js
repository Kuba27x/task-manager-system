import * as Yup from 'yup';

// Task form validation schema
export const taskValidationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required')
    .max(100, 'Title cannot be more than 100 characters'),
  description: Yup.string()
    .max(500, 'Description cannot be more than 500 characters'),
  status: Yup.string()
    .oneOf(['pending', 'in-progress', 'completed'], 'Invalid status'),
  priority: Yup.string()
    .oneOf(['low', 'medium', 'high'], 'Invalid priority'),
  dueDate: Yup.date()
    .nullable()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Due date cannot be in the past')
    .transform((curr, orig) => orig === '' ? null : curr)
});

// Registration form validation schema
export const registerValidationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

// Login form validation schema
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is required')
});

// Profile form validation schema
export const profileValidationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  currentPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters'),
  newPassword: Yup.string()
    .min(6, 'New password must be at least 6 characters'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});