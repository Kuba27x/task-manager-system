# Task Manager System

A full-stack web application for managing tasks with user authentication, data visualization, and a responsive interface. Built using modern technologies including Node.js, Express, MongoDB, React, and more.

---

## Features

- **User Authentication**: Registration, login, and profile management.
- **Task Management (CRUD)**: Create, read, update, and delete tasks.
- **Filtering & Searching**: Find tasks easily using filters and search functionality.
- **Data Visualization**: View task statistics with interactive charts.
- **Responsive UI**: Works seamlessly on various devices and screen sizes.

---

## Tools & Technologies

- **Database**: MongoDB
- **Backend**: Node.js, Express.js, Mongoose, JWT, bcrypt
- **Frontend**: React.js, React Router, Formik, Yup, Axios, Chart.js, React-Chartjs-2, React Icons, Bootstrap

---

## Dependencies & Versions

| Package            | Version   |
|--------------------|-----------|
| Node.js            | 22.13.0   |
| MongoDB            | 8.0       |
| React              | 19.1.0    |
| Express            | 5.1.0     |
| Mongoose           | 8.13.2    |
| JWT                | 9.0.2     |
| bcrypt             | 3.0.2     |
| Formik             | 2.4.6     |
| Yup                | 1.6.1     |
| Axios              | 1.8.4     |
| Chart.js           | 3.9.1     |
| React-Chartjs-2    | 5.3.2     |
| React Icons        | 5.5.0     |
| Bootstrap          | 5.3.5     |
| Dotenv             | 16.5.0    |

---

## Getting Started

### Prerequisites

- Node.js (version 22.13.0)
- MongoDB (version 8.0)

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/Kuba27x/task-manager-system.git
cd task-manager-system
```

#### 2. Backend setup

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` folder with the following variables:
  ```
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/task-management
  JWT_SECRET=your_jwt_secret
  ```

#### 3. Frontend setup

```bash
cd ../frontend
npm install
```

- (Optional) Create a `.env` file in the `frontend` folder if you need to define custom variables (e.g., API base URL):
  ```
  REACT_APP_API_URL=http://localhost:5000
  ```

#### 4. MongoDB setup

- Using MongoDB Compass (or the CLI), create a database named `task-management` with two collections: `users` and `tasks`.

#### 5. Connect to MongoDB

- Ensure your MongoDB instance is running and accessible at the URI specified in your backend's `.env` file.

#### 6. Run the backend server

```bash
cd backend
npm start
```

#### 7. Run the frontend application

```bash
cd ../frontend
npm start
```

#### 8. Access the application

- Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

---

## Environment Files

Be sure to create and configure the following files:

- `backend/.env`  
  _Required variables:_
  - `PORT`
  - `MONGODB_URI`
  - `JWT_SECRET`

- `frontend/.env` (optional)  
  _Example variable:_
  - `REACT_APP_API_URL`

---

## Missing Files Checklist

- [ ] `backend/.env` – Database URI, port, JWT secret, etc.
- [ ] `frontend/.env` – Frontend environment variables (e.g., API URL).
- [ ] Additional configuration files as needed per your deployment/hosting provider.

---

## License

MIT

---
